const client = require("./client");
const { columnNames, dollarMaker, updater } = require("./dbHelper");

async function newActivity(activity) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO activities(${columnNames(activity)}) 
      VALUES (${dollarMaker(activity)})
      RETURNING *;
     
      `,
      Object.values(activity)
    );
    // console.log("newAct", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}
// DB function to update  name, description, set inactive.
async function updateActivity(updateActivityObject) {
  try {
    const { rows } = await client.query(`
    UPDATE activities
    SET ${updater(updateActivityObject)}
    WHERE id = ${updateActivityObject.id}
    `);
  } catch (error) {
    throw error;
  }
}

module.exports = { newActivity, updateActivity };
