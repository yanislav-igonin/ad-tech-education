---
id: ch-05
type: chapter
part: II
chapter: 5
slug: campaign-structure
title: "How an Ad Campaign Is Structured"
language: en
status: draft
toc_requirements: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13", "5.14"]
prerequisites: [ch-01, ch-02, ch-03, ch-04]
---

# How an Ad Campaign Is Structured

An ad campaign[^g-campaign] is not a single banner or a line in a report. It is a **control-plane configuration** that translates the business intent of an advertiser[^g-advertiser] into delivery rules: what the system must optimize for, which ad opportunities are allowed, where the ad may appear, how much and when it may spend, which content to show, where to bring the user, and which signals to use for measurement.

Most platforms have a similar object tree:

```text
advertiser account
└── campaign
    └── ad group / ad set
        └── ad
            ├── creative
            └── destination
```

But this is not a single industry-wide schema. Vendors and campaign types place budget[^g-budget], targeting[^g-targeting], optimization and schedule[^g-schedule] differently. A portable mental model is built not around the names of screens but around two questions: **which object owns the setting** and **which child objects receive its effect**.

## Why a campaign needs a hierarchy: the account as the root of control

A single advertiser runs different products, countries, billing scopes, and teams at the same time. A flat list of ads[^g-ad] would make it impossible to safely define who has access, which currency counts spend[^g-media-spend], which time zone governs the schedule, and which data sources are available to objects. That is why a platform starts with an **advertiser account**[^g-ad-account], or **ad account** — a tenant within which campaigns and their related settings exist.

An account usually forms several boundaries at once:

- **Ownership and access.** It defines the owner of resources and the roles and permissions of operators.
- **Billing identity.** A payer, billing profile, or another contractual entity is associated with it. The exact set of fields depends on the product.
- **Currency and time zone.** These values affect reporting, budget periods, and the schedule; in some products they are hard or impossible to change after creation.
- **Namespace.** Campaign and ad resource IDs are unique at least within the platform/account context. The scope and semantics of event identifiers depend on the event source and its deduplication contract and are not required to follow this rule.
- **Shared configuration.** Data sources, conversion actions[^g-conversion], brand assets, URL settings, and defaults may be shared across several campaigns.

The advertiser's legal company and the ad account are not the same thing. One company may have separate accounts for regions, brands, currencies, or billing entities. Conversely, one account may serve several initiatives of a single legal entity.

A **manager account**[^g-manager-account] is an administrative layer that gives an agency[^g-agency] or an internal team centralized access to several ad accounts. Access to an individual account can also be granted without such a layer. In either case it is administrative access, not an additional delivery layer inside the campaign.

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

| Object | What it represents | What you cannot conclude from it |
|---|---|---|
| Legal advertiser | A company or other legal party | That it has exactly one ad account |
| Ad account | Product, access, and billing boundary | That only one team or agency can manage it |
| Manager account | Delegated access to several accounts | That it participates in the delivery hierarchy of every campaign |

Account-level settings are often inherited downward until a more specific object sets an override. But inheritance is a product-specific contract: the same field name does not guarantee the same precedence order. When reading a configuration, you need to record not only the value but also its source: `account default`, `campaign value`, or `ad-level override`.

For the running example, take an EU account of a subscription app. The agency has been granted access, but the owner and billing identity remain with the advertiser. The account uses EUR and the `Europe/Berlin` time zone; this zone will be the baseline for the campaign schedule. The business goal is to acquire new paid subscriptions, but the campaign itself still has to turn that goal into executable settings.

## The execution tree: campaign, ad group/ad set, ad, and creative

A **campaign** is the top-level delivery container for a single business intent or a coherent flight. It consolidates settings that must apply across several child groups and ads: the objective[^g-campaign-objective], shared limits, the channel/type, and other product-specific controls. A campaign is not just a folder for reporting: pausing it, rescheduling it, or constraining it can stop or change the delivery of all its descendants.

