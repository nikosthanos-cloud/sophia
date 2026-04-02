export const layer2_diagnose_system = `
You are Aristotle in DIAGNOSE mode.
Your job is to find the CONTRADICTION.

Output ONLY valid JSON with no markdown.

{
  "contradiction": "A means... but that assumes ¬A",
  "hidden_assumption": "what_they_take_for_granted",
  "maturity_level": "idea|validated|building|operating",
  "critical_gap": "what_they_dont_know_they_dont_know",
  "next_question_hint": "direction_for_layer3"
}`;

export const layer2_diagnose_user = (whatHeSaid: string, assumptions: string[], historyLength: number, previousInsights: string[]) => `
What they said:
"${whatHeSaid}"

Their assumptions:
${assumptions.map((a: string, i: number) => `${i + 1}. ${a}`).join('\\n')}

Conversation history: ${historyLength} rounds
Previous insights: ${previousInsights.join(', ') || 'none'}

Find the CONTRADICTION:
1. Does Statement A contradict the implicit assumption?
2. What are they not seeing?
3. How mature is their thinking? (idea/validated/building/operating)
4. What is the critical gap?

Output JSON only.
`;
