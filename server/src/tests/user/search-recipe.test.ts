import request from "supertest";
import orchestrator from "../orchestrator";
import { app } from "../../app";
import { prisma } from "../../infra/database/database";
import { userReturnMessage } from "../../utils/constants";

describe("Search Favorites Recipes", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await prisma.user_recipe.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("GET to /user/favorite/recipe should return 200", async () => {
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

    await request(app)
      .post("/user/favorite/recipe")
      .send({
        userId: loginResponse.body.user.id,
        recipeId: 1,
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .get("/user/favorite/recipe")
      .query({
        id: loginResponse.body.user.id,
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(userReturnMessage.searchFavoriteRecipes);
    expect(response.body).toHaveProperty("recipes");
    expect(response.body.recipes.length).toBeGreaterThan(0);
  });

  it("GET to /user/favorite/recipe should not be able to get data without token", async () => {
    const loginResponse = await request(app).post("/user/login").send({
      email: "johndoe@email.com",
      senha: "123456",
    });

    const response = await request(app).get("/user/favorite/recipe").query({
      id: loginResponse.body.user.id,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token não fornecido!");
  });
});
