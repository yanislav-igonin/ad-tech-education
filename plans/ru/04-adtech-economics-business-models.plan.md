# Цель обучения

После главы читатель должен уметь разложить любую AdTech-сделку на шесть независимых слоёв — договорную pricing basis, billable event/amount, optimization metric, participant ledgers, gross/net accounting presentation и cash settlement — и на согласованном пути `$100` объяснить, кто несёт риск до каждого события, почему одна сумма получает разные labels у advertiser, посредников и publisher, как считаются revenue share, markup и take rate с явно названными denominators, где возникает arbitrage и почему retained amount, recognized revenue, gross profit и cash не являются синонимами.

# Границы главы

## Входит в главу

- Центральная causal model:

```text
business problem и распределение риска
  → contractual pricing basis
  → billable event / billable amount
  → записи в ledgers каждого участника
  → fee, spread, revenue share и intermediary economics
  → gross/net revenue presentation и gross margin
  → invoice, payable/receivable и более поздний cash settlement
```

- `CPM`, `CPC`, `CPA`, `CPI` и `CPL` как договоры о том, какое событие переносит экономический риск между сторонами. Формулы из главы 3 не переобъясняются; здесь важны trigger, payer/payee, validation, риск недостижения следующего outcome и отличие от realised average или optimization target.
- Revenue models посредников и technology providers: `revenue share`, `fixed fee`, `SaaS pricing`, `markup`, `take rate`; для каждого — база расчёта, denominator, сторона договора и связь либо отсутствие связи с media money.
- Явное разделение шести сущностей: `pricing model`, `billable event`, `optimization metric`, `ledger label`, `accounting presentation`, `cash settlement`. Одинаковый label вроде `CPA` может появляться в нескольких слоях, но не делает их одним объектом.
- `Advertiser spend`, `media cost` и `publisher payout` как разные величины на разных boundaries, даже когда они связаны одной сделкой.
- `Gross revenue` и `net revenue` как accounting presentation после principal-versus-agent assessment, а не разговорные «до расходов» и «после расходов».
- `Gross profit = recognized revenue − cost of revenue`; `gross margin = gross profit / recognized revenue`. В numerator и denominator используются суммы одной reporting entity и одной accounting basis.
- Arbitrage как покупка media/traffic на одной boundary или pricing basis и перепродажа дороже либо на другой basis; экономический spread, принятый риск и отличие от прозрачной fee.
- Отдельные `data/event flow` и `money/invoice flow`; краткая отметка, что accrual, invoice, payable/receivable и cash movement происходят в разные моменты.
- Один явно учебный `$100` walkthrough с согласованной арифметикой и ledger table для advertiser, managed network, SSP и publisher. Числа не выдаются за benchmark рынка или типичную универсальную цепочку.
- Датированная accounting caveat: реальная gross/net классификация зависит от договора, обещанного specified good/service, контроля и применимой reporting framework; глава даёт mental model, не accounting advice.

## Не входит в главу

- Повтор формул и measurement contracts `CPM/eCPM/CPC/CPA/CPI/CPL`, `spend/cost/revenue`, `ROAS/ROI` из главы 3. Глава 4 использует их как подготовленный vocabulary и меняет вопрос с «как посчитать?» на «за что стороны договорились платить и кто несёт риск?».
- Campaign hierarchy, objective, optimization event, bid strategy, budget, schedule и setup — глава 5. Здесь `optimization metric` появляется только для отделения от billing basis.
- Affiliate offer mechanics, affiliate payout, postback, conversion cap, affiliate margin и traffic arbitrage end-to-end — глава 9. Здесь CPA/CPI/CPL и arbitrage рассматриваются как общие договорные модели.
- Publisher yield, demand diversification, direct/indirect monetization и revenue optimization — глава 10. Здесь publisher нужен как ledger boundary и получатель payout.
- Direct IO, sponsorship, guaranteed/open auction, PMP, preferred deal и programmatic guaranteed — глава 14. Эти способы продажи могут использовать разные economic terms, но их выбор не разбирается.
- Повтор ролей DSP, SSP, exchange и ad network, bundling ролей и полный money/data flow — глава 16. Здесь роли используются только для economics одного примера.
- Auction theory и mechanics: bid, floor, first/second price, clearing price, bid shading, winner selection — главы 18–20. `Billable event` объясняется без вывода auction price.
- Reporting pipelines, aggregation, backfill и reprocessing — глава 31; подробные discrepancy causes и reconciliation — глава 32; billing-grade schemas, lineage и correction operations — глава 48. Здесь достаточно показать, какие contractual records должны попасть в ledger и почему invoice/cash могут не совпасть по времени.
- Supply-chain fee transparency и SPO как отдельные operating disciplines — главы 38–39. Историческое исследование fees используется лишь как доказательство вариативности denominators и цепочек, не как current benchmark.
- Advanced accounting и юридическая квалификация договоров: performance obligations, variable consideration, collectability, multi-element allocation, detailed principal-agent case analysis, local statutory rules, audits и disclosures.
- Taxes, VAT/sales tax, FX, rebates, refunds, make-goods, credit risk, bad debt, payment guarantees и working-capital mechanics — кроме одной boundary caveat о том, что они могут изменить invoiced/settled amount.
- Settlement infrastructure, clearing accounts, netting, payment rails и collections workflow. Cash settlement остаётся последним слоем модели, но не технической темой главы.

