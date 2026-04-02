# SOPHIA — Developer Hiring Brief & Onboarding
## Ο Ακριβής Guide αν θέλεις να προσλάβεις κάποιον

---

## ΠΡΙΝ ΦΤΙΑΞΕΙΣ ΔΙΑΦΉΜΙΣΗ

### Ποιος είναι ο σωστός developer;

```
MUST HAVE:
✓ Next.js 15-16 (recent versions)
✓ TypeScript (or willing to learn quickly)
✓ PostgreSQL experience
✓ React component development
✓ REST API design (or fetching)
✓ Vercel deployment experience

NICE TO HAVE:
✓ Clerk or Supabase auth
✓ Stripe integration
✓ Real-time features (WebSocket)
✓ Testing (Jest)
✓ Docker basics

NOT NEEDED:
✗ Kubernetes
✗ AWS DevOps
✗ Mobile (native iOS/Android)
✗ System design expertise
```

---

## ΠΟΥ ΝΑ ΠΡΟΣΛΆΒΕΙΣ

### Option 1: Upwork (Best for Greece)
```
Keywords to search:
"Next.js PostgreSQL Vercel developer"
"Full-stack JavaScript TypeScript"

Look for:
├─ Greece-based (same timezone, no language issues)
├─ 4+ stars (proven track record)
├─ Portfolio with Next.js projects
└─ Available full-time for 4-6 weeks

Budget: €400-800/week
(€16-30/hour for Greek market is fair)
```

### Option 2: LinkedIn
```
Search: "Full Stack Developer Greece" + "Next.js"
Message: "Looking to hire for 4-week contract..."
Budget: Same as Upwork (€400-800/week)
```

### Option 3: Local Dev Community
```
Post in:
├─ Greek tech communities (Facebook groups)
├─ Slack/Discord servers
├─ Tech meetups (Athens)
└─ University CS departments (students)

You get: referrals (best quality)
```

---

## THE HIRING CALL (30-45 min)

### Questions to Ask

```
1. TECHNICAL
   Q: "Have you deployed a Next.js app to Vercel?"
   Good answer: "Yes, [specific example]"
   Bad answer: "No, but I can learn"

   Q: "Show me a real Next.js + PostgreSQL project"
   Good: GitHub link with commits (not just screenshots)
   Bad: "I'll build it for you first"

   Q: "How do you handle database migrations?"
   Good: "Prisma / SQL scripts / Vercel Postgres"
   Bad: "I'm not sure"

2. AVAILABILITY
   Q: "Can you commit 40 hours/week for 4 weeks?"
   Q: "What's your timezone?"
   Q: "Do you have other projects running?"

3. COMMUNICATION
   Q: "How do you report progress?"
   Q: "What's your preferred communication tool?"
   Good: "Daily updates via Slack, weekly calls"

4. EXPECTATIONS
   Q: "Have you worked on specs before?"
   Q: "Are you comfortable with code review?"
   Good: "Yes, I can iterate on feedback"
```

### Red Flags

```
❌ "I've never used PostgreSQL but I can figure it out"
❌ "I prefer to make architectural decisions"
❌ "I'll start and see how it goes"
❌ "I need €50+/hour for this kind of work"
❌ "I can't commit to daily standup"
❌ "I'll push directly to production"
```

### Green Flags

```
✅ "I've deployed 10+ Next.js apps"
✅ "Here's my GitHub with real projects"
✅ "I can follow specs and ask clarifying questions"
✅ "I'm comfortable with code review & iteration"
✅ "I'll report daily and sync weekly"
✅ "I always test locally before pushing"
```

---

## THE JOB POSTING (for Upwork/LinkedIn)

### Title
```
"Next.js + PostgreSQL Developer — SOPHIA Platform (4 weeks, MVP)"
```

### Description

