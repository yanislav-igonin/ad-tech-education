---
id: ch-05
type: chapter
part: II
chapter: 5
slug: campaign-structure
title: "Как устроена рекламная кампания"
language: ru
status: draft
toc_requirements: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13", "5.14"]
prerequisites: [ch-01, ch-02, ch-03, ch-04]
---

# Как устроена рекламная кампания

Рекламная кампания[^g-campaign] — не один banner и не строка в отчёте. Это **control-plane-конфигурация**, которая переводит business intent advertiser[^g-advertiser] в правила delivery: что система должна улучшать, какие рекламные возможности допустимы, где может появиться реклама, сколько и когда можно потратить, какой content показать, куда привести user и какие signals использовать для измерения.

У большинства platforms есть похожее дерево объектов:

```text
advertiser account
└── campaign
    └── ad group / ad set
        └── ad
            ├── creative
            └── destination
```

Но это не единая отраслевая schema. Vendors и campaign types по-разному размещают budget[^g-budget], targeting[^g-targeting], optimization и schedule[^g-schedule]. Переносимая mental model строится не вокруг названий экранов, а вокруг двух вопросов: **какой объект владеет настройкой** и **какие дочерние объекты получают её действие**.

## Зачем кампании нужна иерархия: account как корень управления

Один advertiser одновременно запускает разные продукты, страны, billing scopes и команды. Плоский список ads[^g-ad] не позволил бы безопасно определить, кто имеет доступ, в какой валюте учитывать spend[^g-media-spend], какой time zone управляет расписанием и какие data sources доступны объектам. Поэтому platform начинает с **advertiser account**[^g-ad-account], или **ad account**, — tenant, внутри которого существуют campaigns и связанные с ними настройки.

Account обычно образует несколько границ сразу:

- **Ownership и access.** Он определяет владельца ресурсов, роли и permissions операторов.
- **Billing identity.** С ним связаны payer, billing profile или иная договорная сущность. Точный состав полей зависит от product.
- **Currency и time zone.** Эти значения влияют на reporting, budget periods и schedule; в некоторых products после создания их трудно или невозможно изменить.
- **Namespace.** Campaign и ad resource IDs уникальны как минимум в контексте platform/account. Scope и semantics event identifiers зависят от event source и deduplication contract и не обязаны следовать этому правилу.
- **Shared configuration.** Data sources, conversion actions[^g-conversion], brand assets, URL settings и defaults могут быть доступны нескольким campaigns.

Юридическая компания advertiser и ad account — не одно и то же. У одной компании могут быть отдельные accounts для регионов, brands, currencies или billing entities. И наоборот, один account может обслуживать несколько инициатив одной legal entity.

**Manager account**[^g-manager-account] — административный слой, который даёт agency[^g-agency] или внутренней группе централизованный доступ к нескольким ad accounts. Доступ к отдельному account может быть выдан и без такого слоя. В любом случае это administrative access, а не дополнительный delivery-уровень внутри campaign.

```text
Subscription App Ltd.
├── internal growth team
├── agency manager access ─────────────┐
│                                     │
├── ad account EU (EUR, Europe/Berlin)│
│   ├── campaign: Spring subscriptions│
│   └── campaign: Returning users     │
└── ad account US (USD, America/NY) ◀─┘
    └── campaign: Summer acquisition
```

| Объект | Что он представляет | Чего из него нельзя заключить |
|---|---|---|
| Legal advertiser | Компанию или другую юридическую сторону | Что у неё ровно один ad account |
| Ad account | Product, access и billing boundary | Что только одна команда или agency может им управлять |
| Manager account | Делегированный доступ к нескольким accounts | Что он участвует в delivery hierarchy каждой campaign |

Account-level setting часто наследуется вниз, пока более конкретный объект не задаст override. Но inheritance — product-specific contract: одинаковое имя поля не гарантирует одинаковый порядок приоритетов. При чтении configuration нужно фиксировать не только значение, но и его источник: `account default`, `campaign value` или `ad-level override`.

Для сквозного примера возьмём EU account subscription app. Agency получила access, но owner и billing identity остаются у advertiser. Account использует EUR и time zone `Europe/Berlin`; именно эта зона будет исходной для campaign schedule. Цель бизнеса — получить новые оплаченные подписки, однако сама campaign ещё должна превратить эту цель в исполняемые настройки.

## Execution tree: campaign, ad group/ad set, ad и creative

