import { createAgent, anthropic, openai, gemini } from '@inngest/agent-kit';

import { inngest } from "./client";
import { HistoryTable } from '@/configs/schema';

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

export const AIRoadmapGeneratorAgent = createAgent({
  name: 'AIRoadmapGeneratorAgent',
  description: 'Generate Details Tree Like Flow Roadmap',
  system: `Generate a React flow tree-structured learning roadmap for user input position/ skills the following format:
 vertical tree structure with meaningful x/y positions to form a flow

- Structure should be similar to roadmap.sh layout
- Steps should be ordered from fundamentals to advanced
- Include branching for different specializations (if applicable)
- Each node must have a title, short description, and learning resource link
- Use unique IDs for all nodes and edges
- make it more specious node position, 
- Response n JSON format
{
roadmapTitle:'',
description:<3-5 Lines>,
duration:'',
initialNodes : [
{
 id: '1',
 type: 'turbo',
 position: { x: 0, y: 0 },
 data: {
title: 'Step Title',
description: 'Short two-line explanation of what the step covers.',
link: 'Helpful link for learning this step',
 },
},
...
],
initialEdges : [
{
 id: 'e1-2',
 source: '1',
 target: '2',
},
...
];
}

`,
  model: gemini({
    model: "gemini-1.5-flash",
    apiKey: process.env.GEMINI_API_KEY
  })
})

export const AiCareerAgent=inngest.createFunction(
  {id:'AiCareerAgent'},
  {event:'AiCareerAgent'},
  async({event, step})=>{
    const {userInput}=event?.data;
    const result=await AiCareerChatAgent.run(userInput);
    return result;
    
  }

)


export const AIRoadmapAgent = inngest.createFunction(
  { id: "AIRoadmapAgent" },
  { event: "AIRoadmapAgent" },
  async ({ event, step }) => {
    const { roadmapId, userInput, userEmail } = event.data;

    const roadmapResult = await AIRoadmapGeneratorAgent.run("UserInput: " + userInput);

    const firstOutput = roadmapResult.output[0];

    let rawContent = "";
    if ("content" in firstOutput && typeof firstOutput.content === "string") {
      rawContent = firstOutput.content;
    } else {
      throw new Error("AI response did not contain text content");
    }

    const rawContentJson = rawContent.replace("```json", "").replace("```", "");
    const parseJson = JSON.parse(rawContentJson);

    // save to DB
    const saveToDB = await step.run("SaveToDB", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: roadmapId,
        content: parseJson,
        aiAgentType: "ai-tools/ai-roadmap-agent",
        createAt: new Date().toString(),
        userEmail,
        metaData: userInput,
      });
      console.log(result);
      return parseJson;
    });

   
  }
);
