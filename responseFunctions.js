import {
  fakeResponses,
  psycheResponses,
  simpleResponses,
  thinkingResponses,
} from "./responseTables.js";
import { rollRandomEntryFrom } from "./weightedTableFunctions.js";

export const responseFns = [
  [simpleReply, 5],
  [thoughfulReply, 3],
  [mockingReply, 4],
  [psycheReply, 1],
];

export function simpleReply(msg) {
  const randResponse = rollRandomEntryFrom(simpleResponses);

  msg.channel.send(randResponse);
}

export function psycheReply(msg) {
  const fakeReply = rollRandomEntryFrom(fakeResponses);
  const actualReply = rollRandomEntryFrom(psycheResponses);
  const responseDelay = Math.random() * 3000 + 1500;

  msg.channel.send(fakeReply);

  setTimeout(() => {
    msg.reply(`Psyche! ${actualReply}`);
  }, responseDelay);
}

export function thoughfulReply(msg) {
  const initResponse = rollRandomEntryFrom(thinkingResponses);
  const delayedResponseFn = rollRandomEntryFrom(responseFns);
  const responseDelay = Math.random() * 2000;

  msg.channel.send(initResponse);

  setTimeout(() => {
    delayedResponseFn(msg);
  }, responseDelay);
}

export function mockingReply(msg) {
  let reply = "";

  [...msg.content].forEach((c) => {
    const roll = Math.floor(Math.random() * 3);
    const dblRoll = Math.floor(Math.random() * 10);
    reply += roll === 0 ? c.toUpperCase() : c.toLowerCase();
    if (dblRoll === 0) {
      const roll2 = Math.floor(Math.random() * 2 + 1);
      reply += roll2 === 2 ? c.toLowerCase() : c.toUpperCase();
    }
  });

  msg.channel.send(reply);
}