An **ad group**[^g-ad-set] or **ad set** is an intermediate scope boundary for a group of ads. Both entities answer the question "which ads share execution rules?", but neither has a universally identical schema:

- in the Google-like model, an ad group usually bundles closely related ads and triggering criteria, such as related keywords;
- in the Meta-like model, an ad set usually holds the audience, placements[^g-placement], optimization, bid, budget, and schedule.

So statements like "targeting always lives in the ad group" or "budget is always set at the campaign" are wrong without naming the platform and campaign type.

An **ad** is the executable delivery unit. It binds the parent group, advertiser identity, creative[^g-creative], destination[^g-destination], tracking, and status. The **creative** carries the message and the assets — text, image, video, audio, CTA, and metadata. A creative may be an inline part of the ad or a separate reusable object. Even if the UI shows them as one card, logically these are different responsibilities:

```text
creative: what the user will see
ad:       where and under which parent rules this creative runs,
          where it leads, and what state it is in
```

| Level | Portable function | Google-like example | Meta-like example |
|---|---|---|---|
| Campaign | Shared intent and delivery scope | Campaign settings, channel/type, and budget link | Objective and, for the chosen model, a campaign-level budget |
| Middle layer | A group of ads with shared execution rules | Ad group: related ads and keywords/criteria | Ad set: audience, placements, optimization, bid, budget/schedule |
| Ad | Delivery unit | Ad inside an ad group | Ad with a parent `adset_id` and creative reference |
| Creative | Content and assets | Assets/ad content | A separate `creative_id` can be reused |

Below is an illustrative tree, not the payload of a real API:

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

The labels `US` and `DE` here are arbitrary names of execution scopes within one account: a label by itself does not set targeting and does not mean the region has to match the account boundary. The rules for building audiences belong to the next chapter. `cr_video_a` is used by two ads: the content is shared, but the ads have different parents, IDs, statuses, and may lead to different destinations.

The hierarchy also explains effective behavior. If `ad_7` is set to active but the parent campaign is paused, impressions will not start. If the campaign defines a shared URL setting, the ad may inherit it or override it where the product allows. Reading the tree top-down shows the shared constraints; reading it bottom-up shows the full set of settings actually in effect for a specific ad.

## From business intent to delivery selection rules

The tree tells you where settings live. The causal chain explains why they are needed:

```text
business objective
  → optimization event / performance goal
  → eligible audience and placements
  → bid strategy
  → budget + schedule
  → delivery
  → tracking signals and the transition to the destination
```

For the subscription app, this chain may look like this:

```text
growth in paid subscriptions                    # business outcome
  → App promotion or Sales                       # campaign objective
  → install, then paid subscription              # optimization event
  → geo/device/audience rules and exclusions     # targeting
  → feed, video, or in-app inventory             # placements
  → maximize conversions with a target/control   # bid strategy
```

The names `App promotion` and `Sales` and the available combinations are product-specific and change over time. What matters is not the label but the transition from the desired business outcome to an observable signal and to delivery rules.

### Objective and optimization event

The **campaign objective** is the high-level business intent or setup guidance: awareness, traffic, leads, app promotion, sales. Based on it, the platform may suggest campaign types, features, and defaults. The objective does not have to be the event that the optimizer directly predicts.

The **optimization event**[^g-optimization-target], or **performance goal**, is the observable result, probability, or value that the delivery system tries to increase. It may be an impression[^g-impression], a click[^g-click], a landing-page view, an install, a purchase, or conversion value. A specific **conversion action** defines which tracking event counts as the selected input for bidding and/or reporting; some products group several actions into a conversion goal and distinguish primary and secondary events.

A deep event such as a paid subscription is closer to business value but not automatically better for optimization. It may be rare, delayed, or unreliably transmitted from the event source. An install occurs earlier and more often but is only a proxy for the subscription. The choice requires sufficient signal volume and correct measurement[^g-measurement]; the algorithmic trade-off is discussed in chapter 7.

