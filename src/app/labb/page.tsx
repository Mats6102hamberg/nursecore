"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../../lib/LanguageContext";

type LabValue = {
  id: string;
  name: string;
  value: string;
  unit: string;
  reference: string;
};

const COMMON_LABS: { name: string; unit: string; reference: string }[] = [
  { name: "Hb", unit: "g/L", reference: "♀ 117-153, ♂ 134-170" },
  { name: "LPK", unit: "×10⁹/L", reference: "3.5-8.8" },
  { name: "TPK", unit: "×10⁹/L", reference: "145-348" },
  { name: "CRP", unit: "mg/L", reference: "<5" },
  { name: "Na", unit: "mmol/L", reference: "137-145" },
  { name: "K", unit: "mmol/L", reference: "3.5-4.6" },
  { name: "Kreatinin", unit: "µmol/L", reference: "♀ 45-90, ♂ 60-105" },
  { name: "ALAT", unit: "µkat/L", reference: "♀ <0.76, ♂ <1.1" },
  { name: "ASAT", unit: "µkat/L", reference: "♀ <0.61, ♂ <0.76" },
  { name: "Bilirubin", unit: "µmol/L", reference: "<26" },
  { name: "Albumin", unit: "g/L", reference: "36-45" },
  { name: "Glukos", unit: "mmol/L", reference: "4.2-6.0 (fasta)" },
  { name: "Laktat", unit: "mmol/L", reference: "0.5-2.2" },
  { name: "PK-INR", unit: "", reference: "0.9-1.1" },
  { name: "APTT", unit: "sek", reference: "26-42" },
  { name: "D-dimer", unit: "mg/L", reference: "<0.50" },
  { name: "Troponin T", unit: "ng/L", reference: "<14" },
  { name: "ProBNP", unit: "ng/L", reference: "Åldersber." },
];

export default function LabbPage() {
  const { language } = useLanguage();
  const [labValues, setLabValues] = useState<LabValue[]>([]);
  const [freeText, setFreeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [interpretation, setInterpretation] = useState("");
  const [inputMode, setInputMode] = useState<"quick" | "paste">("quick");

  function addLabValue(name: string, unit: string, reference: string) {
    const existing = labValues.find((l) => l.name === name);
    if (existing) return;

    setLabValues((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, value: "", unit, reference },
    ]);
  }

  function updateLabValue(id: string, value: string) {
    setLabValues((prev) =>
      prev.map((l) => (l.id === id ? { ...l, value } : l))
    );
  }

  function removeLabValue(id: string) {
    setLabValues((prev) => prev.filter((l) => l.id !== id));
  }

  function formatLabsForBoris(): string {
    if (inputMode === "paste" && freeText.trim()) {
      return freeText.trim();
    }

    const filled = labValues.filter((l) => l.value.trim());
    if (filled.length === 0) return "";

    return filled
      .map((l) => `${l.name}: ${l.value} ${l.unit} (ref: ${l.reference})`)
      .join("\n");
  }

  async function interpretLabs() {
    const labText = formatLabsForBoris();
    if (!labText) return;

    setLoading(true);
    setInterpretation("");

    try {
      const response = await fetch("/api/boris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Tolka dessa labbvärden och förklara vad de betyder kliniskt. Var pedagogisk och förklara samband. Markera avvikande värden tydligt.\n\nLabbvärden:\n${labText}`,
          mode: "medicine",
          history: [],
        }),
      });

      const data = await response.json();
      setInterpretation(data?.reply ?? "Kunde inte tolka labbvärdena.");
    } catch {
      setInterpretation("Ett fel uppstod. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setLabValues([]);
    setFreeText("");
    setInterpretation("");
  }

  const hasLabs = inputMode === "quick"
    ? labValues.some((l) => l.value.trim())
    : freeText.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          Labbvärdes-tolkare
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Fyll i värden eller klistra in – Boris hjälper dig förstå
        </p>
      </div>

      {/* Input mode toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setInputMode("quick")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            inputMode === "quick"
              ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
          }`}
        >
          Välj prover
        </button>
        <button
          type="button"
          onClick={() => setInputMode("paste")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            inputMode === "paste"
              ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
          }`}
        >
          Klistra in text
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input section */}
        <div className="space-y-4">
          {inputMode === "quick" ? (
            <>
              {/* Quick add buttons */}
              <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                  Klicka för att lägga till:
                </p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_LABS.map((lab) => {
                    const isAdded = labValues.some((l) => l.name === lab.name);
                    return (
                      <button
                        key={lab.name}
                        type="button"
                        onClick={() => addLabValue(lab.name, lab.unit, lab.reference)}
                        disabled={isAdded}
                        className={`rounded-full px-3 py-1 text-sm transition ${
                          isAdded
                            ? "bg-neutral-200 text-neutral-400 dark:bg-neutral-700 cursor-not-allowed"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                        }`}
                      >
                        {lab.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected labs */}
              {labValues.length > 0 && (
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                    Fyll i värden:
                  </p>
                  <div className="space-y-3">
                    {labValues.map((lab) => (
                      <div key={lab.id} className="flex items-center gap-2">
                        <div className="w-20 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {lab.name}
                        </div>
                        <input
                          type="text"
                          value={lab.value}
                          onChange={(e) => updateLabValue(lab.id, e.target.value)}
                          className="w-24 rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                          placeholder="Värde"
                        />
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          {lab.unit}
                        </span>
                        <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-1">
                          ({lab.reference})
                        </span>
                        <button
                          type="button"
                          onClick={() => removeLabValue(lab.id)}
                          className="text-neutral-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Paste mode */
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Klistra in labbsvar:
              </p>
              <textarea
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                rows={10}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 font-mono dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                placeholder={`Exempel:\nHb 98 g/L\nCRP 85 mg/L\nKreatinin 145 µmol/L\nKalium 3.2 mmol/L`}
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={interpretLabs}
              disabled={!hasLabs || loading}
              className="flex-1 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              {loading ? "Boris tolkar..." : "🔬 Tolka med Boris"}
            </button>
            {(labValues.length > 0 || freeText || interpretation) && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
              >
                Rensa
              </button>
            )}
          </div>
        </div>

        {/* Interpretation */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          {interpretation ? (
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-sm">🔬</span>
                </div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Boris tolkning
                </h2>
              </div>
              <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-headings:mt-3 prose-headings:mb-2">
                <ReactMarkdown>{interpretation}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center dark:border-neutral-700 dark:bg-neutral-800/50">
              <div className="text-4xl mb-3">🔬</div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Fyll i labbvärden och klicka "Tolka med Boris" för att få en förklaring
              </p>
            </div>
          )}

          {/* Info box */}
          <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            <p className="font-medium mb-1">Observera</p>
            <p>
              Boris ger pedagogisk information för förståelse.
              Alla kliniska beslut ska fattas tillsammans med ansvarig läkare
              och baseras på helhetsbilden, inte enskilda värden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
