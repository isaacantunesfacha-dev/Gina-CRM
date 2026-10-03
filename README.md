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
</p>

---

## The idea

I spent years running operations and strategy for small businesses. CRM was always the thing that could help—and the thing nobody wanted to open. So I built Gina to explain it differently: a model where the business walks the customer journey, asks one question per channel, and gets one clear decision at a time.

The pattern works. The examples are fictional. The method is real.

---

## What's real and what's concept

| | Status |
|---|---|
| **The method** | A five-step lifecycle CRM approach, tested with real clients. Proven to reduce churn and surface win-back opportunities. |
| **The demo** | Live, working code in your browser. 36 tests, deterministic rules, no AI, nothing stored or sent. |
| **The examples** | Fictional bakery (Forno da Vila) used to illustrate how the method reads data. Not real results. |
| **My consulting work** | Real impact: organized scattered data into actionable segments, mapped churn triggers, built operationalized journeys. Described on [LinkedIn](https://www.linkedin.com/in/isaacnandes/). |

---

## The problem

Most CRMs get abandoned for three reasons:

**Stages nobody agreed on.**  
Marketing calls it a lead. Sales calls it a contact. The owner calls it "that lady from Tuesday." When three departments read different things in the same report, people stop opening them.

**Data with no owner.**  
Duplicates pile up. Critical fields stay blank. The real conversations happen on WhatsApp, outside the system. The CRM ends up knowing less than the person at the counter.

**Automation before the process.**  
Someone builds a drip campaign on an undefined funnel. The message reaches the right person at the right time—but it's the wrong message. Now customers ignore you on schedule.

---

## The method

### 1. Diagnose
Audit every source, field, and duplicate. Map where deals stall and where customers disappear.

### 2. Model
Define each stage by the event that moves a customer into it, not by days passed. One owner, one entry rule per stage.

### 3. Build
Configure records, associations, and one view per role. Nobody has to filter to find their own work.

### 4. Orchestrate
Build event-triggered journeys for onboarding, follow-up, and win-back. Check every message against motivation, effort, and timing before it goes live.

### 5. Measure
One dashboard per question. Monthly review: every journey earns its place or gets switched off.

---

## How Gina reads a customer

Gina walks five channels. Each answers one question about the customer. No channel repeats another's job. Every answer feeds the same profile:

| Channel | When | What Gina learns |
|---|---|---|
| **Email** | Day 0–14 | What they open, what they click, which categories pull them back |
| **Newsletter** | Every 2 weeks | Which topics generate clicks, which links they follow |
| **Push** | On behavior | The hour they act, how many nudges they tolerate |
| **SMS** | Urgent only | Whether they need one final push to complete a purchase |
| **In-story** | New products | How they react before something launches |

The result: a profile that actually predicts behavior.

---

## The win-back journey

When a regular customer misses their own usual repurchase date:

**High value (buys often)?**
- Personal WhatsApp within 48 hours. Real person, by name, no template.
- If no reply: Owner calls and logs the outcome.

**Standard?**
- Email 1: "We saved your usual." Their own history, ready to reorder in one tap.
- Email 2: One offer, one deadline, one button.

**If silent for 21+ days:**  
Mark dormant and leave alone for 90 days.

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
- Deterministic logic: reads CSV, scores RFV, flags missed dates, recommends next action
- All data stays in your browser

### Project structure

```
index.html, pt/index.html         Generated pages
css/styles.css                    Design system
js/keyed-video.js                 Canvas video processing
js/journey.js                     Animation
js/nav.js                         Navigation
js/gina.js                        The method as code
js/demo.js                        Demo interface
js/ref.js                         UTM tracking
demo/, pt/demo/                   Generated demo pages
src/                              Source files (generates HTML)
build.mjs                         Build script
tests/                            Unit tests
assets/                           Images and video
```

### To build locally

```bash
node build.mjs          # Render pages from src/
node --test             # Run tests
python3 -m http.server  # Preview at localhost:8000
```

---

## Work with me

I help small businesses reshape their CRM strategy and get the first journeys live.

**Start with a 30-minute diagnosis.** You leave with the three changes I'd make first.

[iantunessp@gmail.com](mailto:iantunessp@gmail.com?subject=CRM%20diagnosis%20-%20Gina)

---

## License

© 2026 Isaac Antunes. All rights reserved: Gina's name, character, illustrations, the method, copy, design, and code.

Concept project. Forno da Vila is fictional.
