# Резюме аудита

Полный draft прочитан bounded reads по строкам 1–90, 91–180, 181–270 и 271–358; Planner Brief — по строкам 1–100, 101–200 и 201–291; source-of-truth requirements 4.1–4.15 — в `master-prompt.md`. Все 15 mandatory requirements раскрыты по существу. Центральная модель последовательно разделяет contractual pricing, billable event/amount, optimization, participant ledgers, accounting presentation и settlement. Арифметика `$100 → $80 → $68` и все доли согласованы.

Metadata корректна: `id: ch-04`, `chapter: 4`, стабильный slug, `language: ru`, prerequisites 1–3 и полный список `toc_requirements` 4.1–4.15. Source непрерывен, literal tool footers отсутствуют, последняя строка — источник 7 CMA. Блокеров и важных проблем нет.

# Блокеры

None.

# Важные проблемы

None.

# Необязательные улучшения

1. В разделе «Одна сделка, разные ledgers и моменты времени» схема говорит: `accrued → qualifying events сверены`. Для данного walkthrough это согласовано с assumption «amounts accrued после reconciliation», поэтому ошибки в текущем сценарии нет. Чтобы формулировку не приняли за универсальное accounting rule, можно уточнить: accrual иногда создаётся оценочно до final reconciliation, а reconciliation затем подтверждает или корректирует сумму. Это низкорисковое уточнение; различие accrued/billed/settled уже объяснено правильно.

# Проверка корректности

- Pricing contract, optimization target, bid и realised metric разведены явно. Раздел «Billing, optimization и realised metric — разные объекты» показывает `target CPA` при CPC billing и observed CPM/CPC/CPA после периода; UI label не выдан за доказательство payment basis.
- CPM, CPC и CPA/CPI/CPL описаны как разные risk boundaries. Для outcome-моделей отдельно названы action/install/lead, attribution/validation owner, rejection/duplicate rules, риск payee до deeper-funnel event и сохраняющийся у advertiser quality/LTV risk.
- Revenue share использует named SSP-boundary proceeds `$80`; 15% удержания равны `$12`, publisher share 85% — `$68`. Текст прямо запрещает переносить 15% на исходные `$100` и отличает transaction-base `gross proceeds` от accounting `gross revenue`.
- Markup и take rate используют правильные denominators: `$20 / $80 = 25%` markup на acquisition cost; `$20 / $100 = 20%` network take; `$12 / $80 = 15%` SSP-boundary take; `$12 / $100 = 12%` share исходного spend; `$32 / $100 = 32%`; `$68 / $100 = 68%`. Проверка `$20 + $12 + $68 = $100` верна.
- Spend, media cost и payout не смешаны: advertiser ledger содержит `$100`, network downstream media cost — `$80`, SSP payable и publisher receivable — `$68`. Retained `$20`/`$12` не назван автоматически revenue, gross profit или cash.
- Event/data flow отделён от invoice и cash flow. Текст различает accrued, billed и settled, показывает receivable/payable до cash и предупреждает, что invoice owner, operational payment path и accounting presentation могут различаться.
- Principal-agent изложен корректно: сначала specified good/service и control before transfer, затем indicators `primary responsibility`, `inventory risk`, `pricing discretion` как evidence, а не score. Gross/net presentation не сведена к «до/после расходов» и не выводится из invoice.
- Формулы `gross profit = recognized revenue − cost of revenue` и `gross margin = gross profit / recognized revenue` используют одну reporting entity и basis. Иллюстрации 20% и 100% механически верны; 100% явно ограничены отсутствием прочих показанных CoR и не выданы за benchmark, прогноз или бесплатную platform.
- Arbitrage определён нейтрально: buy/sell spread либо basis mismatch, а не любой fee. Указаны inventory/volume, performance и reconciliation risk, возможность loss, полезная функция intermediary и отдельная проблема opacity.
- Primary-source check подтверждает material model: IAB Tech Lab определяет `Billable Event` и требует transaction ledger; OpenRTB различает `nurl` и `burl`, запрещает считать win notice billable/tracked event и оставляет billing criteria business policy; Google Ads docs дают product-specific coexistence conversion optimization с charging по clicks/engaged views; IFRS 15 staff paper и FASB materials подтверждают control-based principal-agent model и gross/net presentation; FASB taxonomy guide подтверждает gross profit как разницу revenue и cost of revenue.
- Magnite 2025 disclosures подтверждают percentage-of-spend, fixed CPM, fixed monthly fees и различие net platform transactions/gross insertion-order campaigns; The Trade Desk disclosures подтверждают percentage-of-platform-spend fee, Supplier Components, net agent presentation и большие receivables/payables относительно revenue. Exact annual-note passages не были независимо извлечены из bounded web capture для обеих 10-K, поэтому annual-form specificity опирается также на датированные planner extracts и согласующиеся официальные filings того же периода. Противоречий не найдено; глава корректно ограничивает примеры одной company/policy/period.
- CMA source корректно маркирован historical: UK open display, research date 2020. Глава использует только определение buy-low/sell-higher и transparency concern, не переносит диапазоны fees в 2026 и не выдаёт их за market benchmark.

# Проверка границ и плотности

Continuity с главой 3 выдержана: знакомые CPM/CPC/CPA/CPI/CPL используются как vocabulary, а глава 4 меняет вопрос с вычисления metric на contract, risk и ledger boundary. Небольшие `$100` calculations нужны для новой economics model и не дублируют measurement chapter.

