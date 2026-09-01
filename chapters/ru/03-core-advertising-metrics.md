---
id: ch-03
type: chapter
part: I
chapter: 3
slug: core-advertising-metrics
title: "Основные рекламные метрики"
language: ru
status: draft
toc_requirements: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14", "3.15", "3.16", "3.17", "3.18", "3.19", "3.20", "3.21", "3.22", "3.23", "3.24", "3.25"]
prerequisites: [ch-01, ch-02]
---

# Основные рекламные метрики

## Почему число без определения ничего не говорит

Рекламная campaign[^g-campaign] проходит через несколько систем. Publisher[^g-publisher] наблюдает возникновение рекламного места и доставку рекламы; buying platform — доступные ей запросы и сделки; advertiser[^g-advertiser] — расходы и business outcomes. Каждая система агрегирует собственный участок flow. Поэтому колонка `Impressions: 8,000` сама по себе не сообщает, что именно произошло и почему её число должно или не должно совпадать с соседним отчётом.

**Metric contract**[^g-metric-contract] — полное определение метрики, по которому число можно воспроизвести и интерпретировать:

```text
event definition + measurement point
+ filters и deduplication
+ numerator / denominator
+ dimensions
+ period и event/reporting/attribution window
+ currency
+ perspective и ledger boundary
```

Например, `CTR = 2%` ещё не contract. Нужно знать, какие clicks[^g-click] и impressions[^g-impression] допустимы, где они зарегистрированы, исключены ли повторы, за какой период и в разрезе какой campaign. Для денежной метрики дополнительно важны валюта, правила conversion[^g-conversion], refunds и то, чьи это деньги.

Базовые классы метрик отвечают на разные вопросы:

| Класс | Что измеряет | Пример |
|---|---|---|
| `count` | Сколько qualifying events или entities зарегистрировано | 8,000 impressions |
| `rate` | Какая доля одного count приходится на другой | `160 clicks / 8,000 impressions = 2% CTR` |
| `unit/effective metric` | Сколько cost или revenue приходится на единицу результата | `$96 / 160 clicks = $0.60 CPC` |
| `return metric` | Как измеренная ценность соотносится с вложением | `$480 / $96 = 5.0x ROAS` |

Перед сравнением двух колонок задайте семь вопросов:

```text
Кто считает?
Что считается и в какой measurement point?
Где проходит measurement boundary?
Когда событие произошло и в какой period/window попало?
Какие filters и deduplication применены?
Каков denominator?
Какая currency и чьи это деньги?
```

Этот contract важнее названия. Даже арифметически простая формула отвечает на другой вопрос после замены `rendered impression` на `served impression`, click на install или advertiser spend[^g-media-spend] на publisher revenue[^g-publisher-revenue].

## От opportunity до возможного exposure

На media surface publisher сначала возникает **ad opportunity**[^g-ad-opportunity] — конкретная возможность показать рекламу, например полноэкранный placement[^g-placement] после завершения уровня в игре. **Request** — уже техническое сообщение конкретной системе с просьбой выбрать рекламу, вернуть creative[^g-creative] или принять участие в auction. Это разные уровни:

- opportunity может не породить request из-за локального правила или фильтра;
- один request может содержать несколько рекламных объектов;
- одна opportunity может вызвать fan-out в несколько downstream `bid request`;
- retries увеличивают request count без новой opportunity;
- batch объединяет несколько opportunities в одном сообщении.

Финальные IAB Tech Lab Programmatic Auction Definitions от 24 июня 2026 года используют `Ad Request` для информации об impression opportunity, выставляемой на auction. На protocol boundary OpenRTB 2.6 один `BidRequest` содержит один или несколько объектов `Imp`. Это достаточная причина не считать HTTP requests безусловным proxy user-facing opportunities. PDF OpenRTB 2.6 выпущен в 2022 году, а страница стандарта, обновлённая 23 января 2024 года, направляет к поддерживаемым GitHub releases; конкретный production implementation может отличаться.

