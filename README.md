# NurseCore

Klinisk verktygslada for sjukskoterskor - AI-stod, checklistor, kalkylatorer och kunskapsbank.

## Lankar

| Vad | Lank |
|-----|------|
| Live-sida | [nursecore.vercel.app](https://nursecore.vercel.app) |
| Vercel Dashboard | [vercel.com/mats-hambergs-projects/nursecore](https://vercel.com/mats-hambergs-projects/nursecore) |
| GitHub Repo | [github.com/Mats6102hamberg/nursecore](https://github.com/Mats6102hamberg/nursecore) |
| Lokal mapp | [/Users/matshamberg/CascadeProjects/nursecore](/Users/matshamberg/CascadeProjects/nursecore) |

## Starta lokalt

```bash
cd /Users/matshamberg/CascadeProjects/nursecore
npm install
npm run dev
```

Oppna: http://localhost:3000

## Miljovariabler

Skapa `.env.local` i roten (eller satt i Vercel Dashboard):

```
OPENAI_API_KEY=sk-...
```

## Dokumentation

- [HANDOVER.md](./HANDOVER.md) - Fullstandig projektoverlamning och status
- [SESSION_SUMMARY.md](./SESSION_SUMMARY.md) - Senaste sessionens detaljerade rapport

## Changelog

### v1.2 (12 Feb 2026)
- Fix: Layout overflow pa mobil (innehall som gled runt)
- Glasmorfism-header med backdrop-blur
- Staggered card-animationer pa startsidan
- Animerade Boris typing-dots
- Gradient-logga
- Pulserande Boris CTA-knapp
- Animerad NEWS2 score-counter
- Fix: themeColor build-varningar

### v1.1
- Tools cards grouped by category with expandable content
- Copy feedback ("Copied!") on tool cards
- Send to Boris prefill with mode handoff
- Favorites toggle with local-only persistence