**Campaign** — верхнеуровневый delivery container для одного business intent или согласованного flight. Она объединяет настройки, которые должны действовать на несколько дочерних групп и ads: objective[^g-campaign-objective], общие limits, channel/type и другие product-specific controls. Campaign — не просто папка для отчёта: её pause, schedule или ограничение может остановить либо изменить delivery всех descendants.

**Ad group**[^g-ad-set] или **ad set** — промежуточная scope boundary для группы ads. Обе сущности отвечают на вопрос «какие ads разделяют execution rules?», но не имеют универсально одинаковой schema:

- в Google-like модели ad group обычно объединяет близкие ads и triggering criteria, например related keywords;
- в Meta-like модели ad set обычно хранит audience, placements[^g-placement], optimization, bid, budget и schedule.

Поэтому фразы «targeting всегда находится в ad group» или «budget всегда задаётся на campaign» неверны без названия platform и campaign type.

**Ad** — исполняемая delivery-единица. Она связывает parent group, advertiser identity, creative[^g-creative], destination[^g-destination], tracking и status. **Creative** отвечает за сообщение и assets — text, image, video, audio, CTA и metadata. Creative может быть inline-частью ad или отдельным reusable object. Даже если UI показывает их одной карточкой, логически это разные обязанности:

```text
creative: что увидит user
ad:       где и при каких parent rules этот creative исполняется,
          куда ведёт и в каком состоянии находится
```

| Уровень | Переносимая функция | Google-like пример | Meta-like пример |
|---|---|---|---|
| Campaign | Общий intent и delivery scope | Campaign settings, channel/type и budget link | Objective и, при выбранной модели, campaign-level budget |
| Middle layer | Группа ads с shared execution rules | Ad group: related ads и keywords/criteria | Ad set: audience, placements, optimization, bid, budget/schedule |
| Ad | Delivery unit | Ad внутри ad group | Ad с parent `adset_id` и creative reference |
| Creative | Content и assets | Assets/ad content | Отдельный `creative_id` может переиспользоваться |

Ниже — учебное дерево, а не payload реального API:

```json
{
  "account_id": "acct_eu_1",
  "campaign": {
    "id": "cmp_subscriptions_42",
    "objective": "APP_PROMOTION",
    "groups": [
      {
        "id": "grp_us_1",
        "label": "US",
        "ads": [
          { "id": "ad_7", "creative_id": "cr_video_a", "status": "active" },
          { "id": "ad_8", "creative_id": "cr_video_b", "status": "active" }
        ]
      },
      {
        "id": "grp_de_1",
        "label": "DE",
        "ads": [
          { "id": "ad_9", "creative_id": "cr_video_a", "status": "active" }
        ]
      }
    ]
  }
}
```

Labels `US` и `DE` здесь — произвольные названия execution scopes внутри одного account: label сам по себе не задаёт targeting и не означает, что регион обязан совпадать с границей account. Правила построения audiences относятся к следующей главе. `cr_video_a` используется двумя ads: content общий, но ads имеют разные parents, IDs, status и могут вести на разные destinations.

Иерархия также объясняет effective behavior. Если `ad_7` настроен как active, но parent campaign paused, показы не начнутся. Если campaign задаёт общую URL-настройку, ad может унаследовать её или переопределить там, где product это разрешает. Чтение дерева сверху вниз показывает общие constraints; чтение снизу вверх — полный набор настроек, реально действующих на конкретный ad.

## От business intent к правилам выбора показа

Дерево сообщает, где живут настройки. Причинная цепочка объясняет, зачем они нужны:

```text
business objective
  → optimization event / performance goal
  → eligible audience и placements
  → bid strategy
  → budget + schedule
  → delivery
  → tracking signals и переход в destination
```

Для subscription app эта цепочка может выглядеть так:

```text
рост числа paid subscriptions                    # business outcome
  → App promotion или Sales                       # campaign objective
  → install, затем paid subscription              # optimization event
  → geo/device/audience rules и exclusions        # targeting
  → feed, video или in-app inventory              # placements
  → maximize conversions с target/control         # bid strategy
```

Названия `App promotion`, `Sales` и доступные combinations product-specific и меняются со временем. Значение имеет не label, а переход от желаемого business outcome к наблюдаемому signal и правилам delivery.

### Objective и optimization event

