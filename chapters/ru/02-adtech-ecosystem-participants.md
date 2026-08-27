---
id: ch-02
type: chapter
part: I
chapter: 2
slug: adtech-ecosystem-participants
title: "Участники рекламной экосистемы"
language: ru
status: draft
toc_requirements: ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9", "2.10", "2.11", "2.12", "2.13", "2.14", "2.15", "2.16", "2.17"]
prerequisites: [ch-01]
---

# Участники рекламной экосистемы

## Суть: роли, а не коробки

В первой главе мы увидели две экономические стороны рынка: `advertiser` создаёт demand, а `publisher` — supply. Между ними может быть много систем, но карта AdTech становится понятной, если смотреть не на названия компаний, а на **роли** — логические функции в рекламной сделке.

`Role`, `company` и `product` — разные уровни:

- **role** отвечает на вопрос «какую функцию здесь выполняют?»;
- **company** — организация, с которой заключают договор и которая может выполнять несколько ролей;
- **product** — конкретное предложение этой компании: UI, API, managed service или набор инструментов.

Поэтому логотип нельзя поставить в единственную клетку карты навсегда. Один product suite может одновременно покупать media, продавать доступ к inventory, доставлять рекламу и строить отчётность. И наоборот, одну роль advertiser может распределить между собственной командой и несколькими providers.

Для разбора любой роли используйте одну карточку:

| Вопрос | Что он проясняет |
|---|---|
| Какую проблему решает роль? | Причина её существования |
| Кто customer? | Кто использует продукт или услугу |
| Кто beneficiary? | Кто получает экономическую пользу |
| Кто payer? | Кто оплачивает media или сервис по договору |
| Какие данные входят и выходят? | Технические границы функции |
| Какое решение принимается или исполняется? | Реальная работа, а не marketing label |
| Как движутся деньги? | Media money, отдельная fee или отсутствие платежа в этом flow |

Customer, beneficiary и payer могут не совпадать. Например, media buyer работает в UI платформы, пользу получает advertiser, а invoice может оплачивать agency. Эта разница особенно важна при чтении договоров, data flows и отчётов.

Заполним карточку для главного экономического участника. Advertiser хочет изменить знание или поведение аудитории, финансирует campaign, передаёт цель, бюджет и рекламные материалы и получает outcomes и отчётность. **Creative** — сам рекламный материал: например, изображение, видео или текст. Advertiser обычно является beneficiary и источником денег, но операционную работу и оплату конкретных счетов может делегировать agency.

Такой разбор полезнее линейной схемы из семнадцати обязательных коробок: в конкретной campaign некоторых ролей не будет, а несколько других скроются за одним договором.

## Кто ставит цель и кто выполняет покупку

Начнём не с platforms, а с тех, ради кого рынок существует.

**Advertiser** — организация, которая финансирует рекламу ради business outcome. Для приложения с платной подпиской outcome может быть немедленным — trial или оплаченная подписка — либо более отложенным: знание продукта и готовность рассмотреть его позже. Advertiser определяет цель, допустимый spend, аудиторию и критерии успеха; сам или через подрядчиков решает, где покупать media.

Отсюда появляются две рекламные ориентации:

- **brand advertising** в первую очередь меняет awareness, consideration или perception — знание, рассмотрение и отношение к продукту;
- **performance advertising** управляется вокруг измеримого действия или outcome и стоимости его получения: регистрации, trial, установки или покупки.

Это не два взаимоисключающих вида компаний. Один subscription app может одновременно показывать video campaign для знакомства с брендом и acquisition campaign, оптимизированную на trial. Более того, один пользователь может сначала познакомиться с продуктом через brand-рекламу, а позже отреагировать на performance-рекламу. Различаются прежде всего цель, горизонт оценки и ожидаемые доказательства результата.

