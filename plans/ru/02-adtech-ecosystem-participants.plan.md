# Цель обучения

После главы читатель должен уметь разложить рекламную экосистему не на список названий, а на логические роли; для каждого участника определить решаемую проблему, customer, payer, входные и выходные данные, принимаемое решение и место в money flow; отличить экономические стороны рынка, людей, сервисные компании и technology platforms; объяснить, почему реальная цепочка не обязана содержать все роли и почему одна компания может выполнять несколько ролей.

# Границы главы

## Входит в главу

- Advertiser и publisher как экономические principals: первый финансирует рекламу ради business outcome, второй создаёт media environment и рекламные opportunities.
- Brand и performance как ориентации рекламной деятельности и campaign objectives, а не взаимоисключающие типы компаний. Один advertiser может вести обе.
- Agency как организация-подрядчик; media buyer как человек, команда или функция внутри advertiser, agency либо другой buying organization.
- DSP, SSP, ad exchange, ad network и ad server через один диагностический framework:
  - какую проблему решает роль;
  - кто её customer и economic beneficiary;
  - кто обычно payer и почему contractual payer может отличаться от пользователя продукта;
  - какие данные получает и возвращает;
  - какое решение принимает или исполняет;
  - принимает ли media money либо отдельную service/SaaS fee.
- MMP/attribution, verification, data, DMP/CDP и identity как поперечные функции, а не обязательные последовательные hops между advertiser и publisher.
- Верхнеуровневый contractual money flow и отдельный data flow на одном subscription-app scenario.
- Различие `role ≠ company ≠ product`: одна компания может скрывать несколько функций за единым UI, API, договором или invoice.
- Benefits и risks совмещения ролей: меньше integrations и operational friction, но возможны конфликты incentives, непрозрачность fees/data boundaries и self-measurement.

## Не входит в главу

- Формулы CPM/CPC/CPA, revenue share, markup, take rate, margin, gross/net revenue и путь `$100` — глава 4. Здесь показывать только направление и тип оплаты.
- Campaign hierarchy, targeting, bidding, budget и optimization mechanics — главы 5–7.
- Publisher yield, fill, direct/indirect monetization и способы продажи inventory — главы 10 и 14.
- Ad-serving internals: order, line item, priority, trafficking, creative selection, frequency capping и serving flow — глава 11.
- Programmatic и auction mechanics, demand/supply aggregation internals, bid request/response, подробный money/data flow и глубокие сравнения `DSP vs ad network`, `SSP vs exchange` — главы 15–20, особенно глава 16. В главе 2 нужны рабочие distinctions, достаточные для чтения карты ролей.
- Tracking points, redirects, event identifiers, attribution models и identity-resolution algorithms — главы 21–25.
- MMP SDK, install matching, network integrations, postbacks, cost aggregation, deep linking, privacy-preserving attribution и vendor comparison — главы 27–29, особенно глава 28.
- Viewability definitions, IVT, brand safety/suitability, OMID/OM SDK и verification vendors — главы 36–37, особенно глава 37.
- Privacy law, consent mechanics и legal basis — главы 40–42.
- Исчерпывающий vendor landscape и разбор реальных компаний — главы 52–54.

# Результаты исследования