# Результаты исследования

- Research проведён на 2026-08-28. Для основной главы не нужен универсальный прайс-лист: pricing terms договорные, зависят от роли, продукта, media format, transaction type и клиента. Current filings Magnite и The Trade Desk показывают одновременно percentage-of-spend, fixed CPM, fixed monthly/platform fees и value-added/data fees; это доказательство разнообразия моделей, а не taxonomy, обязательная для всех vendors. [Источники 7–8]
- **Billable event задаётся business policy/contract, а не самим фактом auction win.** Final IAB Tech Lab Programmatic Auction Definitions определяет `Billable Event` как событие, сигнализирующее, что auction стала billable, и предлагает записывать fees, clearing price и billable price в ledger. OpenRTB отдельно различает win notice (`nurl`) и billing notice (`burl`): win не гарантирует delivery, а billing notice сигнализирует monetary charge по publisher/exchange-specific policy. Автору нужен только этот boundary; OpenRTB internals не разворачивать. [Источники 1–2]
- **Pricing basis не равна optimization metric и realised unit metric.** Official Google Ads documentation даёт product-specific контрпример: CPC может быть фактической payment basis, тогда как target CPA управляет автоматическим выбором bids ради CPA goal, хотя charge всё ещё возникает по clicks/engaged views в соответствующем product flow. Поэтому автор должен показывать три отдельные строки: `что оптимизируем`, `за какое событие выставляем charge`, `какой realised average считаем после факта`. [Источник 3]
- **CPM/CPC/CPA-family распределяют event risk, но не устраняют его.** При CPM buyer принимает риск того, что billable impressions не дадут clicks/outcomes; seller получает оплату раньше funnel. При CPC seller/intermediary принимает риск impressions без qualifying click, а buyer — риск post-click quality и conversion. При CPA/CPI/CPL payee принимает больше delivery/conversion и measurement risk до согласованного action, install или lead; advertiser всё ещё несёт риск качества lead/install/action и последующей monetization. Fraud, attribution disputes, invalidation и caps меняют договорный результат, но их mechanics относятся к поздним главам.
- **Revenue share требует названной базы.** Это не просто «publisher получает X%»: договор должен назвать revenue/proceeds boundary, допустимые deductions/adjustments, период и сторону, которая считает. В учебном примере SSP получает `$80`, удерживает `15% = $12`, а publisher payout равен `85% = $68`; этот процент относится к `$80` на SSP boundary, не к исходным `$100` advertiser.
- **Markup и take rate используют разные denominators.** Для посредника, который приобрёл media за `$80` и продал за `$100`, spread равен `$20`; markup на acquisition cost — `$20 / $80 = 25%`, take rate на advertiser spend — `$20 / $100 = 20%`. Без denominator проценты несопоставимы. `Take rate` также может означать retained fee относительно spend на конкретной platform boundary, а не end-to-end долю исходного advertiser dollar.
- **Retained amount не равен автоматически recognized revenue или profit.** Retained `$20` может быть fee/spread по management view; accounting revenue зависит от gross/net presentation, а gross profit дополнительно вычитает cost of revenue. Operating expenses, taxes и financing costs лежат ещё ниже и не входят в gross margin.
- **Gross/net presentation — principal-versus-agent conclusion, не арифметика «revenue минус расходы».** ASC 606 и IFRS 15 начинают с specified good/service и вопроса, контролирует ли entity его до transfer customer. Principal обычно показывает gross consideration; agent — fee/commission net. Indicators вроде primary responsibility, inventory risk и pricing discretion помогают оценке, но не заменяют control principle. Применение требует фактов договора и professional judgment. [Источники 4–5]
- **Один intermediary может иметь обе presentations для разных transaction types.** Magnite за 2025 год сообщала, что большинство platform transactions отражается net, потому что компания не контролирует inventory и не устанавливает auction price, а некоторые insertion-order campaigns — gross, поскольку компания считает себя primary obligor по delivery. Это сильный AdTech-пример того, почему category label `SSP` или единый invoice не предрешает accounting boundary. [Источник 7]
- **Gross billings, accounts receivable/payable и revenue могут сильно различаться.** The Trade Desk за 2025 год описывает platform fee как percentage of client platform spend и обычно исключает Supplier Components из revenue при agent conclusion, хотя gross billings и соответствующие receivable/payable включают более крупные суммы. Значит, invoice/cash path нельзя читать как доказательство gross revenue. [Источник 8]
- **Gross margin считается только на accounting basis reporting entity.** Базовая учебная запись: `gross profit = recognized revenue − cost of revenue`; `gross margin = gross profit / recognized revenue`. Одинаковая transaction economics при gross и net presentation способна дать механически разные revenue и gross-margin percentage. Cost-of-revenue classification и non-GAAP adjustments company-specific, поэтому сравнение vendors требует чтения policies и reconciliation. [Источник 6]
- **Arbitrage — не любой intermediary fee.** CMA определяла arbitrage в контексте open display как возможность купить impressions по одной цене и продать дороже без прозрачности размера разницы; там же SSP fees описаны как negotiated revenue share/take rate, заметно различавшийся по format и transaction type. Исследование относится к UK open display 2020 года и не должно давать current «нормальную ставку» 2026 года. Для главы полезна только mechanism definition и transparency caveat. [Источник 9]
- **Выбор педагогического дизайна.** Рассмотрены два варианта: (a) один согласованный `$100` walkthrough, на который наслаиваются ledgers, markup/take rate, gross/net и settlement; (b) несколько несвязанных mini-cases по каждой модели. Выбран вариант (a): меньше actors, arithmetic и switching cost. Изоляция сохраняется одним коротким sidecar для fixed fee/SaaS, потому что включение software subscription внутрь media dollar создало бы ложную универсальную цепочку.

