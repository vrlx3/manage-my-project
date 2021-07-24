const client = require("./client");

function columnNames(anyObject) {
  return Object.keys(anyObject).join(", ");
}

function dollarMaker(anyObject) {
  const num = Object.keys(anyObject).length;
  let output = "";
  if (num > 0) {
    output = "$1";
  } else {
    return "";
  }
  for (i = 2; i < num + 1; i++) {
    output = output + ", $" + i;
  }
  return output;
}

module.exports = { columnNames, dollarMaker };