**Campaign objective** — high-level business intent или setup guidance: awareness, traffic, leads, app promotion, sales. Platform может на его основе предложить campaign types, features и defaults. Objective не обязан быть событием, которое optimizer непосредственно предсказывает.

**Optimization event**[^g-optimization-target], или **performance goal**, — наблюдаемый result, вероятность или value которого delivery system старается увеличить. Это может быть impression[^g-impression], click[^g-click], landing-page view, install, purchase или conversion value. Конкретная **conversion action** задаёт, какое tracking event считается выбранным input для bidding и/или reporting; некоторые products группируют несколько actions в conversion goal и различают primary и secondary events.

Глубокое событие вроде paid subscription ближе к business value, но не автоматически лучше для optimization. Оно может быть редким, задержанным или ненадёжно передаваться из event source. Install возникает раньше и чаще, но является лишь proxy для подписки. Выбор требует достаточного signal volume и корректного measurement[^g-measurement]; алгоритмический trade-off рассматривается в главе 7.

| Слой configuration | Вопрос | Subscription-app пример |
|---|---|---|
| Business outcome | Что должен получить бизнес? | Больше новых paid subscriptions |
| Campaign objective | Какой общий intent сообщён platform? | `App promotion` или `Sales`, в зависимости от product |
| Optimization event | Какой signal влияет на delivery decisions? | Сначала `install`, позже `paid_subscription` |
| Tracked events | Какие события вообще наблюдаются? | Install, trial, purchase, renewal |
| Bid strategy[^g-bid-strategy] | Как policy переводит goal и constraints в bids? | Maximize conversions с заданным control |
| Billing basis | За какое qualifying event возникает charge? | Например CPC; basis известна из contract и не обязана совпадать с optimization |

Billing basis[^g-billable-event], как показано в предыдущей главе, задаётся отдельно. Поэтому label `subscription campaign` ничего не доказывает о billable event.

### Targeting и placement

**Targeting** определяет eligibility rules и inputs delivery model: какие opportunities[^g-ad-opportunity], users или contexts допустимы либо предпочтительны. На обзорном уровне это могут быть geo, device, context, audience/keyword criteria и exclusions. Источники audience data, identity и privacy рассматриваются в главе 6.

**Placement** отвечает на другой вопрос: в каком media environment и slot реклама может появиться. Примеры — feed, stories, search results, video pre-roll, in-app banner или rewarded slot. Placement связан с eligibility creative format, но сами formats, assets и compatibility подробно рассматриваются в главе 8.

| Ось | Главный вопрос | Пример ограничения |
|---|---|---|
| Targeting | Для каких opportunities/users/contexts возможен показ? | Geo `DE`, mobile devices, keyword category, audience exclusion |
| Placement | Где именно возможен показ? | Feed, search results, in-app rewarded slot |

API может хранить placements внутри объекта с названием `targeting`; это nesting конкретного product, а не доказательство, что audience и placement — одна концепция. Opportunity должна пройти ограничения обеих осей.

### Bid strategy

**Bid strategy** — policy, которая переводит optimization goal и ограничения в auction bids. Strategy может стремиться максимизировать conversions, value или другой result и учитывать target либо cap. Здесь важно разделять четыре сущности:

```text
bid strategy  = правило принятия решений
strategy target/cap = параметр или ограничение policy
actual bid    = решение для конкретной auction opportunity
price/charge  = результат auction и billing contract
```

Один числовой `target CPA` не является actual bid, а actual bid не определяет billable amount сам по себе. Как вычисляются bids, распределяется budget и работает pacing[^g-pacing], разбирается в главе 7.

Итак, objective не равен optimization event; placement не равен audience; strategy не равна bid amount. Эти различия позволяют прочитать campaign configuration без ложного предположения, что один UI label одновременно описывает business goal, delivery signal и деньги.

## Ресурсы и время: budget и schedule

Даже правильно выбранная decision policy действует только внутри resource и time constraints. **Budget** ограничивает доступный spend на заданной scope и time basis. Он не гарантирует inventory, conversions, равномерный расход или точный invoice amount.

Распространены две временные semantics:

- **Daily budget** задаёт дневную basis. Конкретный product определяет, является ли значение жёстким календарным cap, average daily target или иной формой ограничения.
- **Lifetime**, **campaign-total** или flight budget ограничивает spend за весь interval.

Scope также различается. Budget может принадлежать campaign, быть shared между campaigns или задаваться отдельным ad set. При campaign-level allocation система распределяет общий ресурс между children; при ad-set budgets у каждой группы собственный limit. Ни одна модель не универсальна.

