# Цель обучения

После главы читатель должен уметь восстановить causal measurement funnel одной campaign от `ad opportunity` и технических `request` до зарегистрированных `impression`, `click`, `conversion` и бизнес-ценности; для каждой метрики назвать событие, numerator, denominator, временной и системный scope; рассчитать и правильно интерпретировать delivery-, performance-, monetization- и return-метрики с позиций advertiser, publisher и platform; объяснить, почему одинаковые названия и одна campaign дают разные числа без автоматического вывода, что один из отчётов ошибочен.

# Границы главы

## Входит в главу

- Метрика как контракт измерения, а не только формула: `event definition + measurement point + filters/deduplication + numerator/denominator + dimensions + time window + currency + perspective`.
- Причинная модель measurement funnel:

```text
publisher surface
  → ad opportunity
  → один или несколько request / bid request
  → response / bid / win
  → served response
  → rendered impression
  → measurable → viewable impression
  → click
  → advertiser-defined conversion
  → attributed revenue / customer value
```

- Явная оговорка к funnel: это карта measurement points, а не универсальная строго убывающая последовательность. Fan-out, retries, multi-slot/video pods, несколько clicks или conversions, deduplication, filters и разные time windows могут нарушать простое `каждый следующий count ≤ предыдущего`.
- `Request` и `opportunity` как разные уровни: opportunity возникает в media surface; request — техническое сообщение конкретной системе. Одна opportunity может не породить request, породить несколько downstream requests или быть частью batched request.
- `Impression` как зарегистрированное событие по правилам конкретной системы; отдельные `served`, `rendered` и `viewable impression`, а также `measurable/non-measurable` как нужный мост к корректной viewability mental model.
- Audience-метрики `reach` и `frequency`: unique entity, de-duplication, reporting period, population/universe и identity/coverage limitation.
- Interaction/outcome-метрики `click`, `CTR`, `conversion`, `CVR`; явное именование denominator для CVR и distinction между observed/attributed conversion и причинным эффектом рекламы.
- Нормализация стоимости и результата: `CPM`, `eCPM`, `CPC`, `CPA`, `CPI`, `CPL`, `CAC`; различие pricing label/bid и фактической средней метрики.
- Денежные величины `revenue`, `spend`, `cost` и return-метрики `ROAS`, `ROI`; одна и та же сумма меняет название относительно ledger boundary и участника.
- User-value metrics `ARPU`, `ARPPU`, `LTV` с обязательными cohort, horizon, user definition и revenue/profit basis.
- Supply/auction health: `fill rate` и `win rate`, их разные stages и product-specific denominators.
- Три перспективы одной campaign: advertiser оценивает outcome и acquisition efficiency; publisher — monetization и delivery; platform — доступный ей auction/delivery boundary и собственные spend/revenue/cost.
- Компактные формулы и один согласованный числовой walkthrough; точность важнее попытки объявить один vendor-neutral dashboard schema.

## Не входит в главу

- Повторное объяснение ролей advertiser, publisher, agency, DSP, SSP, exchange, ad server, MMP и verification provider, а также полного data/money flow — это уже сделано в главе 2. Здесь роли используются только как measurement perspectives.
- Pricing contracts, revenue share, fixed/SaaS fee, markup, take rate, gross/net revenue, gross margin, arbitrage и путь `$100` до publisher — глава 4. В главе 3 нужны определения, формулы и perspective boundaries, но не экономика договоров.
- Campaign hierarchy, objectives, bidding, budget, pacing и optimization mechanics — главы 5–7. Здесь метрики оценивают результат, но не раскрывают настройку campaign.
- Publisher yield strategy, mediation, header bidding и способы увеличения fill/eCPM — главы 10 и 14. Здесь только базовый смысл и denominator метрик.
- Ad-serving internals, порядок выбора line items, billing triggers и impression tracking implementation — глава 11.
- OpenRTB payloads, auction topology, bidstream fan-out, clearing price и transaction mechanics — главы 15–20. Здесь допустим только маленький conceptual flow, достаточный для различия request/opportunity/win.
- Tracking redirects, event IDs, postbacks, attribution models/windows и identity resolution — главы 21–29. Здесь conversion и attributed value объясняются как входы в метрики, не как технически решённая attribution-задача.
- Полный analytics stack, cohort modeling, retention/churn models и predictive LTV — главы 30–34. Здесь нужны рабочие определения ARPU/ARPPU/LTV и их ограничения.
- Детальный discrepancy taxonomy и reconciliation — глава 32. Здесь только фундаментальная причина разных чисел: разные measurement boundaries, definitions и perspectives.
- Invalid traffic, fraud filtration и audit implementation — глава 36; глубокие viewability standards, OM SDK/OMID, attention и verification — глава 37. В этой главе дать точную минимальную distinction `served/rendered/viewable` и датированные standard caveats.
- Incrementality, experiments, causal inference, MMM и доказательство causal lift — отдельные поздние темы. Здесь обязательно сказать, что attribution и ROAS не доказывают causality.

# Результаты исследования