```
## Project: SOPHIA Socratic Wisdom Platform

We're building a React-based chat application that uses Claude AI API 
to guide users through logical thinking. This is a 4-week contract to 
build the MVP.

## What You'll Build

A Next.js application with:
- Landing page + authentication (Clerk)
- Real-time dialogue system with Claude API
- PostgreSQL database for sessions
- Stripe integration for payments
- Responsive design (desktop + mobile)

## Tech Stack (Non-negotiable)
- Frontend: Next.js 15+ (must be recent)
- Database: PostgreSQL (with migrations)
- Hosting: Vercel (automatic deployment)
- Auth: Clerk
- AI: Anthropic Claude API
- Payments: Stripe

## Deliverables

**Week 1:** Project setup
- GitHub repo + Vercel configured
- Database migrations ready
- Environment variables set

**Week 2:** Core features  
- Homepage + auth flow
- Session creation + dialogue engine
- Chat UI with real-time messages

**Week 3:** Polish
- Error handling
- Mobile responsive
- Cost tracking

**Week 4:** Testing + launch
- QA + bug fixes
- Staging deployment
- Production deployment

## Expectations

- Daily 30-min updates (async Slack updates acceptable)
- Weekly 30-min sync call (timezone: UTC)
- Push code to GitHub daily
- All work in feature branches with PRs
- No pushing directly to main
- Clean, well-commented code

## Compensation

- €X/week (40 hours/week)
- Milestone-based: 25% Week 1, 25% Week 2, 25% Week 3, 25% Week 4
- Paid via Upwork (2% fee) or direct bank transfer

## How to Apply

1. Share your GitHub (with Next.js projects)
2. Answer: "What's your most recent Next.js + PostgreSQL project?"
3. Tell us your availability
4. We'll schedule a 30-min call

Only applicants with proven Next.js experience will be contacted.
```

---

## ONBOARDING (Day 1)

### What You Give Them (as Google Docs or GitHub)

```
1. SOPHIA_ARCHITECTURE.md
   → Explains the philosophical foundation
   → Shows the 3-layer system
   
2. SOPHIA_IMPLEMENTATION.md
   → Technical details
   → Database schema
   → API specifications
   
3. SOPHIA_VERCEL_DEPLOYMENT.md
   → How to set up Vercel
   → Git workflow
   
4. DEVELOPMENT.md (create this - see below)
   → Step-by-step instructions
   → Code examples
   → Testing approach
```

### Create: DEVELOPMENT.md

```markdown
# SOPHIA Development Guide

## Getting Started

### 1. Clone & Setup
```bash
git clone https://github.com/nikos/sophia.git
cd sophia
npm install
cp .env.example .env.local
```

### 2. Environment Variables
```
# .env.local
ANTHROPIC_API_KEY=sk-ant-... (from nikos)
DATABASE_URL=postgresql://... (from Vercel)
CLERK_SECRET_KEY=... (from Clerk)
STRIPE_SECRET_KEY=sk_... (from Stripe)
```

### 3. Database Setup
```bash
npm run db:migrate
npm run db:seed  # optional: test data
```

### 4. Run Locally
```bash
npm run dev
# → http://localhost:3000
```

## Architecture (Quick Summary)

User sends message → 3 Claude API calls:
1. Layer 1 (Haiku): "What did they say?"
2. Layer 2 (Haiku): "What's the gap?"
3. Layer 3 (Sonnet): "What question reveals it?"

Result: Save to DB + return to UI

## File Structure

```
src/
├─ app/
│  ├─ layout.tsx          ← Root layout (nav, styling)
│  ├─ page.tsx            ← Homepage
│  ├─ auth/               ← Clerk auth pages
│  ├─ session/[id]/       ← Chat page
│  └─ api/
│     ├─ session/new      ← Create session
│     ├─ dialogue         ← 3-layer logic
│     └─ insights/[id]    ← Get insights
├─ lib/
│  ├─ db.ts               ← PostgreSQL client
│  ├─ claude.ts           ← API calls
│  └─ prompts/            ← Layer 1, 2, 3
└─ components/
   ├─ ChatWindow.tsx      ← Main chat UI
   ├─ MessageList.tsx     ← Message display
   └─ InputForm.tsx       ← User input
```

## Key Files to Understand First

1. `src/lib/claude.ts`
   - How we call Claude
   - The 3-layer orchestration

2. `src/app/api/dialogue/route.ts`
   - Receives user message
   - Calls all 3 layers
   - Saves to DB
   - Returns question

3. `src/app/session/[id]/page.tsx`
   - Chat UI component
   - Calls /api/dialogue
   - Shows messages

## API Contracts (Must Follow Exactly)

### POST /api/session/new
```javascript
// Request
{
  userId: "clerk_user_id",
  topic: "startup|leadership|decision|other"
}

