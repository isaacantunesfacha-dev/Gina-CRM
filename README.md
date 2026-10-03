<p align="center">
  <a href="https://isaacantunesfacha-dev.github.io/gina-crm/">
    <img src="docs/cover.jpg" alt="Lifecycle CRM told by Gina: a green @ mascot beside email, newsletter, push, SMS and story pieces" width="100%">
  </a>
</p>

<h1 align="center">Gina · CRM Strategy</h1>

<p align="center">
  <b>Small businesses don't grow by chasing new customers every morning.<br>They grow when the ones who already came come back.</b>
</p>

<p align="center">
  <a href="https://isaacantunesfacha-dev.github.io/gina-crm/"><b>Open the site</b></a>
  &nbsp;·&nbsp;
  <a href="https://isaacantunesfacha-dev.github.io/gina-crm/demo/"><b>Try the demo</b></a>
  &nbsp;·&nbsp;
  <a href="https://isaacantunesfacha-dev.github.io/gina-crm/pt/">Versão em português</a>
  &nbsp;·&nbsp;
  <a href="https://www.linkedin.com/in/isaacnandes/">LinkedIn</a>
</p>

---

## The story

I spent years running operations and strategy for small businesses. CRM was always the thing that could help—and the thing nobody wanted to open. So I built Gina as a way to explain it: a character who walks the customer journey, asks one specific question per channel, and hands back one clear decision at a time.

The pattern works. The businesses in the examples change with each client. The method doesn't.

---

## What's real, what's concept

