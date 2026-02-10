import database from "infra/database.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public");
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Check all migrations executed", () => {
      test("For check migrations", async () => {
        const response = await fetch("http://localhost:3000/api/v1/migrations");

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });
    });
  });
});
