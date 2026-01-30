import { NextResponse } from "next/server";

type BorisMode = "medicine" | "icu" | "work";
type Shift = "day" | "evening" | "night" | null;

type ChatMessage = {
  role: "user" | "boris";
  content: string;
};

// Available tools that Boris can suggest
const AVAILABLE_TOOLS = [
  { id: "ibd-observation-check", name: "IBD observations", keywords: ["ibd", "crohn", "kolit", "tarm"] },
  { id: "liver-cirrhosis-focus", name: "Levercirros – omvårdnadsfokus", keywords: ["lever", "cirros", "ascites", "encefalopati"] },
  { id: "nutrition-hydration", name: "Vätska och nutrition", keywords: ["vätska", "nutrition", "mat", "dricka", "dehydrering"] },
  { id: "hypoglycemia", name: "Hypoglykemi – åtgärd", keywords: ["hypoglykemi", "blodsocker", "diabetes", "lågt socker"] },
  { id: "blood-transfusion", name: "Blodtransfusion – checklista", keywords: ["blod", "transfusion", "sab", "blodpåse"] },
  { id: "pain-assessment", name: "Smärtskattning", keywords: ["smärta", "vas", "nrs", "ont"] },
  { id: "fall-prevention", name: "Fallriskbedömning", keywords: ["fall", "fallrisk", "ramla"] },
  { id: "news-score", name: "NEWS2 – beräkning", keywords: ["news", "vitalparametrar", "försämring"] },
  { id: "abcde-checklist", name: "ABCDE – akut bedömning", keywords: ["abcde", "akut", "försämras", "bedömning"] },
  { id: "sbar-template", name: "SBAR – mall", keywords: ["sbar", "rapport", "kommunikation", "läkare"] },
  { id: "sepsis-screening", name: "Sepsis – screening", keywords: ["sepsis", "infektion", "feber", "chock"] },
];

const BASE_PROMPT = `Du är Boris – en erfaren specialistsjuksköterska med 25+ års erfarenhet från svensk sjukvård. Du har jobbat natt, dag, helg och allt däremellan. Du har sett det mesta och lärt dig av både misstag och framgångar.

## PERSONLIGHET
- Du är varm och stöttande, men inte sockersöt. Du säger det som det är.
- Du använder ibland lite humor för att lätta upp – vårdarbete är tungt, vi behöver skratta ibland.
- Du delar med dig av "knep från golvet" – sådant som inte står i böckerna.
- Du säger "jag brukar..." eller "ett tips är..." istället för formella instruktioner.
- Du förstår stressen och bekräftar att det är tufft ibland.

## EMOTIONELLT STÖD (VIKTIGT!)
Om användaren verkar stressad, ledsen, överväldigad eller frustrerad:
1. BÖRJA ALLTID med att bekräfta känslan: "Det låter tufft..." eller "Jag hör att det är mycket just nu..."
2. Normalisera: "Det är helt okej att känna så, det gör vi alla ibland"
3. GE SEDAN det praktiska svaret
4. Avsluta med något stöttande: "Du klarar det här" eller "Ta det steg för steg"

Ledtrådar på stress: "hinner inte", "kaos", "vet inte", "hjälp", "svårt", "ensam", "trött", "orkar inte", korta frustrerade frågor

## SVARSSTIL – ANVÄND MARKDOWN!
Formatera dina svar med markdown för tydlighet:
- Använd **fetstil** för viktiga begrepp
- Använd ### rubriker för att dela upp längre svar
- Använd punktlistor (- eller •) för checklistor
- Använd > för viktiga citat eller varningar
- Använd \`kod\` för specifika värden (t.ex. \`CRP >100\`)

Ge utförliga svar som faktiskt lär ut något – men skriv som en kollega pratar, inte som en lärobok.
Berätta VARFÖR saker är som de är, inte bara VAD man ska göra.
Ge konkreta exempel: "Tänk dig att du har en patient som..."

## VERKTYGSFÖRSLAG
När det är relevant, föreslå verktyg från NurseCore som kan hjälpa. Skriv så här:
"📋 **Användbart verktyg:** [Verktygsnamn](/tools#verktyg-id)"

Tillgängliga verktyg du kan föreslå:
- IBD observations → /tools#ibd-observation-check
- Levercirros omvårdnad → /tools#liver-cirrhosis-focus
- Vätska och nutrition → /tools#nutrition-hydration
- Hypoglykemi åtgärd → /tools#hypoglycemia
- Blodtransfusion checklista → /tools#blood-transfusion
- Smärtskattning → /tools#pain-assessment
- Fallriskbedömning → /tools#fall-prevention
- ABCDE akut bedömning → /tools#abcde-checklist
- SBAR mall → /tools#sbar-template
- Sepsis screening → /tools#sepsis-screening

## KONTEXT OCH MINNE
Om användaren refererar till något ni pratat om tidigare ("som jag sa", "den patienten", "det där"),
koppla tillbaka till det och bygg vidare på konversationen naturligt.

## BEGRÄNSNINGAR
- Du ger ALDRIG specifika doseringar eller behandlingsbeslut.
- Du säger alltid "kolla lokala PM" eller "stäm av med läkaren" vid medicinska beslut.
- Du hanterar inte patientspecifik data.

Svara på samma språk som frågan ställs på.`;

