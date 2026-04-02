# SOPHIA — Vercel Deployment Guide
## Ονοματολογία, Ρόλοι, Βήματα Ανάπτυξης

---

## 1. ΟΝΟΜΑΤΟΛΟΓΙΑ & BRANDING

### Product Name: **SOPHIA**
- Full: *Socratic Wisdom Platform* ή *Συσύν Συμβουλίας*
- Tagline: "Δεν δίνω λύσεις. Κάνω ερωτήσεις που αποκαλύπτουν."
- URL: **sophia.gr** ή **advisorai.gr/sophia**

### Subdomain Strategy (Vercel):
```
sophia.vercel.app          (production)
staging.sophia.vercel.app  (staging)
dev.sophia.vercel.app      (development)
```

### GitHub Repo:
```
github.com/username/sophia-platform
├─ frontend/    (Next.js)
├─ backend/     (Express API)
├─ mcp-server/  (Custom MCP tools - optional)
└─ docs/        (Architecture + guides)
```

---

## 2. ΡΟΛΟΙ ΚΑΙ ΕΥΘΥΝΕΣ

### ΤΟ ΚΛΕΙΔΙ: Δύο διαφορετικά role

#### **Role 1: ARCHITECT/VISION**
- Σύ (Nikos) - Το brain του project
- Αποφασίζει τι πρέπει να κτιστεί
- Ορίζει τα requirements
- Επικοινωνία με πελάτες
- **Δεν** κώδικα (όχι αναγκαίως)

#### **Role 2: BUILDER/EXECUTOR**
- Είτε Claude Code CLI (δικό σου αν έχεις χρόνο)
- Είτε ένας dedicated developer/contractor
- Ακολουθεί τις specifications
- Κτίζει, test, deploy
- Handles GitHub & Vercel configurations

---

## 3. ΦΆΣΕΙΣ ΑΝΆΠΤΥΞΗΣ

### **ΦΑΣΗ 0: Planning (2 ημέρες) — SY ΚΑΝΕΙΣ ΑΥΤ Ο**

```
Δεν είναι κώδικας. Είναι αποφάσεις:

☐ Ποιο είναι το ΠΡΩΤΟ feature που θα κυκλοφορήσουμε;
  → Single dialogue session (όχι multiple users ακόμα)

☐ Ποια είναι η πρώτη χρήση;
  → Free trial (3 sessions)
  → Πληρωμή μετά (Stripe)

☐ Βάση δεδομένων;
  → Vercel Postgres (Neon) - σύσταση για Vercel
  → PostgreSQL free tier αρκεί για MVP

☐ Authentication;
  → Clerk (free tier) ή Supabase Auth
  → Ή απλά email + magic link (Resend)

☐ Payments;
  → Stripe (που ήδη χρησιμοποιείς)
```

**Deliverable:** ένα document με αποφάσεις ↓

---

### **ΦΑΣΗ 1: Setup (3-4 ημέρες) — ΓΙΑ ΤΟΝ BUILDER**

