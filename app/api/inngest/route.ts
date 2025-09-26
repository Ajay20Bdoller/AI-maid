import { serve } from "inngest/next";
// Update the import path if your inngest client is located elsewhere, for example:
import { inngest } from "@/inngest/client";

import { AiCareerAgent, AIRoadmapAgent, helloWorld } from "@/inngest/functions";
// Or create the file './inngest/client.ts' with the following content:
// export const inngest = /* your inngest client initialization */;

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
     AiCareerAgent,
     AIRoadmapAgent
    /* your functions will be passed here later! */
  ],
});