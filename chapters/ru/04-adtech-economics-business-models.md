---
id: ch-04
type: chapter
part: I
chapter: 4
slug: adtech-economics-business-models
title: "Экономика и бизнес-модели AdTech"
language: ru
status: draft
toc_requirements: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11", "4.12", "4.13", "4.14", "4.15"]
prerequisites: [ch-01, ch-02, ch-03]
---

# Экономика и бизнес-модели AdTech

## Суть: цена следует договору, а не label в dashboard

`CPM`, `CPC` или `CPA` в интерфейсе ещё не объясняет, за что платят. Один и тот же label может быть договорной ценой, `bid`, целью optimization или фактическим средним после событий. Денежное обязательство создаёт договорная **pricing basis** вместе с определением **billable event** — qualifying-события, после которого можно начислить сумму. Даже auction win сам по себе не обязан быть billable.

Чтобы прочитать экономику сделки, разложите её на шесть независимых слоёв:

| Слой | Главный вопрос | Пример |
|---|---|---|
| Contractual pricing | За какую basis договорились платить? | `$10 CPM` за тысячу qualifying impressions |
| Billing | Какое событие создаёт charge и какую сумму? | Render или иной billing signal по contract policy |
| Optimization | Какой outcome меняет будущие решения системы? | `target CPA` по подписке |
| Participant ledger | Для кого сумма является spend, cost, payout или retained amount? | `$100` spend advertiser; `$80` media cost посредника |
| Accounting presentation | Что конкретная entity признаёт revenue и cost? | Gross или net presentation |
| Settlement | Когда начисление стало invoice, а обязательство — cash? | Month-end invoice, оплаченный позже |

**Pricing basis** — договорное правило расчёта цены: за impression, click, action, долю proceeds, период доступа к software или иной согласованный объект. **Billable amount** — начисленная по этому правилу сумма после counts, rates, validation и договорных adjustments. Она ещё не обязательно выставлена в invoice, признана как revenue или оплачена cash.

Эта декомпозиция объясняет всю главу: стороны выбирают не красивую метрику, а boundary наблюдаемого события, цену и распределение риска; затем каждая сторона записывает результат в собственный ledger.

## CPM, CPC и outcome pricing: кто несёт риск до следующего события

Воронка может остановиться после любого шага:

```text
opportunity → qualifying impression → qualifying click → install/lead/action → business value
```

Чем глубже billable event, тем дольше payee — сторона, ожидающая оплату, — финансирует delivery без гарантии charge. Но риск не «переезжает» целиком: после оплачиваемого события buyer всё ещё рискует качеством следующего результата.

| Pricing model | Договорный billable event | Риск payee до charge | Риск advertiser после charge | Что обязательно определить |
|---|---|---|---|---|
| **CPM** | Тысяча qualifying impressions | Получить и подтвердить выбранный impression event | Click, conversion и последующая ценность могут не возникнуть | `served`, `rendered`, `viewable` или иная impression basis; filters и count owner |
| **CPC** | Qualifying click | Impressions могут не привести к click | Click может оказаться некачественным и не дать conversion | Click point, user initiation, deduplication, invalid-click filters |
| **CPA** | Согласованный action, например оплаченная подписка | Довести user до action и получить valid attribution/validation | Action может иметь низкую margin, retention или lifetime value | Точное имя action, attribution rule, validator, approval state |
| **CPI** | Valid attributed install | Delivery и clicks могут не привести к засчитанному install | Install может не запуститься, не удержаться и не монетизироваться | Install definition, attribution/validation owner, reinstall policy |
| **CPL** | Qualifying lead | Traffic может не породить принятый lead | Lead может не пройти дальнейшую qualification или не стать customer | Поля и criteria lead, duplicate/rejection rules, кто принимает lead |

Для CPM seller получает право на charge раньше воронки, поэтому advertiser принимает большую часть post-impression performance risk. Для CPC payee принимает impression-to-click risk, а advertiser — post-click risk. В CPA/CPI/CPL payee принимает больше delivery, conversion и measurement risk до глубокого события; advertiser сохраняет риск качества и монетизации результата. Fraud, attribution disputes и caps могут менять accepted count, но их mechanics рассматриваются позднее.

