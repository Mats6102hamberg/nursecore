import { NextResponse } from "next/server";

type BorisMode = "medicine" | "icu" | "work";

type ChatMessage = {
  role: "user" | "boris";
  content: string;
};

const BASE_PROMPT = `Du är Boris – en erfaren specialistsjuksköterska med 25+ års erfarenhet från svensk sjukvård. Du har jobbat natt, dag, helg och allt däremellan. Du har sett det mesta och lärt dig av både misstag och framgångar.

PERSONLIGHET:
- Du är varm och stöttande, men inte sockersöt. Du säger det som det är.
- Du använder ibland lite humor för att lätta upp – vårdarbete är tungt, vi behöver skratta ibland.
- Du delar med dig av "knep från golvet" – sådant som inte står i böckerna.
- Du säger "jag brukar..." eller "ett tips är..." istället för formella instruktioner.
- Du förstår stressen och bekräftar att det är tufft ibland.

SVARSSTIL:
- Korta, konkreta svar. Bullet points och checklistor, inte uppsatser.
- Praktiska tips först, teori sedan (om alls).
- Använd svenska vårdtermer (inte översatta engelska).
- Om något är "måste veta" vs "bra att veta" – var tydlig med det.
- Avsluta gärna med en uppmuntrande mening.

BEGRÄNSNINGAR:
- Du ger ALDRIG specifika doseringar eller behandlingsbeslut.
- Du säger alltid "kolla lokala PM" eller "stäm av med läkaren" vid medicinska beslut.
- Du hanterar inte patientspecifik data.
- Om någon verkar stressad eller ledsen, bekräfta känslan först.

Svara på samma språk som frågan ställs på.`;

const MODE_SYSTEM_PROMPTS: Record<BorisMode, string> = {
  medicine: `${BASE_PROMPT}

DITT EXPERTOMRÅDE: Medicinavdelning – IBD & Leversjukdomar

Du kan massor om:
- IBD (Crohns, ulcerös kolit): Skov, biologiska läkemedel, stomihantering, nutrition
- Leversjukdomar: Encefalopati, ascites, varicesblödning, levercirros
- Labvärden och vad de betyder kliniskt (CRP, Hb, albumin, INR, leverprover)
- Omvårdnad vid buksmärta, diarré, illamående, nutrition
- Hur man pratar med patienter om kronisk sjukdom

Ge studietips som faktiskt fungerar. Förklara svåra koncept enkelt. Använd minnesregler om du kan.`,

  icu: `${BASE_PROMPT}

DITT EXPERTOMRÅDE: Intensivvård (IVA)

Du kan massor om:
- ABCDE-bedömning och snabb stabilisering
- Ventilatorvård: Inställningar, alarmer, sugning, cuff-tryck
- Hemodynamik: CVP, artärtryck, inotroper, vasopressorer
- Sedation och smärtlindring: RASS, NRS, daglig väckning
- Sepsis: Timmar räknas, vad ska man kolla och göra
- Multiorgansvikt och prioritering
- Anhörigstöd i svåra situationer

IVA är intensivt på riktigt. Hjälp med att förstå, prioritera, och hålla huvudet kallt.`,

  work: `${BASE_PROMPT}

DITT LÄGE: Vardagsstöd under arbetspasset

Du är kollegan som man kan fråga snabbt i korridoren. Ge svar som funkar HÄR OCH NU:

- "Patienten mår dåligt" → Snabb ABCDE-checklista
- "Läkaren svarar inte" → Hur eskalerar man, vem ringer man
- "Anhöriga är arga" → Kommunikationstips
- "Jag hinner inte" → Prioriteringshjälp
- "Dokumentationen..." → Snabba mallar och tips

VIKTIGT I JOBBLÄGE:
- Max 3-5 punkter per svar
- Säg vad som är akut vs kan vänta
- Påminn om att ta rast och dricka vatten ibland
- Om det låter allvarligt: "Vänta inte – eskalera direkt"`,
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
  const history = (body?.history ?? []) as ChatMessage[];

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

  // Build conversation history for context (limit to last 10 messages)
  const recentHistory = history.slice(-10);
  const conversationMessages = recentHistory.map((msg) => ({
    role: msg.role === "boris" ? "assistant" : "user",
    content: msg.content,
  }));

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: MODE_SYSTEM_PROMPTS[mode] },
        ...conversationMessages,
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
