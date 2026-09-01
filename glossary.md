---
id: glossary
type: glossary
chapter: 99
slug: glossary
title: "Глоссарий"
language: ru
---

# Глоссарий

Определения ключевых терминов курса. В главах такие термины помечены сноской; здесь — полное описание с примером.

### RTB (real-time bidding) {#g-rtb}

**RTB (real-time bidding)** — механизм programmatic-покупки, при котором отдельная рекламная возможность (`opportunity`) выставляется на автоматический аукцион и продаётся за доли секунды — пока страница или приложение ещё не показали рекламу. Покупатели отправляют ставки, как правило, через DSP; торги идут на ad exchange или внутри SSP с auction-функцией. RTB — не синоним programmatic и тем более AdTech: это один из механизмов автоматизированной покупки внутри более широкого стека.

**Пример:** user открывает новостное приложение. Publisher через SSP выставляет показ на аукцион; несколько DSP, играя за разных advertisers, за ~100 мс возвращают ставки; победившая реклама доставляется в приложение до того, как user увидит контент.

### Agency {#g-agency}

**Agency** — компания-подрядчик, которая планирует и выполняет marketing- и media-работу от имени advertiser: разрабатывает стратегию, готовит `creative`, выбирает каналы, запускает `campaign` и ведёт отчётность. Advertiser может держать покупку media in-house, отдать её agency целиком или разделить ответственность. Agency — организация и договорная роль, в отличие от media buyer — операционной функции, которая может работать и внутри advertiser.

**Пример:** производитель кроссовок выходит на рынок Германии. Agency получает brief и бюджет, планирует каналы, настраивает `campaign` в DSP и отчитывается по результатам. Advertiser видит один consolidated invoice от agency, хотя внутри деньги распределяются по нескольким договорам — media, платформы, fees.

### Ad network {#g-ad-network}

**Ad network (рекламная сеть)** — посредник, который агрегирует рекламные возможности (`inventory`) от многих publisher и продаёт их advertiser как единый упакованный продукт: сеть берёт на себя подбор supply, ценообразование и показ, а покупатель получает одно управляемое предложение вместо десятка отдельных договоров. Цены внутри сети обычно непрозрачны для покупателя. Исторически многие ad network добавили аукционные механики и перестроились в ad exchange, поэтому под одним брендом часто совмещаются обе функции.

**Пример:** небольшому advertiser проще купить «100 000 показов в игровых приложениях за CPM $X» у одной сети, чем договорываться с каждым publisher отдельно. Сеть сама решает, из чьих приложений взять показы и по какой цене она купила их у publisher.

### Ad exchange {#g-ad-exchange}

**Ad exchange (рекламная биржа)** — transaction-слой, который соединяет покупателей и продавцов в автоматизированной сделке, обычно через аукцион в реальном времени (RTB). Отличие от ad network в прозрачности: покупатель видит описание отдельной `opportunity` и сам решает, сколько за неё платить, а цену определяет аукцион, а не прайс-лист сети. Exchange не обязательно отдельная компания между DSP и SSP: exchange- и SSP-функции часто объединены в одном продукте.

**Пример:** DSP за advertiser видит от exchange описание показа: приложение, формат, примерный контекст — и за миллисекунды решает, делать ли ставку и сколько платить. Проигравший платит ничего; победитель получает показ по цене аукциона.

### AdTech {#g-adtech}

**AdTech (advertising technology)** — совокупность технологий, которые координируют покупку, продажу, выбор, доставку, измерение и расчёты за рекламу между advertiser, publisher и посредниками: от ad server и DSP/SSP до measurement- и verification-систем. Programmatic — лишь часть AdTech: direct deals, reserved buying и закрытые платформы тоже работают на AdTech. С MarTech граница проводится по основной задаче: AdTech координирует paid media, MarTech — customer lifecycle.

**Пример:** приложение с подпиской покупает установки через DSP, publisher продаёт показы через SSP, сделка проходит через exchange, ad server доставляет creative, а MMP измеряет установки — все пять систем относятся к AdTech.

### Digital advertising {#g-digital-advertising}

**Digital advertising** — оплачиваемая коммуникация, с помощью которой advertiser пытается повлиять на знание, отношение или действие аудитории в цифровой среде. Это рынок координации между advertiser (demand), publisher (supply) и user, а не просто доставка баннера: ценности и цели сторон конфликтуют, и значительная часть AdTech существует для управления этими конфликтами.

**Пример:** контентное приложение показывает рекламу между статьями; подписочный сервис платит за возможность обратиться к его аудитории, а user получает контент «в обмен» на внимание к рекламе.

### Advertiser {#g-advertiser}

**Advertiser (рекламодатель)** — участник рынка, который финансирует рекламу ради бизнес-результата: установок, покупок подписки, роста узнаваемости. Он покупает не человека, а возможность обратиться к аудитории в определённом контексте; создаёт demand и задаёт цели, бюджет и creative.

**Пример:** стриминговый сервис выделяет бюджет на привлечение подписчиков: его DSP ищет показы в приложениях целевой аудитории и платит за каждую возможность показать рекламу.

### Publisher {#g-publisher}

**Publisher (издатель)** — владелец или управляющий media-средой, где возникают рекламные возможности: сайт, мобильное приложение, видеосервис, игра. Монетизирует среду рекламой, создаёт supply и решает, какие placement, форматы и покупателей допускать, балансируя revenue с пользовательским опытом.

**Пример:** новостное приложение выделяет баннер и полноэкранный блок после статьи и через SSP открывает их programmatic-покупателям, сохраняя лимит на частоту показов.

### Demand {#g-demand}

**Demand (спрос)** — бюджеты и намерение advertiser купить подходящие рекламные возможности; сторона рынка, вокруг которой группируются `buy side` / `demand side` — люди и системы, помогающие планировать и покупать media (agency, DSP). Demand — это сторона рынка, а не конкретная технология: платформы нельзя путать со сторонами.

**Пример:** advertiser закладывает $500 000 на привлечение пользователей в трёх странах — это demand; DSP, через которую он покупает media, относится к demand side.

### Supply {#g-supply}