`Billable event` задаётся contract policy, а не протоколом автоматически. В programmatic flow IAB Tech Lab различает auction win и событие, после которого auction становится billable. OpenRTB также разделяет win notice (`nurl`) и billing notice (`burl`): win не гарантирует delivery, а billing signal зависит от policy publisher или exchange. Это programmatic-пример общего правила, не универсальный contract для любой рекламы.

Одинаковый учебный billable amount `$100` можно получить по пяти **альтернативным**, а не одновременным договорам:

| Contract | Qualifying volume и rate | Где проходит risk boundary |
|---|---:|---|
| CPM | 10,000 impressions по `$10 CPM` → `$100` | Impression |
| CPC | 200 clicks по `$0.50 CPC` → `$100` | Click |
| CPI | 20 installs по `$5 CPI` → `$100` | Attributed install |
| CPL | 25 leads по `$4 CPL` → `$100` | Accepted lead |
| CPA | 10 subscriptions по `$10 CPA` → `$100` | Attributed subscription |

Равный amount не означает равный риск. В CPM buyer уже должен `$100`, даже если подписок нет. В CPA за подписку payee не получает charge за impressions и clicks, которые не дошли до accepted action.

### Billing, optimization и realised metric — разные объекты

Представим product-specific flow: advertiser фактически оплачивает qualifying clicks, а bidding system оптимизирует решения под `target CPA`. После периода dashboard может вычислить realised CPM, CPC и CPA из фактических spend и events.

```text
optimization target: target CPA по подписке
billing basis:       CPC за qualifying click
realised metrics:    observed CPM, CPC и CPA после периода
```

Здесь `target CPA` не превращает договор в CPA billing. `Bid` также выражает decision input или willingness to pay, а не доказывает фактический charge. Payment model устанавливает contract; realized average описывает уже случившееся; optimization target влияет на будущие decisions.

## Как зарабатывают intermediaries и software providers

Посредник может удерживать часть media transaction, перепродавать media с надбавкой или получать отдельную оплату за service/software. Эти модели нельзя складывать, пока не известны contract boundary и calculation base.

| Модель | Кто платит | Правило расчёта | Связь с media dollar | Основной риск или caveat |
|---|---|---|---|---|
| **Revenue share** | Сторона, передающая proceeds по договору | Доля от named revenue/proceeds base за период | Обычно делит сумму на конкретной media boundary | Base, допустимые deductions и adjustments должны быть названы |
| **Fixed fee** | Клиент service provider | Заранее согласованная сумма за period, scope или deliverable | Может быть полностью отдельной | Provider несёт risk, что scope потребует больше работы |
| **SaaS pricing** | Customer software platform | Subscription, seats, usage tier или processed volume | Обычно отдельный software/service flow | Usage event не становится media event автоматически |
| **Markup** | Buyer платит selling price посреднику | Spread относительно acquisition/base cost | Да, если посредник перепродаёт media | Percentage растёт от cost denominator, не от selling amount |
| **Take rate** | Зависит от boundary | Retained amount / named transaction flow | Обычно характеризует удержание на выбранной boundary | Без numerator, denominator и included fees ставка несравнима |

### Revenue share: процент без базы не определён

**Proceeds** — сумма transaction inflow до согласованного распределения на выбранной boundary. **Revenue share** — договорное распределение названной revenue или proceeds base. Договор должен ответить: чьи proceeds, на какой boundary, за какой период, до или после каких agreed adjustments и кто выполняет расчёт.

В основном примере SSP получает на своей boundary `$80 gross proceeds` и по seller contract удерживает 15%:

```text
SSP retained amount = $12 / $80 SSP-boundary proceeds = 15%
publisher share      = $68 / $80 SSP-boundary proceeds = 85%
```

Numerator первого процента — `$12`, denominator — `$80`. Это не 15% исходного advertiser spend `$100`: относительно исходных `$100` те же `$12` составляют 12%. Слово `gross` здесь описывает transaction base до split, а не автоматически `gross revenue` в финансовой отчётности.

