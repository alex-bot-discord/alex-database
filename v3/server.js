
const request = require('request'),
cmd = require("node-cmd"),
http = require("http"),
express = require("express"),
db = require("./database.js").db,
app = express();
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

//var { Client } = require("discord.js");


function check(UserID) {
db.ensure(UserID,{
Credits: 0,
Xp:0,
Level:0,
Rep:0,
Message:0,
Instgram:"",
Twitter:"",
Snapchat:"",
Facebook:"",
Note:"",
RankColor:"",
Rank_Background_Image:"",
Transfer:[]
})  
}
/*
Transfer:username: `${req.user.username}#${req.user.discriminator}`,
          date: Date.now(),
AMOUNT:
BALANCE
*/
app.get("/info/:UserID", async (req, res) => {
  let UserID = req.params.UserID;
  let dbb = await db.get(UserID);
  check(UserID);
  res.json({
/*Credits: dbb.Credits,
Xp:dbb.Xp,
Level:dbb.Level,
Rep:dbb.Rep,*/
Message:dbb.Message,
Instgram:dbb.Instgram,
Twitter:dbb.Twitter,
Snapchat:dbb.Snapchat,
Facebook:dbb.Facebook,
Note:dbb.Note,
RankColor:dbb.RankColor,
Rank_Background_Image:dbb.Rank_Background_Image
   });
});
 
app.post("/modify/:UserID", async (req, res) => {
  let { method, value } = req.body;
  let UserID = req.params.UserID;
  check(UserID);
 switch (method) {
case "Instgram":
await db.set(UserID,value,"Instgram")
      break;
case "Twitter":
await db.set(UserID,value,"Twitter")
      break;
case "Snapchat":
await db.set(UserID,value,"Snapchat")
      break;
case "Facebook":
await db.set(UserID,value,"Facebook")
      break;
case "Note":
await db.set(UserID,value,"Note")
      break;

case "rank_color":
await db.set(UserID,value,"RankColor")
      break;

case "Rank_Background_Image":
await db.set(UserID,value,"Rank_Background_Image")
      break;

    case "Credits":
await db.math(UserID,value,"Credits")
      break;
     
    case "Xp":
await db.math(UserID,value,"Xp")
      break;
     
    case "Level":
await db.math(UserID,value,"Level")
      break;
     
    case "Rep":
await db.math(UserID,value,"Rep")
     break;
    case "Transfer":
      break;

    default:
      break;
  }
});
