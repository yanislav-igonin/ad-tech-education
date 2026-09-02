---
id: ch-01
type: chapter
part: I
chapter: 1
slug: what-is-adtech
title: "What AdTech Is and Why It Exists"
language: en
status: draft
toc_requirements: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "1.10"]
prerequisites: []
---

# What AdTech Is and Why It Exists

## The Essence

**Digital advertising**[^g-digital-advertising] is paid communication by which an organization tries to influence the knowledge, attitude, or behavior of an audience in a digital environment. A company with a subscription app wants to find potential customers; the owner of another app wants to earn money from its audience; the user wants to receive content or a service and, at the same time, encounters advertising.

**AdTech**[^g-adtech] is the technology that coordinates this exchange: it helps buy and sell advertising opportunities, select a suitable ad, deliver `creative`[^g-creative], measure events, build reporting, and carry out settlements.

The key mental model:

```text
advertiser brings demand: budget and the intent to buy access to an audience
publisher brings supply: advertising opportunities in their media environment
AdTech coordinates selection, delivery, data, and settlements between the parties
user gets the product experience and encounters advertising
```

This is not one mandatory technical pipeline. A deal can be direct, pass through several platforms, or happen entirely inside a closed ecosystem. A single provider may combine several roles, and some specialized systems connect only for measurement[^g-measurement] or quality control.

## Advertising as a Market of Coordination

The market has three basic participants.

- **Advertiser**[^g-advertiser] funds advertising for the sake of a business result (`business outcome`): for example, an app install, a subscription purchase, or growing awareness. It buys not a person, but the opportunity to address an audience in a specific context.
- **Publisher**[^g-publisher] owns or operates the environment where an advertising opportunity arises: a website, a mobile app, a video service, a game. Advertising makes it possible to monetize that environment.
- **User** uses a website, an app, or another media product. Their attention makes advertising meaningful, but the user is not `inventory`[^g-inventory], usually does not sell advertising, and does not pay for media.

Using two mobile apps as an example:

| Participant | What it contributes | What it wants to get | Main constraint |
|---|---|---|---|
| An app with a paid subscription — advertiser | Budget, goal, `creative` | Attract users who will take out a subscription | Not spending budget on unsuitable opportunities |
| A content or gaming app — publisher | Media environment and advertising opportunities | Earn revenue without ruining the user experience | Balancing monetization, quality, and ad load |
| A person — user | Attention, context of use, and a possible reaction | Content or app functionality on acceptable terms | Relevance, privacy, safety, and not being overloaded with ads |

The value exchange is not symmetric. The advertiser pays for media access; the publisher receives advertising revenue; the user gets the product and the advertising experience, but at the same time bears a cost in the form of time, attention, and possible use of their data. That is why effectiveness for the advertiser, revenue for the publisher, and quality of experience for the user can conflict. A significant part of AdTech exists precisely to manage these conflicting goals at scale.

## Supply, Demand, and Advertising Inventory

**Demand**[^g-demand] is the budgets and intent of advertisers to buy suitable advertising opportunities. Around it sits the `buy side` or `demand side`: people and systems that help plan and buy media.

**Supply**[^g-supply] is the advertising opportunities available from publishers. Around it sits the `sell side` or `supply side`: people and systems that help describe, sell, and deliver advertising.

These words denote sides of the market, not specific technologies. A DSP (Demand-Side Platform)[^g-dsp] belongs to the demand side not because it "creates demand," but because it acts in the buyer's interest. An SSP (Supply-Side Platform)[^g-ssp] belongs to the supply side because it helps publishers manage the sale of opportunities.

The subject of the deal is **advertising inventory**: the set of available or projected opportunities to show an ad. Inventory is bounded by the environment, the placement, the format, the timing, the publisher's rules, and the acceptable audience context. It is not a list of users, and it does not mean that future impressions already exist in a warehouse.

It is useful to distinguish three levels:

1. **Placement**[^g-placement] or `ad slot` — a pre-defined location or rule for when advertising appears: for example, a full-screen block after a level is completed in a game.
2. **Ad opportunity**[^g-ad-opportunity] — a concrete opportunity to select and show an ad that arises when the user reaches that location.
3. **Impression**[^g-impression] — a delivery or display event of the selected ad, registered by a system according to a specific rule.

```text
placement exists in the app's design
    ↓ user completed a level
an ad opportunity arises
    ↓ the system selected a creative
the ad is delivered and displayed; an impression is registered
```

Even that last statement requires care. `Served`, `rendered`, and `viewable impression` are different states: sending an ad does not prove that it rendered and actually entered the person's field of view. Precise definitions and metrics will appear in chapter 3.

## From a Market Problem to Technology