| Setting | Возможная scope | Unit/basis | Что ограничивает | Чего не гарантирует |
|---|---|---|---|---|
| Daily budget | Campaign или ad set | Currency per day | Доступный spend на дневной basis | Одинаковый spend каждый час или день во всех products |
| Lifetime budget | Campaign или ad set | Currency per flight | Совокупный spend до end condition | Равномерное деление по дням |
| Shared budget | Несколько campaigns | Currency на общий pool | Общий ресурс группы | Фиксированную долю каждому child |
| Bid target/cap | Strategy scope | Currency per predicted/result unit | Decision policy или bid constraint | Total spend и число результатов |

В сквозном примере campaign получает **учебный** lifetime budget `€700` на семидневный flight и содержит два ad sets. Нельзя автоматически записать `€100/day`: доступные opportunities и allocation могут меняться, а pacing может распределять spend неравномерно. Нельзя также без product configuration заключить, что каждый ad set получит `€350`.

**Schedule**, или **flight**, задаёт временную eligibility:

- start и end;
- account time zone, в которой интерпретируются даты;
- при поддержке product — dayparting, то есть допустимые дни недели и часы.

```text
configured status = enabled
start = 2026-09-07 00:00 Europe/Berlin
end   = 2026-09-14 00:00 Europe/Berlin
```

До start campaign может быть enabled, но иметь effective status `pending` и не доставлять ads. После end она становится `ended/completed`, даже если часть `€700` не потрачена. Dayparting способен сделать campaign временно ineligible внутри активного flight. Budget, schedule и status работают совместно: разрешение оператора необходимо, но недостаточно для показа.

## Куда приходит user и откуда система получает сигналы

Campaign связывает два разных маршрута: user должен попасть в destination, а measurement systems — получить identifiers и events. Эти маршруты могут пересекаться, но не обязаны совпадать.

**Landing page**, **destination** или **final URL** — первая целевая поверхность после interaction: web page, App Store/Google Play listing либо deep link в app. Это часть user experience и product path, а не tracking record.

**Tracking settings**[^g-tracking-settings] — configuration observability. В неё могут входить:

- campaign, group и ad IDs;
- URL parameters, macros, tracking template и final URL suffix;
- pixel, app SDK, server-to-server integration или MMP[^g-mmp] как event source;
- выбранные conversion actions;
- attribution[^g-attribution] configuration boundary, например используемое platform rule/window.

Attribution mechanics, mobile privacy, postbacks и discrepancy analysis здесь не рассматриваются; важно увидеть, где campaign с ними соединяется.

```text
user path:
  ad click → final URL / store listing / deep link

measurement path:
  click ID + campaign/group/ad IDs → platform и/или MMP
  install → trial → paid_subscription events → reporting/optimization
```

Учебный URL может передать внутренние identifiers:

```text
https://example.com/app?campaign_id=cmp_subscriptions_42&ad_id=ad_7
```

Имена параметров не являются industry standard. Platform macros могут подставлять фактические IDs в момент click; destination или analytics затем сохраняет их для mapping. Tracking template управляет measurement path, но не является landing page.

Google Ads предоставляет product-specific пример разделения путей: при parallel tracking user направляется к final URL, а click measurement выполняется в фоне. Это иллюстрирует общий принцип, но не гарантирует такое поведение в любой platform, browser, app или MMP link.

Для subscription app ad с `creative_id=cr_video_a` обещает premium-функции и ведёт нового user в store listing. После install SDK или MMP регистрирует install; backend позднее может передать trial и paid subscription. Чтобы platform использовала subscription для optimization, недостаточно видеть это событие в analytics: нужная conversion action должна быть корректно mapped и выбрана в campaign configuration.

| Creative promise | Destination | Наблюдаемый event | Проверка согласованности |
|---|---|---|---|
| «Попробуйте premium 7 дней» | Store listing для новых users | Install, затем trial | Listing описывает тот же product и offer |
| «Продолжите настройку подписки» | Deep link для installed app | Subscription-start screen view | Deep link открывает ожидаемый state |
| «Сравните планы» | Web pricing page | Landing-page view, purchase | URL ведёт на нужную locale/currency version |

Эта semantic alignment влияет на понимание flow, но landing-page optimization и CRO относятся к другим темам.

