import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    const body = await req.json();
    const { topic } = body;

    const session = await prisma.session.create({
      data: {
        userEmail: email,
        topic: topic || "general",
        sessionName: `Session - ${new Date().toLocaleDateString()}`,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      greeting: "Hello. I am Sophia. What would you like to explore today?",
    });
  } catch (error: any) {
    console.error("Error creating session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
