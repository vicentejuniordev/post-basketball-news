import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";
async function migrations(request, response) {
  const allowMethods = ["GET", "POST"];

  if (!allowMethods.includes(request.method)) {
    return response.status(405).json({
      message: `${request.method} not allowed`,
    });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...migrationsOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(migrationsOptions);

      return response.status(200).json(pendingMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}

export default migrations;
