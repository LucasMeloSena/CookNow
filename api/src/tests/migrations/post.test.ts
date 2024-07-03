import { MigrationStatus } from "../../controllers/migrations.controller";
import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3002/migrations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  expect(response.status).toEqual(200);

  const result = await response.json();
  expect(result.status).toEqual(MigrationStatus.Ok);
  expect(result.message).toEqual("No pending migrations to apply.");
});
