# Резюме аудита

Глава полно покрывает требования 6.1–6.17 и выдерживает Planner Brief. Центральная модель последовательно разделяет hard eligibility constraints, signal/hint, exclusion/suppression и optimization decision; raw dimensions не выдаются за достоверные свойства человека, а audience segment определяется через entity, membership rule, provenance, observation window и activation contract. Data flow, optional data fee и граница с bidding/pacing показаны без смешения decision flow и money flow.

Материальных ошибок, пропусков и устаревших механизмов как current practice не обнаружено. Датированные claims о Google Ads, Meta и IAB Tech Lab сверены с указанными primary sources на 2 сентября 2026 года. Найдено 0 блокеров, 0 важных проблем и 2 необязательных уточнения.

# Блокеры

None.

# Важные проблемы

None.

# Необязательные улучшения

1. **Развести signal types по Google campaign type в текущем vendor example.** Раздел «Broad и algorithmic delivery: граница targeting и optimization» говорит: «В Google Ads optimized targeting для поддерживаемых Display, Video и Demand Gen campaigns … audience и keywords становятся signals». Official Google Ads Help действительно перечисляет все три совместимых campaign types, но затем даёт разные inputs: keywords/topics — для Display, тогда как Video и Demand Gen перечисляют audience/custom/customer-data segments; для Video выбранные placements остаются boundaries. Общая мысль главы верна и соседние фразы уже предупреждают о product-specific semantics, но текущую формулировку можно прочитать как поддержку keywords во всех трёх campaign types.
2. **Снять терминологическую неоднозначность `placement` между главой и glossary footnote.** В таблице раздела «Гипотеза о user и контекст показа — разные данные» placement определён как «property/channel/site/app/video/slot», тогда как `[^g-placement]` в `glossary.md` озаглавлен `Placement (ad slot)` и прежде всего описывает заранее заданное место или правило появления рекламы у publisher. Buy-side usage главы корректно и соответствует Google Help, где managed placement может быть целым website или его subset, но короткая оговорка об overloaded product term уменьшила бы риск принять publisher slot и selectable media property за один уровень сущности.

# Проверка корректности

