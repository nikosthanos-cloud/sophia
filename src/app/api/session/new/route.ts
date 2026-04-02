import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const userId = "dev_user_123";
    const email = "dev@localhost.dev";

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
