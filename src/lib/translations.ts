export const translations = {
  en: {
    // Layout / Nav
    nav: {
      home: "Home",
      tools: "Tools",
      knowledge: "Knowledge",
      notes: "Notes",
      boris: "Boris",
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
      borisTitle: "Boris AI",
      borisDesc: "Study support with safe, structured guidance.",
      borisLink: "Ask Boris →",
      notesTitle: "Notes",
      notesDesc: "Quick personal notes and reminders.",
      notesLink: "View notes →",
      knowledgeTitle: "Knowledge",
      knowledgeDesc: "Short references for IBD, liver, and ICU study.",
      knowledgeLink: "Browse knowledge →",
      borisCta: "Boris – here for you",
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
    },

    // Boris page
    boris: {
      title: "Boris AI",
      mode: "Mode",
      medicine: "Medicine",
      icu: "ICU",
      message: "Message",
      placeholder: "Write your question here...",
      disclaimer:
        "Educational support only. No patient-specific data, dosing, or medical decisions. Always refer to local PM and the responsible physician.",
      asking: "Asking...",
      askBoris: "Ask Boris",
      borisReplies: "Boris replies:",
    },

    // Knowledge page
    knowledge: {
      title: "Knowledge Base",
      ibdOverview: "Placeholder: IBD overview",
      liverNotes: "Placeholder: Liver ward quick notes",
      icuChecklist: "Placeholder: ICU study checklist",
    },

    // Notes page
    notes: {
      title: "Notes",
      placeholder: "Personal notes will live here. No persistence yet.",
    },

    // Login page
    login: {
      email: "Email",
      password: "Password",
      submit: "Log in",
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
      borisTitle: "Boris AI",
      borisDesc: "Studiestöd med trygg, strukturerad vägledning.",
      borisLink: "Fråga Boris →",
      notesTitle: "Anteckningar",
      notesDesc: "Snabba personliga anteckningar och påminnelser.",
      notesLink: "Visa anteckningar →",
      knowledgeTitle: "Kunskap",
      knowledgeDesc: "Korta referenser för IBD, lever och IVA-studier.",
      knowledgeLink: "Utforska kunskap →",
      borisCta: "Boris – finns här för dig",
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
    },

    // Boris page
    boris: {
      title: "Boris AI",
      mode: "Läge",
      medicine: "Medicin",
      icu: "IVA",
      message: "Meddelande",
      placeholder: "Skriv din fråga här...",
      disclaimer:
        "Endast utbildningsstöd. Ingen patientspecifik data, dosering eller medicinska beslut. Hänvisa alltid till lokala PM och ansvarig läkare.",
      asking: "Frågar...",
      askBoris: "Fråga Boris",
      borisReplies: "Boris svarar:",
    },

    // Knowledge page
    knowledge: {
      title: "Kunskapsbank",
      ibdOverview: "Platshållare: IBD-översikt",
      liverNotes: "Platshållare: Leveravdelning snabbanteckningar",
      icuChecklist: "Platshållare: IVA-studiechecklist",
    },

    // Notes page
    notes: {
      title: "Anteckningar",
      placeholder: "Personliga anteckningar kommer finnas här. Ingen lagring ännu.",
    },

    // Login page
    login: {
      email: "E-post",
      password: "Lösenord",
      submit: "Logga in",
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
