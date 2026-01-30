export const translations = {
  en: {
    // Layout / Nav
    nav: {
      home: "Home",
      tools: "Tools",
      knowledge: "Knowledge",
      notes: "Notes",
      boris: "Boris",
      calculator: "Calculator",
      search: "Search",
      darkMode: "Dark mode",
      lightMode: "Light mode",
    },

    // Home page
    home: {
      badge: "Private clinical toolkit",
      title: "NurseCore",
      description:
        "Calm structure for daily nursing work and study. Everything in one place—tools, notes, knowledge, and Boris support.",
      toolsTitle: "Tools",
      toolsDesc: "Daily checklists and ward-focused aids.",
      toolsLink: "Open tools →",
      borisStudyTitle: "Boris Studie",
      borisStudyDesc: "Study support for IBD, liver, and ICU.",
      borisStudyLink: "Study with Boris →",
      borisWorkTitle: "Boris Jobb",
      borisWorkDesc: "Quick support during your shift.",
      borisWorkLink: "Ask Boris →",
      notesTitle: "Notes",
      notesDesc: "Quick personal notes and reminders.",
      notesLink: "View notes →",
      knowledgeTitle: "Knowledge",
      knowledgeDesc: "Short references for IBD, liver, and ICU study.",
      knowledgeLink: "Browse knowledge →",
      borisCta: "Boris – here for you",
      // New tools
      news2Title: "NEWS2",
      news2Desc: "Calculate early warning scores for patient deterioration.",
      news2Link: "Calculate NEWS2 →",
      sbarTitle: "SBAR Generator",
      sbarDesc: "Create structured reports for safe handover communication.",
      sbarLink: "Create SBAR →",
      labbTitle: "Lab Interpreter",
      labbDesc: "Enter lab values and get Boris to explain them.",
      labbLink: "Interpret labs →",
      // FAQ
      faqTitle: "How to get the most out of NurseCore",
      faq1q: "What is NurseCore?",
      faq1a: "NurseCore is your personal clinical toolkit – a calm, structured place for daily nursing work and study. Everything is gathered in one place: checklists, AI support with Boris, clinical calculators, and a knowledge bank.",
      faq2q: "Who is Boris and how do I use him best?",
      faq2a: "Boris is your AI study companion and work support. Two tips for getting the most out of Boris:\n\n• Be specific: \"Explain IBD flare for a new nurse\" gives better answers than \"Tell me about IBD\"\n• Use follow-up questions: Boris remembers the conversation, so you can dig deeper\n• Upload images: Boris can analyze wounds, rashes, and other clinical observations\n• Choose the right mode: Study mode for deep learning, Work mode for quick support during shifts",
      faq3q: "What is the difference between Boris Study and Boris Work?",
      faq3a: "Boris Study is for when you have time to learn properly – you get thorough explanations with background and context. Perfect for studying before exams or understanding complex topics.\n\nBoris Work is for quick support during your shift – concise answers with clear action steps. You can also set your shift (day/evening/night) so Boris adapts the advice.",
      faq4q: "How do I use NEWS2, SBAR, and Lab interpreter?",
      faq4a: "NEWS2: Click the parameter buttons to score each vital sign. The calculator automatically sums up and shows risk level with recommended actions.\n\nSBAR: Fill in the fields step by step. The preview updates live. Copy the finished report with one click.\n\nLab interpreter: Either click to add common labs and fill in values, or paste text directly from lab results. Boris explains what the values mean clinically.",
      faq5q: "Is my data saved?",
      faq5a: "Notes are saved locally in your browser. Conversations with Boris are not saved permanently – they disappear when you close the page. No patient data should ever be entered in the app.",
      faq6q: "Can I use NurseCore for patient care?",
      faq6a: "NurseCore is an educational and support tool. Boris never gives dosing advice or treatment decisions. Always follow local guidelines (PM) and consult with responsible physician for all clinical decisions. The app is a complement – not a replacement – for professional judgment.",
    },

    // Tools page
    tools: {
      title: "Tools",
      description: "Practical, ward-focused support for daily structure and study.",
      showFavoritesOnly: "Show favorites only",
      favorites: "Favorites",
      total: "Total",
      noFavorites: "No favorites yet. Star a tool to add it here.",
      recentlyUsed: "Recently used",
      noRecent: "No recent tools yet.",
      copy: "Copy",
      copied: "Copied!",
      sendToBoris: "Send to Boris",
      categoryMedicine: "Medicine",
      categoryIcu: "ICU",
      categoryOrtho: "Orthopedics",
    },

    // Boris page
    boris: {
      title: "Boris AI",
      studyTitle: "Boris Studie",
      workTitle: "Boris Jobb",
      mode: "Mode",
      medicine: "Medicine",
      icu: "ICU",
      work: "Work",
      message: "Message",
      placeholder: "Write your question here...",
      disclaimerStudy:
        "Educational support only. No patient-specific data, dosing, or medical decisions. Always refer to local PM and the responsible physician.",
      disclaimerWork:
        "Quick support during your shift. No dosing or treatment decisions. Always follow local PM and consult the responsible physician.",
      asking: "Asking...",
      askBoris: "Ask Boris",
      borisReplies: "Boris replies:",
      clearChat: "Clear chat",
      you: "You",
      thinking: "Thinking...",
      quickSuggestions: "Suggestions to start with:",
      quickQuestionsWork: "Quick questions:",
      shift: "Shift",
      shiftDay: "Day",
      shiftEvening: "Evening",
      shiftNight: "Night",
      shiftNone: "Not set",
      // Quick questions - Medicine
      qMed1: "Explain IBD flare as if I'm new",
      qMed2: "What to watch for in hepatic encephalopathy?",
      qMed3: "Give me a checklist for ascites tap",
      qMed4: "Which lab values are most important in IBD?",
      // Quick questions - ICU
      qIcu1: "ABCDE checklist quick",
      qIcu2: "What does high CVP mean?",
      qIcu3: "Common ventilator alarms and what to do",
      qIcu4: "How do I know if the patient is septic?",
      // Quick questions - Work
      qWork1: "Patient deteriorating – ABCDE?",
      qWork2: "How do I write SBAR quickly?",
      qWork3: "Relatives are unhappy, tips?",
      qWork4: "I can't keep up with everything",
      qWork5: "When should I escalate?",
    },

    // Knowledge page
    knowledge: {
      title: "Knowledge Base",
      subtitle: "Quick reference for clinical practice and study.",
      ibd: "IBD",
      liver: "Liver",
      icu: "ICU",
      showAll: "Show all",
      hideAll: "Hide all",
    },

    // Notes page
    notes: {
      title: "Notes",
      placeholder: "Personal notes will live here. No persistence yet.",
      addNote: "Add note",
      newNotePlaceholder: "Write a note...",
      noNotes: "No notes yet. Add your first note above.",
      delete: "Delete",
      saved: "Saved locally",
    },

    // Login page
    login: {
      email: "Email",
      password: "Password",
      submit: "Log in",
    },

    // Search
    search: {
      title: "Search",
      placeholder: "Search tools and knowledge...",
      noResults: "No results found",
      tools: "Tools",
      knowledge: "Knowledge",
    },

    // Calculator
    calc: {
      title: "Calculator",
      subtitle: "Common nursing calculations",
      dripRate: "Drip rate",
      dripRateDesc: "Calculate drops per minute",
      volume: "Volume (ml)",
      time: "Time (hours)",
      dropFactor: "Drop factor (drops/ml)",
      result: "Result",
      dropsPerMin: "drops/min",
      mlPerHour: "ml/hour",
      dosage: "Dosage",
      dosageDesc: "Calculate dose based on weight",
      dose: "Dose (mg/kg)",
      weight: "Weight (kg)",
      totalDose: "Total dose",
      bmi: "BMI",
      bmiDesc: "Body Mass Index",
      height: "Height (cm)",
      bmiResult: "BMI",
      bmiUnderweight: "Underweight",
      bmiNormal: "Normal",
      bmiOverweight: "Overweight",
      bmiObese: "Obese",
      calculate: "Calculate",
      clear: "Clear",
    },
  },

  sv: {
    // Layout / Nav
    nav: {
      home: "Hem",
      tools: "Verktyg",
      knowledge: "Kunskap",
      notes: "Anteckningar",
      boris: "Boris",
      calculator: "Kalkylator",
      search: "Sök",
      darkMode: "Mörkt läge",
      lightMode: "Ljust läge",
    },

    // Home page
    home: {
      badge: "Privat klinisk verktygslåda",
      title: "NurseCore",
      description:
        "Lugn struktur för dagligt vårdarbete och studier. Allt på ett ställe—verktyg, anteckningar, kunskap och Boris-stöd.",
      toolsTitle: "Verktyg",
      toolsDesc: "Dagliga checklistor och avdelningsfokuserade hjälpmedel.",
      toolsLink: "Öppna verktyg →",
      borisStudyTitle: "Boris Studie",
      borisStudyDesc: "Studiestöd för IBD, lever och IVA.",
      borisStudyLink: "Plugga med Boris →",
      borisWorkTitle: "Boris Jobb",
      borisWorkDesc: "Snabb hjälp under ditt arbetspass.",
      borisWorkLink: "Fråga Boris →",
      notesTitle: "Anteckningar",
      notesDesc: "Snabba personliga anteckningar och påminnelser.",
      notesLink: "Visa anteckningar →",
      knowledgeTitle: "Kunskap",
      knowledgeDesc: "Korta referenser för IBD, lever och IVA-studier.",
      knowledgeLink: "Utforska kunskap →",
      borisCta: "Boris – finns här för dig",
      // New tools
      news2Title: "NEWS2",
      news2Desc: "Beräkna early warning score för tidig upptäckt av försämring.",
      news2Link: "Beräkna NEWS2 →",
      sbarTitle: "SBAR Generator",
      sbarDesc: "Skapa strukturerade rapporter för säker kommunikation.",
      sbarLink: "Skapa SBAR →",
      labbTitle: "Labb-tolkare",
      labbDesc: "Mata in labbvärden och låt Boris förklara dem.",
      labbLink: "Tolka labbvärden →",
      // FAQ
      faqTitle: "Så får du ut mest av NurseCore",
      faq1q: "Vad är NurseCore?",
      faq1a: "NurseCore är din personliga kliniska verktygslåda – en lugn, strukturerad plats för dagligt vårdarbete och studier. Allt samlat på ett ställe: checklistor, AI-stöd med Boris, kliniska kalkylatorer och kunskapsbank.",
      faq2q: "Vem är Boris och hur använder jag honom bäst?",
      faq2a: "Boris är din AI-studiekompis och jobbstöd. Tips för att få ut mest av Boris:\n\n• Var specifik: \"Förklara IBD-skov för en ny sjuksköterska\" ger bättre svar än \"Berätta om IBD\"\n• Ställ följdfrågor: Boris minns konversationen, så du kan gräva djupare\n• Ladda upp bilder: Boris kan analysera sår, utslag och andra kliniska observationer\n• Välj rätt läge: Studieläge för djupinlärning, Jobbläge för snabb hjälp under passet",
      faq3q: "Vad är skillnaden mellan Boris Studie och Boris Jobb?",
      faq3a: "Boris Studie är för när du har tid att lära dig ordentligt – du får utförliga förklaringar med bakgrund och sammanhang. Perfekt för plugg inför tenta eller för att förstå komplexa ämnen.\n\nBoris Jobb är för snabb hjälp under arbetspasset – koncisa svar med tydliga handlingssteg. Du kan även ställa in ditt arbetspass (dag/kväll/natt) så anpassar Boris råden.",
      faq4q: "Hur använder jag NEWS2, SBAR och Labb-tolkaren?",
      faq4a: "NEWS2: Klicka på parameterknapparna för att poängsätta varje vitalparameter. Kalkylatorn summerar automatiskt och visar risknivå med rekommenderade åtgärder.\n\nSBAR: Fyll i fälten steg för steg. Förhandsgranskningen uppdateras live. Kopiera färdig rapport med ett klick.\n\nLabb-tolkaren: Antingen klicka för att lägga till vanliga prover och fyll i värden, eller klistra in text direkt från labbsvar. Boris förklarar vad värdena betyder kliniskt.",
      faq5q: "Sparas min data?",
      faq5a: "Anteckningar sparas lokalt i din webbläsare. Konversationer med Boris sparas inte permanent – de försvinner när du stänger sidan. Ingen patientdata ska någonsin matas in i appen.",
      faq6q: "Kan jag använda NurseCore i patientvården?",
      faq6a: "NurseCore är ett utbildnings- och stödverktyg. Boris ger aldrig doseringsråd eller behandlingsbeslut. Följ alltid lokala PM och rådgör med ansvarig läkare för alla kliniska beslut. Appen är ett komplement – inte en ersättning – för professionellt omdöme.",
    },

    // Tools page
    tools: {
      title: "Verktyg",
      description: "Praktiskt, avdelningsfokuserat stöd för daglig struktur och studier.",
      showFavoritesOnly: "Visa endast favoriter",
      favorites: "Favoriter",
      total: "Totalt",
      noFavorites: "Inga favoriter än. Stjärnmarkera ett verktyg för att lägga till det här.",
      recentlyUsed: "Senast använda",
      noRecent: "Inga senaste verktyg än.",
      copy: "Kopiera",
      copied: "Kopierat!",
      sendToBoris: "Skicka till Boris",
      categoryMedicine: "Medicin",
      categoryIcu: "IVA",
      categoryOrtho: "Ortopedi",
    },

    // Boris page
    boris: {
      title: "Boris AI",
      studyTitle: "Boris Studie",
      workTitle: "Boris Jobb",
      mode: "Läge",
      medicine: "Medicin",
      icu: "IVA",
      work: "Vardagsstöd",
      message: "Meddelande",
      placeholder: "Skriv din fråga här...",
      disclaimerStudy:
        "Endast utbildningsstöd. Ingen patientspecifik data, dosering eller medicinska beslut. Hänvisa alltid till lokala PM och ansvarig läkare.",
      disclaimerWork:
        "Snabb hjälp under arbetspasset. Ingen dosering eller behandlingsbeslut. Följ alltid lokala PM och rådgör med ansvarig läkare.",
      asking: "Frågar...",
      askBoris: "Fråga Boris",
      borisReplies: "Boris svarar:",
      clearChat: "Rensa chatt",
      you: "Du",
      thinking: "Tänker...",
      quickSuggestions: "Förslag att börja med:",
      quickQuestionsWork: "Snabba frågor:",
      shift: "Arbetspass",
      shiftDay: "Dag",
      shiftEvening: "Kväll",
      shiftNight: "Natt",
      shiftNone: "Ej valt",
      // Quick questions - Medicine
      qMed1: "Förklara IBD-skov som om jag är ny",
      qMed2: "Vad ska jag tänka på vid leverencefalopati?",
      qMed3: "Ge mig en checklista för ascitestappning",
      qMed4: "Vilka labvärden är viktigast vid IBD?",
      // Quick questions - ICU
      qIcu1: "ABCDE-checklista snabbt",
      qIcu2: "Vad betyder högt CVP?",
      qIcu3: "Vanliga ventilatoralarmer och vad jag gör",
      qIcu4: "Hur vet jag om patienten är i sepsis?",
      // Quick questions - Work
      qWork1: "Patienten försämras – ABCDE?",
      qWork2: "Hur skriver jag SBAR snabbt?",
      qWork3: "Anhöriga är missnöjda, tips?",
      qWork4: "Jag hinner inte med allt",
      qWork5: "När ska jag eskalera?",
    },

    // Knowledge page
    knowledge: {
      title: "Kunskapsbank",
      subtitle: "Snabbreferenser för klinisk praktik och studier.",
      ibd: "IBD",
      liver: "Lever",
      icu: "IVA",
      showAll: "Visa alla",
      hideAll: "Dölj alla",
    },

    // Notes page
    notes: {
      title: "Anteckningar",
      placeholder: "Personliga anteckningar kommer finnas här. Ingen lagring ännu.",
      addNote: "Lägg till",
      newNotePlaceholder: "Skriv en anteckning...",
      noNotes: "Inga anteckningar än. Lägg till din första ovan.",
      delete: "Ta bort",
      saved: "Sparad lokalt",
    },

    // Login page
    login: {
      email: "E-post",
      password: "Lösenord",
      submit: "Logga in",
    },

    // Search
    search: {
      title: "Sök",
      placeholder: "Sök verktyg och kunskap...",
      noResults: "Inga resultat hittades",
      tools: "Verktyg",
      knowledge: "Kunskap",
    },

    // Calculator
    calc: {
      title: "Kalkylator",
      subtitle: "Vanliga beräkningar inom omvårdnad",
      dripRate: "Dropptakt",
      dripRateDesc: "Beräkna droppar per minut",
      volume: "Volym (ml)",
      time: "Tid (timmar)",
      dropFactor: "Droppfaktor (droppar/ml)",
      result: "Resultat",
      dropsPerMin: "droppar/min",
      mlPerHour: "ml/timme",
      dosage: "Dosering",
      dosageDesc: "Beräkna dos baserat på vikt",
      dose: "Dos (mg/kg)",
      weight: "Vikt (kg)",
      totalDose: "Total dos",
      bmi: "BMI",
      bmiDesc: "Body Mass Index",
      height: "Längd (cm)",
      bmiResult: "BMI",
      bmiUnderweight: "Undervikt",
      bmiNormal: "Normalvikt",
      bmiOverweight: "Övervikt",
      bmiObese: "Fetma",
      calculate: "Beräkna",
      clear: "Rensa",
    },
  },
} as const;

export type Language = keyof typeof translations;

// Use a mapped type for string values instead of literal types
type DeepStringify<T> = T extends string
  ? string
  : T extends object
    ? { [K in keyof T]: DeepStringify<T[K]> }
    : T;

export type Translations = DeepStringify<typeof translations.en>;