# Терминология

## Уже ожидается

- Advertiser, publisher, user, agency/media buyer, ad network, DSP, SSP, exchange, ad server, MMP и verification provider как роли из глав 1–2.
- Demand/supply, inventory, placement, opportunity, request, impression, click, conversion, campaign и creative на уровне предыдущих глав.
- Metric contract; served/rendered/viewable и billable на уровне разных event points; attribution не равна causality.
- `CPM`, `eCPM`, `CPC`, `CPA`, `CPI`, `CPL`, `spend`, `cost`, `revenue`, `ROAS` и `ROI` как formulas/metrics из главы 3; также подготовлен принцип participant/ledger boundary.
- Invoice, accounts receivable/payable, accrual, ledger, cash flow, margin, denominator и distributed reconciliation как общие engineering/accounting-adjacent concepts; AdTech-specific смысл вводится здесь.

## Вводится здесь

- **Contractual pricing basis / pricing model** — правило договора, связывающее charge с impression, click, action, revenue base, time или software access/usage.
- **Billable event** — qualifying событие, после которого по конкретному договору возникает billable amount; auction win сам по себе не обязан быть таким событием.
- **Billable amount** — сумма, начисленная по pricing basis после применения count, rate и договорных adjustments; ещё не обязательно invoice, recognized revenue или cash.
- **Optimization metric/target** — сигнал или цель, по которой система меняет decisions; может называться CPA/ROAS/CPM, но не определяет payment basis без договора.
- **Event risk / risk allocation** — какая сторона не получает оплату или не получает желаемый outcome, если funnel остановится до следующего agreed event.
- **Revenue share** — договорное распределение явно названной revenue/proceeds base между сторонами; percentage без base и deductions не определён.
- **Fixed fee** — заранее согласованная сумма за period, scope, deliverable или service, не обязательно зависящая от media spend или outcomes.
- **SaaS pricing** — оплата software access, seats, usage tier или processed volume; это service/software money, пока договор явно не включает её в media charge.
- **Markup** — надбавка относительно base/acquisition cost: `(selling price − base cost) / base cost`; denominator — base cost.
- **Spread** — абсолютная разница между selling amount и acquisition/downstream amount на названной boundary; не автоматически profit.
- **Take rate** — retained amount, делённый на явно названный transaction flow на той же boundary. Требует participant, numerator, denominator и включённых fees.
- **Advertiser spend** — сумма, начисленная advertiser за выбранный media/service scope; dashboard может включать или исключать platform/data/service fees, taxes и credits.
- **Media cost** — стоимость приобретённого media для названной entity. Для advertiser может пересекаться со spend; для intermediary это downstream inventory/traffic acquisition cost.
- **Publisher payout** — сумма, owed/remitted publisher по seller contract после agreed share/fees/adjustments; для intermediary это payable/outflow, для publisher — receivable и возможная revenue basis по его policy.
- **Gross billings** — сумма, которую entity выставляет или отвечает за collection до исключения supplier components; не synonym recognized revenue.
- **Principal / agent** — accounting roles относительно specified good/service: principal контролирует его до transfer; agent организует provision другой стороной. Это conclusion для конкретной promise/transaction, не постоянный product label.
- **Gross revenue presentation** — reporting entity признаёт gross consideration как revenue при применимой principal conclusion; related supplier/media amount обычно рассматривается отдельно как cost по её policy.
- **Net revenue presentation** — reporting entity признаёт fee/commission или retained consideration как revenue при agent conclusion; supplier component не становится её gross revenue и matching cost только потому, что прошёл через invoice.
- **Cost of revenue** — расходы, классифицированные reporting entity как непосредственно связанные с признанным revenue по её accounting policy; не любой cash outflow.
- **Gross profit / gross margin** — `recognized revenue − cost of revenue` и `(recognized revenue − cost of revenue) / recognized revenue`; считать только на одной accounting boundary.
- **Arbitrage** — покупка media/traffic по одной цене или basis и перепродажа дороже либо по другой basis с принятием spread, performance и reconciliation risk; не synonym fee, markup или вся intermediation.
- **Invoice flow / settlement flow** — кто кому выставляет receivable/payable и как обязательства позднее погашаются cash; эти flows не обязаны повторять event/data path.

