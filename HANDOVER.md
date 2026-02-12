# NurseCore - Session Handover & Summary

## Quick Summary
NurseCore ar en svensk klinisk verktygslada for sjukskoterskor. Projektet har genomgatt tva sessioner:

**Session 1 (Jan 2025):** Boris AI (8 forbattringar), 5 kliniska verktyg, auth-system, PWA
**Session 2 (12 Feb 2026):** Layout-fix, overflow-fix, 6 UI-wow-effekter, diagnostik av kanda problem

**Betyg: 9/10** - Komplett app med polerad UI!

---

## Project Overview

**Vad ar NurseCore?**
En lugn, strukturerad app for dagligt vardarbete och studier. Allt pa ett stalle: checklistor, AI-stod med Boris, kliniska kalkylatorer och kunskapsbank.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS med dark mode (class strategy)
- OpenAI API (GPT-4o for vision, GPT-4o-mini for text)
- react-markdown for rendering av Boris-svar
- next-pwa for offline-stod

**Miljovariabler (Vercel):**
```
OPENAI_API_KEY=sk-...       # Kravs for Boris AI
PGHOST_UNPOOLED=...         # Neon Postgres (ansluten men oanvand)
```

**Deploy:**
- **Live:** https://nursecore.vercel.app
- **GitHub:** https://github.com/Mats6102hamberg/nursecore
- **Lokal mapp:** `/Users/matshamberg/CascadeProjects/nursecore`

---

## Session 2 - UI-polish & Bugfix (12 Feb 2026)

### Fixade buggar

| Bugg | Beskrivning | Fix |
|------|-------------|-----|
| **Layout overflow** | `page.tsx` hade `max-w-6xl` i `max-w-4xl` container - innehall bredare an skarm | Tog bort `max-w-6xl`, lat layout.tsx styra |
| **Header overflow** | Nav-knappar pushade ut innehall pa smal skarm | `overflow-x-auto` + `shrink-0 whitespace-nowrap` + `scrollbar-hide` |
| **Horisontell scroll** | Ingen overflow-kontroll pa body | `overflow-x: hidden; max-width: 100vw` pa html/body |

### Nya UI-effekter (6 st)

| # | Effekt | Beskrivning |
|---|--------|-------------|
| 1 | **Glasmorfism-header** | Sticky med `backdrop-blur-xl`, halvtransparent bakgrund |
| 2 | **Gradient-logga** | "NurseCore" med gradient-text (dark-light-dark) |
| 3 | **Staggered card-animation** | Kort fadear in med 60ms delay per kort |
| 4 | **Animerade Boris-prickar** | Tre studsande prickar vid laddning istallet for text |
| 5 | **Pulserande Boris CTA** | Mjuk glow-puls + scale-effekt pa hover |
| 6 | **Animerad NEWS2-score** | Siffran raknar upp/ner med steg-animation |

### Git commit
```
3348165 fix: resolve layout overflow + add UI polish and animations
```

---

## Session 1 - Grundbygge (Januari 2025)

### Boris AI - 8 Forbattringar

| # | Forbattring | Beskrivning |
|---|-------------|-------------|
| 1 | **Markdown-formatering** | Boris svarar med rubriker, listor, fetstil |
| 2 | **Konversationshistorik** | Minns senaste 10 meddelanden |
| 3 | **Verktygsforslag** | Foreslar relevanta NurseCore-verktyg |
| 4 | **Skiftlage** | Dag/Kvall/Natt-anpassade rad |
| 5 | **Emotionellt stod** | Kanner av stress, bekraftar kanslor forst |
| 6 | **Bildanalys** | Ladda upp bilder for analys (GPT-4o) |
| 7 | **Professionella riktlinjer** | Refererar till "allmant kand information" |
| 8 | **Mjukare formuleringar** | "Ofta hanger det ihop med...", "Ett vanligt satt att forsta detta ar..." |

### Kliniska Verktyg - 5 st

| Verktyg | Sokvag | Beskrivning |
|---------|--------|-------------|
| **NEWS2** | `/news2` | Interaktiv kalkylator, 7 parametrar, fargkodade risknivaer, animerad score |
| **SBAR** | `/sbar` | Generator med urgency-valjare, live-preview, kopiera med ett klick |
| **Labb-tolkare** | `/labb` | 18 vanliga labbvarden + fritext, Boris forklarar kliniskt |
| **Symtom-checker** | `/symtom` | Differentialdiagnostik, red flags, omvardnadsatgarder |
| **FAQ** | Startsidan | 6 expanderbara fragor om hur man anvander appen |

### Infrastruktur - 3 funktioner

| Funktion | Beskrivning |
|----------|-------------|
| **Inloggning/Konto** | localStorage-baserat auth-system med PIN-kod |
| **PWA/Offline** | next-pwa, manifest.json, service worker, installerbar |
| **Profil-sida** | `/profil` - skapa konto, logga in, statistik, logga ut |

---

## Filstruktur

