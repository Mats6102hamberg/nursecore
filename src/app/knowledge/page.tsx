"use client";

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const IBD_CONTENT_SV = [
  {
    id: "ibd-intro",
    title: "Vad är IBD?",
    content: (
      <div className="space-y-3">
        <p>
          <strong>Inflammatorisk tarmsjukdom (IBD)</strong> är ett samlingsnamn för kroniska inflammatoriska tillstånd i mag-tarmkanalen.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Crohns sjukdom</strong> – kan drabba hela mag-tarmkanalen, ofta segmentellt</li>
          <li><strong>Ulcerös kolit</strong> – drabbar endast tjocktarmen, börjar i rektum</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ibd-symptoms",
    title: "Symtom att observera",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li>Diarré (ofta blodig vid ulcerös kolit)</li>
          <li>Buksmärta och kramper</li>
          <li>Viktnedgång och malnutrition</li>
          <li>Feber vid skov</li>
          <li>Trötthet och anemi</li>
          <li>Extraintestinala manifestationer (leder, hud, ögon)</li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded">
          ⚠️ <strong>Varningssignaler:</strong> Hög feber, svår buksmärta, kraftig blödning, tecken på ileus
        </p>
      </div>
    ),
  },
  {
    id: "ibd-nursing",
    title: "Omvårdnadsåtgärder",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Vätskebalans:</strong> Monitorera in/ut, vikt dagligen</li>
          <li><strong>Nutrition:</strong> Ofta parenteral eller enteral nutrition vid skov</li>
          <li><strong>Hud:</strong> Perianal hudvård vid frekventa diarréer</li>
          <li><strong>Smärta:</strong> Regelbunden smärtskattning (VAS/NRS)</li>
          <li><strong>Psykiskt stöd:</strong> Kronisk sjukdom påverkar livskvalitet</li>
          <li><strong>Läkemedel:</strong> Observera biverkningar av steroider, immunmodulerare, biologiska läkemedel</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ibd-labs",
    title: "Viktiga labprover",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>CRP/SR</strong> – inflammationsmarkörer</li>
          <li><strong>Hb</strong> – anemi vanligt</li>
          <li><strong>Albumin</strong> – nutritionsstatus</li>
          <li><strong>Elektrolyter</strong> – K, Na, Mg vid diarré</li>
          <li><strong>F-kalprotektin</strong> – tarmspecifik inflammation</li>
          <li><strong>Leverprover</strong> – vid biologisk behandling</li>
        </ul>
      </div>
    ),
  },
];

const LIVER_CONTENT_SV = [
  {
    id: "liver-intro",
    title: "Leversjukdomar – översikt",
    content: (
      <div className="space-y-3">
        <p>Vanliga leversjukdomar på medicinavdelning:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Cirros</strong> – kronisk leverskada med fibros</li>
          <li><strong>Hepatit</strong> – viral (A, B, C), alkohol, autoimmun</li>
          <li><strong>Akut leversvikt</strong> – snabb försämring av leverfunktion</li>
          <li><strong>Hepatocellulärt karcinom (HCC)</strong> – levercancer</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-complications",
    title: "Komplikationer vid cirros",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ascites</strong> – vätska i buken, behandlas med diuretika/tappning</li>
          <li><strong>Hepatisk encefalopati</strong> – förvirring, asterixis, koma</li>
          <li><strong>Varicer</strong> – ökad blödningsrisk i esofagus/ventrikel</li>
          <li><strong>Hepatorenalt syndrom</strong> – njursvikt sekundärt till leversvikt</li>
          <li><strong>Spontan bakteriell peritonit (SBP)</strong> – infektion i ascites</li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded">
          ⚠️ <strong>Akut:</strong> Blodkräkning, svart avföring, snabb förvirring → kontakta läkare omedelbart
        </p>
      </div>
    ),
  },
  {
    id: "liver-nursing",
    title: "Omvårdnadsåtgärder",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Vätskebalans:</strong> Daglig vikt, bukomfång, in/ut</li>
          <li><strong>Nutrition:</strong> Proteinrik kost (om ej encefalopati), små måltider</li>
          <li><strong>Hud:</strong> Klåda vanligt – mjukgörande, svalt</li>
          <li><strong>Medvetandegrad:</strong> Regelbunden bedömning (encefalopati-skala)</li>
          <li><strong>Blödningsrisk:</strong> Försiktighet med injektioner, observera blödningstecken</li>
          <li><strong>Laktulos:</strong> Vid encefalopati – sikta på 2-3 mjuka avföringar/dag</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-labs",
    title: "Viktiga labprover",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ASAT/ALAT</strong> – levercellskada</li>
          <li><strong>ALP/GT</strong> – gallstas</li>
          <li><strong>Bilirubin</strong> – ikterus</li>
          <li><strong>Albumin</strong> – leverns syntetiska funktion</li>
          <li><strong>PK-INR</strong> – koagulation</li>
          <li><strong>Ammoniak</strong> – vid misstänkt encefalopati</li>
          <li><strong>Kreatinin</strong> – njurfunktion</li>
        </ul>
      </div>
    ),
  },
];

