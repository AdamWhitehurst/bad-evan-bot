import Discord from "discord.js";
import OpenAI from 'openai-api';
import { prompt } from './prompt';




const baseParams = {
  engine: "davinci",
  temperature: 0.8,
  maxTokens: 150,
  topP: 1,
  presencePenalty: 0.1,
  frequencyPenalty: 0.7,
  stop: ["\n"],
};

export const smartResponse: Function = async (msg: Discord.Message, client: Discord.Client) => {
  const openai = new OpenAI(process.env.OPENAI_KEY);
  
    let msgHistory;

    try {
    const prevMsgs = await msg.channel.messages.fetch({
        before: msg.id,
        limit: 6
    }, false, true);
        msgHistory = prevMsgs
        .map((v) => v.cleanContent ? `${v.author.username}: ${v.cleanContent}` : '')
        .reverse()
        .reduce( (acc, e)=> `${acc}\n${e}`); 
    } catch (e) {
        console.log("Error: ", e);
        return;
    }

    const formattedPrompt = prompt + 
    msgHistory + 
    '\n' + msg.author.username + ': ' + msg.cleanContent + '\n';

  const params = {
      ...baseParams,
        prompt: formattedPrompt,
  };
  
  console.log("AI Prompt:\n", formattedPrompt);

  try {
        const response = await openai.complete(params);
        console.log(JSON.stringify(response.data));
        const output = `${response.data.choices?.[0]?.text}`.replace(/@*BadEvanBot:*\s*/g, '');
        msg.channel.send(output);
  } catch (err) {
    console.log("AI Error:", err);
  }
};