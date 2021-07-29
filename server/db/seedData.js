const client = require("./client");
const { newActivity } = require("./");

async function dropTables() {
  try {
    await client.query(`
    DROP TABLE IF EXISTS dependencies;
    DROP TABLE IF EXISTS users_activities;
    DROP TABLE IF EXISTS users;
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
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      displayname VARCHAR(255) DEFAULT NULL,
      username VARCHAR(255) DEFAULT NULL,
      permission INT DEFAULT 1
    );
    
    CREATE TABLE activities (
      id SERIAL PRIMARY KEY,
      activity VARCHAR(255) NOT NULL,
      active BOOLEAN DEFAULT TRUE,
      description VARCHAR(255) DEFAULT NULL
    );
    
    CREATE TABLE users_activities (
      id SERIAL PRIMARY KEY,
      users_id INT REFERENCES users(id),
      activities_id INT REFERENCES activities(id)
    );
    
    CREATE TABLE dependencies (
    id SERIAL PRIMARY KEY,
    activity_next INT REFERENCES activities(id),
    activity_previous INT REFERENCES activities(id)
    );`);
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

    const acts = await Promise.all(
      actToCreate.map((actObj) => {
        newActivity(actObj);
      })
    );
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