### Markup, spread и take rate

**Spread** — абсолютная разница между selling amount и acquisition/downstream amount на названной boundary. Если managed network покупает media за `$80` и продаёт advertiser за `$100`, spread равен `$20`.

**Markup** измеряет надбавку к base cost:

```text
network markup = $20 spread / $80 acquisition cost = 25%
```

**Take rate** измеряет retained amount относительно названного transaction flow на той же boundary:

```text
network take rate = $20 retained / $100 advertiser spend = 20%
```

`25% markup` и `20% take rate` описывают один `$20 spread` с разными denominators. Ни один процент нельзя сравнивать с чужой ставкой без participant boundary, numerator, denominator и перечня включённых fees. `Markup` также не равен gross margin: gross margin использует accounting revenue и cost of revenue, а не произвольно выбранные buy/sell amounts.

### SaaS sidecar: отдельные `$2,000/month`

Допустим, advertiser платит ad server или measurement platform фиксированные `$2,000/month` за software access и usage tier. Эта сумма:

- является service/software charge по отдельному договору;
- не вычитается из учебных `$100 media flow`;
- не становится publisher payout или intermediary take rate;
- может зависеть от числа обработанных impressions, но от этого не становится CPM-покупкой inventory.

Включать `$2,000` в media dollar можно только если конкретный договор действительно объединяет эти charges. Иначе получатся два money flows: media transaction и SaaS subscription.

## Одна сделка, разные ledgers и моменты времени

**Ledger** — записи конкретной entity о начисленных суммах и обязательствах. Один transaction не имеет единственного нейтрального денежного label: вход одной стороны является выходом другой, а промежуточная entity одновременно продаёт upstream и покупает downstream.

- **Advertiser spend** — сумма, начисленная advertiser за выбранный media/service scope. Dashboard может включать или исключать platform/data fees, taxes, credits и adjustments; scope нужно назвать.
- **Media cost** — стоимость приобретённого media для конкретной entity. Для advertiser в нашем узком примере это `$100`; для network downstream acquisition cost равен `$80`. Поэтому `media cost` без owner не определён.
- **Publisher payout** — сумма, которую по seller contract должны перечислить publisher после share, fees и adjustments. Для SSP это payable; для publisher — receivable и часть его economics, а признание revenue следует его policy.

**Receivable** — сумма, которую counterparty должна entity. **Payable** — сумма, которую entity должна поставщику или другой стороне. Эти слова описывают направление обязательства, не момент cash movement.

Полезно различать состояния:

```text
accrued  → qualifying events сверены; amount заработан или понесён по contract
billed   → amount включён в invoice; появился формальный запрос оплаты
settled  → обязательство погашено cash или иным согласованным способом
```

`Accrued` означает признанное по времени договора начисление до обязательного движения денег. `Invoice` документирует требование оплаты. `Cash settlement` происходит позже; taxes, credits, refunds и FX могут изменить invoiced или settled amount, но их mechanics здесь не рассматриваются.

### Event/data flow

```text
10,000 qualifying impressions
  → contract-specific billable count у network и SSP
  → participant event records с собственными measurement boundaries
  → period reconciliation
  → ledger amounts: $100, $80 и $68 на разных boundaries
```

Events могут идти от publisher-side systems к buyers и reporting systems асинхронно. Они доказывают basis для расчёта, но сами деньги по этому network path не передают.

### Invoice и cash flow

```text
network → invoice $100 → advertiser
SSP     → invoice $80  → network
publisher → invoice/statement $68 → SSP

позднее cash:
advertiser → $100 → network → $80 → SSP → $68 → publisher
```

Реальный operational path может использовать иной invoice owner или settlement arrangement. Главное: event path, invoice path и cash path не обязаны совпадать по направлению, участникам или времени.

## Gross/net revenue и gross margin: отдельная accounting boundary