| Configuration layer | Question | Subscription-app example |
|---|---|---|
| Business outcome | What should the business get? | More new paid subscriptions |
| Campaign objective | What overall intent is communicated to the platform? | `App promotion` or `Sales`, depending on the product |
| Optimization event | Which signal drives delivery decisions? | `install` first, `paid_subscription` later |
| Tracked events | Which events are observed at all? | Install, trial, purchase, renewal |
| Bid strategy[^g-bid-strategy] | How does the policy translate the goal and constraints into bids? | Maximize conversions with a given control |
| Billing basis | Which qualifying event triggers a charge? | For example CPC; the basis is known from the contract and need not match the optimization |

The billing basis[^g-billable-event], as shown in the previous chapter, is set separately. So the label `subscription campaign` proves nothing about the billable event.

### Targeting and placement

**Targeting** defines the eligibility rules and inputs of the delivery model: which opportunities[^g-ad-opportunity], users, or contexts are allowed or preferred. At an overview level these may be geo, device, context, audience/keyword criteria, and exclusions. The sources of audience data, identity, and privacy are discussed in chapter 6.

**Placement** answers a different question: in which media environment and slot the ad may appear. Examples are feed, stories, search results, video pre-roll, an in-app banner, or a rewarded slot. Placement is tied to creative format eligibility, but the formats, assets, and compatibility themselves are covered in detail in chapter 8.

| Axis | Main question | Example constraint |
|---|---|---|
| Targeting | For which opportunities/users/contexts is delivery possible? | Geo `DE`, mobile devices, keyword category, audience exclusion |
| Placement | Where exactly is delivery possible? | Feed, search results, in-app rewarded slot |

An API may store placements inside an object named `targeting`; that is the nesting of a specific product, not proof that audience and placement are one concept. An opportunity must pass the constraints of both axes.

### Bid strategy

A **bid strategy** is the policy that translates the optimization goal and constraints into auction bids. The strategy may seek to maximize conversions, value, or another result, and it may take a target or a cap into account. Here it is important to separate four entities:

```text
bid strategy  = the decision-making rule
strategy target/cap = a parameter or constraint of the policy
actual bid    = the decision for a specific auction opportunity
price/charge  = the outcome of the auction and the billing contract
```

A numeric `target CPA` is not an actual bid, and an actual bid does not by itself determine the billable amount. How bids are computed, how budget is distributed, and how pacing[^g-pacing] works is covered in chapter 7.

So the objective is not the optimization event; the placement is not the audience; the strategy is not the bid amount. These distinctions let you read a campaign configuration without the false assumption that one UI label simultaneously describes the business goal, the delivery signal, and the money.

## Resources and time: budget and schedule

Even a correctly chosen decision policy acts only within resource and time constraints. The **budget** caps the available spend on a given scope and time basis. It guarantees neither inventory, nor conversions, nor an even rate of spend, nor an exact invoice amount.

Two temporal semantics are common:

- A **daily budget** sets a daily basis. The specific product determines whether the value is a hard calendar cap, an average daily target, or another form of constraint.
- A **lifetime**, **campaign-total**, or flight budget caps the spend over the whole interval.

Scope also varies. A budget may belong to a campaign, be shared between campaigns, or be set on an individual ad set. With campaign-level allocation the system distributes the shared resource among children; with ad-set budgets each group has its own limit. Neither model is universal.

| Setting | Possible scope | Unit/basis | What it limits | What it does not guarantee |
|---|---|---|---|---|
| Daily budget | Campaign or ad set | Currency per day | Available spend on a daily basis | The same spend every hour or day across all products |
| Lifetime budget | Campaign or ad set | Currency per flight | Cumulative spend until the end condition | Even distribution across days |
| Shared budget | Several campaigns | Currency on a shared pool | The shared resource of the group | A fixed share for each child |
| Bid target/cap | Strategy scope | Currency per predicted/result unit | The decision policy or a bid constraint | Total spend and the number of results |

