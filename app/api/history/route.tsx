import { NextResponse } from "next/server";
import { db } from '../../../configs/db'
import {HistoryTable} from '../../../configs/schema'
import { currentUser } from "@clerk/nextjs/server";
export async function POST (req: any){
  const user = await currentUser();

  const {recordId,content}=await req.json();
  const user = await currentUser();
  try {

const result = await db.insert(HistoryTable).values({
  recordId: recordId,
  content:content,
  userEmail:user?.primaryEmailAddress?.emailAddress 
});

return NextResponse.json(result)
  } catch(e){
    return NextResponse.json(e)
  }
}