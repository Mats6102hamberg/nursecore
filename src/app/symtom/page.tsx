"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../../lib/LanguageContext";

type PatientContext = {
  age: string;
  gender: "unknown" | "female" | "male";
  duration: string;
  additionalInfo: string;
};

export default function SymtomPage() {
  const { language } = useLanguage();
  const [symptoms, setSymptoms] = useState("");
  const [context, setContext] = useState<PatientContext>({
    age: "",
    gender: "unknown",
    duration: "",
    additionalInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [showContext, setShowContext] = useState(false);

  const texts = {
    sv: {
      title: "Symtom-checker",
      subtitle: "Beskriv symtom – Boris hjälper dig tänka differentialdiagnostiskt",
      symptomsLabel: "Vilka symtom ser du?",
      symptomsPlaceholder: "Beskriv symtomen så detaljerat som möjligt...\n\nExempel: Patienten har haft tilltagande buksmärta i höger fossa sedan igår, nu med feber 38.5°C, illamående och minskad aptit.",
      addContext: "Lägg till kontext",
      hideContext: "Dölj kontext",
      age: "Ålder",
      agePlaceholder: "t.ex. 45",
      gender: "Kön",
      genderUnknown: "Ej angivet",
      genderFemale: "Kvinna",
      genderMale: "Man",
      duration: "Duration",
      durationPlaceholder: "t.ex. sedan 2 dagar",
      additionalInfo: "Övrig relevant info",
      additionalPlaceholder: "Tidigare sjukdomar, mediciner, allergier...",
      analyze: "Analysera symtom",
      analyzing: "Boris analyserar...",
      clear: "Rensa",
      disclaimer: "Observera",
      disclaimerText: "Detta är ett pedagogiskt verktyg för kliniskt resonemang. Ersätter inte läkarbedömning. Alla kliniska beslut ska fattas av ansvarig läkare baserat på fullständig anamnes och undersökning.",
      emptyState: "Beskriv patientens symtom ovan så hjälper Boris dig att tänka differentialdiagnostiskt och identifiera viktiga varningssignaler.",
      redFlagsTitle: "Kom ihåg: Red Flags",
      redFlagsText: "Boris kommer alltid markera allvarliga varningssignaler. Lita på din kliniska känsla – om något känns fel, eskalera.",
    },
    en: {
      title: "Symptom Checker",
      subtitle: "Describe symptoms – Boris helps you think through differential diagnoses",
      symptomsLabel: "What symptoms do you see?",
      symptomsPlaceholder: "Describe the symptoms as detailed as possible...\n\nExample: Patient has had increasing abdominal pain in right lower quadrant since yesterday, now with fever 38.5°C, nausea and decreased appetite.",
      addContext: "Add context",
      hideContext: "Hide context",
      age: "Age",
      agePlaceholder: "e.g. 45",
      gender: "Gender",
      genderUnknown: "Not specified",
      genderFemale: "Female",
      genderMale: "Male",
      duration: "Duration",
      durationPlaceholder: "e.g. for 2 days",
      additionalInfo: "Other relevant info",
      additionalPlaceholder: "Previous conditions, medications, allergies...",
      analyze: "Analyze symptoms",
      analyzing: "Boris analyzing...",
      clear: "Clear",
      disclaimer: "Note",
      disclaimerText: "This is an educational tool for clinical reasoning. Does not replace physician assessment. All clinical decisions should be made by the responsible physician based on complete history and examination.",
      emptyState: "Describe the patient's symptoms above and Boris will help you think through differential diagnoses and identify important warning signs.",
      redFlagsTitle: "Remember: Red Flags",
      redFlagsText: "Boris will always highlight serious warning signs. Trust your clinical instinct – if something feels wrong, escalate.",
    },
  };

  const t = texts[language];

  function buildPrompt(): string {
    let prompt = `Analysera följande symtom och hjälp sjuksköterskan att tänka differentialdiagnostiskt.

## SYMTOM
${symptoms}`;

    if (context.age || context.gender !== "unknown" || context.duration || context.additionalInfo) {
      prompt += `\n\n## KONTEXT`;
      if (context.age) prompt += `\n- Ålder: ${context.age} år`;
      if (context.gender !== "unknown") prompt += `\n- Kön: ${context.gender === "female" ? "Kvinna" : "Man"}`;
      if (context.duration) prompt += `\n- Duration: ${context.duration}`;
      if (context.additionalInfo) prompt += `\n- Övrigt: ${context.additionalInfo}`;
    }

    prompt += `

## DIN UPPGIFT
Ge ett strukturerat svar med:

### 🔴 Red Flags (VIKTIGAST - börja alltid här!)
Lista allvarliga varningssignaler som kräver omedelbar åtgärd. Var tydlig med vilka symtom/fynd som skulle vara oroande.

### 🤔 Differentialdiagnoser
Lista 3-5 möjliga diagnoser, från mest till minst sannolik. Förklara kort varför varje diagnos är relevant baserat på symtomen.

### 🔍 Förslag på undersökningar
Vad bör sjuksköterskan observera och dokumentera? Vilka prover/undersökningar kan vara relevanta att föreslå för läkaren?

### 💡 Omvårdnadsåtgärder
Konkreta omvårdnadsåtgärder som sjuksköterskan kan göra redan nu.

### ⚠️ När eskalera?
Tydliga kriterier för när sjuksköterskan ska kontakta läkare akut.

Var pedagogisk och förklara resonemanget. Använd markdown för tydlig struktur.`;

    return prompt;
  }

  async function analyzeSymptoms() {
    if (!symptoms.trim() || loading) return;

    setLoading(true);
    setAnalysis("");

    try {
      const response = await fetch("/api/boris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: buildPrompt(),
          mode: "medicine",
          history: [],
        }),
      });

      const data = await response.json();
      setAnalysis(data?.reply ?? "Kunde inte analysera symtomen.");
    } catch {
      setAnalysis("Ett fel uppstod. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setSymptoms("");
    setContext({ age: "", gender: "unknown", duration: "", additionalInfo: "" });
    setAnalysis("");
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input section */}
        <div className="space-y-4">
          {/* Symptoms input */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {t.symptomsLabel}
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={6}
              className={inputClass}
              placeholder={t.symptomsPlaceholder}
            />
          </div>

          {/* Context toggle */}
          <button
            type="button"
            onClick={() => setShowContext(!showContext)}
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 flex items-center gap-1"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showContext ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showContext ? t.hideContext : t.addContext}
          </button>

          {/* Context fields */}
          {showContext && (
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.age}
                  </label>
                  <input
                    type="text"
                    value={context.age}
                    onChange={(e) => setContext((prev) => ({ ...prev, age: e.target.value }))}
                    className={inputClass}
                    placeholder={t.agePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.gender}
                  </label>
                  <select
                    value={context.gender}
                    onChange={(e) => setContext((prev) => ({ ...prev, gender: e.target.value as PatientContext["gender"] }))}
                    className={inputClass}
                  >
                    <option value="unknown">{t.genderUnknown}</option>
                    <option value="female">{t.genderFemale}</option>
                    <option value="male">{t.genderMale}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t.duration}
                </label>
                <input
                  type="text"
                  value={context.duration}
                  onChange={(e) => setContext((prev) => ({ ...prev, duration: e.target.value }))}
                  className={inputClass}
                  placeholder={t.durationPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {t.additionalInfo}
                </label>
                <textarea
                  value={context.additionalInfo}
                  onChange={(e) => setContext((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                  rows={2}
                  className={inputClass}
                  placeholder={t.additionalPlaceholder}
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={analyzeSymptoms}
              disabled={!symptoms.trim() || loading}
              className="flex-1 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? t.analyzing : `🩺 ${t.analyze}`}
            </button>
            {(symptoms || analysis) && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {t.clear}
              </button>
            )}
          </div>

          {/* Red flags reminder */}
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm dark:bg-red-900/20 dark:border-red-900/50">
            <p className="font-medium text-red-800 dark:text-red-300 mb-1">{t.redFlagsTitle}</p>
            <p className="text-red-700 dark:text-red-400">{t.redFlagsText}</p>
          </div>
        </div>

        {/* Analysis output */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-4">
          {analysis ? (
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <span className="text-sm">🩺</span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Boris analys
                </h2>
              </div>
              <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-headings:mt-4 prose-headings:mb-2 prose-li:my-0.5">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center dark:border-neutral-700 dark:bg-neutral-800/50">
              <div className="text-4xl mb-3">🩺</div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {t.emptyState}
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            <p className="font-medium mb-1">{t.disclaimer}</p>
            <p>{t.disclaimerText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
