# Цель обучения

После главы читатель должен уметь прочитать рекламную кампанию как иерархию конфигурации `advertiser account → campaign → ad group/ad set → ad/creative`: определить владельца и область действия каждой настройки; проследить, как business objective переводится в optimization event, targeting, placements, bid strategy, budget, schedule, tracking и destination; а также объяснить, почему `draft → learning → active → paused → completed` — полезная мнемоника, но не универсальная линейная state machine: delivery status, review, schedule и algorithmic learning могут быть отдельными и частично одновременными состояниями.

# Границы главы

## Входит в главу

- Рекламная кампания как control-plane-конфигурация, которая связывает business intent advertiser с правилами delivery и измерения; не как денежная сделка, event funnel или отчёт.
- Базовая иерархия:

```text
advertiser account
└── campaign
    └── ad group / ad set
        └── ad
            ├── creative
            └── destination / landing page
```

- `Advertiser account` как tenant и administrative boundary: ownership/access, billing identity, currency/time zone, shared data sources и account-level defaults. Кратко различить ad account и manager/agency access; юридическая компания advertiser не обязана соответствовать одному account.
- `Campaign` как контейнер одного business intent/flight и общих delivery-настроек. Не выдавать конкретное расположение любой настройки за межплатформенный стандарт.
- `Ad group` / `ad set` как промежуточная scope boundary для группы ads. Показать две распространённые модели: Google-like ad group группирует близкие ads и triggering criteria; Meta-like ad set хранит audience/placements, optimization, bid, budget и schedule.
- `Ad` как delivery-единица, связывающая creative, destination, advertiser identity и status; `creative` как сообщение и набор assets, который может быть отдельным переиспользуемым объектом.
- `Placement` как место/контекст показа, а не описание человека: feed, stories, search results, in-app rewarded slot и т. п. Только роль настройки и связь с format eligibility; форматная глубина остаётся главе 8.
- Causal chain настройки:

```text
business objective
  → optimization event / performance goal
  → eligible audience и placements
  → bid strategy
  → budget + schedule
  → delivery
  → tracking signals и переход в destination
```

- Явное разделение `campaign objective`, `optimization event`, измеряемого conversion event, bid strategy и billing basis из главы 4.
- `Targeting` только как правило eligibility и/или input для delivery model: geo, device, context, audience/keyword examples, exclusions. Построение audiences, data provenance и privacy — глава 6.
- `Bid strategy` только как выбранная политика, переводящая optimization goal и ограничения в auction bids; различие strategy, target/control и фактического bid. Алгоритмы, auction mechanics и pacing — глава 7.
- `Budget` как ресурсное ограничение: daily, lifetime/campaign-total, shared/campaign-level или ad-set-level в зависимости от platform. Budget не является обещанием результата, billing basis или точным invoice amount.
- `Schedule` как временная eligibility: start/end, account time zone и при наличии dayparting. Кратко показать interaction с budget/status, без pacing algorithms.
- `Tracking settings` как конфигурация наблюдаемости: campaign/ad IDs, URL parameters/macros, tracking template/final URL suffix, pixel/SDK/server/MMP event source, выбранные conversion actions и attribution configuration boundary. Реализация attribution, privacy mechanisms и discrepancy analysis остаются поздним главам.
- `Landing page` в широком смысле destination после interaction: web page, App Store/Google Play listing или deep link. Отделить destination/user experience от click measurement и redirects.
- Lifecycle по требованию главы: `draft → learning → active → paused → completed`, но с корректной моделью state vector/graph: review и schedule eligibility — отдельные оси; learning может идти во время active delivery; pause обратим; completion обычно следует end condition, а не обязательно pause.
- Один сквозной setup subscription-app campaign от account до ad и один change scenario, возвращающий delivery system в learning.

## Не входит в главу