- Research проведён на 2026-08-27. Для устойчивых базовых ролей не нужны market-share numbers, vendor rankings или version-specific implementation details. Источники используются только для неоднозначных границ ролей и current product scope.
- **Company не равна role.** Актуальный IAB Tech Lab primer описывает общие programmatic roles и прямо отмечает, что одна компания может исполнять несколько из них. Поэтому схема главы должна показывать функции, а не создавать впечатление обязательного набора независимых vendors.
- **Brand и performance — ориентации, а не жёсткие классы advertisers.** Рабочая граница проходит по основной цели и способу управления: изменение awareness/consideration против измеримого action/outcome. Реальные campaigns могут сочетать обе цели, а один advertiser — вести обе категории активности.
- **Agency и media buyer находятся на разных уровнях абстракции.** Agency — организация и договорная роль; media buyer — операционная функция. Media buyer не является platform category и может работать in-house.
- **DSP, SSP, exchange и ad network имеют рабочие, но не герметичные границы.** DSP действует как buying tool/decision layer для buyer; ad network чаще агрегирует и коммерчески упаковывает media как managed offering. SSP представляет sell-side product/function для publisher; exchange выполняет transaction/matching/auction function. SSP и exchange часто объединены в одном продукте, поэтому нельзя ни объявлять их всегда разными компаниями, ни использовать слова как безусловные синонимы.
- **Ad server имеет как минимум две важные ориентации.** Advertiser ad server поддерживает campaign creatives, delivery/tracking со стороны buyer; publisher ad server управляет конкурирующими demand sources и delivery на inventory publisher. Подробные объекты и serving rules отложить до главы 11.
- **MMP — mobile-specialized measurement/attribution category, а не causal truth.** Современные MMP products могут охватывать web, CTV и analytics, но определение главы должно опираться на mobile acquisition, app events и attribution. MMP применяет measurement/attribution rules к доступным данным; его report не доказывает причинный эффект рекламы и не является автоматически «истиной» относительно network reporting.
- **Verification provider создаёт отдельную measurement point, а не абсолютную истину.** Он получает доступные delivery, render, placement, context и quality signals и возвращает verification results. Полнота вывода зависит от integration, environment и methodology.
- **DMP/CDP нельзя различать абсолютным правилом `cookies/anonymous data vs PII`.** Рабочее различие для курса: DMP primarily организует audience data и segments для advertising activation; CDP отвечает за persistent unified customer record и downstream usability. Современный CDP может быть packaged, warehouse-native или composable, а продукты обеих категорий могут пересекаться.
- **Identity provider не равен tracking, attribution или consent.** Identity solution связывает или переводит identifiers для разрешённых activation/measurement use cases. Она не обязательно определяет «реального человека», не регистрирует все events сама, не назначает attribution credit и не создаёт legal permission на обработку.
- **Money path, invoice path и HTTP/event path различаются.** Media funding в основном идёт от advertiser к sellers и publisher; agency либо platform может быть contractual payer/collector; ad server, MMP, verification, data и identity providers могут получать отдельные license, usage или service fees. Network calls и measurement events могут двигаться в обратную сторону и не повторяют финансовую цепочку.

# Терминология

## Уже ожидается

- HTTP request/response, API, JSON, client/server, SDK, database, event, identifier, timestamp, realtime и asynchronous processing.
- Advertiser, publisher и user как базовые участники рынка.
- Demand/supply, buy side/sell side, advertising inventory, placement, ad opportunity и impression на обзорном уровне.
- Campaign как рекламная активность с целью, бюджетом и creatives. Если `creative` используется в главе, дать короткое явное определение: рекламный материал, например изображение, видео или текст.
- Media spend, intermediary fee и publisher revenue как разные денежные понятия без формул.
- Раздельные delivery, data и money flows.
- Agency, DSP, ad network, exchange, SSP, ad server, MMP/measurement, verification и data/identity provider уже появлялись на карте главы 1 только как навигационные labels; их полноценное понимание заранее не предполагается.

## Вводится здесь

