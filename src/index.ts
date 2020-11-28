import Discord from "discord.js";
import dotenv from "dotenv";
import { replyToMessage } from "./responseFunctions.js";

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

client.on("message", (m) => {
  replyToMessage(m, client);
}); //replyToMessage);

client.login(process.env.BOT_SECRET_TOKEN);