- Research проведён на 2026-08-27. В definitions нет одного универсального «словаря dashboard»: standards задают measurement quality и disclosure, а products выбирают собственные eligible populations, event points и labels. Автор должен приучить читателя сначала читать metric contract, затем число.
- **`Opportunity` не равна `request`.** Финальные IAB Tech Lab Programmatic Auction Definitions от 2026-06-24 определяют `Ad Request` как информацию об impression, выставляемом на auction, и описывают buying platforms, оценивающие impression opportunities. OpenRTB 2.6 показывает отдельную protocol boundary: один `BidRequest` содержит один или несколько `Imp` objects; supply path может разослать downstream bid requests нескольким bidders. Поэтому HTTP/request count нельзя использовать как безусловный proxy числа user-facing opportunities.
- **`Win` не равен billable impression.** OpenRTB различает win notice, сообщающий bidder об auction success, и billing notice, указывающий момент, когда следует применить spend; конкретная billing policy может зависеть от device delivery, viewability или других правил. Это объясняет, почему `win rate`, impressions и spend могут относиться к разным event points.
- **Impression — определённое measurement event, а не доказательство внимания.** MRC Desktop Display Impression Measurement Guidelines, обновлённые в 2017 году, требуют для квалифицированного client-side count, чтобы creative был загружен и как минимум начал render. MRC Viewable Ad Impression Measurement Guidelines v2.0, обновлённые в 2015 году, требуют, чтобы viewable impression происходил из valid rendered served impression. В chapter plan следует разделить: server/response-level `served`, device/client-level `rendered`, и `viewable`, прошедший geometry/time criteria.
- **Классические thresholds требуют датированного context.** MRC Digital Audience-Based Measurement Standard (2017) приводит минимум 50% pixels на протяжении 1 continuous second для display и 2 continuous seconds для video. На 2026-08-27 MRC по-прежнему перечисляет отдельно Viewable Guidelines (2014/updated 2015), Mobile Viewable Guidelines (2016), Digital Video Guidelines (updated 2018), OTT/CTV/SSAI Guidelines (2021), In-Game Guidelines (updated 2022) и AR Guidelines (2024). Автор может дать классический benchmark, но не называть его универсальным правилом для любого format/environment/use case; deep treatment остаётся главе 37.
- **`Viewable` означает standardized opportunity to see, не факт человеческого внимания.** Нужны три состояния для eligible impressions: measurable and viewable, measurable but non-viewable, non-measurable/undetermined. Делить viewable только на все served impressions без disclosure measurability может отвечать на другой вопрос, чем `viewable / measurable`.
- **Reach и frequency зависят от identity и периода.** MRC Digital Audience-Based Standard (2017) для digital audience measurement использует viewable impressions: reach — de-duplicated users/homes/audience с хотя бы одной qualifying exposure за заданный период; frequency — qualifying impressions на reached unique entity. Product dashboards могут применять другой impression basis, device-based uniques или modeling. Поэтому обязательно подписывать `person/device/household`, de-dup scope, universe и reporting period.
- **Click имеет несколько measurement points.** IAB/MRC Click Measurement Guidelines v1.0 выпущены в 2009 году и всё ещё перечислены MRC на current standards page. Они различают user-initiated click, measured click, received click и resolved click; HTTP redirect — типичный, но не единственный современный flow. Источник полезен как действующий measurement baseline с legacy browser-centric wording, а не как описание всех 2026 app/platform interactions.
- **CTR прост по формуле, но не по данным.** Google Ads определяет `CTR = clicks / impressions`; Google Ad Manager показывает, что даже внутри одного product family разные CTR columns могут быть несопоставимы из-за разных event populations. Автор должен связать CTR с явно выбранными click/impression definitions и не интерпретировать высокий CTR как conversion, quality или incrementality сам по себе.
- **CVR не имеет безопасного denominator без label.** Google Ads определяет conversion rate как conversions на trackable ad interactions; при настройке count `Every` и нескольких conversion actions CVR может превышать 100%. В индустрии встречаются `click-to-conversion`, `install-to-purchase`, `lead-to-sale` и impression-based variants. Базовая запись главы: `CVR = conversions / явно названные eligible precursor events`.
- **Conversion задаётся business goal и measurement rules.** MRC Outcomes and Data Quality Standards (2022) рассматривают conversion как derivative outcome, связанный с campaign goal, и отдельно описывают attribution credit. Наличие attributed conversion не доказывает, что реклама была причиной outcome; counts меняются с attribution rules, windows, filters и late-arriving data.
- **CPM и eCPM отвечают на разные вопросы.** `CPM` может обозначать pricing basis, bid/rate или observed advertiser cost per 1,000 counted impressions. `eCPM` нормализует фактически признанный revenue на 1,000 impressions и позволяет publisher сравнивать demand с разными underlying CPC/CPA/CPM mechanics. Формулы могут выглядеть симметрично, но numerator принадлежит разным ledger perspectives: `cost/spend` против `revenue`.
- **CPC/CPA/CPI/CPL — семейство unit metrics.** Для фактической средней метрики общий шаблон: `recognized cost / qualifying events`; событие нужно назвать. Label одновременно может использоваться для pricing model или bid target. `CPA` не следует автоматически читать как new-customer acquisition: action может быть trial, order, lead или другое событие.
- **CAC шире ad-platform CPA.** Рабочая формула: `allocated acquisition costs / new customers`. В numerator могут входить media, agency, sales и onboarding costs; customer definition и allocation policy принадлежат бизнесу. Поэтому CAC нельзя выводить из platform CPA без согласования cost scope и customer event.
- **Revenue, spend и cost относительны участнику и accounting boundary.** Advertiser видит media spend/cost; seller или platform может видеть эту сумму как revenue; publisher видит собственный recognized revenue; platform также имеет downstream media/traffic cost. В главе 3 показать label transformation, но gross/net, take rate и settlement оставить главе 4.
- **ROAS не равен ROI.** Current Google Ads/Analytics documentation определяет ROAS как conversion value или revenue, делённые на ad spend/ad cost. ROI относится к net profit и total relevant investment/cost; точный business formula зависит от включённых costs. ROAS может быть высоким при отрицательной прибыли и остаётся attribution-dependent, а не causal proof.
- **ARPU и ARPPU требуют named denominator и revenue scope.** Google Analytics Data API на 2026-08-27 определяет ARPU как total revenue per active user, включая purchase, subscription и ad revenue, а ARPPU — purchase revenue per active user, logged purchase. Это product-specific definitions: в другой компании `user`, `paying`, refunds, taxes и revenue categories могут определяться иначе. Главное distinction: ARPU включает non-paying users выбранной population, ARPPU — только payers.
- **LTV всегда имеет cohort/horizon/model contract.** GA4 User Lifetime объединяет lifetime interactions и может показывать total, average и percentiles; identity method и sampling влияют на результат. В course plan различить observed cumulative LTV и predicted LTV, revenue LTV и contribution/profit LTV. Не давать «вечную ценность пользователя» как известный scalar без горизонта и assumptions.
- **Fill rate — publisher/ad-server metric с неоднозначным denominator.** Current Google Ad Manager sell-through documentation использует `Total impressions / Total ad requests`; для optimized video pods requests/unfilled units частично выводятся из duration и configured ad opportunity duration. Другие product metrics используют returned responses или matched requests. Значит, `fill rate` нужно читать вместе с request/opportunity unit, response-vs-impression numerator, format и stage.
- **Win rate — auction metric, не fill rate со стороны buyer.** В legacy Google Ad Manager Reports metrics `Deals win rate = winning bids / bids`; рядом есть bid rate `bids / bid requests`. Этот Reports tool deactivated в июне 2026 года, поэтому страницу использовать только как датированный официальный пример denominator, а не как current UI instruction. В vendor-neutral тексте требовать явное `wins / submitted bids` либо другое раскрытое определение.
- **Одна campaign закономерно выглядит по-разному.** Publisher агрегирует все demand sources и считает opportunities, fill, impressions, eCPM и publisher revenue; advertiser видит купленную им subset и связывает её с conversions/value; DSP/SSP/ad server видят только traversed events и применяют собственные filters, clocks, currency и billing rules. До chapter 35 достаточно научить задавать семь вопросов: `кто считает? что считается? где? когда? после каких filters? в каком denominator? чьи деньги?`.

