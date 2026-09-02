---
id: ch-06
type: chapter
part: II
chapter: 6
slug: targeting-audiences
title: "Targeting и Audiences"
language: ru
status: draft
toc_requirements: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "6.13", "6.14", "6.15", "6.16", "6.17"]
prerequisites: [ch-01, ch-02, ch-03, ch-04, ch-05]
---

# Targeting и Audiences

Targeting[^g-targeting] отвечает не на вопрос «кто обязательно купит», а на более ранний вопрос: **какие рекламные возможности система должна запретить, допустить или считать предпочтительными**. Из всего потока ad opportunities[^g-ad-opportunity] advertiser[^g-advertiser] сначала формирует допустимое множество, затем delivery system ранжирует его ради выбранного результата.

```text
business intent
  → hard eligibility constraints
  → audience/context signals
  → eligible opportunity set
  → optimization ranks eligible opportunities
  → delivery outcomes become new signals
```

Эта цепочка — главная mental model главы. Она отделяет правила допуска от гипотез о релевантности и от optimization. Без такого разделения поле `Audience` в vendor UI легко принять за строгий фильтр, хотя конкретный product может использовать его лишь как подсказку модели.

## Зачем targeting: от universe к eligible set

Publisher[^g-publisher] создаёт множество возможностей показать рекламу: в разных странах, приложениях, браузерах, контекстах и моментах. Покупать всё множество нерационально. Приложение с подпиской, доступное только в Германии и только на поддерживаемых мобильных OS, не должно платить за desktop opportunity во Франции. Но внутри Германии заранее неизвестно, какой допустимый user оформит подписку. Поэтому configuration делится на три semantics:

| Semantics | Что означает | Пример |
|---|---|---|
| **Control / constraint** | Opportunity обязана пройти правило; иначе delivery запрещена | `geo = DE`, `device = mobile`, supported OS |
| **Signal / hint** | Признак помогает модели расставлять приоритеты, но не всегда ограничивает множество | Interest `fitness`, seed из ценных subscribers |
| **Audience exclusion / suppression**[^g-audience-exclusion] | Отрицательное правило отсекает совпавшую entity | Не показывать current paid subscribers |

Слово `targeting` в продукте может охватывать все три строки. Semantics задаёт contract настройки, а не её положение на экране. Особенно важно выяснить, допускает ли product выход за positive input и какие exclusions остаются строгими.

Учебная set-модель, не формула production bidder:

```text
eligible(o) = geo(o)
           ∧ device(o)
           ∧ context_or_placement(o)
           ∧ audience_control(o)
           ∧ ¬suppression(o)

delivery_score(o) = model(features(o), targeting_signals, optimization_event)
```

`eligible(o)` — boolean predicate для opportunity `o`. `delivery_score(o)` имеет смысл только после прохождения обязательных правил: он задаёт относительный приоритет внутри eligible set. Optimization target[^g-optimization-target] сообщает, какой outcome направляет ranking, например `paid_subscription`; сам targeting не гарантирует этот outcome.

Где именно product хранит правило — на campaign[^g-campaign], ad group или ad set[^g-ad-set] — зависит от platform и campaign type. Для переноса mental model между vendors полезнее классифицировать каждое поле как constraint, signal или exclusion, чем запоминать экран.

Data flow выглядит так:

```text
advertiser rules и customer events ───────┐
publisher/platform opportunity + context ├─→ normalize/match
optional external data provider ──────────┘       ↓
                                           eligibility
                                               ↓
                                             ranking
                                               ↓
                                      delivery event → outcome
                                               └─→ feedback
```

Publisher или platform описывает opportunity; advertiser передаёт controls, seeds и exclusions; внешний data provider[^g-data-provider] может добавить segment; DSP[^g-dsp] или закрытая platform выполняет matching, eligibility и ranking. Outcomes возвращаются позже и становятся inputs следующих решений.

Money flow при этом не превращается в новую pricing model. Targeting меняет состав доступного inventory и распределение media spend[^g-media-spend], но не определяет bid, budget[^g-budget] или pacing[^g-pacing]. Данные внешнего provider могут иметь отдельную fee; механика ставок и расхода относится к главе 7.

