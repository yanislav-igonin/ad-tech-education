# Цель обучения

После главы читатель должен уметь разложить настройку targeting на три слоя — обязательные eligibility constraints, audience/context signals и optimization decision — и для конкретной ad opportunity объяснить, какие данные о месте, устройстве, контексте и audience membership участвуют в каждом слое; как из first-party или third-party data возникают audience segments, retargeting, lookalikes, exclusions и overlap; почему broad/algorithmic delivery может выйти за выбранные hints, но не обязана выходить за hard controls; и почему доступность, точность и match каждого сигнала зависят от platform, identity и privacy constraints.

# Границы главы

## Входит в главу

- Targeting как механизм сокращения или направления множества ad opportunities, а не как обещание результата. Базовая причинная цепочка:

```text
business intent
  → hard eligibility constraints
  → audience/context signals
  → eligible opportunity set
  → optimization ranks eligible opportunities
  → delivery outcomes become new signals
```

- Чёткое разделение трёх типов настройки:
  - **control/constraint** — opportunity обязана пройти правило;
  - **signal/hint** — признак направляет algorithmic delivery, но не обязательно ограничивает её;
  - **exclusion/suppression** — отрицательное правило, запрещающее или отсекающее совпадение в пределах доступного identity/match.
- Targeting dimensions, сгруппированные по тому, что описывается:
  - opportunity/user environment: geography, device, OS/browser;
  - user/profile hypothesis: demographics, interests, behavior;
  - current media context: contextual, keyword, placement.
- Для geography — region/country/city/radius, distinction `presence` versus `interest in location`, inferred nature и невозможность гарантировать физическое местонахождение со 100% точностью.
- Для device и OS/browser — device class, model/family, operating system/version, browser/user-agent family как потенциальные technical attributes; доступность criteria и granularity зависят от channel/platform, а `unknown`/coarsened values являются нормальным состоянием.
- Для demographics, interests и behavior — observed, declared и inferred signals; recency, confidence и `unknown`; не представлять platform classification как проверенный факт о человеке.
- Различие person/audience targeting и content/context targeting. Contextual targeting может работать без устойчивого cross-site user identity, поскольку описывает текущую page/app/video/content environment.
- Две разные semantics keyword targeting: search query/intent и keywords, описывающие content/context. Не превращать keyword в универсальный exact string match.
- Placement как явно выбранный media environment, publisher property, channel, app/site/video или slot-level scope. Здесь placement раскрывается как targeting criterion; ad units, formats и creative compatibility остаются главе 8.
- Audience segment как множество addressable entities, собранное по named rule, data provenance, observation window и activation/matching contract.
- First-party audiences из direct relationship advertiser/publisher: CRM/customer lists, site/app events, subscriptions, purchases. Third-party audiences от внешнего data provider: provenance, collection method, recency, modeling и quality должны быть известны, а label сегмента не доказывает точность.
- Retargeting как повторное обращение к audience с прошлым interaction/event; lookalike как поиск новых prospects по seed audience; suppression/exclusion как отрицательное targeting; overlap как пересечение membership нескольких segments.
- Broad и algorithmic targeting как delivery mode с небольшим числом positive audience constraints, но с сохраняющимися hard controls, policy/brand-safety restrictions и optimization goal. Broad не означает «никаких правил».
- Targeting versus optimization: первое задаёт допустимое или предпочтительное множество; второе выбирает и распределяет delivery ради optimization event. Иллюстративная модель, не vendor formula:

```text
eligible(o) = geo(o)
           ∧ device(o)
           ∧ context_or_placement(o)
           ∧ audience_control(o)
           ∧ ¬suppression(o)

delivery_score(o) = model(features(o), targeting_signals, optimization_event)
```

- Data flow участников: advertiser передаёт first-party seed/exclusions; publisher/platform описывает opportunity и context; data provider может поставлять third-party segment; platform/DSP выполняет matching, eligibility и ranking; outcome events возвращаются в optimization loop.
- Money-flow caveat: targeting меняет состав доступного inventory и распределение media spend, но не создаёт отдельную pricing model. Third-party data может иметь отдельную fee; bids, budget allocation и pacing остаются главе 7.
- Current platform examples только как доказательство переносимого distinction `control ≠ signal`: Google Ads optimized targeting/Lookalike changes и Meta Advantage+ audience. UI labels и defaults не объявляются industry standard.
- Минимальный operational caveat: audience activation зависит от доступного identity, match rate, permissions/consent и platform policy. Механизмы identity и privacy подробно не раскрываются здесь.

## Не входит в главу