- Повтор economics из главы 4: CPM/CPC/CPA/CPI/CPL, billable event, target CPA как pricing-versus-optimization distinction, advertiser spend, publisher payout, take rate, margin и путь `$100`. Глава 5 использует distinction `billing basis ≠ optimization event`, но не переобъясняет экономику.
- Глубокий targeting и audience engineering: first-/second-/third-party data, segments, lookalikes, retargeting, contextual/semantic targeting, exclusions, identity и privacy — глава 6. Здесь только место targeting в campaign configuration и 2–3 примера criteria.
- Выбор и математика bid strategies, auction-time bid calculation, pacing, budget allocation, exploration/exploitation, target CPA/ROAS tuning и learning algorithms — глава 7. Здесь bid strategy представлена как поле и policy boundary.
- Каталог ad formats, размеры/assets, native/video/display/search спецификации, placement compatibility и creative production — глава 8. Здесь placement и creative нужны лишь для структуры кампании.
- Пошаговые инструкции по конкретному UI, полный Marketing API/Google Ads API schema, текущие enum-списки objectives/statuses и vendor-specific setup wizard. Они быстро меняются и не являются переносимой mental model.
- Детальная mobile attribution: MMP links, deferred deep linking, SKAdNetwork/AdAttributionKit, Android Privacy Sandbox, attribution windows, probabilistic matching и postbacks. Tracking settings обозначают integration boundary, но не объясняют attribution mechanics.
- Consent frameworks, browser/mobile privacy restrictions, tag governance и server-side tracking implementation.
- Landing-page UX/CRO, web performance, A/B testing, experimentation, incrementality и creative optimization.
- Moderation policy, legal review, rejected/disapproved ads и appeal workflow. Review/pending упоминаются только как доказательство нелинейности lifecycle.
- Reporting schemas, aggregation, dashboard interpretation, reconciliation, fraud/invalid traffic и billing operations.

# Результаты исследования

