"use client";

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const IBD_CONTENT_SV: Section[] = [
  {
    id: "ibd-intro",
    title: "Vad är IBD?",
    content: (
      <div className="space-y-3">
        <p>
          <strong>Inflammatorisk tarmsjukdom (IBD)</strong> är ett samlingsnamn för kroniska inflammatoriska tillstånd i mag-tarmkanalen.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Crohns sjukdom</strong> – kan drabba hela mag-tarmkanalen, ofta segmentellt, transmural inflammation</li>
          <li><strong>Ulcerös kolit</strong> – drabbar endast tjocktarmen, börjar i rektum, kontinuerlig inflammation i mukosan</li>
        </ul>
        <p className="mt-2">Båda sjukdomarna går i skov med perioder av försämring och förbättring.</p>
      </div>
    ),
  },
  {
    id: "ibd-symptoms",
    title: "Symtom att observera",
    content: (
      <div className="space-y-3">
        <p><strong>Tarmsymtom:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Diarré (ofta blodig vid ulcerös kolit)</li>
          <li>Buksmärta och kramper</li>
          <li>Tenesmer (trängningar)</li>
          <li>Illamående och kräkningar</li>
        </ul>
        <p className="mt-3"><strong>Allmänsymtom:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Viktnedgång och malnutrition</li>
          <li>Feber vid skov</li>
          <li>Trötthet och anemi</li>
          <li>Nattliga symtom (väcker patienten)</li>
        </ul>
        <p className="mt-3"><strong>Extraintestinala manifestationer (10-30%):</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Leder – artrit, sacroiliit</li>
          <li>Hud – erythema nodosum, pyoderma gangrenosum</li>
          <li>Ögon – uveit, episklerit</li>
          <li>Lever – primär skleroserande kolangit (PSC)</li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3">
          ⚠️ <strong>Varningssignaler:</strong> Hög feber, svår buksmärta, kraftig blödning, tecken på ileus, peritonit
        </p>
      </div>
    ),
  },
  {
    id: "ibd-treatment",
    title: "Behandling – översikt",
    content: (
      <div className="space-y-3">
        <p><strong>Läkemedelsgrupper:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>5-ASA (mesalazin)</strong> – förstahandsval vid mild UC, få biverkningar</li>
          <li><strong>Kortikosteroider</strong> – vid skov, ej underhållsbehandling, biverkningar vid långtidsbruk</li>
          <li><strong>Tiopuriner (azatioprin, 6-MP)</strong> – immunmodulerare, underhållsbehandling</li>
          <li><strong>Metotrexat</strong> – främst vid Crohns</li>
          <li><strong>Biologiska läkemedel</strong> – TNF-hämmare (infliximab, adalimumab), integrin-hämmare (vedolizumab), IL-hämmare</li>
          <li><strong>JAK-hämmare (tofacitinib)</strong> – vid UC</li>
        </ul>
        <p className="mt-3"><strong>Kirurgi:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>UC: Kolektomi kan vara kurativ</li>
          <li>Crohns: Resektion vid komplikationer, ej kurativ</li>
          <li>Stomi kan bli aktuellt – permanent eller temporär</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ibd-nursing",
    title: "Omvårdnadsåtgärder",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Vätskebalans:</strong> Monitorera in/ut, vikt dagligen, tecken på dehydrering</li>
          <li><strong>Nutrition:</strong> Ofta parenteral eller enteral nutrition vid svårt skov, kostregistrering</li>
          <li><strong>Avföringsobservation:</strong> Frekvens, konsistens, blod, slem – Bristol-skala</li>
          <li><strong>Hud:</strong> Perianal hudvård vid frekventa diarréer, barriärkräm</li>
          <li><strong>Smärta:</strong> Regelbunden smärtskattning (VAS/NRS), undvik NSAID</li>
          <li><strong>Vila:</strong> Främja vila vid skov, balansera med mobilisering</li>
          <li><strong>Psykiskt stöd:</strong> Kronisk sjukdom påverkar livskvalitet, var lyhörd</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3">
          💡 <strong>Tips:</strong> Identifiera patientens triggers (stress, viss mat) och dokumentera
        </p>
      </div>
    ),
  },
  {
    id: "ibd-medications",
    title: "Läkemedelsövervakning",
    content: (
      <div className="space-y-3">
        <p><strong>Kortikosteroider – observera:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Blodsocker (steroiddiabetes)</li>
          <li>Blodtryck</li>
          <li>Sömnstörningar, humörpåverkan</li>
          <li>Infektionstecken (maskeras)</li>
        </ul>
        <p className="mt-3"><strong>Biologiska läkemedel – observera:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Infusionsreaktioner (infliximab) – feber, frossa, klåda, andnöd</li>
          <li>Infektionsscreening före start (TB, hepatit)</li>
          <li>Injektionsställen vid subkutan behandling</li>
          <li>Ökad infektionsrisk</li>
        </ul>
        <p className="mt-3"><strong>Tiopuriner – observera:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Benmärgspåverkan – följ blodstatus</li>
          <li>Leverpåverkan</li>
          <li>Illamående</li>
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
          <li><strong>Hb</strong> – anemi vanligt (järnbrist, B12, folat)</li>
          <li><strong>Albumin</strong> – nutritionsstatus</li>
          <li><strong>Elektrolyter</strong> – K, Na, Mg vid diarré</li>
          <li><strong>F-kalprotektin</strong> – tarmspecifik inflammation, korrelerar med endoskopisk aktivitet</li>
          <li><strong>Leverprover</strong> – vid biologisk behandling, PSC-screening</li>
          <li><strong>Njurfunktion</strong> – vid mesalazinbehandling</li>
          <li><strong>TPMT</strong> – före tiopurinstart</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ibd-stoma",
    title: "Stomivård vid IBD",
    content: (
      <div className="space-y-3">
        <p><strong>Typer:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ileostomi</strong> – tunntarmsstomi, lös avföring, hög vätskeförlust</li>
          <li><strong>Kolostomi</strong> – tjocktarmsstomi, mer formad avföring</li>
        </ul>
        <p className="mt-3"><strong>Observation av stomi:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Färg (ska vara rosa/röd)</li>
          <li>Svullnad (normalt postoperativt)</li>
          <li>Blödning (lätt vid beröring normalt)</li>
          <li>Hud runt stomi (rodnad, sår)</li>
        </ul>
        <p className="mt-3"><strong>Komplikationer:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Hudproblem – läckage, allergi</li>
          <li>Prolaps – stomin buktar ut</li>
          <li>Stenos – förträngning</li>
          <li>Parastomalt bråck</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3">
          💡 Involvera stomiterapeut tidigt. Psykologiskt stöd viktigt – förändrad kroppsuppfattning.
        </p>
      </div>
    ),
  },
  {
    id: "ibd-patient-education",
    title: "Patientundervisning",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Sjukdomsförståelse</strong> – kronisk men hanterbar, skov och remission</li>
          <li><strong>Läkemedel</strong> – vikten av följsamhet även i remission</li>
          <li><strong>Kost</strong> – individuellt, matdagbok kan hjälpa identifiera triggers</li>
          <li><strong>Rökning</strong> – försämrar Crohns, kan förbättra UC (men rekommenderas ej!)</li>
          <li><strong>Stress</strong> – kan trigga skov, stresshantering viktig</li>
          <li><strong>När söka vård</strong> – feber, ökad blödning, svår smärta</li>
          <li><strong>Fertilitet/graviditet</strong> – planera med läkare, de flesta läkemedel OK</li>
        </ul>
      </div>
    ),
  },
];

