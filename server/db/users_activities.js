const client = require("./client");
const { columnNames, dollarMaker } = require("./dbHelper");

async function users_activities(newUserActivityObj) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO users_activities(${columnNames(newUserActivityObj)}) 
        VALUES (${dollarMaker(newUserActivityObj)})
        RETURNING *;
       
        `,
      Object.values(newUserActivityObj)
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { users_activities };