In the running example the campaign gets an **illustrative** lifetime budget of `€700` for a seven-day flight and contains two ad sets. You cannot automatically write down `€100/day`: the available opportunities and allocation may change, and pacing may distribute spend unevenly. Nor can you conclude, without the product configuration, that each ad set will get `€350`.

The **schedule**, or **flight**, defines temporal eligibility:

- start and end;
- the account time zone in which the dates are interpreted;
- where the product supports it — dayparting, that is, the allowed weekdays and hours.

```text
configured status = enabled
start = 2026-09-07 00:00 Europe/Berlin
end   = 2026-09-14 00:00 Europe/Berlin
```

Before the start, the campaign may be enabled but have the effective status `pending` and not deliver ads. After the end it becomes `ended/completed`, even if part of the `€700` was not spent. Dayparting can make the campaign temporarily ineligible inside an active flight. Budget, schedule, and status work together: the operator's permission is necessary but not sufficient for showing ads.

## Where the user lands and where the system gets its signals

A campaign ties together two different routes: the user must reach the destination, and the measurement systems must receive identifiers and events. These routes may intersect but need not coincide.

The **landing page**, **destination**, or **final URL** is the first target surface after the interaction: a web page, an App Store/Google Play listing, or a deep link into an app. It is part of the user experience and the product path, not a tracking record.

**Tracking settings**[^g-tracking-settings] are the configuration of observability. They may include:

- campaign, group, and ad IDs;
- URL parameters, macros, tracking templates, and the final URL suffix;
- a pixel, app SDK, server-to-server integration, or MMP[^g-mmp] as the event source;
- the selected conversion actions;
- the attribution[^g-attribution] configuration boundary, for example the platform rule/window in use.

Attribution mechanics, mobile privacy, postbacks, and discrepancy analysis are not covered here; what matters is seeing where the campaign connects to them.

```text
user path:
  ad click → final URL / store listing / deep link

measurement path:
  click ID + campaign/group/ad IDs → platform and/or MMP
  install → trial → paid_subscription events → reporting/optimization
```

An illustrative URL may pass internal identifiers:

```text
https://example.com/app?campaign_id=cmp_subscriptions_42&ad_id=ad_7
```

The parameter names are not an industry standard. Platform macros can substitute the actual IDs at click time; the destination or analytics then stores them for mapping. A tracking template governs the measurement path but is not a landing page.

Google Ads provides a product-specific example of separating the paths: with parallel tracking, the user is directed to the final URL while click measurement happens in the background. This illustrates a general principle but does not guarantee such behavior in every platform, browser, app, or MMP link.

For the subscription app, the ad with `creative_id=cr_video_a` promises premium features and leads a new user to the store listing. After the install, the SDK or MMP registers the install; the backend may later pass the trial and the paid subscription. For the platform to use the subscription for optimization, it is not enough to see this event in analytics: the right conversion action must be correctly mapped and selected in the campaign configuration.

| Creative promise | Destination | Observable event | Consistency check |
|---|---|---|---|
| "Try premium for 7 days" | Store listing for new users | Install, then trial | The listing describes the same product and offer |
| "Continue setting up your subscription" | Deep link for the installed app | Subscription-start screen view | The deep link opens the expected state |
| "Compare plans" | Web pricing page | Landing-page view, purchase | The URL leads to the right locale/currency version |

This semantic alignment affects the understanding of the flow, but landing-page optimization and CRO belong to other topics.

An MMP also does not receive the campaign hierarchy magically. The platform, the tracking link, and the MMP must agree on the mapping of IDs and event names. Having an `ad_id` without parent mapping does not automatically restore account/campaign/ad-set relationships. Conversely, a correct hierarchy in the platform does not prove that the downstream event source passes the required identifiers.

## Lifecycle without false linearity

For a first acquaintance, it is convenient to memorize the lifecycle as:

```text
draft → learning → active → paused → completed
```

But this is a mnemonic, not a universal linear state machine. It mixes the state of the configuration, the permission to deliver, the schedule, and the state of the optimizer. The real object is better described as a **vector of states**.

