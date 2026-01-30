import React from "react";

export type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

// ============ SWEDISH CONTENT ============

export const IBD_CONTENT_SV: Section[] = [
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
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3 dark:bg-amber-900/30 dark:text-amber-300">
          <strong>Varningssignaler:</strong> Hög feber, svår buksmärta, kraftig blödning, tecken på ileus, peritonit
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
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3 dark:bg-blue-900/30 dark:text-blue-300">
          <strong>Tips:</strong> Identifiera patientens triggers (stress, viss mat) och dokumentera
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
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3 dark:bg-blue-900/30 dark:text-blue-300">
          Involvera stomiterapeut tidigt. Psykologiskt stöd viktigt – förändrad kroppsuppfattning.
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

export const LIVER_CONTENT_SV: Section[] = [
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
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3 dark:bg-blue-900/30 dark:text-blue-300">
          <strong>Asterixis-test:</strong> Be patienten sträcka armarna framåt med händerna dorsalflekterade. Positiv om "flapping" ses.
        </p>
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
];

export const ICU_CONTENT_SV: Section[] = [
  {
    id: "icu-abcde",
    title: "ABCDE – systematisk bedömning",
    content: (
      <div className="space-y-3">
        <ul className="list-none space-y-3">
          <li>
            <strong className="text-red-600 dark:text-red-400">A – Airway (Luftväg)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Fri luftväg? Kan patienten prata?</li>
              <li>Stridor, gurglande, snarkande ljud?</li>
              <li>Behov av sug, svalgtub, nässvalg?</li>
              <li>Intuberad – tubläge, kufftr tryck?</li>
            </ul>
          </li>
          <li>
            <strong className="text-orange-600 dark:text-orange-400">B – Breathing (Andning)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Andningsfrekvens (normalt 12-20/min)</li>
              <li>Saturation (mål ofta &gt;94%, COPD &gt;88-92%)</li>
              <li>Andningsmönster – djup, ytlig, ansträngd?</li>
              <li>Lungljud – rassel, ronki, nedsatta?</li>
              <li>Syrgasbehov – flöde, device?</li>
            </ul>
          </li>
          <li>
            <strong className="text-yellow-600 dark:text-yellow-400">C – Circulation (Cirkulation)</strong>
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
            <strong className="text-green-600 dark:text-green-400">D – Disability (Neurologi)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Medvetandegrad – GCS eller RLS</li>
              <li>Pupiller – storlek, ljusreaktion, sidobedömning</li>
              <li>Blodsocker</li>
              <li>Fokal neurologi?</li>
            </ul>
          </li>
          <li>
            <strong className="text-blue-600 dark:text-blue-400">E – Exposure (Exponering)</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Temperatur (feber, hypotermi)</li>
              <li>Hud – utslag, petekier, sår, tryck</li>
              <li>Smärta – lokalisation, intensitet</li>
              <li>Miljö – säkra slangar, droppställningar</li>
            </ul>
          </li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3 dark:bg-amber-900/30 dark:text-amber-300">
          <strong>Kom ihåg:</strong> Åtgärda problem i varje steg innan du går vidare! A-problem är alltid prio 1.
        </p>
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
        <p className="mt-3"><strong>Septisk chock:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Sepsis + vasopressorbehov för MAP ≥65</li>
          <li>Laktat &gt;2 mmol/L trots adekvat vätskebehandling</li>
        </ul>
        <p className="text-red-700 bg-red-50 p-2 rounded mt-3 dark:bg-red-900/30 dark:text-red-300">
          <strong>Hour-1 Bundle:</strong> Odlingar, laktat, antibiotika, vätska, vasopressor – inom 1 timme!
        </p>
      </div>
    ),
  },
  {
    id: "icu-sbar",
    title: "Kommunikation och SBAR",
    content: (
      <div className="space-y-3">
        <p><strong>SBAR – strukturerad kommunikation:</strong></p>
        <ul className="list-none space-y-2">
          <li>
            <strong className="text-red-600 dark:text-red-400">S – Situation</strong>
            <p className="text-sm ml-4">Vem ringer, om vilken patient, vad händer just nu?</p>
          </li>
          <li>
            <strong className="text-orange-600 dark:text-orange-400">B – Bakgrund</strong>
            <p className="text-sm ml-4">Inläggningsorsak, relevant historik, aktuellt tillstånd</p>
          </li>
          <li>
            <strong className="text-yellow-600 dark:text-yellow-400">A – Aktuellt tillstånd</strong>
            <p className="text-sm ml-4">Vitalparametrar, undersökningsfynd, labsvar</p>
          </li>
          <li>
            <strong className="text-green-600 dark:text-green-400">R – Rekommendation</strong>
            <p className="text-sm ml-4">Vad behöver du? Vad föreslår du?</p>
          </li>
        </ul>
      </div>
    ),
  },
];

// ============ ENGLISH CONTENT ============

export const IBD_CONTENT_EN: Section[] = [
  {
    id: "ibd-intro",
    title: "What is IBD?",
    content: (
      <div className="space-y-3">
        <p>
          <strong>Inflammatory Bowel Disease (IBD)</strong> is an umbrella term for chronic inflammatory conditions of the gastrointestinal tract.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Crohn&apos;s disease</strong> – can affect any part of the GI tract, often segmental, transmural inflammation</li>
          <li><strong>Ulcerative colitis</strong> – affects only the colon, starts in the rectum, continuous mucosal inflammation</li>
        </ul>
        <p className="mt-2">Both diseases follow a relapsing-remitting course with periods of flare and remission.</p>
      </div>
    ),
  },
  {
    id: "ibd-symptoms",
    title: "Symptoms to observe",
    content: (
      <div className="space-y-3">
        <p><strong>Intestinal symptoms:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Diarrhea (often bloody in ulcerative colitis)</li>
          <li>Abdominal pain and cramps</li>
          <li>Tenesmus (urgency)</li>
          <li>Nausea and vomiting</li>
        </ul>
        <p className="mt-3"><strong>Systemic symptoms:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Weight loss and malnutrition</li>
          <li>Fever during flares</li>
          <li>Fatigue and anemia</li>
          <li>Nocturnal symptoms (waking the patient)</li>
        </ul>
        <p className="mt-3"><strong>Extraintestinal manifestations (10-30%):</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Joints – arthritis, sacroiliitis</li>
          <li>Skin – erythema nodosum, pyoderma gangrenosum</li>
          <li>Eyes – uveitis, episcleritis</li>
          <li>Liver – primary sclerosing cholangitis (PSC)</li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3 dark:bg-amber-900/30 dark:text-amber-300">
          <strong>Warning signs:</strong> High fever, severe abdominal pain, heavy bleeding, signs of ileus, peritonitis
        </p>
      </div>
    ),
  },
  {
    id: "ibd-treatment",
    title: "Treatment – overview",
    content: (
      <div className="space-y-3">
        <p><strong>Drug classes:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>5-ASA (mesalazine)</strong> – first-line for mild UC, few side effects</li>
          <li><strong>Corticosteroids</strong> – for flares, not maintenance, side effects with long-term use</li>
          <li><strong>Thiopurines (azathioprine, 6-MP)</strong> – immunomodulators, maintenance therapy</li>
          <li><strong>Methotrexate</strong> – mainly for Crohn&apos;s</li>
          <li><strong>Biologics</strong> – TNF inhibitors (infliximab, adalimumab), integrin inhibitors (vedolizumab), IL inhibitors</li>
          <li><strong>JAK inhibitors (tofacitinib)</strong> – for UC</li>
        </ul>
        <p className="mt-3"><strong>Surgery:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>UC: Colectomy can be curative</li>
          <li>Crohn&apos;s: Resection for complications, not curative</li>
          <li>Stoma may be needed – permanent or temporary</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ibd-nursing",
    title: "Nursing interventions",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Fluid balance:</strong> Monitor intake/output, daily weights, signs of dehydration</li>
          <li><strong>Nutrition:</strong> Often parenteral or enteral nutrition during severe flares, dietary records</li>
          <li><strong>Stool observation:</strong> Frequency, consistency, blood, mucus – Bristol scale</li>
          <li><strong>Skin:</strong> Perianal skin care with frequent diarrhea, barrier cream</li>
          <li><strong>Pain:</strong> Regular pain assessment (VAS/NRS), avoid NSAIDs</li>
          <li><strong>Rest:</strong> Promote rest during flares, balance with mobilization</li>
          <li><strong>Psychological support:</strong> Chronic illness affects quality of life, be attentive</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3 dark:bg-blue-900/30 dark:text-blue-300">
          <strong>Tip:</strong> Identify patient triggers (stress, certain foods) and document them
        </p>
      </div>
    ),
  },
  {
    id: "ibd-medications",
    title: "Medication monitoring",
    content: (
      <div className="space-y-3">
        <p><strong>Corticosteroids – observe:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Blood glucose (steroid diabetes)</li>
          <li>Blood pressure</li>
          <li>Sleep disturbances, mood changes</li>
          <li>Signs of infection (may be masked)</li>
        </ul>
        <p className="mt-3"><strong>Biologics – observe:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Infusion reactions (infliximab) – fever, chills, itching, dyspnea</li>
          <li>Infection screening before starting (TB, hepatitis)</li>
          <li>Injection sites for subcutaneous administration</li>
          <li>Increased infection risk</li>
        </ul>
        <p className="mt-3"><strong>Thiopurines – observe:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Bone marrow suppression – monitor blood counts</li>
          <li>Liver toxicity</li>
          <li>Nausea</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ibd-labs",
    title: "Important lab tests",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>CRP/ESR</strong> – inflammatory markers</li>
          <li><strong>Hb</strong> – anemia common (iron, B12, folate deficiency)</li>
          <li><strong>Albumin</strong> – nutritional status</li>
          <li><strong>Electrolytes</strong> – K, Na, Mg with diarrhea</li>
          <li><strong>Fecal calprotectin</strong> – gut-specific inflammation, correlates with endoscopic activity</li>
          <li><strong>Liver function tests</strong> – with biologic therapy, PSC screening</li>
          <li><strong>Renal function</strong> – with mesalazine treatment</li>
          <li><strong>TPMT</strong> – before starting thiopurines</li>
        </ul>
      </div>
    ),
  },
  {
    id: "ibd-stoma",
    title: "Stoma care in IBD",
    content: (
      <div className="space-y-3">
        <p><strong>Types:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ileostomy</strong> – small bowel stoma, loose output, high fluid loss</li>
          <li><strong>Colostomy</strong> – large bowel stoma, more formed output</li>
        </ul>
        <p className="mt-3"><strong>Stoma observation:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Color (should be pink/red)</li>
          <li>Swelling (normal postoperatively)</li>
          <li>Bleeding (slight on touch is normal)</li>
          <li>Peristomal skin (redness, breakdown)</li>
        </ul>
        <p className="mt-3"><strong>Complications:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Skin issues – leakage, allergy</li>
          <li>Prolapse – stoma bulging out</li>
          <li>Stenosis – narrowing</li>
          <li>Parastomal hernia</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3 dark:bg-blue-900/30 dark:text-blue-300">
          Involve stoma nurse early. Psychological support important – altered body image.
        </p>
      </div>
    ),
  },
  {
    id: "ibd-patient-education",
    title: "Patient education",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Disease understanding</strong> – chronic but manageable, flares and remission</li>
          <li><strong>Medications</strong> – importance of adherence even in remission</li>
          <li><strong>Diet</strong> – individual, food diary can help identify triggers</li>
          <li><strong>Smoking</strong> – worsens Crohn&apos;s, may improve UC (but not recommended!)</li>
          <li><strong>Stress</strong> – can trigger flares, stress management important</li>
          <li><strong>When to seek care</strong> – fever, increased bleeding, severe pain</li>
          <li><strong>Fertility/pregnancy</strong> – plan with doctor, most medications are OK</li>
        </ul>
      </div>
    ),
  },
];