const LIVER_CONTENT_SV: Section[] = [
  {
    id: "liver-intro",
    title: "Leversjukdomar – översikt",
    content: (
      <div className="space-y-3">
        <p>Vanliga leversjukdomar på medicinavdelning:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Cirros</strong> – kronisk leverskada med fibros och nodulär regeneration</li>
          <li><strong>Hepatit</strong> – viral (A, B, C, D, E), alkohol, autoimmun, läkemedelsinducerad</li>
          <li><strong>Alkoholrelaterad leversjukdom</strong> – fettlever → hepatit → cirros</li>
          <li><strong>NAFLD/NASH</strong> – icke-alkoholorsakad fettleversjukdom</li>
          <li><strong>Akut leversvikt</strong> – snabb försämring av leverfunktion</li>
          <li><strong>Hepatocellulärt karcinom (HCC)</strong> – levercancer, ofta på cirrhos</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-function",
    title: "Leverns funktioner",
    content: (
      <div className="space-y-3">
        <p>Levern har över 500 funktioner. De viktigaste:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Metabolism</strong> – kolhydrater, fett, protein</li>
          <li><strong>Syntes</strong> – albumin, koagulationsfaktorer, gallsyror</li>
          <li><strong>Detoxifiering</strong> – läkemedel, ammoniak → urea</li>
          <li><strong>Lagring</strong> – glykogen, vitaminer (A, D, B12), järn</li>
          <li><strong>Gallproduktion</strong> – för fettabsorption</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3">
          💡 Vid leversvikt påverkas alla dessa funktioner – förklarar mångfalden av symtom.
        </p>
      </div>
    ),
  },
  {
    id: "liver-complications",
    title: "Komplikationer vid cirros",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Portal hypertension</strong> – ökat tryck i portavenen, grundorsak till många komplikationer
          </li>
          <li>
            <strong>Ascites</strong> – vätska i buken
            <ul className="list-circle pl-5 mt-1 text-sm">
              <li>Behandling: Saltrestriktion, diuretika (spironolakton + furosemid), tappning</li>
            </ul>
          </li>
          <li>
            <strong>Hepatisk encefalopati (HE)</strong> – förvirring pga ammoniak
            <ul className="list-circle pl-5 mt-1 text-sm">
              <li>Grad 1-4: Koncentrationssvårigheter → koma</li>
              <li>Behandling: Laktulos, rifaximin, identifiera utlösande faktor</li>
            </ul>
          </li>
          <li>
            <strong>Esofagusvaricer</strong> – vidgade vener i matstrupen
            <ul className="list-circle pl-5 mt-1 text-sm">
              <li>Blödning kan vara livshotande</li>
              <li>Profylax: Betablockad, ligering</li>
            </ul>
          </li>
          <li>
            <strong>Hepatorenalt syndrom (HRS)</strong> – njursvikt sekundärt till leversvikt
          </li>
          <li>
            <strong>Spontan bakteriell peritonit (SBP)</strong> – infektion i ascitesvätska
            <ul className="list-circle pl-5 mt-1 text-sm">
              <li>Symtom: Feber, buksmärta, försämrad HE</li>
              <li>Diagnos: Ascitestappning med cellräkning</li>
            </ul>
          </li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3">
          ⚠️ <strong>Akut:</strong> Blodkräkning, melena, snabb förvirring, oliguri → kontakta läkare omedelbart
        </p>
      </div>
    ),
  },
  {
    id: "liver-encephalopathy",
    title: "Hepatisk encefalopati – fördjupning",
    content: (
      <div className="space-y-3">
        <p><strong>West Haven-kriterier:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Grad 0:</strong> Ingen påverkan (kan ha minimal HE på tester)</li>
          <li><strong>Grad 1:</strong> Milda personlighetsförändringar, sömnstörning, koncentrationssvårigheter</li>
          <li><strong>Grad 2:</strong> Letargi, desorientering i tid, asterixis (flapping tremor)</li>
          <li><strong>Grad 3:</strong> Somnolent men väckbar, förvirrad, aggressiv</li>
          <li><strong>Grad 4:</strong> Koma</li>
        </ul>
        <p className="mt-3"><strong>Utlösande faktorer:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Infektion (SBP, UVI, pneumoni)</li>
          <li>GI-blödning (proteinbelastning)</li>
          <li>Förstoppning</li>
          <li>Elektrolytrubbning (hypokalemi, hyponatremi)</li>
          <li>Njursvikt</li>
          <li>Läkemedel (sedativa, opiater)</li>
          <li>Dehydrering</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3">
          💡 <strong>Asterixis-test:</strong> Be patienten sträcka armarna framåt med händerna dorsalflekterade. Positiv om "flapping" ses.
        </p>
      </div>
    ),
  },
  {
    id: "liver-child-pugh",
    title: "Child-Pugh & MELD",
    content: (
      <div className="space-y-3">
        <p><strong>Child-Pugh-klassifikation</strong> – bedömer svårighetsgrad av cirros:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-neutral-200 mt-2">
            <thead className="bg-neutral-50">
              <tr>
                <th className="border-b px-3 py-2 text-left">Parameter</th>
                <th className="border-b px-3 py-2">1 poäng</th>
                <th className="border-b px-3 py-2">2 poäng</th>
                <th className="border-b px-3 py-2">3 poäng</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border-b px-3 py-2">Bilirubin (µmol/L)</td><td className="border-b px-3 py-2 text-center">&lt;34</td><td className="border-b px-3 py-2 text-center">34-50</td><td className="border-b px-3 py-2 text-center">&gt;50</td></tr>
              <tr><td className="border-b px-3 py-2">Albumin (g/L)</td><td className="border-b px-3 py-2 text-center">&gt;35</td><td className="border-b px-3 py-2 text-center">28-35</td><td className="border-b px-3 py-2 text-center">&lt;28</td></tr>
              <tr><td className="border-b px-3 py-2">PK-INR</td><td className="border-b px-3 py-2 text-center">&lt;1.7</td><td className="border-b px-3 py-2 text-center">1.7-2.3</td><td className="border-b px-3 py-2 text-center">&gt;2.3</td></tr>
              <tr><td className="border-b px-3 py-2">Ascites</td><td className="border-b px-3 py-2 text-center">Ingen</td><td className="border-b px-3 py-2 text-center">Måttlig</td><td className="border-b px-3 py-2 text-center">Svår</td></tr>
              <tr><td className="px-3 py-2">Encefalopati</td><td className="px-3 py-2 text-center">Ingen</td><td className="px-3 py-2 text-center">Grad 1-2</td><td className="px-3 py-2 text-center">Grad 3-4</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2"><strong>Klass A:</strong> 5-6p | <strong>Klass B:</strong> 7-9p | <strong>Klass C:</strong> 10-15p</p>
        <p className="mt-3"><strong>MELD-score</strong> – används för transplantationsprioritet:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Baseras på bilirubin, INR, kreatinin</li>
          <li>Högre poäng = sämre prognos, högre prioritet för transplantation</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-nursing",
    title: "Omvårdnadsåtgärder",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Vätskebalans:</strong> Daglig vikt, bukomfång vid ascites, in/ut-registrering</li>
          <li><strong>Nutrition:</strong> Tillräckligt protein (1.2-1.5 g/kg), små frekventa måltider, kvällsmål</li>
          <li><strong>Medvetandegrad:</strong> Regelbunden bedömning, asterixis-test, orientering</li>
          <li><strong>Hud:</strong> Klåda vanligt – mjukgörande, svalt, undvik att klia, kolestyramin</li>
          <li><strong>Blödningsrisk:</strong> Försiktighet med injektioner, observera blödningstecken, mjuk tandborste</li>
          <li><strong>Infektionsrisk:</strong> Hygien, temperaturkontroll, observera tecken på SBP</li>
          <li><strong>Fallrisk:</strong> Vid encefalopati och muskelsvaghet</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-lactulose",
    title: "Laktulos vid encefalopati",
    content: (
      <div className="space-y-3">
        <p><strong>Verkningsmekanism:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Sänker pH i tarmen → ammoniak blir ammonium som inte absorberas</li>
          <li>Osmotisk laxativ effekt → snabbare tarmpassage</li>
        </ul>
        <p className="mt-3"><strong>Dosering:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Startdos ofta 30-45 ml x 2-3</li>
          <li>Titrera till 2-3 mjuka avföringar per dag</li>
          <li>Vid akut HE: Lavemang med laktulos kan ges</li>
        </ul>
        <p className="mt-3"><strong>Observera:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Diarré → dehydrering, elektrolytrubbning → kan förvärra HE</li>
          <li>Buksmärta, gasbesvär vanligt initialt</li>
          <li>Följ avföringsfrekvens och konsistens</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-paracentesis",
    title: "Ascitestappning (paracentes)",
    content: (
      <div className="space-y-3">
        <p><strong>Indikation:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Terapeutisk: Svår ascites med andningspåverkan eller obehag</li>
          <li>Diagnostisk: Vid misstanke om SBP</li>
        </ul>
        <p className="mt-3"><strong>Före:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Kontrollera koagulation (PK, TPK) – men sällan kontraindikation</li>
          <li>Tömma urinblåsa</li>
          <li>Informera patienten</li>
        </ul>
        <p className="mt-3"><strong>Under/efter:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Monitorera blodtryck</li>
          <li>Vid &gt;5L tappning: Albumin iv (6-8g per liter tappat)</li>
          <li>Observera insticksstället (läckage, blödning)</li>
          <li>Vikt före och efter</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-labs",
    title: "Viktiga labprover",
    content: (
      <div className="space-y-3">
        <p><strong>Levercellskada:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ASAT/ALAT</strong> – förhöjda vid hepatocytskada, ALAT mer leverspecifikt</li>
        </ul>
        <p className="mt-3"><strong>Gallstas:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ALP/GT</strong> – förhöjda vid kolestastisk bild</li>
          <li><strong>Bilirubin</strong> – orsakar ikterus</li>
        </ul>
        <p className="mt-3"><strong>Leverfunktion:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Albumin</strong> – syntetisk funktion (lång halveringstid)</li>
          <li><strong>PK-INR</strong> – koagulationsfaktorer (kort halveringstid, reagerar snabbt)</li>
        </ul>
        <p className="mt-3"><strong>Övrigt:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ammoniak</strong> – vid misstänkt encefalopati (venöst prov, iskylt)</li>
          <li><strong>Kreatinin/eGFR</strong> – njurfunktion</li>
          <li><strong>Na</strong> – ofta lågt vid cirros (dilution)</li>
          <li><strong>Blodstatus</strong> – anemi, trombocytopeni vid hypersplenism</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-medications",
    title: "Läkemedel vid leversjukdom",
    content: (
      <div className="space-y-3">
        <p className="text-amber-700 bg-amber-50 p-2 rounded">
          ⚠️ Många läkemedel metaboliseras i levern – dosjustering ofta nödvändig vid cirros!
        </p>
        <p className="mt-3"><strong>Undvik/försiktighet:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Paracetamol</strong> – max 2-3g/dygn vid cirros</li>
          <li><strong>NSAID</strong> – njurpåverkan, blödningsrisk, ascites</li>
          <li><strong>Opiater</strong> – försiktighet, kan utlösa HE</li>
          <li><strong>Sedativa</strong> – kan utlösa/förvärra HE</li>
          <li><strong>Aminoglykosider</strong> – njurtoxicitet</li>
        </ul>
        <p className="mt-3"><strong>Vanlig behandling:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Spironolakton</strong> – förstahandsdiuretika vid ascites</li>
          <li><strong>Furosemid</strong> – ofta i kombination</li>
          <li><strong>Propranolol/karvedilol</strong> – varicesprofylax</li>
          <li><strong>Laktulos</strong> – encefalopati</li>
          <li><strong>Rifaximin</strong> – HE-profylax</li>
          <li><strong>Norfloxacin</strong> – SBP-profylax</li>
        </ul>
      </div>
    ),
  },
];

const ICU_CONTENT_SV: Section[] = [
  {
    id: "icu-abcde",
    title: "ABCDE – systematisk bedömning",
    content: (
      <div className="space-y-3">
        <ul className="list-none space-y-3">
          <li>
            <strong className="text-red-600">A – Airway (Luftväg)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Fri luftväg? Kan patienten prata?</li>
              <li>Stridor, gurglande, snarkande ljud?</li>
              <li>Behov av sug, svalgtub, nässvalg?</li>
              <li>Intuberad – tubläge, kufftr tryck?</li>
            </ul>
          </li>
          <li>
            <strong className="text-orange-600">B – Breathing (Andning)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Andningsfrekvens (normalt 12-20/min)</li>
              <li>Saturation (mål ofta &gt;94%, COPD &gt;88-92%)</li>
              <li>Andningsmönster – djup, ytlig, ansträngd?</li>
              <li>Lungljud – rassel, ronki, nedsatta?</li>
              <li>Syrgasbehov – flöde, device?</li>
            </ul>
          </li>
          <li>
            <strong className="text-yellow-600">C – Circulation (Cirkulation)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Puls – frekvens, rytm, fyllnad</li>
              <li>Blodtryck – MAP (mål ofta &gt;65 mmHg)</li>
              <li>Kapillär återfyllnad (&lt;2 sek normalt)</li>
              <li>Hudfärg – blek, cyanotisk, marmorerad?</li>
              <li>Timdiures (mål &gt;0.5 ml/kg/h)</li>
              <li>Laktat (förhöjt vid hypoperfusion)</li>
            </ul>
          </li>
          <li>
            <strong className="text-green-600">D – Disability (Neurologi)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Medvetandegrad – GCS eller RLS</li>
              <li>Pupiller – storlek, ljusreaktion, sidobedömning</li>
              <li>Blodsocker</li>
              <li>Fokal neurologi?</li>
            </ul>
          </li>
          <li>
            <strong className="text-blue-600">E – Exposure (Exponering)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Temperatur (feber, hypotermi)</li>
              <li>Hud – utslag, petekier, sår, tryck</li>
              <li>Smärta – lokalisation, intensitet</li>
              <li>Miljö – säkra slangar, droppställningar</li>
            </ul>
          </li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3">
          💡 <strong>Kom ihåg:</strong> Åtgärda problem i varje steg innan du går vidare! A-problem är alltid prio 1.
        </p>
      </div>
    ),
  },
  {
    id: "icu-gcs-rls",
    title: "GCS och RLS-85",
    content: (
      <div className="space-y-3">
        <p><strong>Glasgow Coma Scale (GCS) – 3-15 poäng:</strong></p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-neutral-200 mt-2">
            <thead className="bg-neutral-50">
              <tr>
                <th className="border-b px-3 py-2 text-left">Ögonöppning</th>
                <th className="border-b px-3 py-2 text-left">Verbalt svar</th>
                <th className="border-b px-3 py-2 text-left">Motoriskt svar</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr><td className="border-b px-3 py-1">4 – Spontant</td><td className="border-b px-3 py-1">5 – Orienterad</td><td className="border-b px-3 py-1">6 – Lyder uppmaning</td></tr>
              <tr><td className="border-b px-3 py-1">3 – På tilltal</td><td className="border-b px-3 py-1">4 – Förvirrad</td><td className="border-b px-3 py-1">5 – Lokaliserar smärta</td></tr>
              <tr><td className="border-b px-3 py-1">2 – På smärta</td><td className="border-b px-3 py-1">3 – Osammanhängande</td><td className="border-b px-3 py-1">4 – Drar undan</td></tr>
              <tr><td className="border-b px-3 py-1">1 – Ingen</td><td className="border-b px-3 py-1">2 – Oförståeliga ljud</td><td className="border-b px-3 py-1">3 – Böjreaktion</td></tr>
              <tr><td className="px-3 py-1"></td><td className="px-3 py-1">1 – Ingen</td><td className="px-3 py-1">2 – Sträckreaktion</td></tr>
              <tr><td className="px-3 py-1"></td><td className="px-3 py-1"></td><td className="px-3 py-1">1 – Ingen</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3"><strong>RLS-85 – 1-8:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>1:</strong> Vaken, orienterad</li>
          <li><strong>2:</strong> Slö, oklar, kontaktbar</li>
          <li><strong>3:</strong> Mycket slö, går att väcka</li>
          <li><strong>4:</strong> Medvetslös, lokaliserar smärta</li>
          <li><strong>5:</strong> Medvetslös, drar undan</li>
          <li><strong>6:</strong> Medvetslös, böjreaktion</li>
          <li><strong>7:</strong> Medvetslös, sträckreaktion</li>
          <li><strong>8:</strong> Medvetslös, ingen reaktion</li>
        </ul>
      </div>
    ),
  },
  {
    id: "icu-ventilator",
    title: "Ventilatorvård – grunder",
    content: (
      <div className="space-y-3">
        <p><strong>Vanliga inställningar:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>FiO2</strong> – syrgaskoncentration (21-100%), sikta så lågt som möjligt</li>
          <li><strong>PEEP</strong> – positivt slutexpiratoriskt tryck, håller alveoler öppna</li>
          <li><strong>Tidalvolym (Vt)</strong> – volym per andetag, ofta 6-8 ml/kg ideal kroppsvikt</li>
          <li><strong>Andningsfrekvens (f)</strong> – antal andetag/min</li>
          <li><strong>Tryckstöd (PS)</strong> – vid spontanandning</li>
        </ul>
        <p className="mt-3"><strong>Ventilatorlägen:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Kontrollerad</strong> – ventilatorn styr helt (t.ex. volymkontrollerad VC)</li>
          <li><strong>Assisterad</strong> – patienten triggar, ventilatorn assisterar (t.ex. SIMV, PS)</li>
          <li><strong>Spontan</strong> – patienten andas själv med stöd (CPAP/PS)</li>
        </ul>
        <p className="mt-3"><strong>Omvårdnad:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Munvård var 4:e timme – minskar VAP-risk (Ventilator Associated Pneumonia)</li>
          <li>Kufftryck 20-30 cmH2O – kontrollera regelbundet</li>
          <li>Huvudända höjd 30-45°</li>
          <li>Tubläge – dokumentera cm vid tandraden</li>
          <li>Sugning vid behov – steril teknik</li>
        </ul>
      </div>
    ),
  },
  {
    id: "icu-weaning",
    title: "Urträning från ventilator",
    content: (
      <div className="space-y-3">
        <p><strong>Förutsättningar för urträning (SBT – Spontaneous Breathing Trial):</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Grundorsaken till respiratorbehandling åtgärdad/förbättrad</li>
          <li>Adekvat syresättning: FiO2 ≤40%, PEEP ≤8</li>
          <li>Hemodynamiskt stabil utan/låga vasopressorerdoser</li>
          <li>Vaken och samarbetsvillig (RASS 0 till -1)</li>
          <li>Adekvat hostreflex</li>
        </ul>
        <p className="mt-3"><strong>Under SBT – observera:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Andningsfrekvens &lt;35/min</li>
          <li>Saturation &gt;90%</li>
          <li>Puls och blodtryck stabilt</li>
          <li>Inga tecken på ökat andningsarbete</li>
          <li>Inte agiterad eller ångestfylld</li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3">
          ⚠️ <strong>Misslyckad SBT:</strong> Avbryt och återgå till tidigare inställningar. Analysera orsak.
        </p>
      </div>
    ),
  },
  {
    id: "icu-sedation",
    title: "Sedation och smärta",
    content: (
      <div className="space-y-3">
        <p><strong>RASS – Richmond Agitation-Sedation Scale:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>+4:</strong> Stridslysten, våldsam</li>
          <li><strong>+3:</strong> Mycket agiterad, drar i slangar</li>
          <li><strong>+2:</strong> Agiterad, frekventa oavsiktliga rörelser</li>
          <li><strong>+1:</strong> Rastlös, orolig men rörelser ej aggressiva</li>
          <li><strong>0:</strong> Alert, lugn</li>
          <li><strong>-1:</strong> Dåsig, ögonkontakt &gt;10 sek vid tilltal</li>
          <li><strong>-2:</strong> Lätt sederad, ögonkontakt &lt;10 sek</li>
          <li><strong>-3:</strong> Måttligt sederad, rör sig vid tilltal men ingen ögonkontakt</li>
          <li><strong>-4:</strong> Djupt sederad, rör sig vid fysisk stimulering</li>
          <li><strong>-5:</strong> Ej väckbar</li>
        </ul>
        <p className="mt-3"><strong>CPOT – smärtbedömning:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ansiktsuttryck (0-2)</li>
          <li>Kroppsrörelser (0-2)</li>
          <li>Muskelspänning (0-2)</li>
          <li>Compliance med ventilator / vokalisering (0-2)</li>
          <li><strong>Totalt 0-8:</strong> ≥3 indikerar signifikant smärta</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3">
          💡 <strong>Analgesi före sedation!</strong> Smärtfrihet minskar behovet av sedativa.
        </p>
      </div>
    ),
  },
  {
    id: "icu-delirium",
    title: "Delirium på IVA",
    content: (
      <div className="space-y-3">
        <p><strong>CAM-ICU – Confusion Assessment Method for ICU:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>1.</strong> Akut förändring eller fluktuerande förlopp?</li>
          <li><strong>2.</strong> Ouppmärksamhet? (t.ex. kan inte fokusera, hålla tråden)</li>
          <li><strong>3.</strong> Desorganiserat tänkande? (osammanhängande, ologiskt)</li>
          <li><strong>4.</strong> Förändrad medvetandenivå? (RASS ≠ 0)</li>
        </ul>
        <p className="mt-2"><strong>Delirium om:</strong> 1 + 2 + (3 ELLER 4)</p>
        <p className="mt-3"><strong>Riskfaktorer:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Hög ålder</li>
          <li>Tidigare kognitiv svikt</li>
          <li>Sedativa, opioider</li>
          <li>Sömnbrist</li>
          <li>Infektion, hypxi, metabol rubbning</li>
        </ul>
        <p className="mt-3"><strong>Förebyggande åtgärder:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Tidig mobilisering</li>
          <li>Dag/natt-rutiner (ljus, mörker)</li>
          <li>Orientering (klocka, kalender, familj)</li>
          <li>Minimera sedativa, daglig väckning</li>
          <li>Hörapparat, glasögon om behov</li>
        </ul>
      </div>
    ),
  },
  {
    id: "icu-sepsis",
    title: "Sepsis – snabbguide",
    content: (
      <div className="space-y-3">
        <p><strong>Sepsis = misstänkt infektion + organdysfunktion</strong></p>
        <p className="mt-2"><strong>qSOFA (quick SOFA) – screening utanför IVA:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Andningsfrekvens ≥22/min</li>
          <li>Förändrad medvetandegrad</li>
          <li>Systoliskt blodtryck ≤100 mmHg</li>
          <li><strong>≥2 kriterier = misstänkt sepsis</strong></li>
        </ul>
        <p className="mt-3"><strong>SOFA-score</strong> – organdysfunktion (0-4 poäng per organ):</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Respiration (PaO2/FiO2)</li>
          <li>Koagulation (trombocyter)</li>
          <li>Lever (bilirubin)</li>
          <li>Cirkulation (MAP, vasopressorer)</li>
          <li>CNS (GCS)</li>
          <li>Njure (kreatinin, diures)</li>
        </ul>
        <p className="mt-3"><strong>Septisk chock:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Sepsis + vasopressorbehov för MAP ≥65</li>
          <li>Laktat &gt;2 mmol/L trots adekvat vätskebehandling</li>
        </ul>
        <p className="text-red-700 bg-red-50 p-2 rounded mt-3">
          ⚠️ <strong>Hour-1 Bundle:</strong> Odlingar, laktat, antibiotika, vätska, vasopressor – inom 1 timme!
        </p>
      </div>
    ),
  },
  {
    id: "icu-vasopressors",
    title: "Vasopressorer och inotropi",
    content: (
      <div className="space-y-3">
        <p><strong>Vanliga läkemedel:</strong></p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Noradrenalin</strong> – förstahand vid septisk chock
            <ul className="list-circle pl-5 text-sm">
              <li>Verkan: Vasokonstriktion (α1), viss inotrop effekt (β1)</li>
              <li>Observera: Perifer cirkulation, arytmi</li>
            </ul>
          </li>
          <li>
            <strong>Adrenalin</strong> – vid anafylaxi, hjärtstopp, refraktär chock
            <ul className="list-circle pl-5 text-sm">
              <li>Verkan: Inotrop + kronotrop (β1), vasokonstriktion (α1)</li>
              <li>Observera: Takykardi, arytmi, laktatstegring</li>
            </ul>
          </li>
          <li>
            <strong>Dobutamin</strong> – vid hjärtsvikt med låg cardiac output
            <ul className="list-circle pl-5 text-sm">
              <li>Verkan: Inotrop (β1), viss vasodilatation</li>
              <li>Observera: Takykardi, hypotension</li>
            </ul>
          </li>
          <li>
            <strong>Vasopressin</strong> – tillägg vid septisk chock
            <ul className="list-circle pl-5 text-sm">
              <li>Verkan: Vasokonstriktion via V1-receptorer</li>
              <li>Fast dos, ej titrering</li>
            </ul>
          </li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3">
          ⚠️ <strong>Alltid centralvenös infart</strong> för vasopressorer. Perifer infusion → nekrosrisk!
        </p>
      </div>
    ),
  },
  {
    id: "icu-monitoring",
    title: "Övervakning och larm",
    content: (
      <div className="space-y-3">
        <p><strong>Kontinuerlig monitorering:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>EKG – rytm, frekvens, ST-förändringar</li>
          <li>SpO2 – pulsoximetri</li>
          <li>etCO2 – hos intuberade (kapnografi)</li>
          <li>Invasivt artärtryck – kontinuerlig BT-kurva</li>
        </ul>
        <p className="mt-3"><strong>Intermittent:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>CVP (centralt ventryck)</li>
          <li>Timdiures</li>
          <li>Temperatur</li>
          <li>Blodgaser</li>
        </ul>
        <p className="mt-3"><strong>Reagera på:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>MAP &lt;65 mmHg (eller individuellt mål)</li>
          <li>SpO2 &lt;90%</li>
          <li>Timdiures &lt;0.5 ml/kg/h i &gt;2 timmar</li>
          <li>Ny arytmi</li>
          <li>Plötslig förändring i vitalparametrar</li>
          <li>Högt/lågt andningsmotstånd på ventilator</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3">
          💡 Lär känna din patient – små förändringar kan vara tidiga tecken på försämring.
        </p>
      </div>
    ),
  },
  {
    id: "icu-fluids",
    title: "Vätskebehandling",
    content: (
      <div className="space-y-3">
        <p><strong>Typer av vätskor:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Kristalloider</strong> – Ringer-acetat, NaCl (fysiologisk)
            <ul className="list-circle pl-5 text-sm">
              <li>Förstahandsval vid volymbehandling</li>
              <li>Balanserade lösningar (Ringer) föredras</li>
            </ul>
          </li>
          <li><strong>Kolloider</strong> – Albumin
            <ul className="list-circle pl-5 text-sm">
              <li>Vid hypoalbuminemi, efter stora mängder kristalloid</li>
            </ul>
          </li>
        </ul>
        <p className="mt-3"><strong>Bedömning av vätskebehov:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Klinisk bild: Törst, slemhinnor, hudturgor</li>
          <li>Hemodynamik: Puls, BT, CVP</li>
          <li>Vätskebalans: In/ut, vikt</li>
          <li>Laktat – förhöjt vid hypoperfusion</li>
          <li>Passive leg raise – dynamiskt test</li>
        </ul>
        <p className="mt-3"><strong>Försiktighet vid:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Hjärtsvikt – risk för lungödem</li>
          <li>Njursvikt – risk för övervätskning</li>
          <li>ARDS – restriktiv vätskestrategi</li>
        </ul>
      </div>
    ),
  },
  {
    id: "icu-nutrition",
    title: "Nutrition på IVA",
    content: (
      <div className="space-y-3">
        <p><strong>Principer:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Starta enteral nutrition inom 24-48 timmar om möjligt</li>
          <li>Enteral väg föredras framför parenteral</li>
          <li>Börja försiktigt, trappa upp</li>
        </ul>
        <p className="mt-3"><strong>Enteral nutrition (sondnäring):</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nasogastrisk sond (vanligast) eller nasojejunal</li>
          <li>Kontrollera sondläge före start och regelbundet</li>
          <li>Retentionskontroll var 4-6:e timme initialt</li>
          <li>Höjd huvudända ≥30° – aspirationsrisk</li>
        </ul>
        <p className="mt-3"><strong>Parenteral nutrition (TPN):</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Vid icke-fungerande tarm</li>
          <li>Kräver central infart</li>
          <li>Monitorera blodsocker, elektrolyter, leverprover</li>
        </ul>
        <p className="mt-3"><strong>Målvärden:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Energi: 20-25 kcal/kg/dag (akut fas)</li>
          <li>Protein: 1.2-2.0 g/kg/dag</li>
        </ul>
      </div>
    ),
  },
  {
    id: "icu-communication",
    title: "Kommunikation och SBAR",
    content: (
      <div className="space-y-3">
        <p><strong>SBAR – strukturerad kommunikation:</strong></p>
        <ul className="list-none space-y-2">
          <li>
            <strong className="text-red-600">S – Situation</strong>
            <p className="text-sm ml-4">Vem ringer, om vilken patient, vad händer just nu?</p>
          </li>
          <li>
            <strong className="text-orange-600">B – Bakgrund</strong>
            <p className="text-sm ml-4">Inläggningsorsak, relevant historik, aktuellt tillstånd</p>
          </li>
          <li>
            <strong className="text-yellow-600">A – Aktuellt tillstånd</strong>
            <p className="text-sm ml-4">Vitalparametrar, undersökningsfynd, labsvar</p>
          </li>
          <li>
            <strong className="text-green-600">R – Rekommendation</strong>
            <p className="text-sm ml-4">Vad behöver du? Vad föreslår du?</p>
          </li>
        </ul>
        <p className="mt-3"><strong>Exempel:</strong></p>
        <div className="bg-neutral-50 p-3 rounded text-sm">
          <p><strong>S:</strong> "Hej, det är Anna på IVA. Jag ringer om Erik i sal 3 som plötsligt blivit takykard."</p>
          <p><strong>B:</strong> "Han är inlagd för sepsis, dag 2, tidigare stabil."</p>
          <p><strong>A:</strong> "Nu puls 130, BT 85/50, temp 39.2, förvirrad."</p>
          <p><strong>R:</strong> "Jag misstänker att han försämras. Kan du komma och bedöma?"</p>
        </div>
      </div>
    ),
  },
  {
    id: "icu-family",
    title: "Anhörigstöd på IVA",
    content: (
      <div className="space-y-3">
        <p><strong>Anhörigas behov:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Information – ärlig, regelbunden, förståelig</li>
          <li>Närhet – vara nära patienten</li>
          <li>Försäkran – att patienten får bästa vård</li>
          <li>Stöd – egen stress och oro</li>
        </ul>
        <p className="mt-3"><strong>Kommunikationstips:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Presentera dig och din roll</li>
          <li>Använd patientens namn</li>
          <li>Förklara utrustning och ljud</li>
          <li>Undvik jargong, förklara termer</li>
          <li>Ge utrymme för frågor</li>
          <li>Uppmuntra till att prata med och beröra patienten</li>
        </ul>
        <p className="mt-3"><strong>Praktiskt:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Informera om besökstider och rutiner</li>
          <li>Erbjud kontakt med kurator vid behov</li>
          <li>Dokumentera vem du pratat med och vad som sagts</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3">
          💡 Anhöriga som förstår situationen blir mer delaktiga och mindre ångestfyllda.
        </p>
      </div>
    ),
  },
];

export default function KnowledgePage() {
  const { t } = useLanguage();
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

  function expandAll() {
    const allIds = content[activeTab].reduce(
      (acc, section) => ({ ...acc, [section.id]: true }),
      {}
    );
    setExpanded((prev) => ({ ...prev, ...allIds }));
  }

  function collapseAll() {
    const allIds = content[activeTab].reduce(
      (acc, section) => ({ ...acc, [section.id]: false }),
      {}
    );
    setExpanded((prev) => ({ ...prev, ...allIds }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {t.knowledge.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600">{t.knowledge.subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-3">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                activeTab === tab.id
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 text-sm">
          <button
            onClick={expandAll}
            className="text-neutral-500 hover:text-neutral-700"
          >
            Visa alla
          </button>
          <span className="text-neutral-300">|</span>
          <button
            onClick={collapseAll}
            className="text-neutral-500 hover:text-neutral-700"
          >
            Dölj alla
          </button>
        </div>
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
              <span className="text-neutral-400 text-xl">
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