- Исследование проведено на 2026-08-31. Официальные Google Ads и Meta материалы показывают общий переносимый skeleton — account, campaign, промежуточная группа и ads, — но различное распределение полей по уровням. Поэтому автор должен преподавать иерархию как **scope/inheritance model**, а не как единый industry schema. Google описывает account → campaigns → ad groups, внутри которых находятся multiple ads; Meta Marketing API отдельно создаёт campaigns, ad sets, creatives и ads. [Источники 1–3]
- **Advertiser account — administrative boundary, не синоним компании advertiser.** В Google account связан с доступом и billing information и содержит campaigns; agency может заходить через manager account. В переносимой модели account также задаёт namespace IDs, permissions, currency/time zone и shared defaults, но конкретный состав полей product-specific. [Источник 1]
- **Campaign и ad group/ad set — прежде всего области действия настроек.** В Google campaign имеет собственные budget/settings, определяющие, где показываются ads, а ad group объединяет похожие ads и связанные triggering criteria. В Meta campaign задаёт overall objective, тогда как ad set обычно связывает targeting, placements, optimization, bid, budget и schedule. Значит, утверждение «budget/targeting всегда живёт на уровне X» неверно вне названной platform и campaign type. [Источники 1–3, 10]
- **Ad не равен creative.** Meta API создаёт/хранит creative отдельно, затем ad связывает `creative_id` с `adset_id` и status. Переносимая модель: creative отвечает на вопрос «что видит user», ad — «какая executable configuration доставляет это сообщение, куда ведёт и к какому parent относится». Некоторые platforms скрывают это различие в UI. [Источник 3]
- **Campaign objective — high-level business intent или setup guidance, а не точное событие оптимизации.** Google objective направляет advertiser к релевантным campaign types/features/settings и в некоторых flows может быть необязательным; names и доступность зависят от campaign type. Не следует превращать текущий список Sales/Leads/Traffic и т. п. в вечную taxonomy. [Источник 4]
- **Optimization event/performance goal операционнее objective.** Google conversion goals группируют concrete conversion actions и определяют, какие primary actions участвуют в bidding; Meta прямо допускает, что objective `Sales` сочетается с performance goal `link clicks`. Для главы нужен mapping `business outcome → observable event`, а также caveat: глубокий event вроде paid subscription ближе к бизнес-ценности, но обычно реже и требует корректного event source. [Источники 5–6]
- **Billing basis, optimization event и tracking event остаются разными объектами.** Continuity с главой 4: campaign может оптимизироваться по subscription, отслеживать install, trial и purchase, а contractual charge возникать на иной basis. В этой главе distinction нужна только для чтения configuration; pricing/risk не повторять.
- **Placement и targeting отвечают на разные вопросы.** Placement ограничивает environment/slot, где ad может появиться; targeting ограничивает eligible opportunities/users/contexts. В реальных platforms оба ограничения могут находиться в одном targeting object или быть automated, но смысловые оси не сливаются. Meta examples передают publisher platforms/positions внутри targeting payload — хороший пример того, почему API nesting не должно диктовать conceptual taxonomy. [Источники 2–3, 10]
- **Budget location и semantics platform-specific.** Google Ads API использует `CampaignBudget`, который может быть связан с campaign и в отдельных случаях shared; Meta поддерживает daily/lifetime budget на ad set и campaign-level allocation через campaign budget features. Автору следует показать daily versus lifetime resource constraint и inheritance/allocation, но не обещать точный spend за каждый день и не преподавать pacing до главы 7. [Источники 2, 10]
- **Tracking settings и destination разделены.** В Google URL options могут задаваться на account, campaign, ad group, ad и других уровнях; наиболее specific template имеет приоритет. При parallel tracking user идёт прямо на final URL, а click measurement выполняется в фоне. Это product-specific пример общих принципов inheritance и разделения user path от measurement path; не универсальная гарантия для всех platforms. [Источник 7]
- **Lifecycle не является одной линейной колонкой status.** Google отдельно показывает campaign statuses (`Eligible`, `Paused`, `Pending`, `Ended` и др.) и bid-strategy status `Learning`. Meta learning относится к delivery ad set: после significant edits targeting, creative, optimization event или bid strategy ad set может снова войти в learning. Следовательно, `learning` может сосуществовать с активной delivery, `pause` обратим, а `completed/ended` определяется schedule/end condition. [Источники 8–9]
- **Significant edit — platform rule, не универсальный порог.** В текущей Meta документации изменения targeting, creative, optimization event, добавление ad и смена bid strategy названы significant; влияние budget change зависит от масштаба. Использовать это как change scenario и причинную связь `configuration changed → model needs new evidence`, но не переносить Meta thresholds на Google, DSP или ad network. [Источник 9]
- **Педагогический выбор:** сначала дать конфигурационное дерево и scope boundaries, затем causal chain objective → delivery controls → observability/destination, и только после этого lifecycle. Так читатель понимает, *что именно* меняется и наследуется, прежде чем видеть последствия edits и statuses.

# Терминология

## Уже ожидается

- Advertiser, publisher, agency/media buyer, ad network, DSP, SSP, ad exchange, ad server, MMP, user и mobile subscription app scenario — главы 1–2.
- Request/opportunity, impression, click, install, conversion, purchase/subscription, CTR, CVR, CPM/eCPM, CPC, CPA/CPI, CAC, ROAS, LTV — глава 3.
- Campaign и creative как ранее встречавшиеся слова без формальной configuration semantics; placement как характеристика inventory.
- Pricing basis, billable event, optimization target, bid, spend/budget-adjacent money vocabulary и principle `billing ≠ optimization ≠ reporting` — глава 4.
- HTTP redirects, URLs/query parameters, IDs, JSON, inheritance/override, tenant, permissions, state machine и event source — общая software-engineering база.

## Вводится здесь