# Терминология

## Уже ожидается

- HTTP request/response, API, JSON, event, identifier, timestamp, client/server, retry, fan-out, batch, async processing, deduplication, aggregation, ratio, percentage, cohort и currency conversion как общие engineering concepts.
- Advertiser, publisher, user, agency/media buyer, DSP, SSP, exchange, ad network, ad server, MMP/attribution и verification roles из главы 2.
- Demand/supply, advertising inventory, placement, campaign, creative, ad opportunity и impression на обзорном уровне.
- Раздельные delivery, data, money, invoice и settlement flows; advertiser spend, intermediary fee и publisher revenue как разные верхнеуровневые денежные понятия.
- Attribution на уровне идеи «назначить conversion credit доступному advertising source» и limitation `attribution ≠ causality`; детали заранее не ожидаются.

## Вводится здесь

- **Metric contract** — полное определение числа: event/measurement point, numerator, denominator, filters и de-duplication, dimensions, reporting/attribution window, currency и perspective.
- **Count, rate, unit/effective metric, return metric** — абсолютное число событий; доля одного count в другом; нормализованная стоимость/выручка на единицу; отношение результата к вложению.
- **Measurement boundary / perspective** — участок flow и ledger, доступный конкретному advertiser, publisher или platform; определяет наблюдаемые events и смысл money fields.
- **Ad opportunity** — конкретная возможность показать рекламу в media surface; может существовать до network request и не обязана соответствовать request один-к-одному.
- **Request / ad request / bid request** — техническое сообщение конкретной системе с запросом decision/ad/bid; counts зависят от protocol boundary, batching, retries и fan-out.
- **Impression** — зарегистрированное рекламное событие по раскрытому measurement rule; слово без qualifier не гарантирует render, viewability или внимание.
- **Served impression / response served** — server/platform зарегистрировал выдачу ad response/code/creative instruction; точный trigger product-specific.
- **Rendered impression** — client/device начал отображать creative по applicable rule; не означает viewability.
- **Measurable / non-measurable impression** — viewability tool смог или не смог определить exposure conditions.
- **Viewable impression** — rendered served impression, выполнивший applicable geometry/time criteria; standardized opportunity to see, не доказанный человеческий просмотр или attention.
- **Reach** — de-duplicated count либо доля заданной population, получившей хотя бы одну qualifying exposure за период.
- **Frequency** — среднее число qualifying exposures на reached unique entity за период; entity и impression basis должны быть названы.
- **Click** — qualifying user-initiated interaction; measured, received и resolved measurement points могут расходиться.
- **CTR (Click-Through Rate)** — `clicks / impressions × 100%` для явно определённых click и impression populations.
- **Conversion** — advertiser-defined valuable action/outcome, засчитанный по measurement и attribution rules.
- **CVR (Conversion Rate)** — `conversions / declared eligible precursor events × 100%`; denominator нельзя подразумевать.
- **CPM (Cost per Mille)** — pricing/rate/bid либо observed `cost or spend / impressions × 1000`; контекст должен уточнить смысл.
- **eCPM (effective CPM)** — normalized realized `revenue / impressions × 1000`, обычно publisher/seller perspective; impression и revenue scope обязательны.
- **CPC / CPA / CPI / CPL** — фактические `cost / clicks`, `cost / actions`, `cost / installs`, `cost / leads` либо соответствующие pricing/target labels.
- **CAC (Customer Acquisition Cost)** — `allocated acquisition costs / new customers`; broader business metric, не автоматический alias CPA.
- **Revenue / spend / cost** — признанная выручка; расходы buyer; стоимость/затраты выбранного участника. Label зависит от entity и ledger boundary.
- **ROAS (Return on Ad Spend)** — `attributed conversion value or revenue / ad spend`; media-efficiency ratio без полной profit model.
- **ROI (Return on Investment)** — `net profit / total relevant investment cost`, эквивалентно `(return − total cost) / total cost` при согласованных definitions.
- **ARPU / ARPPU** — revenue на всех users выбранной population и purchase revenue на paying users соответственно; period и user/revenue definitions обязательны.
- **LTV (Lifetime Value)** — observed или predicted cumulative revenue/contribution одного user/customer/cohort на заданном horizon и model basis.
- **Fill rate** — доля eligible requests/opportunities, завершившихся выбранным fill event; стандартная для конкретного product формула должна быть подписана.
- **Bid rate / win rate** — `submitted bids / received eligible bid requests` и `wins / submitted eligible bids` в одном распространённом contract; vendor definitions могут менять denominator.

