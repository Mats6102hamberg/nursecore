"use client";

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";

export default function SbarPage() {
  const { language } = useLanguage();

  const [situation, setSituation] = useState({
    name: "",
    room: "",
    problem: "",
  });

  const [background, setBackground] = useState({
    diagnosis: "",
    history: "",
    treatment: "",
  });

  const [assessment, setAssessment] = useState({
    vitals: "",
    observation: "",
    concern: "",
  });

  const [recommendation, setRecommendation] = useState({
    request: "",
    urgency: "normal" as "normal" | "urgent" | "acute",
  });

  const [copied, setCopied] = useState(false);

  function generateSbar(): string {
    const urgencyText = {
      normal: "",
      urgent: "BRÅDSKANDE: ",
      acute: "AKUT: ",
    };

    let text = `${urgencyText[recommendation.urgency]}SBAR-RAPPORT\n`;
    text += `${"=".repeat(40)}\n\n`;

    text += `📍 SITUATION\n`;
    text += `${"-".repeat(20)}\n`;
    if (situation.name) text += `Patient: ${situation.name}\n`;
    if (situation.room) text += `Sal/rum: ${situation.room}\n`;
    if (situation.problem) text += `Problem: ${situation.problem}\n`;
    text += `\n`;

    text += `📋 BAKGRUND\n`;
    text += `${"-".repeat(20)}\n`;
    if (background.diagnosis) text += `Diagnos: ${background.diagnosis}\n`;
    if (background.history) text += `Tidigare: ${background.history}\n`;
    if (background.treatment) text += `Behandling: ${background.treatment}\n`;
    text += `\n`;

    text += `🔍 AKTUELL BEDÖMNING\n`;
    text += `${"-".repeat(20)}\n`;
    if (assessment.vitals) text += `Vitalparametrar: ${assessment.vitals}\n`;
    if (assessment.observation) text += `Observation: ${assessment.observation}\n`;
    if (assessment.concern) text += `Min bedömning: ${assessment.concern}\n`;
    text += `\n`;

    text += `💡 REKOMMENDATION\n`;
    text += `${"-".repeat(20)}\n`;
    if (recommendation.request) text += `Önskar: ${recommendation.request}\n`;

    return text;
  }

  async function copyToClipboard() {
    const text = generateSbar();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function reset() {
    setSituation({ name: "", room: "", problem: "" });
    setBackground({ diagnosis: "", history: "", treatment: "" });
    setAssessment({ vitals: "", observation: "", concern: "" });
    setRecommendation({ request: "", urgency: "normal" });
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

  const labelClass = "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1";

  const hasContent = situation.problem || assessment.vitals || recommendation.request;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          SBAR Generator
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Skapa strukturerade rapporter för säker kommunikation
        </p>
      </div>

      {/* Urgency selector */}
      <div className="flex gap-2">
        {[
          { value: "normal", label: "Normal", color: "bg-neutral-100 dark:bg-neutral-800" },
          { value: "urgent", label: "Brådskande", color: "bg-yellow-100 dark:bg-yellow-900/30" },
          { value: "acute", label: "Akut", color: "bg-red-100 dark:bg-red-900/30" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setRecommendation((prev) => ({ ...prev, urgency: option.value as typeof prev.urgency }))}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              recommendation.urgency === option.value
                ? option.value === "acute"
                  ? "bg-red-500 text-white"
                  : option.value === "urgent"
                  ? "bg-yellow-500 text-white"
                  : "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : `${option.color} text-neutral-700 dark:text-neutral-300`
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input forms */}
        <div className="space-y-6">
          {/* Situation */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-sm">S</span>
              Situation
            </h2>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Patientnamn / ID</label>
                <input
                  type="text"
                  value={situation.name}
                  onChange={(e) => setSituation((prev) => ({ ...prev, name: e.target.value }))}
                  className={inputClass}
                  placeholder="Förnamn Efternamn"
                />
              </div>
              <div>
                <label className={labelClass}>Sal / Rum</label>
                <input
                  type="text"
                  value={situation.room}
                  onChange={(e) => setSituation((prev) => ({ ...prev, room: e.target.value }))}
                  className={inputClass}
                  placeholder="Sal 3, plats 2"
                />
              </div>
              <div>
                <label className={labelClass}>Vad händer? *</label>
                <textarea
                  value={situation.problem}
                  onChange={(e) => setSituation((prev) => ({ ...prev, problem: e.target.value }))}
                  className={inputClass}
                  rows={2}
                  placeholder="Patienten har blivit takykard och förvirrad..."
                />
              </div>
            </div>
          </div>

          {/* Background */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-sm">B</span>
              Bakgrund
            </h2>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Inläggningsdiagnos</label>
                <input
                  type="text"
                  value={background.diagnosis}
                  onChange={(e) => setBackground((prev) => ({ ...prev, diagnosis: e.target.value }))}
                  className={inputClass}
                  placeholder="Pneumoni"
                />
              </div>
              <div>
                <label className={labelClass}>Relevant historik</label>
                <input
                  type="text"
                  value={background.history}
                  onChange={(e) => setBackground((prev) => ({ ...prev, history: e.target.value }))}
                  className={inputClass}
                  placeholder="KOL, hjärtsvikt"
                />
              </div>
              <div>
                <label className={labelClass}>Pågående behandling</label>
                <input
                  type="text"
                  value={background.treatment}
                  onChange={(e) => setBackground((prev) => ({ ...prev, treatment: e.target.value }))}
                  className={inputClass}
                  placeholder="IV antibiotika dag 2"
                />
              </div>
            </div>
          </div>

          {/* Assessment */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sm">A</span>
              Aktuell bedömning
            </h2>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Vitalparametrar *</label>
                <input
                  type="text"
                  value={assessment.vitals}
                  onChange={(e) => setAssessment((prev) => ({ ...prev, vitals: e.target.value }))}
                  className={inputClass}
                  placeholder="AF 24, SpO2 91%, puls 110, BT 95/60, temp 38.5"
                />
              </div>
              <div>
                <label className={labelClass}>Observation</label>
                <textarea
                  value={assessment.observation}
                  onChange={(e) => setAssessment((prev) => ({ ...prev, observation: e.target.value }))}
                  className={inputClass}
                  rows={2}
                  placeholder="Ser ansträngd ut, svettig, svarar på tilltal..."
                />
              </div>
              <div>
                <label className={labelClass}>Min bedömning</label>
                <input
                  type="text"
                  value={assessment.concern}
                  onChange={(e) => setAssessment((prev) => ({ ...prev, concern: e.target.value }))}
                  className={inputClass}
                  placeholder="Misstänker försämring av infektion"
                />
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-sm">R</span>
              Rekommendation
            </h2>
            <div>
              <label className={labelClass}>Vad önskar du? *</label>
              <textarea
                value={recommendation.request}
                onChange={(e) => setRecommendation((prev) => ({ ...prev, request: e.target.value }))}
                className={inputClass}
                rows={2}
                placeholder="Önskar läkarbedömning, ev. nya odlingar och ändrad antibiotika"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Förhandsgranskning
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                >
                  Rensa
                </button>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!hasContent}
                  className="rounded-full bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  {copied ? "✓ Kopierat!" : "Kopiera"}
                </button>
              </div>
            </div>

            <pre className="whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg font-mono overflow-auto max-h-[500px]">
              {generateSbar()}
            </pre>
          </div>

          {/* Tips */}
          <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            <p className="font-medium mb-2">Tips för effektiv SBAR</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Var kortfattad men komplett</li>
              <li>Säg det viktigaste först</li>
              <li>Ha vitalparametrar redo</li>
              <li>Var tydlig med vad du önskar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