- Повтор campaign hierarchy, object ownership и inheritance из главы 5. Здесь достаточно назвать campaign/ad group/ad set как scope, в которой product хранит targeting; где именно находится поле — vendor-specific.
- Bid calculation, bid strategies, max/actual bid, budget allocation, pacing, frequency caps и exploration/exploitation — глава 7. В этой главе optimizer только ранжирует или направляет delivery после eligibility.
- Каталог ad formats, ad units, creative requirements и placement compatibility — глава 8. Требование placement здесь означает критерий «где допускается показ».
- Реализация DSP campaign matching, pCTR/pCVR, expected value и auction-time decision — глава 20. Учебная формула выше объясняет границу ответственности, а не production bidder.
- Cookies, first-/third-party cookie mechanics, device IDs, IDFA/GAID, hashed identifiers, deterministic/probabilistic matching, identity graph, cross-device и identity resolution — глава 24. Здесь `match` обозначается как необходимая activation boundary без объяснения механизма.
- Юридическая квалификация personal data, GDPR/CCPA, ATT, browser restrictions, data minimization и практические privacy consequences — глава 40. Не утверждать, что first-party provenance автоматически создаёт legal basis или consent.
- CMP, TCF/GPP, consent strings, vendor/purpose signals и их propagation — глава 41. Здесь только caveat «signal должен быть разрешён к использованию».
- Детальный переход к миру без third-party identity, publisher IDs, identity-provider alternatives, addressability и limits frequency/measurement — глава 42. Contextual и first-party approaches вводятся здесь как targeting mechanics, а не как privacy migration strategy.
- Data clean rooms, privacy-safe matching, permitted queries, aggregation и clean-room activation — глава 43.
- Attribution, reattribution и incrementality. Retargeting — delivery tactic; оно не назначает conversion credit и не доказывает causal lift.
- Полные vendor taxonomies, UI walkthroughs, API payloads, текущие enum lists, eligibility thresholds, audience-size minima и sensitive-category policy catalog. Такие детали быстро меняются и не нужны для переносимой mental model.

# Результаты исследования

- Исследование проведено 2026-09-02. Переносимый результат не является unified industry schema: targeting products различаются по доступным criteria, object scope, data access, channel, country и policy. Устойчивой является модель `hard controls → eligible set → signals → optimization`, а не конкретный экран Google/Meta или список enum. [Источники 3–9]
- **Audience — не обязательно список людей.** Практически segment является addressable set: users, accounts, devices, browsers, households или modeled entities, которые platform способна сопоставить по собственному activation contract. Автор должен всегда называть entity, membership rule, data source, window и match boundary; identity mechanics отложить главе 24.
- **IAB Tech Lab подтверждает, что одинаковые названия segments не гарантируют одинаковый состав.** Audience Taxonomy стандартизирует nomenclature и различает верхнеуровневые категории вроде demographic, interest-based и purchase-intent, потому что vendors исторически использовали несовместимые taxonomies. Это средство сопоставимости labels, не гарантия segment accuracy или performance. [Источник 1]
- **Для third-party audience важнее provenance, чем красивый label.** Data Transparency Standard требует раскрывать recency, provenance, segmentation criteria и modeling-related metadata, но намеренно не выставляет качественную оценку «этот segment точный/эффективный». В главе нужен checklist качества, а не vendor catalog. [Источник 2]
- **Geo targeting обычно основан на inference, а не на проверенной координате.** Google Ads, например, различает `Presence or Interest` и `Presence`; default для поддерживаемых campaigns может включать людей, проявивших интерес к location. Google прямо предупреждает, что location определяется по набору signals и 100% accuracy не гарантируется. Это vendor example общей ошибки «target country = доказанная физическая location». [Источник 3]
- **Device/OS/browser не образуют единый универсальный criterion.** Текущий Google Ads API показывает отдельные criteria для device class, mobile device и OS version, причём допустимые levels/positive-negative semantics различаются. Browser criterion в этой таблице отсутствует. Следовательно, chapter должна преподавать эти dimensions отдельно и говорить `если product/channel поддерживает`, а не обещать одинаковую granularity в каждой platform. [Источник 4]
- **Demographic membership может быть declared, supplied или inferred и имеет `Unknown`.** Google Ads документирует estimated demographics, country/campaign-specific availability и явную `Unknown` category. Это хороший product-specific пример общего правила: demographics — classification signal с uncertainty, не верифицированный факт о личности. Политические/правовые ограничения глубже не разбирать. [Источник 5]
- **Audience targeting и content targeting — разные механизмы.** Google Ads разделяет «who they are/interests/research/past interaction» и content methods `topics`, `placements`, `keywords`. В конкретном product несколько content criteria могут комбинироваться через OR, но это не универсальная boolean semantics. Переносимый вывод: context описывает текущую media opportunity, audience — matched entity/history. [Источник 6]
- **First-party audience activation требует platform-side match.** Google Customer Match иллюстрирует pipeline `advertiser-provided online/offline customer data → platform match → audience activation`; direct relationship не означает, что каждая запись сопоставится или будет доступна во всех channels/regions. С марта 2024 Google ограничивает Customer Match activation на partner inventory в EEA/UK/Switzerland, но продолжает поддержку на owned-and-operated properties — важный пример того, что availability меняется без изменения базового понятия first-party audience. [Источник 7]
- **Manual selections всё чаще могут быть hints, а не boundaries.** В Google Ads optimized targeting для поддерживаемых campaign types смотрит за пределы manually selected audience segments; audience/keywords могут быть targeting signals, а system может сократить delivery по этим signals ради performance. Customer-data exclusions и отдельные brand-safety/content controls имеют иную semantics. Автор должен маркировать каждую настройку как hard control, suggestion или exclusion, а не судить по тому, что UI помещает всё в блок `Audience`. [Источник 8]
- **Lookalike — mechanism family, а не стабильный vendor product.** Google Ads в 2026 поэтапно переводит Demand Gen Lookalike segments из similarity-threshold constraint в suggestion mode: seed/reach level направляют модель, но она может выйти за threshold; opt-out/constraint path сохраняется отдельно. Это относится только к указанному product. [Источник 9]
- **Meta даёт параллельный текущий пример `control ≠ suggestion`.** В Advantage+ audience `Locations`, minimum age, languages и excluded custom audiences могут быть controls; suggested age, gender, detailed targeting и included custom audiences могут направлять AI, которое допускает delivery другим users внутри controls. Exact availability зависит от campaign/special category, поэтому chapter использует пример только для semantics. [Источник 10]
- **Meta Lookalike сохраняет классическую seed model, но usage context меняет строгость.** Официальное описание строит новую audience по shared demographics/interests/behaviors исходной audience и предлагает size-versus-similarity trade-off; отдельная документация Advantage+ предупреждает, что custom/lookalike inclusion может использоваться как suggestion. Нельзя переносить Google или Meta defaults на «все lookalikes». [Источники 10–11]
- **Нельзя преподавать старое privacy roadmap как текущий факт.** Chrome в апреле 2025 отказался от нового standalone prompt/deprecation path и сохранил user choice для third-party cookies; в октябре 2025 Google объявил retirement Topics, Protected Audience и ряда других Privacy Sandbox technologies. Поэтому глава не говорит «third-party cookies уже исчезли в Chrome» и не предлагает retired APIs как current retargeting foundation. Глубокий разбор — главы 40–42. [Источники 12–13]
- **Current versus legacy/historical context:**

