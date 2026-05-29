# Legacy Labs Inner Circle — Application Funnel

A production-grade application funnel for Legacy Labs Inner Circle, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Every applicant receives a free AI-generated "AI Operator Gameplan" powered by Claude. Qualified applicants are routed to book a strategy call; unqualified applicants are directed to the free Skool community.

---

## Quick Start

```bash
cd legacy-labs-funnel
npm install
cp .env.example .env.local   # then fill in your keys (ANTHROPIC_API_KEY is already set)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local` (never commit this file):

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key from console.anthropic.com |
| `GHL_WEBHOOK_URL` | Recommended | GHL inbound webhook URL — see "Wiring GHL" below |

---

## Editing Copy and Configuration

**All questions, capital bands, qualifying tiers, URLs, and the AI system prompt live in one file:**

```
config/funnel.ts
```

No component knowledge needed to change:

### Change the qualifying threshold
Find `qualifyTiers` in `config/funnel.ts`. Remove `"under300"` to make everyone unqualified. Add `"under300"` to qualify everyone:

```ts
qualifyTiers: ["5to10k", "3to5k", "1to3k", "700to1k", "300to700"],
// ^ Remove any tier to exclude it from qualifying
```

### Change the Skool community URL
```ts
skoolUrl: "https://www.skool.com/the-founders-club/about",
```

### Change the AI model
```ts
anthropicModel: "claude-sonnet-4-6",
// Upgrade to Opus: "claude-opus-4-7"
```

### Change the GHL calendar embed
```ts
calendarEmbedUrl: "https://link.legacylabs.club/widget/booking/...",
calendarEmbedId: "...",
calendarScriptUrl: "https://link.legacylabs.club/js/form_embed.js",
```

### Edit questions or add options
Each question is defined as an object with `heading`, `sub`, and `options[]` in `config/funnel.ts`. Change labels, add options, or reorder — the form renders from config automatically.

---

## Wiring GoHighLevel

### Option 1: Inbound Webhook (Recommended — simplest)

1. In GHL: **Settings → Integrations → Webhooks → New Webhook**
2. Set URL to your deployed domain + `/api/submit` (or create a dedicated inbound webhook)
3. **Or** use a GHL Inbound Webhook trigger: create a workflow, add "Inbound Webhook" trigger, copy the URL
4. Paste that URL into `.env.local` as `GHL_WEBHOOK_URL`

**What gets sent** (flat JSON):

```json
{
  "firstName": "Ibrahim",
  "lastName": "Ansari",
  "email": "ibrahim@example.com",
  "phone": "+15551234567",
  "age": 28,
  "instagram": "@ibuansari",
  "stage": "early",
  "goal": "scale",
  "bottleneck": "acquisition",
  "commitment": "ready",
  "capital": "3to5k",
  "qualified": true,
  "tags": ["llic-applicant", "llic-qualified-call"],
  "source": "llic-application"
}
```

### Tags applied

| Situation | Tag |
|---|---|
| Contact step completed (partial) | `llic-applicant` |
| Capital answered, qualified ($300+) | `llic-applicant` + `llic-qualified-call` |
| Capital answered, not qualified | `llic-applicant` + `llic-skool-community` |

**Recommended GHL workflow triggers:**
- `llic-qualified-call` → Send gameplan email + booking confirmation
- `llic-skool-community` → Send gameplan email + Skool invite

### Partial Lead Capture

When a user completes the contact step (before the capital question), the app silently calls `/api/capture`. This saves the lead to GHL with the `llic-applicant` tag even if they abandon before answering the capital question.

---

## Deploying to Vercel

```bash
# Push to GitHub, then connect repo in Vercel dashboard
# OR deploy directly from CLI:
npx vercel --prod
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**. No other configuration needed.

---

## Analytics

Events fire automatically to `console.log` (dev) and `window.dataLayer` (GTM). To add PostHog or GA4 directly, uncomment the relevant lines in `lib/analytics.ts`.

| Event | When |
|---|---|
| `funnel_started` | CTA clicked on intro screen |
| `step_view` | Each step rendered |
| `step_complete` | Each step answered |
| `application_submit` | Form submitted |
| `qualified` / `not_qualified` | After results determined |
| `booking_click` | Booking CTA clicked |
| `skool_click` | Skool CTA clicked |

---

## Project Structure

```
legacy-labs-funnel/
├── app/
│   ├── api/
│   │   ├── capture/route.ts     # Partial lead capture (after contact step)
│   │   └── submit/route.ts      # Full submit + Anthropic gameplan + GHL push
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── GridBackground.tsx
│   │   └── LoadingState.tsx
│   ├── steps/
│   │   ├── SelectStep.tsx       # Auto-advancing single-select step
│   │   └── ContactStep.tsx      # Multi-field contact form
│   ├── FunnelApp.tsx            # State machine: intro → form → submitting → results
│   ├── IntroScreen.tsx
│   ├── ProgressBar.tsx
│   ├── ApplicationForm.tsx
│   ├── Gameplan.tsx             # AI gameplan renderer
│   └── ResultsScreen.tsx        # Branches: qualified (calendar) vs unqualified (Skool)
├── config/
│   └── funnel.ts                # ← EDIT THIS FILE for all copy/config changes
├── lib/
│   ├── schema.ts                # Zod validation schemas
│   ├── analytics.ts             # Pluggable analytics
│   ├── anthropic.ts             # Gameplan generation + fallback
│   └── ghl.ts                   # GHL webhook push
├── .env.example
└── .env.local                   # Your secrets (not committed)
```
