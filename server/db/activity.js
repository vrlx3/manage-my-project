const client = require("./client");
const { columnNames, dollarMaker } = require("./dbHelper");

async function newActivity(activity) {
  try {
    const newAct = await client.query(
      `
      INSERT INTO activities(${columnNames(activity)}) 
      VALUES (${dollarMaker(activity)})
        ${console.log(columnNames(activity))}
      ${console.log(dollarMaker(activity))}
     
      `,
      Object.values(activity)
    );
    return newAct;
  } catch (error) {
    throw error;
  }
}

module.exports = { newActivity };
