# NurseCore - Session Handover

## Project Overview
NurseCore is a Swedish nursing clinical toolkit web app. A calm, structured place for daily nursing work and study with AI support.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS with dark mode (class strategy)
- OpenAI API (GPT-4o for vision, GPT-4o-mini for text)
- react-markdown for rendering AI responses

---

## Session Summary (January 2025)

### Boris AI Enhancements
Boris is the AI assistant. Major improvements made:

1. **Markdown formatting** - Boris responses render with headers, lists, bold text
2. **Conversation history** - Maintains context (last 10 messages)
3. **Tool suggestions** - Boris recommends NurseCore tools in responses
4. **Shift awareness** - Day/Evening/Night modes with contextual advice
5. **Emotional support** - Detects stress keywords and responds warmly first
6. **Image analysis** - Upload images for Boris to analyze (uses GPT-4o)
7. **Professional guidelines** - References "established knowledge" not personal experience
8. **Smoother phrasing** - Natural Swedish like "Ofta hänger det ihop med..."

**Key files:**
- `/src/app/api/boris/route.ts` - Boris backend with all prompts
- `/src/app/boris/studie/page.tsx` - Study mode (deep learning)
- `/src/app/boris/jobb/page.tsx` - Work mode (quick support + shift selector)

### New Clinical Tools

1. **NEWS2 Calculator** (`/src/app/news2/page.tsx`)
   - All 7 parameters (respiration, SpO2, oxygen, temp, BP, pulse, consciousness)
   - Color-coded risk levels (green/yellow/orange/red)
   - Action recommendations based on score

2. **SBAR Generator** (`/src/app/sbar/page.tsx`)
   - Four sections: Situation, Background, Assessment, Recommendation
   - Urgency selector (Normal/Urgent/Acute)
   - Live preview with copy-to-clipboard

3. **Lab Interpreter** (`/src/app/labb/page.tsx`)
   - Quick-select mode: 18 common Swedish lab values
   - Paste mode: Free text input
   - Boris AI integration for interpretation

### Other Updates

- **FAQ Section** on home page (`/src/app/page.tsx`)
  - 6 expandable questions about using the app
  - Full bilingual support (SV/EN)

- **Dark mode** added to all new components and home page cards

- **Translations** in `/src/lib/translations.ts`
  - All new features have Swedish and English versions

---

## File Structure (Key Files)

```
src/
├── app/
│   ├── page.tsx              # Home page with FAQ
│   ├── boris/
│   │   ├── studie/page.tsx   # Boris study mode
│   │   └── jobb/page.tsx     # Boris work mode
│   ├── news2/page.tsx        # NEWS2 calculator
│   ├── sbar/page.tsx         # SBAR generator
│   ├── labb/page.tsx         # Lab interpreter
│   ├── tools/page.tsx        # Clinical checklists
│   ├── knowledge/page.tsx    # Knowledge bank
│   ├── notes/page.tsx        # Personal notes
│   └── api/
│       └── boris/route.ts    # Boris API endpoint
├── lib/
│   ├── translations.ts       # All SV/EN translations
│   ├── LanguageContext.tsx   # Language state
│   └── ThemeContext.tsx      # Dark mode state
└── data/
    └── knowledge-content.tsx # Bilingual knowledge articles
```

---

## Environment Variables

```
OPENAI_API_KEY=sk-...  # Required for Boris AI
```

---

## Known Patterns

- All pages use `useLanguage()` hook for translations
- Dark mode classes follow pattern: `dark:bg-neutral-800 dark:text-neutral-100`
- Cards use `rounded-2xl border shadow-sm` styling
- Boris responses rendered with `<ReactMarkdown>` and prose classes
- New tools have gradient borders (red=NEWS2, blue=SBAR, purple=Labb)

---

## Future Features & Ideas

### "Wow Effect" Features (High Impact)

1. **Symtom-checker med Boris**
   - Användaren beskriver symtom → Boris ger differentialdiagnoser
   - Föreslår relevanta undersökningar och prover
   - "Red flags" varningar för allvarliga tillstånd

2. **Interaktiv fallbaserad inlärning**
   - Boris presenterar patientfall steg för steg
   - Användaren fattar beslut → får feedback
   - Poängsystem och progression
   - "Dagens fall" - nytt fall varje dag

3. **Rapport-generator för hela passet**
   - Samla flera SBAR, NEWS2, labbvärden
   - Generera sammanfattande skiftrapport
   - Exportera som PDF eller dela

