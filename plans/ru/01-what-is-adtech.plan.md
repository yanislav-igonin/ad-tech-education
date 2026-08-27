# Цель обучения

После главы читатель должен уметь представить digital advertising как рынок, где demand advertiser на доступ к аудитории встречается с supply publisher в форме advertising inventory; объяснить, зачем для координации этого рынка нужны AdTech и посредники; проследить для одной рекламы отдельно поток показа, поток данных и поток денег через общий lifecycle; прочитать верхнеуровневую карту экосистемы, помня, что роли могут совмещаться, а реальная цепочка не обязана включать каждого показанного участника.

# Границы главы

## Входит в главу

- Реклама как обмен ценностями: advertiser получает возможность повлиять на осведомлённость или поведение, publisher монетизирует медиа-среду, user получает контент/сервис и рекламный опыт.
- Три базовые роли — advertiser, publisher, user — и их incentives без детальной типологии компаний.
- Supply и demand как стороны рынка, а не названия конкретных технологий.
- Advertising inventory как доступные или прогнозируемые рекламные возможности с ограничениями по среде, placement, формату, времени и аудитории. Важно: inventory — не сам user и не заранее «складированные показы».
- Причины появления technology: масштаб, фрагментация сторон рынка, быстрый выбор рекламы, доставка creative, совместимость систем, measurement, отчётность и расчёты.
- Причины появления посредников через выполняемые функции: aggregation, matching, execution, serving, measurement, verification и settlement. Не утверждать, что каждый посредник нужен в каждой сделке.
- Три раздельных потока на одной схеме: показ/доставка рекламы, данные, деньги.
- Верхнеуровневый lifecycle: цель → подготовка → покупка/выбор → доставка → реакция/outcome → measurement/reporting → optimization и расчёты.
- Рабочая граница MarTech vs AdTech и области пересечения.
- Карта логических ролей экосистемы с минимальными навигационными пояснениями к agency, DSP, ad network, ad exchange, SSP, ad server, MMP/measurement, verification и data/identity providers.

## Не входит в главу

- Глубокие определения участников, их варианты и совмещение ролей — глава 2. В этой главе каждой категории достаточно позиции на карте и одной функции.
- Формальные определения и формулы impression, viewability, CTR, CPM, eCPM, CPA, ROAS и других метрик — глава 3.
- Pricing, fees, take rate, margin и разбор пути `$100` — глава 4. Здесь только направление денег и факт разных способов оплаты посредников.
- Campaign hierarchy, targeting, bidding, budget, pacing и подробные campaign states — главы 5–7.
- Детальная модель publisher inventory, fill и yield — главы 10 и 14.
- Programmatic, RTB, auction mechanics, OpenRTB payloads и алгоритм DSP — главы 15–20. RTB допустим только как один пример автоматизированной сделки, не как синоним AdTech.
- HTTP tracking, identifiers, attribution, MMP flow и mobile privacy mechanisms — главы 21–29.
- Event schemas, pipelines, discrepancies, incrementality и analytics — главы 30–35.
- Fraud, supply-chain transparency standards, privacy и consent — главы 36–43. В главе 1 эти темы можно обозначить только как причины появления специальных функций.
- История индустрии, статистика рынка, vendor landscape и сравнение конкретных компаний: они не нужны для causal mental model и быстро устаревают.

# Результаты исследования

