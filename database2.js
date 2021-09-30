const Discord = require('discord.js');    
const client = new Discord.Client();

const request = require('request');
const cmd = require("node-cmd");
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
const wait = require('util').promisify(setTimeout);
const Enmap = require("enmap");
const db = new Enmap({name: "db"});



const gaber_actions0x1_عدد_محاولات_التهكير = {};
let invites = {};

client.on("ready", () => {
    console.log(`[INFO] ${client.user.tag} is ready!`);
 client.user.setActivity("Soon | Akon Bot", {type: "PLAYING", url: "https://twitch.tv/gaber01"})
});

client.on('ready', () => {
  wait(1000);
 client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

/*
client["on"]("guildMemberAdd", async member => {
if (!member.guild) return;
let dbb = await db.get(member.guild);
member.guild.fetchInvites().then(async guildInvites => {
const ei = invites[member.guild.id];
invites[member.guild.id] = guildInvites;
const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
const inviter = client.users.get(invite.inviter.id);
if (dbb.wlcStatus === "on") {
let channel = member.guild.channels.get(dbb.wlcChannel);
let message = db.get(member.guild.id,"wlcMsg");
if (!channel) return;
if (!message) return;
if (db.has(member.guild.id,"wlcMsg")){
setTimeout(async () => {
await channel.send(message
.replace('[user]', `<@${member.user.id}>`)
.replace('[inviter]', `<@${inviter.id}>`)
.replace('[server]', member.guild.name)
.replace("[space]","\n")
)
},2000)
}}
if (dbb.wlcDMStatus === "on") {
let dmmessage = dbb.wlcDMMsg;
if (!dmmessage) return;
setTimeout(() => {
member.send(dmmessage.replace('[user]', `<@${member.user.id}>`)
.replace('[inviter]', `<@${inviter.id}>`)
.replace('[server]', member.guild.name)
.replace("[space]","\n")
)},2000)}
})
})*/
/*
client.on("voiceStateUpdate", async (Gaber , Hema) => {
let dbb = await db.get(Gaber.guild.id);
if(dbb === undefined) return;
let vconlinstatus = db.get(Gaber.guild.id,"voiceOnline")
if (vconlinstatus === "on") {
var channel = client.channels.get (db.get(Gaber.guild.id,"voiceOnlineChannel"));
if (!channel) return;
var count = 0;
    if(dbb.voicebots == "on") {
    Gaber.guild.channels.filter(c=>c.type=='voice').forEach( ( c ) => {
      
      count += c.members.filter(m => m.user.bot !== true).size;
    });
  } else {
    Gaber.guild.channels.filter(c=>c.type=='voice').forEach( ( c ) => {
      
      count += c.members.size;
    });
  }
channel.edit({ name: dbb.voiceOnlineName.replace('[00]', count) })
 }
}
)*/
client.login("NjQzOTAzMTM2MzcyNzUyNDA0.Xohxlg.kdCKeX5bZPUFbs8Dr7H8VUeKK30");


function check(GuildID) {
db.ensure(GuildID,{
Premium:"none",
Prmeium_token:"",
Prefix: "%",
language:"arabic",

wlcStatus:"off",
wlcChannel:"",
wlcMsg:"",
wlcDMStatus:"off",
wlcDMMsg: "",

voiceOnline:"off",
voiceOnlineChannel:"",
voiceOnlineName:"Voice Online: [[00]]",
voicebots:"off",

prostatus:"off",
banlimit:"2",
kicklimit:"2",
rolelimit:"2",
chlimit:"2",
owneronly:"off",
/*chcrlimit:"3",
chDlimit:"2",
roleCrlimit:"3",
roleDlimit:"2",*/
allowed_members:[],

dashboard_logs:[],
//premium_bctoken:"",
})
}


app.get("/infoserver/:GuildID", async (req, res) => {
  let GuildID = req.params.GuildID;
  let dbb = await db.get(GuildID);
  check(GuildID);
			let logs;
			if (dbb.dashboard_logs) {
				const thelogs = dbb.dashboard_logs;
				logs = thelogs.sort((a, b) => {
					if (a.date < b.date) {
						return 1;
					}
					if (a.date > b.date) {
						return -1;
					}
					return 0;
				});
			} else {
				logs = [];
			} 
 res.json({
    Premium:dbb.Premium,
    Prmeium_token:dbb.Prmeium_token,
    Prefix: dbb.Prefix,
    language:dbb.language,

    wlcStatus:dbb.wlcStatus,
    wlcChannel:dbb.wlcChannel,
    wlcMsg:dbb.wlcMsg,
    wlcDMStatus:dbb.wlcDMStatus,
    wlcDMMsg: dbb.wlcDMMsg,

    voiceOnline: dbb.voiceOnline,
    voiceOnlineChannel: dbb.voiceOnlineChannel,
    voiceOnlineName: dbb.voiceOnlineName,
    voicebots:dbb.voicebots,

    prostatus:dbb.prostatus,
 
    banlimit:dbb.banlimit,
    kicklimit:dbb.kicklimit,
     rolelimit:dbb.rolelimit,
    chlimit:dbb.chlimit,
    owneronly:dbb.owneronly,
/*   chcrlimit:dbb.chcrlimit,
    chDlimit:dbb.chDlimit,
    roleCrlimit:dbb.roleCrlimit,
    roleDlimit:dbb.roleDlimit,
*/
    allowed_members: dbb.allowed_members,

    dashboard_logs:logs

   });
});

app.post("/modify/:GuildID", async (req, res) => {
  let { method, value , by , to } = req.body;
  let GuildID = req.params.GuildID;
  check(GuildID);
 switch (method) {
 
   case "Prefix":
      await db.set(GuildID, value, "Prefix");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Prefix of the bot To  ${to}`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			});   
   break;

    case "language":
    await db.set(GuildID, value, "language");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the language of the bot!`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			});
      break;

    default:
      break;
  }
});

