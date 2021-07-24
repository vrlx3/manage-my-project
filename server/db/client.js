const { Client } = require("pg");

const connectionString =
  process.env.DATABASEURL || "https://localhost:5432/managemyproject";

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