- Базовая модель главы устойчива; platform-specific и version-specific claims не нужны. Не включать текущие доли рынка, список лидеров или номер «актуальной» версии протокола.
- IAB Tech Lab описывает RTB как способ выставить отдельный ad impression на торги в реальном времени и связывает стандартизацию с возможностью supply и demand работать в масштабе [1]. Это годится как конкретный пример места technology, но не как универсальная модель: digital advertising также включает direct deals, reserved buying и закрытые platform ecosystems.
- Текущая программа Supply Chain & Foundations формулирует задачи стандартов как consistency, efficiency и transparency при покупке и продаже inventory в масштабе [2]. В главе эти три задачи следует использовать как проверяемое объяснение ценности technology, не углубляясь в спецификации.
- sellers.json и SupplyChain Object существуют именно потому, что одну возможность могут продавать и перепродавать несколько сторон; стандарт представляет цепочку продавцов отдельными nodes [3]. Это подтверждает многоступенчатость supply path, но детали `sellers.json`, `schain` и проверок принадлежат главе 38.
- ads.txt прямо учитывает несколько каналов продажи: собственные exchange accounts publisher, networks/sales houses и syndication partnerships [4]. Следовательно, карта должна показывать альтернативные пути, а не один обязательный конвейер.
- Анализ CMA относится к open display advertising и рассматривает intermediation, использование данных, transparency, conflicts of interest и fees [5]. Его можно использовать для проверки функций посредников, но нельзя выдавать open-display stack за всю рекламную индустрию или переносить старые fee estimates в обзорную главу.
- DSP в определении IAB UK агрегирует покупку media из нескольких sources [6]. Это поддерживает одну из главных причин посредничества — aggregation на demand side. Симметричную sell-side функцию в главе лучше объяснить концептуально, не превращая раздел в ранний пересказ главы 2.
- Не каждый technology provider находится в прямом потоке media money: часть компаний получает процент/markup, часть — SaaS или service fee, часть может вообще не принимать деньги за media. Это обязательная оговорка к схеме трёх потоков.
- Разделение AdTech и MarTech не является строгой отраслевой классификацией. Для курса использовать operational rule: AdTech прежде всего координирует paid media между buying и selling sides; MarTech прежде всего управляет customer data, owned channels и маркетинговыми коммуникациями advertiser. Measurement, attribution, identity, CDP и activation образуют overlap.
- Current practice, legacy и history: не рассказывать эволюцию от ручных IO к RTB; лишь явно снять ложное равенство `AdTech = programmatic = RTB`. Ни один legacy mechanism не нужен для обязательного coverage этой главы.

# Терминология

## Уже ожидается

- HTTP request/response, API, JSON, client/server.
- Browser, mobile app, backend, database, queue, event stream.
- Event, identifier, timestamp, realtime и asynchronous processing.
- Общие понятия business: покупатель, продавец, выручка, затраты — без знания рекламной экономики.
- AdTech-термины заранее не ожидаются.

## Вводится здесь

- **Advertising / digital advertising** — оплачиваемая коммуникация, с помощью которой организация пытается повлиять на знание, отношение или действие аудитории в цифровой среде.
- **Advertiser** — сторона, финансирующая рекламу ради business outcome.
- **Publisher** — владелец или оператор media environment, где возникает рекламная возможность.
- **User** — человек, использующий сайт/app/media; участник опыта, но обычно не продавец inventory и не сторона media payment.
- **Demand** — бюджеты и намерение advertiser купить подходящие рекламные возможности.
- **Supply** — доступные рекламные возможности publisher.
- **Advertising inventory** — множество доступных или прогнозируемых ad opportunities; не сами пользователи и не гарантия будущих impressions.
- **Placement / ad slot** — заранее определённое место или правило появления рекламы; только минимально, чтобы отличить шаблон места от конкретной возможности.
- **Ad opportunity** — конкретная возможность выбрать и показать рекламу в данном контексте.
- **Impression** — верхнеуровнево событие доставки/показа рекламы; точные границы served, rendered и viewable отложены до главы 3.
- **Creative** — материал рекламы, который доставляется и отображается user.
- **Campaign** — организованный набор рекламной активности с целью, бюджетом и creatives; без внутренней hierarchy.
- **Buy side / demand side** и **sell side / supply side** — стороны инструментов и операций вокруг advertiser и publisher.
- **Intermediary** — участник, соединяющий стороны или выполняющий специализированную функцию; не обязательно участник media-payment chain.
- **AdTech** — technology для покупки, продажи, выбора, доставки и measurement paid advertising.
- **MarTech** — technology для более широкого управления marketing и customer lifecycle, особенно customer data и owned channels.
- **Media spend, fee, publisher revenue** — три разных денежных понятия; расчёты и формулы отложены.
- **Навигационные категории карты:** agency, DSP, ad network, ad exchange, SSP, ad server, MMP/measurement, verification, data/identity provider. Здесь — по одной функции и позиции; полные определения — в главе 2.

# Предлагаемая структура главы

1. **Реклама как рынок координации**
   - Цель: сначала показать проблему и обмен ценностями, до появления acronym-ов и платформ.
   - Обязательные concepts: advertiser, publisher, user; цели и incentives каждой роли; advertiser покупает не человека, а возможность коммуникации в определённой media environment.
   - Пример/иллюстрация: треугольник ценности для subscription app — advertiser финансирует привлечение, publisher предоставляет среду, user получает контент/app experience и видит creative.
   - Покрывает: 1.1, 1.2.

