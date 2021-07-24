const client = require("./client");

async function dropTables() {
  try {
    await client.query(`
        DROP TABLE IF EXISTS activities
        `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  console.log("starting to create tables");
  try {
    await client.query(`
        CREATE TABLE activities(
            id SERIAL PRIMARY KEY, 
            activity VARCHAR(255)
        )
        `);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}

module.exports = { rebuildDB };
