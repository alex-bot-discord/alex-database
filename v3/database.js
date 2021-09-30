const Enmap = require("enmap");
const db = new Enmap({name: "users"});

module.exports = {
  db
}