| | What it is |
|---|---|
| **The method** | A five-step lifecycle CRM approach, tested with real clients at SBT and Brasil Futebol Expo. Proven to reduce churn and increase repeat purchases. |
| **The demo** | Real working code in your browser: 36 tests, deterministic rules, no AI, nothing stored or sent. Shows how the method actually reads data. |
| **The site's examples** | Fictional bakery (Forno da Vila) used to illustrate the method, not to show real results. The numbers demonstrate how the system works, not what to expect. |
| **The team roles (@)** | A proposal for how this scales in an organization. Today, only the demo's decision rules run. |
| **Consulting work** | Real impact: organized scattered data into actionable segments, mapped churn triggers, built win-back journeys. Results on [LinkedIn](https://www.linkedin.com/in/isaacnandes/). |

---

## The problem that makes CRMs get abandoned

I've seen this pattern everywhere:

**1. Stages nobody agreed on**  
Marketing calls it a lead. Sales calls it a contact. The owner calls it "that lady from Tuesday." When three departments can't read the same report, people stop opening them.

**2. Data with no owner**  
Duplicates pile up. Critical fields stay blank. The real conversations happen on WhatsApp, outside the system. The CRM ends up knowing less than the person at the counter.

**3. Automation before the process**  
Someone builds a drip campaign on an undefined funnel. The right message goes to the right person at the right time—but it's the wrong message. Now customers ignore you on schedule.

---

## The solution: model first, build second, automate last

### 1. Diagnose
Audit every data source, field, and duplicate. Map where deals stall and where customers disappear.  
**Deliverable:** CRM health report with the three changes that matter most.

### 2. Model
Define each stage by the event that moves a customer into it, not by how many days have passed. One owner and one entry rule per stage.  
**Deliverable:** Lifecycle map and data dictionary both teams agree on.

### 3. Build
Configure records, associations, and one view per role. Nobody has to filter to find their own work.  
**Deliverable:** A clean system people actually open.

### 4. Orchestrate
Build event-triggered journeys for onboarding, follow-up, and win-back. Before any message goes live, check it against motivation, effort, and timing.  
**Deliverable:** Documented journey library with clear goals and exits.

### 5. Measure
One dashboard per question. Monthly review with leadership: every journey earns its place or gets switched off.  
**Deliverable:** Operating dashboard with metrics defined before the first report.

---

## How the method reads a customer

Gina walks five channels. Each one answers one question. No channel repeats another's job. Every answer goes back into the same customer profile:

| Channel | When | What Gina learns | Principle |
|---|---|---|---|
| **Email** | Day 0–14 | What they open, what they click, which categories pull them back | Test: three useful emails before one big offer |
| **Newsletter** | Every 2 weeks | Which topics generate clicks, which links they open | Reciprocity: give something useful first |
| **Push** | On behavior | The hour they act, how many nudges they tolerate | Notification budget: two a week, cut on first dismissal |
| **SMS** | Urgent only | Whether they need one more push to complete a purchase | Loss aversion: "your order holds until 6pm" |
| **In-story** | New products | How they react before something launches | Social proof: real customers, not ads |

The result: a profile that actually moves the needle.

---

## The win-back journey: written like a contract

When a regular customer misses their own usual repurchase date:

**High value (buys often)?**
- Task: Personal WhatsApp within 48 hours. Real person, by name, no template.
- If no reply: Owner calls and logs the outcome.
- If reply: Back to active, exit the journey.

**Standard?**
- Email 1: "We saved your usual." Their own history, ready to reorder in one tap.
- Wait 5 days.
- Email 2: One offer, one deadline, one button.
- If they buy: Back to active, exit.

**If silent for 21+ days:**  
Mark dormant and leave alone for 90 days. Fewer messages keep the list warm.

---

## What breaks in real life (and how to fix it)

1. **Eight stages is too much for one person**  
   Solo owners need four: New → Talking → Bought → Came back.

2. **Ninety days is too long to prove it works**  
   Small business owners decide in week one. Motivation evaporates.  
   Fix: Ship one visible win by day seven (a list of customers to call back).

3. **Assumes a paid CRM**  
   Many of these businesses run on WhatsApp and a notebook. A monthly subscription is a real cost and a real reason to quit.  
   Fix: Start in a spreadsheet. Migrate only when the sheet starts to hurt.

4. **Percentages lie at low volume**  
   With 40 customers, one sale moves your conversion rate by several points and the dashboard tells a story that isn't true.  
   Fix: Report names and counts until volume justifies rates.

5. **Treats WhatsApp as a channel when it's the database**  
   For small businesses, WhatsApp is the CRM. Everything else is a copy.  
   Fix: Design the model around the conversation, not a form.

6. **Depends on the consultant to keep running**  
   If the playbook needs me every month, it failed at the one thing it was built for.  
   Fix: Hand over a 15-minute weekly ritual the owner can run alone.

---

## Gina Zero: the same method, free tools, no budget

For businesses that can't pay yet:

- **CRM:** Google Sheets (four tabs: Contacts, Conversations, Orders, This Week)
- **Brain:** Free LLM tier (Grok, Gemini, or open models on Groq)
- **Channel:** Telegram or WhatsApp Business API
- **Glue:** Apps Script or n8n (free triggers that log chats and flag missed dates)
- **Report:** One message a week (who to call, who went quiet, what sold)

**Timeline:** Four weeks.  
Week 1: Copy template, add customers.  
Week 2: Connect the bot.  
Week 3: Turn on the missed-date flag.  
Week 4: First weekly report.

---

## Built with

**Plain HTML, CSS, and JavaScript. No framework, no dependencies, no tracking.**

The site works entirely on the client:
- Hero starts as a still image. After page load, a silent video replaces it and removes the background frame by frame on canvas. Phones get an optimized 85 KB version (desktop: 795 KB). With reduced motion or no JavaScript, the still image stays.
- Journey animation only runs while visible on screen.
- Reduced motion shows the finished journey. Without JavaScript, everything still reads.
- English and Portuguese are separate, not translated.

**The demo:**
- 36 unit tests (run: `node --test`)
- Deterministic logic: reads CSV, scores RFV (Recency, Frequency, Value), flags missed dates, picks the next action
- No external calls. All data stays in your browser.

### Project structure

```
index.html, pt/index.html         Generated site pages
css/styles.css                    Design tokens and components
js/keyed-video.js                 Hero video with background removed on canvas
js/journey.js                     5-channel journey animation
js/nav.js                         Section highlighting
js/gina.js                        The method as executable code
js/demo.js                        Demo interface
js/ref.js                         UTM tracking: ?ref=behance|linkedin|post|cv
demo/, pt/demo/                   Generated demo pages
404.html                          Generated 404 page
assets/                           Gina illustrations, walk frames, hero video
src/content/                      All copy, one file per language
src/site.mjs                      URLs and legal text
src/markup.mjs                    Shared HTML pieces
build.mjs                         Generator script (renders HTML from src/)
tests/                            Rules engine unit tests
docs/                             README images
```

### To build and test locally

**Build the site:**
```bash
node build.mjs
```

**Run tests:**
```bash
node --test
```

**Preview:**
```bash
python3 -m http.server
# Then open localhost:8000
```

---

## Work with me

I help small businesses reshape their CRM strategy and get the first journeys live on the tool they already use.

**Start with a 30-minute diagnosis.** You leave with the three changes I'd make first, whether we work together or not.

[iantunessp@gmail.com](mailto:iantunessp@gmail.com?subject=CRM%20diagnosis%20-%20Gina)

---

## License & transparency

© 2026 Isaac Antunes. All rights reserved: Gina's name, character, illustrations, the method, copy, design, and code. See [LICENSE](LICENSE).

**Gina is a concept project and a working demo.** The businesses, customers, and numbers in the examples are fictional—they show how the method reads data, not real results.
