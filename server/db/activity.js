const client = require("./client");
const { columnNames, dollarMaker } = require("./dbHelper");

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
    console.log("newAct", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { newActivity };
