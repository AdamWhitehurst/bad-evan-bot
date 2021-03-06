#!/usr/bin/env node
import Discord from "discord.js";
import dotenv from "dotenv";
import path from 'path';
import "source-map-support/register";
import { determineResponse } from "./responseFunctions.js";

const client = new Discord.Client();

dotenv.config({ path: path.resolve(__dirname, '../.env') });

client.on("ready", () => {
  console.log("Hello world!");
});

client.on("guildMemberAdd", (m) => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("Member Added:", m);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
});

client.on("message", (m) => {
  determineResponse(m, client);
}); 

client.login(process.env.BOT_SECRET_TOKEN);
