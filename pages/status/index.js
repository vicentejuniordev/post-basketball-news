import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("api/v1/status/", fetchApi, {
    refreshInterval: 2000,
  });

  let textUpdatedAt;

  if (!isLoading && data) {
    textUpdatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
    const databaseVersion = data.depedencies.database.version;
    const maxConnections = data.depedencies.database.max_connections;
    const openedConnections = data.depedencies.database.opened_connections;
    return (
      <>
        <div>
          <p>
            <strong>Last Update:</strong> {textUpdatedAt}{" "}
          </p>
          <p>
            <strong>Database Information: </strong>
            <p>
              |- <strong>Version:</strong> {databaseVersion}
              <br />
              |- <strong>Max Connections: </strong> {maxConnections}
              <br />
              |- <strong>Opened Connections: </strong> {openedConnections}
            </p>
          </p>
        </div>
      </>
    );
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      src="https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif"
      width="70px"
      alt="Carregando status do sistema"
    />
  );
}