**Publisher** — организация, которая владеет или управляет media-средой, где возникают рекламные opportunities: сайтом, приложением, игрой или видеосервисом. Publisher задаёт placements и правила показа, предоставляет контекст и доступ к inventory, получает сведения о delivery и зарабатывает publisher revenue. Его интерес — продать opportunities достаточно выгодно, сохранив качество продукта и опыт user.

Между бизнес-целью advertiser и технической покупкой часто стоят люди и сервисные организации:

- **agency** — компания-подрядчик, которая планирует или выполняет marketing- и media-работу от имени advertiser. Она может разрабатывать стратегию, готовить creatives, выбирать каналы, запускать campaigns, вести отчётность и иногда управлять платежами;
- **media buyer** — человек, команда или функция, которая выбирает media, platforms и условия покупки, распределяет spend и настраивает campaigns. Media buyer может работать внутри advertiser, внутри agency или другой buying organization.

Agency и media buyer — не синонимы: первая является организацией и contractual role, второй — операционной функцией. Media buyer также не является DSP: человек формулирует и настраивает решения, а DSP исполняет часть buying workflow в масштабе.

| Роль | Проблема и beneficiary | Типичный payer | Data in | Решение или output |
|---|---|---|---|---|
| Advertiser | Достичь business outcome; пользу получает сам advertiser | Источник media spend и многих service fees | Бизнес-цель, ограничения, customer data | Цель campaign, бюджет, критерии успеха |
| Publisher | Монетизировать media environment; пользу получает publisher | Обычно не payer в media sale; может платить technology providers | Placements, контекст, inventory rules | Доступные opportunities, delivery rules, publisher revenue |
| Agency | Выполнить работу, для которой advertiser не строит команду или экспертизу | Advertiser; иногда agency выступает плательщиком по downstream invoices | Brief, бюджет, creatives, результаты | План, настройки, execution и отчётность |
| Media buyer | Превратить цель и бюджет в конкретные покупки | Не отдельный payer как функция; оплачивается employer/client | Campaign goals, доступные каналы, reports | Выбор media и platforms, allocation и настройки |

Advertiser может держать buying in-house, полностью отдать его agency или разделить ответственность. Это меняет control boundary: кто имеет доступ к account, raw data и договору, кто отвечает за ошибки настройки и кто может перераспределить spend.

## Кто соединяет demand и supply

Один advertiser не может вручную оценивать каждую короткоживущую opportunity у тысяч publishers, а publisher не может по телефону искать покупателя для каждого показа. Следующая группа ролей решает проблему масштаба, но делает это с разных сторон.

Возможные пути выглядят так:

```text
advertiser ───────────── direct buying ─────────────→ publisher
advertiser ───────────── ad network ────────────────→ publisher
advertiser / buyer → DSP ⇄ exchange / SSP functions → publisher

advertiser ad server и publisher ad server могут поддерживать разные ветви;
ни одна строка не является обязательным универсальным pipeline.
```

**Ad network** агрегирует supply и/или demand и продаёт управляемое media offering. Покупатель обычно выбирает доступное предложение, цель и ограничения, а network берёт на себя заметную часть распределения трафика и отношений с publishers. Network может принимать media money и рассчитываться с supply partners; конкретная коммерческая модель зависит от договора.

**DSP (Demand-Side Platform)** — buying platform, которая помогает media buyer оценивать и покупать opportunities из нескольких supply sources по правилам campaigns. Customer — advertiser, agency или другой buyer. DSP получает campaign settings, creatives и доступные signals opportunity, принимает или исполняет решения о покупке и возвращает результаты и reporting. В сравнении с managed network offering DSP обычно даёт buyer больше campaign-level control, но реальные products могут сочетать обе модели.

**SSP (Supply-Side Platform)** — sell-side platform для publisher. Она описывает доступные opportunities, предоставляет demand sources доступ к inventory и помогает управлять его продажей. SSP получает inventory rules и context signals со стороны publisher, передаёт допустимое описание opportunity buyers и возвращает решение о продаже и связанные metadata. Publisher — основной customer и beneficiary, хотя SSP нередко получает свою оплату в рамках settlement media.

