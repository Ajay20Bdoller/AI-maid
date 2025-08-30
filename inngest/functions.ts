import { createAgent, anthropic, openai, gemini } from '@inngest/agent-kit';

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const AiCareerChatAgent= createAgent({
name: 'AiCareerChatAgent',
description:'An AI Agent that answers career related questions',
system: `You are a helpful, prefessional AI Carrer coach.....`,
model:gemini({
  model:"gemini-1.5-flash",
  apiKey:process.env.GEMINI_API_KEY
})
});



export const AiCareerAgent=inngest.createFunction(
  {id:'AiCareerAgent'},
  {event:'AiCareerAgent'},
  async({event, step})=>{
    const {userInput}=event?.data;
    const result=await AiCareerChatAgent.run(userInput);
    return result;
    
  }

)