# Предлагаемая структура главы

1. **Цена начинается с договора, а не с названия метрики**
   - Цель: дать шесть слоёв mental model до обсуждения отдельных models и пресечь смешение одинаковых labels.
   - Обязательные concepts: pricing basis; billable event/amount; optimization target; ledger label; accounting presentation; invoice/cash settlement.
   - Иллюстрация: компактная таблица:

| Слой | Главный вопрос | Пример |
|---|---|---|
| Pricing | За какую basis договорились платить? | CPM за qualifying impressions |
| Billing | Какое событие создаёт charge? | Render/billing notice по policy |
| Optimization | Какой outcome меняет future decisions? | target CPA |
| Ledger | Чья это сумма? | advertiser spend, network media cost |
| Accounting | Что entity признаёт revenue/cost? | gross или net presentation |
| Settlement | Когда обязательство стало cash? | month-end invoice → later payment |

   - Causal transition: participants выбирают event не из-за формулы, а чтобы распределить risk, observability и incentives.
   - Покрывает основу всех requirements; substantive coverage — в разделах 2–7.

2. **CPM, CPC и outcome pricing: кто несёт риск до следующего события**
   - Цель: раскрыть 4.1–4.3 как economic contracts, не повторять unit-metric formulas главы 3.
   - Обязательные concepts: qualifying/billable event; validation; payment trigger; post-event risk; pricing basis vs target/bid vs realised average.
   - Сравнительная таблица: `model → billable event → buyer получает → risk payee → risk buyer → common dispute`.
   - CPM: seller/payee получает право на charge на impression boundary; buyer принимает click/conversion risk. Короткая caveat: `served`, `rendered` или `viewable` basis должна быть договорно названа.
   - CPC: payee принимает impression-to-click risk; buyer — post-click quality/conversion risk; click definition, filters и duplicates являются billing contract.
   - CPA/CPI/CPL: отдельно назвать action/install/lead и сторону validation/attribution; payee принимает риск до deeper-funnel event, advertiser сохраняет quality/LTV risk.
   - Мини-пример с альтернативными, не одновременными contracts на `$100`: `10,000 impressions × $10 CPM`, `200 clicks × $0.50 CPC`, `20 installs × $5 CPI`, `25 leads × $4 CPL`, `10 subscriptions × $10 CPA`. Сумма одна, risk boundary разная.
   - Misconception box: `target CPA` может оптимизировать activity, оплачиваемую не по CPA; observed CPA после факта не доказывает CPA billing.
   - Покрывает: 4.1, 4.2, 4.3.

3. **Как зарабатывают intermediaries и software providers**
   - Цель: отделить models, связанные с media transaction, от оплаты technology/service.
   - Обязательные concepts: revenue share, fixed fee, SaaS subscription/usage, markup, spread, take rate, named denominator.
   - Revenue-share walkthrough на SSP boundary: `$80 gross proceeds`, `15% retained = $12`, `85% publisher payout = $68`; раскрыть base и запрет переносить 15% на исходные `$100`.
   - Markup/take-rate comparison для managed network: acquisition `$80`, selling `$100`, spread `$20`; markup `25%` на cost, take rate `20%` на advertiser spend.
   - Fixed/SaaS sidecar: ad server или measurement platform получает, например, `$2,000/month` за access/usage tier отдельно от `$100 media flow`. Если fee зависит от processed impressions, это usage pricing, но не publisher revenue share автоматически.
   - Таблица `model → payer → calculation base → media money? → volume/outcome risk → disclosure needed`.
   - Покрывает: 4.4, 4.5, 4.6, 4.7.

4. **Одна сумма, разные ledgers и разные моменты времени**
   - Цель: объяснить 4.8–4.10 и подготовить читателя к `$100` ledger table.
   - Обязательные concepts: advertiser spend, entity-specific media cost, publisher payout, receivable/payable, accrued/invoiced/settled states.
   - Money-label diagram:

```text
advertiser: $100 advertiser spend / media cost
    → managed network: $100 billed; $80 downstream media cost/payable
        → SSP: $80 boundary inflow; $68 publisher payout/payable
            → publisher: $68 receivable; publisher revenue по своей policy
```

   - Рядом отдельный event/data flow:

```text
10,000 qualifying impressions
  → contract-specific billable count
  → advertiser/network/SSP/publisher records
  → month-end reconciliation и ledger entries
```

   - И отдельный invoice/cash flow: invoice и payables появляются после aggregation/reconciliation; cash проходит позже и может идти по иному operational path. Не разбирать rails, credit risk или netting.
   - Ledger-label table: `entity → counterparty → inflow/receivable label → outflow/payable label → retained/economic amount → что label не доказывает`.
   - Покрывает: 4.8, 4.9, 4.10.

5. **Gross/net revenue и gross margin: accounting boundary поверх transaction economics**
   - Цель: раскрыть 4.11–4.12 без превращения главы в accounting guide.
   - Обязательные concepts: specified good/service, control, principal/agent, gross vs net presentation, recognized revenue, cost of revenue, gross profit, gross margin.
   - Дать decision sketch, не checklist для самостоятельного accounting conclusion:

```text
Что entity обещала customer?
  → какой specified good/service передаётся?
  → контролирует ли entity его до transfer?
     principal conclusion → обычно gross revenue presentation
     agent conclusion     → обычно net fee/commission presentation
```

   - Indicators `primary responsibility`, `inventory risk`, `pricing discretion` назвать как evidence, не как независимый балльный тест.
   - Две взаимоисключающие учебные presentations одинакового `$100/$80` economics:

| Иллюстративная conclusion | Recognized revenue | Cost of revenue из supplier component | Gross profit до прочих CoR | Gross margin до прочих CoR |
|---|---:|---:|---:|---:|
| Principal / gross | `$100` | `$80` | `$20` | `20%` |
| Agent / net | `$20` fee | supplier `$80` исключён из revenue и matching cost | `$20` | `100%` |

   - Обязательная caveat: таблица изолирует supplier component ради pedagogy; реальные companies имеют platform operations и другие cost-of-revenue items, поэтому `100%` не прогноз и не benchmark. Accounting treatment нельзя выбрать ради красивой margin.
   - Current company box: Magnite имеет net и gross transaction types; The Trade Desk показывает gross billings больше net revenue. Использовать только как evidence contract-specific boundary.
   - Покрывает: 4.11, 4.12.

6. **Где возникает arbitrage и за какой риск платят spread**
   - Цель: раскрыть 4.13 и связать pricing basis с incentives посредника.
   - Обязательные concepts: buy price/basis, sell price/basis, spread, inventory/volume risk, conversion risk, reconciliation risk, transparency.
   - Простая форма в основном walkthrough: managed network покупает согласованный batch за `$80`, продаёт advertiser за `$100`, spread `$20` возникает на resale boundary.
   - Basis arbitrage variant: intermediary покупает CPM inventory, а продаёт advertiser clicks/actions; прибыль зависит от realised CTR/CVR и validation, поэтому низкая performance способна съесть spread или создать loss.
   - Clarification: disclosed service fee или revenue share не автоматически arbitrage; arbitrage не автоматически abuse. Проблема opacity возникает, когда customer не понимает buy/sell basis, magnitude spread или conflicts.
   - Не уходить в affiliate traffic arbitrage, auctions, fraud и SPO.
   - Покрывает: 4.13.

7. **Путь учебных `$100`: кто зарабатывает на одном рекламном долларе**
   - Цель: синтезировать 4.14–4.15 и все предыдущие distinctions одной таблицей.
   - Assumptions box: subscription-app advertiser; mobile publisher; managed network + SSP; `10,000` одинаковых qualifying billable impressions только для изоляции economics; USD; no taxes/FX/refunds/rebates/fraud adjustments; invoices и cash ещё не settled; числа учебные и не market benchmark.
   - Арифметика:

```text
Advertiser → network: 10,000 / 1,000 × $10 CPM = $100
Network → SSP:        10,000 / 1,000 ×  $8 CPM =  $80
Network spread:                                 =  $20
SSP retained share:             15% × $80       =  $12
Publisher payout:               85% × $80       =  $68
Check:                              $20 + $12 + $68 = $100
```

   - Denominator check:

```text
network markup on acquisition cost = $20 / $80  = 25%
network take on advertiser spend    = $20 / $100 = 20%
SSP take on its boundary            = $12 / $80  = 15%
SSP share of original spend         = $12 / $100 = 12%
combined intermediary share         = $32 / $100 = 32%
publisher payout share              = $68 / $100 = 68%
```

   - Обязательная ledger table:

| Entity | Contract/billable basis | Inflow/receivable view | Outflow/payable view | Economic remainder | Accounting caveat |
|---|---|---:|---:|---:|---|
| Advertiser | `$10 CPM` × 10,000 | — | `$100` advertiser spend/media cost | — | Spend scope может не совпасть с cash date |
| Managed network | Customer charge `$100`; downstream `$8 CPM` | `$100` billed/receivable | `$80` downstream media cost/payable | `$20` spread | Не называть `$100` revenue без principal-agent conclusion |
| SSP | Revenue-share base `$80` | `$80` boundary proceeds/receivable | `$68` publisher payout/payable | `$12` retained amount | `$12` — economic fee; presentation следует policy |
| Publisher | `85%` of SSP boundary | `$68` publisher payout receivable | — | `$68` publisher economics | Recognized publisher revenue и cash timing следуют его policy |

   - Закрывающая comparison table: `transaction amount`, `retained amount`, `recognized revenue`, `gross profit`, `gross margin`, `invoice` и `cash` отвечают на разные вопросы.
   - Финальный operational checklist для любого vendor: `payer? pricing basis? billable event? optimization target? invoice owner? spend/cost/payout labels? fee denominator? principal/agent policy? cost of revenue? cash timing?`.
   - Покрывает: 4.14, 4.15; закрепляет 4.1–4.13 без повторного глоссария.

# Ключевые примеры

1. **Subscription app: один `$100` media flow через managed network и SSP.** `10,000` учебных billable impressions: advertiser charge `$100`, network downstream media cost `$80`, network spread `$20`, SSP revenue-share base `$80`, SSP retained `$12`, publisher payout `$68`. Показать отдельно event records, participant ledgers, invoice/payables и ещё не состоявшийся cash settlement. Этот пример несёт основную главу.
2. **Пять альтернативных contracts на одинаковый `$100 billable amount`.** CPM, CPC, CPA, CPI и CPL дают одну сумму при разных qualifying events; таблица показывает, какая сторона несёт risk до click/install/lead/action и почему observed unit metric либо optimization target не сообщает payment basis.
3. **Technology fee вне media dollar.** Ad server/measurement SaaS получает фиксированные `$2,000/month` или usage-tier fee за software/service. Пример предотвращает ложную модель «каждый provider удерживает часть тех же `$100`» и отдельно покрывает fixed fee/SaaS.

# Важные заблуждения

- **«CPM/CPC/CPA — просто три формулы из dashboard».** Здесь это прежде всего contractual bases и risk boundaries; те же labels также могут быть bids, optimization targets или realised averages.
- **«Auction win уже можно выставлять в invoice».** Не обязательно: contract определяет billable event; OpenRTB специально отделяет win notice от billing notice.
- **«CPA campaign означает, что advertiser платит только за action».** Target CPA может управлять bids при иной payment basis. Billing доказывает договор, не UI label цели.
- **«Чем глубже event, тем весь риск переходит advertiser или publisher».** Риск распределяется по стадиям: CPA payee несёт больше risk до action, но advertiser остаётся с quality, fraud, retention и LTV risk.
- **«Revenue share 15% везде означает 15% advertiser spend».** Процент действует только на named base; в примере это `$12 / $80`, а не `$12 / $100`.
- **«Markup 25% и take rate 20% противоречат друг другу».** Absolute spread `$20` один; denominators `$80 cost` и `$100 selling amount` разные.
- **«Take rate — универсально сравнимая ставка».** Нет: нужно знать participant boundary, numerator, denominator, included fees, rebates и gross/net basis.
- **«Advertiser spend, media cost и publisher payout — aliases одной суммы».** Это labels разных ledgers: `$100`, `$80` и `$68` могут одновременно быть правильными в одной сделке.
- **«Gross revenue — до расходов, net revenue — после расходов».** Нет: presentation следует principal-agent assessment; profit появляется только после соответствующих costs.
- **«Кто выставил invoice на `$100`, тот признал `$100 revenue`».** Gross billings, receivable и cash collection могут включать supplier components, исключённые из net revenue.
- **«Retained amount равен gross profit».** Spread/fee ещё не учитывает cost of revenue; gross profit ещё не учитывает operating expenses, interest и taxes.
- **«Gross margin можно считать как посреднический spread / advertiser spend при любой presentation».** Gross margin использует recognized revenue и cost of revenue одной entity; take rate использует transaction-flow denominator.
- **«100% gross margin в net illustration означает бесплатную platform».** Таблица временно исключает прочие cost-of-revenue items, чтобы показать mechanics presentation; реальная margin ниже или иная по policy.
- **«Любой intermediary spread — arbitrage и автоматически зло».** Arbitrage означает buy/sell spread или basis mismatch с принятым risk; прозрачная intermediation может создавать ценность. Material issue — функция, risk, price и disclosure.
- **«Fixed SaaS fee тоже надо вычесть из `$100` media dollar».** Только если договор действительно включает её в media charge; часто это отдельный service/software flow.
- **«Accrued, invoiced, settled и paid — одно состояние».** Billable event создаёт основание для amount, затем следуют reconciliation/invoice и только позже cash settlement.

