import Discord from "discord.js";
import dotenv from "dotenv";
import { responseFns, rollRandomEntryFrom } from "./responseFunctions.js";

const client = new Discord.Client();

dotenv.config();

client.on("ready", () => {
  console.log("Hello world!");
});

client.on("guildMemberAdd", (m) => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("Member Added:", m);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
});

client.on("message", (msg) => {
  console.log("--------------------");
  console.log(msg.guild.member(msg.author));
  if (msg.author.id === process.env.EVANS_USER_ID) {
    const respFn = rollRandomEntryFrom(responseFns);
    respFn(msg);
  }
});

client.login(process.env.BOT_SECRET_TOKEN);