**Supply (предложение)** — доступные рекламные возможности publisher; сторона рынка, вокруг которой группируются `sell side` / `supply side` — люди и системы, помогающие описывать, продавать и доставлять рекламу (SSP, ad network). Supply — это совокупность inventory на продажу, а не название платформы.

**Пример:** игровое приложение с двадцатью рекламными местами и правилами их показа — supply; SSP, через которую оно открывает доступ покупателям, — supply side.

### Advertising inventory {#g-inventory}

**Advertising inventory (рекламный инвентарь)** — множество доступных или прогнозируемых возможностей показать рекламу, ограниченное средой, местом, форматом, временем, правилами publisher и допустимым контекстом аудитории. Inventory — не список пользователей и не склад заранее произведённых показов: opportunity возникает и исчезает в момент использования продукта.

**Пример:** игра прогнозирует 10 млн полноэкранных показов на следующий месяц — это inventory; конкретная возможность возникает только когда игрок завершает уровень.

### Placement (ad slot) {#g-placement}

**Placement (ad slot, рекламное место)** — заранее заданное место или правило появления рекламы в среде publisher: баннер, полноэкранный блок после уровня, pre-roll. Placement существует в дизайне продукта до возникновения конкретной возможности и порождает поток ad opportunity по мере использования продукта.

**Пример:** «полноэкранный блок после завершения уровня в игре» — placement; момент, когда конкретный игрок дошёл до этого места, — уже ad opportunity.

### Ad opportunity {#g-ad-opportunity}

**Ad opportunity (рекламная возможность)** — конкретная возможность выбрать и показать рекламу, возникшая, когда user дошёл до placement. Короткоживущее событие: в цифровой среде оно может исчезнуть быстрее, чем человек успеет принять решение, поэтому обрабатывается системами за миллисекунды, а в programmatic выставляется на торги как отдельная единица.

**Пример:** игрок завершил уровень — приложение отправляет запрос с описанием контекста, и до отрисовки экрана системы успевают выбрать и вернуть рекламу.

### Impression {#g-impression}

**Impression (показ)** — событие доставки или показа выбранной рекламы, зарегистрированное системой по определённому правилу; единица подсчёта, а не факт восприятия человеком. `Served`, `rendered` и `viewable` — разные состояния доставки, поэтому счётчики разных участников одной сделки могут не совпадать.

**Пример:** ad server засчитал 100 000 impressions по правилу «баннер загружен», а measurement-провайдер — 82 000 по правилу «видимая площадь не менее секунды»; оба правы по своим правилам.

### DSP (Demand-Side Platform) {#g-dsp}

**DSP (Demand-Side Platform, платформа стороны спроса)** — платформа, которая автоматизирует покупку рекламных возможностей для advertiser: агрегирует доступ к нескольким supply-источникам, оценивает каждую opportunity и решает, делать ли ставку и сколько платить. Относится к demand side не потому, что «создаёт demand», а потому, что действует в интересах покупателя.

**Пример:** advertiser загружает в DSP бюджет, цель и аудитории; DSP участвует в аукционах на десятках exchange и SSP и покупает показы, укладываясь в целевую стоимость установки.

### SSP (Supply-Side Platform) {#g-ssp}

**SSP (Supply-Side Platform, платформа стороны предложения)** — платформа, которая помогает publisher управлять продажей inventory: задаёт правила доступа покупателей, подключает programmatic demand (DSP, exchange), проводит или передаёт аукцион. SSP- и exchange-функции часто объединены в одном продукте.

**Пример:** новостной сайт задаёт в SSP минимальные цены и запрет на отдельные категории рекламы; SSP открывает показы сотням DSP и выбирает лучшее предложение.

### Ad server {#g-ad-server}

**Ad server (рекламный сервер)** — система, которая выбирает, доставляет и регистрирует рекламу по заданным правилам. Бывает publisher-стороны (сопоставляет прямые кампании, сети и programmatic-спрос, управляет delivery) и advertiser-стороны (хранит creative, считает показы и клики); термин обозначает функцию, а не сторону рынка.

**Пример:** publisher ad server получает решение от SSP, прямую кампанию и резерв сети — и решает, чью рекламу вернуть в этом запросе; advertiser ad server тем временем отдаёт creative и логирует показ.

### Programmatic {#g-programmatic}

**Programmatic (программатик)** — автоматизированная покупка и продажа рекламы: решение по каждой opportunity принимают системы, а не люди. RTB — лишь один из его механизмов; programmatic также включает автоматизированные reserved- и direct-механики без аукциона. Programmatic — часть AdTech, но не весь AdTech.

**Пример:** гарантированная сделка «показы из спортивного раздела по фиксированной цене через автоматизированный договор» — programmatic без аукциона в реальном времени.

### Creative {#g-creative}

**Creative (креатив)** — рекламный материал, который доставляется и показывается user: баннер, видео, нативный формат, playable. Наряду с правилами targeting является объектом доставки и должен соответствовать формату и правилам среды publisher; в кампании обычно готовят несколько creatives.

**Пример:** для кампании готовят вертикальное видео на 15 секунд и playable-версию и загружают их в DSP с metadata о формате и размере.

### Campaign {#g-campaign}

**Campaign (рекламная кампания)** — организованный набор рекламной активности advertiser с целью, бюджетом, правилами доставки и creatives. До показа её условия сообщаются системам покупки; объекты и события связываются identifiers вроде `campaign_id`.

**Пример:** осенняя кампания подписочного сервиса: цель — установки, бюджет $200 000, три creatives, ограничение частоты — всё настраивается в DSP до первого показа.

### Measurement {#g-measurement}

**Measurement (измерение)** — функция регистрации и агрегации рекламных событий (impressions, clicks, outcomes) для отчётности и оптимизации. Measurement-провайдеры дают независимую точку наблюдения; у разных участников разные timestamps и правила подсчёта, поэтому отчёты не обязаны совпадать идеально. В mobile выделенная категория — MMP.

**Пример:** advertiser сверяет показы у себя, у ad server и у measurement-провайдера — счётчики расходятся из-за разных точек наблюдения и правил.

### MMP (Mobile Measurement Partner) {#g-mmp}