app.post("/modify/vconline/:GuildID", async (req, res) => {
  let { method, value , by , to } = req.body;
  let GuildID = req.params.GuildID;
  check(GuildID);
 switch (method) {

    case "voiceOnline":
      await db.set(GuildID, value, "voiceOnline");
      break;

    case "voiceOnlineChannel":
      await db.set(GuildID, value, "voiceOnlineChannel");
      break;

    case "voiceOnlineName":
      await db.set(GuildID, value, "voiceOnlineName");
      break;

    case "voicebots":
      await db.set(GuildID, value, "voicebots");
      break;

    default:
      break;
  }
});
app.post("/modify/welcome/:GuildID", async (req, res) => {
  let { method, value , by , to } = req.body;
  let GuildID = req.params.GuildID;
  check(GuildID);
 switch (method) {
    case "wlcStatus":
      await db.set(GuildID, value, "wlcStatus");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Welcome Status To ${to}!`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			});
      break;

    case "wlcChannel":
      await db.set(GuildID, value, "wlcChannel");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Welcome Channel!`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			});  
    break;

    case "wlcMsg":
      await db.set(GuildID, value, "wlcMsg");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Welcome Message!`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			});  
      break;

    case "wlcDMStatus":
      await db.set(GuildID, value, "wlcDMStatus");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Welcome DM Status To ${to}!`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			});
      break;

    case "wlcDMMsg":
      await db.set(GuildID, value, "wlcDMMsg");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Welcome DM Message!`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			});
      break;


    default:
      break;
 }
})

app.post("/modify/pro/:GuildID", async (req, res) => {
  let { method, value , by , to } = req.body;
  let GuildID = req.params.GuildID;
  check(GuildID);
 switch (method) {
    case "prostatus":
      await db.set(GuildID, value, "prostatus");
      break;

    case "banlimit":
      await db.set(GuildID, Number(value), "banlimit");
      break;

    case "kicklimit":
      await db.set(GuildID, Number(value), "kicklimit");
      break;

    case "chlimit":
      await db.set(GuildID, Number(value), "chlimit");
      break;

    case "rolelimit":
      await db.set(GuildID, Number(value), "rolelimit");
      break;

    case "owneronly":
      await db.set(GuildID, value, "owneronly");
      break;
  /*
    case "roleCrlimit":
      await db.set(GuildID, value, "roleCrlimit");
      break;

    case "roleDlimit":
      await db.set(GuildID, value, "roleDlimit");
      break;*/

    default:
      break;
 }
 })



