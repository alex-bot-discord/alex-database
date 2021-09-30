const Discord = require('discord.js');    
const client = new Discord.Client();

const request = require('request');
const cmd = require("node-cmd");
const http = require("http");
const express = require("express");
const app = express();
const invites = {};
const wait = require('util').promisify(setTimeout);
const Enmap = require("enmap");
const db = new Enmap({name: "db"});

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

setInterval(() => {
  require ('request')(`https://alex-database.glitch.me`);
}, 280000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*

client["on"]("guildMemberAdd", async member => {
if (db.get(member.guild.id) === undefined) return undefined;
let dbb = await db.get(member.guild.id);
let wlcStatus = db.get(member.guild.id,"wlcStatus")
if (wlcStatus === "on") {
let channel = member.guild.channels.cache.get(dbb.wlcChannel);
let message = db.get(member.guild.id,"wlcMsg");
if (!channel) return console.log ('No Channel found');
if (!message) return console.log ('No message');
if (db.has(member.guild.id,"wlcMsg")){
setTimeout(async () => {
await channel.send(message
.replace('[user]', `<@${member.user.id}>`)
//.replace('[inviter]', `<@${inviter.id}>`)
.replace('[server]', member.guild.name)
.replace("[space]","\n")
)
},1500)
}
}
if (dbb.wlcDMStatus === "on") {
let dmmessage = dbb.wlcDMMsg;
if (!dmmessage) return console.log ('Not Wlc DMmessage');
setTimeout(() => {
member.send(dmmessage
.replace('[user]', `<@${member.user.id}>`)
//.replace('[inviter]', `<@${inviter.id}>`)
.replace('[server]', member.guild.name)
.replace("[space]","\n")
)},1000)}
})

client.on("voiceStateUpdate", async (Gaber , Hema) => {
let dbb = await db.get(Gaber.guild.id);
if(dbb === undefined) return;
let vconlinstatus = db.get(Gaber.guild.id,"voiceOnline")
if (vconlinstatus === "on") {
var channel = client.channels.cache.get (db.get(Gaber.guild.id,"voiceOnlineChannel"));
if (!channel) return;
var count = 0;
    if(dbb.voicebots == "on") {
    Gaber.guild.channels.cache.filter (c=>c.type=='voice').forEach( ( c ) => {
  
      count += c.members.filter (m => m.user.bot !== true).size;
    });
  } else {
    Gaber.guild.channels.cache.filter (c=>c.type=='voice').forEach( ( c ) => {
      
      count += c.members.size;
    });
  }
channel.edit({ name: dbb.voiceOnlineName.replace('[00]', count) }).catch (err => undefined);
 }
})      


let actions0x1 = {};

client.on("channelDelete", async ch => {
if (ch.type == "dm") return undefined;
protection(ch.guild,"Deleted Channels","chlimit")
})

client.on("channelCreate", async ch => {
if (ch.type == "dm") return undefined;
protection(ch.guild, "Create Channels","chlimit");
});
client.on("roleDelete", async role => protection(role.guild, "Role Delete", "rolelimit")); // protection
client.on("roleCreate", async role => protection(role.guild, "Role Create","rolelimit")); // protection

client.on("guildMemberRemove", async member => {
  if (member.id == client.user.id) return;
  if (
    !member.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG") ||
    !member.guild.member(client.user).hasPermission("MANAGE_ROLES") ||
    !member.guild.member(client.user).hasPermission("BAN_MEMBERS")
  )
    return undefined;
  let entry = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry.action == "MEMBER_KICK") {
    protection( member.guild, "Kick Members","kicklimit");
  }
});

client.on("guildBanAdd", async member => {
  if (member.id == client.user.id) return;
  if (
    !member.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG") ||
    !member.guild.member(client.user).hasPermission("MANAGE_ROLES") ||
    !member.guild.member(client.user).hasPermission("BAN_MEMBERS")
  )
    return undefined;
  let entry = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry.action == "MEMBER_BAN_ADD") {  
    protection( member.guild, "Ban Members","banlimit");
  }
});

async function protection(guild0x1, text,db) {
if (db.get(guild0x1.id) === undefined) return undefined;
if(db.get(guild0x1.id, "prostatus") == "off") return;
let entry = await guild0x1.fetchAuditLogs().then(audit => audit.entries.first());
  let user = entry.executor;
if (guild0x1.ownerID == user.id || user.id == client.user.id) return undefined;
if (!actions0x1[user.id] || actions0x1[user.id] == null) {
    actions0x1[user.id] = 1;
    setTimeout(() => {
      actions0x1[user.id] = null;
    }, 60000);
  } else {
    actions0x1[user.id] = actions0x1[user.id] + 1;
    setTimeout(() => {
      actions0x1[user.id] = null;
    }, 60000);
    if (actions0x1[user.id] > db.get(guild0x1.id, db)) {
let roles0x1 = guild0x1.member(user).roles.cache.filter(
          r =>
            r.permissions.has("ADMINISTRATOR") ||
            r.permissions.has("MANAGE_GUILD") ||
            r.permissions.has("MANAGE_ROLES") ||
            r.permissions.has("MANAGE_CHANNELS") ||
            r.permissions.has("BAN_MEMBERS") ||
            r.permissions.has("KICK_MEMBERS")
        );
        roles0x1.filter(rr0x1 => rr0x1.editable && rr0x1.name != "@everyone")
      .map(async rr => {
await guild0x1.member(user).roles.remove(rr.id).catch((err) => {});       
})
guild0x1.owner.send(`${user} (${user.tag}) has excused the **${text}** limit.`);
    }
  }
};*/





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

dashboard_logs:[]
//premium_bctoken:"",
})
}



app.get("/server/:GuildID", async (req, res) => {
  let GuildID = req.params.GuildID;
   check(GuildID);
 let dbb = await db.get(GuildID);
  res.json({
    Prefix: dbb.Prefix,
    language:dbb.language
  })
})


app.get("/pro/:GuildID", async (req, res) => {
  let GuildID = req.params.GuildID;
  check(GuildID);
  let dbb = await db.get(GuildID);
  res.json({
    prostatus:dbb.prostatus,
    banlimit:dbb.banlimit,
    kicklimit:dbb.kicklimit,
     rolelimit:dbb.rolelimit,
    chlimit:dbb.chlimit
  })
})


app.get("/infoserver/:GuildID", async (req, res) => {
  let GuildID = req.params.GuildID;
   check(GuildID);
 let dbb = await db.get(GuildID);
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
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Protaction Status To ${to}`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			}); 
     break;

    case "banlimit":
      await db.set(GuildID, Number(value), "banlimit");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Protaction Ban Limit To ${to}`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			}); 
      break;

    case "kicklimit":
      await db.set(GuildID, Number(value), "kicklimit");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Protaction Kick Limit To ${to}`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			}); 
      break;

    case "chlimit":
      await db.set(GuildID, Number(value), "chlimit");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Protaction Channels Limit To ${to}`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			}); 
      break;

    case "rolelimit":
      await db.set(GuildID, Number(value), "rolelimit");
		await	db.pushIn(GuildID ,"dashboard_logs",{
				action: `Changed the Protaction Role Limit To ${to}`,
				username: by,
				date: Date.now(),
				showeddate: new Date().toUTCString()
			}); 
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



app.listen(process.env.PORT);
