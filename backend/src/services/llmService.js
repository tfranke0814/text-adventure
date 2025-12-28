const config = require('../config/config');
const OpenAI = require('openai');

const client = new OpenAI();

model = config.OPENAI_TEXT_MODEL;

async function generateTextStreamHttp(prompt, res) {
  const stream = await client.responses.create({
    model: model,
    input: [
        {
            role: "user",
            content: prompt
        },
    ],
    stream: true
  });

  console.debug('Waiting for events in OPENAI stream (HTTP)')
  for await (const event of stream) {
    if (event.type === 'response.output_text.delta') {
      res.write(`${event.delta}`);
    }
  } 
  console.debug('OPENAI stream complete (HTTP)')
} 

async function generateTextStreamWs(prompt, ws) {
  const stream = await client.responses.create({
    model: model,
    input: [
        {
            role: "user",
            content: prompt
        },
    ],
    stream: true
  });

  console.debug('Waiting for events in OPENAI stream (WS)')
  for await (const event of stream) {
    if (event.type === 'response.output_text.delta') {
      ws.send(`${event.delta}`);
    }
  } 
  console.debug('OPENAI stream complete (WS)')
} 

module.exports = { generateTextStreamHttp, generateTextStreamWs };