**Ad exchange** — transaction layer или функция, которая соединяет buyers и sellers и выполняет matching либо auction. Exchange не обязательно является отдельной компанией между DSP и SSP: exchange- и SSP-функции часто объединены в одном продукте. Полезное различие такое: SSP представляет sell-side workflow publisher, а exchange выполняет саму функцию автоматизированной сделки между сторонами.

**Ad server** выбирает, доставляет и регистрирует рекламу по заданным campaign- или inventory-правилам. Это не просто CDN с файлами: CDN может отдать bytes creative, а ad server применяет правила и создаёт наблюдаемую точку delivery.

- Advertiser ad server помогает стороне buyer управлять creatives, их доставкой и регистрацией событий независимо от конкретного места покупки.
- Publisher ad server сопоставляет доступные demand sources и управляет delivery на inventory publisher.

Подробные `order`, `line item`, приоритеты и serving mechanics появятся в главе 11. Здесь важно, что две разновидности ad server смотрят на один показ с разных operational boundaries.

| Роль | Основной customer | Data in | Решение или output | Денежная связь |
|---|---|---|---|---|
| Ad network | Advertiser/agency; также нужны supply partners | Campaign constraints, creatives, агрегированный supply | Managed distribution и reporting | Часто принимает media money; возможны и другие договоры |
| DSP | Advertiser, agency, media buyer | Campaign settings, creatives, opportunity signals | Buying decision, доступ к supply, reports | Media spend и/или platform fee в зависимости от договора |
| SSP | Publisher | Inventory rules, opportunity и context signals | Доступ к demand, sale decision metadata, reports | Участвует в settlement или получает fee по договору |
| Ad exchange | Buyers и sellers или их platforms | Описания opportunities и buying responses | Matching/transaction result | Может участвовать в media settlement или получать fee |
| Ad server | Advertiser или publisher | Campaign/inventory rules, creatives, delivery signals | Выбор, delivery и event registration | Обычно отдельная service, license или usage fee; модель зависит от provider |

`DSP ≠ ad network`: DSP прежде всего инструмент и decision layer buyer, network — агрегированное управляемое media offering. `SSP ≠ exchange`: первая роль организует продажу со стороны publisher, вторая — transaction function. Но ни одна граница не гарантирует отдельных vendors или непересекающихся features.

## Кто измеряет и проверяет

Платформа, продавшая или купившая media, видит только собственные measurement points и одновременно заинтересована в результате сделки. Поэтому advertiser и publisher могут подключать поперечные providers. Они не стоят обязательными hops в пути creative: их integrations получают события и возвращают отдельные выводы.

**Attribution provider** сопоставляет доступные рекламные touchpoints — например, impression или click — с outcomes вроде регистрации или покупки и применяет правила назначения credit. Результат отвечает на вопрос «какому источнику по выбранным правилам приписана эта conversion?», а не «была ли реклама истинной причиной действия?» Attribution не доказывает causality.

**MMP (Mobile Measurement Partner)** — mobile-specialized категория measurement и attribution providers для app acquisition, installs и in-app outcomes. У конкретных MMP могут быть функции для других сред и analytics, но основная роль здесь — сопоставлять доступные acquisition signals с событиями приложения и давать advertiser согласованное представление across media sources. MMP не является синонимом product analytics: product analytics прежде всего изучает поведение внутри продукта, тогда как MMP связывает acquisition с рекламными источниками. Технические детали SDK, install matching, postbacks и platform privacy restrictions относятся к главам 27–29.

**Verification provider** создаёт отдельную точку оценки условий и качества доставки рекламы. В зависимости от интеграции он может анализировать доступные delivery, render, placement, context и quality signals и возвращать verification results рекламодателю, publisher или platform. Verification шире одной fraud detection: вопросы могут относиться также к среде и условиям показа. Но отдельный provider не является абсолютной истиной — полнота вывода зависит от среды, доступных signals и методологии.

Для одной рекламы приложения системы могут получить частично пересекающиеся события:

```text
impression / click signals ─┬→ buying и selling platform reports
                            ├→ attribution provider / MMP
delivery / context signals ─┴→ verification provider

install / subscription events → MMP и systems advertiser, если интеграции это позволяют
```

Reports могут различаться не только из-за ошибки. Platform reporting отвечает, что наблюдала сама platform; MMP применяет свои attribution rules к acquisition и app events; verification provider оценивает доступные ему условия delivery. Это разные вопросы и measurement boundaries.

## Кто поставляет, организует и связывает данные

Слово `data` скрывает несколько разных задач. Поставка внешнего набора, управление audience segment, хранение customer record и сопоставление identifiers не являются одной ролью.

| Роль | Customer и inputs | Persistent state | Output / activation | Чего роль сама по себе не делает |
|---|---|---|---|---|
| **Data provider** | Advertiser, publisher или platform; собственные либо собранные datasets | Dataset, attributes или segments | Данные для разрешённых activation, decisioning или analysis | Не обязана хранить customer record заказчика или принимать media decision |
| **DMP** | Advertising/marketing team; audience data и campaign signals | Audience profiles и segments в выбранной модели продукта | Segmentation и activation через рекламные integrations | Не обязана быть system of record для полного customer lifecycle |
| **CDP** | Advertiser; first-party events и customer data из product, CRM и других systems | Persistent unified customer record | Доступные downstream systems customer profiles, events и segments | Не обязана покупать media или назначать attribution credit |
| **Identity provider** | Advertiser, publisher или platform; identifiers из разрешённых источников | Mapping или identity graph в рамках конкретного решения | Связанные или переведённые identifiers для activation и measurement | Не создаёт consent, не регистрирует все events и не доказывает identity реального человека |

**Data provider** продаёт или предоставляет datasets, attributes либо audience segments. Customer платит за дополнительный signal: например, классификацию контекста или audience attribute, который можно законно и технически использовать. Качество, provenance и допустимые use cases таких данных важны, но их глубокая проверка выходит за рамки этой главы.

**DMP (Data Management Platform)** — advertising-oriented система для управления, сегментации и activation audience data. **CDP (Customer Data Platform)** отвечает за persistent unified customer record и доступность customer data downstream systems. Историческое правило «DMP — только cookies и anonymous data, CDP — только PII» ненадёжно: современные продукты и deployment models пересекаются. Рабочая граница проходит по главной задаче и record model — рекламная audience activation против устойчивого customer record.

**Identity provider** связывает или переводит identifiers для разрешённых activation, measurement и смежных use cases. Например, одна integration может знать customer ID advertiser, другая — platform-specific ID; identity function помогает установить допустимое соответствие. Это не означает, что provider всегда определил физического человека.

Различайте четыре операции:

```text
identity    → связывает entities или identifiers
tracking    → регистрирует events
attribution → назначает conversion credit по правилам
consent     → выражает разрешение или выбор в отдельном governance/legal context
```

Identity provider не создаёт legal permission самим фактом matching. Конкретные identifiers, алгоритмы resolution и privacy rules будут разобраны в главах 24 и 40–42.

В running example subscription app отправляет first-party события trial и подписки в CDP, чтобы поддерживать customer record. DMP или platform integration может сформировать и активировать допустимый audience segment. Identity provider помогает связать необходимые identifiers между разрешёнными environments, а внешний data provider может обогатить segment дополнительным attribute. Эти функции опциональны и могут выполняться разными products или одним suite.

## Одна campaign: отдельно данные и деньги

Соберём роли на одном сценарии. Subscription app рекламируется внутри mobile game. Advertiser нанял agency; media buyer в agency запускает acquisition через DSP. Publisher игры предоставляет opportunity через SSP, в продукте которой также есть exchange function. MMP измеряет mobile acquisition, verification provider опционально оценивает delivery, а data/identity functions подключаются только там, где они нужны и допустимы.