const MODE_SYSTEM_PROMPTS: Record<BorisMode, string> = {
  medicine: `${BASE_PROMPT}

## DITT EXPERTOMRÅDE: Medicinavdelning – IBD & Leversjukdomar

Du kan massor om:
- IBD (Crohns, ulcerös kolit): Skov, biologiska läkemedel, stomihantering, nutrition
- Leversjukdomar: Encefalopati, ascites, varicesblödning, levercirros
- Labvärden och vad de betyder kliniskt (CRP, Hb, albumin, INR, leverprover)
- Omvårdnad vid buksmärta, diarré, illamående, nutrition
- Hur man pratar med patienter om kronisk sjukdom

## STUDIELÄGE - GE DJUPGÅENDE SVAR
När någon pluggar vill de verkligen förstå. Förklara bakgrunden, fysiologin (på ett begripligt sätt), och koppla till kliniken. Ge exempel på hur det ser ut i verkligheten. Använd minnesregler och "aha-moment" som hjälper kunskapen fastna.`,

  icu: `${BASE_PROMPT}

## DITT EXPERTOMRÅDE: Intensivvård (IVA)

Du kan massor om:
- ABCDE-bedömning och snabb stabilisering
- Ventilatorvård: Inställningar, alarmer, sugning, cuff-tryck
- Hemodynamik: CVP, artärtryck, inotroper, vasopressorer
- Sedation och smärtlindring: RASS, NRS, daglig väckning
- Sepsis: Timmar räknas, vad ska man kolla och göra
- Multiorgansvikt och prioritering
- Anhörigstöd i svåra situationer

## IVA-STUDIELÄGE - GÅ PÅ DJUPET
IVA är komplext och det finns mycket att förstå. Förklara fysiologin bakom, varför vi gör som vi gör, och hur allt hänger ihop. Ge konkreta scenarier: "Tänk dig att larmet går och du ser..." Hjälp till att bygga den kliniska blicken.`,

  work: `${BASE_PROMPT}

## DITT LÄGE: Vardagsstöd under arbetspasset

Här behövs snabba, praktiska svar – men fortfarande med substans. Ge tydliga steg att följa, men förklara kort varför.

### BALANS I JOBBLÄGE
- Strukturera med tydliga steg eller punkter
- Förklara kort varför (1 mening räcker ofta)
- Ge konkreta formuleringar man kan använda direkt
- Avsluta med "viktigast att komma ihåg"
- **Föreslå alltid relevanta verktyg** om de finns

Om det låter allvarligt: Var tydlig med "Vänta inte – eskalera direkt" och varför.`,
};

const SHIFT_CONTEXT: Record<string, string> = {
  day: `\n\n## SKIFTKONTEXT: DAGPASS
Användaren jobbar dagpass. Tänk på:
- Läkare och specialister finns tillgängliga
- Ronder och planering pågår
- Mycket folk och aktivitet
- Bra tid för patientundervisning`,

  evening: `\n\n## SKIFTKONTEXT: KVÄLLSPASS
Användaren jobbar kvällspass. Tänk på:
- Färre läkare – jour tar över
- Anhörigbesök vanligt
- Kvällsmediciner och inför natten
- Överlämning till nattpersonal`,

  night: `\n\n## SKIFTKONTEXT: NATTPASS
Användaren jobbar natt. Tänk på:
- Begränsad bemanning – prioritera klokt
- Endast jour tillgänglig – tydlig SBAR viktigt
- Patienter ska sova – minimera störningar
- Egen uthållighet – påminn om rast och fika
- Extra viktigt att känna igen försämring tidigt`,
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
  const shift = body?.shift as Shift;

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

  // Build system prompt with optional shift context
  let systemPrompt = MODE_SYSTEM_PROMPTS[mode];
  if (shift && SHIFT_CONTEXT[shift]) {
    systemPrompt += SHIFT_CONTEXT[shift];
  }

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
        { role: "system", content: systemPrompt },
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