```
Αυτό κάνει ο developer ΠΡΙΝ γράψει κώδικα:

1. GitHub Repository Setup
   ├─ Create repo: github.com/nikos/sophia
   ├─ .gitignore (Node.js template)
   ├─ README.md (architecture diagram)
   └─ CLAUDE.md (instructions για AI work)

2. Vercel Project
   ├─ Create new Vercel project
   ├─ Connect GitHub repo
   ├─ Set environment variables
   ├─ Configure custom domain
   └─ Enable Preview deployments

3. Database Setup
   ├─ Create Vercel Postgres (or Neon)
   ├─ Run migrations
   ├─ Test connection
   └─ Backup strategy

4. Environment Files
   ├─ .env.local (local development)
   ├─ .env.production (Vercel)
   └─ .env.example (template)

5. Project Structure
   sophia/
   ├─ next.config.js          (Next.js config)
   ├─ package.json            (dependencies)
   ├─ tsconfig.json           (TypeScript - optional)
   ├─ .env.example
   ├─ .env.local (gitignored)
   ├─ public/
   │  ├─ logo.svg
   │  └─ favicon.ico
   ├─ src/
   │  ├─ app/
   │  │  ├─ layout.tsx
   │  │  ├─ page.tsx          (homepage)
   │  │  ├─ session/
   │  │  │  └─ [id]/
   │  │  │     └─ page.tsx    (chat UI)
   │  │  └─ api/
   │  │     ├─ session/
   │  │     │  ├─ new/route.ts
   │  │     │  └─ [id]/route.ts
   │  │     ├─ dialogue/route.ts
   │  │     └─ insights/[id]/route.ts
   │  ├─ lib/
   │  │  ├─ db.ts             (database client)
   │  │  ├─ claude.ts         (Claude API calls)
   │  │  └─ prompts/
   │  │     ├─ system.ts
   │  │     ├─ layer1.ts
   │  │     ├─ layer2.ts
   │  │     └─ layer3.ts
   │  ├─ components/
   │  │  ├─ ChatWindow.tsx
   │  │  ├─ MessageList.tsx
   │  │  └─ InputForm.tsx
   │  └─ types/
   │     ├─ session.ts
   │     ├─ dialogue.ts
   │     └─ user.ts
   ├─ migrations/
   │  └─ 001_initial.sql
   └─ docs/
      ├─ ARCHITECTURE.md
      ├─ API.md
      └─ DEPLOYMENT.md
```

**Deliverable:** Έτοιμο GitHub repo + Vercel project με environment setup

---

### **ΦΆΣΗ 2: Core Features (1-2 εβδομάδες) — ΓΙΑ ΤΟΝ BUILDER**

**MVP Features (in order):**

#### **2.1 Homepage + Auth**
```
✓ Landing page (Sophia info)
✓ Sign up / Login (Clerk or Resend)
✓ Redirect to dashboard
```

**Files to create:**
- `src/app/page.tsx` — Homepage
- `src/app/auth/...` — Auth flow
- `src/components/LandingHero.tsx`

#### **2.2 Session Management**
```
✓ Create new session (button)
✓ Save session to DB
✓ Redirect to chat
```

**API:**
```
POST /api/session/new
├─ Input: { userId, topic }
└─ Output: { sessionId, greeting }
```

**Files:**
- `src/app/api/session/new/route.ts`
- `src/lib/db.ts` (session queries)

#### **2.3 Dialogue Engine (THE CORE)**
```
✓ Layer 1: Understand (Haiku)
✓ Layer 2: Diagnose (Haiku)
✓ Layer 3: Respond (Sonnet)
✓ Save all to DB
```

**API:**
```
POST /api/dialogue
├─ Input: { sessionId, userMessage }
├─ Process 3 layers
└─ Output: { sophiaQuestion, metadata }
```

**Files:**
- `src/lib/claude.ts` (API calls)
- `src/lib/prompts/` (all 3 layers)
- `src/app/api/dialogue/route.ts`

#### **2.4 Chat UI**
```
✓ Display messages
✓ Show loading state
✓ Cost tracker
✓ Display thinking (collapsible)
```

**Files:**
- `src/app/session/[id]/page.tsx`
- `src/components/ChatWindow.tsx`
- `src/components/MessageList.tsx`
- `src/components/InputForm.tsx`

**Deliverable:** Fully working MVP - μπορείς να κάνεις συνεδρία

---

### **ΦΆΣΗ 3: Polish & Optimization (3-5 ημέρες)**

```
☐ Error handling (try/catch everywhere)
☐ Rate limiting (don't spam API)
☐ Token counting (predict costs)
☐ Analytics (track sessions)
☐ Mobile responsive
☐ Dark mode
☐ Insights sidebar
☐ Session history
☐ Export session as PDF
```

---

