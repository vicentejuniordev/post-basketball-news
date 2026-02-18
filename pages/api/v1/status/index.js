import database from "infra/database.js";
import { InternalServerError } from "infra/errors/index.js";

async function status(request, response) {
  try {
    const updateAt = new Date().toISOString();

    const dbname = process.env.POSTGRES_DB;

    const dbVersionResult = await database.query("SHOW server_version");
    const dbVersionValue = dbVersionResult.rows[0].server_version;

    const dbMaxConnections = await database.query("SHOW max_connections");
    const dbMaxConnectionsValue = dbMaxConnections.rows[0].max_connections;

    const dbUsedConnections = await database.query({
      text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1",
      values: [dbname],
    });
    const dbUsedConnectionsValue = dbUsedConnections.rows[0].count;

    response.status(200).json({
      updated_at: updateAt,
      depedencies: {
        database: {
          version: dbVersionValue,
          max_connections: dbMaxConnectionsValue,
          opened_connections: dbUsedConnectionsValue,
        },
      },
    });
  } catch (error) {
    const objectPublicError = new InternalServerError({
      cause: error,
    });

    console.error("Error fetching database status in controller:", error);
    console.error(objectPublicError);
    response.status(500).json(objectPublicError);
  }
}

export default status;