| Механизм/label | Текущий статус на дату исследования | Как использовать в главе |
|---|---|---|
| Google `remarketing` | Google UI/documentation в ряде мест использует `your data`; retargeting как vendor-neutral concept остаётся | Ввести `retargeting`, отметить vendor naming без объявления нового механизма |
| Google `Similar segments` | Старый general-purpose product был заменён другими automation paths; отдельный Demand Gen `Lookalike` существует | Не писать, что Google вообще «не имеет lookalikes»; назвать campaign-specific current behavior |
| Demand Gen Lookalike threshold | В течение 2026 переводится в suggestion mode, constraint доступен отдельным opt-out path | Использовать как dated example различия constraint и signal, не как вечное правило |
| Meta Advantage+ audience | Controls и suggestions имеют разные delivery semantics | Показать, что одинаково выглядящие audience inputs не всегда hard filters |
| Chrome third-party-cookie deprecation | Не состоялась как универсальное отключение; действует user choice, Incognito имеет отдельные protections | Только caveat к addressability; детали отложить главам 40–42 |
| Privacy Sandbox Topics/Protected Audience | Объявлены к retirement в октябре 2025 | Не включать в main flow как current foundation |

- **Педагогический порядок:** сначала показать проблему чрезмерно большого universe и два слоя `eligibility`/`preference`; затем разобрать raw dimensions; после этого построить segments по provenance, применить retargeting/lookalike/exclusions/overlap и только в финале сравнить narrow, broad и algorithmic modes. Так причины появляются раньше automation consequences.

# Терминология

## Уже ожидается

- **Targeting** — существующая статья `g-targeting`; chapter расширяет определение из главы 5, не создаёт второй anchor.
- **Placement** — `g-placement`; в главе 6 используется как targeting axis «где допускается показ», без повтора publisher-side/format depth.
- **Ad opportunity** — `g-ad-opportunity`; объект, к которому применяются eligibility rules.
- **Campaign**, **ad group/ad set**, **ad**, **creative**, **campaign objective** — `g-campaign`, `g-ad-set`, `g-ad`, `g-creative`, `g-campaign-objective`; нужны только для scope и примеров.
- **Optimization target** и **learning phase** — `g-optimization-target`, `g-learning-phase`; distinction с targeting продолжает главы 4–5.
- Advertiser, publisher, DSP, data provider, DMP/CDP и identity provider — `g-advertiser`, `g-publisher`, `g-dsp`, `g-data-provider`, `g-dmp`, `g-cdp`, `g-identity-provider`.
- Impression, click, conversion, reach и frequency — `g-impression`, `g-click`, `g-conversion`, `g-reach`, `g-frequency`; chapter не повторяет metric contracts.
- Set intersection, boolean predicates, confidence, inference, features, ranking, feedback loop и event windows — общая software-engineering/data база, не AdTech prerequisites.

## Вводится здесь

Ниже — план новых glossary entries со стабильными IDs. На Stage A `glossary.md` не редактируется; Author должен добавить статьи до первого существенного использования и сослаться на эти anchors.