- **Role, company и product** — логическая функция, юридическая/коммерческая организация и конкретное offering; три уровня нельзя смешивать.
- **Customer, beneficiary и payer** — пользователь продукта, получатель экономической пользы и сторона договора/оплаты; они могут не совпадать.
- **Brand advertising** — рекламная ориентация на awareness, consideration или perception; эффект не обязан выражаться одной немедленной conversion.
- **Performance advertising** — рекламная ориентация на измеримое действие или outcome и стоимость его получения.
- **Agency** — организация, планирующая или выполняющая marketing/media работу от имени advertiser.
- **Media buyer** — человек, команда или функция, выбирающая media, platforms, условия покупки и распределение spend.
- **Ad network** — посредник, агрегирующий supply и/или demand и продающий управляемое media offering.
- **DSP** — buying platform, помогающая buyer оценивать и покупать opportunities из нескольких supply sources по правилам campaigns.
- **SSP** — sell-side platform, помогающая publisher предоставлять demand sources доступ к inventory и управлять его продажей.
- **Ad exchange** — transaction layer/function, соединяющая buyers и sellers и выполняющая matching или auction.
- **Ad server** — система, выбирающая, доставляющая и регистрирующая рекламу по заданным campaign или inventory rules; advertiser-side и publisher-side variants обслуживают разные задачи.
- **Attribution provider** — система, сопоставляющая рекламные touchpoints с outcomes и применяющая правила назначения credit.
- **MMP (Mobile Measurement Partner)** — mobile-specialized attribution/measurement provider для app acquisition, installs и in-app outcomes; не синоним product analytics.
- **Verification provider** — отдельная сторона, проверяющая условия и качество доставки рекламы по доступным signals.
- **Data provider** — поставщик datasets, attributes или audience segments для activation, decisioning либо analysis.
- **DMP (Data Management Platform)** — advertising-oriented система управления, сегментации и activation audience data.
- **CDP (Customer Data Platform)** — система, отвечающая за persistent unified customer record и доступность customer data downstream systems.
- **Identity provider** — сторона, связывающая либо переводящая identifiers для разрешённых activation, measurement и related use cases.
- **Role bundling / vertical integration** — исполнение нескольких логических ролей одной компанией или product suite.

# Предлагаемая структура главы

1. **Как читать экосистему: роли вместо списка коробок**
   - Цель: дать причинный framework до перечисления acronyms и не превратить главу в глоссарий.
   - Обязательные concepts: `problem → customer → payer → data in/out → decision → money`; различие role/company/product; customer, beneficiary и payer могут не совпадать.
   - Пример/иллюстрация: компактный шаблон role card и его заполнение для advertiser. Затем тот же набор колонок использовать в сравнительных таблицах, а не повторять семь однотипных абзацев.
   - Закладывает основу 2.17; окончательно покрывает его раздел 7.

2. **Кто ставит цель и кто выполняет покупку**
   - Цель: начать с экономических principals и людей, которые принимают решения, до technology platforms.
   - Обязательные concepts: advertiser и publisher; brand/performance orientations; agency как organization; media buyer как function; in-house и outsourced buying; incentives и control boundaries.
   - Пример/иллюстрация: subscription app ведёт brand campaign на знание продукта и performance campaign на trial/subscription; обеими может управлять одна in-house team или agency media buyer.
   - Таблица: `роль → problem → beneficiary → payer → input → decision/output`.
   - Покрывает: 2.1–2.5.

3. **Кто соединяет demand и supply**
   - Цель: вывести media platforms из проблемы масштаба — много buyers, sellers и короткоживущих opportunities — вместо выдачи пяти независимых словарных статей.
   - Обязательные concepts: ad network, DSP, SSP, ad exchange, advertiser/publisher ad server; рабочие distinctions `DSP vs ad network` и `SSP vs exchange`; product overlap без ложной универсальной цепочки.
   - Таблица: `роль → основной customer → какое решение/исполнение → data in → data out → media money или service fee`.
   - Иллюстрация: карта возможных функций, не HTTP sequence. Не показывать bid payloads, auction stages и pricing.
   - Покрывает: 2.6–2.10.

