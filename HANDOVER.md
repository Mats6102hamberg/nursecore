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

## Potential Next Steps

- Add more clinical tools (drug calculators, fluid balance, etc.)
- Expand knowledge bank with more topics
- Add user authentication for persistent data
- Offline support / PWA
- More quick-select labs in Lab interpreter
- Voice input for Boris

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