# Coverage Matrix

| Требование | Планируемое место | Способ раскрытия |
|---|---|---|
| 4.1 | Раздел 2 «CPM, CPC и outcome pricing» | CPM как договорная impression basis: named served/rendered/viewable billable event, payer/payee, seller payment boundary, buyer post-impression risk и explicit distinction от bid/target/observed CPM; без повтора формулы главы 3 |
| 4.2 | Раздел 2 «CPM, CPC и outcome pricing» | CPC как contractual click trigger; qualifying-click/filter contract, перенос impression-to-click risk на payee, post-click risk advertiser и comparison с realised/target CPC |
| 4.3 | Раздел 2 «CPM, CPC и outcome pricing» | CPA/CPI/CPL comparison table: отдельные action/install/lead events, validation/attribution owner, deeper-funnel risk allocation, quality limitation и альтернативные `$100` calculations |
| 4.4 | Раздел 3 «Как зарабатывают intermediaries и software providers» | Revenue share как percentage от named proceeds base с period/adjustments; worked SSP split `$80 × 15% = $12`, publisher share `$68` и denominator clarification |
| 4.5 | Раздел 3 + отдельный SaaS example | Fixed fee и SaaS access/seat/usage-tier pricing, payer/value/risk, `$2,000/month` sidecar и явное отделение service/software money от media flow |
| 4.6 | Раздел 3 «Как зарабатывают intermediaries и software providers» | Markup definition и formula на acquisition/base cost; `$20 / $80 = 25%`, comparison with absolute spread и prohibition on confusing markup with margin/take rate |
| 4.7 | Раздел 3 и denominator check раздела 7 | Take rate как retained amount / named transaction flow; network `$20/$100`, SSP `$12/$80`, end-to-end alternative `$12/$100` и disclosure checklist для comparability |
| 4.8 | Раздел 4 «Одна сумма, разные ledgers» + ledger table раздела 7 | Advertiser spend как accrued/billed amount на buyer boundary; `$100` example, possible scope of media/platform fees и distinction from invoice date/cash/payment |
| 4.9 | Раздел 4 «Одна сумма, разные ledgers» + ledger table раздела 7 | Media cost как entity-specific downstream inventory acquisition cost; advertiser `$100` vs network `$80`, participant label transformation и non-alias clarification |
| 4.10 | Раздел 4 «Одна сумма, разные ledgers» + ledger table раздела 7 | Publisher payout as `$68` owed/receivable after SSP share, intermediary payable vs publisher economics, accrued/invoiced/settled timing distinction |
| 4.11 | Раздел 5 «Gross/net revenue и gross margin» | Gross/net presentation through specified service, control and principal-agent decision sketch; paired `$100 gross`/`$20 net` illustration, Magnite/TTD filings и explicit rejection of «до/после расходов» |
| 4.12 | Раздел 5 «Gross/net revenue и gross margin» | `gross profit = recognized revenue − cost of revenue`; `gross margin = gross profit / recognized revenue`; paired 20%/100% mechanical example, other-CoR caveat и cross-company comparability warning |
| 4.13 | Раздел 6 «Где возникает arbitrage» | Buy `$80`/sell `$100` resale spread plus CPM-buy/outcome-sell basis variant; risk, possible loss, transparency issue и distinction from ordinary disclosed fee/revenue share |
| 4.14 | Раздел 7 «Путь учебных $100» | Intermediary earnings decomposition `$20 network + $12 SSP`, role/function/risk explanation, absolute amounts beside multiple denominators и warning that retained economics are not automatically accounting profit |
| 4.15 | Раздел 7 «Путь учебных $100» | End-to-end arithmetic `$100 → $80 → $68`, explicit assumptions, separate event and invoice/cash flows, participant ledger table, sum check and non-universality caveat |

# Источники