**MMP (Mobile Measurement Partner, мобильный измерительный партнёр)** — специализированная категория measurement-провайдеров для mobile: измеряет установки и in-app события, проводит attribution и предоставляет независимые данные сторонам сделки. Не синоним любой системы measurement.

**Пример:** приложение подключает MMP, чтобы связать клик из рекламы с установкой из app store и последующей покупкой подписки.

### Verification {#g-verification}

**Verification (верификация)** — независимая оценка качества и условий показа: видимость, окружение, fraud, соответствие правилам. Verification-провайдеры подключаются поперёк цепочки и не участвуют в принятии коммерческого решения о сделке.

**Пример:** verification-провайдер помечает 4% показов как невидимые и 1% как fraud — advertiser вычитает их из оплаты.

### Intermediary {#g-intermediary}

**Intermediary (посредник)** — участник, который соединяет стороны рынка или выполняет специализированную функцию: agency, ad network, exchange, ad server, measurement-, verification- и data-провайдеры. Оправдан, когда ценность его функции (reach, aggregation, interoperability, скорость, measurement, контроль риска) выше стоимости и сложности; не обязан присутствовать в каждой сделке.

**Пример:** небольшой advertiser покупает показы у ad network, потому что не готов вести десятки интеграций с publisher напрямую, — функция агрегации оправдывает fee.

### Media spend {#g-media-spend}

**Media spend (рекламные расходы)** — деньги, которые advertiser выделяет и тратит на покупку рекламы. Проходят через продавцов media и в итоге образуют publisher revenue, уменьшаясь по пути на fees; не синоним publisher revenue и не синоним intermediary fee — это разные суммы одной цепочки.

**Пример:** из $100 media spend $70 доходит до publisher как revenue, $20 забирают платформы, $10 — fee agency; data-провайдер получает отдельную подписку вне media money.

### Publisher revenue {#g-publisher-revenue}

**Publisher revenue (выручка publisher)** — часть media spend, дошедшая до владельца inventory после удержаний посредников и платформ; отличается от advertiser spend на сумму всех fees в цепочке. Формируется только из медиаплатежей: service- и SaaS-fee участников вне media money к ней не относятся.

**Пример:** advertiser потратил $100, из которых после exchange и SSP publisher получил $68 — это его publisher revenue по этой сделке.

### MarTech {#g-martech}

**MarTech (marketing technology)** — технологии для более широкого управления marketing и customer lifecycle: customer data, коммуникациями и собственными каналами advertiser (CRM, marketing automation, CDP, email/push-платформы). Пересекается с AdTech в measurement, attribution, identity и activation, поэтому границу проводят по основной задаче системы, а не по ярлыку vendor.

**Пример:** покупка подписки — outcome signal для AdTech measurement и одновременно триггер email-цепочки удержания в MarTech.

### Data / identity provider {#g-data-provider}

**Data / identity provider (поставщик данных и идентичности)** — поперечная категория провайдеров, которые поставляют или связывают допустимые data signals: помогают системам интерпретировать контекст и связывать данные об одном пользователе между участниками. Работают параллельно цепочке покупки, а не «между» двумя обязательными соседями.

**Пример:** identity-провайдер даёт общий ключ, по которому DSP и publisher в рамках разрешённых правил узнают в разных запросах одного и того же пользователя.

### Media buyer {#g-media-buyer}

**Media buyer** — человек, команда или функция, которая выбирает media, platforms и условия покупки, распределяет spend и настраивает campaigns. Это операционная роль, а не организация: media buyer может работать внутри advertiser, внутри agency или другой buying organization. Не синоним agency (организация-подрядчик) и не синоним DSP: человек формулирует и настраивает решения, платформа исполняет часть buying workflow в масштабе.

**Пример:** media buyer в agency получает план каналов и бюджет, заводит campaign в DSP, задаёт аудитории и ставки, а по ходу месяца перераспределяет spend между platforms по результатам отчётов.

### Brand advertising {#g-brand-advertising}

**Brand advertising (brand-реклама)** — ориентация рекламы, которая в первую очередь меняет awareness, consideration или perception аудитории: знание, рассмотрение и отношение к продукту. Оценивается по отложенным показателям, а не по немедленному действию. Это ориентация, а не вид компании: один advertiser может сочетать brand- и performance-активность.

**Пример:** стриминговый сервис показывает video campaign для знакомства с брендом и оценивает её по подъёму awareness и intention, а не по установкам за неделю.

### Performance advertising {#g-performance-advertising}

**Performance advertising (performance-реклама)** — ориентация рекламы, управляемая вокруг измеримого действия и стоимости его получения: регистрации, trial, установки, покупки. Оценивается через attribution и стоимость результата. Это ориентация, а не вид компании и не синоним «измеримой рекламы»: цель, горизонт оценки и ожидаемые доказательства результата отличаются от brand advertising.

**Пример:** acquisition campaign приложения оптимизирована в DSP на стоимость установки: ставка корректируется по каждому источнику, чтобы укладываться в целевой CPI.

### Attribution {#g-attribution}

**Attribution (атрибуция)** — правила, по которым доступные рекламные touchpoints (impression, click) сопоставляются с outcomes (установка, регистрация, покупка) и получают credit за конверсию. Attribution отвечает на вопрос «какому источнику по выбранным правилам приписано действие», а не «была ли реклама истинной причиной»: credit не доказывает causality. Провайдеры attribution — отдельная поперечная категория; в mobile — MMP.

**Пример:** user увидел видео в игре, на следующий день кликнул по баннеру и подписался; MMP по правилу «последний клик» назначает credit баннеру, и остальные источники остаются без credit, даже если участвовали.

### DMP (Data Management Platform) {#g-dmp}

**DMP (Data Management Platform)** — advertising-oriented система для управления, сегментации и activation audience data: собирает campaign signals и внешние datasets, строит audience profiles и segments и активирует их через рекламные интеграции. Не обязана быть system of record для полного customer lifecycle. Историческое правило «DMP — только cookies и anonymous data» ненадёжно; рабочая граница с CDP проходит по главной задаче — рекламная audience activation против устойчивого customer record.