## Какие признаки доступны: geography, device, OS/browser и demographics

Простейшие targeting dimensions описывают environment opportunity или вероятные свойства entity. Их наличие в request не делает их безошибочными фактами.

| Dimension | Что описывает | Возможные sources | Типичная uncertainty | Возможная semantics |
|---|---|---|---|---|
| Geography | Вероятное присутствие, регулярное присутствие или интерес к location | IP, device settings, account data, search/content behavior | VPN, travel, stale или inferred location | Control либо product-specific broad option |
| Device | Класс и иногда family/model устройства | Request/device metadata, app/platform | Coarsening, spoofing, `unknown` | Часто criterion/control |
| OS/browser | Software environment: family и при наличии version | User agent, app SDK, platform metadata | Reduced version, отсутствующее поле, unsupported criterion | Channel- и product-specific |
| Demographics | Категория профиля | Declared, partner-supplied или inferred data | `unknown`, misclassification, stale inference | Control либо suggestion |

### Geography

Geography criterion может задавать country, region, city, postal area или radius вокруг точки. Но значение `DE` ещё не доказывает физическое местонахождение человека. Product может интерпретировать его как likely presence, regular presence или interest in Germany. Источник почти всегда даёт best-effort inference, а не заверенную координату.

Google Ads показывает product-specific пример этой разницы: на дату проверки 2 сентября 2026 года advanced location options различают `Presence or Interest` и `Presence`, причём документация прямо предупреждает, что location выводится из нескольких signals и не имеет 100% accuracy. Это не универсальный default отрасли; в любом product нужно читать точную semantics positive и negative geo rules.

### Device, OS и browser

`Mobile` описывает device class, `Android` — OS family, `Android 15` — OS version, а `Chrome` — browser family. Эти axes связаны, но не взаимозаменяемы. Opportunity с Android tablet может пройти OS rule и не пройти device-class rule `phone only`. In-app inventory может передавать OS, но вообще не иметь полезного browser attribute.

Granularity зависит от channel и platform. Где-то доступен model устройства, где-то только `mobile/desktop/tablet`; explicit browser targeting может отсутствовать, хотя browser остаётся model feature или reporting dimension. `Unknown` и укрупнённые значения — нормальное состояние, поэтому control должен заранее определять политику для неизвестных значений, а не молча считать их несовпадением или совпадением.

### Demographics

Demographics — категории вроде age range, gender, parental status или household income, если product и policy их поддерживают. Membership может быть:

- **declared** — user сам сообщил значение;
- **observed/supplied** — значение пришло из разрешённого account или partner source;
- **inferred/modeled** — platform оценила категорию по поведению и другим features.

Следовательно, `age=25–34` — classification signal с source, confidence и recency, а не проверенный паспортный факт. `Unknown` нельзя считать редкой ошибкой: исключив unknown population, advertiser может существенно сократить eligible set. Доступные категории, использование sensitive characteristics и поведение unknown зависят от страны, channel и policy; юридические и consent-механизмы разбираются позже в курсе.

Для subscription app hard controls могут выглядеть как `DE + mobile + supported OS`. Demographics разумно добавлять только после ответа на два вопроса: это strict boundary или suggestion, и что произойдёт с `Unknown`.

## Гипотеза о user и контекст показа — разные данные

Interests и behavior описывают предполагаемого user или его history. Context, keyword и placement[^g-placement] описывают текущую media opportunity либо способ её найти. Эти признаки могут коррелировать, но отвечают на разные вопросы.

| Input | Главный вопрос | Outdoor-store пример |
|---|---|---|
| **Interest** | К чему entity предположительно имеет устойчивую affinity? | `interest: hiking` |
| **Behavior** | Какое named action или pattern наблюдались и когда? | `viewed_boots within 14d` |
| **Contextual targeting**[^g-contextual-targeting] | О чём текущая page, app screen или video? | Статья о зимних походах |
| **Search keyword** | С каким query/intent product сопоставляет рекламу? | `winter boots` в поиске |
| **Context keyword** | Какой term или semantic concept описывает content? | `winter boots` в тексте обзора |
| **Placement** | В каком явно выбранном property/channel/site/app/video/slot допустим показ? | `outdoor-news app/article_feed` |