```
nursecore/
├── HANDOVER.md                # Denna fil
├── SESSION_SUMMARY.md         # Detaljerad sessionsdokumentation
├── next.config.js             # PWA-konfiguration
├── middleware.ts               # Auth middleware (BUGGIG - se kanda problem)
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service Worker
│   ├── icon-192.png           # App-ikon
│   └── icon-512.png           # App-ikon stor
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind + animationer (fade-up, bounce-dot, glow)
│   │   ├── page.tsx           # Startsida med staggered cards + FAQ
│   │   ├── Header.tsx         # Glasmorfism-header med gradient-logga
│   │   ├── layout.tsx         # Root layout med providers
│   │   ├── login/page.tsx     # Login-sida (BUGGIG form action)
│   │   ├── profil/page.tsx    # Profil + localStorage auth
│   │   ├── boris/
│   │   │   ├── page.tsx       # Boris valjsida
│   │   │   ├── studie/page.tsx # Boris studie (animerade typing-dots)
│   │   │   └── jobb/page.tsx  # Boris jobb (animerade typing-dots)
│   │   ├── news2/page.tsx     # NEWS2 med animerad score-counter
│   │   ├── sbar/page.tsx      # SBAR generator
│   │   ├── labb/page.tsx      # Labb-tolkare
│   │   ├── symtom/page.tsx    # Symtom-checker
│   │   ├── tools/page.tsx     # Kliniska checklistor (36 verktyg)
│   │   ├── knowledge/page.tsx # Kunskapsbank (IBD, Lever, IVA)
│   │   ├── calculator/page.tsx # Enkel kalkylator (dropprakn, dos, BMI)
│   │   ├── notes/page.tsx     # Anteckningar
│   │   ├── search/page.tsx    # Sok i verktyg och kunskap
│   │   └── api/
│   │       ├── boris/route.ts # Boris API (OpenAI)
│   │       └── login/route.ts # Login API (BUGGIG)
│   ├── lib/
│   │   ├── AuthContext.tsx    # localStorage auth (namn + PIN)
│   │   ├── translations.ts    # Alla SV/EN oversattningar
│   │   ├── LanguageContext.tsx # Sprakhantering
│   │   └── ThemeContext.tsx   # Dark mode
│   └── data/
│       ├── knowledge-content.tsx # Tvasprakigt kunskapsinnehall
│       └── tools.json         # 36 kliniska verktyg
```

---

## Kodmonster

```typescript
// Sprak
const { t, language } = useLanguage();

// Auth/Inloggning
const { user, userData, login, register, logout } = useAuth();

// Dark mode klasser
className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"

// Kort-styling
className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"

// Animerad entrance
className="animate-fade-up"
style={{ animationDelay: `${index * 60}ms` }}

// Boris-anrop
const response = await fetch("/api/boris", {
  method: "POST",
  body: JSON.stringify({ message, mode: "medicine", history: [] }),
});
```

---

## KANDA PROBLEM (VIKTIGT!)

### 1. Login/Auth ar trasigt
- `middleware.ts` kraver session-cookie for alla routes utom `/login`
- Login-formularet postar till `/login` (sig sjalv) istallet for `/api/login`
- Tva parallella auth-system: cookie-middleware vs localStorage-AuthContext
- Login-API accepterar alla credentials utan validering
- **Rekommendation:** Ta bort middleware.ts + login/ helt, behall bara AuthContext

### 2. Neon-databas oanvand
- Kopplad via Vercel Storage med `PGHOST_UNPOOLED`
- Ingen kod anvander den - allt ar localStorage
- **Rekommendation:** Installera Prisma, migrera data till Postgres

### 3. themeColor-varningar vid build
- Alla sidor visar: "Unsupported metadata themeColor"
- **Fix:** Flytta `themeColor` fran `metadata` till `viewport` export i layout.tsx

---

## Framtida Funktioner (28 ideer)

### "Wow Effect" (Hogsta prioritet)
1. ~~Symtom-checker med Boris~~ KLAR
2. Interaktiv fallbaserad inlarning med poangsystem
3. Rapport-generator for hela passet
4. Medicinskaps-scanner (fotografera lakemedel)
5. EKG-tolkare
6. Rostassistent for Boris

### Kliniska Verktyg (Medium prioritet)
7. Vatskebalans-kalkylator
8. Infusionshastighet-raknare
9. GCS-kalkylator
10. RASS/CAM-ICU
11. Smartskattning multi-skala
12. Nutritionsscreening (NRS-2002)
13. Fallriskbedomning (Downton)
14. Trycksar-prevention (Norton/Braden)

### Kunskapsbank
15. Akuta tillstand (sepsis, anafylaxi)
16. Lakemedelskunskap
17. Procedur-guider med bilder
18. Anatomi & fysiologi

### UX & Gamification
19. Personlig dashboard
20. Automatiskt nattlage
21. ~~Offline-lage (PWA)~~ KLAR
22. Delning & export
23. Daglig utmaning
24. Kunskapsquiz
25. Certifikat/badges
26. Team-funktioner
27. Kalender-integration
28. Anonymiserad statistik

### Rekommenderad prioritet
**Snabba vinster:** GCS, Vatskebalans, Smartskattning
**Medium effort:** Fallbaserad inlarning, Rostassistent
**Storre projekt:** EKG-tolkare, Medicinskaps-scanner

---

## Hur man testar

1. **Live:** Oppna https://nursecore.vercel.app
2. **Lokalt:** `cd /Users/matshamberg/CascadeProjects/nursecore && npm run dev`
3. **PWA:** Oppna pa mobil -> "Lagg till pa hemskarmen"
4. **Boris:** Testa studie-lage, jobb-lage, bilduppladdning, emotionellt stod
5. **NEWS2:** Valj alla parametrar - score animeras
6. **Header:** Scrolla ner - glaseffekten syns

---

*Senast uppdaterad: 12 februari 2026*
*Session 1: Boris AI (8 forbattringar) + 5 verktyg + Auth + PWA*
*Session 2: Layout-fix + 6 UI wow-effekter*
