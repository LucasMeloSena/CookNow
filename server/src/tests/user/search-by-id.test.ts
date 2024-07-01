import request from "supertest";
import orchestrator from "../orchestrator";
import { app } from "../../app";
import { prisma } from "../../infra/database";
import { returnMessage } from "../../utils/constants";

describe("Search User By Id Controller", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await prisma.user.deleteMany();
    await prisma.user_recipe.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("GET to /user/ should return 200", async () => {
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

    const response = await request(app).get("/user/").query({
      id: loginResponse.body.user.id
    }).set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(returnMessage.searchById);
    expect(response.body).toHaveProperty("user");
  })

  it ("GET to /user/ should not be able to find an user without token", async () => {
    const loginResponse = await request(app).post("/user/login").send({
      email: "johndoe@email.com",
      senha: "123456",
    });

    const response = await request(app).get("/user/").query({
      id: loginResponse.body.user.id
    })

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token não fornecido!");
  })

  // it ("GET to /user/ should not be able to find an user with wrong id", async () => {

  // })
})