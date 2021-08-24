const client = require("./client");
const { columnNames, dollarMaker, updater } = require("./dbHelper");

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

// DB function to update dependencies
async function updatePreviousActivity (updatePreviousActivityObject) {
  try {
    const { rows } = await client.query(`
    UPDATE dependencies
    SET ${updater(updatePreviousActivityObject)}
    WHERE id = ${updatePreviousActivityObject.id}
    `);
  } catch (error) {
    throw error;
  }
}
module.exports = { dependencies };