- **Advertiser account / ad account** — product tenant, внутри которого advertiser или agency управляет campaigns, доступом, billing identity, defaults, data connections и reporting namespace. Не равен автоматически одной legal entity или одному brand.
- **Manager account / agency access** — административный слой, позволяющий управлять несколькими ad accounts; не дополнительный delivery level внутри каждой campaign.
- **Campaign** — верхнеуровневый delivery container для business intent/flight и набора общих настроек; конкретные поля и immutable choices зависят от platform/campaign type.
- **Ad group / ad set** — промежуточный контейнер ads с общей execution scope. Названия близки функционально, но поля не взаимозаменяемы между vendors.
- **Ad** — исполняемая delivery-конфигурация, связывающая parent group, creative, destination/identity, tracking и status.
- **Creative / creative asset** — сообщение и материалы рекламы: text, image, video, audio, CTA и metadata; может быть inline частью ad или отдельным reusable object.
- **Placement** — media environment и slot/position, где ad eligible к показу: feed, story, search results, video pre-roll, in-app banner/rewarded и т. п.
- **Campaign objective** — high-level business outcome или setup intent, например awareness, traffic, leads, app promotion, sales; не обязательно exact event для bidding.
- **Optimization event / performance goal** — наблюдаемый result, вероятность/ценность которого delivery system старается увеличить при выборе opportunities и bids: impression, click, landing-page view, install, purchase, value.
- **Conversion action / primary event** — конкретно определённый tracking event, выбранный как input для bidding и/или reporting; platform может группировать actions в conversion goal.
- **Targeting** — eligibility rules и model inputs, ограничивающие или направляющие delivery по audience, context, geo, device, keyword и exclusions; глубина — глава 6.
- **Bid strategy** — policy, по которой система формирует auction bids ради optimization goal с учётом targets/limits; не synonym фактического bid, billable price или pricing basis.
- **Budget** — ограничение доступного spend на выбранной scope/time basis; common variants: daily, lifetime/campaign total, shared или allocated budget.
- **Schedule / flight** — временной интервал и calendar rules eligibility: start, end, time zone, optional dayparting.
- **Tracking settings** — настройки, связывающие ad interactions с identifiers, URLs и event sources для measurement/optimization: templates, parameters, pixel/SDK/server/MMP, conversion action и attribution configuration.
- **Landing page / destination / final URL** — первая целевая поверхность после ad interaction: web page, store listing или deep link; это product/user path, а не сам tracking record.
- **Configured status** — явно установленное оператором состояние объекта, например active/enabled или paused.
- **Effective/delivery status** — вычисленное состояние с учётом parent status, schedule, review, budget, errors и eligibility.
- **Learning phase** — состояние delivery/bidding model после старта или material configuration change, когда система собирает evidence и адаптирует decisions; не обязательно означает отсутствие показов.
- **Significant edit** — product-specific изменение, способное изменить delivery distribution и вернуть optimizer в learning; список и thresholds vendor-specific.
- **Completed / ended** — delivery закончилась по end condition/schedule; reporting object и history при этом обычно сохраняются. Не synonym deleted/removed.

# Предлагаемая структура главы

1. **Зачем кампании нужна иерархия: account как корень управления**
   - Цель: начать с проблемы — один advertiser запускает много инициатив, каналов, audiences и ads, поэтому settings, access и reporting нельзя хранить плоским списком.
   - Обязательные concepts: advertiser account/ad account; tenant; ownership/access; billing identity; currency/time zone; namespace; account defaults; manager account как внешний administrative layer.
   - Иллюстрация: компактное дерево `company → agency access → ad account → campaigns`; рядом таблица `business entity ≠ account ≠ manager account`.
   - Пример: subscription-app company имеет отдельные ad accounts для regions или legal/billing scopes, а agency получает access без владения самой campaign.
   - Покрывает: 5.1.

2. **Execution tree: campaign → ad group/ad set → ad → creative**
   - Цель: дать устойчивую mental model object hierarchy и научить спрашивать «какие children делят эту настройку?» вместо запоминания конкретного UI.
   - Обязательные concepts: campaign как intent/flight container; ad group/ad set как middle scope; ad как executable binding; creative/assets как content; parent-child status/inheritance; platform variance.
   - Сравнительная таблица:

| Уровень | Переносимая функция | Google-like пример | Meta-like пример |
|---|---|---|---|
| Campaign | Общий intent и delivery scope | budget/settings, channel/type | objective, optional campaign budget |
| Middle layer | Группа ads с shared execution rules | ad group: related ads + keywords/criteria | ad set: audience, placements, optimization, bid, budget/schedule |
| Ad | Delivery unit | ad внутри ad group | ad с `adset_id` и creative reference |
| Creative | Что показывается | assets/ad content | отдельный `creative_id` может переиспользоваться |

   - Иллюстрация: маленький JSON-like tree с IDs и только 1–2 children на уровень; визуально отметить inheritance и override, не воспроизводить vendor schema.
   - Пример: одна app-promotion campaign, два ad sets (`US`, `DE` как labels без targeting depth), в каждом два video ads, один creative variant на ad.
   - Покрывает: 5.2, 5.3, 5.4.