# Предлагаемая структура главы

1. **Почему число без определения ничего не говорит**
   - Цель: начать с проблемы — одна campaign проходит через несколько систем, каждая наблюдает свой участок и строит агрегаты для своего решения.
   - Обязательные concepts: count, rate, unit metric, return metric; metric contract; measurement boundary; numerator/denominator; event time vs reporting time; filters, deduplication, dimensions, currency.
   - Иллюстрация: карточка чтения dashboard column:

```text
Кто считает?                  advertiser / publisher / platform
Что за event и measurement point?
Numerator / denominator?
Какие filters и deduplication?
Какой period/window и dimensions?
Какая currency и чьи деньги?
```

   - Причинный переход: сначала определить наблюдаемые stages, затем считать ratios и деньги.
   - Покрывает основу для всех requirements; substantive coverage распределено по разделам 2–8.

2. **От opportunity до возможного exposure**
   - Цель: отделить market/media event от protocol messages и от разных уровней impression measurement.
   - Обязательные concepts: placement context → opportunity → request(s) → response/win → served → rendered → measurable/viewable; request fan-out/batching/retry; impression as measurement rule.
   - Flow diagram: один publisher opportunity создаёт request publisher ad server; тот может вызвать несколько demand requests; выбранный response ещё не гарантирует render; render ещё не гарантирует viewability.
   - Сравнительная таблица: `stage → кто обычно наблюдает → минимальное доказательство → чего stage не доказывает`.
   - Viewability box: классические MRC display/video thresholds с датами и format/environment caveat; отдельные non-measurable impressions; `viewable ≠ attention`.
   - Audience extension: reach как de-duplicated qualifying audience; frequency как qualifying impressions/reached entity; person/device/household, period и universe labels.
   - Покрывает: 3.1–3.5.

3. **От exposure к реакции и outcome**
   - Цель: показать, как из event counts появляются performance rates и почему denominator является частью названия.
   - Обязательные concepts: initiated/measured/received/resolved click; `CTR = clicks / impressions`; advertiser-defined conversion; attributed/observed conversion; `CVR = conversions / named eligible events`; multiple conversions per interaction.
   - Небольшой HTTP illustration, только для measurement points:

```text
user click → click tracker / redirect → advertiser landing page
             measured click             received/resolved click
```

   - Таблица CVR variants: click→install, install→trial, click→purchase; запрет писать голое `CVR` при сравнении разных funnels.
   - Caveat: conversion credit зависит от rules/windows; outcome count и ROAS не доказывают incrementality.
   - Покрывает: 3.6–3.9.

4. **Нормализованная цена события: CPM, eCPM и cost-per-X**
   - Цель: вывести семейство формул из общей задачи — сравнить разный объём activity на общей единице — и сразу разделить buyer/seller perspectives.
   - Обязательные formulas:

```text
observed CPM = advertiser cost or spend / counted impressions × 1000
eCPM         = recognized publisher/platform revenue / counted impressions × 1000
CPC          = cost / qualifying clicks
CPA          = cost / qualifying actions
CPI          = cost / qualifying installs
CPL          = cost / qualifying leads
CAC          = allocated acquisition costs / new customers
```

   - Сравнительная таблица: `metric → numerator owner → event denominator → typical decision → common ambiguity`.
   - Явные distinctions: CPM pricing/bid vs average realized CPM; CPM vs eCPM; CPA action vs CAC customer; CPC/CPA/CPI/CPL как pricing labels и как post-fact averages.
   - Scope guard: не объяснять revenue share, markup, take rate или settlement.
   - Покрывает: 3.10–3.16.

5. **Чьи деньги и какой return**
   - Цель: не позволить одинаковому currency field стереть perspective и затем корректно разделить media return и business profitability.
   - Обязательные concepts: advertiser spend, advertiser/platform cost, seller/platform/publisher revenue; recognized vs estimated; currency/time-zone/refund scope на обзорном уровне.
   - Money-label diagram:

```text
advertiser: spend / media cost
        → selling or buying platform: revenue на одной boundary,
          downstream media cost на другой boundary
        → publisher: recognized publisher revenue
```

   - Формулы и comparison:

```text
ROAS = attributed conversion value or revenue / ad spend
ROI  = net profit / total relevant investment cost
```

   - Пример: ROAS может быть `5.0x`, но после cost of goods/service, platform/agency и operating costs ROI может быть намного ниже или отрицательным.
   - Scope guard: не разбирать gross/net accounting и распределение `$100`; направить в главу 4.
   - Покрывает: 3.17–3.20.

6. **Ценность user во времени: ARPU, ARPPU и LTV**
   - Цель: связать acquisition metrics с monetization продукта, не превращая главу в product analytics или predictive modeling.
   - Обязательные concepts: all active/eligible users vs payers; cohort и period; purchase/subscription/ad revenue scope; refunds; observed cumulative vs predicted LTV; revenue vs contribution LTV.
   - Мини-таблица: `ARPU` отвечает «сколько revenue приходится на всю user population за period», `ARPPU` — «сколько purchase revenue приходится на payer», `LTV` — «сколько value накоплено/ожидается за horizon».
   - Числовой example: 1,000 active users, 100 payers, `$1,000` recognized monthly revenue → ARPU `$1`, ARPPU `$10`; это не LTV без cohort/horizon.
   - Покрывает: 3.21–3.22.

7. **Где теряется monetization: fill rate и win rate**
   - Цель: поставить две похожие ratio metrics на разные stages и perspectives.
   - Обязательные concepts:

```text
publisher/ad-server example:
fill rate = counted filled impressions / eligible ad requests

buyer/deal example:
bid rate = submitted bids / eligible bid requests
win rate = winning bids / submitted eligible bids
```

   - Таблица: `metric → stage → numerator → denominator → owner → почему не complement другой metric`.
   - Edge cases: matched response без impression; auction win без billing; no-bid/filtering; downstream auction; video pod duration/inferred opportunities; product-specific `match rate`, `delivery rate` и `fill rate` labels.
   - Current/legacy note: Google Ad Manager sell-through formula current на дату research; old Reports win-rate column deactivated June 2026 и служит только denominator example.
   - Покрывает: 3.23–3.24.

8. **Одна campaign, три правдивых отчёта**
   - Цель: синтезировать funnel, formulas и money labels через advertiser/publisher/platform perspectives.
   - Числовой walkthrough для advertiser subset: `8,000` counted impressions, `$96` spend, `160` clicks, `24` attributed subscriptions, `$480` attributed conversion value:

```text
CTR  = 160 / 8,000 = 2%
CPM  = 96 / 8,000 × 1000 = $12
CPC  = 96 / 160 = $0.60
CVR  = 24 / 160 = 15%       (явно click→subscription)
CPA  = 96 / 24 = $4
ROAS = 480 / 96 = 5.0x
```

   - Publisher view того же period: все buyers, `100,000` eligible ad requests, `80,000` counted impressions, `$800` recognized revenue → fill rate `80%`, eCPM `$10`; эти totals не обязаны равняться advertiser subset.
   - Platform view: `60,000` eligible bid requests, `45,000` bids, `9,000` wins → bid rate `75%`, win rate `20%`; только `8,000` events стали counted/billable impressions по chosen contract.
   - Финальная comparison table: `advertiser → outcomes/efficiency`, `publisher → delivery/monetization`, `platform → auction/serving boundary`; рядом семь diagnostic questions из раздела 1.
   - Обязательная caveat: согласованность arithmetic внутри каждого metric contract не доказывает согласованность raw events между системами; detailed reconciliation — глава 35.
   - Покрывает: 3.25; закрепляет 3.1–3.24 без второго глоссария.