- **Draft**: the configuration has not been published yet. In some systems the draft exists only in the UI or the client and is not yet a server-side campaign.
- **Learning**[^g-learning-phase]: the delivery/bidding model gathers evidence after launch or a material change. Impressions and spend may already be happening during this time.
- **Active/enabled**: the operator has permitted delivery. Actual impressions additionally depend on the parent, review, schedule, budget, errors, and the availability of eligible opportunities.
- **Paused**: the operator has stopped delivery. This is usually a reversible transition; resuming does not create a new campaign.
- **Completed/ended**: the end condition has occurred, most often the schedule end. The object, reporting, and history are usually preserved; this is not a synonym for deleted.

```text
draft → publish → pending/review → eligible delivery
                                  ↘ learning → stable delivery
active/learning ↔ paused
active or paused → end condition → completed/ended
material edit → learning again
```

The arrow `learning → active` is misleading: learning can be a sub-state of active delivery rather than a stage preceding the permission to show.

| Axis | Who or what defines it | Possible states | Example of one moment |
|---|---|---|---|
| Configured status | Operator/API | Draft, enabled, paused, removed | Campaign `enabled` |
| Effective delivery status | Platform after all constraints | Pending, eligible, not delivering, ended | Ad set `eligible` |
| Review/issues | Policy and technical checks | Pending review, approved, limited, rejected/error | Ad `approved` |
| Learning status | Optimization subsystem | Learning, stable, limited data | Strategy/ad set `learning` |

In the Google-specific view, a campaign may have the status `Eligible` while the bidding strategy is simultaneously `Learning`. In the Meta-specific view, an active ad set may be in the learning phase. The labels and exact rules differ, but the portable conclusion is the same: a single `status` column does not describe the whole operational state.

### Changing the campaign and re-learning

Before the change, the running ad set is optimized on installs:

```text
configured: active
schedule:   eligible
review:     approved
optimizer:  stable on install event
```

The advertiser changes the optimization event to `paid_subscription` and updates the creative for the subscription offer. Historical installs and reactions to the old message no longer fully describe the new configuration. The platform may return the optimizer to learning while continuing active delivery:

```text
configured: active
schedule:   eligible
review:     approved or pending for the new creative
optimizer:  learning on paid_subscription event
```

Meta, for example, counts changes to targeting, creative, optimization event, the composition of ads, and the bid strategy among possible significant edits; the effect of a budget change depends on the product rules and magnitude. This list cannot be transferred to Google Ads, a DSP[^g-dsp], or an ad network[^g-ad-network], and the thresholds and duration must not be assumed constant. The general causal link is only this:

```text
material configuration change
  → prior evidence describes the new decisions less well
  → the optimizer gathers evidence again
```

Pause does not have to precede completion. A campaign can end on the end date straight from active delivery, and a paused campaign can remain paused until a manual resume or still transition to ended when the end condition occurs.

### How to read any campaign

1. Who owns the ad account, who has access, and which currency/time zone are in effect?
2. At which object level does each setting live, and who inherits it?
3. Which business objective is declared, and which optimization event is actually selected?
4. Which targeting rules and placements define eligibility?
5. Which bid strategy is selected, and which target/cap applies to it?
6. Where are the budget and schedule set, and what are their scope and basis?
7. Which IDs, URL settings, and event sources form the tracking path?
8. Where does the user land after the interaction?
9. What are the configured, effective, review, and learning states right now?

### What this is often confused with