3. **От business intent к правилам выбора показа**
   - Цель: причинно связать objective, optimization event, targeting, placement и bid strategy, не смешивая их с billing.
   - Обязательные concepts:
     - objective отвечает «какого business outcome хотим?»;
     - optimization event/performance goal — «какой observable signal система предсказывает/максимизирует?»;
     - targeting — «какие opportunities eligible или preferred?»;
     - placement — «в каком environment/slot возможен показ?»;
     - bid strategy — «как goal и constraints переводятся в bids?».
   - Главная схема:

```text
paid subscription — business outcome
  → App promotion / Sales — campaign objective
  → install или purchase — optimization event
  → geo/device/audience rules — targeting overview
  → feed / in-app / video inventory — placements
  → maximize conversions / target-control policy — bid strategy
```

   - Таблица различий: `objective | optimization event | tracked event | bid strategy | billing basis`, с одним заполненным subscription-app row. Billing basis взять как уже известную строку из главы 4 без economics walkthrough.
   - Misconception box: placement не audience; objective не event; bid strategy не один числовой bid; глубже funnel не автоматически «лучше», если event source/volume недостаточны.
   - Дедупликация: targeting categories назвать одним предложением и передать chapter 6; strategy mechanics — chapter 7; placement/format compatibility — chapter 8.
   - Покрывает: 5.5, 5.6, 5.7, 5.8, 5.9.

4. **Ресурсы и время: budget + schedule**
   - Цель: показать, что даже правильный decision policy действует только внутри resource и time constraints.
   - Обязательные concepts: daily vs lifetime/campaign-total budget; campaign/shared vs ad-set budget; allocation/inheritance; spend limit versus bid control; start/end; account time zone; dayparting; eligibility.
   - Иллюстрация: таблица `setting → scope → unit → что ограничивает → чего не гарантирует`.
   - Мини-пример: `€700 lifetime`, 7-day flight, два ad sets. Не делить автоматически на `€100/day`: allocation и pacing могут быть неравномерны; детали chapter 7.
   - Edge case: campaign `enabled`, но future start означает pending/not delivering; end date приводит к ended/completed независимо от наличия остатка budget.
   - Покрывает: 5.10, 5.11.

5. **Куда приходит user и откуда система получает сигналы**
   - Цель: отделить destination path от measurement/data path и показать tracking settings как часть campaign configuration.
   - Обязательные concepts: final URL/destination; web landing page, store listing, deep link; campaign/ad IDs; URL parameters/macros; tracking template; parallel/background measurement как один vendor example; pixel/SDK/server/MMP event source; conversion action selection; attribution configuration boundary.
   - Двойная схема:

```text
user path:        ad click → final URL / app store / deep link
measurement path: click ID + campaign/ad IDs → platform/MMP
                  install → trial → subscription events → reporting/optimization
```

   - Маленький URL example: `https://example.com/app?campaign_id=c_42&ad_id=a_7`; не превращать его в универсальный standard и не добавлять реальный vendor payload.
   - Таблица `creative promise → destination → observable event`; проверить semantic alignment, но не уходить в CRO.
   - Misconception box: tracking template не является landing page; наличие event в analytics не означает, что он выбран для optimization; MMP не хранит campaign hierarchy за advertiser автоматически без mapping.
   - Покрывает: 5.12, 5.13.