- **Audience segment** `{#g-audience-segment}` — addressable set entities, membership которого определяется named rule, data source/provenance, observation window и platform matching contract; не обязательно список известных людей.
- **First-party audience** `{#g-first-party-audience}` — segment, построенный из data, собранных advertiser или publisher в direct relationship: CRM/customer list, site/app events, purchase/subscription status. `First-party` описывает provenance, а не автоматически consent, legal basis, match completeness или exclusive ownership.
- **Third-party audience** `{#g-third-party-audience}` — segment, поставляемый внешним data provider независимо от direct relationship advertiser с субъектом; требует проверки source, collection method, recency, modeling, permissions и activation coverage.
- **Contextual targeting** `{#g-contextual-targeting}` — выбор opportunities по текущему content/media context: topic, semantics, page/app/video category и related signals; не требует утверждения, что известна устойчивая identity user.
- **Retargeting** `{#g-retargeting}` — targeting entities, ранее выполнивших named interaction или event в заданном window, например посетили pricing page, добавили товар в cart или установили app; не attribution и не доказательство causal effect.
- **Lookalike audience** `{#g-lookalike-audience}` — modeled audience новых prospects, найденных по similarity/predicted relevance к seed audience; seed quality и platform model влияют на результат, а inclusion может быть hard constraint либо suggestion.
- **Audience exclusion / suppression** `{#g-audience-exclusion}` — отрицательное targeting rule, предназначенное не допустить entities с named membership/status; фактическая полнота ограничена match, identity, latency и platform semantics.
- **Audience overlap** `{#g-audience-overlap}` — пересечение memberships нескольких audience segments в одной activation universe; влияет на distinct reach, reporting и segmentation design, но само по себе не доказывает duplicate charge или self-competition.
- **Algorithmic targeting** `{#g-algorithmic-targeting}` — delivery mode, где model использует goal, content, audience seeds и другие signals для поиска opportunities, потенциально за пределами suggested segments, оставаясь внутри заявленных hard controls. Broad targeting — частный setup с минимумом positive audience restrictions, а не отсутствием constraints.

`Geography targeting`, `device targeting`, `OS/browser targeting`, `demographics`, `interests`, `behavior`, `keyword targeting` и `targeting signal` достаточно определить inline и в сравнительной таблице: отдельные glossary articles раздуют reference без самостоятельной долговечной semantics. Если позже glossary станет taxonomy reference, их можно добавить отдельным редакторским решением, но не создавать anchors в этой главе.

# Предлагаемая структура главы

1. **Зачем targeting: от universe к eligible set**
   - Цель: начать с проблемы — advertiser не хочет покупать каждую opportunity, а delivery system должна отличить запреты от предпочтений и цели.
   - Обязательные concepts: opportunity universe; hard control; positive criterion; signal/hint; exclusion; eligible set; delivery score; optimization event; product-specific scope.
   - Основная иллюстрация: формула `eligible(o)` и `delivery_score(o)` из границ главы с явной подписью «учебная модель, не production bidder».
   - Data-flow diagram: `advertiser rules + platform/publisher signals + optional data provider → normalization/match → eligibility → ranking → outcome feedback`.
   - Money-flow note: rules меняют доступный inventory, но pricing/bid mechanics не меняют определения; optional data fee показать отдельной стрелкой без чисел.
   - Покрывает: фундамент для всей главы; substantive treatment targeting versus optimization отложено разделу 7.

2. **Что известно об opportunity или environment: geo, device, OS/browser, demographics**
   - Цель: показать простейшие criteria и сразу разрушить ложную модель «поле = достоверный факт».
   - Обязательные concepts: country/region/city/radius; presence versus location interest; device class versus model; OS family/version; browser family; declared/observed/inferred demographics; `Unknown`; signal confidence/granularity.
   - Таблица:

| Dimension | Что описывает | Возможный source | Типичная uncertainty | Hard control или signal? |
|---|---|---|---|---|
| Geography | likely presence/interest | IP, settings, behavior, platform data | VPN, travel, inference | зависит от product option |
| Device | class/model/environment | request/device metadata | coarsening/unknown | чаще criterion/control |
| OS/browser | software environment | request metadata, app/platform | version reduction, unavailable field | product/channel-specific |
| Demographics | profile category | declared, partner-supplied, inferred | unknown/misclassification | control или suggestion |

   - Пример: subscription app допускает `DE + mobile + supported OS`; рядом Google-specific counterexample `Presence or Interest` показывает, почему `DE` не всегда означает физическое присутствие.
   - Caveat: ограничения sensitive categories упомянуть одной строкой как policy variability; детали privacy/law не раскрывать.
   - Покрывает: 6.1, 6.2, 6.3, 6.4.

