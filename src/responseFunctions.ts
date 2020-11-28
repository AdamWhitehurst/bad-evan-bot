import Discord from "discord.js";
import {
  emojiResponses,
  fakeResponses,
  psycheResponses,
  simpleResponses,
  thinkingResponses
} from "./responseTables.js";
import { WeightedTable } from "./weightedTable.js";
import { rollRandomEntryFrom } from "./weightedTableFunctions.js";

export const responseFns: WeightedTable = [
  [simpleReply, 5],
  [noReply, 2],
  [thoughfulReply, 3],
  [mockingReply, 3],
  [psycheReply, 1],
  [react, 10],
];

const ayyImg = new Discord.MessageAttachment("./assets/ayy.png");

export function replyToMessage(msg: Discord.Message, client: Discord.Client) {
  console.log("--------------------");
  console.log(msg.guild.member(msg.author));

  if (msg.content.match(/^ayy/i)) {
    msg.channel.send({ files: [ayyImg], content: "lmao" });
  }

  if (msg.author.id === process.env.EVANS_USER_ID) {
    const respFn = rollRandomEntryFrom(responseFns);

    setTimeout(() => {
      respFn(msg, client);
    }, 500);
  }
}

export function noReply() {}

export function simpleReply(msg: Discord.Message) {
  const randResponse = rollRandomEntryFrom(simpleResponses);

  msg.channel.send(randResponse);
}

export function psycheReply(msg: Discord.Message) {
  const fakeReply = rollRandomEntryFrom(fakeResponses);
  const actualReply = rollRandomEntryFrom(psycheResponses);
  const responseDelay = Math.random() * 3000 + 1500;

  msg.channel.send(fakeReply);

  setTimeout(() => {
    msg.reply(`Psyche! ${actualReply}`);
  }, responseDelay);
}

export function thoughfulReply(msg: Discord.Message) {
  const initResponse = rollRandomEntryFrom(thinkingResponses);
  const delayedResponseFn = rollRandomEntryFrom(responseFns);
  const responseDelay = Math.random() * 2000;

  msg.channel.send(initResponse);

  setTimeout(() => {
    delayedResponseFn(msg);
  }, responseDelay);
}

export function mockingReply(msg: Discord.Message) {
  let reply = "";

  const mockChar = (c) => {
    const roll = Math.floor(Math.random() * 3);
    const dblRoll = Math.floor(Math.random() * 10);
    reply += roll === 0 ? c.toLowerCase() : c.toUpperCase();
    if (dblRoll === 0) {
      mockChar(c);
    }
  };

  [...msg.content].forEach(mockChar);

  msg.channel.send(reply);
}

export function react(msg: Discord.Message) {
  const respEmoji = rollRandomEntryFrom(emojiResponses);
  msg.react(respEmoji);
}