**Reporting entity** — компания, чью финансовую отчётность мы читаем. **Recognized revenue** — сумма, которую она отражает как revenue по применимой accounting policy; это не любой invoice, collection или cash inflow. **Gross billings** — более широкая сумма, выставленная клиентам или прошедшая через collection до исключения supplier components; gross billings не являются synonym recognized revenue.

`Gross revenue` и `net revenue` — не «деньги до расходов» и «деньги после расходов». Presentation зависит от того, является ли entity **principal** или **agent** относительно конкретного обещанного товара или service:

- **Specified good/service** — конкретное обещание customer, которое оценивают: например, предоставить рекламную delivery или организовать доступ к supply.
- **Principal** контролирует specified good/service до передачи customer; при такой conclusion согласованную оплату обычно показывают gross как revenue, а supplier component — отдельно по применимой cost policy.
- **Agent** организует предоставление specified good/service другой стороной; при такой conclusion revenue обычно равен net fee или commission.
- **Control** здесь означает способность направлять использование и получать существенные benefits до transfer, а не наличие API, invoice или product label.

```text
Что entity обещала customer?
  → какой specified good/service передаётся?
  → контролировала ли entity его до transfer?
      principal conclusion → обычно gross revenue presentation
      agent conclusion     → обычно net fee/commission presentation
```

`Primary responsibility`, `inventory risk` и `pricing discretion` могут служить evidence, но не образуют механический score. Conclusion делается для конкретной promise и transaction: одна AdTech-компания может быть principal в одном flow и agent в другом.

### Одинаковая transaction economics, две взаимоисключающие presentations

Возьмём только network boundary `$100 sell / $80 supplier component`. Таблица иллюстративная; в реальной отчётности нельзя выбрать presentation ради более красивой margin.

| Иллюстративная conclusion | Recognized revenue | Supplier component как cost of revenue | Gross profit до прочих CoR | Gross margin до прочих CoR |
|---|---:|---:|---:|---:|
| Principal / gross | `$100` | `$80` | `$20` | `20%` |
| Agent / net | `$20` fee | `$80` исключён из revenue и matching cost | `$20` | `100%` |

**Cost of revenue (CoR)** — расходы, которые reporting entity классифицирует как непосредственно связанные с получением признанного revenue по своей policy. Это не любой cash outflow. **Gross profit** и **gross margin** считаются на одной entity и одной accounting basis:

```text
gross profit = recognized revenue − cost of revenue
gross margin = (recognized revenue − cost of revenue) / recognized revenue
```

В net row `100%` — механический результат учебной изоляции: `$20 recognized revenue`, `$0` прочих показанных cost-of-revenue и `$20 gross profit`. Это не benchmark, не прогноз и не утверждение, что platform работает бесплатно. Реальная entity несёт infrastructure, data, operations и другие расходы; часть из них может относиться к cost of revenue по её policy. Operating expenses, interest и taxes находятся ниже gross profit и тоже не превращают retained amount в profit.

На срезе 2026-08-28 публичные filings показывают contract-specific nature этой границы:

- Magnite в Form 10-K за 2025 год описывала net presentation большинства platform transactions и gross presentation некоторых insertion-order campaigns при разных principal-agent conclusions.
- The Trade Desk в Form 10-K за 2025 год отделяла gross billings и связанные receivables/payables от net recognized revenue при agent conclusion по Supplier Components.

Это примеры policies конкретных компаний и периода, не универсальная классификация SSP или DSP. ASC 606, IFRS 15, договор и профессиональное accounting judgment определяют реальный вывод; глава даёт mental model, а не accounting advice.

## Arbitrage: spread в обмен на принятый риск

**Arbitrage** в широком AdTech-смысле возникает, когда intermediary покупает media/traffic дешевле и продаёт дороже либо покупает на одной pricing basis, а продаёт на другой. Его economics зависят от spread и риска между boundaries.

Простой вариант:

```text
network покупает batch media за $80
network продаёт тот же agreed scope advertiser за $100
buy/sell spread = $20
```

Если network обязалась заплатить downstream `$80`, но не продала весь согласованный scope или customer не принял delivery, spread может уменьшиться или стать loss. Она принимает inventory/volume, fulfillment и reconciliation risk в объёме, заданном contracts.