**Пример:** media team собирает в DMP сегмент «играли в казуальные игры, видели рекламу, но не устанавливали приложение» и активирует его в DSP для acquisition campaign.

### CDP (Customer Data Platform) {#g-cdp}

**CDP (Customer Data Platform)** — система, которая собирает first-party события и customer data из product, CRM и других систем в persistent unified customer record и делает profiles, events и segments доступными downstream-системам. Не покупает media и не назначает attribution credit; относится к управлению customer lifecycle, что делает её частью MarTech.

**Пример:** subscription app отправляет в CDP события trial и подписки; CDP собирает единый профиль и отдаёт сегмент «прошёл trial, не оплатил» в рекламные и email-системы.

### Identity provider {#g-identity-provider}

**Identity provider** — провайдер, который связывает или переводит identifiers из разрешённых источников для activation, measurement и смежных use cases: например, сопоставляет customer ID advertiser с platform-specific ID. Не создаёт consent и не доказывает identity реального человека: matching в рамках одного решения не равен legal permission. Отличается от data provider задачей — не поставляет datasets, а устанавливает соответствие identifiers.

**Пример:** advertiser и publisher используют разные идентификаторы одного пользователя; identity-провайдер переводит их в общий identifier, чтобы частота показов считалась по человеку, а не дважды.

### Metric contract {#g-metric-contract}

**Metric contract (контракт метрики)** — полное определение метрики, по которому её число можно воспроизвести и интерпретировать: event definition, measurement point, filters и deduplication, numerator/denominator, dimensions, period и окна, currency, perspective и ledger boundary. Название метрики без контракта не задаёт смысла: одна и та же формула на разных contracts отвечает на разные вопросы.

**Пример:** `CTR = 2%` от ad server по rendered impressions и filtered clicks — не то же число, что `CTR = 2%` от платформы по served impressions и всем clicks: названия совпадают, contracts различаются.

### Click {#g-click}

**Click (клик)** — qualifying user-initiated interaction с рекламой, зарегистрированная по правилу конкретной системы. Даже одно действие имеет несколько measurement points: initiated, measured (click tracker), received (destination) и resolved (landing page) clicks не обязаны совпадать из-за обрывов соединения, redirect-цепочек и filters.

**Пример:** user кликнул по баннеру, но соединение оборвалось на redirect: click tracker засчитал measured click, а destination не получил request — счётчики расходятся, и оба честны по своим правилам.

### Conversion {#g-conversion}

**Conversion (конверсия)** — valuable action или outcome, который advertiser определил как значимый (install, trial, первая оплата, renewal, purchase) и который система засчитала по measurement и attribution rules. Conversions нельзя складывать без явного counting rule: один click может привести к нескольким conversions. Observed conversion — зарегистрированное событие; attributed conversion — событие, которому attribution rule назначил credit; ни то ни другое не доказывает causality.

**Пример:** click привёл к install, затем к trial и оплате подписки — по правилам отчёта это три conversions одного interaction, и итоговая сумма зависит от режима подсчёта (одна или каждая conversion на interaction).

### Viewable impression {#g-viewable-impression}

**Viewable impression (видимый показ)** — impression, выполнивший применимые geometry/time criteria viewability (классический MRC benchmark: не менее 50% пикселей creative на экране одну continuous second для display и две для video). Viewable означает standardized opportunity to see, а не внимание человека; non-viewable (measurement состоялся, criteria не выполнены) не равно non-measurable (статус определить не удалось).

**Пример:** баннер загрузился и отрисовался, но половина area осталась вне вьюпорта дольше порога — measurement помечает его non-viewable, хотя rendered impression состоялся.

### Reach {#g-reach}

**Reach (охват)** — de-duplicated число unique entities (person, device, household, account или modeled audience), получивших хотя бы одну qualifying exposure за период, либо доля таких entities в явно заданной population: `reach rate = reached unique entities / declared universe × 100%`. Сравним только при одинаковых entity definition, exposure rule, population, de-dup scope и period.

**Пример:** кампания достигла 20,000 de-duplicated persons из universe 200,000 — reach count 20,000 и reach rate 10%; те же показы, посчитанные по device IDs, дали бы другие числа.

### Frequency {#g-frequency}

**Frequency (частота)** — среднее число qualifying exposures на reached unique entity за тот же период: `frequency = qualifying impressions / reached unique entities`. Это среднее, а не распределение: оно не означает, что каждый человек видел рекламу одинаковое число раз.

**Пример:** 60,000 qualifying viewable impressions на 20,000 de-duplicated persons — average frequency 3, хотя у части пользователей один показ, а у других — пятнадцать.

### CTR (Click-Through Rate) {#g-ctr}

**CTR (Click-Through Rate)** — доля выбранных impressions, после которых зарегистрированы выбранные clicks: `CTR = qualifying clicks / counted impressions × 100%`. Число зависит от click/impression basis (served или rendered, filtered или все) и population; высокий CTR сам по себе не означает качественный traffic, conversions или causal lift.

**Пример:** 160 clicks на 8,000 counted impressions — CTR 2%; замена served impressions на rendered изменит знаменатель и результат.

### CVR (Conversion Rate) {#g-cvr}

**CVR (Conversion Rate)** — доля qualifying conversions в declared eligible precursor events: `CVR = qualifying conversions / declared eligible precursor events × 100%`. Голый CVR скрывает переход: сравнимы только названные переходы вроде click-to-install или install-to-trial; значение выше 100% возможно при нескольких conversion actions на один interaction.

**Пример:** 24 attributed subscriptions на 160 eligible clicks — click-to-subscription CVR 15%; тот же campaign имеет другой click-to-install CVR, и сравнивать их напрямую нельзя.

### CPM (Cost per Mille) {#g-cpm}

**CPM (Cost per Mille)** — стоимость тысячи counted impressions для buyer: `CPM = advertiser cost or spend / counted impressions × 1,000`. Термин неоднозначен без контракта: может означать pricing basis, rate, bid или observed average CPM post-fact; observed CPM отвечает на вопрос «сколько buyer потратил на тысячу counted impressions».

**Пример:** $96 spend на 8,000 counted impressions — observed CPM $12, даже если ставки в аукционе были другими.