2. **Что образует supply и что приносит demand**
   - Цель: определить предмет координации рынка до объяснения technology.
   - Обязательные concepts: supply, demand, advertising inventory, placement, ad opportunity, impression; различие между шаблоном места, возникающей возможностью и состоявшимся событием.
   - Пример/иллюстрация: компактная таблица `сторона → что приносит → чего хочет → ограничение`; мини-таймлайн `placement в app → user открыл экран → ad opportunity → creative выбран → impression`.
   - Покрывает: 1.3, 1.4.

3. **Почему появляется technology и зачем нужны посредники**
   - Цель: вывести AdTech из проблем рынка, а не дать список продуктов для заучивания.
   - Обязательные concepts: fragmentation, aggregation, matching, low-latency decision, serving, interoperability, measurement, reporting, settlement, quality controls.
   - Пример/иллюстрация: таблица `проблема → функция technology → категория решения`, например «тысячи publishers → aggregation → buying/selling platform». Отдельная оговорка: direct сделка может иметь короткий путь; больше участников не всегда лучше; один provider может выполнять несколько функций.
   - Покрывает: 1.5, 1.9.

4. **Карта рекламной экосистемы**
   - Цель: дать навигационную схему для следующих глав, не подменяя её универсальным request path.
   - Обязательные concepts: core roles; buy side, marketplace/connection layer, sell side; delivery; cross-cutting measurement, verification, data/identity.
   - Пример/иллюстрация: layered diagram: `advertiser → agency / advertiser ad server / DSP или ad network → exchange/connection → SSP / publisher ad server → publisher → user`; MMP/measurement, verification и data/identity расположить поперёк, а не внутрь обязательной линии. Добавить легенду: boxes — логические роли, не обязательно отдельные компании; альтернативные ветви означают «или», не последовательность.
   - Покрывает: 1.10.

5. **Три потока одной рекламной сделки**
   - Цель: разрушить ошибочную mental model, где данные, creative и деньги движутся одной стрелкой.
   - Обязательные concepts: поток показа/доставки, data flow, money flow; media fee vs service fee; measurement events как обратная связь.
   - Пример/иллюстрация: три отдельные схемы поверх одной карты:
     1. `показ`: publisher создаёт opportunity → системы выбирают рекламу → creative возвращается → publisher render-ит её user;
     2. `данные`: доступные и разрешённые context/device/audience signals идут к decision systems → решение и creative metadata возвращаются → impression/click/outcome events идут в reporting/measurement;
     3. `деньги`: advertiser funding движется к media sellers и publisher, а providers удерживают media fee либо получают отдельный service/SaaS fee.
   - Покрывает: 1.6.

6. **Lifecycle рекламы как feedback loop**
   - Цель: связать market, technology и flows во времени; показать, что реклама не заканчивается render-ом.
   - Обязательные concepts: business goal → planning/setup → creative/campaign preparation → media access и selection → serving/render → user response/business outcome → measurement/reporting → optimization и reconciliation.
   - Пример/иллюстрация: кольцевая схема, где measurement возвращает данные в следующую итерацию planning/optimization. Не показывать campaign state machine и auction internals.
   - Покрывает: 1.8.

7. **AdTech и MarTech: рабочая граница, затем сборка модели**
   - Цель: дать практический способ классифицировать продукты и сразу показать ограничения классификации.
   - Обязательные concepts: paid media vs broader marketing/customer lifecycle; buy/sell coordination vs owned-channel/customer operations; overlap в data, identity, measurement и attribution.
   - Пример/иллюстрация: сравнительная таблица `основной объект → типичные пользователи → типичные системы → overlap`; затем короткий replay subscription-app scenario по вопросам «кто платит, где inventory, кто выбирает creative, какие три потока, что возвращается в optimization».
   - Покрывает: 1.7; закрепляет mental model главы без нового обязательного coverage.

# Ключевые примеры

1. **Subscription mobile app как advertiser и контентное/game app как publisher.** User открывает publisher app; возникает ad opportunity; systems выбирают creative подписочного приложения; user видит рекламу, может кликнуть, установить app и оформить подписку. Один и тот же сценарий последовательно использовать для ролей, inventory, трёх потоков и lifecycle. Tracking и attribution не объяснять: отметить лишь, что outcome events могут вернуться в measurement systems.
2. **Один publisher, два пути продажи.** Часть inventory продана напрямую согласованному advertiser, другая доступна нескольким buyers через technology platforms. Сравнение показывает, что посредники решают aggregation/execution задачи, но не являются обязательными звеньями каждой сделки; не разбирать IO, auctions и pricing.

# Важные заблуждения