6. **Lifecycle без ложной линейности**
   - Цель: выполнить требование `draft → learning → active → paused → completed`, одновременно дать корректную operational model.
   - Сначала показать mnemonic из TOC, затем немедленно аннотировать:
     - `draft` — configuration ещё не опубликована; может существовать только в UI/client;
     - `learning` — optimizer адаптируется и при этом delivery уже может быть active;
     - `active` — object разрешён к delivery, но показы дополнительно зависят от parent, review, schedule, budget и eligibility;
     - `paused` — operator stop, обычно обратимый;
     - `completed/ended` — end condition наступило; не то же самое, что deleted.
   - Основная иллюстрация — state graph, не одна стрелка:

```text
draft → publish → pending/review → eligible delivery
                                  ↘ learning → stable delivery
active/learning ↔ paused
active or paused → end condition → completed/ended
material edit → learning again
```

   - Отдельная таблица четырёх осей: configured status, effective delivery status, review/issues, learning status. Привести Google example `campaign Eligible + bid strategy Learning` и Meta example `ad set Active + Learning`.
   - Change scenario: заменить optimization event `install` на `subscription` или creative; объяснить causal consequence — historical distribution перестаёт полностью описывать новую configuration, поэтому model снова собирает evidence. Не давать универсальных thresholds/durations.
   - Closing checklist чтения любой campaign: `account owner? object level? objective? optimization event? targeting? placement? bid strategy? budget/schedule? tracking source? destination? configured/effective/learning states?`.
   - Покрывает: 5.14.

# Ключевые примеры

1. **Subscription-app campaign от account до subscription.** Advertiser через agency access создаёт app ad account; campaign имеет objective `App promotion`; два ad sets разделяют только region/placement scope; optimization event сначала `install`, затем в отдельном варианте `subscription`; bid strategy, lifetime budget и 7-day schedule задают execution constraints; ads связывают video creatives со store listing/deep link; platform и MMP получают `campaign_id`, `adset_id`, `ad_id`, install и subscription events. Пример несёт всю главу, но не сообщает «правильные» targeting/bid values.
2. **Один business intent, разные platform scopes.** Side-by-side miniature: Google-like `account → campaign → ad group → ad` и Meta-like `ad account → campaign → ad set → ad + creative`. Сравнение показывает одинаковые вопросы и разное местоположение budget, targeting и optimization settings; не объявляет products взаимозаменяемыми.
3. **Material edit и повторный learning.** Active ad set оптимизировался по installs; advertiser меняет event на paid subscription и обновляет creative. Показать state vector до/после, возможный возврат optimizer в learning и сохранение configured status `active`; pause/resume и scheduled end добавить как отдельные transitions, а не обязательную последовательность.

# Важные заблуждения

- **«У всех platforms одна и та же иерархия и поля лежат на одинаковых уровнях».** Общий skeleton полезен, но scope budget, targeting, placements и optimization зависит от vendor, channel и campaign type.
- **«Advertiser account — это сама компания advertiser».** Account — product/billing/access boundary; одна компания может иметь несколько accounts, а agency — управлять ими через отдельный manager layer.
- **«Campaign — просто папка для отчётов».** Это executable scope: parent settings и limits влияют на children и delivery.
- **«Ad group и ad set — два названия абсолютно одного schema».** Оба являются middle layer, но Google-like и Meta-like products закрепляют за ними разные настройки.
- **«Ad и creative — одно и то же».** Creative — content; ad связывает content с parent, destination, tracking/identity и delivery status. Иногда UI прячет distinction.
- **«Placement — это audience».** Placement отвечает «где», targeting — «какие opportunities/users/contexts eligible»; API может хранить их рядом, смысл остаётся разным.
- **«Objective, optimization event, conversion и billing event совпадают».** Objective задаёт business intent, optimizer использует выбранный signal, tracking может собирать больше events, а billing basis определяется отдельно.
- **«Самый глубокий event всегда лучший для optimization».** Он ближе к business value, но может быть редким, задержанным или плохо измеренным; конкретный trade-off рассматривается в bidding/measurement главах.
- **«Bid strategy — это bid amount».** Strategy — policy; target/cap — parameter; actual auction bid — одно из её решений.
- **«Budget гарантирует ровно такой spend и результат».** Budget ограничивает/направляет delivery на заданной scope и time basis, но не гарантирует inventory, conversions, равномерный расход или invoice byte-for-byte.
- **«Enabled/Active означает, что ad прямо сейчас показывается».** Parent pause, future schedule, review, exhausted constraints, no eligible opportunities или errors могут остановить delivery.
- **«Learning означает, что реклама ещё не active».** Learning — состояние optimizer; delivery и spend могут уже происходить.
- **«Pause — обязательный шаг перед completed».** Pause обычно обратим и инициируется operator; completed/ended чаще следует end condition. Campaign может завершиться без pause или оставаться paused без completion.
- **«Любое редактирование одинаково сбрасывает learning».** Significance и threshold — product-specific; не переносить Meta rules на другие platforms.
- **«Tracking URL и landing page — одно».** Tracking config создаёт measurement path и metadata; landing page/destination — user-facing endpoint.

