import request from "supertest";
import orchestrator from "../orchestrator";
import { app } from "../../app";
import { prisma } from "../../infra/database/database";
import { returnMessage } from "../../utils/constants";

describe("Create User Controller", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await prisma.user.deleteMany();
    await prisma.user_recipe.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("POST to /user/register should return 200", async () => {
    const response = await request(app).post("/user/register").send({
      nome: "John Doe",
      email: "johndoe@email.com",
      celular: "(31) 9 0000-0099",
      img_profile: "https://imagemdeperfilvalida.com.br",
      senha: "123456",
      dt_cadastro: new Date().toISOString(),
      dt_atualizacao: new Date().toISOString(),
    });
    expect(response.body.message).toBe(returnMessage.register);
    expect(response.status).toBe(201);
  });

  it("POST to /user/register should not be able to create existing user", async () => {
    await request(app).post("/user/register").send({
      nome: "Existing User",
      email: "existinguser@email.com",
      celular: "(31) 9 0000-0098",
      img_profile: "https://imagemdeperfilvalida.com.br",
      senha: "123456",
      dt_cadastro: new Date().toISOString(),
      dt_atualizacao: new Date().toISOString(),
    });

    const response = await request(app).post("/user/register").send({
      nome: "Existing User",
      email: "existinguser@email.com",
      celular: "(31) 9 0000-0098",
      img_profile: "https://imagemdeperfilvalida.com.br",
      senha: "123456",
      dt_cadastro: new Date().toISOString(),
      dt_atualizacao: new Date().toISOString(),
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain("já está cadastrado!");
  });

  it("POST to /user/register should not be able to create user with wrong data", async () => {
    const response = await request(app).post("/user/register").send({
      nome: "",
      email: "email",
      celular: "(31) 9 0000-",
      img_profile: "",
      senha: "",
      dt_cadastro: "",
      dt_atualizacao: "",
    });
    expect(response.status).toBe(500);
    expect(response.body.message).toContain("inválid");
  });
});
