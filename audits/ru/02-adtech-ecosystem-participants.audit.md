# Резюме аудита

Fresh second-pass audit проведён независимо от `audit-01`: заново проверены Planner Coverage Matrix, boundaries, полный текст главы, все требования 2.1–2.17 и актуальность спорных определений на 2026-08-27. Все 17 обязательных требований раскрыты на достаточной для обзорной главы глубине. Центральная mental model `role ≠ company ≠ product` выдержана; `DSP vs ad network`, `SSP vs exchange`, `MMP vs product analytics`, `identity vs tracking/attribution/consent` разведены явно. Data flow и money flow согласованы с prose и не выданы за универсальную линейную цепочку. Найдено 0 блокеров, 0 важных проблем и 1 необязательное улучшение формулировки.

# Блокеры

None.

# Важные проблемы

None.

# Необязательные улучшения

1. В разделе «Кто соединяет demand и supply» таблица описывает output SSP как «решение о продаже и связанные metadata», а ниже — как `sale decision metadata`. В контексте главы это не создаёт ошибку: prose говорит лишь о помощи в управлении продажей, а publisher ad server отдельно показан как система, сопоставляющая demand sources. Однако формулировку можно сделать ещё точнее: SSP возвращает `bid/результат sell-side evaluation и связанные metadata`, тогда как окончательный выбор opportunity может оставаться за publisher ad server или другим final decision layer. Это низкорисковая ясность; auction mechanics правильно отложены до глав 16–20.

# Проверка корректности