Это один возможный состав, а не обязательная цепочка. Advertiser мог купить media напрямую или через ad network; publisher мог использовать другой monetization path; agency, DSP, SSP, exchange, MMP и verification могли принадлежать меньшему числу компаний либо отсутствовать.

### Data flow

```text
advertiser / media buyer
  ── campaign goal, settings, creative metadata ──→ buying и serving systems

publisher app
  ── opportunity, placement, format, разрешённый context ──→ sell-side и decision systems

decision systems
  ── выбранная реклама + delivery metadata ──→ publisher app

publisher app и participating systems
  ── impression / click / delivery events ──→ reporting, MMP, verification

subscription app / advertiser backend
  ── install, trial, subscription events ──→ MMP, CDP и advertiser reporting
```

Не каждое событие получает каждый участник. Набор data зависит от integrations, среды, договора и privacy/platform restrictions. Event flow часто двунаправлен и asynchronous; он не обязан повторять ни путь creative, ни финансовые отношения.

### Money flow

```text
advertiser funding
  → agency / buying contract
  → media sellers и intermediaries
  → publisher revenue

отдельно, в зависимости от договоров:
advertiser / agency / publisher
  → license, usage или service fees
  → ad server, MMP, verification, data/identity providers
```

Advertiser является экономическим источником media spend, но agency может быть contractual payer по invoice DSP. DSP или ad network может собирать оплату за media; sell-side participants могут участвовать в settlement с publisher. Часть суммы становится publisher revenue, а providers получают оговорённые fees. Точная модель, удержания и путь условных `$100` — тема главы 4.

Не каждый box удерживает процент каждого рекламного доллара. MMP может получать subscription или usage fee, verification provider — service fee, data provider — плату за data, а identity provider — license или usage fee. Они могут вообще не принимать media money.

Наконец, **invoice path**, реальный **settlement path**, путь доставки creative и HTTP/event path могут иметь разные endpoints. Advertiser может видеть один consolidated invoice от agency, хотя деньги далее распределяются по нескольким договорам; creative может прийти с ad server или CDN; conversion event может асинхронно уйти в MMP и не вернуться через SSP. Финансовая схема выше типична по направлению, но не универсальна по составу участников и договорам.

## Почему одна компания занимает несколько мест на карте

Компании совмещают роли из-за acquisitions, общей инфраструктуры и data, желания предложить managed service, единый workflow, reporting и contract. Такое совмещение называют **role bundling**; когда компания контролирует несколько последовательных уровней value chain, часто говорят о **vertical integration**.

Для customer bundling может означать меньше integrations, ниже operational overhead, быстрее обмен данными и один UI для настройки и отчётов. Но те же свойства создают риски:

- конфликт incentives, если одна сторона одновременно представляет buyer и seller;
- непрозрачность границ fees и внутренних money transfers;
- преимущество собственного supply или demand в decisioning;
- self-measurement, когда исполнитель сделки сам оценивает её качество;
- сложность выгрузки data и сравнения внешних alternatives.

Представим условную Platform X: она продаёт managed media package, даёт media buyer DSP-like controls, доставляет creatives и показывает attribution report в одном UI. Называть её только «DSP» недостаточно. Разложим suite на функции:

| Функция Platform X | Отдельная role card |
|---|---|
| Упаковывает и продаёт доступ к media | Ad network-like managed offering |
| Выбирает opportunities по campaign rules | DSP-like buying/decisioning |
| Доставляет creative и регистрирует delivery | Ad serving |
| Связывает touchpoints с outcomes | Attribution/measurement |

Один login и invoice не превращают эти функции в одну роль. Для каждой нужно отдельно спросить: кто customer и payer, какие data входят и выходят, какое решение принимается, где возникает fee и с чьими интересами оно может конфликтовать.

Это и есть способ анализировать незнакомую AdTech-компанию: сначала перечислить выполняемые роли, затем заполнить для каждой `problem → customer → payer → data in/out → decision → money`. Только после этого имеет смысл сравнивать vendors по labels.

