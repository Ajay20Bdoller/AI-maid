import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { HistoryTable } from "../../../configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

// POST → create new record
export async function POST(req: Request) {
  const { recordId, content } = await req.json();
  const user = await currentUser();

  try {
    //insert record
    const result = await db.insert(HistoryTable).values({
      recordId: recordId,
      content: content,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// GET → fetch record by recordId
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const recordId = searchParams.get("recordId");
  const user = await currentUser();

  try {


    if (recordId) {
      const result = await db
        .select()
        .from(HistoryTable)
        .where(eq(HistoryTable.recordId, recordId));

      if (result.length > 0) {
        return NextResponse.json({ success: true, content: result[0].content });
      }
    }
else {

 
 const result = await db
        .select()
        .from(HistoryTable)
        .where(eq(HistoryTable.userEmail, user?.primaryEmailAddress)).orderBy(desc(HistoryTable.id));
        return NextResponse.json(result)
  
}

    return NextResponse.json({ success: true, content: [] });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

// PUT → update record by recordId
export async function PUT(req: Request) {
  const { recordId, content } = await req.json();

  try {
    await db
      .update(HistoryTable)
      .set({ content:content,  })
      .where(eq(HistoryTable.recordId, recordId));

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