3. **Кого предполагаем и где показываем: interests, behavior, contextual, keyword, placement**
   - Цель: разделить hypotheses о user от signals текущего context.
   - Обязательные concepts:
     - interests — относительно устойчивые affinity/preferences, часто inferred;
     - behavior — past actions/patterns с named window и recency;
     - contextual — topic/semantics текущего content;
     - keyword — query/intent в search либо term describing content в display/video;
     - placement — explicitly selected property/channel/app/site/video/slot.
   - Иллюстрация: двухколоночная карта `user/history signals` versus `current content/opportunity signals`; placement вынести отдельной осью «конкретно где».
   - Мини-пример: e-commerce advertiser сравнивает `(interest: hiking)`, `(behavior: viewed boots)`, `(context: hiking article)`, `(search keyword: winter boots)`, `(placement: named outdoor-news app)` — похожие labels отвечают на разные вопросы.
   - Маленький pseudo-JSON opportunity payload, не vendor API:

```json
{
  "geo": "DE",
  "device": "mobile",
  "os": "Android",
  "context_topic": "outdoor/hiking",
  "placement": "publisher_app:article_feed"
}
```

   - Edge case: несколько criteria могут сочетаться через AND/OR по-разному; boolean semantics нужно читать из product contract, не угадывать.
   - Покрывает: 6.5, 6.6, 6.7, 6.8, 6.9.

4. **Как строятся audiences: first-party и third-party provenance**
   - Цель: перейти от одиночных attributes к reusable segments и сделать происхождение data частью определения.
   - Обязательные concepts: segment entity; source; membership rule; observation/lookback window как технический interval, не attribution window; freshness; match/activation; direct relationship; customer/site/app/event data; external provider; modeled versus observed membership; taxonomy/label.
   - Схема first-party pipeline:

```text
CRM + app/site events + subscription status
  → normalize + deduplicate
  → membership rule + window
  → platform matching/onboarding
  → addressable audience
```

   - Схема third-party pipeline: `data originator(s) → provider aggregation/modeling → labeled segment → platform/DSP activation`; под ней checklist IAB-inspired `provenance, collection, recency, criteria, modeling, permissions`.
   - Сравнительная таблица `кто собирает → relationship → visibility → likely quality questions → activation limits`; не утверждать, что first-party всегда точнее, а third-party всегда незаконна/плоха.
   - Пример: subscription app строит first-party segment `trial_started AND no paid_subscription in 7 days`; внешний provider предлагает `likely subscription buyers`, но advertiser видит только label и metadata.
   - Покрывает: 6.10, 6.11.

5. **Известные users и новые prospects: retargeting versus lookalikes**
   - Цель: показать два противоположных применения audience history — повторно обратиться к известному segment или использовать его как seed для prospecting.
   - Обязательные concepts: interaction event; inclusion window; recency; re-engagement; seed audience; feature/model similarity; source exclusion as product-specific behavior; size-versus-similarity; no causal/performance guarantee.
   - Flow:

```text
past interaction → retargeting membership → show again
high-value seed → platform model → new similar prospects
```

   - Пример: `installed + trial + no subscription` получает retargeting message; `paid subscribers with 90-day value > €50` становится lookalike seed для acquisition.
   - Current-behavior box: Google Demand Gen 2026 suggestion transition и Meta Lookalike/Advantage+ distinction. Чётко пометить vendor/date/campaign caveats.
   - Misconception clarification: retargeting не назначает attribution credit; lookalike не означает, что new user входит в seed или обязательно сконвертируется.
   - Покрывает: 6.12, 6.13.

6. **Guardrails и set logic: suppression, exclusion, overlap**
   - Цель: научить проектировать negative audiences и видеть пересечения до запуска.
   - Обязательные concepts: negative predicate; precedence; prospecting suppression; converted/existing-customer exclusion; mutually exclusive segments; overlap universe; distinct reach; stale membership; match latency.
   - Иллюстрация: Venn diagram `cart abandoners`, `existing subscribers`, `lookalike prospects`; область existing subscribers зачёркнута suppression rule.
   - Компактная диагностика:

```text
A = trial_no_purchase
B = existing_paid
C = high_value_seed_lookalike

check: A ∩ B, A ∩ C, B ∩ C
optional overlap ratio = |A ∩ B| / |A ∪ B|
```

   - Caveat к формуле: denominator должен быть одной activation universe и одной датой snapshot; platform estimates могут отличаться из-за identity/matching.
   - Consequences без переобещаний: overlap может искажать segment-level interpretation, уменьшать distinct reach или дробить setup; оно не доказывает double billing и не гарантирует, что platform заставляет campaign «торговаться сама с собой».
   - Покрывает: 6.14, 6.15.

7. **Broad и algorithmic delivery: где заканчивается targeting и начинается optimization**
   - Цель: собрать chapter в один end-to-end decision flow и дать transfer test для любого vendor UI.
   - Обязательные concepts: narrow/manual audience; broad targeting; algorithmic targeting; hard controls; suggestions/seeds; model features; optimization event; feedback loop; transparency limits.
   - Сравнительная таблица:

| Setup | Hard controls | Positive audience input | Может выйти за input? | Что optimizer меняет |
|---|---|---|---|---|
| Manual/narrow | geo/device/audience/context | selected segment как boundary | обычно нет, если это настоящий control | priority внутри eligible set |
| Broad | geo/policy/placement и другие guardrails | мало или нет positive restrictions | вопрос не возникает: set изначально broad | ищет likely outcomes в широком set |
| Algorithmic with signals | hard controls + exclusions | seed, interest, keyword, creative/landing signals | да, если input обозначен suggestion | расширяет/перераспределяет delivery ради goal |

   - Current vendor comparison: Google optimized targeting и Meta Advantage+ controls/suggestions. Не сравнивать performance и не давать setup recommendation без goal/data context.
   - Финальный checklist чтения любого product:
     1. Какая entity таргетируется и что является opportunity?
     2. Какие criteria hard, какие suggested, какие negative?
     3. Кто создал signal и насколько он свеж/сопоставим?
     4. Может ли model выйти за selected audience?
     5. Какой optimization event направляет ranking?
     6. Какие `unknown`, match/privacy/policy limits остаются?
   - Закрывающий subscription-app walkthrough: hard `DE/mobile`, suppression existing subscribers, first-party trial retargeting, high-value seed hint, broad prospecting и optimization toward paid subscription — без bids/budget/pacing.
   - Покрывает: 6.16, 6.17.

# Ключевые примеры

1. **Subscription app: acquisition, re-engagement и suppression в одной системе.** Advertiser задаёт hard controls `DE + mobile + supported OS`, исключает current paid subscribers, retargetит `trial_started AND no paid_subscription in 7 days`, строит lookalike seed из high-value subscribers и даёт этот seed algorithmic delivery как signal. Flow показывает first-party event → segment → platform match → eligibility → optimization toward `paid_subscription`. Никаких «правильных» bids, budgets или audience-size thresholds.
2. **E-commerce outdoor store: один продукт, пять разных meanings.** `Interest: hiking`, `behavior: viewed boots`, `context: hiking article`, `keyword: winter boots` и `placement: outdoor-news app/article feed` располагаются рядом. Пример объясняет, почему person hypothesis, past action, current content, query intent и explicit inventory source не взаимозаменяемы.
3. **Overlap diagnosis перед prospecting launch.** Audiences `trial without purchase`, `existing paid` и `lookalike of high-value paid` пересекаются по estimated platform membership. Advertiser применяет suppression и проверяет set intersections; chapter отдельно отмечает, что imperfect/stale matching оставляет leakage, а overlap estimate не доказывает duplicate impressions, double charge или causality.

# Важные заблуждения

- **«Targeting и optimization — одно и то же».** Targeting задаёт eligibility или preferred signals; optimization ранжирует/распределяет delivery ради chosen event. Product может превратить selected audience из constraint в hint, поэтому semantics нужно читать явно.
- **«Broad targeting означает отсутствие ограничений».** Даже broad setup сохраняет geo, policy, inventory/placement, age or legal controls, exclusions и technical compatibility; broad обычно означает минимум positive audience restrictions.
- **«Если UI позволил выбрать audience, показ будет только ей».** В algorithmic products selected segment может быть suggestion. Нужны отдельные controls/exclusions, а их набор зависит от product.
- **«Geo `DE` доказывает, что user физически в Германии».** Location может означать likely presence, regular presence или interest; это inferred best effort.
- **«Device, OS и browser — одно поле».** Они описывают разные layers и имеют разную доступность/granularity. Browser targeting вообще не обязано поддерживаться как explicit criterion.
- **«Demographics, interests и behavior — проверенные свойства человека».** Они могут быть declared, inferred, modeled или unknown; source, recency и confidence важны не меньше label.
- **«Interest и intent совпадают».** Долгосрочный affinity к hiking не равен текущему намерению купить boots; recent search/cart event может быть сильнее, но тоже не гарантирует purchase.
- **«Keyword всегда означает search query exact match».** В Search keyword связывается с query/intent по product rules; в contextual use он может описывать content. Match semantics vendor-specific.
- **«Contextual targeting — это audience по интересам».** Contextual criterion описывает текущую page/app/video environment; audience criterion описывает matched entity или history.
- **«Placement и context — одно».** Placement явно задаёт property/channel/slot; contextual system выбирает подходящие environments по content signals. Оба отвечают «где», но один конкретнее другого.
- **«First-party audience — любой список, который advertiser загрузил».** Provenance требует direct relationship; купленный external list не становится first-party от факта загрузки. First-party также не означает automatic permission или 100% match.
- **«Third-party audience всегда точна, потому что продаётся профессиональным provider».** Label без provenance, recency, collection и modeling metadata не позволяет оценить состав; IAB Data Label даёт disclosure, а не quality grade.
- **«Retargeting — это attribution».** Retargeting решает, кому снова показать; attribution позже решает, какому touchpoint назначить credit.
- **«Lookalike — расширенная копия seed и всегда включает seed users».** Это modeled prospecting construct; inclusion/exclusion seed, similarity threshold и constraint/suggestion semantics platform-specific.
- **«Exclusion гарантирует нулевой leakage».** Stale membership, unmatched identities, propagation delay, consent/policy и platform behavior могут оставить показы исключённым в business sense entities.
- **«Overlap автоматически означает double charge или self-competition».** Оно означает пересечение membership. Auction/dedup/billing consequences зависят от platform и campaign architecture.
- **«Algorithmic expansion может нарушить любые настройки».** Хорошо определённые hard controls и exclusions должны отличаться от hints; задача автора — научить находить эту границу, а не объявлять automation безграничной.
- **«Chrome уже полностью убрал third-party cookies, а Topics/Protected Audience — текущая замена».** Обе части устарели: Chrome сохранил user choice, а названные Privacy Sandbox technologies объявлены к retirement.

