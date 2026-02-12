"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../lib/LanguageContext";

type Parameter = {
  id: string;
  label: string;
  options: { value: number; label: string; range?: string }[];
};

const PARAMETERS: Parameter[] = [
  {
    id: "respiration",
    label: "Andningsfrekvens",
    options: [
      { value: 3, label: "≤8", range: "≤8/min" },
      { value: 1, label: "9-11", range: "9-11/min" },
      { value: 0, label: "12-20", range: "12-20/min" },
      { value: 2, label: "21-24", range: "21-24/min" },
      { value: 3, label: "≥25", range: "≥25/min" },
    ],
  },
  {
    id: "spo2",
    label: "Saturation (SpO2)",
    options: [
      { value: 3, label: "≤91%", range: "≤91%" },
      { value: 2, label: "92-93%", range: "92-93%" },
      { value: 1, label: "94-95%", range: "94-95%" },
      { value: 0, label: "≥96%", range: "≥96%" },
    ],
  },
  {
    id: "oxygen",
    label: "Syrgastillförsel",
    options: [
      { value: 0, label: "Nej", range: "Rumsluft" },
      { value: 2, label: "Ja", range: "Syrgas" },
    ],
  },
  {
    id: "temperature",
    label: "Temperatur",
    options: [
      { value: 3, label: "≤35.0", range: "≤35.0°C" },
      { value: 1, label: "35.1-36.0", range: "35.1-36.0°C" },
      { value: 0, label: "36.1-38.0", range: "36.1-38.0°C" },
      { value: 1, label: "38.1-39.0", range: "38.1-39.0°C" },
      { value: 2, label: "≥39.1", range: "≥39.1°C" },
    ],
  },
  {
    id: "systolic",
    label: "Systoliskt blodtryck",
    options: [
      { value: 3, label: "≤90", range: "≤90 mmHg" },
      { value: 2, label: "91-100", range: "91-100 mmHg" },
      { value: 1, label: "101-110", range: "101-110 mmHg" },
      { value: 0, label: "111-219", range: "111-219 mmHg" },
      { value: 3, label: "≥220", range: "≥220 mmHg" },
    ],
  },
  {
    id: "pulse",
    label: "Puls",
    options: [
      { value: 3, label: "≤40", range: "≤40/min" },
      { value: 1, label: "41-50", range: "41-50/min" },
      { value: 0, label: "51-90", range: "51-90/min" },
      { value: 1, label: "91-110", range: "91-110/min" },
      { value: 2, label: "111-130", range: "111-130/min" },
      { value: 3, label: "≥131", range: "≥131/min" },
    ],
  },
  {
    id: "consciousness",
    label: "Medvetandegrad",
    options: [
      { value: 0, label: "Alert", range: "Vaken, orienterad" },
      { value: 3, label: "CVPU", range: "Nytillkommen förvirring, röst, smärta, ingen reaktion" },
    ],
  },
];

function getScoreColor(score: number): string {
  if (score === 0) return "bg-green-500";
  if (score <= 4) return "bg-yellow-500";
  if (score <= 6) return "bg-orange-500";
  return "bg-red-500";
}

function getScoreColorClass(score: number): string {
  if (score === 0) return "text-green-600 dark:text-green-400";
  if (score <= 4) return "text-yellow-600 dark:text-yellow-400";
  if (score <= 6) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

function getRiskLevel(score: number): { level: string; action: string; frequency: string } {
  if (score === 0) {
    return {
      level: "Låg risk",
      action: "Fortsätt rutinmässig övervakning",
      frequency: "Minst var 12:e timme",
    };
  }
  if (score <= 4) {
    return {
      level: "Låg risk",
      action: "Informera sjuksköterska. Bedöm om ökad övervakning behövs.",
      frequency: "Minst var 4-6:e timme",
    };
  }
  if (score === 5 || score === 6) {
    return {
      level: "Medelhög risk",
      action: "Akut bedömning av sjuksköterska. Överväg läkarkontakt.",
      frequency: "Minst varje timme",
    };
  }
  if (score >= 7) {
    return {
      level: "Hög risk",
      action: "AKUT läkarbedömning. Överväg intensivvård. Kontinuerlig övervakning.",
      frequency: "Kontinuerligt",
    };
  }
  // Single parameter score of 3
  return {
    level: "Låg-medel risk (enskild parameter 3)",
    action: "Akut bedömning av sjuksköterska. Överväg läkarkontakt.",
    frequency: "Minst varje timme",
  };
}

function useAnimatedScore(target: number, enabled: boolean) {
  const [display, setDisplay] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setDisplay(0);
      prevTarget.current = 0;
      return;
    }
    const from = prevTarget.current;
    const to = target;
    prevTarget.current = target;
    if (from === to) { setDisplay(to); return; }

    const steps = Math.abs(to - from);
    const duration = Math.min(400, steps * 80);
    const stepTime = duration / steps;
    let current = from;

    const timer = setInterval(() => {
      current += to > from ? 1 : -1;
      setDisplay(current);
      if (current === to) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, enabled]);

  return display;
}