### eCPM (effective CPM) {#g-ecpm}

**eCPM (effective CPM)** — признанный revenue seller на тысячу counted impressions: `eCPM = recognized revenue / counted impressions × 1,000`. Обычно publisher-перспектива; позволяет сравнивать demand, оплачиваемый по CPM, CPC или CPA, на общей realised-revenue basis. Не синоним CPM: numerators принадлежат разным ledger boundaries.

**Пример:** seller получил $800 recognized revenue за 80,000 counted impressions — eCPM $10, хотя покупатели платили по разным моделям: один по CPM, другой по CPC, третий по CPA.

### CPC (Cost per Click) {#g-cpc}

**CPC (Cost per Click)** — cost или spend на qualifying clicks по disclosed rule: `CPC = cost / qualifying clicks`. Bid/target CPC не равен фактическому average CPC: первый — ставка или цель оптимизации, второй — post-fact среднее.

**Пример:** $96 на 160 qualifying clicks — average CPC $0.60, независимо от того, какие bids выставлялись по ходу периода.

### CPA (Cost per Action) {#g-cpa}

**CPA (Cost per Action)** — cost на advertiser-defined qualifying actions: `CPA = cost / qualifying actions`. Action определяется контрактом кампании — trial, order, lead или subscription, не обязательно новый customer, поэтому CPA нельзя читать без имени action и сравнивать между кампаниями напрямую.

**Пример:** $96 на 24 attributed subscriptions — CPA $4 при action = attributed subscription; для соседней кампании action — lead, и её CPA с этим числом несопоставим.

### CPI (Cost per Install) {#g-cpi}

**CPI (Cost per Install)** — cost mobile acquisition на qualifying installs: `CPI = cost / qualifying installs`. Install count зависит от measurement и attribution rules, поэтому CPI сравним только при названных правилах подсчёта установок.

**Пример:** $5,000 spend на 2,500 attributed installs — CPI $2 по правилам выбранного MMP; другой attribution window даст другой install count и другой CPI.

### CPL (Cost per Lead) {#g-cpl}

**CPL (Cost per Lead)** — cost на business-defined qualifying leads: `CPL = cost / qualifying leads`. Lead definition и качество различаются между бизнесами, и lead ещё не customer, поэтому низкий CPL бесполезен без qualification.

**Пример:** $2,000 на 100 отправленных форм — CPL $20; если четверть leads не проходит qualification, эффективная стоимость заметно выше.

### CAC (Customer Acquisition Cost) {#g-cac}

**CAC (Customer Acquisition Cost)** — allocated acquisition costs бизнеса на новых customers: `CAC = allocated acquisition costs / new customers`. Шире platform CPA: в numerator могут входить media, agency, sales и onboarding costs, а new customer определяется бизнес-правилом (например первая подтверждённая оплата). Platform CPA нельзя переименовать в CAC, пока customer event, period, cost allocation и refunds не согласованы.

**Пример:** platform report показывает $4 CPA за подписку, но бизнес включил в acquisition costs media, agency и onboarding и признаёт customer с первой оплаты — его CAC оказался $7.

### Revenue {#g-revenue}

**Revenue (выручка)** — сумма, признанная выбранной entity по её правилам учёта на её ledger boundary. Estimated dashboard value, invoiced amount, settled amount и recognized revenue могут быть разными состояниями одной цепочки; для сравнения нужно согласовать period, timezone, currency conversion, taxes/refunds и participant.

**Пример:** platform признала $100 revenue по сделке, а publisher — $68: обе суммы верны, но это разные entities с разными правилами признания выручки.

### Cost {#g-cost}

**Cost (затраты)** — расходы той entity, чью экономику анализируют, в выбранном scope: для advertiser — media cost, для platform — downstream cost, для бизнеса — более широкий набор расходов. Не синоним spend: spend — расход buyer на media, cost может включать неплатёжные и вне media составляющие и всегда привязан к perspective.

**Пример:** advertiser потратил $96 media spend, но его полный cost с delivery продукта, agency и operations — $600; ROI считается по второй сумме.

### ROAS (Return on Ad Spend) {#g-roas}

**ROAS (Return on Ad Spend)** — media efficiency: attributed conversion value или revenue на ad spend: `ROAS = attributed conversion value or revenue / ad spend`; записывается как `5.0x` или `500%`. Attribution-dependent: зависит от attribution rules и выбранного value field и без causal design не доказывает incremental return. Высокий ROAS совместим с отрицательным ROI.

**Пример:** $480 attributed conversion value при $96 ad spend — ROAS 5.0x; но при полном cost $600 тот же campaign убыточен.

### ROI (Return on Investment) {#g-roi}

**ROI (Return on Investment)** — прибыльность более широкого investment scope: `ROI = net profit / total relevant investment cost = (return − total relevant cost) / total relevant cost`. В отличие от ROAS использует полный выбранный cost scope, а не только ad spend.

**Пример:** return $480 при полном cost $600 — net profit −$120 и ROI −20%, хотя ROAS по media spend равен 5.0x.

### ARPU (Average Revenue per User) {#g-arpu}

**ARPU (Average Revenue per User)** — selected revenue на всех eligible users выбранной population или cohort за период: `ARPU = selected revenue / all eligible users`. Требует user definition, revenue categories (purchase, subscription, ad), period и cohort/population; включает non-paying users.

**Пример:** 1,000 active users принесли $1,000 recognized revenue за месяц — ARPU $1; о lifetime это число ничего не говорит без cohort и horizon.

### ARPPU (Average Revenue per Paying User) {#g-arppu}

**ARPPU (Average Revenue per Paying User)** — purchase revenue на paying users: `ARPPU = selected purchase revenue / paying users`. Делит только на payers и требует payer event, purchase revenue, правил refunds и period; всегда выше ARPU той же population.

**Пример:** те же $1,000 purchase revenue от 100 платящих из 1,000 users — ARPPU $10 при ARPU $1.

### LTV (Lifetime Value) {#g-ltv}

**LTV (Lifetime Value)** — cumulative observed или predicted value cohort members: `LTV = cumulative observed or predicted value / cohort members`. Требует cohort, horizon, identity rule, value basis (revenue или contribution) и статуса observed/predicted; revenue LTV не вычитает расходы, contribution LTV считается на оговорённой маржинальной basis. Без этих определений «LTV пользователя» — не определённый scalar.