Without technology, an advertiser would have to negotiate separately with every publisher, manually transfer materials, agree on formats, and reconcile incompatible reports. A publisher would have to find buyers for a huge number of short-lived opportunities. In a digital environment, a single opportunity can appear and disappear faster than a human can make a decision.

AdTech appears where the market requires repeatable technical execution:

| Market problem | Required function | Typical solution categories |
|---|---|---|
| Many advertisers and publishers | `Aggregation`: pool demand or supply | DSP, ad network[^g-ad-network], SSP |
| Each opportunity needs a suitable buyer and creative | `Matching` and decisioning | DSP, ad network, ad server[^g-ad-server], publisher stack |
| There is often little time left to make a decision | Automated execution | Buying/selling platforms, exchange[^g-ad-exchange] |
| The creative must reach the right environment and format | `Ad serving` and interoperability | Ad server, SDK, platform integrations |
| Parties see events from different vantage points | Measurement and reporting | Ad server, measurement providers; in mobile — MMP (Mobile Measurement Partner)[^g-mmp] |
| A delivery may be unsuitable or low-quality | Verification[^g-verification] and risk controls | Verification provider, fraud/quality systems |
| Participants need to reconcile volumes and payments | Reconciliation and settlements | Reporting, billing, and finance systems |

An MMP is a specialized category of providers for mobile measurement and attribution, not a synonym for any measurement system.

Standards and shared protocols reduce the number of pairwise integrations: it becomes easier for the parties to describe inventory consistently, pass decisions along, and understand the chain of sellers. One example is RTB (real-time bidding)[^g-rtb], where an individual opportunity can be auctioned in real time. But `RTB` is only one mechanism inside `programmatic`[^g-programmatic], i.e. automated buying and selling; and `programmatic` is only part of AdTech. Direct deals, reserved buying, and closed platform ecosystems also use AdTech.

### Why Intermediaries Exist

**Intermediary**[^g-intermediary] is a participant that connects the sides of the market or performs a specialized function. Intermediaries arise not from a need to add more companies to the chain, but from the division of labor:

- an agency[^g-agency] manages media buying on behalf of the advertiser;
- a demand-side provider aggregates access to supply and performs selection for the advertiser;
- a sell-side provider aggregates buyers and helps the publisher sell inventory;
- a connective layer passes opportunities and decisions between the parties;
- an ad server manages the selection and delivery of creative;
- measurement and verification providers provide an independent point of observation;
- data/identity providers[^g-data-provider] help systems interpret permitted signals and connect data.

An intermediary is justified when the value from reach, aggregation, interoperability, speed, measurement, or risk control exceeds its cost and complexity. But not every intermediary is needed in every deal. A publisher can sell part of its inventory directly to an agreed advertiser and make another part available to many buyers through platforms. The short path is not always better functionally, and the long one is not always more effective. What needs to be evaluated is the function performed, its cost, its transparency, and its conflicts of interest.

## A Map of the Advertising Ecosystem

The following diagram shows logical roles and possible paths, not a universal order of HTTP calls:

```text
BUYING SIDE                    CONNECTIVE LAYER              PUBLISHER SIDE

Advertiser
   ├─ [Agency], [Advertiser ad server] — can support any buying path
   ├─ [Direct buying] ───────────────────────────────────────────────┐
   ├─ [Ad network] ─────────────────────────────────────────────────┤
   └─ [DSP] ⇄ [Ad exchange / connective layer] ⇄ [SSP] ─────────────┤
                                                                    ├→ [Publisher ad server] → Publisher → User
                                                                    └→ Publisher → User (path without a publisher ad server)

Cross-cutting functions connected to several participants:
[Measurement providers, including the mobile MMP category]
[Verification]   [Data / identity providers]
```

The branches show possible paths that can be combined; the square brackets denote logical roles, not necessarily separate companies. In reality:

- one company may combine DSP, ad network, exchange, SSP, or ad server;
- an SSP and a publisher ad server may participate in the same flow: the SSP provides access to programmatic demand, while the publisher ad server matches that and other sources and manages delivery; paths also exist without one of these links;
- direct buying can bypass part of the connective layer;
- a closed platform can hide several roles behind a single API and a single commercial contract;
- measurement, verification, and identity usually work across the chain, not "between" two mandatory neighbors.

For now, the categories on the map are only needed as navigation:

| Category | Where it sits | One core function |
|---|---|---|
| **Agency** | Advertiser side (`buy side`) | Plans and executes media buying for the advertiser |
| **DSP** | Advertiser side (`buy side`) | Automates buying opportunities from several supply sources |
| **Ad network** | Between buyers and publishers | Aggregates and packages supply/demand as a manageable offering |
| **Ad exchange** | Connective layer | Connects buyers and sellers for an automated deal |
| **SSP** | Publisher side (`sell side`) | Helps the publisher manage buyer access to inventory |
| **Ad server** | Advertiser or publisher side | Selects, delivers, and registers advertising according to defined rules |
| **Measurement provider**; a specialized mobile category — **MMP** | Across the chain | Measures advertising events and outcomes; an MMP specializes in mobile acquisition and attribution |
| **Verification provider** | Across the chain | Independently evaluates the quality and conditions of delivery |
| **Data / identity provider** | Across the chain | Supplies or connects permitted data signals for activation and measurement |