# Coverage Matrix

| Требование | Планируемое место | Способ раскрытия |
|---|---|---|
| 6.1 | Раздел 2 «Geo, device, OS/browser, demographics» | Определение geography criterion; country/region/city/radius; presence versus location interest; inferred-signal caveat; Google dated example и невозможность гарантировать physical location |
| 6.2 | Раздел 2 «Geo, device, OS/browser, demographics» | Device class/model/environment как отдельная technical dimension; table source/granularity/unknown; mobile subscription example и distinction от OS/browser |
| 6.3 | Раздел 2 «Geo, device, OS/browser, demographics» | OS family/version и browser family как отдельные attributes; availability/product-channel caveat; Google API example, где OS/device criteria есть, а universal browser criterion не следует предполагать |
| 6.4 | Раздел 2 «Geo, device, OS/browser, demographics» | Declared/supplied/inferred demographics, `Unknown`, misclassification и campaign/country variability; comparison table и policy/privacy boundary без legal catalog |
| 6.5 | Раздел 3 «Кого предполагаем и где показываем» | Interests как affinity/preference hypothesis, часто inferred; distinction from current intent/behavior; outdoor-store example и source/recency caveat |
| 6.6 | Раздел 3 «Кого предполагаем и где показываем» | Behavior как past actions/patterns с named event и observation window; `viewed boots` example; distinction from interest, retargeting tactic и causal claim |
| 6.7 | Раздел 3 «Кого предполагаем и где показываем» | Contextual targeting definition по current content/environment; topic/semantic examples, identity-independent mental model и comparison with audience/history targeting |
| 6.8 | Раздел 3 «Кого предполагаем и где показываем» | Две keyword semantics — search query/intent и content keyword; comparison example, matching/boolean vendor caveat и no exact-string universal rule |
| 6.9 | Раздел 3 «Кого предполагаем и где показываем» | Placement как explicit site/app/channel/video/slot scope; distinction from contextual selection и audience; pseudo-JSON plus handoff format/ad-unit depth to chapter 8 |
| 6.10 | Раздел 4 «Как строятся audiences» | First-party audience из direct CRM/site/app/product relationship; event-to-segment-to-platform-match flow, subscription example, provenance/permission/match limitations и Google Customer Match dated case |
| 6.11 | Раздел 4 «Как строятся audiences» | Third-party audience через external data provider; provenance/collection/recency/modeling checklist, IAB Taxonomy/Data Label explanation и warning that disclosure/label is not accuracy grade |
| 6.12 | Раздел 5 «Retargeting versus lookalikes» | Retargeting flow из named past interaction + inclusion window; trial-no-subscription example; distinction from acquisition, attribution and incrementality |
| 6.13 | Раздел 5 «Retargeting versus lookalikes» | Seed → model/features → new prospects flow; size/similarity and seed-quality trade-offs; current Google 2026 and Meta examples with constraint-versus-suggestion caveat |
| 6.14 | Раздел 6 «Guardrails и set logic» | Suppression/exclusion как negative predicate; existing-customer/converted/ineligible examples, precedence and Venn diagram; leakage from stale/unmatched membership |
| 6.15 | Раздел 6 «Guardrails и set logic» | Audience intersections, common-universe requirement, optional Jaccard-style overlap ratio, Venn/table diagnostic and effects on distinct reach/interpretation; no automatic double-charge claim |
| 6.16 | Раздел 7 «Broad и algorithmic delivery» | Manual/narrow versus broad versus algorithmic comparison; hard controls, sparse positive restrictions, seeds/signals and possible expansion; current Google/Meta cases without vendor recommendation |
| 6.17 | Раздел 7 «Где заканчивается targeting и начинается optimization» | Explicit `eligible(o)` versus `delivery_score(o)` model, end-to-end data/feedback flow and checklist; targeting controls/preferences versus ranking toward optimization event, with bid/budget mechanics deferred to chapter 7 |

# Источники