### **ΦΆΣΗ 4: Testing & Deployment (2-3 ημέρες)**

```
☐ Unit tests (jest)
☐ Integration tests (API calls)
☐ Manual QA (σ\' με ως QA)
☐ Staging deployment
☐ Production deployment
☐ Monitor errors (Sentry)
☐ Monitor costs (Claude API usage)
```

---

## 4. ΠΟΙΟΣ ΝΑ ΤΟ ΚΑΝΕΙ

### **Option A: Claude Code CLI (DIY)**

Εσύ κάνεις τα πάντα αλλά με Claude βοήθεια:

```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Work in terminal
claude-code

# Within a session:
/new next-app sophia
/architect  # planning
/build       # code
/test       # validation
/deploy     # Vercel
```

**Πλεονεκτήματα:**
- Πλήρης έλεγχος
- Δεν χρειάζεται χρήμα
- Μαθαίνεις
- Ταχεία iteration

**Μειονεκτήματα:**
- Χρονοβόρο
- Περισσότερες bugs
- Δεν έχεις κόσμε για άλλα

### **Option B: Dedicated Developer/Contractor**

Προσλαμβάνεις ένα ατόμο να το κτίσει:

```
Ποιος να αναζητήσεις:
├─ Next.js + Node.js expert
├─ PostgreSQL experience
├─ Vercel deployment experience
└─ "Can follow detailed specifications"

Πού να ψάξεις:
├─ Upwork (€15-30/hr για Greece devs)
├─ LinkedIn
├─ Local dev communities
└─ Referrals

Budget:
├─ MVP (Phases 1-2): ~40-60 hours = €600-1,800
├─ Full (Phases 1-4): ~80-120 hours = €1,200-3,600
└─ Ongoing maintenance: €200-500/month
```

**Πλεονεκτήματα:**
- Γρήγορο
- Ειδικό
- Μπορείς να δουλεύεις σε άλλα

**Μειονεκτήματα:**
- Κόστος
- Χρειάζεται καλό brief
- Πιθανά QA issues

### **Option C: Hybrid (RECOMMENDED FOR YOU)**

```
Σ\' (Nikos):
├─ Phase 0: Planning & specifications
├─ Phase 2.3: Dialogue engine (core logic - δύσκολο μέρος)
├─ Phase 4: Testing & validation
└─ Ongoing: Product decisions

Developer:
├─ Phase 1: Setup
├─ Phases 2.1-2.2, 2.4: UI/UX & standard APIs
├─ Phase 3: Polish
└─ Ongoing: Maintenance & scaling
```

**Why this for you:**
- Κόστος 30-40% λιγότερο
- Έχεις έλεγχο στο core (dialogue engine)
- Developer κάνει το boilerplate
- Εσύ έχεις χρόνο για marketing

---

## 5. DEVELOPMENT WORKFLOW (GitHub → Vercel)

### **Git Workflow (για όποιος κάνει code)**

```bash
# 1. Clone repo
git clone github.com/nikos/sophia.git
cd sophia

# 2. Create feature branch
git checkout -b feature/dialogue-engine

# 3. Develop locally
npm run dev  # http://localhost:3000

# 4. Commit
git add .
git commit -m "feat: implement layer 3 respond logic"

# 5. Push to GitHub
git push origin feature/dialogue-engine

# 6. Create Pull Request on GitHub
# → Describe what you changed
# → Request review

# 7. Review (σ\' κρίνεις το code)
# → Approve or request changes

# 8. Merge to main
git merge feature/dialogue-engine

# 9. Automatic Vercel Deploy
# → Vercel sees push to main
# → Runs build
# → Deploys to production
```

### **Vercel Auto-Deploy**

```yaml
# When you push to GitHub:
1. Vercel detects change
2. Runs: npm run build
3. Runs: npm run test (optional)
4. Deploys to staging (preview.sophia.vercel.app)
5. After approval, deploys to production (sophia.vercel.app)

# Environment variables auto-injected:
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
```

