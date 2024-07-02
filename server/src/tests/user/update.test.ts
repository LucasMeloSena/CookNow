import request from "supertest";
import orchestrator from "../orchestrator";
import { app } from "../../app";
import { prisma } from "../../infra/database/database";
import { userReturnMessage } from "../../utils/constants";
import { ObjectId } from "bson";

describe("Update User", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await prisma.user_recipe.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("PUT to /user/update should return 200", async () => {
    await request(app).post("/user/register").send({
      nome: "John Doe",
      email: "johndoe@email.com",
      celular: "(31) 9 0000-0099",
      img_profile: "https://imagemdeperfilvalida.com.br",
      senha: "123456",
      dt_cadastro: new Date().toISOString(),
      dt_atualizacao: new Date().toISOString(),
    });

    const loginResponse = await request(app).post("/user/login").send({
      email: "johndoe@email.com",
      senha: "123456",
    });

    const updateResponse = await request(app)
      .put("/user/update")
      .send({
        id: loginResponse.body.user.id,
        nome: "John Doe II",
        email: "johndoe2@email.com",
        celular: "(31) 9 0000-0001",
        img_profile: loginResponse.body.user.img_profile,
        senha: "12345678",
        dt_atualizacao: new Date().toISOString(),
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.message).toBe(userReturnMessage.updateUser);
    expect(updateResponse.body).toHaveProperty("user");
  });

  it("PUT to /user/update should not be able to update a not available user", async () => {
    const loginResponse = await request(app).post("/user/login").send({
      email: "johndoe2@email.com",
      senha: "12345678",
    });
    expect(loginResponse.status).toBe(200);

    const response = await request(app)
      .put("/user/update")
      .send({
        id: new ObjectId().toString(),
        nome: "John Doe II",
        email: "johndoe2@email.com",
        celular: "(31) 9 0000-0001",
        img_profile: "https://imagemvalida.com.br",
        senha: "12345678",
        dt_atualizacao: new Date().toISOString(),
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Usuário não encontrado!");
  });

  it("PUT to /user/update should not be able to update user data without token", async () => {
    const loginResponse = await request(app).post("/user/login").send({
      email: "johndoe2@email.com",
      senha: "12345678",
    });
    expect(loginResponse.status).toBe(200);

    const response = await request(app).put("/user/update").send({
      id: loginResponse.body.user.id,
      nome: "John Doe II",
      email: "johndoe2@email.com",
      celular: "(31) 9 0000-0001",
      img_profile: loginResponse.body.user.img_profile,
      senha: "12345678",
      dt_atualizacao: new Date().toISOString(),
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token não fornecido!");
  });
});
