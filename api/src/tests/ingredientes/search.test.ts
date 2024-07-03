import { app } from "../../app";
import orchestrator from "../orchestrator";
import request from "supertest";

describe("Search Ingredients", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("GET to /v1/ingredientes should return 200", async () => {
    const response = await request(app).get("/v1/ingredientes");

    expect(response.status).toBe(200);
    expect(response.body.ingredientes[0]).toHaveProperty("id");
    expect(response.body.ingredientes[0]).toHaveProperty("nome");
    expect(response.body.ingredientes.length).toBeGreaterThan(0);
  });
});
