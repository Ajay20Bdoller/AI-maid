import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import axios from "axios";

export async function POST(req:NextRequest){

  const {roadmapId, userInput} =await req.json();
  const user= await currentUser();

  const resultIds = await inngest.send({
    name: 'AIRoadmapAgent',
    data: {
      userInput : userInput,
      roadmapId : roadmapId,
      userEmail:user?.primaryEmailAddress?.emailAddress 
    }
  });
  const runId=resultIds.ids[0];
  console.log(runId)
  let runStatus;

  //use polling to check run status
  while(true){
    runStatus=await getRuns(runId);
    console.log(runStatus?.data);
    if(runStatus?.data[0].status === 'completed') {

      break;
    }
    if(runStatus?.data[0]?.status==='Cancelled'){
      break;;
    }
    await new Promise(resolve=> setTimeout(resolve,500))
  }
  return NextResponse.json(runStatus.data?.[0].output[0]);
}

export async function getRuns(runId:string){
  const result= await axios.get(process.env.INNGEST_SERVER_HOST+`/api/runs/${runId}`,{
    headers: {
      'Authorization': `Bearer ${process.env.IINNGEST_SIGNING_KEY}`
    }
  });
  return result.data;
}
  