# Ключевые примеры

1. **Subscription app advertiser в mobile game publisher.** Один flow проходит от opportunity до request(s), served/rendered/viewable impression, click, install и subscription. Использовать согласованные числа раздела 8 для CTR, CVR, CPM, CPC, CPA и ROAS, затем показать separate publisher fill/eCPM и platform bid/win counts. Это главный пример perspectives и metric contracts, не OpenRTB walkthrough.
2. **Reach/frequency brand flight.** `60,000` qualifying viewable impressions распределены между `20,000` de-duplicated persons выбранной population за неделю: reach count `20,000`, average frequency `3`. Рядом показать, почему `20,000 device IDs`, `20,000 modeled persons` и `20,000 households` не взаимозаменяемы; reach percentage невозможен без universe/target denominator.
3. **Subscription cohort.** За месяц 1,000 active users создают `$1,000` выбранного revenue, из них 100 users платят: ARPU `$1`, ARPPU `$10`. Затем показать, что observed 30-day revenue per acquired cohort member и predicted 12-month contribution LTV — разные metrics даже при одном user set.

# Важные заблуждения

- **«Opportunity, ad request и bid request — один event».** Opportunity возникает в publisher surface; requests — system-bound messages. Между ними возможны batching, fan-out, retries и filtering.
- **«Impression означает, что человек увидел рекламу».** Impression следует конкретному counting rule; served, rendered и viewable — разные evidence levels, а viewable означает opportunity to see, не attention.
- **«Served → rendered → viewable всегда даёт строго убывающие totals в любых отчётах».** Такая вложенность возможна только при одном measurer, population, filters и period. Межсистемные counts нельзя упорядочивать без contract reconciliation.
- **«Non-viewable и non-measurable — одно».** В первом случае measurement succeeded и criteria не выполнены; во втором viewability status определить не удалось.
- **«Reach — число cookies/IDs, frequency — число impressions на всех users».** Reach требует stated unique entity и de-duplication; frequency делится на reached entities, а не автоматически на всю population.
- **«CTR и CVR имеют очевидный denominator».** CTR зависит от выбранного impression/click basis; CVR может означать click→conversion, install→purchase или другой transition. Denominator должен быть в label/definition.
- **«Conversion доказывает влияние рекламы».** Conversion — засчитанный outcome; attribution назначает credit. Causal lift требует incrementality evidence.
- **«CPM и eCPM — два названия одного числа».** CPM обычно выражает buyer cost/pricing на тысячу impressions; eCPM — seller/publisher realized revenue, нормализованный на тысячу impressions.
- **«CPC/CPA/CPI/CPL всегда говорят, как выставлен invoice».** Они могут быть billing model, bid/optimization target или post-fact average metric.
- **«CPA равен CAC».** CPA относится к определённому action и platform cost scope; CAC — к новым customers и broader acquisition cost allocation.
- **«Spend, cost и revenue можно копировать между колонками участников».** Сумма меняет экономический смысл относительно entity, contract и ledger boundary.
- **«ROAS — это прибыль и поэтому равен ROI».** ROAS сравнивает attributed value/revenue с ad spend; ROI использует net profit и полный выбранный investment cost.
- **«Высокий ROAS доказывает, что реклама создала revenue».** ROAS зависит от attribution и valuation; без causal design он не измеряет incrementality.
- **«ARPU, ARPPU и LTV отличаются только denominator».** ARPU/ARPPU обычно period metrics с разными populations/revenue scope; LTV добавляет cohort, horizon, observed/predicted status и value basis.
- **«Fill rate и win rate — одна metric с разных сторон auction».** Fill измеряет publisher/ad-server delivery относительно requests/opportunities; win rate измеряет auction wins относительно bids или другого явно заданного denominator.
- **«Funnel всегда сужается».** Один event может fan-out в requests; одна interaction может получить несколько conversions; filters, deduplication и windows меняют counts.
- **«Один campaign ID должен дать одинаковые numbers у advertiser, publisher и platform».** Участники видят разные subsets, clocks, filters, currencies, billing events и objectives.

# Coverage Matrix