**Пример:** observed 30-day revenue LTV cohort установок — $4.20; predicted 12-month contribution LTV по модели — $6.80: это разные метрики, а не одно число с разной точностью.

### Fill rate {#g-fill-rate}

**Fill rate** — доля eligible ad requests, приведшая к fill, например `counted filled impressions / eligible ad requests`. Publisher/ad server metric перехода request → delivery; безопасного vendor-neutral denominator нет — product может делить impressions, matched responses или другой fill event на requests, opportunities или ad units. Fill — не конечный outcome: matched response может не render-иться и не стать counted impression. Не синоним match, response и delivery rate.

**Пример:** 80,000 counted impressions на 100,000 eligible ad requests — fill rate 80%; часть filled responses не стала impressions, поэтому fill rate не равен итоговой доставке показов.

### Win rate {#g-win-rate}

**Win rate** — доля submitted eligible bids, выигравших аукцион: `winning bids / submitted eligible bids`. Buyer/deal metric перехода bid → auction win; требует раскрытия population. Win notice ещё не delivery и не billing event: аукцион может выбрать bid победителем, но creative не будет доставлен или impression не станет billable.

**Пример:** 9,000 wins на 45,000 bids — win rate 20%, при этом counted/billable impressions 8,000: win и billing — разные event points, расхождение не ошибка.

### Ledger boundary {#g-ledger-boundary}

**Ledger boundary (граница учёта)** — граница, внутри которой entity признаёт и регистрирует суммы и события по собственным правилам: одна и та же сумма является revenue на одной boundary и downstream media/traffic cost на другой. Из-за разных ledger boundaries отчёты advertiser, platform и publisher об одной сделке закономерно не совпадают и не обязаны совпадать.

**Пример:** advertiser потратил $100; buying platform признала $100 revenue на своей boundary, publisher увидел $68 — числа разные, потому что каждая запись живёт в своём ledger.

### Pricing basis {#g-pricing-basis}

**Pricing basis** — договорное правило расчёта цены: объект, за который buyer платит, — impression, click, action, install, lead, доля proceeds, период доступа к software или иной согласованный результат. Название метрики в интерфейсе (`CPM`, `CPC`, `CPA`) не задаёт basis само по себе: одно и то же имя может быть договорной ценой, bid или фактическим средним после событий, поэтому денежное обязательство создаёт только названная в договоре basis.

**Пример:** договор «`$10 CPM`, billable event — rendered impression» и договор «`$10 CPA`, billable event — подписка» дают одинаковую цифру цены, но разное распределение риска вдоль воронки.

### Billable event {#g-billable-event}

**Billable event** — qualifying-событие, определённое договором, после которого payee вправе начислить billable amount — сумму по pricing basis после counts, rates, validation и договорных adjustments; она ещё не обязательно выставлена в invoice, признана revenue или оплачена. Событие задаётся contract policy, а не протоколом автоматически: auction win, win notice и billing notice — разные точки, и win не гарантирует delivery или charge.

**Пример:** в OpenRTB win notice (`nurl`) и billing notice (`burl`) разделены — аукцион выбрал bid победителем, но начисление возникает только после договорного события, например rendered impression.

### Revenue share {#g-revenue-share}

**Revenue share** — договорное распределение названной revenue или proceeds base между сторонами в заданной доле. Без раскрытия базы не определён: нужно знать, чьи proceeds, на какой ledger boundary, за какой период, до или после каких agreed adjustments и кто выполняет расчёт; доля от одной boundary не равна доле от исходного advertiser spend.

**Пример:** SSP удерживает 15% от `$80` proceeds на своей boundary — `$12`; относительно исходного `$100` advertiser spend те же `$12` составляют 12%.

### Fixed fee {#g-fixed-fee}

**Fixed fee** — заранее согласованная сумма за period, scope или deliverable, не зависящая от объёма media transaction. Полностью отдельный money flow относительно media money: не вычитается из media dollar и не становится publisher payout или take rate. Provider несёт риск, что согласованный scope потребует больше работы.

**Пример:** `$2,000/month` за доступ к ad server и usage tier — service charge по отдельному договору, даже если число обработанных impressions влияет на tier.

### SaaS pricing {#g-saas-pricing}

**SaaS pricing** — модель оплаты software-платформы: subscription, seats, usage tier или processed volume за доступ к продукту. Образует отдельный software/service flow: usage event платформы не становится media event автоматически, а SaaS charge не превращает отношение в покупку inventory.

**Пример:** платформа тарифицирует `$2,000/month` плюс tier по числу processed impressions; рост объёма меняет tier, но не делает этот платёж стоимостью media.

### Markup {#g-markup}

**Markup** — надбавка к base cost, выраженная долей от cost denominator: `markup = (selling amount − acquisition cost) / acquisition cost`. Не равен spread (абсолютной разнице) и gross margin (которая использует accounting revenue и cost of revenue reporting entity); сравним только при названных buy/sell amounts.

**Пример:** сеть покупает media за `$80` и продаёт advertiser за `$100`: spread `$20` — это 25% markup на acquisition cost и одновременно 20% take rate относительно spend.

### Take rate {#g-take-rate}

**Take rate** — retained amount относительно названного transaction flow на выбранной boundary: `take rate = retained amount / named transaction flow`. Сравним только при раскрытых numerator, denominator и included fees: одна и та же сумма даёт разные ставки относительно boundary proceeds и исходного advertiser spend.

**Пример:** SSP удерживает `$12` из `$80` proceeds — take rate 15% на своей boundary, но 12% относительно исходного `$100` spend.

### Spread {#g-spread}

**Spread** — абсолютная разница между selling amount и acquisition/downstream amount на названной boundary. Экономическое ядро resale- и arbitrage-моделей посредника; markup и take rate вычисляются из одного spread с разными denominators и без named boundary несравнимы.

**Пример:** покупка media за `$80` и продажа за `$100` — spread `$20`; это 25% markup на cost и 20% take rate на spend одновременно.

