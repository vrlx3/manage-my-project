const client = require("./client");
const { newActivity, register, users_activities, dependencies } = require("./");

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

async function createInitialUsers() {
  console.log("starting to crate initial users");

  try {
    const usersToCreate = [
      {
        email: "abc@def.com",
        password: "abc",
        displayname: "Abc",
        username: "abC",
        permission: "1",
      },
      {
        email: "ghi@jkl.com",
        password: "ghi",
      },
      { email: "mno@pqr.com", password: "mno" },
    ];

    const usersCreating = await Promise.all(
      usersToCreate.map((userObj) => {
        register(userObj);
      })
    );

    console.log("Initial users created");
  } catch (error) {
    throw error;
  }
}

async function createInitialActivity2() {
  console.log("starting to create activity");
  try {
    client.query(`
    INSERT INTO activities(activity, description) VALUES  ('activity1', 'Activity 1 Description');
    INSERT INTO activities(activity, description) VALUES  ('activity2', 'Activity 2 Description');
    INSERT INTO activities(activity, description) VALUES  ('activity3', 'Activity 3 Description');
    `);
  } catch (error) {
    throw error;
  }
}

async function createInitialActivity() {
  console.log("attempting activity creation via object");

  try {
    const actToCreate = [
      { activity: "activity4", description: "Activity 4 Description" },
      { activity: "activity5", description: "Activity 5 Description" },
      { activity: "activity6", description: "Activity 6 Description" },
      { activity: "activity7", description: "Activity 7 Description" },
      { activity: "activity8", description: "Activity 8 Description" },
      { activity: "activity9", description: "Activity 9 Description" },
      { activity: "activity10", description: "Activity 10 Description" },
      { activity: "activity11", description: "Activity 11 Description" },
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

async function createInitialUsersActivities() {
  // console.log("populating user- activity table");

  try {
    const userActivityToCreate = [
      { users_id: "1", activities_id: "1" },
      { users_id: "1", activities_id: "2" },
      { users_id: "2", activities_id: "3" },
      { users_id: "2", activities_id: "4" },
      { users_id: "1", activities_id: "5" },
      { users_id: "1", activities_id: "6" },
      { users_id: "1", activities_id: "7" },
      { users_id: "1", activities_id: "8" },
      { users_id: "1", activities_id: "9" },
      { users_id: "1", activities_id: "10" },
      { users_id: "1", activities_id: "11" },
    ];

    const userActs = await Promise.all(
      userActivityToCreate.map((userActObj) => {
        users_activities(userActObj);
      })
    );
    console.log("initial user activity complete");
  } catch (error) {
    throw error;
  }
}

// Create Initial dependencies
// This tells what activity needs to be completed prior to activity_id

async function createDependencies() {
  console.log("populating dependecies table");

  try {
    const dependenciesToCreate = [
      {
        activity_next: "2",
        activity_previous: "1",
      },
      {
        activity_next: "3",
        activity_previous: "2",
      },
      {
        activity_next: "4",
        activity_previous: "3",
      },
      {
        activity_next: "5",
        activity_previous: "4",
      },
      {
        activity_next: "6",
        activity_previous: "4",
      },
    ];

    const dependeciesCreated = await Promise.all(
      dependenciesToCreate.map((dependeciesObj) => {
        dependencies(dependeciesObj);
      })
    );
    console.log("dependencies populated");
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialActivity2();
    await createInitialActivity();
    await createInitialUsersActivities();
    await createDependencies();

    console.log(
      "------------DB Seeding Complete--------------------------------------"
    );
  } catch (error) {
    throw error;
  }
}

module.exports = { rebuildDB };
