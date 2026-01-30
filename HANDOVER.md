# NurseCore - Session Handover & Summary

## Quick Summary
NurseCore är en svensk klinisk verktygslåda för sjuksköterskor. I denna session har vi byggt ut Boris AI med 8 förbättringar och skapat 5 nya kliniska verktyg.

---

## Project Overview

**Vad är NurseCore?**
En lugn, strukturerad app för dagligt vårdarbete och studier. Allt på ett ställe: checklistor, AI-stöd med Boris, kliniska kalkylatorer och kunskapsbank.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS med dark mode (class strategy)
- OpenAI API (GPT-4o för vision, GPT-4o-mini för text)
- react-markdown för rendering av Boris-svar

**Miljövariabler:**
```
OPENAI_API_KEY=sk-...  # Krävs för Boris AI
```

---

## Session Summary (Januari 2025)

### Boris AI - 8 Förbättringar

| # | Förbättring | Beskrivning |
|---|-------------|-------------|
| 1 | **Markdown-formatering** | Boris svarar med rubriker, listor, fetstil |
| 2 | **Konversationshistorik** | Minns senaste 10 meddelanden |
| 3 | **Verktygsförslag** | Föreslår relevanta NurseCore-verktyg |
| 4 | **Skiftläge** | Dag/Kväll/Natt-anpassade råd |
| 5 | **Emotionellt stöd** | Känner av stress, bekräftar känslor först |
| 6 | **Bildanalys** | Ladda upp bilder för analys (GPT-4o) |
| 7 | **Professionella riktlinjer** | Refererar till "allmänt känd information" |
| 8 | **Mjukare formuleringar** | "Ofta hänger det ihop med...", "Ett vanligt sätt att förstå detta är..." |

**Nyckelcitat från Boris-prompten:**
```
Du är Boris – en kunnig och pedagogisk AI-assistent för sjuksköterskor inom svensk sjukvård.
Du är varm, stöttande och engagerande - aldrig torr eller byråkratisk.
```

### Nya Kliniska Verktyg - 5 st

| Verktyg | Sökväg | Beskrivning |
|---------|--------|-------------|
| **NEWS2** | `/news2` | Interaktiv kalkylator med alla 7 parametrar, färgkodade risknivåer |
| **SBAR** | `/sbar` | Generator med urgency-väljare, live-preview, kopiera med ett klick |
| **Labb-tolkare** | `/labb` | 18 vanliga labbvärden + fritext, Boris förklarar kliniskt |
| **Symtom-checker** | `/symtom` | Differentialdiagnostik, red flags, omvårdnadsåtgärder |
| **FAQ** | Startsidan | 6 expanderbara frågor om hur man använder appen |

### Övriga Uppdateringar

- **Dark mode** på alla nya komponenter och startsidans kort
- **Tvåspråkigt stöd** (SV/EN) för alla nya funktioner
- **Gradient-kort** på startsidan (röd=NEWS2, blå=SBAR, lila=Labb, orange=Symtom)

---

## Filstruktur (Viktiga filer)

```
src/
├── app/
│   ├── page.tsx                 # Startsida med FAQ
│   ├── boris/
│   │   ├── studie/page.tsx      # Boris studieläge
│   │   └── jobb/page.tsx        # Boris jobbläge (med skiftväljare)
│   ├── news2/page.tsx           # NEWS2 kalkylator
│   ├── sbar/page.tsx            # SBAR generator
│   ├── labb/page.tsx            # Labb-tolkare
│   ├── symtom/page.tsx          # Symtom-checker (NY!)
│   ├── tools/page.tsx           # Kliniska checklistor
│   ├── knowledge/page.tsx       # Kunskapsbank
│   ├── notes/page.tsx           # Personliga anteckningar
│   └── api/
│       └── boris/route.ts       # Boris API endpoint (alla prompts här)
├── lib/
│   ├── translations.ts          # Alla SV/EN översättningar
│   ├── LanguageContext.tsx      # Språkhantering
│   └── ThemeContext.tsx         # Dark mode
└── data/
    └── knowledge-content.tsx    # Tvåspråkigt kunskapsinnehåll
```

---

## Kodmönster att känna till

```typescript
// Språk
const { t, language } = useLanguage();
// Använd: t.home.title, language === "sv"

// Dark mode klasser
className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"

// Kort-styling
className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"

// Boris-anrop
const response = await fetch("/api/boris", {
  method: "POST",
  body: JSON.stringify({ message, mode: "medicine", history: [] }),
});

// Markdown-rendering
<ReactMarkdown>{borisResponse}</ReactMarkdown>
```

---

## Git Commits (Denna session)

```
07cc570 docs: add 28 future feature ideas to handover
17c87f4 docs: add session handover for next agent
da2cb29 feat: add FAQ section to home page
fb9c491 feat: add NEWS2, SBAR, and lab interpreter tools
b80fd7d style: add smoother phrasing to Boris responses
6a6592b refactor: align Boris with professional guidelines
6c2edd8 fix: make Boris more helpful with image analysis
[+ tidigare commits för Boris-förbättringar]
```

---

## Framtida Funktioner (28 idéer)

### "Wow Effect" (Högsta prioritet)
1. ~~Symtom-checker med Boris~~ ✅ KLAR
2. Interaktiv fallbaserad inlärning med poängsystem
3. Rapport-generator för hela passet
4. Medicinskåps-scanner (fotografera läkemedel)
5. EKG-tolkare
6. Röstassistent för Boris

### Kliniska Verktyg (Medium prioritet)
7. Vätskebalans-kalkylator
8. Infusionshastighet-räknare
9. GCS-kalkylator
10. RASS/CAM-ICU
11. Smärtskattning multi-skala
12. Nutritionsscreening (NRS-2002)
13. Fallriskbedömning (Downton)
14. Trycksårsprevention (Norton/Braden)

### Kunskapsbank
15. Akuta tillstånd (sepsis, anafylaxi)
16. Läkemedelskunskap
17. Procedur-guider med bilder
18. Anatomi & fysiologi

### UX & Gamification
19. Personlig dashboard
20. Automatiskt nattläge
21. Offline-läge (PWA)
22. Delning & export
23. Daglig utmaning
24. Kunskapsquiz
25. Certifikat/badges
26. Team-funktioner
27. Kalender-integration
28. Anonymiserad statistik

### Rekommenderad prioritet för nästa agent
**Snabba vinster:** GCS, Vätskebalans, Smärtskattning
**Medium effort:** Fallbaserad inlärning, Röstassistent
**Större projekt:** EKG-tolkare, PWA, Medicinskåps-scanner

---

## Kända begränsningar

- Boris ger aldrig doseringsråd eller behandlingsbeslut
- Ingen persistent lagring (anteckningar i localStorage)
- Ingen användarautentisering än
- Boris-historik försvinner vid sidladdning

---

## Kontakt & Support

- Användare kan rapportera problem via FAQ
- Lokala PM och ansvarig läkare ska alltid konsulteras
- Appen är ett komplement, inte ersättning för professionellt omdöme

---

*Senast uppdaterad: Januari 2025*
*Session: Boris AI förbättringar + 5 nya kliniska verktyg*