export const LIVER_CONTENT_EN: Section[] = [
  {
    id: "liver-intro",
    title: "Liver diseases – overview",
    content: (
      <div className="space-y-3">
        <p>Common liver diseases on medical wards:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Cirrhosis</strong> – chronic liver damage with fibrosis and nodular regeneration</li>
          <li><strong>Hepatitis</strong> – viral (A, B, C, D, E), alcohol, autoimmune, drug-induced</li>
          <li><strong>Alcohol-related liver disease</strong> – fatty liver → hepatitis → cirrhosis</li>
          <li><strong>NAFLD/NASH</strong> – non-alcoholic fatty liver disease</li>
          <li><strong>Acute liver failure</strong> – rapid deterioration of liver function</li>
          <li><strong>Hepatocellular carcinoma (HCC)</strong> – liver cancer, often on cirrhosis</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-nursing",
    title: "Nursing interventions",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Fluid balance:</strong> Daily weights, abdominal girth for ascites, intake/output recording</li>
          <li><strong>Nutrition:</strong> Adequate protein (1.2-1.5 g/kg), small frequent meals, evening snack</li>
          <li><strong>Level of consciousness:</strong> Regular assessment, asterixis test, orientation</li>
          <li><strong>Skin:</strong> Pruritus common – emollients, cool environment, avoid scratching, cholestyramine</li>
          <li><strong>Bleeding risk:</strong> Caution with injections, observe for bleeding signs, soft toothbrush</li>
          <li><strong>Infection risk:</strong> Hygiene, temperature monitoring, observe for SBP signs</li>
          <li><strong>Fall risk:</strong> With encephalopathy and muscle weakness</li>
        </ul>
      </div>
    ),
  },
  {
    id: "liver-encephalopathy",
    title: "Hepatic encephalopathy – in depth",
    content: (
      <div className="space-y-3">
        <p><strong>West Haven criteria:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Grade 0:</strong> No impairment (may have minimal HE on testing)</li>
          <li><strong>Grade 1:</strong> Mild personality changes, sleep disturbance, concentration difficulties</li>
          <li><strong>Grade 2:</strong> Lethargy, disorientation in time, asterixis (flapping tremor)</li>
          <li><strong>Grade 3:</strong> Somnolent but arousable, confused, aggressive</li>
          <li><strong>Grade 4:</strong> Coma</li>
        </ul>
        <p className="mt-3"><strong>Precipitating factors:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Infection (SBP, UTI, pneumonia)</li>
          <li>GI bleeding (protein load)</li>
          <li>Constipation</li>
          <li>Electrolyte disturbance (hypokalemia, hyponatremia)</li>
          <li>Renal failure</li>
          <li>Medications (sedatives, opiates)</li>
          <li>Dehydration</li>
        </ul>
        <p className="text-blue-700 bg-blue-50 p-2 rounded mt-3 dark:bg-blue-900/30 dark:text-blue-300">
          <strong>Asterixis test:</strong> Ask patient to extend arms with hands dorsiflexed. Positive if &quot;flapping&quot; is seen.
        </p>
      </div>
    ),
  },
  {
    id: "liver-labs",
    title: "Important lab tests",
    content: (
      <div className="space-y-3">
        <p><strong>Hepatocyte damage:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>AST/ALT</strong> – elevated with hepatocyte injury, ALT more liver-specific</li>
        </ul>
        <p className="mt-3"><strong>Cholestasis:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>ALP/GGT</strong> – elevated in cholestatic pattern</li>
          <li><strong>Bilirubin</strong> – causes jaundice</li>
        </ul>
        <p className="mt-3"><strong>Liver function:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Albumin</strong> – synthetic function (long half-life)</li>
          <li><strong>PT/INR</strong> – clotting factors (short half-life, responds quickly)</li>
        </ul>
        <p className="mt-3"><strong>Other:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Ammonia</strong> – for suspected encephalopathy (venous sample, iced)</li>
          <li><strong>Creatinine/eGFR</strong> – renal function</li>
          <li><strong>Na</strong> – often low in cirrhosis (dilutional)</li>
          <li><strong>Complete blood count</strong> – anemia, thrombocytopenia with hypersplenism</li>
        </ul>
      </div>
    ),
  },
];