4. **Medicinskåps-scanner**
   - Fotografera läkemedelsförpackning
   - Boris identifierar och ger info om:
     - Indikationer, kontraindikationer
     - Vanliga biverkningar
     - Omvårdnadsaspekter

5. **EKG-tolkare**
   - Ladda upp EKG-bild
   - Boris analyserar rytm, intervall, avvikelser
   - Pedagogisk förklaring av fynd

6. **Röstassistent för Boris**
   - Hands-free under arbetet
   - "Hej Boris, vad är normalt CVP?"
   - Text-to-speech för svar

### Kliniska Verktyg (Medium Impact)

7. **Vätskebalans-kalkylator**
   - Input/output tracking
   - Beräkna nettovätska
   - Varning vid obalans

8. **Infusionshastighet-räknare**
   - Dos per kg, ml/h, droppar/min
   - Spädningsberäkningar
   - Vanliga protokoll (ex. Noradrenalin)

9. **GCS-kalkylator (Glasgow Coma Scale)**
   - Interaktiv poängsättning
   - Tolkning och åtgärdsförslag

10. **RASS/CAM-ICU för sedation**
    - Sedering och delirium-screening
    - Dokumentationshjälp

11. **Smärtskattning multi-skala**
    - VAS, NRS, Abbey (demens), FLACC (barn)
    - Hjälp välja rätt skala

12. **Nutritionsscreening (NRS-2002)**
    - Steg-för-steg screening
    - Åtgärdsförslag baserat på poäng

13. **Fallriskbedömning (Downton)**
    - Interaktiv checklista
    - Förebyggande åtgärder

14. **Trycksårsprevention (Norton/Braden)**
    - Riskbedömning
    - Lägesändringsschema

### Kunskapsbank-expansion

15. **Akuta tillstånd**
    - Sepsis, anafylaxi, lungödem
    - Steg-för-steg handläggning

16. **Läkemedelskunskap**
    - Vanliga vårdavdelningsläkemedel
    - Omvårdnadsaspekter per läkemedel

17. **Procedur-guider**
    - KAD-sättning, PVK, sugning
    - Steg-för-steg med bilder

18. **Anatomi & fysiologi-repetition**
    - Interaktiva illustrationer
    - Koppling till kliniken

### Användarupplevelse

19. **Personlig dashboard**
    - Favorit-verktyg snabbåtkomst
    - Senaste Boris-konversationer
    - Studiestatistik

20. **Mörkt läge schema**
    - Automatiskt nattläge baserat på klockslag
    - Extra dämpad för nattpass

21. **Offline-läge (PWA)**
    - Verktyg fungerar utan internet
    - Kunskapsbank cachad lokalt

22. **Delning & export**
    - Dela SBAR via SMS/mail
    - Exportera beräkningar som bild

### Gamification & Motivation

23. **Daglig utmaning**
    - En fråga per dag från Boris
    - Streak-räknare för kontinuerligt lärande

24. **Kunskapsquiz**
    - Testa dig själv per ämne
    - Spaced repetition för svåra frågor

25. **Certifikat/badges**
    - "Genomfört IBD-modulen"
    - Delbart på LinkedIn

### Integration & Samarbete

26. **Team-funktioner**
    - Dela checklistor inom teamet
    - Gemensam kunskapsbank med egna tillägg

27. **Kalender-integration**
    - Påminnelser för studiepass
    - Synka med arbetsschema

28. **Anonymiserad statistik**
    - Vilka verktyg används mest
    - Vanligaste Boris-frågorna (för att förbättra)

---

## Recommended Priority Order

**Snabba vinster (1-2 timmar vardera):**
1. GCS-kalkylator (#9)
2. Vätskebalans-kalkylator (#7)
3. Smärtskattning multi-skala (#11)

**Medium effort, high value (halv dag):**
4. Interaktiv fallbaserad inlärning (#2)
5. Symtom-checker med Boris (#1)
6. Röstassistent (#6)

**Större projekt (1+ dag):**
7. EKG-tolkare (#5)
8. Offline-läge PWA (#21)
9. Medicinskåps-scanner (#4)

---

## Recent Git Commits

```
da2cb29 feat: add FAQ section to home page
fb9c491 feat: add NEWS2, SBAR, and lab interpreter tools
b80fd7d style: add smoother phrasing to Boris responses
6a6592b refactor: align Boris with professional guidelines
6c2edd8 fix: make Boris more helpful with image analysis
```

---

*Last updated: January 2025*