4. **Кто измеряет и проверяет**
   - Цель: объяснить, почему покупателю недостаточно отчёта стороны, продавшей media, и почему measurement/verification расположены поперёк chain.
   - Обязательные concepts: attribution provider связывает touchpoints и outcomes и назначает credit по rules; MMP — mobile-specialized subset/category; verification provider отвечает на вопросы о delivery/context/quality, а не назначает conversion credit.
   - Пример/иллюстрация: одни impression/click/install/subscription signals расходятся в platform reporting, MMP attribution и verification, потому что системы отвечают на разные вопросы.
   - Caveats: attribution не равна causality; MMP не является product analytics; verification не равно только fraud detection.
   - Покрывает: 2.11–2.12.

5. **Кто поставляет, организует и связывает данные**
   - Цель: разделить четыре часто смешиваемые задачи — поставку data, управление audience segments, unified customer record и identifier mapping.
   - Обязательные concepts: data provider, DMP, CDP, identity provider; DMP/CDP distinction по purpose и record model, не абсолютное cookie/PII rule; identity vs tracking/attribution/consent.
   - Таблица: `система → owner/customer → inputs → persistent state → outputs/activation → чего система не делает`.
   - Пример: advertiser отправляет first-party subscription events в CDP; допустимый audience segment активируется через DMP/platform integration; identity provider помогает сопоставить identifiers; внешний data provider может обогатить segment. Не углубляться в identity matching и privacy mechanics.
   - Покрывает: 2.13–2.15.

6. **Одна campaign: отдельно данные и деньги**
   - Цель: собрать роли на едином scenario и показать, что коммерческие и технические связи не совпадают.
   - Сценарий: subscription app advertiser → agency/media buyer → DSP или ad network → sell-side participants → game publisher; MMP, verification, data/identity functions подключаются поперечно и не все обязательны.
   - Money diagram:

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

   - Data diagram: campaign settings и creatives идут к buying/serving systems; opportunity/context signals — от publisher side к decision systems; decision/creative metadata возвращаются к publisher; impression/click/outcome events идут в reporting, attribution и verification.
   - Обязательная оговорка: invoice path, settlement path, creative-delivery path и HTTP/event path могут отличаться; схема показывает типичный пример, не универсальный договор.
   - Покрывает: 2.16.

7. **Почему одна компания занимает несколько мест на карте**
   - Цель: научить разбирать product suite или closed ecosystem на логические роли, не доверяя одному marketing label.
   - Причины bundling: acquisitions, shared infrastructure/data, managed service, единый workflow, reporting и contract.
   - Benefits: меньше integrations, latency и operational overhead. Risks: конфликт incentives, непрозрачные fee/data boundaries, преимущество собственного supply/demand, self-measurement и сложность сравнения alternatives.
   - Пример/упражнение: условная Platform X имеет network-like managed buying, DSP-like decisioning, ad serving и measurement за одним UI. Читатель заполняет отдельную role card для каждой функции.
   - Финальный diagnostic: для незнакомой компании сначала определить roles, затем для каждой ответить `problem/customer/payer/data/money`; только после этого сравнивать vendors.
   - Покрывает: 2.17; закрепляет все requirements без нового glossary recap.

# Ключевые примеры

1. **Subscription app advertiser и mobile game publisher.** Advertiser может делегировать buying agency; media buyer запускает acquisition через DSP; publisher предоставляет opportunity через SSP/exchange path; MMP сопоставляет install/subscription с acquisition source; verification опционально проверяет delivery. Один scenario проходит через роли, data flow и money flow. Не превращать его в RTB или MMP technical walkthrough.
2. **Один advertiser, две ориентации.** Brand campaign пытается повысить знание приложения; performance campaign управляется вокруг trial/subscription. Пример снимает ложную типологию компаний и показывает разные incentives/measurement expectations.
3. **Условная Platform X с несколькими ролями.** Один contract и UI скрывают ad network, DSP-like buying, ad serving и measurement. Пример нужен для декомпозиции company в roles; реальные vendor claims и comparisons не использовать.

# Важные заблуждения

