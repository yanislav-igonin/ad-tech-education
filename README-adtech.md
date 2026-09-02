# AdTech Education Materials

This directory contains the reusable prompts and course specification for a compact, end-to-end AdTech education guide.

The course assumes **zero AdTech knowledge** and **high software-engineering fluency**. It explains business and industry concepts from first principles while treating HTTP, APIs, JSON, SQL, queues, databases, distributed systems, cookies, browser APIs, and backend engineering as familiar.

## Files

- `master-prompt.md` — the Russian-language zero/master prompt: audience, learning goals, writing rules, source-of-truth TOC, continuity rules, and chapter workflow.
- `planner-researcher.md` — English prompt for research and instructional planning.
- `author.md` — English prompt for writing one finished chapter.
- `auditor.md` — English prompt for independent coverage, accuracy, scope, and density review.
- `translator.md` — English prompt for producing a strict English translation of one finished chapter or the shared glossary.
- `translation-auditor.md` — English prompt for independently auditing a finished English translation against its Russian source (completeness, structure parity, anchor stability, terminology).
- `README-adtech.md` — this index. The pre-existing generic `README.md` is intentionally left untouched.

Role prompts are English for easier agent configuration. Their generated artifacts are Russian by contract: plans, research notes, chapters, audits, and editorial outputs. English translation is a separate later pipeline.

## Content layout

Recommended storage layout:

```text
chapters/
  ru/01-what-is-adtech.md
  en/01-what-is-adtech.md
plans/
  ru/01-what-is-adtech.plan.md
audits/
  ru/01-what-is-adtech.audit.md
```

Every chapter starts with YAML front matter:

```yaml
---
id: ch-01
type: chapter
part: I
chapter: 1
slug: what-is-adtech
title: "Что такое AdTech и зачем он существует"
language: ru
status: draft
toc_requirements: ["1.1", "1.2"]
prerequisites: []
---
```

The Russian and English files keep the same stable `id` and TOC requirements. Never overwrite the Russian source during translation.

## Orchestration flow

```text
User requests Chapter N
        ↓
Planner / Researcher
        ↓  approved brief + coverage matrix
Author
        ↓  finished draft
Independent Auditor
        ↓
PASS ───────────────→ publish chapter
        │
        └─ REVISION REQUIRED → Final Editor → repeat audit
```

The Planner, Author, Auditor, and Editor are independent roles:

- Planner defines scope and coverage; it does not write polished prose.
- Author writes the chapter from the approved brief; it does not redefine the curriculum.
- Auditor looks for omissions and errors; it does not rewrite the chapter.
- Editor fixes the audited draft; it does not expand the course into an encyclopedia.

## Standard command behavior

- `Глава N` — run the complete pipeline.
- `Глава N — только план` — run Planner only.
- `Глава N — подробно` — keep scope, add technical depth and examples.
- `Глава N — коротко` — cover every TOC requirement as compactly as possible.
- `Проверь эту главу по оглавлению` — run the Auditor on supplied text.
- `Следующая глава` — generate the chapter after the latest completed one.
- `Что осталось` — show completed chapters, next chapter, and remaining course sections.

## Course design

The central sequence is:

```text
market → campaign → programmatic → tracking → attribution → MMP
→ analytics → fraud/privacy → engineering → products/business
```

The recurring case is a subscription mobile app: a user sees an ad on a publisher property, clicks, installs the app, and later buys a subscription. Reuse it when it clarifies the topic, but do not force it where another example is better.

The main course is intentionally bounded. Deep ML bidding, advanced auction theory, full MMM mathematics, Privacy Sandbox internals, PET cryptography, browser-engine internals, and other specialist topics belong in a future **AdTech Advanced** track.

## EPUB / Kindle path

Install Pandoc once on macOS:

```bash
brew install pandoc
```

Then build the current Russian EPUB with:

```bash
make epub
```

The Makefile passes both chapter files to Pandoc in explicit order. Each file's top-level `#` heading becomes a separate EPUB chapter, and `--toc` creates clickable navigation to chapters and their headings. Keep chapter ordering explicit; filesystem order alone should not define the book. Keep `# Источники и дополнительное чтение` as a `##` heading inside each chapter so it is not split into a separate EPUB chapter.

Recommended build inputs later:

```text
book.ru.yaml
chapters/ru/01-what-is-adtech.md
chapters/ru/02-adtech-ecosystem-participants.md
...
```

The generated `.epub` can then be transferred to Kindle using the normal Kindle document delivery workflow. Before final conversion, validate headings, links, code blocks, images, non-Latin fonts, cover, table of contents, metadata, and right-to-left or special-character edge cases if present.