```text
publisher surface
  → ad opportunity
  → 0..N request / bid request
  → response / bid / win
  → served response
  → rendered impression
  → measurable → viewable impression
  → click
  → advertiser-defined conversion
  → attributed revenue / customer value
```

Это карта measurement[^g-measurement] points, а не универсальная строго убывающая воронка. Fan-out и retries могут дать requests больше opportunities; video pod содержит несколько ad units; один user может сделать несколько clicks или conversions; filters, deduplication и разные windows меняют populations между отчётами.

**Impression** — зарегистрированное рекламное событие по counting rule конкретной системы. Слово без qualifier не доказывает ни render, ни viewability, ни внимание человека.

| Состояние | Минимальное свидетельство | Чего оно не доказывает |
|---|---|---|
| `served impression` / served response | Server или platform зарегистрировал выдачу ad response, кода или инструкции creative | Что device загрузил и начал отображать creative |
| `rendered impression` | Client/device начал render по применимому правилу | Что достаточная часть creative была на экране достаточно долго |
| `measurable` | Measurement tool смог определить geometry/time условия exposure | Что условия viewability выполнены |
| `viewable impression` | Valid rendered served impression выполнил применимые geometry/time criteria | Что человек действительно посмотрел рекламу или обратил внимание |
| `non-viewable` | Measurement состоялся, criteria не выполнены | Что impression был non-measurable |
| `non-measurable` / undetermined | Доступных signals недостаточно для определения viewability | Что impression был видим или невидим |

MRC Desktop Display Impression Measurement Guidelines, обновлённые в октябре 2017 года, требуют для квалифицированного client-side count загрузки creative и как минимум начала render. MRC Viewable Guidelines v2.0, обновлённые в августе 2015 года, связывают viewable impression[^g-viewable-impression] с valid rendered served impression. Классический benchmark из Digital Audience-Based Standard 2017 года — не менее 50% pixels на протяжении одной continuous second для display и двух continuous seconds для video. Это не универсальное правило для любого формата и environment: MRC отдельно публикует Mobile Viewable Guidelines 2016 года, Digital Video Guidelines с обновлением 2018 года, OTT/CTV/SSAI Guidelines 2021 года, In-Game Guidelines с обновлением 2022 года и AR Guidelines 2024 года. Глубокая viewability-методология относится к главе 37.

### Reach и frequency: от событий к аудитории

**Reach**[^g-reach] — de-duplicated число unique entities, получивших хотя бы одну qualifying exposure за период, либо доля таких entities в явно заданной population:

```text
reach count = unique entities с ≥ 1 qualifying exposure за period
reach rate  = reached unique entities / declared universe × 100%
```

Unique entity обязана быть подписана: `person`, `device`, `household`, account или modeled audience. `20,000 device IDs`, `20,000 modeled persons` и `20,000 households` — не взаимозаменяемые counts. Без размера universe нельзя вычислить reach rate, а без identity coverage и правил cross-device deduplication нельзя оценить полноту reach.

**Frequency**[^g-frequency] — среднее число qualifying exposures на reached unique entity за тот же период:

```text
frequency = qualifying impressions / reached unique entities
```

Учебный пример: 60,000 qualifying viewable impressions за неделю распределены между 20,000 de-duplicated persons выбранной population. Reach count равен 20,000 persons, average frequency — `60,000 / 20,000 = 3`. Это не означает, что каждый человек видел рекламу ровно три раза: frequency является средним.

MRC Digital Audience-Based Standard 2017 года использует qualifying viewable impressions для своей measurement basis. Product dashboards могут считать reach по другому impression basis, по devices или с modeling. Поэтому `reach` и `frequency` сравнимы только при одинаковых entity, exposure rule, population, de-dup scope и period.

## От exposure к реакции и outcome

**Click** — qualifying user-initiated interaction с рекламой. Даже у одного действия есть несколько measurement points:

```text
user initiates click
  → click tracker / redirect      # measured click
  → destination receives request # received click
  → landing page resolves/loads   # resolved click
```

User может закрыть экран, сеть может оборваться, redirect может не завершиться, а разные systems могут применить разные filters. Поэтому initiated, measured, received и resolved clicks не обязаны совпадать. IAB/MRC Click Measurement Guidelines v1.0 от 12 мая 2009 года по-прежнему перечислены MRC как measurement baseline, но их browser/HTTP wording является legacy и не описывает исчерпывающе app, platform и другие взаимодействия 2026 года; redirect выше — типичный, не единственный flow.

**CTR (Click-Through Rate)**[^g-ctr] показывает долю выбранных impressions, после которых зарегистрированы выбранные clicks:

```text
CTR = qualifying clicks / counted impressions × 100%
```

Если advertiser report считает 160 clicks и 8,000 impressions по одному contract, `CTR = 2%`. Замена served impressions на rendered, всех clicks на filtered clicks или campaign-level population на creative-level population изменит число. Высокий CTR сам по себе не означает качественный traffic, conversions или causal lift.

**Conversion** — valuable action или outcome, который advertiser определил как значимый и который система засчитала по measurement и attribution[^g-attribution] rules. Для subscription app это может быть install, trial, первая оплаченная подписка или renewal. Эти actions нельзя складывать без явного counting rule: один click способен привести к install, trial и subscription, то есть к нескольким conversions.

Наблюдаемый purchase означает, что событие зарегистрировано. **Attributed conversion** означает, что выбранное attribution rule назначило рекламному touchpoint credit за этот outcome. Counts зависят от conversion definition, attribution/lookback window, filters, late-arriving events и режима подсчёта. Ни observed, ни attributed conversion сами по себе не доказывают, что реклама вызвала outcome: attribution распределяет credit, а causality требует incrementality evidence.

**CVR (Conversion Rate)**[^g-cvr] имеет смысл только с названным precursor event:

```text
CVR = qualifying conversions / declared eligible precursor events × 100%
```

| Полное имя | Numerator | Denominator | Какой переход измеряет |
|---|---|---|---|
| click-to-install CVR | attributed installs | eligible clicks | Click → install |
| install-to-trial CVR | qualifying trials | attributed installs | Install → trial |
| click-to-subscription CVR | attributed subscriptions | eligible clicks | Click → subscription |

Голое `CVR` скрывает разные funnels. Даже значение выше 100% не всегда является ошибкой: например, Google Ads считает conversions на trackable ad interactions, а режим `Every` и несколько conversion actions могут дать больше одной conversion на interaction. Denominator и counting rule — часть названия метрики.

## Нормализованная цена события: CPM, eCPM и cost-per-X

Абсолютные расходы не позволяют сравнить activity разного размера. Unit metrics делят признанный cost или revenue на явно определённое событие. В post-fact отчёте это фактические средние; те же labels могут обозначать pricing model, bid или optimization target, что не гарантирует совпадения с realised average.

| Метрика | Фактическая формула | Перспектива и denominator | Главная неоднозначность |
|---|---|---|---|
| **CPM (Cost per Mille)** | `advertiser cost or spend / counted impressions × 1,000` | Buyer; тысяча выбранных impressions | Может означать pricing basis, rate, bid либо observed average CPM |
| **eCPM (effective CPM)** | `recognized revenue / counted impressions × 1,000` | Обычно publisher/seller; тысяча выбранных impressions | Revenue и impression scope зависят от seller contract |
| **CPC (Cost per Click)** | `cost / qualifying clicks` | Buyer; clicks по disclosed rule | Bid/target CPC не равен фактическому average CPC |
| **CPA (Cost per Action)** | `cost / qualifying actions` | Buyer; advertiser-defined action | Action может быть trial, order, lead или subscription, не обязательно новый customer |
| **CPI (Cost per Install)** | `cost / qualifying installs` | Mobile acquisition; attributed installs | Install count зависит от measurement и attribution rules |
| **CPL (Cost per Lead)** | `cost / qualifying leads` | Lead generation; business-defined lead | Lead definition и quality различаются; lead ещё не customer |
| **CAC (Customer Acquisition Cost)** | `allocated acquisition costs / new customers` | Бизнес advertiser; новые customers | В numerator могут входить media, agency, sales и onboarding costs |