- Раздел «Суть: роли, а не коробки» корректно различает role, company и product, а также customer, beneficiary и payer. Это предотвращает ложную карту из обязательных независимых vendors и согласуется с current [IAB Tech Lab Programmatic Auction Definitions](https://iabtechlab.com/programmatic-auction-definitions/), где прямо указано, что одна company может исполнять несколько roles.
- Раздел «Кто ставит цель и кто выполняет покупку» корректно определяет advertiser и publisher как экономических principals. Brand и performance представлены как orientations по цели и expected evidence, а не как взаимоисключающие типы компаний. Agency определена как организация, media buyer — как функция, DSP — как technology platform; уровни абстракции не смешаны.
- Раздел «Кто соединяет demand и supply» даёт рабочие, не абсолютные distinctions: ad network — managed aggregated media offering, DSP — buyer tool/decision layer, SSP — sell-side workflow, exchange — transaction function. Оговорки «обычно», «могут сочетать» и «часто объединены» не превращают legacy product boundaries в current universal rules. Advertiser и publisher ad servers разведены по operational boundary, без преждевременного ухода в line items, priority и serving internals.
- Раздел «Кто измеряет и проверяет» корректно отделяет attribution credit от causality, MMP от product analytics и verification от одной fraud detection. MMP описан через app acquisition, installs и in-app outcomes, но текст признаёт feature overlap и platform/privacy limitations; никакой vendor report не назван абсолютной истиной.
- Раздел «Кто поставляет, организует и связывает данные» не использует ошибочное абсолютное правило `DMP = cookies/anonymous`, `CDP = PII`. DMP/CDP разведены по primary purpose и record model, одновременно указан overlap современных products. Identity provider не смешан с tracking, attribution или consent и не объявлен доказательством физического человека.
- **Resolution source finding — RESOLVED.** План, источник 8, и глава, источник 8, теперь содержат точный официальный URL [Oracle Marketing Cloud — CDP vs CRM vs DMP](https://blogs.oracle.com/marketingcloud/cdp-vs-crm-vs-dmp). URL доступен на 2026-08-27 и открывает статью Oracle от 7 августа 2024 года. Она отдельно описывает CDP через unification/entity resolution/data accessibility, DMP — через построение advertising audiences и activation в advertising channels, а также признаёт overlap и совместное использование систем. План корректно маркирует материал как vendor documentation и запрещает превращать tendencies в абсолютные category rules; глава следует этому ограничению. Finding `audit-01` о redirect на общую product page больше не актуален.
- Data flow в разделе «Одна campaign: отдельно данные и деньги» согласован с prose: campaign settings и creative metadata идут к buying/serving systems, opportunity/context — от publisher side, выбранная реклама — обратно к publisher app, delivery и outcome events — к соответствующим reporting/measurement systems. Оговорки «не каждое событие получает каждый участник» и зависимости от integrations, contract и privacy restrictions снимают ложный broadcast model.
- Money flow корректно различает advertiser funding, contractual payer, media settlement, publisher revenue и отдельные license/usage/service fees. Agency не является обязательным hop; MMP, verification, data и identity providers не показаны как автоматически удерживающие долю media spend. `invoice path`, `settlement path`, creative delivery и HTTP/event flow разведены явно; pricing formulas и путь `$100` правильно отложены до главы 4.
- Раздел о role bundling/vertical integration корректно показывает причины, operational benefits и risks: conflicts of interest, fee/data opacity, self-preferencing и self-measurement. Условная Platform X используется как упражнение по decomposition, а не как недоказанный claim о реальном vendor.
- Legacy/current balance соблюдён. Глава не утверждает обязательное наличие отдельного exchange hop, не объявляет DMP исчезнувшей, не обещает полную user-level MMP attribution и не выдаёт verification за безусловную гарантию качества.

# Проверка границ и плотности

Глава остаётся в Planner Boundaries. Она не уходит в pricing formulas и take rates главы 4, ad-server objects главы 11, подробный programmatic/OpenRTB flow глав 15–20, tracking/attribution/identity mechanics глав 21–25, MMP implementation и platform attribution глав 27–29, verification metrics главы 37 или privacy law глав 40–42.

При breadth из 17 требований текст собран в семь причинно связанных разделов, а не в 17 словарных статей. Running example subscription app/mobile game связывает product, business, data и engineering views без превращения главы в auction walkthrough. Таблицы уменьшают повторение. Финальные misconceptions и выводы повторяют только критические distinctions и выполняют педагогическую функцию; существенного filler, encyclopedic detail или material scope leakage нет.

# Coverage Table

| Requirement | Status | Evidence / Explanation |
|---|---|---|
| 2.1 | ✅ COVERED | Раздел «Кто ставит цель и кто выполняет покупку» определяет advertiser через business outcome, funding, decision rights, campaign inputs и критерии успеха; role card показывает beneficiary, payer и outputs. |
| 2.2 | ✅ COVERED | Brand и performance определены через цель, горизонт оценки и измеримый outcome; две campaigns одного subscription app показывают, что orientations совместимы внутри одного advertiser. |
| 2.3 | ✅ COVERED | Publisher описан как сторона, владеющая или управляющая media environment, placements и access к inventory, получающая delivery data и publisher revenue и балансирующая monetization с user experience. |
| 2.4 | ✅ COVERED | Agency определена как organization/contractual contractor advertiser; перечислены strategy, creative, channel selection, execution, reporting и возможное управление платежами, показан in-house alternative. |
| 2.5 | ✅ COVERED | Media buyer объяснён как person/team/function, выбирающий media, platforms, terms и spend allocation; явно отделён от agency и DSP. |
| 2.6 | ✅ COVERED | Ad network раскрыта через aggregation, managed media offering, buyer control boundary, publisher relationships, data inputs/outputs и договорно-зависимое участие в media money. |
| 2.7 | ✅ COVERED | DSP определена как buying platform для оценки и покупки opportunities из нескольких supply sources; указаны customer, campaign/opportunity inputs, decision/output, reporting и payment caveat. |
| 2.8 | ✅ COVERED | SSP раскрыта как sell-side platform publisher: получает inventory/context rules, предоставляет demand access, возвращает sell-side result/metadata и участвует в settlement или fee; необязательная правка лишь уточнит finality decision. |
| 2.9 | ✅ COVERED | Exchange определена как transaction/matching/auction function между buyer и seller; явно сказано, что она не обязана быть отдельной company или обязательным hop и часто bundled с SSP. |
| 2.10 | ✅ COVERED | Ad server объяснён как rule-based selection, delivery и event registration, не CDN; advertiser-side и publisher-side variants разведены по customer и operational boundary. |
| 2.11 | ✅ COVERED | Attribution provider связывает touchpoints с outcomes и назначает credit по rules; MMP раскрыт как mobile-specialized measurement/attribution category для acquisition, installs и in-app outcomes, отдельно от product analytics и causality. |
| 2.12 | ✅ COVERED | Verification provider объяснён через independent measurement point, delivery/render/placement/context/quality signals, consumers results и integration/methodology limits; verification отделена от одной fraud detection. |
| 2.13 | ✅ COVERED | Data provider раскрыт через datasets, attributes и audience segments, customers, value/payer, permitted outputs/use cases и явные non-responsibilities. |
| 2.14 | ✅ COVERED | DMP и CDP сравнены по primary purpose, persistent state и downstream output: audience segmentation/activation против persistent unified customer record/accessibility; overlap и ненадёжность cookie/PII shorthand указаны явно и подтверждены Oracle source. |
| 2.15 | ✅ COVERED | Identity provider объяснён через identifier mapping/translation и identity graph; отдельно указано, что он не создаёт consent, не tracking-ит все events, не назначает attribution credit и не доказывает identity физического человека. |
| 2.16 | ✅ COVERED | Раздел «Одна campaign: отдельно данные и деньги» содержит отдельные data/money diagrams, contractual-payer и service-fee caveats и явное различие invoice, settlement, creative-delivery и HTTP/event paths. |
| 2.17 | ✅ COVERED | Раздел «Почему одна компания занимает несколько мест на карте» определяет role bundling/vertical integration, объясняет причины, benefits и risks и декомпозирует Platform X на четыре role cards. |

# Вердикт

PASS
