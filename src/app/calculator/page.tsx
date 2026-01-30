"use client";

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";

export default function CalculatorPage() {
  const { t } = useLanguage();

  // Drip rate calculator
  const [dripVolume, setDripVolume] = useState("");
  const [dripTime, setDripTime] = useState("");
  const [dropFactor, setDropFactor] = useState("20");
  const [dripResult, setDripResult] = useState<{ dropsPerMin: number; mlPerHour: number } | null>(null);

  // Dosage calculator
  const [dosePerKg, setDosePerKg] = useState("");
  const [weight, setWeight] = useState("");
  const [dosageResult, setDosageResult] = useState<number | null>(null);

  // BMI calculator
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string } | null>(null);

  function calculateDripRate() {
    const vol = parseFloat(dripVolume);
    const time = parseFloat(dripTime);
    const factor = parseFloat(dropFactor);

    if (isNaN(vol) || isNaN(time) || isNaN(factor) || time === 0) {
      setDripResult(null);
      return;
    }

    const mlPerHour = vol / time;
    const dropsPerMin = (vol * factor) / (time * 60);

    setDripResult({
      dropsPerMin: Math.round(dropsPerMin * 10) / 10,
      mlPerHour: Math.round(mlPerHour * 10) / 10,
    });
  }

  function calculateDosage() {
    const dose = parseFloat(dosePerKg);
    const w = parseFloat(weight);

    if (isNaN(dose) || isNaN(w)) {
      setDosageResult(null);
      return;
    }

    setDosageResult(Math.round(dose * w * 100) / 100);
  }

  function calculateBMI() {
    const h = parseFloat(bmiHeight);
    const w = parseFloat(bmiWeight);

    if (isNaN(h) || isNaN(w) || h === 0) {
      setBmiResult(null);
      return;
    }

    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
    const roundedBmi = Math.round(bmi * 10) / 10;

    let category = t.calc.bmiNormal;
    if (bmi < 18.5) category = t.calc.bmiUnderweight;
    else if (bmi >= 25 && bmi < 30) category = t.calc.bmiOverweight;
    else if (bmi >= 30) category = t.calc.bmiObese;

    setBmiResult({ bmi: roundedBmi, category });
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";

  const labelClass = "text-sm font-medium text-neutral-700 dark:text-neutral-300";

  const cardClass =
    "rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800";

  const buttonClass =
    "rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200";

  const resultClass =
    "mt-4 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-700";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.calc.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {t.calc.subtitle}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Drip Rate Calculator */}
        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t.calc.dripRate}
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {t.calc.dripRateDesc}
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <div>
              <label className={labelClass}>{t.calc.volume}</label>
              <input
                type="number"
                value={dripVolume}
                onChange={(e) => setDripVolume(e.target.value)}
                className={inputClass}
                placeholder="1000"
              />
            </div>
            <div>
              <label className={labelClass}>{t.calc.time}</label>
              <input
                type="number"
                value={dripTime}
                onChange={(e) => setDripTime(e.target.value)}
                className={inputClass}
                placeholder="8"
              />
            </div>
            <div>
              <label className={labelClass}>{t.calc.dropFactor}</label>
              <select
                value={dropFactor}
                onChange={(e) => setDropFactor(e.target.value)}
                className={inputClass}
              >
                <option value="10">10 (blod)</option>
                <option value="15">15</option>
                <option value="20">20 (standard)</option>
                <option value="60">60 (mikrodropp)</option>
              </select>
            </div>
            <button type="button" onClick={calculateDripRate} className={buttonClass}>
              {t.calc.calculate}
            </button>

            {dripResult && (
              <div className={resultClass}>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  <strong>{dripResult.dropsPerMin}</strong> {t.calc.dropsPerMin}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  <strong>{dripResult.mlPerHour}</strong> {t.calc.mlPerHour}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Dosage Calculator */}
        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t.calc.dosage}
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {t.calc.dosageDesc}
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <div>
              <label className={labelClass}>{t.calc.dose}</label>
              <input
                type="number"
                value={dosePerKg}
                onChange={(e) => setDosePerKg(e.target.value)}
                className={inputClass}
                placeholder="10"
                step="0.1"
              />
            </div>
            <div>
              <label className={labelClass}>{t.calc.weight}</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={inputClass}
                placeholder="70"
                step="0.1"
              />
            </div>
            <button type="button" onClick={calculateDosage} className={buttonClass}>
              {t.calc.calculate}
            </button>

            {dosageResult !== null && (
              <div className={resultClass}>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {t.calc.totalDose}: <strong>{dosageResult} mg</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* BMI Calculator */}
        <div className={cardClass}>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t.calc.bmi}
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {t.calc.bmiDesc}
          </p>

          <div className="mt-4 flex flex-col gap-3">
            <div>
              <label className={labelClass}>{t.calc.height}</label>
              <input
                type="number"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
                className={inputClass}
                placeholder="175"
              />
            </div>
            <div>
              <label className={labelClass}>{t.calc.weight}</label>
              <input
                type="number"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
                className={inputClass}
                placeholder="70"
                step="0.1"
              />
            </div>
            <button type="button" onClick={calculateBMI} className={buttonClass}>
              {t.calc.calculate}
            </button>

            {bmiResult && (
              <div className={resultClass}>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {t.calc.bmiResult}: <strong>{bmiResult.bmi}</strong>
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {bmiResult.category}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