Full definitions, varieties, and combinations of these roles are the topic of chapter 2.

## The Three Flows of a Single Advertising Deal

The main mistake when reading the ecosystem map is to imagine that creative, data, and money move along a single arrow. Let's look at one ad for a subscription app inside a publisher's content app.

### 1. The Display and Delivery Flow

```text
user opens a screen in the publisher app
    → the publisher creates an ad opportunity
    → available systems select an ad
    → the selected creative, or an instruction to load it, is returned to the app
    → the app loads and renders the creative
    → when specific conditions are met, the delivery may be counted as viewable;
      the render itself does not prove that
    → the user may notice the ad and interact with it
```

The flow starts on the publisher's side, because that is where the opportunity arises. The decision may come from a direct campaign, an ad network, a DSP/SSP path, or a closed platform. The creative, meanwhile, may be delivered not by the same service that made the commercial decision: an ad server or a CDN often participates in delivery separately.

### 2. The Data Flow

```text
advertiser side:
goal + campaign rules + creative metadata
                         ↓
publisher context → selection systems → selected ad + delivery metadata
                         ↓
impression / click / outcome events → measurement + reporting → optimization
```

**Campaign**[^g-campaign] is an organized set of advertising activity with a goal, a budget, and creatives. Before delivery, the advertiser side tells the systems the conditions of that activity. When an opportunity arises, the publisher side may pass a description of the app or site, the placement, the format, the time, and — as permitted by platform rules — signals about context, device, or audience. The selection systems match supply with demand and return a result.

The systems link objects and events with identifiers such as `request_id`, `campaign_id`, and `creative_id`; the specific fields and rules depend on the integration. After delivery, different participants may separately register an `impression` and a `click`. If the user installs the advertised app and takes out a subscription, the outcome event may reach measurement systems — provided the right integrations exist and within platform/privacy restrictions.

This reverse flow is usually asynchronous and does not have to travel the same network path as the ad request. The advertiser, the publisher, and intermediaries may have different points of observation, timestamps, and counting rules, so their reports do not have to match perfectly.

### 3. The Money Flow

```text
Advertiser media spend
    → buying channel / media seller or sellers
    → publisher revenue

Separately, depending on contracts:
advertiser or publisher → service / SaaS fee → technology provider
```

**Media spend**[^g-media-spend] is the money an advertiser allocates to buying advertising. A portion passes to media sellers and ultimately forms **publisher revenue**[^g-publisher-revenue]; along the way, **fees** may be deducted. But not every provider takes a share of every advertising payment. An agency, an ad server, an MMP, a verification or data provider may receive a separate service fee, SaaS fee, or other contractual payment. Some participants only pass along or measure events and never touch media money at all.

Therefore, the three sums must not be treated as synonyms:

- advertiser spend — the buyer's cost;
- intermediary fee — payment for a specific intermediary or technology function;
- publisher revenue — the seller of inventory's revenue.

Exact pricing models, margins, and the path of a hypothetical `$100` are covered in chapter 4. What matters here is the direction: advertising and data move in both directions, while money mostly flows from the advertiser to the owners of supply and to service providers.

## The Advertising Lifecycle: Not a Line, but a Feedback Loop

Advertising work begins before the first impression and does not end with a render:

```text
business goal
  → planning and setup
  → preparing campaigns and creatives
  → access to media and ad selection
  → delivery and render
  → user reaction and business result
  → measurement and reporting
  → optimization, reconciliation, and settlements
  ↺ next planning iteration
```

Let's walk through the cycle for a subscription app.

1. **Business goal.** The advertiser decides to acquire users who take out a subscription with acceptable unit economics.
2. **Planning and setup.** It defines the audience, the available channels, the budget, and the method of measurement. This is where demand is formed.
3. **Preparation.** A campaign and several creatives are created. The systems receive delivery rules and the necessary integrations.
4. **Access to media and ad selection.** The publisher provides opportunities directly or through sell-side systems. Buying systems find suitable opportunities and select a creative. The specifics of bidding, targeting, and pacing will appear in later chapters.
5. **Delivery and render.** The creative is delivered to the publisher app. Events corresponding to the participants' points of observation are registered; a render by itself does not mean viewability or the user's actual attention.
6. **Reaction and result.** The user may ignore the ad, click it, install the app, and later buy a subscription. The presence of an event does not prove the ad's causal impact.
7. **Measurement and reporting.** The systems aggregate the observed impressions, clicks, and outcomes. Attribution and mobile measurement require separate mechanisms and will be covered later.
8. **Optimization and settlements.** The advertiser redistributes future demand based on the available signals; the publisher adjusts its monetization strategy; the participants reconcile reports and carry out settlements.