- **«User и есть inventory».** Нет: inventory — рекламные возможности в media environment. User создаёт контекст и внимание, но остаётся отдельным участником с собственными интересами и правами.
- **«Impression означает, что человек увидел рекламу».** Нет: уже на обзорном уровне нужно предупредить, что served/rendered/viewable — разные состояния; точные определения появятся в главе 3.
- **«Есть одна каноническая цепочка из всех boxes на ecosystem map».** Нет: каналы сделки различаются, роли могут совмещаться, часть providers подключается поперечно или отсутствует.
- **«Каждый посредник перепродаёт media и удерживает долю advertiser spend».** Нет: некоторые участвуют в media money flow, другие получают service/SaaS fee или лишь передают/измеряют события.
- **«Много посредников — только лишняя наценка».** У chain есть costs и conflicts, но посредники также дают aggregation, reach, interoperability, decisioning, serving, measurement и risk controls. Оценка конкретной цепочки требует сравнивать функцию и стоимость.
- **«AdTech = programmatic = RTB».** Нет: RTB — один механизм внутри programmatic, programmatic — часть AdTech, а AdTech также обслуживает direct и closed-platform advertising.
- **«AdTech и MarTech имеют строгую непроницаемую границу».** Нет: это рабочая классификация; data, identity, measurement и attribution часто пересекают обе области.

# Coverage Matrix

| Требование | Планируемое место | Способ раскрытия |
|---|---|---|
| 1.1 | Раздел 1 «Реклама как рынок координации» | Определение рынка + обмен ценностями + мотивация существования рекламы |
| 1.2 | Раздел 1 «Реклама как рынок координации» | Определения трёх ролей + incentives + треугольная схема + subscription-app example |
| 1.3 | Раздел 2 «Что образует supply и что приносит demand» | Сопоставление сторон + таблица входов/целей + пояснение относительности терминов |
| 1.4 | Раздел 2 «Что образует supply и что приносит demand» | Определение + различение placement/ad opportunity/impression + timeline example |
| 1.5 | Раздел 3 «Почему появляется technology и зачем нужны посредники» | Causal explanation `проблема → техническая функция` + таблица |
| 1.6 | Раздел 5 «Три потока одной рекламной сделки» | Три раздельные data/money/ad-delivery diagrams + walkthrough одного scenario + caveats |
| 1.7 | Раздел 7 «AdTech и MarTech» | Operational definition + comparison table + overlap cases + misconception clarification |
| 1.8 | Раздел 6 «Lifecycle рекламы как feedback loop» | Циклическая схема + walkthrough стадий + граница с campaign/measurement chapters |
| 1.9 | Раздел 3 «Почему появляется technology и зачем нужны посредники» | Mapping `market friction → intermediary function` + direct-vs-mediated example + limitation clarification |
| 1.10 | Раздел 4 «Карта рекламной экосистемы» | Layered ecosystem diagram + однострочные category labels + role/company и optional-path caveats |

# Источники

1. **IAB Tech Lab — OpenRTB.** https://iabtechlab.com/standards/openrtb/ — поддерживает claims об отдельном impression как объекте RTB-транзакции и о стандартизации взаимодействия supply/demand в масштабе. Использовать только как пример programmatic current practice, не как универсальное определение AdTech.
2. **IAB Tech Lab — Supply Chain & Foundations.** https://iabtechlab.com/standards/supply-chain-foundations/ — поддерживает claims о задачах consistency, efficiency и transparency при масштабной покупке/продаже inventory; детали стандартов в главу 1 не переносить.
3. **IAB Tech Lab — sellers.json and SupplyChain Object.** https://iabtechlab.com/sellers-json/ — поддерживает claims о нескольких sellers/resellers и необходимости видеть стороны, участвующие в продаже bid request.
4. **IAB Tech Lab — About ads.txt.** https://iabtechlab.com/ads-txt-about/ — поддерживает claims о множественных sales channels publisher: собственные accounts, networks/sales houses и syndication partners.
5. **Competition and Markets Authority — Appendix M: Intermediation in open display advertising.** https://www.gov.uk/find-digital-market-research/online-platforms-and-digital-advertising-market-study-appendix-m-intermediation-in-open-display-advertising-2020-cma — поддерживает описание функций и проблем intermediation; scope источника ограничен open display и не должен обобщаться на весь рынок.
6. **IAB UK — Demand Side Platform (DSP).** https://www.iabuk.com/jargon-buster/demand-side-platform-dsp — поддерживает claim об aggregation media buying из нескольких sources как demand-side функции.

Все URL проверены 2026-08-27. Источники нужны для точности ограниченного набора claims; остальная структура — педагогический synthesis стабильных базовых понятий без быстро устаревающих market statistics.