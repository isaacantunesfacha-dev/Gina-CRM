# Gina · CRM Strategy

Small businesses don't grow by chasing new customers every morning. They grow when the ones who already came come back.

Gina is a concept project and a working demo that explores lifecycle CRM as a practical operating model for small businesses. It shows the method, the logic, and the code—intentionally transparent about what's real and what's illustrative.

**Live:** https://isaacantunesfacha-dev.github.io/gina-crm/  
**Try the demo:** https://isaacantunesfacha-dev.github.io/gina-crm/demo/

---

## Why this exists

Most CRMs fail because the process is unclear before the software is picked. The usual problems:

- **Stages nobody agreed on** — Marketing calls it a lead, sales calls it a contact, the owner calls it "that lady from Tuesday." When three departments read different things in the same report, people stop opening them.

- **Data with no owner** — Duplicates pile up, critical fields stay blank, and the real conversations happen on WhatsApp outside the system. The CRM ends up knowing less than the person at the counter.

- **Automation before the process** — Someone builds a drip campaign on an undefined funnel. The message reaches the right person at the right time, but it's the wrong message. Now customers ignore you on schedule.

Gina turns that into a simple model: **diagnose, model, build, orchestrate, measure**.

---

## What's real and what's concept

| | Status |
|---|---|
| **The method** | Real operating model tested with clients. Proven to reduce churn and surface win-back opportunities. |
| **The demo** | Real working code in the browser: 36 tests, deterministic rules, no AI, nothing sent or stored. |
| **The examples** | Fictional bakery used to illustrate how the method reads data. Not real results. |
| **The roles** | Conceptual proposal for how the method scales in a team. Not a live product yet. |
| **My consulting work** | Real impact: organized scattered data into actionable segments, mapped churn triggers, built operationalized journeys. Results on [LinkedIn](https://www.linkedin.com/in/isaacnandes/). |

This project is intentionally transparent: it shows the method, the demo, and the reasoning without pretending the fictional examples are commercial outcomes.

---

## The five-step method

### 1. Diagnose
Audit every source, field, and duplicate. Map where deals stall and where customers disappear.

### 2. Model
Define each lifecycle stage by the event that moves a customer into it. One owner, one entry rule, one outcome.

### 3. Build
Clean the data and make the system usable. No automation before the model is clear.

### 4. Orchestrate
Trigger actions based on customer behavior: onboarding, follow-up, and win-back.

### 5. Measure
Track the few metrics that matter. Remove what doesn't earn its place.

---

## How Gina reads a customer

Gina walks five channels. Each answers one question. Every answer feeds the same profile:

| Channel | When | What Gina learns |
|---|---|---|
| Email | Day 0–14 | What they open, what they click, which categories pull them back |
| Newsletter | Every 2 weeks | Which topics they respond to, which links they follow |
| Push | On behavior | When they act, how many nudges they tolerate |
| SMS | Urgent only | Whether they need one final push to complete a purchase |
| In-story | New products | How they react before a product launches |

The result: a profile that predicts behavior. Not a guess.

---

## Built with

Plain HTML, CSS, and JavaScript. No framework, no dependencies, no tracking.

**The site:**
- Hero video removes its background frame-by-frame on canvas after page load (optimized for mobile)
- Journey animation runs only while visible
- Reduced motion preserves readability
- Works without JavaScript
- English and Portuguese are separate, not translated

**The demo:**
- 36 unit tests (`node --test`)
- Deterministic logic: reads customer history, scores RFV, flags missed dates, recommends next action
- All data stays in your browser

**To build locally:**

```bash
node build.mjs          # Render pages from src/
node --test             # Run tests
python3 -m http.server  # Preview at localhost:8000
```

---

## Work with me

I help small businesses turn CRM from a cluttered system into a clear operating model.

**Start with a 30-minute diagnosis.** You leave with the three changes I'd make first.

Email: iantunessp@gmail.com  
LinkedIn: https://www.linkedin.com/in/isaacnandes/

---

## License

© 2026 Isaac Antunes. All rights reserved: Gina's name, character, illustrations, the method, copy, design, and code.

Concept project. Forno da Vila is fictional.
