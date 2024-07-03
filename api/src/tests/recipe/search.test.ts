import { app } from "../../app";
import orchestrator from "../orchestrator";
import request from "supertest";

describe("Search Recipes", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("GET to /v1/recipes should return 200", async () => {
    const response = await request(app).get("/v1/recipes");

    expect(response.status).toBe(200);
    expect(response.body.recipes[0]).toHaveProperty("id");
    expect(response.body.recipes[0]).toHaveProperty("nome");
    expect(response.body.recipes[0]).toHaveProperty("url_image");
    expect(response.body.recipes[0]).toHaveProperty("categoriaId");
    expect(response.body.recipes[0]).toHaveProperty("tempo_medio");
    expect(response.body.recipes[0]).toHaveProperty("custo");
    expect(response.body.recipes[0]).toHaveProperty("dificuldade");
    expect(response.body.recipes[0]).toHaveProperty("localizacao");
    expect(response.body.recipes[0]).toHaveProperty("avaliacao");
    expect(response.body.recipes[0]).toHaveProperty("dt_cadastro");
    expect(response.body.recipes[0]).toHaveProperty("dt_atualizacao");
    expect(response.body.recipes[0]).toHaveProperty("categoria");
    expect(response.body.recipes[0].modo_preparo.length).toBeGreaterThan(0);
    expect(response.body.recipes[0].ingredientes.length).toBeGreaterThan(0);
  });
});