`Mille` означает тысячу. Observed CPM[^g-cpm] отвечает: «сколько buyer потратил на тысячу counted impressions?» eCPM[^g-ecpm] отвечает: «сколько признанного revenue seller получил на тысячу counted impressions?» Формулы симметричны, но numerators принадлежат разным ledger boundaries[^g-ledger-boundary]. Publisher может использовать eCPM, чтобы сравнивать demand, оплачиваемый по CPM, CPC или CPA, на общей realised-revenue basis. Поэтому CPM и eCPM не являются автоматически двумя названиями одного числа.

CPC[^g-cpc], CPA[^g-cpa], CPI[^g-cpi] и CPL[^g-cpl] образуют один шаблон `recognized cost / qualifying events`, но событие определяет бизнес-смысл. Низкий CPL бесполезен, если lead не проходит qualification; низкий CPI не говорит, что install оформит подписку; CPA нельзя читать без имени action.

CAC[^g-cac] шире platform CPA. Если platform report показывает `$4 CPA` за subscription, он использует platform cost и attributed subscription action. Бизнес может считать новым customer только первую подтверждённую оплату и включать в acquisition costs media, agency, sales и onboarding. Пока customer event, period, cost allocation и refunds не согласованы, platform CPA нельзя переименовать в CAC.

## Чьи деньги и какой return

Одна сумма меняет label относительно участника и ledger boundary:

```text
advertiser: spend / media cost
        → selling или buying platform:
          revenue на одной boundary,
          downstream media/traffic cost на другой boundary
        → publisher: recognized publisher revenue
```

**Revenue**[^g-revenue] — выручка, признанная выбранной entity по её правилам. **Spend** — расход buyer на media в выбранном scope. **Cost**[^g-cost] — затраты той entity, чью экономику анализируют; для advertiser это может быть media cost, для platform — downstream cost, для бизнеса — более широкий набор расходов. Estimated dashboard value, invoiced amount, settled amount и recognized revenue могут относиться к разным состояниям. Для сравнения нужно согласовать period, timezone, currency conversion, taxes/refunds и participant. Gross/net accounting, take rate и settlement подробно разбираются в главе 4.

**ROAS (Return on Ad Spend)**[^g-roas] измеряет media efficiency:

```text
ROAS = attributed conversion value or revenue / ad spend
```

Результат можно записать как `5.0x` или `500%`. Он зависит от attribution rules и выбранного value field. **ROI (Return on Investment)**[^g-roi] оценивает прибыльность более широкого investment scope:

```text
ROI = net profit / total relevant investment cost
    = (return − total relevant cost) / total relevant cost
```

В учебном walkthrough advertiser получает `$480` attributed conversion value при `$96` ad spend: ROAS равен `5.0x`. Если трактовать `$480` как attributed revenue, а полный согласованный cost с media, delivery продукта, agency и operations равен `$600`, net profit составляет `−$120`, а ROI — `−20%`. Высокий ROAS совместим с отрицательным ROI, потому что denominators и cost scopes различаются. И ROAS, и attributed revenue остаются attribution-dependent: без causal design они не доказывают incremental return.

## Ценность user во времени: ARPU, ARPPU и LTV

Acquisition metric говорит, сколько стоило получить событие или customer; product-value metric — сколько выбранная user population принесла или, согласно модели, принесёт.

