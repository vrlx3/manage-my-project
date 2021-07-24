const client = require("./client");
const { newActivity } = require("./");

async function dropTables() {
  try {
    await client.query(`
        DROP TABLE IF EXISTS activities;
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
        );
        `);
  } catch (error) {
    throw error;
  }
}

async function createInitialActivity2() {
  console.log("starting to create activity");
  try {
    client.query(`
    INSERT INTO activities(activity) VALUES  ('activity1');
    INSERT INTO activities(activity) VALUES  ('activity2');
    INSERT INTO activities(activity) VALUES  ('activity3');
    `);
  } catch (error) {
    throw error;
  }
}

async function createInitialActivity() {
  console.log("attempting activity creation via object");

  try {
    const actToCreate = [
      { activity: "activity4" },
      { activity: "activity5" },
      { activity: "activity6" },
    ];

    const acts = await Promise.all(actToCreate.map(newActivity));
    console.log("activity creation via objects complete");
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialActivity2();
    await createInitialActivity();

    console.log(
      "------------DB Seeding Complete--------------------------------------"
    );
  } catch (error) {
    throw error;
  }
}

module.exports = { rebuildDB };