Границы соседних тем соблюдены: campaign objective/optimization setup оставлены главе 5; affiliate offers, postbacks и traffic arbitrage end-to-end — главе 9; publisher yield — главе 10; inventory sale types — главе 14; полное сравнение DSP/SSP/exchange/network и общий data/money flow — главе 16; reporting pipelines и discrepancy reconciliation — главам 31–32; billing-grade schemas и correction infrastructure — главе 48. Advanced accounting, taxes/FX mechanics, netting, payment rails и settlement infrastructure не требуются и не добавлены.

Основной walkthrough переиспользуется для ledgers, denominators, gross/net и settlement, поэтому не создаёт несколько конфликтующих примеров. Разделы «С чем это часто путают» и «Что важно запомнить» повторяют только ключевые distinctions с разными педагогическими функциями; существенного filler или scope leakage нет.

# Coverage Table

| Requirement | Status | Evidence / Explanation |
|---|---|---|
| 4.1 | ✅ COVERED | Раздел «CPM, CPC и outcome pricing» определяет CPM как договор за named qualifying impression basis, требует выбрать `served`/`rendered`/`viewable`, показывает seller charge boundary и post-impression risk advertiser; отдельный раздел отделяет contract CPM от bid, target и observed CPM. |
| 4.2 | ✅ COVERED | Та же таблица задаёт CPC через qualifying click, click point, user initiation, deduplication и invalid-click filters; prose распределяет impression-to-click risk на payee, а post-click quality/conversion risk — на advertiser и отделяет billing от realised/target metric. |
| 4.3 | ✅ COVERED | CPA, CPI и CPL имеют отдельные строки с action/install/lead events, attribution/validation owner, approval/reinstall/duplicate/rejection rules и рисками обеих сторон; альтернативные расчёты `$100` показывают разные funnel boundaries, а не одно упоминание семейства. |
| 4.4 | ✅ COVERED | Подраздел «Revenue share: процент без базы не определён» объясняет named proceeds base, boundary, period, adjustments и calculation owner; worked split `$80 × 15% = $12`, `$80 × 85% = $68` явно не переносит 15% на advertiser `$100`. |
| 4.5 | ✅ COVERED | Таблица различает fixed fee за period/scope/deliverable и SaaS subscription/seats/usage tier. Sidecar `$2,000/month` показывает отдельный software/service contract и прямо исключает его из `$100 media flow`, если договор не объединяет charges. |
| 4.6 | ✅ COVERED | «Markup, spread и take rate» определяет absolute spread `$100 − $80 = $20` и markup на acquisition/base cost: `$20 / $80 = 25%`; текст отдельно запрещает смешивать markup с take rate и gross margin. |
| 4.7 | ✅ COVERED | Take rate определён как retained amount / named transaction flow на конкретной participant boundary. Приведены network `$20/$100 = 20%`, SSP `$12/$80 = 15%` и end-to-end `$12/$100 = 12%`; comparability требует numerator, denominator и included fees. |
| 4.8 | ✅ COVERED | Раздел о ledgers определяет advertiser spend как начисленную advertiser сумму с named media/service scope и возможными included/excluded fees/adjustments. В walkthrough это `$100`; ledger и comparison table отделяют сумму от invoice date, cash date, recognized revenue и return. |
| 4.9 | ✅ COVERED | Media cost определён относительно конкретной entity: в узком примере advertiser имеет `$100`, managed network — `$80` downstream acquisition cost/payable. Текст прямо говорит, что label без owner не определён и не является alias payout. |
| 4.10 | ✅ COVERED | Publisher payout раскрыт как owed/remitted amount после share/fees/adjustments: `$68` является SSP payable и publisher receivable. Ledger table и timeline отделяют его от settled cash и от конкретной publisher revenue policy. |
| 4.11 | ✅ COVERED | Раздел «Gross/net revenue и gross margin» выводит presentation из specified good/service, control и transaction-specific principal/agent conclusion, а indicators использует только как evidence. Взаимоисключающие `$100 gross`/`$20 net` rows и Magnite/TTD examples отвергают модель «до/после расходов». |
| 4.12 | ✅ COVERED | Даны обе формулы на одной accounting boundary, расчёты `$100−$80=$20`, `20%` и isolated net `100%`. Сразу объяснены прочие CoR, company-specific classification, operating expenses и запрет трактовать 100% как benchmark или выбирать presentation ради margin. |
| 4.13 | ✅ COVERED | Раздел «Arbitrage: spread в обмен на принятый риск» показывает resale `$80 → $100` и CPM-buy/CPC-or-CPA-sell basis mismatch; объясняет volume, fulfillment, performance и reconciliation risk, возможный loss, neutrality и отличие от disclosed fee/revenue share. |
| 4.14 | ✅ COVERED | В `$100` walkthrough заработок посредников разложен как `$20` network spread и `$12` SSP retained, вместе `$32/$100`. Соседние sections объясняют функции и risk, а ledger/comparison table прямо запрещают считать retained economics автоматически recognized revenue или profit. |
| 4.15 | ✅ COVERED | Раздел «Путь учебных `$100`» задаёт actors и exclusions, считает `$100 → $80 → $68`, проверяет `$20+$12+$68=$100`, показывает все percentages, participant ledger, отдельные event/data и invoice/cash flows и предупреждает, что числа не являются типичной цепочкой или benchmark. |

# Вердикт

PASS