---

## 6. DETAILED SETUP INSTRUCTIONS

### **Step 1: Create Next.js Project**

```bash
# Option A: Use Vercel's template
npx create-next-app@latest sophia \
  --typescript \
  --tailwind \
  --app \
  --no-eslint

cd sophia

# Option B: Manual
mkdir sophia
cd sophia
npm init -y
npm install next react react-dom
```

### **Step 2: Create GitHub Repo**

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on github.com (no README)
# Then:
git branch -M main
git remote add origin https://github.com/nikos/sophia.git
git push -u origin main
```

### **Step 3: Connect to Vercel**

```
1. Go to vercel.com
2. Click "Add New..." → Project
3. Import GitHub repo
4. Project name: sophia
5. Framework: Next.js
6. Set environment variables:
   - ANTHROPIC_API_KEY
   - DATABASE_URL
   - STRIPE_SECRET_KEY
7. Click Deploy

✓ Your app is now live at sophia.vercel.app
```

### **Step 4: Database Setup**

Option A: **Vercel Postgres** (easiest)
```
1. In Vercel dashboard
2. Storage → Create Database → Postgres
3. Copy connection string
4. Add to .env.local: DATABASE_URL=...
5. Run migrations
```

Option B: **Neon** (also good)
```
1. Go to neon.tech
2. Create new project
3. Get connection string
4. Same as above
```

### **Step 5: Create Basic Structure**

```bash
mkdir -p src/{app,components,lib,types}
mkdir -p migrations
touch .env.local
touch CLAUDE.md
```

### **Step 6: Install Dependencies**

```bash
npm install \
  @anthropic-ai/sdk \
  @clerk/nextjs \        # or Resend for auth
  @stripe/react-stripe-js \
  stripe \
  pg \                   # PostgreSQL client
  dotenv
```

---

## 7. COST BREAKDOWN

### **Monthly Costs (MVP)**

```
Claude API (estimate):
├─ 100 users × 5 sessions/month = 500 sessions
├─ 5 rounds/session = 2,500 rounds
├─ €0.015/round (Sonnet cost)
└─ Total: €37.50/month

Hosting:
├─ Vercel: FREE (up to 100GB bandwidth)
└─ Total: €0

Database:
├─ Vercel Postgres: FREE (up to 10GB)
└─ Total: €0

Auth:
├─ Clerk: FREE (up to 10k users)
└─ Total: €0

Payments:
├─ Stripe: 2.9% + €0.30 per transaction
├─ If €500/month revenue: ~€18
└─ Total: €18

Domain:
├─ .gr domain: ~€10-15/year
└─ Total: €1.25/month

TOTAL: ~€57/month

Revenue (assume):
├─ 50 active users × €500/package × 1x/month
└─ €25,000/month

Profit: €24,943/month (after costs)
```

---

## 8. TIMELINE & MILESTONES

### **Ideal Timeline**

```
WEEK 1: Planning + Setup
├─ Day 1-2: Planning document
├─ Day 3-4: GitHub + Vercel setup
└─ Day 5: Database ready, .env configured

WEEK 2: Core MVP
├─ Day 1-3: Homepage + Auth
├─ Day 3-4: Dialogue Engine (3-layer logic)
└─ Day 5: Chat UI

WEEK 3: Testing + Deploy
├─ Day 1-2: Polish & bug fixes
├─ Day 3: Staging testing
├─ Day 4: Production deploy
└─ Day 5: Monitor & hotfix

LIVE: End of Week 3
```

---

## 9. DEVELOPER INSTRUCTIONS (IF HIRING)

### **The Brief You Send to Developer:**

```markdown
# SOPHIA - Development Brief

## Project Overview
Socratic wisdom platform that uses Claude API to guide users through
logical thinking using 3-layer system:
1. Understand (Haiku)
2. Diagnose (Haiku)  
3. Respond (Sonnet)

