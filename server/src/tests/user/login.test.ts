import request from "supertest";
import orchestrator from "../orchestrator";
import { app } from "../../app";
import { prisma } from "../../infra/database";
import { returnMessage } from "../../utils/constants";

describe("Login User Controller", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await prisma.user.deleteMany();
    await prisma.user_recipe.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("POST to /user/login should return 200", async () => {
    await request(app).post("/user/register").send({
      nome: "John Doe",
      email: "johndoe@email.com",
      celular: "(31) 9 0000-0099",
      img_profile: "https://imagemdeperfilvalida.com.br",
      senha: "123456",
      dt_cadastro: new Date().toISOString(),
      dt_atualizacao: new Date().toISOString(),
    });

    const response = await request(app).post("/user/login").send({
      email: "johndoe@email.com",
      senha: "123456",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(returnMessage.login);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("expiresIn");
  });

  it("POST to /user/login should not be able to login with wrong data", async () => {
    const response = await request(app).post("/user/login").send({
      email: "johndoe@email.com.br",
      senha: "12345678",
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toContain("incorret");
  });
});