1. **[IAB Tech Lab — Audience Taxonomy](https://iabtechlab.com/standards/audience-taxonomy/).** Страница обновлена 2024-12-11, проверена 2026-09-02. Поддерживает distinction demographic/interest/purchase-intent categories и проблему несовместимых vendor labels. Ограничение: taxonomy улучшает nomenclature/comparability, но не доказывает membership accuracy или performance.
2. **[IAB Tech Lab — Data Transparency Standard (Data Label)](https://iabtechlab.com/standards/data-transparency-standard/).** Страница обновлена 2024-04-23, проверена 2026-09-02. Поддерживает disclosure recency, provenance, segmentation criteria и modeling context для syndicated audience data; standard задаёт baseline transparency, не quality score. Ограничение: compliance/data-label process не является механизмом activation.
3. **[Google Ads Help — About advanced location options](https://support.google.com/google-ads/answer/1722038?hl=en).** Проверено 2026-09-02. Поддерживает `Presence or Interest` versus `Presence`, signal-based location inference и отсутствие 100% accuracy. Ограничение: defaults/options зависят от Google campaign type и могут меняться; пример не переносится на другие platforms.
4. **[Google Ads API — Targeting criteria](https://developers.google.com/google-ads/api/docs/targeting/criteria).** Проверено 2026-09-02 по current documentation. Поддерживает отдельные device, mobile device, OS version, age, gender, location, keyword, topic, user-list и placement-related criteria с разными levels/negative capabilities. Ограничение: Google API resource model; отсутствие criterion в таблице не доказывает отсутствие любого internal signal/report dimension.
5. **[Google Ads Help — About demographic targeting](https://support.google.com/google-ads/answer/2580383?hl=en).** Проверено 2026-09-02. Поддерживает age/gender/parental-status/income examples, `Unknown`, estimated/declared sources и country/campaign variability. Ограничение: product-specific taxonomy и current policy; не универсальное определение demographics.
6. **[Google Ads Help — Targeting your ads](https://support.google.com/google-ads/answer/1704368?hl=en).** Проверено 2026-09-02. Поддерживает audience-versus-content distinction, topics, placements, keywords, exclusions и Google terminology change `remarketing` → `your data`. Ограничение: описанная OR-combination и campaign availability — Google-specific, не industry boolean contract.
7. **[Google Ads Help — About Customer Match](https://support.google.com/google-ads/answer/6379332?hl=en).** Проверено 2026-09-02. Поддерживает first-party online/offline customer-data activation, platform matching, current channel scope и EEA/UK/Switzerland partner-inventory restriction с марта 2024. Ограничение: Customer Match — один vendor implementation; direct data, match и consent semantics нельзя обобщать на все platforms.
8. **[Google Ads Help — About optimized targeting](https://support.google.com/google-ads/answer/10537509?hl=en).** Проверено 2026-09-02. Поддерживает audience/keyword inputs как optional signals, delivery за пределами selected signals, compatible campaign types и separate customer-data/brand-safety exclusions. Ограничение: availability/defaults и exact controls зависят от Google campaign type; это иллюстрация, а не universal rule.
9. **[Google Ads Help — Use Lookalike segments to grow your audience](https://support.google.com/google-ads/answer/13541369?hl=en)** и **[Use Lookalike segments as a targeting constraint](https://support.google.com/google-ads/answer/16902001?hl=en).** Проверено 2026-09-02. Поддерживают phased 2026 Demand Gen transition from similarity-threshold constraint to suggestion mode и separate constraint/opt-out path. Ограничение: только Demand Gen; rollout/default и UI controls датированы и требуют recheck перед Author/Auditor stages, если они выполняются позже.
10. **[Meta Business Help Center — Audience controls and Audience suggestions in Advantage+ audience](https://www.facebook.com/business/help/938372127764391).** Проверено 2026-09-02. Поддерживает hard controls (`Locations`, minimum age, excluded custom audiences, languages) versus suggestions, которые могут расширяться внутри controls. Ограничение: availability и Special Ad Category behavior Meta-specific и меняются.
11. **[Meta Business Help Center — About Lookalike Audiences](https://www.facebook.com/business/help/164749007013531)** и **[About custom audiences](https://www.facebook.com/business/help/744354708981227).** Проверено 2026-09-02. Поддерживают seed-based similarity model, source-audience quality/size trade-off и использование own/Meta-engagement sources. Ограничение: точная inclusion/exclusion semantics зависит от Advantage+ mode, campaign и policy category; не переносить thresholds на другие vendors.
12. **[Privacy Sandbox — Next steps for Privacy Sandbox and tracking protections in Chrome](https://privacysandbox.com/news/privacy-sandbox-next-steps/).** Опубликовано 2025-04-22, проверено 2026-09-02. Поддерживает решение Chrome сохранить current user-choice approach к third-party cookies и не запускать новый standalone prompt. Ограничение: Chrome-specific browser policy; не описывает Safari/Firefox, legal basis или весь identity market.
13. **[Privacy Sandbox — Update on Plans for Privacy Sandbox Technologies](https://privacysandbox.com/news/update-on-plans-for-privacy-sandbox-technologies).** Опубликовано 2025-10-17, проверено 2026-09-02. Поддерживает announced retirement Topics, Protected Audience и ряда других Chrome/Android Privacy Sandbox technologies. Ограничение: retirement следует implementation processes; chapter использует источник только для исключения устаревшей current-state narrative, а privacy migration разбирают главы 40–42.

Все platform claims привязаны к vendor, product и дате проверки. Переносимая mental model главы — instructional synthesis официальных sources: **сначала определить hard eligibility, затем provenance/match signals, затем optimization behavior**. Она не утверждает существование единого AdTech API, общей taxonomy или одинаковых defaults.