| Метрика | Рабочая формула | Обязательный contract |
|---|---|---|
| **ARPU (Average Revenue per User)** | `selected revenue / all eligible users` | User definition, revenue categories, period, cohort/population |
| **ARPPU (Average Revenue per Paying User)** | `selected purchase revenue / paying users` | Payer event, purchase revenue, refunds, period |
| **LTV (Lifetime Value)** | `cumulative observed or predicted value / cohort members` | Cohort, horizon, identity, observed/predicted status, revenue/contribution basis |

Учебный subscription cohort: за месяц 1,000 active users создают `$1,000` выбранного recognized revenue, из них 100 users платят; для простоты весь revenue в примере является purchase revenue. Тогда `ARPU = $1,000 / 1,000 = $1`, а `ARPPU = $1,000 / 100 = $10`. ARPU[^g-arpu] включает non-paying users выбранной population; ARPPU[^g-arppu] делит только на payers. Эти числа ничего не говорят о lifetime без cohort и horizon.

На 27 августа 2026 года Google Analytics Data API, например, определяет ARPU как total revenue на active user с purchase, subscription и ad revenue, а ARPPU — purchase revenue на paying active user. Это product-specific contract, не универсальный словарь: другая компания может иначе определять active user, payer, revenue, taxes и refunds.

**Observed LTV**[^g-ltv] суммирует фактически зарегистрированную value cohort к заданному horizon, например `30-day revenue LTV`. **Predicted LTV** оценивает будущую value по модели и assumptions, например `12-month predicted contribution LTV`. Revenue LTV не вычитает расходы; contribution/profit LTV использует оговорённую маржинальную basis. GA4 User Lifetime объединяет lifetime interactions и поддерживает observed и predictive metrics, но identity method и sampling влияют на результат. Поэтому «LTV пользователя» без cohort, horizon, identity rule, value basis и model status — не определённый scalar.

## Где теряется monetization: fill rate и win rate

Fill и win описывают разные stages и разных owners. Они не являются дополнениями друг друга до 100%.

| Метрика | Один распространённый contract | Stage и owner | Почему count меняется дальше |
|---|---|---|---|
| **Fill rate** | `counted filled impressions / eligible ad requests` | Publisher/ad server: request → delivery | Matched response может не render-иться или не стать counted impression |
| **Bid rate** | `submitted bids / eligible bid requests` | Buyer: request → bid/no-bid | Buyer фильтрует opportunities и отвечает не на все requests |
| **Win rate** | `winning bids / submitted eligible bids` | Buyer/deal: bid → auction win | Win notice ещё не является delivery или billing event |

У fill rate[^g-fill-rate] нет одного безопасного vendor-neutral denominator. Product может делить impressions, matched responses или другой fill event на requests, opportunities или ad units. Google Ad Manager sell-through documentation, проверенная 27 августа 2026 года, использует `Total impressions / Total ad requests`; для optimized video pods часть requests/unfilled units выводится из durations и configured ad opportunity duration. Это точное product definition, но не правило для любого ad server. `Match rate`, `response rate`, `delivery rate` и `fill rate` могут именовать соседние transitions, а не aliases.

Win rate[^g-win-rate] также требует раскрытия population. Auction может получить bid, выбрать его победителем, отправить win notice, но не доставить creative или не создать billable impression. OpenRTB различает win notice и billing notice; billing policy может зависеть от delivery, viewability или других правил. Формула `Deals win rate = winning bids / bids` встречалась в legacy Google Ad Manager Reports metrics. Old Reports tool был полностью deactivated в июне 2026 года в пользу Interactive reports, поэтому это датированный официальный пример denominator, а не инструкция для current UI или универсальная taxonomy.

## Одна campaign, три правдивых отчёта

Соберём метрики на одном согласованном сценарии. Все числа ниже **учебные**. Subscription app рекламируется внутри mobile game; period, например, одна неделя, валюта — USD. Каждый расчёт использует собственный явно названный contract, а не предполагает общий global event store.

### Advertiser: outcome и acquisition efficiency