## С чем это часто путают

- **«Brand advertiser и performance advertiser — разные виды компаний».** Нет: это ориентации activity. Одна компания может вести обе.
- **«Agency, media buyer и DSP — одно звено».** Agency — организация, media buyer — функция, DSP — technology platform. Они могут работать вместе, но не взаимозаменяемы.
- **«Ad network — старое название DSP».** Network обычно предлагает более управляемую агрегацию media, DSP — buyer tool и decision layer. Реальные suites могут совмещать обе функции.
- **«SSP и exchange обязаны быть разными компаниями» или «это полные синонимы».** Обе крайности неверны: sell-side workflow и transaction function различимы, но часто bundled.
- **«MMP знает истинную причину установки, а verification provider видит абсолютную истину показа».** Оба работают с доступными measurement points и методологиями. Attribution credit не равен causality, verification result ограничен интеграцией.
- **«Data provider, DMP, CDP и identity provider — четыре названия базы пользователей».** Они соответственно поставляют data, организуют audience activation, поддерживают customer record и связывают identifiers.
- **«Все роли образуют одну цепочку и получают долю spend».** Пути могут быть прямыми или bundled, а многие technology providers получают отдельную fee и не участвуют в media settlement.

## Что важно запомнить

1. Карта AdTech описывает логические роли, а не обязательный список компаний.
2. Advertiser финансирует рекламу ради outcome; publisher создаёт media environment и opportunities.
3. Brand и performance — ориентации целей и измерения, которые один advertiser может сочетать.
4. Agency является организацией-подрядчиком, media buyer — функцией, DSP — инструментом и decision layer для buyer.
5. Ad network предлагает управляемую агрегацию media; DSP помогает buyer управлять покупкой; SSP обслуживает sell-side workflow; exchange выполняет transaction function.
6. Advertiser-side и publisher-side ad servers применяют разные наборы правил, хотя обе роли выбирают, доставляют и регистрируют рекламу.
7. MMP/attribution, verification, data и identity — поперечные функции, а не обязательные hops пути creative.
8. Data flow, delivery path, invoice path и settlement path не обязаны совпадать.
9. Одна company может выполнять несколько roles; bundling снижает integration friction, но создаёт вопросы о incentives, fees, data boundaries и независимости measurement.

## Проверьте себя

1. Почему subscription app может одновременно быть brand- и performance-advertiser?
2. Чем media buyer отличается от agency и DSP?
3. Для чего publisher может использовать SSP и publisher ad server в одном flow, не считая их одной ролью?
4. У Platform X один UI для buying, ad serving и attribution. Какие отдельные role cards нужно заполнить, прежде чем оценивать продукт?

## Источники и дополнительное чтение

1. [IAB Tech Lab — Programmatic Auction Definitions](https://iabtechlab.com/programmatic-auction-definitions/)
2. [UK Government — Online Advertising Programme consultation](https://www.gov.uk/government/consultations/online-advertising-programme-consultation/online-advertising-programme-consultation)
3. [Competition and Markets Authority — Intermediation in open display advertising](https://www.gov.uk/find-digital-market-research/online-platforms-and-digital-advertising-market-study-appendix-m-intermediation-in-open-display-advertising-2020-cma)
4. [Adjust — What is a Mobile Measurement Partner](https://www.adjust.com/glossary/mobile-measurement-partner-mmp/)
5. [IAB Tech Lab — Open Measurement SDK](https://iabtechlab.com/standards/open-measurement-sdk/)
6. [IAB Tech Lab — Identity Solutions Guidance and Recommended Practices](https://iabtechlab.com/wp-content/uploads/2024/05/Identity-Solutions-Guidance-FINAL.pdf)
7. [CDP Institute — What is a CDP?](https://www.cdpinstitute.org/what-is-a-cdp/)
8. [Oracle Marketing Cloud — CDP vs CRM vs DMP](https://blogs.oracle.com/marketingcloud/cdp-vs-crm-vs-dmp)
