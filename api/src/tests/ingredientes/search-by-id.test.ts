import { app } from "../../app";
import orchestrator from "../orchestrator";
import request from "supertest";

describe("Search Ingredient By Id", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("GET to /v1/ingrediente/:id should return 200", async () => {
    const response = await request(app).get("/v1/ingrediente/1");

    expect(response.status).toBe(200);
    expect(response.body.ingrediente).toHaveProperty("id");
    expect(response.body.ingrediente).toHaveProperty("nome");
  });

  it("GET to /v1/ingrediente/:id should return error with invalid id", async () => {
    const response = await request(app).get("/v1/ingrediente/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Nenhum ingrediente com este id foi encontrado!");
  });
});