**Interest** обычно является относительно устойчивой гипотезой о preference или affinity. Он может быть declared, inferred из content consumption или поставлен partner. Интерес к hiking не равен текущему намерению купить boots: source, recency и confidence важны не меньше label.

**Behavior** строится из прошлых actions или patterns: просмотр product page, поиск, add-to-cart, install, частые покупки. Полезное behavioral rule всегда называет событие и observation window: `viewed_boots within 14 days` содержательнее, чем `active shopper`. Наблюдавшееся действие не гарантирует будущую покупку и само по себе ещё не задаёт тактику повторного обращения.

**Contextual targeting** выбирает opportunities по текущему media context: topic, semantics, category page/app/video и связанным signals. Оно может работать без утверждения, что platform знает устойчивую cross-site identity user: достаточно классифицировать среду, где возникла opportunity. Это отличает `читает статью о hiking сейчас` от audience hypothesis `интересуется hiking вообще`.

У keyword targeting две распространённые semantics. В Search keyword связывается с user query и предполагаемым intent по match rules продукта. В display/video keyword может описывать content и помогать contextual selection. Ни в одном случае keyword не обязан означать универсальный exact string match: stemming, semantic expansion, negative rules и сочетание criteria зависят от product contract.
Placement — более явный ответ на «где»: конкретный publisher property, app, site, channel, video, section или slot-level scope. Contextual system может динамически найти тысячи hiking-страниц; placement rule может разрешить только named outdoor-news app. Форматы, ad units и creative[^g-creative] compatibility рассматриваются в главе 8.

`Placement` — overloaded product term. На publisher side это конкретный ad slot или правило появления рекламы; на buy side тем же словом могут называть selectable media scope — целый site, app, channel, video, section или отдельный slot. При чтении configuration нужно уточнять уровень, а не считать их одной сущностью.

Минимальное описание opportunity могло бы выглядеть так; это учебный JSON, не vendor API:

```json
{
  "geo": "DE",
  "device": "mobile",
  "os": "Android",
  "context_topic": "outdoor/hiking",
  "placement": "publisher_app:article_feed"
}
```

Нельзя угадывать boolean semantics по соседству полей. Один product применит `topic OR placement`, другой — `topic AND placement`, третий использует topic как signal внутри выбранных placements. Contract должен явно определять composition и precedence.

## Как data превращаются в audience segment

Audience segment[^g-audience-segment] — не обязательно список известных людей. Это addressable set entities, для которого определены:

1. **Entity:** user, account, device, browser, household или modeled profile.
2. **Membership rule:** какое условие включает и исключает entity.
3. **Provenance:** кто и как получил исходные data.
4. **Observation window:** за какой interval учитываются события.
5. **Activation contract:** как platform сопоставляет membership со своими addressable entities.

Observation window здесь задаёт свежесть membership, например «trial начат за последние 7 дней». Это не attribution window: segment решает, кого рассматривать для delivery, а attribution[^g-attribution] позже распределяет credit за conversion[^g-conversion].

### First-party audiences

First-party audience[^g-first-party-audience] строится из data, полученных advertiser или publisher в direct relationship: CRM records, customer lists, site/app events, subscriptions и purchases. Для subscription app pipeline может быть таким:

```text
CRM + app events + subscription status
  → normalize + deduplicate
  → rule: trial_started AND no paid_subscription within 7d
  → platform matching/onboarding
  → addressable audience
```

CDP[^g-cdp] или собственный data pipeline может вычислить membership, но загруженная запись ещё не равна активируемой entity. Platform должна выполнить match; часть records останется unmatched, может обновиться с задержкой или быть недоступна в конкретном channel/region. `First-party` описывает provenance, а не автоматически consent, legal basis, эксклюзивное владение или 100% match.

Google Customer Match — датированный vendor example: advertiser передаёт собственные online/offline customer data, Google сопоставляет их для activation; с марта 2024 отдельные варианты activation на partner inventory ограничены в EEA, UK и Switzerland, тогда как owned-and-operated properties поддерживаются по своим условиям. Базовое понятие first-party audience не изменилось, но availability изменилась из-за product policy.