const ICU_CONTENT_SV = [
  {
    id: "icu-abcde",
    title: "ABCDE – systematisk bedömning",
    content: (
      <div className="space-y-3">
        <ul className="list-none space-y-2">
          <li><strong className="text-red-600">A – Airway:</strong> Fri luftväg? Stridor? Behov av sug/nässvalg?</li>
          <li><strong className="text-orange-600">B – Breathing:</strong> Andningsfrekvens, saturation, andningsmönster, lungljud</li>
          <li><strong className="text-yellow-600">C – Circulation:</strong> Puls, blodtryck, kapillär återfyllnad, hudfärg, diures</li>
          <li><strong className="text-green-600">D – Disability:</strong> Medvetandegrad (GCS/RLS), pupiller, blodsocker</li>
          <li><strong className="text-blue-600">E – Exposure:</strong> Temperatur, hudinspektion, smärta</li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded">
          💡 Gå alltid igenom ABCDE i ordning. Åtgärda problem innan du går vidare.
        </p>
      </div>
    ),
  },
  {
    id: "icu-ventilator",
    title: "Ventilatorvård – grunder",
    content: (
      <div className="space-y-3">
        <p><strong>Vanliga inställningar att känna till:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>FiO2</strong> – syrgaskoncentration (21-100%)</li>
          <li><strong>PEEP</strong> – positivt slutexpiratoriskt tryck</li>
          <li><strong>Tidalvolym (Vt)</strong> – volym per andetag</li>
          <li><strong>Andningsfrekvens (f)</strong> – antal andetag/min</li>
        </ul>
        <p className="mt-3"><strong>Omvårdnad:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Munvård var 4:e timme – minskar VAP-risk</li>
          <li>Kufftr tryck 20-30 cmH2O</li>
          <li>Huvudända höjd 30-45°</li>
          <li>Daglig väckningsförsök (SAT) om ordinerat</li>
        </ul>
      </div>
    ),
  },
  {
    id: "icu-sedation",
    title: "Sedation och smärta",
    content: (
      <div className="space-y-3">
        <p><strong>Vanliga skalor:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>RASS</strong> – Richmond Agitation-Sedation Scale (-5 till +4)</li>
          <li><strong>CPOT</strong> – Critical-Care Pain Observation Tool (0-8)</li>
          <li><strong>CAM-ICU</strong> – delirium-screening</li>
        </ul>
        <p className="mt-3"><strong>Mål:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Lätt sedation (RASS 0 till -2) om möjligt</li>
          <li>Smärtfrihet före sedation</li>
          <li>Daglig delirium-screening</li>
        </ul>
      </div>
    ),
  },
  {
    id: "icu-monitoring",
    title: "Övervakning",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Kontinuerligt:</strong> EKG, SpO2, etCO2 (om intuberad)</li>
          <li><strong>Intermittent:</strong> Blodtryck, CVP, timdiures</li>
          <li><strong>Invasivt:</strong> Artärnål (kontinuerligt BT), CVK, ev. Swan-Ganz</li>
        </ul>
        <p className="mt-3"><strong>Reagera på:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>MAP &lt; 65 mmHg</li>
          <li>SpO2 &lt; 90%</li>
          <li>Timdiures &lt; 0.5 ml/kg/h</li>
          <li>Snabb förändring i vitalparametrar</li>
        </ul>
      </div>
    ),
  },
];

export default function KnowledgePage() {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"ibd" | "liver" | "icu">("ibd");

  const content = {
    ibd: IBD_CONTENT_SV,
    liver: LIVER_CONTENT_SV,
    icu: ICU_CONTENT_SV,
  };

  const tabs = [
    { id: "ibd" as const, label: t.knowledge.ibd },
    { id: "liver" as const, label: t.knowledge.liver },
    { id: "icu" as const, label: t.knowledge.icu },
  ];

  function toggleSection(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {t.knowledge.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600">{t.knowledge.subtitle}</p>
      </div>

      <div className="flex gap-2 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "border-b-2 border-neutral-900 text-neutral-900"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {content[activeTab].map((section) => (
          <div
            key={section.id}
            className="rounded-xl border border-neutral-200 bg-white shadow-sm"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-neutral-900">
                {section.title}
              </span>
              <span className="text-neutral-400">
                {expanded[section.id] ? "−" : "+"}
              </span>
            </button>
            {expanded[section.id] && (
              <div className="border-t border-neutral-100 p-4 text-sm text-neutral-700">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