**Basis mismatch** добавляет performance risk. Intermediary может покупать impressions по CPM, а продавать clicks или actions по CPC/CPA. Его revenue тогда зависит от realised CTR/CVR и validation. Если clicks или actions возникают хуже ожиданий, исходная media cost остаётся, а downstream billable amount не покрывает её.

Не любой intermediary fee является arbitrage, и arbitrage не автоматически означает злоупотребление. Прозрачные fee, revenue share или resale spread могут оплачивать aggregation, reach, service и принятый риск. Проблема opacity возникает, когда customer не понимает buy/sell basis, величину spread, функцию посредника или конфликт incentives. Исследование CMA 2020 года иллюстрирует этот механизм в UK open display, но его rates нельзя использовать как current benchmark 2026 года.

## Путь учебных `$100` от advertiser до publisher

Соберём слои в одном scenario. Subscription-app advertiser покупает media в mobile publisher app через managed network и SSP. Все числа **учебные**, не market benchmark и не заявление о типичной длине цепочки.

Assumptions:

- 10,000 одинаковых qualifying billable impressions нужны только для изоляции economics;
- advertiser/network договор использует `$10 CPM`, network/SSP — `$8 CPM`;
- SSP/publisher договор делит `$80` proceeds: 15% SSP, 85% publisher;
- валюта — USD; taxes, FX, refunds, rebates, fraud adjustments и credit risk исключены;
- amounts accrued после reconciliation, но invoices и cash ещё не settled;
- отдельные `$2,000/month` SaaS из sidecar в media flow не входят.

### Contract arithmetic

```text
Advertiser → network: 10,000 / 1,000 × $10 CPM = $100
Network → SSP:        10,000 / 1,000 ×  $8 CPM =  $80
Network spread:                                 =  $20
SSP retained share:             15% × $80       =  $12
Publisher payout:               85% × $80       =  $68
Check:                         $20 + $12 + $68   = $100
```

На одном исходном рекламном долларе contract economics составляют 20 центов retained network, 12 центов retained SSP и 68 центов publisher payout. В полном примере intermediary retained amount равен `$20 + $12 = $32`. Это разложение конкретных contracts, не отраслевой benchmark и не accounting profit.

### Denominators

```text
network markup on acquisition cost = $20 / $80  = 25%
network take on advertiser spend    = $20 / $100 = 20%
SSP take on its boundary            = $12 / $80  = 15%
SSP share of original spend         = $12 / $100 = 12%
combined intermediary share         = $32 / $100 = 32%
publisher payout share              = $68 / $100 = 68%
```

Каждая строка называет numerator и denominator. Поэтому `SSP take = 15%` и `SSP share of original spend = 12%` одновременно верны, но отвечают на разные вопросы.

### Participant ledgers

| Entity | Contract/billable basis | Inflow/receivable view | Outflow/payable view | Economic remainder | Чего запись не доказывает |
|---|---|---:|---:|---:|---|
| Advertiser | `$10 CPM` × 10,000 | — | `$100` advertiser spend/media cost | — | Invoice date, cash date или business return |
| Managed network | Customer charge `$100`; downstream `$8 CPM` | `$100` billed/receivable | `$80` downstream media cost/payable | `$20` spread | Что `$100` — recognized revenue или `$20` — profit |
| SSP | Revenue-share base `$80` | `$80` boundary proceeds/receivable | `$68` publisher payout/payable | `$12` retained amount | Что `$80` — recognized revenue или 15% относится к `$100` |
| Publisher | 85% of SSP-boundary proceeds | `$68` payout receivable | — | `$68` publisher economics | Что amount уже settled cash или как именно признан revenue |

Для advertiser `$100` — spend. Для network `$80` — media cost. Для SSP `$68` — publisher payable. Для publisher те же `$68` — receivable. Labels меняются не из-за несогласованности, а из-за разных reporting entities и counterparties.

