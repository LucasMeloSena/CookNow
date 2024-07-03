import { app } from "../../app";
import orchestrator from "../orchestrator";
import request from "supertest";

describe("Search Recipe By Id", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("GET to /v1/recipe/:id should return 200", async () => {
    const response = await request(app).get("/v1/recipe/1")

    expect(response.status).toBe(200);
    expect(response.body.recipe).toHaveProperty("id");
    expect(response.body.recipe).toHaveProperty("nome");
    expect(response.body.recipe).toHaveProperty("url_image");
    expect(response.body.recipe).toHaveProperty("categoriaId");
    expect(response.body.recipe).toHaveProperty("tempo_medio");
    expect(response.body.recipe).toHaveProperty("custo");
    expect(response.body.recipe).toHaveProperty("dificuldade");
    expect(response.body.recipe).toHaveProperty("localizacao");
    expect(response.body.recipe).toHaveProperty("avaliacao");
    expect(response.body.recipe).toHaveProperty("dt_cadastro");
    expect(response.body.recipe).toHaveProperty("dt_atualizacao");
    expect(response.body.recipe).toHaveProperty("categoria");
    expect(response.body.recipe.modo_preparo.length).toBeGreaterThan(0);
    expect(response.body.recipe.ingredientes.length).toBeGreaterThan(0);
  });

  it("GET to /v1/recipe/:id should return error with invalid id", async () => {
    const response = await request(app).get("/v1/recipe/999")
    expect(response.status).toBe(404)
    expect(response.body.message).toBe("Não existe uma receita com este id!")
  })
});