1. **[IAB Tech Lab — Programmatic Auction Definitions, Final](https://github.com/InteractiveAdvertisingBureau/programmatic-auction-definitions/blob/main/auction%20definitions.md).** Финализированы 2026-06-24; checked 2026-08-28. Поддерживает definitions `Billable Event`, participant-specific auction price и transaction recording of fees/clearing/billable price in ledger. Ограничение: programmatic-auction vocabulary, не универсальная коммерческая или accounting policy для всех media deals.
2. **[IAB Tech Lab — OpenRTB 2.x Implementation Guidelines, sections 7.8–7.9](https://github.com/InteractiveAdvertisingBureau/openrtb2.x/blob/main/implementation.md).** Maintained source checked 2026-08-28; различает `nurl` win notice и `burl` billing notice, прямо не разрешает считать win notice billable/tracked event и оставляет billing policy publisher/exchange contract. Ограничение: protocol best practice; production contract и non-RTB channels могут использовать иные signals.
3. **[Google Ads — CPC definition](https://support.google.com/google-ads/answer/116495?hl=en), [CPM definition](https://support.google.com/google-ads/answer/6310?hl=en) и [Bidding basics](https://support.google.com/google-ads/answer/2459326?hl=en).** Current official product docs checked 2026-08-28. Поддерживают product examples pay-per-click/pay-per-thousand и показывают, что target CPA optimization может сосуществовать с click/engaged-view charging. Ограничение: Google Ads behavior, не vendor-neutral standard и не полный contract конкретного advertiser.
4. **[FASB — Revenue from Contracts with Customers (Topic 606), paragraphs 606-10-55-36–55-40](https://asc.fasb.org/layoutComponents/getPdf?fileName=GUID-E90460CF-B750-4654-B149-5DD3F6B6DBA9.pdf&isSitesBucket=false)** и **[ASU 2016-08 implementation index](https://storage.fasb.org/TRG_Reference_Guide.pdf).** ASU issued 2016-03-17; official materials checked 2026-08-28. Поддерживают specified good/service, control-before-transfer и principal/agent basis gross/net presentation. Ограничение: US GAAP guidance; application contract-specific, требует accounting judgment и не выводится из AdTech role label.
5. **[IASB — IFRS 15 PIR: Principal versus Agent Considerations, staff paper AP6B](https://www.ifrs.org/content/dam/ifrs/meetings/2024/february/iasb/ap6b-ifrs-15-pir-principal-vs-agent-considerations.pdf).** Февраль 2024; checked 2026-08-28. Сводит IFRS 15 control principle: principal recognises gross consideration, agent fee/commission; перечисляет non-exhaustive indicators. Ограничение: staff paper сам не заменяет authoritative IFRS 15; локальная framework и факты договора обязательны.
6. **[FASB — GAAP Taxonomy Implementation Guide: Revenue from Contracts with Customers](https://xbrl.fasb.org/impguidance/Rev2_TIG/revenue_2.pdf).** Official implementation guidance checked 2026-08-28; использует `Gross Profit` как difference between revenue and cost of revenue/cost of goods sold. Ограничение: taxonomy/reporting illustration, не универсальный состав `cost of revenue`; company policies и non-GAAP adjustments требуют отдельного чтения.
7. **[Magnite — Form 10-K за год, завершившийся 2025-12-31](https://www.sec.gov/Archives/edgar/data/1595974/000159597426000007/mgni-20251231.htm).** Filed 2026; checked 2026-08-28. Поддерживает реальные AdTech revenue models: percentage of ad spend, fixed CPM, fixed monthly fee; Note 3 показывает net presentation для большинства platform transactions и gross для части insertion-order campaigns на разных principal-agent conclusions. Ограничение: disclosure одной компании и периода, не industry rule, benchmark take rate или готовая квалификация учебного intermediary.
8. **[The Trade Desk — Form 10-K за год, завершившийся 2025-12-31](https://www.sec.gov/Archives/edgar/data/1671933/000167193326000014/ttd-20251231.htm).** Filed 2026; checked 2026-08-28. Поддерживает platform fee as percentage of total platform spend, Supplier Components excluded under general agent conclusion и distinction gross billings/receivables/payables from net revenue. Ограничение: company-specific contracts, policies и self-description; не универсальная DSP model.
9. **[UK Competition and Markets Authority — Appendix M: Intermediation in open display advertising](https://assets.publishing.service.gov.uk/media/5fe495c28fa8f56afaf406d4/Appendix_M_-_intermediation_in_open_display_advertising_WEB.pdf)**; [official landing page](https://www.gov.uk/find-digital-market-research/online-platforms-and-digital-advertising-market-study-appendix-m-intermediation-in-open-display-advertising-2020-cma). **Research date 2020-07-01; landing page published 2022-03-25; checked 2026-08-28.** Поддерживает mechanism definitions revenue-share/take-rate variation и arbitrage as buy-low/sell-higher with transparency concern. Ограничение: historical UK open-display study; диапазоны и aggregate ad-tech take нельзя выдавать за current 2026 market benchmark, другой channel или конкретный contract.

Все material current/accounting claims привязаны к дате, роли и limitation источника. Остальные formulas и `$100` amounts — явно учебный synthesis для causal mental model, не accounting/legal advice, не quotation конкретного vendor contract и не утверждение о типичной доле publisher.