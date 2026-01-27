import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // Faz o parse dos dados que o servidor respondeu
  const responseBody = await response.json();

  // Testa se o update_at está vindo conforme o adequado
  console.log(responseBody);
  expect(responseBody.updated_at).toBeDefined();
  const updateAtParse = new Date(responseBody.updated_at).toISOString(); // Faz o parse da data que no response
  expect(responseBody.updated_at).toEqual(updateAtParse); //Verifica se a data que veio é igual a que fez o parse

  // Testa se as informações do banco estão vindo adequadamente
  expect(responseBody.depedencies.database.version).toBeDefined();
  const versionDb = responseBody.depedencies.database.version;
  expect(versionDb).toEqual("16.11");

  expect(parseInt(responseBody.depedencies.database.max_connections)).toEqual(
    100,
  );

  expect(
    parseInt(responseBody.depedencies.database.opened_connections),
  ).toEqual(1);
});