- **«Brand advertiser и performance advertiser — разные типы компаний».** Это orientations/objectives; один advertiser и даже одна marketing strategy могут сочетать обе.
- **«Agency и media buyer — синонимы».** Agency — организация и contractual service role; media buyer — функция или человек.
- **«Media buyer — это DSP».** Media buyer формулирует и настраивает решения; DSP — technology tool, исполняющий часть buying workflow.
- **«Ad network — старое название DSP».** Network чаще продаёт агрегированное/управляемое media offering; DSP даёт buyer больше прямого campaign-level control. Product bundles могут пересекаться.
- **«SSP и exchange всегда разные компании» или «это всегда одно и то же».** Sell-side и transaction functions различимы, но часто совмещены.
- **«Ad server — просто CDN с баннерами».** Он применяет campaign/inventory rules и регистрирует delivery events; advertiser-side и publisher-side variants решают разные задачи.
- **«MMP знает истинную причину каждой установки».** MMP наблюдает доступные signals и применяет attribution rules; attribution не доказывает causality.
- **«MMP — это product analytics».** Возможен feature overlap, но основная MMP-задача — acquisition measurement/attribution across media sources.
- **«Verification provider — только anti-fraud».** Verification охватывает несколько quality/delivery questions; fraud detection — пересекающаяся функция.
- **«Data provider, DMP, CDP и identity provider — одно хранилище пользователей».** Они соответственно поставляют data, управляют audience activation, поддерживают customer record и связывают identifiers.
- **«DMP работает только с cookies, CDP — только с PII».** Это частый historical shorthand, не надёжное определение современных products.
- **«Identity = tracking = attribution = consent».** Identity связывает entities/IDs; tracking регистрирует events; attribution назначает credit; consent выражает разрешение/выбор в отдельном governance/legal context.
- **«Каждый box удерживает процент media spend».** Многие providers получают отдельную license, usage или service fee и не принимают media money.
- **«Деньги и данные идут по одной цепочке».** Invoice, settlement, creative-delivery и event paths могут иметь разные endpoints и направления.
- **«Единый vendor устраняет конфликты».** Bundling уменьшает friction, но может усилить conflicts of interest и непрозрачность.

# Coverage Matrix

| Требование | Планируемое место | Способ раскрытия |
|---|---|---|
| 2.1 | Раздел 2 «Кто ставит цель и кто выполняет покупку» | Role card advertiser: business problem, beneficiary, payer position, campaign inputs, spend и outcomes |
| 2.2 | Раздел 2 «Кто ставит цель и кто выполняет покупку» | Сравнение brand/performance orientations по цели и expected evidence + две campaigns одного advertiser |
| 2.3 | Раздел 2 «Кто ставит цель и кто выполняет покупку» | Role card publisher: media environment, opportunities, control, input/output data и revenue |
| 2.4 | Раздел 2 «Кто ставит цель и кто выполняет покупку» | Agency как organization/contractual representative + services + in-house contrast |
| 2.5 | Раздел 2 «Кто ставит цель и кто выполняет покупку» | Media buyer как function/person + принимаемые решения + отличие от agency и DSP |
| 2.6 | Раздел 3 «Кто соединяет demand и supply» | Ad network через problem/customer/data/money card + managed offering vs buyer-tool distinction |
| 2.7 | Раздел 3 «Кто соединяет demand и supply» | DSP role card + buyer control + multi-source access без bidder и auction internals |
| 2.8 | Раздел 3 «Кто соединяет demand и supply» | SSP role card + publisher customer + inventory/opportunity inputs + demand access output |
| 2.9 | Раздел 3 «Кто соединяет demand и supply» | Exchange как transaction/matching function + overlap-with-SSP caveat |
| 2.10 | Раздел 3 «Кто соединяет demand и supply» | Advertiser-side/publisher-side ad server comparison + selection/delivery/registration scope |
| 2.11 | Раздел 4 «Кто измеряет и проверяет» | Attribution-provider role + MMP как mobile-specialized category + event-flow fragment + causality caveat |
| 2.12 | Раздел 4 «Кто измеряет и проверяет» | Verification problem, customer, input signals и outputs + independent-point limitation |
| 2.13 | Раздел 5 «Кто поставляет, организует и связывает данные» | Data provider role + datasets/segments + customer/payer/data outputs |
| 2.14 | Раздел 5 «Кто поставляет, организует и связывает данные» | DMP/CDP comparison по purpose, record model и activation + product-convergence caveat |
| 2.15 | Раздел 5 «Кто поставляет, организует и связывает данные» | Identity provider inputs/outputs + identifier mapping + identity/tracking/attribution/consent distinction |
| 2.16 | Раздел 6 «Одна campaign: отдельно данные и деньги» | Separate money/data diagrams + subscription-app walkthrough + invoice/settlement/HTTP caveat |
| 2.17 | Раздел 7 «Почему одна компания занимает несколько мест на карте» | Bundled-company decomposition + причины, benefits, conflicts и diagnostic exercise |