// Response
{
  sessionId: "uuid-...",
  greeting: "Hello! What would you like to explore?"
}

// Errors
{
  error: "User not authenticated",
  status: 401
}
```

### POST /api/dialogue
```javascript
// Request
{
  sessionId: "uuid-...",
  userMessage: "I want to build a startup..."
}

// Response
{
  sessionId: "uuid-...",
  round: 1,
  sophiaQuestion: "When you say...",
  thinking: "Contradiction found...",
  metadata: {
    tokensUsed: 450,
    costUsd: 0.015
  }
}

// Error
{
  error: "Session not found",
  status: 404
}
```

### GET /api/insights/[sessionId]
```javascript
// Response
{
  sessionId: "uuid-...",
  completedRounds: 5,
  keyInsights: ["insight1", "insight2"],
  maturityLevel: "discovery",
  nextFocus: "Validate with users",
  estimatedCost: 0.075
}
```

## Database Schema (PostgreSQL)

```sql
-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL,
  topic VARCHAR,
  status VARCHAR DEFAULT 'active',
  key_insights JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Dialogues
CREATE TABLE dialogues (
  id SERIAL PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  round INT,
  user_message TEXT,
  sophia_question TEXT,
  sophia_thinking TEXT,
  tokens_used INT,
  cost_usd DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_dialogues_session_id ON dialogues(session_id);
```

## Deploying to Vercel

### First Deployment (Staging)
```bash
# On a feature branch
git push origin feature/setup

# Goes to: staging.sophia.vercel.app (preview)
# Check it, then create PR
```

### Production Deployment
```bash
# After PR approval, merge to main
git merge feature/setup
git push origin main

# Automatically deploys to sophia.vercel.app
# Takes ~2 minutes
# Check Vercel dashboard for status
```

## Testing Locally

### Test the 3-layer logic
```bash
# Create a session manually
curl -X POST http://localhost:3000/api/session/new \
  -H "Content-Type: application/json" \
  -d '{"userId": "test-user", "topic": "startup"}'

# Should get back: { sessionId: "uuid-...", greeting: "..." }

# Then dialogue
curl -X POST http://localhost:3000/api/dialogue \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "uuid-...",
    "userMessage": "I want to make a SaaS"
  }'

# Should get: { sophiaQuestion: "When you say...", ... }
```

## Common Issues & Solutions

### Issue: "DATABASE_URL is undefined"
**Solution:** Check .env.local file
```bash
# Should have:
DATABASE_URL=postgresql://user:pass@host/db
# Not empty
```

### Issue: "ANTHROPIC_API_KEY not found"
**Solution:** Get from nikos, add to .env.local
```
ANTHROPIC_API_KEY=sk-ant-...
```

### Issue: "Cannot find module '@clerk/nextjs'"
**Solution:**
```bash
npm install @clerk/nextjs
```

### Issue: Vercel deployment fails
**Solution:**
1. Check build logs in Vercel dashboard
2. Common causes:
   - Missing env var in Vercel (not .env.local)
   - TypeScript error
   - Database migration failed
3. Rollback: Vercel → Deployments → Rollback

## Code Standards

```
1. Every API route must have error handling
   try {
     // code
   } catch (error) {
     console.error(error);
     return NextResponse.json({ error: error.message }, { status: 500 });
   }

2. Database queries must use prepared statements (no SQL injection)
   ✓ db.query('SELECT * FROM sessions WHERE id = $1', [id])
   ✗ db.query(`SELECT * FROM sessions WHERE id = ${id}`)

3. Commit messages must be clear
   ✓ "feat: add dialogue engine core logic"
   ✓ "fix: handle missing session error"
   ✗ "updates" or "fix"

4. Create PRs with description
   - What changed
   - Why
   - How to test
```

## Daily Workflow

```
9am (UTC): Check messages from Nikos
10am: Work on assigned feature
12pm: Quick checkpoint (what's done, what's blocked)
3pm: Code review (if PRs waiting)
5pm: Update progress in Slack
   "Completed X, working on Y, blocker Z"