| Требование | Планируемое место | Способ раскрытия |
|---|---|---|
| 3.1 | Раздел 2 «От opportunity до возможного exposure» | Сравнение media-level opportunity и system-bound request; causal flow, fan-out/batching/retry example и таблица measurement points |
| 3.2 | Раздел 2 «От opportunity до возможного exposure» | Определение impression как counted event по disclosed rule; связь с request/response и limitation `не равно просмотру` |
| 3.3 | Раздел 2 «От opportunity до возможного exposure» | Served/rendered/measurable/viewable ladder, MRC-dated criteria, state table и clarification `viewable ≠ attention` |
| 3.4 | Раздел 2 «От opportunity до возможного exposure» | Reach count/rate formulas, de-duplication, unique entity/universe/period labels и device-vs-person example |
| 3.5 | Раздел 2 «От opportunity до возможного exposure» | `qualifying impressions / reached unique entity`, average interpretation, period scope и reach/frequency numerical example |
| 3.6 | Раздел 3 «От exposure к реакции и outcome» | Click definition, initiated/measured/received/resolved stages и компактный redirect flow с abandonment caveat |
| 3.7 | Раздел 3 «От exposure к реакции и outcome» | `clicks / impressions × 100%`, worked calculation и denominator/comparability misconception clarification |
| 3.8 | Раздел 3 «От exposure к реакции и outcome» | Advertiser-defined valuable action, observed/attributed outcome distinction, multiple-action example и causality caveat |
| 3.9 | Раздел 3 «От exposure к реакции и outcome» | General formula with explicitly named precursor; click→install/install→purchase variants и >100% edge case |
| 3.10 | Раздел 4 «Нормализованная цена события» | CPM as pricing/bid/observed metric; `cost or spend / impressions × 1000`, buyer perspective и numerical example |
| 3.11 | Раздел 4 «Нормализованная цена события» | `recognized revenue / impressions × 1000`, publisher comparison across pricing models и explicit CPM/eCPM distinction |
| 3.12 | Раздел 4 «Нормализованная цена события» | `cost / qualifying clicks`, average-vs-bid/billing label distinction и main scenario calculation |
| 3.13 | Раздел 4 «Нормализованная цена события» | `cost / advertiser-defined actions`, action-definition requirement, pricing-vs-average distinction и CPA/CAC contrast |
| 3.14 | Раздел 4 «Нормализованная цена события» | `cost / qualifying installs`, mobile subscription-app example и caveat that install count depends on measurement/attribution rules |
| 3.15 | Раздел 4 «Нормализованная цена события» | `cost / qualifying leads`, lead-definition/quality limitation и distinction from customer acquisition |
| 3.16 | Раздел 4 «Нормализованная цена события» | `allocated acquisition costs / new customers`, numerator allocation table и substantive comparison with platform CPA |
| 3.17 | Раздел 5 «Чьи деньги и какой return» | Revenue definition relative to seller/platform/publisher ledger boundary; recognized/estimated and currency/period caveats |
| 3.18 | Раздел 5 «Чьи деньги и какой return» | Spend as buyer outflow vs cost at chosen entity; money-label diagram and handoff of fee/gross-net details to chapter 4 |
| 3.19 | Раздел 5 «Чьи деньги и какой return» | `attributed conversion value or revenue / ad spend`, `x`/percentage representation, worked example and attribution-not-causality caveat |
| 3.20 | Раздел 5 «Чьи деньги и какой return» | `net profit / total relevant investment cost`, side-by-side ROAS/ROI table and high-ROAS/negative-ROI example |
| 3.21 | Раздел 6 «Ценность user во времени» | ARPU/ARPPU formulas by all eligible users vs payers, current GA product example, revenue/user/period caveats and numerical comparison |
| 3.22 | Раздел 6 «Ценность user во времени» | Observed vs predicted and revenue vs contribution LTV; cohort/horizon/identity/model contract and subscription example |
| 3.23 | Раздел 7 «Где теряется monetization» | Fill-rate formula with named request/opportunity and impression/response event; publisher perspective, video-pod edge case and match/delivery-rate comparison |
| 3.24 | Раздел 7 «Где теряется monetization» | `wins / submitted eligible bids` common formula, bid-rate contrast, win-vs-billing distinction and dated Google example |
| 3.25 | Раздел 8 «Одна campaign, три правдивых отчёта» | End-to-end advertiser/publisher/platform tables, coherent calculations, boundary/filter/clock/currency explanation and seven-question reconciliation checklist |

# Источники