### Third-party audiences

Third-party audience[^g-third-party-audience] поставляет внешний provider, не являющийся стороной direct relationship advertiser с entity. Типичный flow:

```text
data originators
  → provider aggregation / classification / modeling
  → labeled segment
  → DSP/platform match
  → activation
```

Label `likely subscription buyers` не раскрывает состав segment. Перед использованием нужны как минимум:

- provenance и collection method;
- observation period и recency;
- membership criteria;
- доля observed и modeled membership;
- permissions и допустимые use cases;
- activation coverage и match boundary.

IAB Tech Lab Audience Taxonomy даёт общую nomenclature для labels вроде demographic, interest-based и purchase-intent, потому что vendor taxonomies исторически несовместимы. Data Transparency Standard добавляет disclosure о provenance, recency, segmentation и modeling. Ни taxonomy, ни Data Label не являются quality score: одинаковые labels не гарантируют одинаковый set, accuracy или performance.

First-party data не всегда точнее: sparse или плохо инструментированные events дают слабый segment. Third-party data не всегда бесполезны: provider может иметь релевантный source, которого нет у advertiser. Сравнивать нужно rule, provenance, freshness и match, а не порядковый номер `party`.

## Retargeting и lookalikes: прошлый контакт против новых prospects

Retargeting[^g-retargeting] повторно обращается к entities, которые раньше выполнили named interaction в заданном window. Для subscription app это может быть segment `installed AND trial_started AND no_paid_subscription after 7d`; ему показывают сообщение о premium-функциях. Recency и event definition входят в тактику: посетитель pricing page вчера и посетитель год назад — не одна audience.

```text
past interaction + window
  → retargeting membership
  → match at new opportunity
  → повторное обращение
```

Retargeting решает, кому снова показать рекламу. Оно не назначает attribution credit и не доказывает incrementality: высокий conversion rate может отражать уже существовавший intent.

Lookalike audience[^g-lookalike-audience] решает противоположную задачу — ищет **новых prospects** по seed audience. Platform извлекает или использует features seed entities и ранжирует других addressable entities по similarity или predicted relevance.

```text
seed: paid subscribers with 90-day value > €50
  → platform model/features
  → new similar prospects
  → prospecting delivery
```

Качество seed определяет задачу модели: смешанный seed из случайных trials учит не тому же, что stable high-value subscribers. Обычно возникает trade-off между similarity и size: более узкий threshold даёт меньший set, более широкий — больше reach, но более слабое сходство. Lookalike не обязана включать seed, не гарантирует conversion и не доказывает causal effect.

Semantics inclusion также меняется по product mode. На 2 сентября 2026 года Google переводит Lookalike segments именно в Demand Gen поэтапно из similarity-threshold constraint в suggestion mode: seed и reach level направляют модель, но delivery может выйти за threshold; отдельный opt-out path сохраняет прежнюю constraint semantics. Это не правило для всех campaign types или vendors. Meta Lookalike сохраняет seed-based model, однако в Advantage+ audience включённая custom/lookalike audience может быть suggestion, а не boundary. Значит, слово `Lookalike` описывает способ построения prospect signal, но не само по себе строгость delivery.

## Exclusions и overlap: отрицательные правила и set logic

Suppression нужна, когда «не показывать» важнее positive preference. Acquisition campaign обычно исключает current customers; re-engagement campaign — users, уже совершивших нужное действие; regulated или incompatible population может иметь собственный hard control. Отрицательный predicate должен иметь понятный precedence над positive signal:

```text
eligible(entity) = positive_rules(entity)
                AND NOT excluded(entity)
```

Но фактическая полнота exclusion ограничена observability. Если subscription event пришёл поздно, membership stale, identity не matched или platform трактует поле как suggestion, business entity может получить показ. Поэтому exclusion — намерение и contract rule, а не обещание нулевого leakage.

Audience overlap[^g-audience-overlap] — пересечение memberships нескольких segments в одной activation universe. Перед запуском subscription app может проверить:

```text
A = trial_no_purchase
B = existing_paid
C = high_value_seed_lookalike

inspect: A ∩ B, A ∩ C, B ∩ C
```