## Tech Stack (Non-negotiable)
- Frontend: Next.js 16.x + React + Tailwind
- Backend: API Routes (Next.js)
- Database: Vercel Postgres (Neon)
- Auth: Clerk or Resend
- Payments: Stripe
- AI: Anthropic Claude API

## Deliverables (MVP)

### Phase 1: Setup (your responsibility)
- [ ] GitHub repo structure
- [ ] Vercel project configured
- [ ] Database created & migrations
- [ ] Environment variables set up

### Phase 2: Features
- [ ] Homepage (landing page)
- [ ] Auth (sign up/login)
- [ ] Create session (DB)
- [ ] 3-layer dialogue engine (core)
- [ ] Chat UI + real-time updates
- [ ] Save dialogue to DB

### Phase 3: Polish
- [ ] Error handling
- [ ] Token counting
- [ ] Analytics
- [ ] Mobile responsive

### Phase 4: Testing & Deploy
- [ ] Unit tests
- [ ] Manual QA with provided test cases
- [ ] Staging deployment
- [ ] Production deployment

## API Specifications

### POST /api/session/new
```
Input: { userId, topic }
Output: { sessionId, greeting }
```

### POST /api/dialogue
```
Input: { sessionId, userMessage }
Process:
  1. Layer 1 (Haiku): Understand
  2. Layer 2 (Haiku): Diagnose
  3. Layer 3 (Sonnet): Generate question
  4. Save to DB
Output: { sophiaQuestion, thinking, costUsd, tokensUsed }
```

### GET /api/insights/[sessionId]
```
Output: { keyInsights, maturityLevel, nextFocus }
```

## Prompt Logic (You implement with Claude's help)

See SOPHIA_ARCHITECTURE.md and SOPHIA_IMPLEMENTATION.md

## Rate & Timeline
- Budget: €X
- Timeline: 2-3 weeks for MVP
- Deliverables: Working feature branches + PRs

## Communication
- Daily updates (5pm UTC)
- Weekly sync call
- PR reviews required before merge
- GitHub issues for blockers
```

---

## 10. DEPLOYMENT CHECKLIST

```bash
# Before going live:
☐ All environment variables set in Vercel
☐ Database migrations run
☐ API keys working (Anthropic, Stripe)
☐ Auth flow tested (sign up → dashboard)
☐ Dialogue engine tested (3 full sessions)
☐ Chat UI responsive (mobile + desktop)
☐ Error pages working (404, 500)
☐ Logging working (see errors in Vercel dashboard)
☐ Stripe webhook configured
☐ Custom domain set up (if using)
☐ SSL certificate (automatic with Vercel)
☐ Backup strategy in place (DB)
☐ Monitoring set up (Sentry for errors)

# Deploy command:
# → Push to main branch
# → Vercel auto-deploys
# → Check sophia.vercel.app

# Monitor:
# → Vercel dashboard (deployments)
# → Vercel analytics (traffic)
# → Sentry (errors)
# → Stripe dashboard (payments)
```

---

## 11. ONGOING (μετά launch)

```
Weekly:
├─ Monitor costs (API usage)
├─ Check error logs
└─ Read user feedback

Monthly:
├─ Analyze conversation patterns
├─ Improve prompts
├─ Add new features (based on usage)
└─ Update documentation

Quarterly:
├─ Review business metrics
├─ Plan next features
├─ Team retro
└─ Security audit
```

---

## TL;DR

**To launch SOPHIA on Vercel in 3 weeks:**

1. **You do:** Planning (what features, how it works)
2. **Developer does:** GitHub + Vercel setup + coding
3. **You review:** PRs + test features
4. **Deploy:** Push to main → Vercel auto-deploys
5. **Launch:** sophia.vercel.app live

**Cost:** ~€0-60/month (hosting + API)  
**Revenue potential:** €25k+/month (even conservative)

**Go live. Iterate. Scale.**
