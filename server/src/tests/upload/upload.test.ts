import request from "supertest";
import orchestrator from "../orchestrator";
import { app } from "../../app";

describe("Upload File", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  it("POST to upload/user/image should return 200", async () => {
    
  })
})