```

## Definition of Done (for each feature)

- [ ] Code written
- [ ] Tested locally
- [ ] Pushed to feature branch
- [ ] PR created with description
- [ ] PR reviewed (Nikos or automated)
- [ ] PR approved
- [ ] Merged to main
- [ ] Verified on staging (vercel preview)

## Resources

- Next.js docs: https://nextjs.org/docs
- PostgreSQL: https://www.postgresql.org/docs/
- Clerk: https://clerk.com/docs
- Claude API: https://docs.anthropic.com
- Vercel: https://vercel.com/docs

## Emergency Contacts

- Blocker: Slack → nikos
- Database issue: Vercel dashboard
- API error: Check Vercel logs
- Code review: Create PR with details
```

---

## THE CONTRACT (Simple)

### What to include in agreement:

```
PROJECT AGREEMENT - SOPHIA

PARTIES:
- Client: Nikos (you)
- Developer: [Name]

SCOPE:
Build a Next.js application (SOPHIA) following specifications in:
- SOPHIA_ARCHITECTURE.md
- SOPHIA_IMPLEMENTATION.md
- SOPHIA_VERCEL_DEPLOYMENT.md

DELIVERABLES:
Week 1: GitHub repo + Vercel setup + DB ready
Week 2: Homepage + auth + dialogue engine + chat UI
Week 3: Polish (error handling, mobile, analytics)
Week 4: Testing + staging + production deployment

TIMELINE:
Start: [Date]
End: [4 weeks later]
Hours: 40 hours/week

COMPENSATION:
Total: €X
Payment schedule:
- 25% upon Week 1 completion (Friday)
- 25% upon Week 2 completion (Friday)
- 25% upon Week 3 completion (Friday)
- 25% upon Week 4 completion (Friday)

COMMUNICATION:
- Daily async updates (Slack)
- Weekly 30-min sync (Zoom/Meet)

CODE OWNERSHIP:
- All code written belongs to [Client]
- GitHub repo is [Client's]
- Developer retains right to show project in portfolio

TERMS:
- Non-compete: No similar projects for 6 months
- Confidentiality: Keep project details private
- Termination: Either party can terminate with 1 week notice
  (payment prorated)

APPROVED BY:
[Signatures]
[Date]
```

---

## PAYMENT SETUP

### Upwork
```
1. Create milestone-based contract
   - Milestone 1 (Week 1): 25% of total
   - Milestone 2 (Week 2): 25% of total
   - Milestone 3 (Week 3): 25% of total
   - Milestone 4 (Week 4): 25% of total

2. Release payment when:
   - Code pushed to GitHub
   - Feature works locally & on staging
   - You've tested it
```

### Direct Bank Transfer
```
1. Get IBAN from developer
2. Use your bank (TransferWise for international)
3. Schedule 4 payments (weekly)
4. Verify code was delivered before releasing
```

---

## RED FLAGS AFTER HIRING

```
❌ "I don't use version control, I'll send you files"
   → Ask them to start using GitHub immediately

❌ "I'll send you the code when it's 100% done"
   → Require daily commits

❌ "I don't test locally before pushing"
   → Mandate testing checklist

❌ "I don't understand the 3-layer system"
   → Schedule a sync to explain

❌ "The code doesn't match specs"
   → Send detailed feedback, ask for revisions

❌ "I'm too busy for daily updates"
   → This is a red flag for delivery
```

---

## SUCCESS CRITERIA

### At the end of Week 4, check:

```
✓ GitHub repo has daily commits (40+ commits)
✓ All PRs have descriptions & were reviewed
✓ sophia.vercel.app is live & working
✓ You can:
  - Sign up
  - Create a session
  - Ask a question
  - Get a Sophia response
  - See all messages saved
  - View insights
✓ Code is readable & has comments
✓ Database is set up correctly
✓ Environment variables are secure (no secrets in git)
✓ Error handling works (try broken flows)
```

---

## TL;DR FOR HIRING

```
1. Find developer: Upwork + Next.js + PostgreSQL filter
2. Interview: "Show me 2 recent Next.js projects"
3. Offer: "€X/week, 4 weeks, milestone-based payment"
4. Onboard: Send this DEVELOPMENT.md + the 3 architecture docs
5. Manage: Daily slack updates + weekly syncs
6. Deploy: They push to main → Vercel auto-deploys
7. Launch: sophia.vercel.app live
```

Done. Now you can hire with confidence.
```

---

**Last thing:** Send this entire package to the developer on **Day 1 of employment**. They'll onboard much faster.
