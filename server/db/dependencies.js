const client = require("./client");
const { columnNames, dollarMaker } = require("./dbHelper");

async function dependencies(dependeciesObj) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO dependencies(${columnNames(dependeciesObj)}) 
        VALUES (${dollarMaker(dependeciesObj)})
        RETURNING *;
       
        `,
      Object.values(dependeciesObj)
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { dependencies };
