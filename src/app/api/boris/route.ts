import { NextResponse } from "next/server";

type BorisMode = "medicine" | "icu" | "work";

const BASE_PROMPT = `Du är Boris, en erfaren och pedagogisk specialistsjuksköterska och mentor. Du svarar alltid utifrån ett omvårdnadsperspektiv. Fokusera på klinisk blick, patientsäkerhet (ABCDE), omvårdnadsåtgärder och struktur. Var lugn, tydlig och stöttande. Använd svensk vårdterminologi.

Du ger endast utbildningsstöd och allmän information. Du får INTE ge diagnoser, behandlingsbeslut eller doseringsråd. Om någon frågar om patientspecifika råd eller dosering, vägra vänligt och påminn om att följa lokala PM och ansvarig läkare.

Svara alltid på samma språk som frågan ställs på.`;

const MODE_SYSTEM_PROMPTS: Record<BorisMode, string> = {
  medicine: `${BASE_PROMPT}

Ditt fokusområde är medicinavdelning med inriktning på IBD (inflammatorisk tarmsjukdom) och leversjukdomar. Hjälp till med att förstå symtom, labvärden, omvårdnadsåtgärder och vad man ska observera hos dessa patientgrupper.`,
  icu: `${BASE_PROMPT}

Ditt fokusområde är intensivvård (IVA). Hjälp till med att förstå övervakning, ventilatorvård, hemodynamik, sedation och omvårdnad av kritiskt sjuka patienter.`,
  work: `${BASE_PROMPT}

Du hjälper en aktiv sjuksköterska i vardagen. Ge snabba, praktiska svar på frågor som kan dyka upp under ett arbetspass. Fokusera på:
- Prioritering och struktur (vad ska jag göra först?)
- Snabb bedömning med ABCDE
- Vanliga omvårdnadsproblem och åtgärder
- Kommunikation med läkare (SBAR)
- Dokumentation och rapportering

Svara koncist och handlingsinriktat. Du är en kollega som stöttar i stunden.`,
};

const REFUSAL_MESSAGE =
  "Jag kan tyvärr inte hjälpa till med patientspecifika detaljer, medicinska beslut eller dosering. Följ alltid lokala PM och rådgör med ansvarig läkare. Men jag hjälper gärna till med allmänna studiekoncept och omvårdnadskunskap – ställ gärna en annan fråga!";

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

  if (mode !== "medicine" && mode !== "icu" && mode !== "work") {
    return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
  }

  if (isPatientSpecific(message) || isDosingOrDecision(message)) {
    return NextResponse.json({ reply: REFUSAL_MESSAGE });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: MODE_SYSTEM_PROMPTS[mode] },
        { role: "user", content: message },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("OpenAI error:", errorData);
    return NextResponse.json(
      { error: "Upstream request failed." },
      { status: 502 },
    );
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content ?? "";

  return NextResponse.json({
    reply: reply || "No response available. Please try again.",
  });
}