MMP также не получает campaign hierarchy магически. Platform, tracking link и MMP должны согласовать mapping IDs и event names. Наличие `ad_id` без parent mapping не восстанавливает account/campaign/ad-set relationships автоматически. И наоборот, корректная hierarchy в platform не доказывает, что downstream event source передаёт нужные identifiers.

## Lifecycle без ложной линейности

Для первого знакомства lifecycle удобно запомнить как:

```text
draft → learning → active → paused → completed
```

Но это мнемоника, а не универсальная линейная state machine. Она смешивает состояние configuration, разрешение delivery, schedule и состояние optimizer. Реальный объект лучше описывать **вектором состояний**.

- **Draft**: configuration ещё не опубликована. В некоторых systems draft существует только в UI или client и ещё не является server-side campaign.
- **Learning**[^g-learning-phase]: delivery/bidding model собирает evidence после запуска или material change. Показы и spend в это время уже могут происходить.
- **Active/enabled**: оператор разрешил delivery. Фактические показы дополнительно зависят от parent, review, schedule, budget, errors и наличия eligible opportunities.
- **Paused**: оператор остановил delivery. Обычно это обратимый переход; resume не создаёт новую campaign.
- **Completed/ended**: наступила end condition, чаще всего schedule end. Object, reporting и history обычно сохраняются; это не synonym deleted.

```text
draft → publish → pending/review → eligible delivery
                                  ↘ learning → stable delivery
active/learning ↔ paused
active or paused → end condition → completed/ended
material edit → learning again
```

Стрелка `learning → active` вводит в заблуждение: learning может быть под-состоянием active delivery, а не предшествующим запретом показов.

| Ось | Кто или что её определяет | Возможные состояния | Пример одного момента |
|---|---|---|---|
| Configured status | Operator/API | Draft, enabled, paused, removed | Campaign `enabled` |
| Effective delivery status | Platform после всех constraints | Pending, eligible, not delivering, ended | Ad set `eligible` |
| Review/issues | Policy и technical checks | Pending review, approved, limited, rejected/error | Ad `approved` |
| Learning status | Optimization subsystem | Learning, stable, limited data | Strategy/ad set `learning` |

В Google-specific представлении campaign может иметь status `Eligible`, а bidding strategy одновременно — `Learning`. В Meta-specific представлении active ad set может находиться в learning phase. Labels и exact rules различаются, но переносимый вывод один: одна колонка `status` не описывает всё operational state.

### Изменение campaign и повторный learning

До изменения сквозной ad set оптимизируется по installs:

```text
configured: active
schedule:   eligible
review:     approved
optimizer:  stable on install event
```

Advertiser меняет optimization event на `paid_subscription` и обновляет creative под subscription offer. Исторические installs и реакции на старый message уже не полностью описывают новую configuration. Platform может вернуть optimizer в learning, продолжая active delivery:

```text
configured: active
schedule:   eligible
review:     approved или pending для нового creative
optimizer:  learning on paid_subscription event
```

Meta, например, относит изменения targeting, creative, optimization event, состава ads и bid strategy к возможным significant edits; влияние budget change зависит от product rules и масштаба. Этот список нельзя переносить на Google Ads, DSP[^g-dsp] или ad network[^g-ad-network], а thresholds и duration нельзя считать постоянными. Общая причинная связь лишь такова:

```text
material configuration change
  → прежнее evidence хуже описывает новые decisions
  → optimizer снова собирает evidence
```

Pause не обязан предшествовать completion. Campaign может завершиться по end date прямо из active delivery, а paused campaign способна оставаться paused до ручного resume или всё равно перейти в ended при наступлении end condition.

### Как читать любую campaign

1. Кто владеет ad account, кто имеет access и какие currency/time zone действуют?
2. На каком object level находится каждая настройка и кто её наследует?
3. Какой business objective заявлен и какой optimization event реально выбран?
4. Какие targeting rules и placements определяют eligibility?
5. Какая bid strategy выбрана и какие target/cap относятся к ней?
6. Где заданы budget и schedule, какова их scope и basis?
7. Какие IDs, URL settings и event sources образуют tracking path?
8. Куда попадает user после interaction?
9. Каковы configured, effective, review и learning states прямо сейчас?

### С чем это часто путают

