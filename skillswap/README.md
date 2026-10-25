# SkillSwap: Peer Mentorship & Micro-Gigs for Dropouts

A community platform where young people who left formal education learn job-ready skills from **verified local mentors**, earn through **paid micro-gigs** from nearby businesses, and build a **verified digital portfolio**.

Supports **SDG 4 (Quality Education)** and **SDG 8 (Decent Work and Economic Growth)**.

## Features (prototype)
- Location-based matching of gigs and mentors (nearest first)
- Paid micro-gig board with skill filter
- Verified mentors only
- Accept gigs to earn income, unlock progress badges and grow a portfolio

## Setup
Requires a browser; Node.js 18+ is only needed for tests.

```bash
git clone https://github.com/<your-username>/skillswap.git
cd skillswap
npm start          # serves the site (or just open index.html)
npm test           # runs unit tests
```

### Environment variables
The prototype needs none. `.env.example` lists variables planned for the production backend (`SKILLSWAP_API_URL`, `MAPS_API_KEY`, `SMS_PROVIDER_KEY`). Copy to `.env` when you add a backend.

## Project structure
```
index.html  styles.css  app.js     UI
src/        matching logic + sample data
data/       sample-data.json
tests/      unit tests (node:test)
docs/       ARCHITECTURE.md (technical design + diagrams)
```

## Docs, data, tests, license
- Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Sample data: [data/sample-data.json](data/sample-data.json)
- Tests: `npm test` (also run by GitHub Actions)
- License: [MIT](LICENSE)