# Coverage Matrix

| Требование | Планируемое место | Способ раскрытия |
|---|---|---|
| 5.1 | Раздел 1 «Зачем кампании нужна иерархия» | Определение advertiser/ad account как tenant, access/billing/reporting boundary; отличие legal advertiser и manager account; tree diagram и subscription-app ownership example |
| 5.2 | Раздел 2 «Execution tree» | Campaign как container одного intent/flight и shared delivery scope; parent-child model, platform-variance caveat и место в comparative hierarchy table |
| 5.3 | Раздел 2 «Execution tree» | Ad group/ad set как middle scope; Google-like versus Meta-like comparison полей, grouping purpose, inheritance и concrete two-ad-set example |
| 5.4 | Раздел 2 «Execution tree» | Ad как executable binding и creative как content/assets; comparison, reusable-creative example и JSON-like object tree |
| 5.5 | Раздел 3 «От business intent к правилам выбора показа» | Placement definition «где показывать», examples feed/search/in-app/video, distinction from audience и только overview format eligibility с передачей глубины главе 8 |
| 5.6 | Раздел 3 «От business intent к правилам выбора показа» | Campaign objective как high-level business intent/setup guidance; mapping subscription outcome → App promotion/Sales, vendor-name volatility и distinction from exact optimization event |
| 5.7 | Раздел 3 «От business intent к правилам выбора показа» | Optimization event/performance goal как observable signal для delivery decisions; install-versus-subscription example, data-source prerequisite и comparison с objective/tracked/billable events |
| 5.8 | Раздел 3 «От business intent к правилам выбора показа» | Targeting как eligibility rules/model inputs; только geo/device/context/audience/keyword/exclusion overview, placement distinction и явная передача audience/data/privacy depth главе 6 |
| 5.9 | Раздел 3 «От business intent к правилам выбора показа» | Bid strategy как policy, связывающая goal и constraints с actual bids; отделение strategy от target/cap, bid, clearing/billable price; mechanics переданы главе 7 |
| 5.10 | Раздел 4 «Ресурсы и время» | Daily versus lifetime/total budget, shared/campaign/ad-set scopes и allocation example; budget как constraint, не spend/result/billing guarantee; pacing depth в главе 7 |
| 5.11 | Раздел 4 «Ресурсы и время» | Start/end, time zone, optional dayparting и schedule eligibility; 7-day flight example, future-start/ended edge cases и interaction со status/budget без pacing algorithms |
| 5.12 | Раздел 5 «Куда приходит user и откуда система получает сигналы» | Tracking settings inventory: IDs, URL parameters/macros/templates, pixel/SDK/server/MMP event source, conversion action и attribution boundary; dual user/measurement flow и compact URL example |
| 5.13 | Раздел 5 «Куда приходит user и откуда система получает сигналы» | Landing page/destination как web page, store listing или deep link; final URL role, alignment with creative, distinction from redirects/tracking path и no-CRO boundary |
| 5.14 | Раздел 6 «Lifecycle без ложной линейности» | Явный разбор `draft → learning → active → paused → completed`, затем state graph и четырехосевая status table; learning-overlap, reversible pause, scheduled completion и significant-edit re-entry examples |

# Источники