# Источники

1. **IAB Tech Lab — Programmatic Auction Definitions, finalized June 2026.** https://iabtechlab.com/programmatic-auction-definitions/ — подтверждает common programmatic roles и оговорку, что одна company может исполнять несколько roles. Auction details в главу 2 не переносить.
2. **UK Government — Online Advertising Programme consultation.** https://www.gov.uk/government/consultations/online-advertising-programme-consultation/online-advertising-programme-consultation — поддерживает functional map agency, advertiser ad server, DSP, SSP, publisher ad server и дополнительных data/measurement participants. Scope ограничен online/open display; это не универсальная схема всей рекламы.
3. **Competition and Markets Authority — Appendix M: Intermediation in open display advertising.** https://www.gov.uk/find-digital-market-research/online-platforms-and-digital-advertising-market-study-appendix-m-intermediation-in-open-display-advertising-2020-cma — поддерживает distinctions и overlap DSP/SSP/exchange/ad server, а также benefits/conflicts vertical integration. Источник 2020 года: не переносить старые market shares, fee estimates и historical implementation claims как current practice.
4. **Adjust — What is a Mobile Measurement Partner.** https://www.adjust.com/glossary/mobile-measurement-partner-mmp/ — актуальная проверка product scope: app data, installs, in-app events и attribution, с расширением некоторых MMP products за пределы mobile. Это vendor source: не использовать promotional claims о гарантированной unbiased/causal truth.
5. **IAB Tech Lab — Open Measurement SDK.** https://iabtechlab.com/standards/open-measurement-sdk/ — поддерживает роль third-party measurement/verification provider и доступ к measurement signals. Метрики, OMID и SDK mechanics оставить главе 37.
6. **IAB Tech Lab — Identity Solutions Guidance and Recommended Practices.** https://iabtechlab.com/wp-content/uploads/2024/05/Identity-Solutions-Guidance-FINAL.pdf — поддерживает high-level identity inputs, resolution approaches, use cases и evaluation caveats. Не переносить matching mechanics в эту главу.
7. **CDP Institute — What is a CDP, definition current in 2026.** https://www.cdpinstitute.org/what-is-a-cdp/ — поддерживает persistent unified customer record, downstream accessibility и современные packaged/warehouse-native/composable deployment models.
8. **Oracle Marketing Cloud — CDP vs CRM vs DMP.** https://blogs.oracle.com/marketingcloud/cdp-vs-crm-vs-dmp — дополнительная проверка operational distinction: DMP ориентирован на advertising audience activation, а CDP — на persistent customer record. Использовать как vendor documentation и не превращать эти tendencies в абсолютные category rules.

Все URL проверены 2026-08-27. Остальные definitions — педагогический synthesis устойчивых ролей; дополнительные vendor pages, market statistics и secondary glossaries для главы не нужны.