- Разделы «Зачем targeting» и «Broad и algorithmic delivery» согласованы: `eligible(o)` строится из hard predicates и `NOT suppression`, а `delivery_score(o)` использует features, targeting signals и optimization event только после eligibility. Selected audience не объявлена автоматически strict boundary.
- Data flow конкретен: advertiser передаёт controls, seeds, exclusions и customer events; publisher/platform описывает opportunity и context; optional data provider поставляет segment; DSP или closed platform выполняет match, eligibility и ranking; outcomes возвращаются в feedback loop. Money caveat отдельно говорит, что targeting меняет доступный inventory и распределение media spend, но не создаёт pricing model; data fee не смешана с media spend.
- Geography корректно раскрыта как best-effort inference. Указаны country/region/city/postal area/radius, различие likely/regular presence и location interest, VPN/travel/staleness. Current Google Help подтверждает `Presence or Interest` versus `Presence`, default broad option для применимых campaigns и прямое предупреждение об отсутствии 100% accuracy; глава не переносит default на отрасль.
- Device, OS и browser не смешаны: class/model, OS family/version и browser family разведены, а availability, granularity, coarsening и `Unknown` названы channel/product-specific. Google Ads API действительно публикует отдельные `Device`, `Mobile device` и `Operating system version` criteria; отсутствие universal browser criterion не превращено в утверждение об отсутствии browser signal вообще.
- Demographics представлены как declared, supplied/observed либо inferred/modeled classifications с confidence, recency и `Unknown`, а не как паспортные факты. Google Help подтверждает age/gender/parental-status/income categories, `Unknown`, platform inference и campaign/country differences.
- Interests, behavior, contextual, keyword и placement отвечают на разные вопросы. `interest: hiking`, `viewed_boots within 14d`, hiking content, search intent и named property не взаимозаменяются. Для keywords названы Search query/intent и content semantics, а exact-string и AND/OR behavior явно оставлены product contract.
- Audience provenance изложен корректно. First-party flow проходит от CRM/app/site events через normalization, rule/window и platform matching; direct relationship не выдана за consent, legal basis или 100% match. Third-party flow показывает originators, aggregation/modeling, label, platform match и checklist provenance/recency/criteria/modeling/permissions/coverage без тезиса «first-party всегда лучше».
- IAB claims точны: Audience Taxonomy вводит common nomenclature для несогласованных vendor taxonomies, а Data Transparency Standard раскрывает provenance, age/recency, inclusion methodology/modeling и segmentation criteria. Оба источника не дают quality/performance grade; глава прямо сохраняет эту границу.
- Retargeting определён как повторное обращение к matched entities после named event в заданном window и отделён от attribution и incrementality. Lookalike строится из seed через model/features для новых prospects; seed quality, size/similarity trade-off, возможное seed inclusion и отсутствие conversion/causal guarantee объяснены.
- Current Google Demand Gen claim подтверждён: phased rollout 2026 переводит Lookalike reach/seed в suggestion mode, допускающий выход за similarity threshold, а отдельный opt-out сохраняет constraint behavior. Текст ограничивает claim Demand Gen и датой. Meta Help подтверждает seed-based Lookalike model, size-versus-similarity trade-off и в Advantage+ различие controls и suggestions; locations/minimum age/languages/excluded custom audiences не смешаны с suggested age/gender/detailed targeting/included audiences.
- Exclusion и overlap имеют правильную set semantics: negative predicate имеет precedence над positive signal, но фактический leakage ограничен stale membership, match и propagation. Overlap считается в общей entity definition, activation universe и snapshot; Jaccard formula верна, а intersection не выдан за duplicate billing, causal effect или неизбежную self-competition.

# Проверка границ и плотности

Continuity с главой 5 выдержана: глава 6 напоминает campaign/ad group/ad set только как product-specific scope настройки и не повторяет account ownership, hierarchy, inheritance, lifecycle, destination или tracking configuration. Различие objective/optimization event используется как prerequisite, а не переобъясняется.

Bid calculation, bid strategy internals, budget allocation, pacing, frequency caps и exploration/exploitation оставлены главе 7. Formats, ad units и creative compatibility переданы главе 8; production bidder и pCTR/pCVR — главе 20; identity mechanics — главе 24; privacy/consent и browser migration — главам 40–43. Retargeting не уводит текст в attribution, а first-party provenance — в legal analysis.

Vendor examples служат только проверке переносимой границы `control ≠ signal`; UI walkthroughs, enum catalogs, thresholds и performance recommendations не добавлены. Один subscription-app walkthrough связывает constraints, segments, suppression, lookalike, broad delivery и feedback без конкурирующих примеров. Итоговые misconceptions и checklist повторяют central distinctions для самопроверки, но не создают отдельного parallel narrative.

# Coverage Table