The feedback loop is the reason AdTech is not just delivery infrastructure. Value arises when observations about the past change future decisions, but the quality of those decisions is limited by data completeness, measurement correctness, and the participants' misaligned incentives.

## AdTech and MarTech: A Working Boundary

**MarTech**[^g-martech] is technology for the broader management of marketing and the customer lifecycle: customer data, communications, and the advertiser's owned channels. The boundary is not standardized, so it is more useful to classify a system by its primary job than by the label on the vendor's website.

| Question | AdTech | MarTech |
|---|---|---|
| Primary object | Paid media and advertising opportunities | Customer relationships and marketing operations |
| Main coordination | Between the buying side and the selling side | Inside the advertiser and its owned channels |
| Typical channels | Publisher sites and apps, ad platforms, media marketplaces | Email, CRM, push, the brand's own site or app, customer journeys |
| Typical systems | DSP, SSP, ad network, exchange, ad server | CRM, marketing automation, CDP, email/push platforms |
| Primary result | Buy, sell, select, deliver, and measure advertising | Manage customer data and communications across the lifecycle |

The overlap is large. Measurement, attribution, identity, CDP, and activation can serve paid media and owned channels at the same time. For example, a subscription-purchase event lives in product/backend systems, may enter a MarTech retention process, and at the same time become an outcome signal for AdTech measurement. That is why `AdTech vs MarTech` is a working rule of thumb, not an impermeable boundary.

## What This Is Often Confused With

- **"The user is the inventory."** No. Inventory is advertising opportunities in a media environment. The user creates context and attention but remains a separate participant with their own interests and rights.
- **"An impression means the person saw the ad."** Not necessarily. `Served`, `rendered`, and `viewable` describe different points of the process, and viewability by itself does not prove human attention.
- **"Every intermediary resells media and keeps a share of the spend."** No. Some receive a separate service/SaaS fee, and some take no part in the media money flow at all.
- **"The more intermediaries, the worse."** Additional hops add fees, latency, and the risk of opacity, but they can also provide reach, aggregation, interoperability, measurement, and quality controls. The question is what function each hop performs and what it costs.
- **"AdTech = programmatic = RTB."** No. RTB is one mechanism of programmatic; programmatic is part of AdTech; AdTech also supports direct and closed-platform advertising.
- **"AdTech and MarTech are strictly separated."** No. Their primary jobs differ, but data, identity, measurement, and activation often overlap.

## Key Takeaways

1. Digital advertising is a market of coordination between advertiser, publisher, and user, not just the delivery of a banner.
2. The advertiser creates demand, the publisher creates supply; the sides of the market must not be confused with platform names.
3. Advertising inventory is available or projected opportunities, not users and not pre-manufactured impressions.
4. `Placement`, `ad opportunity`, and `impression` are different stages: a placement rule, an arisen opportunity, and a registered event.
5. AdTech exists because of scale, fragmentation, the speed of selection, delivery, interoperability, measurement, and settlements.
6. Intermediaries perform functions; no category is required to be present in every deal.
7. The display flow, the data flow, and the money flow differ in direction, participants, and timing.
8. The advertising lifecycle forms a feedback loop: measurement of past events influences future decisions and spending.
9. AdTech primarily coordinates paid media, while MarTech handles the customer lifecycle and owned channels, but there is overlap between them.

## Check Yourself

1. Why is the user a participant in the advertising market but not advertising inventory?
2. How does a placement differ from an ad opportunity and an impression?
3. For the advertising of a subscription app, draw the creative flow, the event flow, and the money flow separately. Which arrows will not coincide?
4. What intermediary function can justify an additional hop, and in which case would that hop turn out to be superfluous?

## Sources and Further Reading

1. [IAB Tech Lab — OpenRTB](https://iabtechlab.com/standards/openrtb/)
2. [IAB Tech Lab — Supply Chain & Foundations](https://iabtechlab.com/standards/supply-chain-foundations/)
3. [IAB Tech Lab — sellers.json and SupplyChain Object](https://iabtechlab.com/sellers-json/)
4. [IAB Tech Lab — About ads.txt](https://iabtechlab.com/ads-txt-about/)
5. [Competition and Markets Authority — Intermediation in open display advertising](https://www.gov.uk/find-digital-market-research/online-platforms-and-digital-advertising-market-study-appendix-m-intermediation-in-open-display-advertising-2020-cma)
6. [IAB UK — Demand Side Platform (DSP)](https://www.iabuk.com/jargon-buster/demand-side-platform-dsp)