`Transaction amount`, `retained amount`, `recognized revenue`, `gross profit`, `gross margin`, `invoice` и `cash` отвечают на разные вопросы:

| Термин | Что сообщает |
|---|---|
| Transaction amount | Сколько начислено на конкретной contract boundary |
| Retained amount | Какая часть flow остаётся у participant до его собственных costs |
| Recognized revenue | Что reporting entity отражает как revenue по accounting policy |

| Gross profit | Сколько осталось от recognized revenue после cost of revenue той же entity |
| Gross margin | Какую долю recognized revenue составляет gross profit на той же accounting basis |
| Invoice | Какой receivable/payable формально предъявлен counterparty; не доказывает ни revenue presentation, ни оплату |
| Cash | Какое обязательство фактически settled и когда; не доказывает retained amount или profit |

### Operational checklist анализа vendor economics

1. Назовите customer, payer, payee, counterparties и обещанный product/service.
2. Зафиксируйте contractual pricing basis, qualifying billable event, rate, validation owner и billable amount. Отдельно запишите optimization target и realised metrics.
3. Нарисуйте ledgers участников: где находятся advertiser spend, media cost, publisher payout, receivable и payable.
4. Для каждой fee или доли укажите абсолютную сумму, numerator, denominator, boundary и допустимые adjustments. Отделите media money от fixed/SaaS charge.
5. Проверьте accounting policy для конкретного transaction type: specified good/service, principal/agent conclusion, recognized revenue и cost of revenue. Затем считайте gross profit и gross margin.
6. Поставьте на timeline accrual, reconciliation, invoice и cash settlement. Не выводите accounting presentation из invoice owner или направления платежа.

## С чем это часто путают

- **Pricing model, optimization target и realised metric — не одно и то же.** `Target CPA` может управлять bids при CPC billing, а observed CPA вычисляться только после периода.
- **Auction win не обязательно является billable event.** Charge возникает после события и validation, заданных договором; win notice и billing notice могут быть разными signals.
- **Более глубокий billable event не устраняет риск.** При CPM advertiser несёт post-impression risk; при CPC payee принимает impression-to-click risk; при CPA/CPI/CPL advertiser всё ещё отвечает за quality, retention и monetization результата.
- **Revenue share без базы не определён.** SSP share `15%` от `$80` означает `$12`; относительно исходного `$100` это 12%.
- **Markup и take rate не противоречат друг другу.** Один spread `$20` даёт `25% markup` на cost `$80` и `20% take rate` на spend `$100`.
- **Spend, media cost и publisher payout не являются aliases.** Это labels разных participant ledgers и boundaries.
- **Gross/net revenue — не «до/после расходов».** Presentation следует contract-specific principal-agent assessment; invoice и gross billings сами по себе вывод не определяют.
- **Retained amount, recognized revenue, gross profit и cash — разные величины.** Они отвечают соответственно на transaction, accounting, profitability и settlement questions.
- **Gross margin не равна take rate.** Первая использует recognized revenue и cost of revenue одной reporting entity; вторая — retained amount и named transaction-flow denominator.
- **Любой посреднический доход не является arbitrage.** Arbitrage предполагает buy/sell spread или basis mismatch и соответствующий risk; прозрачная fee или revenue share могут оплачивать отдельную функцию.
- **Fixed fee и SaaS pricing не обязаны уменьшать media dollar.** Отдельный software/service contract образует отдельный money flow.

## Что важно запомнить

1. Экономика начинается с договора: pricing basis и billable event определяют charge и распределяют риск.
2. CPM, CPC, CPA, CPI и CPL могут называться одинаково в billing, bidding, optimization и reporting, но это разные слои.
3. Revenue share, markup и take rate становятся сравнимыми только после раскрытия numerator, denominator и participant boundary.
4. Один flow `$100 → $80 → $68` одновременно создаёт advertiser spend, media cost посредника и publisher payout.
5. Network retained `$20` и SSP retained `$12` описывают transaction economics, но не автоматически recognized revenue или profit.
6. Gross/net presentation определяется для specified good/service через principal-agent assessment, а не product label компании.
7. Gross profit равен recognized revenue минус cost of revenue; gross margin делит этот результат на recognized revenue той же entity и basis.
8. Arbitrage может приносить spread, но intermediary принимает volume, performance или reconciliation risk и способен получить loss.
9. Event/data flow, participant ledgers, invoice flow и cash settlement нужно анализировать отдельно.
10. Учебное распределение `$20 + $12 + $68 = $100` показывает метод анализа, а не типичную рыночную долю.

