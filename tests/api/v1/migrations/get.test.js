import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public");
}

test("GET /migrations should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  const responseBody = await response.json();

  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