Advertiser report содержит его subset: 8,000 counted impressions, 160 qualifying clicks, 24 attributed subscriptions, `$96` spend и `$480` attributed conversion value.

```text
CTR  = 160 / 8,000 × 100%        = 2%
CPM  = $96 / 8,000 × 1,000       = $12
CPC  = $96 / 160                 = $0.60
CVR  = 24 / 160 × 100%           = 15%  # click → subscription
CPA  = $96 / 24                  = $4    # action = attributed subscription
ROAS = $480 / $96                = 5.0x
```

Здесь `$12 CPM` и `$4 CPA` — post-fact averages, а не заявление о billing model или bid. `$480` — attributed value, не доказанная causal value.

### Publisher: delivery и monetization

Publisher за тот же period агрегирует всех buyers, а не только этого advertiser: 100,000 eligible ad requests, 80,000 counted impressions и `$800` recognized publisher revenue.

```text
fill rate = 80,000 / 100,000 × 100% = 80%
eCPM      = $800 / 80,000 × 1,000   = $10
```

Publisher totals закономерно больше advertiser subset. Его `$800 revenue` не является `$96 spend` advertiser: это другая population и другая ledger boundary.

### Platform: auction и delivery boundary

Рассматриваемая platform видит 60,000 eligible bid requests, отправляет 45,000 bids, получает 9,000 wins; 8,000 событий становятся counted/billable impressions по выбранному contract.

```text
bid rate = 45,000 / 60,000 × 100% = 75%
win rate = 9,000 / 45,000 × 100%  = 20%
```

Разница между 9,000 wins и 8,000 counted/billable impressions не обязана быть ошибкой: win и billing/delivery — разные event points. При этом 60,000 platform requests не обязаны равняться 100,000 publisher requests из-за boundary, routing, batching, fan-out и filters.

| Перспектива | Наблюдаемый subset | Главные решения | Денежный смысл |
|---|---|---|---|
| Advertiser | Купленные impressions, clicks, attributed outcomes | Эффективность acquisition и value | Spend/cost и attributed value |
| Publisher | Все eligible requests и demand sources | Delivery и monetization | Recognized publisher revenue |
| Platform | Traversed requests, bids, wins и её billing events | Auction participation и delivery boundary | Собственные revenue, spend или downstream cost по конкретному ledger |

Data flow и money flow здесь расходятся. Impression/click/conversion events могут поступать asynchronously в разные reports; invoice и settlement не обязаны следовать тому же network path. Арифметическая согласованность внутри каждого metric contract не доказывает равенство raw events между systems. Для первичной диагностики снова нужны семь вопросов: кто считает, что, где, когда, после каких filters, в каком denominator и чьи деньги. Детальная reconciliation относится к главе 32.

## С чем это часто путают

- **Opportunity, ad request и bid request — не один event.** Opportunity возникает на media surface; requests являются system-bound messages с batching, fan-out, retries и filtering.
- **Impression не означает человеческий просмотр.** Served, rendered, measurable и viewable дают разные уровни evidence; viewable означает standardized opportunity to see, не attention.
- **Non-viewable не равно non-measurable.** В первом случае measurement завершился и criteria не выполнены; во втором status определить не удалось.
- **CTR и CVR не имеют скрытого универсального denominator.** CTR зависит от click/impression basis; CVR должен называться как конкретный transition.
- **Conversion и ROAS не доказывают causality.** Они зависят от observation, attribution и valuation rules.
- **CPM не равен eCPM, CPA не равен CAC.** Первые пары различаются ledger perspective; вторые — action/customer definition и cost scope.
- **Spend, cost и revenue нельзя копировать между участниками.** Одна сумма получает разный смысл на разных economic boundaries.
- **ROAS не равен ROI.** ROAS нормализует attributed value на ad spend; ROI использует net profit и полный выбранный investment cost.
- **ARPU, ARPPU и LTV различаются не только denominator.** Они требуют разных populations, revenue scopes, periods, cohorts, horizons и model status.
- **Fill rate и win rate не являются одной auction metric с двух сторон.** Fill относится к publisher delivery, win — к переходу bid → win по раскрытому auction contract.

