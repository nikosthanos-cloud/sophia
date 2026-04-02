import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Anthropic from "@anthropic-ai/sdk";

import { layer1_understand_system, layer1_understand_user } from "../../../lib/prompts/layer1";
import { layer2_diagnose_system, layer2_diagnose_user } from "../../../lib/prompts/layer2";
import { layer3_respond_system, layer3_respond_user } from "../../../lib/prompts/layer3";

const prisma = new PrismaClient();
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const userId = "dev_user_123";

    const body = await req.json();
    const { sessionId, userMessage } = body;

    // Verify session belongs to user
    const email = "dev@localhost.dev";

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { dialogues: true },
    });

    if (!session || session.userEmail !== email) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Previous data handling
    const historyLength = session.dialogues.length;
    const previousAssumptions = session.dialogues
      .map((d: any) => d.layer1Output?.implied_assumptions || [])
      .flat();
    const previousInsights: string[] = (session.keyInsights as string[]) || [];

    // =============================================
    // LAYER 1: UNDERSTAND (Haiku)
    // =============================================
    const layer1Msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      system: layer1_understand_system,
      messages: [{ role: "user", content: layer1_understand_user(userMessage, historyLength, previousAssumptions) }],
    });
    
    // Fallbacks and extractions
    let layer1Result: any = {};
    if (layer1Msg.content[0].type === "text") {
        layer1Result = JSON.parse(layer1Msg.content[0].text);
    }

    // =============================================
    // LAYER 2: DIAGNOSE (Haiku)
    // =============================================
    const layer2Msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      system: layer2_diagnose_system,
      messages: [{ role: "user", content: layer2_diagnose_user(layer1Result.what_he_said || userMessage, layer1Result.implied_assumptions || [], historyLength, previousInsights) }],
    });

    let layer2Result: any = {};
    if (layer2Msg.content[0].type === "text") {
        layer2Result = JSON.parse(layer2Msg.content[0].text);
    }

    // =============================================
    // LAYER 3: RESPOND (Sonnet)
    // =============================================
    const layer3Msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      system: layer3_respond_system,
      messages: [{ role: "user", content: layer3_respond_user(userMessage, layer2Result.contradiction || "", layer2Result.maturity_level || "idea", previousInsights) }],
    });

    let layer3Result: any = {};
    if (layer3Msg.content[0].type === "text") {
        layer3Result = JSON.parse(layer3Msg.content[0].text);
    }

    // Track tokens & cost roughly
    const l1_usage = (layer1Msg.usage.input_tokens * 0.25 + layer1Msg.usage.output_tokens * 1.25) / 1000000;
    const l2_usage = (layer2Msg.usage.input_tokens * 0.25 + layer2Msg.usage.output_tokens * 1.25) / 1000000;
    const l3_usage = (layer3Msg.usage.input_tokens * 3 + layer3Msg.usage.output_tokens * 15) / 1000000;
    const costUsd = l1_usage + l2_usage + l3_usage;
    const tokensUsed = layer1Msg.usage.input_tokens + layer1Msg.usage.output_tokens + layer2Msg.usage.input_tokens + layer2Msg.usage.output_tokens + layer3Msg.usage.input_tokens + layer3Msg.usage.output_tokens;

    // Save to DB
    await prisma.dialogue.create({
      data: {
        sessionId,
        round: historyLength + 1,
        pelatisMessage: userMessage,
        layer1Output: layer1Result,
        layer2Output: layer2Result,
        sophiaQuestion: layer3Result.question || "...",
        sophiaThinking: layer3Result.thinking || "...",
        tokensUsed,
        costUsd,
      },
    });

    // Update Session
    const newInsights = [...previousInsights];
    if (layer2Result.critical_gap) newInsights.push(layer2Result.critical_gap);

    await prisma.session.update({
      where: { id: sessionId },
      data: {
        keyInsights: newInsights,
        nextFocus: layer3Result.what_to_listen_for || "",
        maturityLevel: layer2Result.maturity_level,
      },
    });

    return NextResponse.json({
      sessionId,
      round: historyLength + 1,
      sophiaQuestion: layer3Result.question,
      thinking: layer3Result.thinking,
      metadata: {
        tokensUsed,
        costUsd,
      },
    });
  } catch (error: any) {
    console.error("Error in dialogue orchestration:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