`A ∩ B` часто сигнализирует о stale events, неодинаковых windows или ошибке rules: один account одновременно считается unpaid trial и paid subscriber. `B ∩ C` может быть допустимым, если lookalike product включает seed; при prospecting его всё равно разумно убрать через exclusion, если цель — новые customers.

Для сравнения двух sets можно использовать иллюстративную Jaccard-like долю:

```text
overlap(A, B) = |A ∩ B| / |A ∪ B|
```

Числитель и denominator должны относиться к одной entity definition, одной activation universe и одному snapshot time. Platform estimates могут различаться из-за matching и identity coverage. Overlap способен уменьшать distinct reach[^g-reach], дробить setup и затруднять segment-level interpretation, но сам по себе не доказывает duplicate billing или то, что campaigns «торгуются сами с собой» — auction и dedup semantics зависят от platform.

## Broad и algorithmic delivery: граница targeting и optimization

Broad targeting — setup с небольшим числом positive audience restrictions. Это не отсутствие правил: сохраняются geo, policy, technical compatibility, placements, brand-safety controls и exclusions. Algorithmic targeting[^g-algorithmic-targeting] использует optimization goal, seeds, context, creative/landing signals и outcome feedback, чтобы искать вероятно полезные opportunities; за selected audience оно выходит только там, где input объявлен suggestion, а не hard control.

| Setup | Hard controls | Positive audience input | Может выйти за input? | Что делает optimizer |
|---|---|---|---|---|
| Manual / narrow | Geo, device, context и audience boundaries | Selected segment как constraint | Обычно нет, если contract действительно hard | Ранжирует внутри узкого eligible set |
| Broad | Базовые geo/policy/inventory guardrails и exclusions | Мало или нет positive restrictions | Set изначально broad | Ищет likely outcomes в широком set |
| Algorithmic with signals | Hard controls и exclusions | Seed, interest, keyword, creative/landing signals | Да, если input — suggestion | Расширяет или перераспределяет delivery ради goal |

На 2 сентября 2026 года два vendor examples показывают переносимое различие `control ≠ signal`:

- В Google Ads optimized targeting для поддерживаемых campaign types может искать conversions за пределами manually selected inputs. Конкретные signals различаются: для Display документация называет audience segments, keywords и topics; для Video и Demand Gen — audience/custom/customer-data segments, а выбранные Video placements остаются boundaries. Customer-data exclusions и отдельные brand-safety controls имеют другую semantics.
- В Meta Advantage+ audience на дату проверки `Locations`, minimum age, languages и excluded custom audiences могут выступать controls, а suggested age, gender, detailed targeting и included custom audiences — направлять AI, допускающий delivery другим users внутри controls. Availability зависит от campaign и policy category.

Это не сравнение performance и не универсальная рекомендация включать automation. Вывод уже: одинаково выглядящие audience inputs могут иметь разный contract.

### Subscription app: flow целиком

Advertiser хочет новые paid subscriptions в Германии. Configuration и data проходят следующие стадии:

1. **Hard eligibility:** `DE`, `mobile`, supported OS, допустимые placements и policy rules. Geo option проверен на semantics presence/interest.
2. **Suppression:** current paid subscribers исключены из acquisition. Match delay признан возможным leakage.
3. **Retargeting branch:** first-party rule `trial_started AND no paid_subscription in 7d` создаёт отдельную audience для re-engagement.
4. **Prospecting branch:** high-value paid subscribers образуют seed; lookalike используется как constraint или hint согласно выбранному product mode.
5. **Broad/algorithmic branch:** positive audience restrictions минимальны, но hard controls и exclusions остаются. Model ранжирует eligible opportunities к event `paid_subscription`.
6. **Feedback:** impressions[^g-impression], clicks[^g-click], installs, trials и subscription events обновляют reporting, segment membership и model inputs.

В этом flow targeting формирует допустимость и предпочтения; optimization выбирает направление delivery ради события. Bid calculation, budget allocation и pacing не нужны, чтобы провести эту границу, и относятся к следующей главе.

Для чтения любого targeting product достаточно шести вопросов:

1. Какая entity входит в audience и что является opportunity?
2. Какие criteria hard, какие suggested, какие negative?
3. Кто создал signal, каковы provenance, window и freshness?
4. Может ли model выйти за selected audience или seed?
5. Какой optimization event направляет ranking?
6. Какие `unknown`, match, permission и policy limits остаются?

## С чем это путают

- **Targeting ≠ optimization.** Первое задаёт constraints и preferences; второе ранжирует допустимые opportunities ради outcome.
- **Audience ≠ context.** Audience описывает matched entity или history; context — текущую media environment.
- **Interest ≠ intent ≠ behavior.** Affinity, текущий query и прошлое action — разные evidence.
- **Placement ≠ contextual selection.** Placement явно называет «где»; contextual system выбирает среды по content signals.
- **First-party ≠ автоматически разрешённые или полностью matched data.** Provenance не заменяет permission и activation contract.
- **Retargeting ≠ attribution.** Delivery tactic не решает, кому присвоить conversion credit.
- **Lookalike ≠ копия seed.** Это modeled prospect set; inclusion и expansion semantics product-specific.
- **Overlap ≠ double charge.** Это set intersection; billing consequences требуют отдельного contract evidence.

## Что важно запомнить

1. Targeting сокращает или направляет opportunity universe, но не обещает результат.
2. Любую настройку нужно классифицировать как hard control, signal/hint или exclusion.
3. Geo, demographics, interests и behavior часто inferred и могут быть `unknown` или stale.
4. Device, OS и browser — разные axes с неодинаковой доступностью.
5. Contextual targeting описывает текущий content; audience targeting — entity или её history.
6. Segment определяется не label, а entity, membership rule, provenance, window и activation contract.
7. First-party и third-party характеризуют происхождение data, а не гарантированное качество.
8. Retargeting повторно обращается к известному interaction set; lookalike ищет новых prospects по seed.
9. Broad delivery сохраняет guardrails; algorithmic expansion не должна путать hard controls с suggestions.
10. Optimization начинается после eligibility и использует outcomes как feedback.

## Проверьте себя

1. Почему `geo = DE` может означать не то же самое, что «user физически находится в Германии»?
2. Чем `interest: hiking`, `viewed_boots in 14d` и статья о hiking различаются как targeting inputs?
3. Какие пять характеристик нужны, чтобы содержательно описать audience segment?
4. Почему включённая audience в algorithmic product не всегда является строгой границей delivery?

# Sources and Further Reading

1. [IAB Tech Lab — Audience Taxonomy](https://iabtechlab.com/standards/audience-taxonomy/) — общая nomenclature audience categories; обновлено 11 декабря 2024 года, проверено 2 сентября 2026 года.
2. [IAB Tech Lab — Data Transparency Standard](https://iabtechlab.com/standards/data-transparency-standard/) — disclosure provenance, recency, segmentation и modeling без quality grade; обновлено 23 апреля 2024 года, проверено 2 сентября 2026 года.
3. [Google Ads Help — About advanced location options](https://support.google.com/google-ads/answer/1722038?hl=en) — `Presence or Interest`, `Presence` и best-effort geo inference; проверено 2 сентября 2026 года.
4. [Google Ads API — Targeting criteria](https://developers.google.com/google-ads/api/docs/targeting/criteria) — product-specific criteria и scopes; проверено 2 сентября 2026 года.
5. [Google Ads Help — About Customer Match](https://support.google.com/google-ads/answer/6379332?hl=en) — first-party customer-data matching и current availability limits; проверено 2 сентября 2026 года.
6. [Google Ads Help — About optimized targeting](https://support.google.com/google-ads/answer/10537509?hl=en) — manually selected segments как signals и separate controls; проверено 2 сентября 2026 года.
7. [Google Ads Help — Use Lookalike segments to grow your audience](https://support.google.com/google-ads/answer/13541369?hl=en) — phased Demand Gen transition to suggestion mode during 2026; проверено 2 сентября 2026 года.
8. [Meta Business Help Center — Audience controls and Audience suggestions in Advantage+ audience](https://www.facebook.com/business/help/938372127764391) — product-specific distinction controls/suggestions; проверено 2 сентября 2026 года.