| Requirement | Status | Evidence / Explanation |
|---|---|---|
| 6.1 | ✅ COVERED | Подраздел «Geography» объясняет country/region/city/postal area/radius, likely/regular presence versus location interest, inference и 100% accuracy caveat; датированный Google example явно назван product-specific. |
| 6.2 | ✅ COVERED | Подраздел «Device, OS и browser» отделяет device class от family/model, показывает `phone only` versus Android tablet и объясняет channel-specific granularity, coarsening и `Unknown`. |
| 6.3 | ✅ COVERED | Там же OS family/version и browser family раскрыты как разные software axes; in-app opportunity без browser attribute и возможность отсутствия explicit browser targeting показывают availability boundary. |
| 6.4 | ✅ COVERED | «Demographics» вводит age/gender/parental status/income, declared/supplied/inferred membership, source/confidence/recency, `Unknown`, country/channel/policy variability и влияние exclusion unknown на eligible set. |
| 6.5 | ✅ COVERED | Раздел «Гипотеза о user и контекст показа» определяет interest как относительно устойчивую affinity/preference hypothesis, называет declared/inferred/partner sources и отделяет hiking affinity от текущего purchase intent. |
| 6.6 | ✅ COVERED | Behavior объяснён через past named actions/patterns и observation window; `viewed_boots within 14 days` показывает recency, а текст отдельно отвергает гарантированный future purchase и автоматическое равенство retargeting tactic. |
| 6.7 | ✅ COVERED | Contextual targeting определён как выбор opportunities по topic/semantics/category текущей page/app/video; hiking-article example и отсутствие требования stable cross-site identity отделяют context от audience/history. |
| 6.8 | ✅ COVERED | Keyword раскрыт в двух semantics: Search query/intent и content term/concept в display/video. Stemming, semantic expansion, negative rules и AND/OR composition названы product-specific, поэтому universal exact match не подразумевается. |
| 6.9 | ✅ COVERED | Placement объяснён как явно выбранный property/channel/site/app/video/section/slot и сопоставлен с dynamic contextual selection. Pseudo-JSON показывает placement opportunity, а formats/ad units/creative compatibility переданы главе 8. |
| 6.10 | ✅ COVERED | «First-party audiences» даёт direct-relationship sources, полный CRM/events → normalize/deduplicate → rule/window → platform match → addressable audience flow, unmatched/latency/channel limits и датированный Customer Match example. |
| 6.11 | ✅ COVERED | «Third-party audiences» показывает external-provider flow и substantive checklist provenance, collection, recency, membership criteria, observed/modeled share, permissions и activation coverage; IAB Taxonomy/Data Label не выданы за accuracy grade. |
| 6.12 | ✅ COVERED | Retargeting построен из named past interaction, window, membership, match и повторного обращения; subscription trial example раскрывает механизм и recency, а attribution и incrementality явно исключены из semantics. |
| 6.13 | ✅ COVERED | Lookalike раскрыт как seed → model/features → new prospects с seed-quality и size/similarity trade-offs, no-guarantee caveats и product-specific seed inclusion. Google Demand Gen 2026 и Meta Advantage+ показывают constraint-versus-suggestion distinction. |
| 6.14 | ✅ COVERED | «Exclusions и overlap» определяет suppression как negative predicate с precedence, приводит acquisition/re-engagement examples и объясняет leakage через late event, stale membership, unmatched identity и platform semantics. |
| 6.15 | ✅ COVERED | Overlap определён как segment intersection в общей activation universe; проверяются `A ∩ B`, `A ∩ C`, `B ∩ C`, дана Jaccard formula и единые entity/snapshot conditions, а effects на reach/reporting отделены от billing/auction claims. |
| 6.16 | ✅ COVERED | Сравнительная таблица Manual/Broad/Algorithmic раскрывает hard controls, sparse positive restrictions, seeds/signals, возможный выход за suggestion и роль optimizer. Broad не равен отсутствию geo/policy/inventory/exclusion guardrails; Google и Meta используются только как датированные examples. |
| 6.17 | ✅ COVERED | Начальная formula разделяет `eligible(o)` и `delivery_score(o)`, а финальный subscription-app flow проходит hard eligibility → suppression/segments → ranking toward `paid_subscription` → feedback. Checklist заставляет отдельно назвать hard/suggested/negative inputs и optimization event; bids/budget/pacing отложены главе 7. |

# Вердикт

PASS
Оркестратор применил оба необязательных уточнения 2026-09-02: Google example теперь разделяет signals и placement boundaries по campaign type; glossary и глава явно фиксируют overloaded semantics `placement` на publisher и buy side. Coverage Table и вердикт не изменяются: правки устраняют неоднозначность, не меняя scope или обязательное coverage.