export default function News2Page() {
  const { language } = useLanguage();
  const [values, setValues] = useState<Record<string, number | null>>({});

  const totalScore = Object.values(values).reduce((sum: number, val) => sum + (val ?? 0), 0);
  const hasAllValues = PARAMETERS.every(p => values[p.id] !== undefined && values[p.id] !== null);
  const hasAnyThree = Object.values(values).some(v => v === 3);
  const animatedScore = useAnimatedScore(totalScore, hasAllValues);

  const risk = hasAllValues ? getRiskLevel(hasAnyThree && totalScore < 5 ? 5 : totalScore) : null;

  function reset() {
    setValues({});
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          NEWS2 Kalkylator
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          National Early Warning Score 2 – tidig upptäckt av försämring
        </p>
      </div>

      {/* Score display */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Total poäng</p>
            <p className={`text-5xl font-bold tabular-nums transition-colors duration-300 ${hasAllValues ? getScoreColorClass(totalScore) : 'text-neutral-300 dark:text-neutral-600'}`}>
              {hasAllValues ? animatedScore : '–'}
            </p>
          </div>
          {hasAllValues && risk && (
            <div className={`rounded-full px-4 py-2 text-white text-sm font-medium ${getScoreColor(totalScore)}`}>
              {risk.level}
            </div>
          )}
        </div>

        {hasAllValues && risk && (
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
            <div className="space-y-2">
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Åtgärd</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{risk.action}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Kontrollfrekvens</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{risk.frequency}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Parameters */}
      <div className="grid gap-4 sm:grid-cols-2">
        {PARAMETERS.map((param) => (
          <div
            key={param.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
          >
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
              {param.label}
              {values[param.id] !== undefined && values[param.id] !== null && (
                <span className={`ml-2 ${values[param.id] === 3 ? 'text-red-500' : values[param.id] === 0 ? 'text-green-500' : 'text-yellow-500'}`}>
                  (+{values[param.id]})
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {param.options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setValues((prev) => ({ ...prev, [param.id]: option.value }))}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    values[param.id] === option.value &&
                    param.options.filter(o => o.value === option.value).indexOf(option) ===
                    param.options.filter(o => o.value === values[param.id]).indexOf(param.options.find(o => o.value === values[param.id] && o.label === option.label)!)
                      ? option.value === 3
                        ? "bg-red-500 text-white"
                        : option.value === 0
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                  } ${
                    values[param.id] === option.value ? "ring-2 ring-offset-2 ring-neutral-400 dark:ring-offset-neutral-800" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reset button */}
      {Object.keys(values).length > 0 && (
        <button
          type="button"
          onClick={reset}
          className="self-start rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          Återställ
        </button>
      )}

      {/* Info box */}
      <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <p className="font-medium mb-2">Om NEWS2</p>
        <p>
          NEWS2 är ett standardiserat system för att bedöma akut sjuka patienter.
          Poängen baseras på avvikelser från normala fysiologiska värden.
          Högre poäng = större risk för försämring.
        </p>
        <p className="mt-2 text-xs opacity-75">
          Följ alltid lokala riktlinjer och PM. NEWS2 ersätter inte klinisk bedömning.
        </p>
      </div>
    </div>
  );
}