## Что важно запомнить

1. Метрика — contract измерения, а не только название и формула.
2. Opportunity возникает в media surface; request является сообщением системе и не соответствует opportunity один-к-одному.
3. Impression — counted event. Served, rendered, measurable и viewable описывают разные measurement points; ни один не доказывает attention.
4. Reach требует unique-entity и universe definitions; frequency — общего impression basis, reached population и period.
5. CTR и особенно CVR сравнимы только при названных numerators, denominators и filters.
6. CPM/CPC/CPA/CPI/CPL могут быть pricing, bid/target labels или фактическими averages; eCPM обычно нормализует seller revenue.
7. CAC использует новых customers и широкий allocated acquisition cost, поэтому он не является alias platform CPA.
8. ROAS измеряет attributed media return, ROI — profit относительно полного выбранного investment scope; attribution не равна causality.
9. ARPU, ARPPU и LTV требуют user, revenue, cohort, period/horizon и model definitions.
10. Advertiser, publisher и platform могут иметь одновременно правильные, но разные отчёты об одной campaign, потому что видят разные boundaries и ledgers.

## Проверьте себя

1. Одна opportunity породила три downstream bid requests. Какой count описывает media event, а какой — protocol messages?
2. Почему `CVR = 15%` нельзя сравнить с другим `CVR = 12%`, пока не раскрыты denominators и conversion rules?
3. Как campaign с `5.0x ROAS` может иметь отрицательный ROI?
4. Какие metric contracts позволяют одновременно получить advertiser CPM `$12`, publisher eCPM `$10` и platform win rate `20%` без противоречия?

## Источники и дополнительное чтение

1. [MRC — Standards & Guidelines](https://www.mediaratingcouncil.org/standards-and-guidelines)
2. [MRC/IAB — Desktop Display Impression Measurement Guidelines v1.1](https://www.mediaratingcouncil.org/sites/default/files/Standards/Desktop-Display-Impression-Measurement-Guidelines-US%20%28MMTF%20Final%20v1.1%29.pdf) и [MRC — Viewable Ad Impression Measurement Guidelines v2.0](https://mediaratingcouncil.org/sites/default/files/Standards/081815%20Viewable%20Ad%20Impression%20Guideline_v2.0_Final.pdf)
3. [MRC/IAB — Digital Audience-Based Measurement Standards, Final 1.0](https://www.mediaratingcouncil.org/sites/default/files/Standards/MRC%20Digital%20Audience-Based%20Measurement%20Standards%20Final%201.0.pdf)
4. [IAB/MRC — Click Measurement Guidelines v1.0](https://www.mediaratingcouncil.org/sites/default/files/Standards/click-measurement-guidelines2009-2.pdf)
5. [MRC — Outcomes and Data Quality Standards](https://www.mediaratingcouncil.org/sites/default/files/Standards/MRC%20Outcomes%20and%20Data%20Quality%20Standards%20%28Final%29.pdf)
6. [IAB Tech Lab — Programmatic Auction Definitions](https://github.com/InteractiveAdvertisingBureau/programmatic-auction-definitions/blob/main/auction%20definitions.md) и [OpenRTB 2.x](https://iabtechlab.com/standards/openrtb/)
7. [Google Ad Manager — Sell-through](https://support.google.com/admanager/answer/7304688?hl=en) и [Report metrics](https://support.google.com/admanager/table/7568664?hl=en)
8. [Google Ads — CTR](https://support.google.com/google-ads/answer/2615875?hl=en), [Conversion rate](https://support.google.com/google-ads/answer/2684489?hl=en), [ROI](https://support.google.com/google-ads/answer/1722066?hl=en), [Google Analytics Data API schema](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema) и [GA4 User lifetime](https://support.google.com/analytics/answer/9947257?hl=en)