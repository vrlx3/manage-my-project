const client = require("./client");
const { columnNames, dollarMaker } = require("./dbHelper");

async function register(newUserObj) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO users(${columnNames(newUserObj)}) 
        VALUES (${dollarMaker(newUserObj)})
        RETURNING *;
       
        `,
      Object.values(newUserObj)
    );
    console.log("new user", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { register };