- **An account is not the advertiser company.** It is a product/access/billing boundary; a manager account grants access, it does not add a delivery level.
- **A campaign is not just a folder.** Parent settings and limits change the behavior of children.
- **Ad group and ad set are not one universal schema.** Their role as the middle layer is similar, but the fields are vendor-specific.
- **An ad is not a creative.** The creative contains the message/assets; the ad binds it to a parent, destination, tracking, and status.
- **A placement is not an audience.** Placement answers "where", targeting answers "for which opportunities/users/contexts".
- **Objective, optimization event, tracked conversion, and billing basis need not coincide.** They are different configuration and contract layers.
- **A bid strategy is not an actual bid.** The strategy is the policy; a bid is one concrete decision.
- **A budget does not promise spend or results.** It is a resource constraint, not a forecast and not an invoice.
- **Enabled does not mean delivering right now.** Parent status, schedule, review, budget, errors, and eligibility can stop delivery.
- **Learning does not mean inactive.** The optimizer can adapt during active delivery.
- **Pause does not mean completed.** Pause is reversible; completion usually follows the end condition.
- **A tracking URL is not a landing page.** The measurement path and the user path solve different problems.

### Key takeaways

1. Campaign hierarchy is a model of scope and inheritance, not a single cross-platform schema.
2. The ad account sets the administrative boundary; the campaign translates one intent/flight into shared delivery rules.
3. An ad group/ad set groups ads with shared execution rules; the exact placement of fields depends on the product.
4. The ad is the delivery binding, the creative is the content; one creative can be used by several ads.
5. The objective describes the overall intent, the optimization event the observable signal for decisions.
6. Targeting limits the allowed opportunities; placement limits the media environment and slot.
7. Bid strategy, strategy target, actual bid, and billable price are different objects.
8. Budget and schedule constrain resources and time but guarantee neither even spend nor results.
9. The destination leads the user; tracking settings tie IDs and event sources to measurement/optimization.
10. The operational lifecycle must be read as several axes: configured, effective, review, and learning status.

### Test yourself

1. A campaign has the objective `App promotion`, is optimized on `paid_subscription`, tracks install, trial, and subscription, and its billing basis is CPC. Why do these values not contradict one another?
2. An ad is set to active but receives no impressions. Which parent, schedule, review, budget, and eligibility states should you check?
3. Why can changing the optimization event from install to subscription return the optimizer to learning without changing the configured status `active`?
4. Which settings would you expect to share between two ads and which to keep separate, if they use one creative but lead to different regions and destinations?

# Sources and Further Reading

1. [Google Ads Help — Account, campaign, and ad group performance](https://support.google.com/google-ads/answer/2404036?hl=en) and [Google Ads API — Campaigns overview](https://developers.google.com/google-ads/api/docs/campaigns/overview) — the Google-specific hierarchy and campaign resources; the placement of fields depends on the campaign type and API version.
2. [Meta Marketing API — Basic Ad Creation](https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/) — separate campaign, ad set, creative, and ad in the Meta Graph API; this is a vendor schema, not an industry standard.
3. [Google Ads Help — About campaign objectives](https://support.google.com/google-ads/answer/7450050?hl=en) and [About conversion goals](https://support.google.com/google-ads/answer/10995103?hl=en) — the distinction between the high-level objective, conversion goals/actions, and their use in bidding.
4. [Meta Business Help Center — About performance goals](https://www.facebook.com/business/help/355670007911605) — the product-specific link between objective, performance goal, and the required signals.
5. [Google Ads Help — About tracking in Google Ads](https://support.google.com/google-ads/answer/6076199?hl=en) — tracking-template inheritance, final URL settings, and parallel tracking as a Google-specific implementation.
6. [Google Ads Help — About campaign statuses](https://support.google.com/google-ads/answer/1722131?hl=en) and [Google Ads API — Bidding Strategy Status](https://developers.google.com/google-ads/api/docs/campaigns/bidding/strategy-status) — separate operational and learning statuses in Google Ads.
7. [Meta Business Help Center — About the learning phase](https://www.facebook.com/business/help/112167992830700), [Significant edits and learning phase](https://www.facebook.com/business/help/316478108955072) and [Meta Marketing API — Budgets](https://developers.facebook.com/docs/marketing-api/bidding/overview/budgets/) — Meta-specific learning, significant edits, daily/lifetime budgets, and scheduling behavior.