1. **[Google Ads Help — Account, campaign, and ad group performance](https://support.google.com/google-ads/answer/2404036?hl=en).** Проверено 2026-08-31. Поддерживает hierarchy account → campaigns → ad groups → multiple ads, account billing/access context и campaign-level budget/settings. Ограничение: Google Ads UI/reporting model, не межплатформенный standard.
2. **[Google Ads API — Campaigns overview](https://developers.google.com/google-ads/api/docs/campaigns/overview).** Проверено через current official documentation 2026-08-31. Поддерживает `CampaignBudget`, bidding strategy и targeting criteria как основные campaign resources/settings. Ограничение: API resource model и доступность полей зависят от campaign type/version.
3. **[Meta Marketing API — Basic Ad Creation](https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/).** Проверено 2026-08-31. Поддерживает отдельные create flows для campaign, ad set, creative и ad; campaign objective, ad-set scope и связь ad с creative. Ограничение: Meta-specific Graph API; текущие field names/enums не использовать как вечную taxonomy.
4. **[Google Ads Help — About campaign objectives](https://support.google.com/google-ads/answer/7450050?hl=en).** Проверено 2026-08-31. Поддерживает objective как business intent/setup guidance, связь с campaign type и рекомендованными settings; страница также фиксирует изменение label одного objective без изменения underlying intent. Ограничение: available objectives и editability различаются по campaign type и меняются со временем.
5. **[Google Ads Help — About conversion goals](https://support.google.com/google-ads/answer/10995103?hl=en).** Проверено 2026-08-31. Поддерживает distinction conversion goal/action, primary/secondary events и использование выбранных actions в bidding/reporting. Ограничение: Google-specific semantics; не универсальная event taxonomy и не доказательство billing basis.
6. **[Meta Business Help Center — About performance goals](https://www.facebook.com/business/help/355670007911605).** Проверено 2026-08-31. Поддерживает performance goal как result, по которому delivery system bids/optimizes, и прямой пример, где campaign objective `Sales` отличается от ad-set goal `link clicks`; некоторые goals требуют Pixel/SDK signals. Ограничение: Meta-specific product behavior и динамический список goals.
7. **[Google Ads Help — About tracking in Google Ads](https://support.google.com/google-ads/answer/6076199?hl=en).** Проверено 2026-08-31. Поддерживает tracking-template inheritance, most-specific override, final URL suffix и separation parallel click measurement from direct user navigation to final URL. Ограничение: Google click-tracking implementation; другие platforms и MMP links могут строить user/data paths иначе.
8. **[Google Ads Help — About campaign statuses](https://support.google.com/google-ads/answer/1722131?hl=en)** и **[Google Ads API — Bidding Strategy Status](https://developers.google.com/google-ads/api/docs/campaigns/bidding/strategy-status).** Проверено 2026-08-31. Поддерживают separate campaign operational statuses (`Eligible`, `Paused`, `Pending`, `Ended`) и bid-strategy `Learning`. Ограничение: labels Google-specific; глава использует distinction status axes, а не переносит enum values.
9. **[Meta Business Help Center — About the learning phase](https://www.facebook.com/business/help/112167992830700)** и **[Significant edits and learning phase](https://www.facebook.com/business/help/316478108955072).** Проверено 2026-08-31. Поддерживают learning на ad-set delivery, менее стабильную performance во время adaptation и возврат в learning после significant edits targeting, creative, optimization event, ads или bid strategy. Ограничение: exact edits, thresholds и durations меняются и не переносятся на другие platforms.
10. **[Meta Marketing API — Budgets](https://developers.facebook.com/docs/marketing-api/bidding/overview/budgets/).** Проверено 2026-08-31. Поддерживает daily/lifetime budget, ad-set scheduling и product-specific placement/targeting payload examples; campaign-level allocation дополнительно отражён в current Meta learning documentation через Advantage+ campaign budget. Ограничение: Meta budget/pacing rules не являются универсальными и подробно рассматриваются в главе 7.

Все platform claims привязаны к конкретному vendor и дате проверки. Generic hierarchy, causal chain и state-vector model — учебный synthesis официальных моделей, а не заявление о едином API или стандарте AdTech.