export const ICU_CONTENT_EN: Section[] = [
  {
    id: "icu-abcde",
    title: "ABCDE – systematic assessment",
    content: (
      <div className="space-y-3">
        <ul className="list-none space-y-3">
          <li>
            <strong className="text-red-600 dark:text-red-400">A – Airway</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Clear airway? Can patient speak?</li>
              <li>Stridor, gurgling, snoring sounds?</li>
              <li>Need for suction, oropharyngeal airway, nasopharyngeal?</li>
              <li>Intubated – tube position, cuff pressure?</li>
            </ul>
          </li>
          <li>
            <strong className="text-orange-600 dark:text-orange-400">B – Breathing</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Respiratory rate (normal 12-20/min)</li>
              <li>Saturation (target often &gt;94%, COPD &gt;88-92%)</li>
              <li>Breathing pattern – deep, shallow, labored?</li>
              <li>Lung sounds – crackles, wheezes, decreased?</li>
              <li>Oxygen requirements – flow, device?</li>
            </ul>
          </li>
          <li>
            <strong className="text-yellow-600 dark:text-yellow-400">C – Circulation</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Pulse – rate, rhythm, volume</li>
              <li>Blood pressure – MAP (target often &gt;65 mmHg)</li>
              <li>Capillary refill (&lt;2 sec normal)</li>
              <li>Skin color – pale, cyanotic, mottled?</li>
              <li>Urine output (target &gt;0.5 ml/kg/h)</li>
              <li>Lactate (elevated with hypoperfusion)</li>
            </ul>
          </li>
          <li>
            <strong className="text-green-600 dark:text-green-400">D – Disability</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Level of consciousness – GCS or AVPU</li>
              <li>Pupils – size, reactivity, symmetry</li>
              <li>Blood glucose</li>
              <li>Focal neurology?</li>
            </ul>
          </li>
          <li>
            <strong className="text-blue-600 dark:text-blue-400">E – Exposure</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Temperature (fever, hypothermia)</li>
              <li>Skin – rash, petechiae, wounds, pressure areas</li>
              <li>Pain – location, intensity</li>
              <li>Environment – secure lines, IV poles</li>
            </ul>
          </li>
        </ul>
        <p className="text-amber-700 bg-amber-50 p-2 rounded mt-3 dark:bg-amber-900/30 dark:text-amber-300">
          <strong>Remember:</strong> Address problems at each step before moving on! A-problems always take priority.
        </p>
      </div>
    ),
  },
  {
    id: "icu-sepsis",
    title: "Sepsis – quick guide",
    content: (
      <div className="space-y-3">
        <p><strong>Sepsis = suspected infection + organ dysfunction</strong></p>
        <p className="mt-2"><strong>qSOFA (quick SOFA) – screening outside ICU:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Respiratory rate ≥22/min</li>
          <li>Altered mental status</li>
          <li>Systolic blood pressure ≤100 mmHg</li>
          <li><strong>≥2 criteria = suspect sepsis</strong></li>
        </ul>
        <p className="mt-3"><strong>Septic shock:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Sepsis + vasopressor requirement for MAP ≥65</li>
          <li>Lactate &gt;2 mmol/L despite adequate fluid resuscitation</li>
        </ul>
        <p className="text-red-700 bg-red-50 p-2 rounded mt-3 dark:bg-red-900/30 dark:text-red-300">
          <strong>Hour-1 Bundle:</strong> Cultures, lactate, antibiotics, fluids, vasopressor – within 1 hour!
        </p>
      </div>
    ),
  },
  {
    id: "icu-sbar",
    title: "Communication and SBAR",
    content: (
      <div className="space-y-3">
        <p><strong>SBAR – structured communication:</strong></p>
        <ul className="list-none space-y-2">
          <li>
            <strong className="text-red-600 dark:text-red-400">S – Situation</strong>
            <p className="text-sm ml-4">Who is calling, about which patient, what is happening right now?</p>
          </li>
          <li>
            <strong className="text-orange-600 dark:text-orange-400">B – Background</strong>
            <p className="text-sm ml-4">Reason for admission, relevant history, current condition</p>
          </li>
          <li>
            <strong className="text-yellow-600 dark:text-yellow-400">A – Assessment</strong>
            <p className="text-sm ml-4">Vital signs, examination findings, lab results</p>
          </li>
          <li>
            <strong className="text-green-600 dark:text-green-400">R – Recommendation</strong>
            <p className="text-sm ml-4">What do you need? What do you suggest?</p>
          </li>
        </ul>
      </div>
    ),
  },
];

// Export content by language
export const KNOWLEDGE_CONTENT = {
  en: {
    ibd: IBD_CONTENT_EN,
    liver: LIVER_CONTENT_EN,
    icu: ICU_CONTENT_EN,
  },
  sv: {
    ibd: IBD_CONTENT_SV,
    liver: LIVER_CONTENT_SV,
    icu: ICU_CONTENT_SV,
  },
};