- **Account не равен advertiser company.** Это product/access/billing boundary; manager account даёт доступ, а не добавляет delivery level.
- **Campaign не является только папкой.** Parent settings и limits меняют behavior children.
- **Ad group и ad set не являются одним universal schema.** Их роль middle layer похожа, но поля vendor-specific.
- **Ad не равен creative.** Creative содержит message/assets; ad связывает его с parent, destination, tracking и status.
- **Placement не равен audience.** Placement отвечает «где», targeting — «для каких opportunities/users/contexts».
- **Objective, optimization event, tracked conversion и billing basis не обязаны совпадать.** Это разные configuration и contract layers.
- **Bid strategy не равна actual bid.** Strategy — policy; bid — одно конкретное решение.
- **Budget не обещает spend или result.** Это resource constraint, а не forecast и не invoice.
- **Enabled не означает delivery прямо сейчас.** Parent status, schedule, review, budget, errors и eligibility могут остановить показы.
- **Learning не означает inactive.** Optimizer способен адаптироваться во время active delivery.
- **Pause не означает completed.** Pause обратим; completion обычно следует end condition.
- **Tracking URL не является landing page.** Measurement path и user path решают разные задачи.

### Что важно запомнить

1. Campaign hierarchy — модель scope и inheritance, а не единая межплатформенная schema.
2. Ad account задаёт administrative boundary; campaign переводит один intent/flight в общие delivery rules.
3. Ad group/ad set группирует ads с shared execution rules; точное расположение полей зависит от product.
4. Ad является delivery binding, creative — content; один creative может использоваться несколькими ads.
5. Objective описывает общий intent, optimization event — наблюдаемый signal для decisions.
6. Targeting ограничивает допустимые opportunities, placement — media environment и slot.
7. Bid strategy, strategy target, actual bid и billable price — разные объекты.
8. Budget и schedule ограничивают ресурс и время, но не гарантируют равномерный spend или результат.
9. Destination ведёт user; tracking settings связывают IDs и event sources с measurement/optimization.
10. Operational lifecycle нужно читать как несколько осей: configured, effective, review и learning status.

### Проверьте себя

1. Campaign имеет objective `App promotion`, оптимизируется по `paid_subscription`, отслеживает install, trial и subscription, а billing basis — CPC. Почему эти значения не противоречат друг другу?
2. Ad настроен как active, но не получает impressions. Какие parent, schedule, review, budget и eligibility states нужно проверить?
3. Почему изменение optimization event с install на subscription может вернуть optimizer в learning, не меняя configured status `active`?
4. Какие settings вы ожидали бы разделить между двумя ads и какие — хранить отдельно, если они используют один creative, но ведут в разные regions и destinations?

# Sources and Further Reading

1. [Google Ads Help — Account, campaign, and ad group performance](https://support.google.com/google-ads/answer/2404036?hl=en) и [Google Ads API — Campaigns overview](https://developers.google.com/google-ads/api/docs/campaigns/overview) — Google-specific hierarchy и campaign resources; расположение полей зависит от campaign type и API version.
2. [Meta Marketing API — Basic Ad Creation](https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/) — отдельные campaign, ad set, creative и ad в Meta Graph API; это vendor schema, а не отраслевой standard.
3. [Google Ads Help — About campaign objectives](https://support.google.com/google-ads/answer/7450050?hl=en) и [About conversion goals](https://support.google.com/google-ads/answer/10995103?hl=en) — distinction между high-level objective, conversion goals/actions и их использованием в bidding.
4. [Meta Business Help Center — About performance goals](https://www.facebook.com/business/help/355670007911605) — product-specific связь objective, performance goal и необходимых signals.
5. [Google Ads Help — About tracking in Google Ads](https://support.google.com/google-ads/answer/6076199?hl=en) — tracking-template inheritance, final URL settings и parallel tracking как Google-specific implementation.
6. [Google Ads Help — About campaign statuses](https://support.google.com/google-ads/answer/1722131?hl=en) и [Google Ads API — Bidding Strategy Status](https://developers.google.com/google-ads/api/docs/campaigns/bidding/strategy-status) — separate operational и learning statuses в Google Ads.
7. [Meta Business Help Center — About the learning phase](https://www.facebook.com/business/help/112167992830700), [Significant edits and learning phase](https://www.facebook.com/business/help/316478108955072) и [Meta Marketing API — Budgets](https://developers.facebook.com/docs/marketing-api/bidding/overview/budgets/) — Meta-specific learning, significant edits, daily/lifetime budgets и scheduling behavior.
