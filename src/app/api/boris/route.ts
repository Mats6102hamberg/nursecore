import { NextResponse } from "next/server";

type BorisMode = "medicine" | "icu";

const MODE_SYSTEM_PROMPTS: Record<BorisMode, string> = {
  medicine:
    "You are Boris AI for a private nurse portal. Focus on IBD and liver ward study support. Provide educational, general information only. Do not provide diagnosis, treatment decisions, or dosage guidance. If asked for patient-specific advice or dosing, refuse and remind the user to follow local PM and responsible physician.",
  icu: "You are Boris AI for a private nurse portal. Focus on ICU study support. Provide educational, general information only. Do not provide diagnosis, treatment decisions, or dosage guidance. If asked for patient-specific advice or dosing, refuse and remind the user to follow local PM and responsible physician.",
};

const REFUSAL_MESSAGE =
  "I can't help with patient-specific details, medical decisions, or dosing. Please use local PM and refer to the responsible physician. I can help with general study concepts or nursing education instead.";

function isPatientSpecific(text: string) {
  const lowered = text.toLowerCase();
  const hasIdentifiers =
    /\b(mrn|medical record|dob|date of birth|ssn|social security|address|phone|email)\b/.test(
      lowered,
    ) ||
    /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/.test(lowered) ||
    /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/.test(lowered) ||
    /\b\d{3}[-\s]?\d{3}[-\s]?\d{4}\b/.test(lowered);
  const hasPatientContext =
    /\b(patient|pt|room|bed|unit)\b/.test(lowered) &&
    /\b(age|yo|y\/o|male|female|m|f|room|bed)\b/.test(lowered);
  return hasIdentifiers || hasPatientContext;
}

function isDosingOrDecision(text: string) {
  const lowered = text.toLowerCase();
  const hasDoseUnits =
    /\b\d+(\.\d+)?\s?(mg|mcg|g|kg|ml|units|iu|u\/kg|mg\/kg|mcg\/kg|mmol|meq|gtt|min)\b/.test(
      lowered,
    );
  const decisionPhrases =
    /\b(dose|dosage|titrate|start|stop|increase|decrease|prescribe|order|give|administer|treat|treatment plan|diagnose|what should i do)\b/.test(
      lowered,
    );
  return hasDoseUnits || decisionPhrases;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const message = body?.message;
  const mode = body?.mode as BorisMode | undefined;

  if (!message || typeof message !== "string" || !mode) {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }

  if (mode !== "medicine" && mode !== "icu") {
    return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
  }

  if (isPatientSpecific(message) || isDosingOrDecision(message)) {
    return NextResponse.json({ reply: REFUSAL_MESSAGE });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      instructions: MODE_SYSTEM_PROMPTS[mode],
      input: message,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Upstream request failed." },
      { status: 502 },
    );
  }

  const data = await response.json();
  const reply = Array.isArray(data?.output)
    ? data.output
        .flatMap((item: { content?: { type: string; text?: string }[] }) =>
          Array.isArray(item.content)
            ? item.content
                .filter((part) => part.type === "output_text")
                .map((part) => part.text ?? "")
            : [],
        )
        .join("")
    : "";

  return NextResponse.json({
    reply: reply || "No response available. Please try again.",
  });
}
