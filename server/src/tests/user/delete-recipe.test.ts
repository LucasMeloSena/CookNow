import request from "supertest";
import orchestrator from "../orchestrator";
import { app } from "../../app";
import { prisma } from "../../infra/database/database";
import { userReturnMessage } from "../../utils/constants";

describe("Delete Favorite Recipe", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await prisma.user_recipe.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("DELETE to /user/favorite/recipe should return 200", async () => {
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
      .delete("/user/favorite/recipe")
      .send({
        userId: loginResponse.body.user.id,
        recipeId: 1,
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(userReturnMessage.deleteFavoriteRecipe);
  });

  it("DELETE to /user/favorite/recipe should not be able to delete a recipe that has not been favorited", async () => {
    const loginResponse = await request(app).post("/user/login").send({
      email: "johndoe@email.com",
      senha: "123456",
    });

    const response = await request(app)
      .delete("/user/favorite/recipe")
      .send({
        userId: loginResponse.body.user.id,
        recipeId: 1,
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    
    expect(response.status).toBe(404)
    expect(response.body.message).toBe("Não é possível remover uma receita que não está nos seus favoritos!")
  })

  it("DELETE to /user/favorite/recipe should not be able to remove without token", async () => {
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
      .delete("/user/favorite/recipe")
      .send({
        userId: loginResponse.body.user.id,
        recipeId: 1,
      })

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Token não fornecido!");
  });
});
