import { MigrationStatus } from "../../controllers/migrations.controller";
import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3002/migrations", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  expect(response.status).toEqual(200);

  const result = await response.json();
  expect(result.status).toBe(MigrationStatus.Ok);
  expect(result.message).toBe("Database schema is up to date");
});
