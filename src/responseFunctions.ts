import Discord from "discord.js";
import {
  emojiResponses,
  fakeResponses,
  psycheResponses,
  simpleResponses,
  thinkingResponses
} from "./responseTables";
import { WeightedOutput } from "./weightedTable";
import { rollRandomEntryFrom } from "./weightedTableFunctions";

/**
 * "Most of the time it doesn't react, but when it does,
 * it is great."
 * 
 * TODO: More interesting behavior
 */
export const responseBehavior: WeightedOutput = [
  [1 , psycheReply],
  [3 , thoughfulReply],
  [5 , simpleReply],
  [10, mockingReply],
  [31, react],
  [50, noReply],
];

export function sendFile (msg: Discord.Message, assetFileName: string, content="") {  
  const file = new Discord.MessageAttachment(`./assets/${assetFileName}`);
  msg.channel.send({ files: [file], content });
}

export function determineResponse(msg: Discord.Message, client: Discord.Client) {
  console.log("--------------------");
  console.log(msg.guild.member(msg.author));

  if (msg.content.match(/^ayy/i)) {
    sendFile(msg, 'ayy.png', "lmao");
  }

  if (msg.content.match(/^noice/i)) {
    sendFile(msg, 'noice.gif');
  }

  if (msg.author.id === process.env.EVANS_USER_ID) {
    const respFn = rollRandomEntryFrom(responseBehavior);

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
  const delayedResponseFn = rollRandomEntryFrom(responseBehavior);
  const responseDelay = Math.random() * 2000;

  msg.channel.send(initResponse);

  setTimeout(() => {
    delayedResponseFn(msg);
  }, responseDelay);
}

export function mockingReply(msg: Discord.Message) {
  let reply = "";

  const mockChar = (c: string) => {
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
