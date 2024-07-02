import request from "supertest";
import orchestrator from "../orchestrator";
import { app } from "../../app";
import { prisma } from "../../infra/database/database";
import { userReturnMessage } from "../../utils/constants";

describe("Update User Password", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await prisma.user_recipe.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("POST to user/update/pass should return 200", async () => {
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

    const response = await request(app).post("/user/update/pass").send({
      id: loginResponse.body.user.id,
      password: "12345678",
      dt_atualizacao: new Date().toISOString(),
      token: process.env.TOKEN,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(userReturnMessage.updatePass);
  });

  it("POST to user/update/pass should not be able to update user password with wrong token", async () => {
    const loginResponse = await request(app).post("/user/login").send({
      email: "johndoe@email.com",
      senha: "12345678",
    });

    const response = await request(app).post("/user/update/pass").send({
      id: loginResponse.body.user.id,
      password: loginResponse.body.user.senha,
      dt_atualizacao: new Date().toISOString(),
      token: "AnotherTokenWithWrongData",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token inválido!");
  });
});
