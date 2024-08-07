import { app } from "../../app";
import orchestrator from "../orchestrator";
import request from "supertest";

describe("Search Recipe By Category", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("GET to /v1/recipes/categoria/:categoria should return 200", async () => {
    const response = await request(app).get("/v1/recipes/categoria/Salgado");

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

  it("GET to /v1/recipes/categoria/:categoria should return error with invalid category", async () => {
    const response = await request(app).get("/v1/recipes/categoria/Unavailbale");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Nenhum receita com esta categoria foi encontrada!");
  });
});