### Proceeds {#g-proceeds}

**Proceeds** — сумма transaction inflow до согласованного распределения на выбранной boundary. Слово `gross` рядом с proceeds описывает base до split, а не автоматически `gross revenue` в финансовой отчётности: для расчёта долей важны boundary, период и допустимые deductions.

**Пример:** SSP-boundary proceeds `$80` делятся на `$12` retained и `$68` publisher share; относительно исходного `$100` advertiser spend это другие проценты.

### Retained amount {#g-retained-amount}

**Retained amount** — часть transaction flow, остающаяся у participant на его boundary до его собственных costs. Характеризует transaction economics, но не является recognized revenue или profit: accounting presentation и расходы определяются отдельной policy entity.

**Пример:** в разложении `$100 → $80 → $68` network retained `$20`, SSP retained `$12` — обе суммы являются остатками flow, а не accounting profit.

### Gross/net revenue presentation {#g-gross-net-revenue}

**Gross/net revenue (presentation)** — вариант отражения revenue reporting entity: gross показывает согласованную оплату целиком, net — только fee или commission. Выбор следует contract-specific principal-agent assessment для конкретного specified good/service, а не логике «деньги до/после расходов»: label продукта, invoice или gross billings сами по себе вывод не определяют.

**Пример:** network с `$100` sell и `$80` supplier component при principal conclusion показывает revenue `$100` и cost of revenue `$80`; при agent conclusion — только net fee `$20`.

### Gross billings {#g-gross-billings}

**Gross billings** — сумма, выставленная клиентам или прошедшая через collection до исключения supplier components; более широкая величина, чем recognized revenue, и не его synonym. Billings описывают биллинг, а не accounting conclusion principal/agent.

**Пример:** платформа при agent conclusion показывает gross billings `$100` с receivables/payables, а recognized revenue — только net fee `$20`.

### Cost of revenue {#g-cost-of-revenue}

**Cost of revenue (CoR)** — расходы, которые reporting entity классифицирует как непосредственно связанные с получением признанного revenue по своей policy. Не любой cash outflow: состав определяется policy компании, а operating expenses, interest и taxes находятся ниже gross profit.

**Пример:** при gross presentation supplier component `$80` показывается как cost of revenue рядом с recognized revenue `$100`.

### Gross margin {#g-gross-margin}

**Gross margin** — доля recognized revenue, остающаяся после cost of revenue той же reporting entity на той же accounting basis: `gross margin = (recognized revenue − cost of revenue) / recognized revenue`; gross profit — числитель этой формулы. Не равна take rate, который делит retained amount на named transaction flow.

**Пример:** gross presentation: revenue `$100`, CoR `$80` — gross profit `$20`, margin 20%; тот же business в net presentation показывает margin 100% при тех же `$20` economics — margin зависит от presentation.

### Principal / agent {#g-principal-agent}

**Principal / agent** — accounting assessment роли reporting entity относительно конкретного обещанного specified good/service: principal контролирует его до передачи customer и показывает оплату gross, agent организует предоставление другой стороной и показывает net fee/commission. Control — способность направлять использование и получать существенные benefits до transfer; `primary responsibility`, `inventory risk` и `pricing discretion` — evidence, а не механический score; одна компания может быть principal в одном flow и agent в другом.

**Пример:** AdTech-платформа при agent conclusion признаёт net fee по platform transactions, но может быть principal по отдельным insertion-order campaigns, где сама обязуется поставить delivery.

### Arbitrage {#g-arbitrage}

**Arbitrage** — модель intermediary, которая покупает media/traffic дешевле и продаёт дороже либо покупает на одной pricing basis, а продаёт на другой. Экономика держится на spread в обмен на принятый риск: volume/fulfillment, basis mismatch и reconciliation risk могут обратить spread в loss. Не любой intermediary fee — arbitrage, и arbitrage не автоматически злоупотребление; проблема — opacity buy/sell basis и spread для customer.

**Пример:** network обязалась купить batch media за `$80`, но продала advertiser только часть согласованного scope — непроданный остаток cost ложится на неё, spread уменьшается или становится loss.

### Basis mismatch {#g-basis-mismatch}

**Basis mismatch** — покупка и продажа одной media на разных pricing basis, например покупка impressions по CPM и продажа clicks или actions по CPC/CPA. Добавляет performance risk к arbitrage: revenue посредника зависит от realised CTR/CVR и validation, а исходная media cost остаётся, если downstream billable amount не покрывает её.

**Пример:** посредник купил impressions за `$80` в расчёте на 100 clicks, зарегистрировано 60 — выручка по CPC не покрывает media cost.

### Optimization target {#g-optimization-target}

**Optimization target** — outcome, под который bidding system настраивает будущие решения, например `target CPA`. Не превращает договор в CPA billing: payment model устанавливает contract, realized metrics описывают случившееся post-fact, optimization target влияет только на decisions до события.

**Пример:** advertiser платит CPC за qualifying clicks, а система оптимизируется под `target CPA` по подписке — billing basis и optimization target сосуществуют в одной кампании.

### Ad account (advertiser account) {#g-ad-account}

**Ad account (advertiser account, рекламный аккаунт)** — tenant на advertising platform, внутри которого существуют campaigns и связанные настройки; образует сразу несколько границ: ownership и access (роли и permissions операторов), billing identity, currency и time zone, namespace идентификаторов и shared configuration (data sources, brand assets, defaults). Юридическая компания advertiser и ad account — не одно и то же: у одной компании может быть несколько accounts под регионы, бренды и валюты, а один account может обслуживать несколько инициатив одной legal entity.

**Пример:** Subscription App Ltd. ведёт ad account EU (EUR, time zone Europe/Berlin) и отдельный ad account US (USD); agency получает delegated доступ к обоим, но owner и billing identity остаются у advertiser.

### Manager account {#g-manager-account}

**Manager account** — административный слой platform, который даёт agency или внутренней группе централизованный delegated доступ к нескольким ad accounts. Это administrative access, а не дополнительный delivery-уровень: manager account не участвует в delivery-иерархии каждой campaign.

**Пример:** agency получает manager-доступ к ad accounts десяти клиентов — операторы заходят через один вход, но budget, targeting и отчётность каждого account остаются раздельными.