## Проверьте себя

1. Advertiser оптимизирует campaign под `target CPA`, но платит за qualifying clicks. Какие здесь pricing basis, billable event, optimization target и realised metric?
2. Почему `$20 / $80 = 25%` и `$20 / $100 = 20%` могут одновременно правильно описывать economics network?
3. Может ли entity выставить invoice на `$100`, признать `$20 net revenue` и позднее получить `$100 cash` без противоречия? Какие слои описывает каждая сумма?
4. Какие contract, ledger, accounting и settlement данные нужны, прежде чем сравнивать gross margin и take rate двух AdTech vendors?

## Источники и дополнительное чтение

1. [IAB Tech Lab — Programmatic Auction Definitions, Final](https://github.com/InteractiveAdvertisingBureau/programmatic-auction-definitions/blob/main/auction%20definitions.md) и [OpenRTB 2.x Implementation Guidelines, sections 7.8–7.9](https://github.com/InteractiveAdvertisingBureau/openrtb2.x/blob/main/implementation.md) — definitions `Billable Event`, transaction ledger и distinction между `nurl` и `burl`; protocol guidance не заменяет договорную billing policy.
2. [Google Ads — CPC](https://support.google.com/google-ads/answer/116495?hl=en), [CPM](https://support.google.com/google-ads/answer/6310?hl=en) и [Bidding basics](https://support.google.com/google-ads/answer/2459326?hl=en) — product-specific примеры pricing и optimization; это не vendor-neutral contract.
3. [FASB — Revenue from Contracts with Customers, Topic 606, paragraphs 606-10-55-36–55-40](https://asc.fasb.org/layoutComponents/getPdf?fileName=GUID-E90460CF-B750-4654-B149-5DD3F6B6DBA9.pdf&isSitesBucket=false) и [IASB — IFRS 15 PIR: Principal versus Agent Considerations, AP6B](https://www.ifrs.org/content/dam/ifrs/meetings/2024/february/iasb/ap6b-ifrs-15-pir-principal-vs-agent-considerations.pdf) — principal-agent mental model; применение зависит от reporting framework, договора и professional judgment.
4. [FASB — GAAP Taxonomy Implementation Guide: Revenue from Contracts with Customers](https://xbrl.fasb.org/impguidance/Rev2_TIG/revenue_2.pdf) — gross profit как difference между revenue и cost of revenue/cost of goods sold; состав cost of revenue остаётся company-specific.
5. [Magnite — Form 10-K за год, завершившийся 2025-12-31](https://www.sec.gov/Archives/edgar/data/1595974/000159597426000007/mgni-20251231.htm) — company-specific примеры percentage, fixed CPM/monthly pricing и разных gross/net presentations; не отраслевой benchmark.
6. [The Trade Desk — Form 10-K за год, завершившийся 2025-12-31](https://www.sec.gov/Archives/edgar/data/1671933/000167193326000014/ttd-20251231.htm) — distinction между platform fee, gross billings, receivables/payables и net revenue; выводы относятся к contracts и policy этой компании.
7. [UK Competition and Markets Authority — Appendix M: Intermediation in open display advertising](https://assets.publishing.service.gov.uk/media/5fe495c28fa8f56afaf406d4/Appendix_M_-_intermediation_in_open_display_advertising_WEB.pdf) и [official landing page](https://www.gov.uk/find-digital-market-research/online-platforms-and-digital-advertising-market-study-appendix-m-intermediation-in-open-display-advertising-2020-cma) — исторический анализ UK open display 2020 года; описывает mechanism arbitrage и fee opacity, но его rates нельзя использовать как current benchmark 2026 года.