1. **[MRC — Standards & Guidelines](https://www.mediaratingcouncil.org/standards-and-guidelines).** Current index проверен 2026-08-27. Подтверждает status/dates отдельных документов: Click (2009), Viewable (2014, update 2015), Mobile Viewable (2016), Desktop Display (update 2017), Digital Video (update 2018), Digital Audience-Based (2017), OTT/CTV/SSAI (2021), Outcomes and Data Quality (2022), In-Game update (2022), AR (2024), Digital Advertising Auction Transparency (2026). Старый год документа сам по себе не означает deprecation; применять только к заявленному environment/scope.
2. **[MRC/IAB — Desktop Display Impression Measurement Guidelines, v1.1](https://www.mediaratingcouncil.org/sites/default/files/Standards/Desktop-Display-Impression-Measurement-Guidelines-US%20%28MMTF%20Final%20v1.1%29.pdf).** Обновлены в октябре 2017 года; поддерживают client-side measurement point после загрузки и начала render. Не переносить desktop-specific implementation как универсальное правило для mobile/video/CTV.
3. **[MRC — Viewable Ad Impression Measurement Guidelines v2.0](https://mediaratingcouncil.org/sites/default/files/Standards/081815%20Viewable%20Ad%20Impression%20Guideline_v2.0_Final.pdf).** Обновлены в августе 2015 года; поддерживают связь valid rendered served impression → viewable impression, classic geometry/time thresholds и separate measurable status. Документ содержит historical mobile note; для mobile действует отдельное MRC guidance с 2016 года.
4. **[MRC/IAB — Digital Audience-Based Measurement Standards, Final 1.0](https://www.mediaratingcouncil.org/sites/default/files/Standards/MRC%20Digital%20Audience-Based%20Measurement%20Standards%20Final%201.0.pdf).** Декабрь 2017 года; определения reach/frequency, de-duplication, viewable-impression basis, 50%/1s display и 50%/2s video thresholds, identity/coverage disclosures. Cross-media и format-specific later guidance может дополнять или supersede отдельные детали.
5. **[IAB/MRC — Click Measurement Guidelines v1.0](https://www.mediaratingcouncil.org/sites/default/files/Standards/click-measurement-guidelines2009-2.pdf).** Финальная версия 2009-05-12; user-initiated click, measured/received/resolved points и counting quality. Browser/HTTP wording legacy; использовать для measurement concepts, не как исчерпывающий каталог modern app interactions.
6. **[MRC — Outcomes and Data Quality Standards](https://www.mediaratingcouncil.org/sites/default/files/Standards/MRC%20Outcomes%20and%20Data%20Quality%20Standards%20%28Final%29.pdf).** Сентябрь 2022 года; поддерживает conversion как campaign-goal-aligned derivative outcome, attribution as credit assignment, data-quality/disclosure requirements и limitation bottom-up attribution относительно external factors.
7. **[IAB Tech Lab — Programmatic Auction Definitions, Final](https://github.com/InteractiveAdvertisingBureau/programmatic-auction-definitions/blob/main/auction%20definitions.md).** Финализированы 2026-06-24; current vocabulary `Ad Request`, impression opportunity, buying/selling platforms и auction roles. Использовать только для distinctions request/opportunity/auction stage; auction deep dive оставить соответствующим главам.
8. **[IAB Tech Lab — OpenRTB 2.x standard page](https://iabtechlab.com/standards/openrtb/)** и **[OpenRTB 2.6 specification](https://iabtechlab.com/wp-content/uploads/2022/04/OpenRTB-2-6_FINAL.pdf).** Standard page обновлена 2024-01-23 и отправляет к maintained GitHub releases; protocol подтверждает one-or-more `Imp` per `BidRequest` и distinction win notice/billing notice. Не объявлять request count числом user-facing opportunities и не переносить 2022 PDF release как полный current implementation state.
9. **[Google Ad Manager — Report on historical sell-through](https://support.google.com/admanager/answer/7304688?hl=en).** Current product documentation проверена 2026-08-27; `Total fill rate = Total impressions / Total ad requests`, плюс special handling optimized video pods через duration/configured opportunity duration. Это product definition, не vendor-neutral standard.
10. **[Google Ad Manager — Report metrics](https://support.google.com/admanager/table/7568664?hl=en).** Official examples distinctions response/impression, viewable/measurable, CTR/eCPM, bid rate и `Deals win rate = winning bids / bids`. Legacy caveat: страница прямо сообщает, что old Reports tool полностью deactivated в июне 2026 года в пользу Interactive reports; formulas использовать как датированные examples, не UI instructions или universal taxonomy.
11. **[Google Ads — CTR definition](https://support.google.com/google-ads/answer/2615875?hl=en)** и **[Google Ads — Conversion rate definition](https://support.google.com/google-ads/answer/2684489?hl=en).** Current official formulas `clicks / impressions` и `conversions / trackable ad interactions`; CVR may exceed 100% при multiple actions/`Every` counting. Поддерживают необходимость явного denominator и counting rule.
12. **[Google Ads — Value-based bidding glossary](https://support.google.com/google-ads/answer/12851704?hl=en)** и **[Google Ads — ROI](https://support.google.com/google-ads/answer/1722066?hl=en).** Current official product definitions CPA, ROAS и ROI; показывают distinction conversion value/ad spend против net profit/cost. Формула ROI зависит от business cost scope, поэтому не делать Google-specific accounting universal.
13. **[Google Analytics Data API — dimensions and metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema).** Current schema проверена 2026-08-27; exact product definitions ARPU per active user, ARPPU per paying active user, total revenue composition, ad cost/CPC и ROAS. Использовать как evidence того, что denominator/revenue scope являются частью product contract, а не как universal dictionary.
14. **[Google Analytics 4 — User lifetime](https://support.google.com/analytics/answer/9947257?hl=en).** Current documentation проверена 2026-08-27; observed lifetime interactions, predictive metrics, averages/totals/percentiles, identity and sampling limitations. Поддерживает cohort/horizon/model caveat для LTV.

Все URLs проверены 2026-08-27. Остальные formulas в плане — педагогический synthesis названных metric contracts. Автор должен сохранять dates и product/format scope в caveats, а не выдавать historical guideline или vendor column за универсальную текущую истину.