### Ad {#g-ad}

**Ad (объявление)** — исполняемая delivery-единица кампании: связывает parent group (ad group или ad set), advertiser identity, creative, destination, tracking и status. Ad — не то же, что creative: один creative может исполняться в нескольких ads с разными parent rules, destinations и состояниями.

**Пример:** video creative переиспользуется двумя ads: один ведёт в store listing для новых users, второй — deep link в приложение для установивших; у каждого ad свой ID, status и tracking settings.

### Ad group / ad set {#g-ad-set}

**Ad group / ad set** — промежуточный уровень иерархии кампании между campaign и ad, группирующий ads с общими execution rules. Названия и состав полей vendor-specific, универсальной schema нет: в Google-like модели ad group объединяет близкие ads и triggering criteria (например related keywords), в Meta-like модели ad set хранит audience, placements, optimization, bid, budget и schedule.

**Пример:** в Meta-кампании ad set «US» содержит audience, placements и budget, а внутри него — три ads с разными creatives; в Google Ads ту же роль middle layer играет ad group с keywords.

### Campaign objective {#g-campaign-objective}

**Campaign objective (цель кампании)** — high-level business intent или setup guidance, сообщённый platform при создании кампании: awareness, traffic, leads, app promotion, sales. Objective предлагает campaign types, features и defaults, но не обязан совпадать с событием, которое optimizer непосредственно предсказывает: optimization event выбирается отдельно.

**Пример:** подписочный сервис выбирает objective `App promotion`, а optimization event — `paid_subscription`: objective описывает intent, наблюдаемый signal для delivery определяется отдельно.

### Targeting {#g-targeting}

**Targeting (таргетинг)** — eligibility rules кампании: какие opportunities, users или contexts допустимы либо предпочтительны для показа — geo, device, context, audience/keyword criteria, exclusions. Targeting отвечает на вопрос «для каких opportunities/users/contexts возможен показ», в отличие от placement («где именно»); даже если API хранит их в одном объекте, это разные оси, и opportunity должна пройти ограничения обеих.

**Пример:** ad set ограничен geo `DE`, мобильными устройствами и exclusion «уже установили приложение»; внутри этих правил показ возможен только в выбранных placements.

### Bid strategy {#g-bid-strategy}

**Bid strategy (стратегия ставок)** — policy, которая переводит optimization goal и ограничения (target или cap) в auction bids. Strategy, её target/cap, actual bid на конкретную opportunity и billable price — четыре разные сущности: один числовой `target CPA` не является actual bid, а actual bid не определяет billable amount сам по себе.

**Пример:** стратегия «maximize conversions с target CPA $4» сама решает, сколько предложить за каждый показ; фактическая ставка может быть $1 или $9, а charge определит pricing basis договора.

### Budget {#g-budget}

**Budget (бюджет)** — ограничение доступного spend на заданной scope (campaign, ad set, shared pool нескольких campaigns) и time basis. Распространены daily budget (жёсткий календарный cap, average daily target или иная форма — определяет product) и lifetime/flight budget на весь interval. Budget ограничивает расход, но не гарантирует inventory, conversions, равномерный расход или точный invoice amount.

**Пример:** campaign получила lifetime budget €700 на семидневный flight с двумя ad sets — нельзя заключить ни €100/день, ни €350 на каждый ad set: allocation зависит от opportunities и product configuration.

### Pacing {#g-pacing}

**Pacing (темп расхода)** — политика распределения spend во времени внутри budget-ограничений: тратить ли равномерно, ускоряться на дешёвых или качественных opportunities или придерживать бюджет. Pacing распределяет ресурс, но не обещает равномерный расход: доступные opportunities и allocation меняются.

**Пример:** при lifetime budget €700 на неделю система может потратить €180 в первый день на дешёвый inventory и меньше в остальные — pacing оптимизирует результат, а не календарную равномерность.

### Schedule (flight) {#g-schedule}

**Schedule (flight, расписание кампании)** — временная eligibility кампании: start и end, account time zone, в которой интерпретируются даты, и при поддержке product — dayparting (допустимые дни недели и часы). До start кампания может быть enabled, но иметь effective status `pending`; после end она завершается, даже если часть budget не потрачена.

**Пример:** campaign enabled со start 2026-09-07 00:00 Europe/Berlin — до этой даты показов нет, а dayparting «только рабочие часы» делает её временно ineligible внутри активного flight.

### Destination (landing page) {#g-destination}

**Destination (landing page, final URL)** — первая целевая поверхность после interaction с рекламой: web page, App Store/Google Play listing или deep link в app. Это часть user path, а не tracking record: tracking template и URL parameters управляют measurement path, но landing page не являются.

**Пример:** ad обещает premium-функции и ведёт в store listing — destination должна описывать тот же product и offer, иначе обещание creative и то, что видит user, расходятся.

### Tracking settings {#g-tracking-settings}

**Tracking settings (настройки отслеживания)** — configuration observability кампании: передаваемые identifiers (campaign/group/ad IDs), URL parameters, macros, tracking template и final URL suffix, event sources (pixel, app SDK, server-to-server integration, MMP), выбранные conversion actions и attribution configuration boundary. Tracking settings управляют measurement path и не заменяют destination; имена URL-параметров не являются industry standard.

**Пример:** tracking template ведёт click через measurement-домен с macros `{campaignid}` и `{creative}`: platform подставляет фактические IDs в момент click, а user идёт к destination своей дорогой.

### Learning phase {#g-learning-phase}

**Learning phase (learning status, фаза обучения)** — состояние optimizer, в котором delivery/bidding model собирает evidence после запуска или material configuration change: прежние данные хуже описывают новые решения. Learning — одна из осей operational state наряду с configured, effective и review status, а не противоположность active: показы и spend идут, а vendor-specific significant edits (targeting, creative, optimization event, состав ads, bid strategy) могут вернуть optimizer в learning без изменения configured status.

**Пример:** ad set со stable delivery по installs переводят на optimization event `paid_subscription` — configured status остаётся `active`, но optimizer снова в learning, пока не соберёт достаточно данных по новому событию.
