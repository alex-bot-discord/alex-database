const request = require('request');
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Enmap = require("enmap");
const db = new Enmap({name: "db"});

db.ensure('Messages',{
MessagesRead: 0 ,
CommandUsed:0
})

function check(GuildID) {
if (db.get(GuildID) === undefined) {
db.ensure(GuildID,{
MessagesReadInServer: 0,
CommandUsedInServer: 0
})
}
}

app.get("/info", async (req, res) => {
  let dbb = await db.get("Messages");
  res.json({
    CommandUsed: dbb.CommandUsed,
    MessagesRead: dbb.MessagesRead
  });
});

app.get("/infoserver/:GuildID", async (req, res) => {
let GuildID = req.params.GuildID;
  let dbb = await db.get(GuildID);
check(GuildID);
res.json({
    CommandUsedInServer: dbb.CommandUsedInServer,
    MessagesReadInServer: dbb.MessagesReadInServer
  });
});

app.post('/CommandUsed',async (req, res) => {
let GuildID = req.params.GuildID;
let value  = req.body;
db.math('Messages', "+", parseInt(value.CommandUsed, 10) , "CommandUsed")
check(GuildID);
await db.math(`${GuildID}`, parseInt(value.CommandUsedInServer, 10) , "CommandUsedInServer")
})

app.post('/Messages/:GuildID',async (req, res) => {
let GuildID = req.params.GuildID;
let value  = req.body;
db.math('Messages', "+" ,parseInt(value.MessagesRead, 10) , "MessagesRead")
check(GuildID);
await db.math(`${GuildID}`, parseInt(value.MessagesReadInServer, 10) , "MessagesReadInServer")
})

