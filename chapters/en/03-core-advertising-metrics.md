---
id: ch-03
type: chapter
part: I
chapter: 3
slug: core-advertising-metrics
title: "Core Advertising Metrics"
language: en
status: draft
toc_requirements: ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14", "3.15", "3.16", "3.17", "3.18", "3.19", "3.20", "3.21", "3.22", "3.23", "3.24", "3.25"]
prerequisites: [ch-01, ch-02]
---

# Core Advertising Metrics

## Why a number without a definition says nothing

An advertising campaign[^g-campaign] passes through several systems. The publisher[^g-publisher] observes the creation of ad slots and ad delivery; the buying platform — the requests and deals available to it; the advertiser[^g-advertiser] — spend and business outcomes. Each system aggregates its own slice of the flow. That is why a column reading `Impressions: 8,000` says nothing by itself about what actually happened, or why its number should or should not match a neighboring report.

A **metric contract**[^g-metric-contract] is the complete definition of a metric by which a number can be reproduced and interpreted:

```text
event definition + measurement point
+ filters and deduplication
+ numerator / denominator
+ dimensions
+ period and event/reporting/attribution window
+ currency
+ perspective and ledger boundary
```

For example, `CTR = 2%` is not yet a contract. You need to know which clicks[^g-click] and impressions[^g-impression] are eligible, where they are recorded, whether repeats are excluded, over what period, and for which campaign. For a monetary metric, the currency, the conversion[^g-conversion] and refund rules, and whose money it is additionally matter.

The basic metric classes answer different questions:

| Class | What it measures | Example |
|---|---|---|
| `count` | How many qualifying events or entities were recorded | 8,000 impressions |
| `rate` | What share of one count falls on another | `160 clicks / 8,000 impressions = 2% CTR` |
| `unit/effective metric` | How much cost or revenue falls on a unit of outcome | `$96 / 160 clicks = $0.60 CPC` |
| `return metric` | How the measured value compares to the investment | `$480 / $96 = 5.0x ROAS` |

Before comparing two columns, ask seven questions:

```text
Who counts?
What is counted and at which measurement point?
Where does the measurement boundary run?
When did the event occur and which period/window did it fall into?
Which filters and deduplication were applied?
What is the denominator?
Which currency is it in, and whose money is it?
```

This contract matters more than the name. Even an arithmetically simple formula answers a different question once `rendered impression` is swapped for `served impression`, click for install, or advertiser spend[^g-media-spend] for publisher revenue[^g-publisher-revenue].

## From opportunity to a possible exposure

On a media surface the publisher first gets an **ad opportunity**[^g-ad-opportunity] — a concrete chance to show an ad, for example a full-screen placement[^g-placement] after a level is completed in a game. A **request** is already a technical message sent to a specific system asking it to select an ad, return a creative[^g-creative], or take part in an auction. These are different levels:

- an opportunity may not produce a request because of a local rule or filter;
- one request may carry several ad objects;
- one opportunity may fan out into several downstream `bid request`s;
- retries increase the request count without a new opportunity;
- a batch combines several opportunities in one message.

The final IAB Tech Lab Programmatic Auction Definitions dated June 24, 2026 use `Ad Request` for information about an impression opportunity put up for auction. At the OpenRTB 2.6 protocol boundary, a single `BidRequest` contains one or more `Imp` objects. This is a sufficient reason not to treat HTTP requests as an unqualified proxy for user-facing opportunities. The OpenRTB 2.6 PDF was released in 2022, and the standard's page, updated on January 23, 2024, points to the maintained GitHub releases; a specific production implementation may differ.

```text
publisher surface
  → ad opportunity
  → 0..N request / bid request
  → response / bid / win
  → served response
  → rendered impression
  → measurable → viewable impression
  → click
  → advertiser-defined conversion
  → attributed revenue / customer value
```

This is a map of measurement[^g-measurement] points, not a universally strictly decreasing funnel. Fan-out and retries can produce more requests than opportunities; a video pod contains several ad units; one user can make several clicks or conversions; filters, deduplication, and different windows change the populations between reports.

An **impression** is a recorded ad event according to the counting rule of a specific system. The word without a qualifier proves neither render, nor viewability, nor human attention.

| State | Minimal evidence | What it does not prove |
|---|---|---|
| `served impression` / served response | The server or platform recorded issuing an ad response, code, or creative instructions | That the device loaded and started displaying the creative |
| `rendered impression` | The client/device started a render under the applicable rule | That a sufficient part of the creative was on screen long enough |
| `measurable` | The measurement tool was able to determine the geometry/time conditions of exposure | That the viewability conditions are met |
| `viewable impression` | A valid rendered served impression met the applicable geometry/time criteria | That a human actually looked at the ad or paid attention |
| `non-viewable` | Measurement occurred, the criteria were not met | That the impression was non-measurable |
| `non-measurable` / undetermined | The available signals are insufficient to determine viewability | That the impression was viewable or non-viewable |

The MRC Desktop Display Impression Measurement Guidelines, updated in October 2017, require, for a qualified client-side count, that the creative was downloaded and the render at least began. The MRC Viewable Guidelines v2.0, updated in August 2015, tie a viewable impression[^g-viewable-impression] to a valid rendered served impression. The classic benchmark from the 2017 Digital Audience-Based Standard is at least 50% of pixels for one continuous second for display and two continuous seconds for video. This is not a universal rule for every format and environment: MRC separately publishes the 2016 Mobile Viewable Guidelines, the Digital Video Guidelines with a 2018 update, the 2021 OTT/CTV/SSAI Guidelines, the In-Game Guidelines with a 2022 update, and the 2024 AR Guidelines. Deep viewability methodology belongs to chapter 37.

### Reach and frequency: from events to audience

**Reach**[^g-reach] is the de-duplicated number of unique entities that received at least one qualifying exposure in a period, or the share of such entities in an explicitly declared population:

```text
reach count = unique entities with ≥ 1 qualifying exposure in the period
reach rate  = reached unique entities / declared universe × 100%
```

A unique entity must be specified: `person`, `device`, `household`, account, or modeled audience. `20,000 device IDs`, `20,000 modeled persons`, and `20,000 households` are not interchangeable counts. Without the universe size, the reach rate cannot be computed; without identity coverage and cross-device deduplication rules, the completeness of reach cannot be assessed.

**Frequency**[^g-frequency] is the average number of qualifying exposures per reached unique entity over the same period:

```text
frequency = qualifying impressions / reached unique entities
```

A textbook example: 60,000 qualifying viewable impressions in a week are distributed across 20,000 de-duplicated persons from the chosen population. The reach count is 20,000 persons, and the average frequency is `60,000 / 20,000 = 3`. This does not mean every person saw the ad exactly three times: frequency is an average.

The MRC Digital Audience-Based Measurement Standard (2017) uses qualifying viewable impressions as its measurement basis. Product dashboards may count reach on a different impression basis, by devices, or with modeling. That is why `reach` and `frequency` are comparable only with identical entity, exposure rule, population, de-dup scope, and period.

## From exposure to response and outcome

A **click** is a qualifying user-initiated interaction with an ad. Even a single action has several measurement points:

```text
user initiates click
  → click tracker / redirect      # measured click
  → destination receives request # received click
  → landing page resolves/loads   # resolved click
```

The user may close the screen, the network may drop, the redirect may not complete, and different systems may apply different filters. So initiated, measured, received, and resolved clicks need not match. The IAB/MRC Click Measurement Guidelines v1.0 of May 12, 2009 are still listed by the MRC as a measurement baseline, but their browser/HTTP wording is legacy and does not exhaustively describe app, platform, and other interactions of 2026; the redirect above is a typical, not the only, flow.

**CTR (Click-Through Rate)**[^g-ctr] shows the share of the counted impressions after which the counted clicks were registered:

```text
CTR = qualifying clicks / counted impressions × 100%
```

If an advertiser report counts 160 clicks and 8,000 impressions under one contract, `CTR = 2%`. Swapping served impressions for rendered, all clicks for filtered clicks, or a campaign-level population for a creative-level population will change the number. A high CTR by itself does not mean quality traffic, conversions, or causal lift.

A **conversion** is a valuable action or outcome that the advertiser defined as meaningful and that the system credited under its measurement and attribution[^g-attribution] rules. For a subscription app it can be an install, a trial, the first paid subscription, or a renewal. These actions must not be summed without an explicit counting rule: one click can lead to an install, a trial, and a subscription — that is, to several conversions.

An observed purchase means the event was recorded. An **attributed conversion** means a chosen attribution rule assigned an ad touchpoint credit for that outcome. Counts depend on the conversion definition, the attribution/lookback window, filters, late-arriving events, and the counting mode. Neither an observed nor an attributed conversion by itself proves that the ad caused the outcome: attribution distributes credit, while causality requires incrementality evidence.

**CVR (Conversion Rate)**[^g-cvr] is meaningful only with a named precursor event:

```text
CVR = qualifying conversions / declared eligible precursor events × 100%
```

| Full name | Numerator | Denominator | Which transition it measures |
|---|---|---|---|
| click-to-install CVR | attributed installs | eligible clicks | Click → install |
| install-to-trial CVR | qualifying trials | attributed installs | Install → trial |
| click-to-subscription CVR | attributed subscriptions | eligible clicks | Click → subscription |

A bare `CVR` hides different funnels. Even a value above 100% is not always an error: for example, Google Ads counts conversions on trackable ad interactions, and the `Every` mode plus several conversion actions can yield more than one conversion per interaction. The denominator and the counting rule are part of the metric's name.

## Normalized price of an event: CPM, eCPM, and cost-per-X

Absolute spend does not allow comparing activities of different sizes. Unit metrics divide recognized cost or revenue by an explicitly defined event. In a post-fact report these are actual averages; the same labels may denote a pricing model, a bid, or an optimization target, which does not guarantee they match the realized average.

| Metric | Actual formula | Perspective and denominator | Main ambiguity |
|---|---|---|---|
| **CPM (Cost per Mille)** | `advertiser cost or spend / counted impressions × 1,000` | Buyer; a thousand counted impressions | May mean a pricing basis, a rate, a bid, or the observed average CPM |
| **eCPM (effective CPM)** | `recognized revenue / counted impressions × 1,000` | Usually publisher/seller; a thousand counted impressions | Revenue and impression scope depend on the seller contract |
| **CPC (Cost per Click)** | `cost / qualifying clicks` | Buyer; clicks under a disclosed rule | A bid/target CPC is not the actual average CPC |
| **CPA (Cost per Action)** | `cost / qualifying actions` | Buyer; advertiser-defined action | The action can be a trial, order, lead, or subscription, not necessarily a new customer |
| **CPI (Cost per Install)** | `cost / qualifying installs` | Mobile acquisition; attributed installs | The install count depends on measurement and attribution rules |
| **CPL (Cost per Lead)** | `cost / qualifying leads` | Lead generation; business-defined lead | Lead definition and quality vary; a lead is not yet a customer |
| **CAC (Customer Acquisition Cost)** | `allocated acquisition costs / new customers` | The advertiser's business; new customers | The numerator may include media, agency, sales, and onboarding costs |

`Mille` means a thousand. The observed CPM[^g-cpm] answers: how much did the buyer spend per thousand counted impressions? The eCPM[^g-ecpm] answers: how much recognized revenue did the seller receive per thousand counted impressions? The formulas are symmetric, but the numerators belong to different ledger boundaries[^g-ledger-boundary]. A publisher can use eCPM to compare demand paid on CPM, CPC, or CPA on a common realized-revenue basis. So CPM and eCPM are not automatically two names for one number.

CPC[^g-cpc], CPA[^g-cpa], CPI[^g-cpi], and CPL[^g-cpl] follow one pattern, `recognized cost / qualifying events`, but the event defines the business meaning. A low CPL is useless if the lead does not pass qualification; a low CPI does not say the install will convert to a subscription; a CPA cannot be read without the name of the action.

CAC[^g-cac] is broader than platform CPA. If a platform report shows a `$4 CPA` for a subscription, it uses platform cost and the attributed subscription action. A business may count as a new customer only the first confirmed payment and include media, agency, sales, and onboarding in acquisition costs. Until the customer event, period, cost allocation, and refunds are agreed, a platform CPA cannot be renamed CAC.

## Whose money and what return

One amount changes its label depending on the participant and the ledger boundary:

```text
advertiser: spend / media cost
        → selling or buying platform:
          revenue on one boundary,
          downstream media/traffic cost on another boundary
        → publisher: recognized publisher revenue
```

**Revenue**[^g-revenue] is the proceeds recognized by the chosen entity under its rules. **Spend** is the buyer's expenditure on media in the chosen scope. **Cost**[^g-cost] is the expenditure of the entity whose economics are being analyzed; for an advertiser it can be media cost, for a platform downstream cost, for a business a broader set of expenses. Estimated dashboard value, invoiced amount, settled amount, and recognized revenue can belong to different states. To compare, you must agree on period, timezone, currency conversion, taxes/refunds, and participant. Gross/net accounting, take rate, and settlement are covered in detail in chapter 4.

**ROAS (Return on Ad Spend)**[^g-roas] measures media efficiency:

```text
ROAS = attributed conversion value or revenue / ad spend
```

The result can be written as `5.0x` or `500%`. It depends on the attribution rules and the chosen value field. **ROI (Return on Investment)**[^g-roi] assesses the profitability of a broader investment scope:

```text
ROI = net profit / total relevant investment cost
    = (return − total relevant cost) / total relevant cost
```

In the textbook walkthrough, the advertiser receives `$480` of attributed conversion value against `$96` of ad spend: ROAS is `5.0x`. If the `$480` is treated as attributed revenue and the full agreed cost — including media, product delivery, agency, and operations — is `$600`, net profit is `−$120` and ROI is `−20%`. A high ROAS is compatible with a negative ROI because the denominators and cost scopes differ. Both ROAS and attributed revenue remain attribution-dependent: without a causal design they do not prove incremental return.

## User value over time: ARPU, ARPPU, and LTV

An acquisition metric says how much it cost to obtain an event or a customer; a product-value metric says how much the chosen user population brought in — or, according to a model, will bring in.

| Metric | Working formula | Required contract |
|---|---|---|
| **ARPU (Average Revenue per User)** | `selected revenue / all eligible users` | User definition, revenue categories, period, cohort/population |
| **ARPPU (Average Revenue per Paying User)** | `selected purchase revenue / paying users` | Payer event, purchase revenue, refunds, period |
| **LTV (Lifetime Value)** | `cumulative observed or predicted value / cohort members` | Cohort, horizon, identity, observed/predicted status, revenue/contribution basis |

A textbook subscription cohort: in a month, 1,000 active users generate `$1,000` of selected recognized revenue, 100 of whom pay; for simplicity, all revenue in the example is purchase revenue. Then `ARPU = $1,000 / 1,000 = $1` and `ARPPU = $1,000 / 100 = $10`. ARPU[^g-arpu] includes the non-paying users of the chosen population; ARPPU[^g-arppu] divides only by payers. These numbers say nothing about lifetime without a cohort and a horizon.

As of August 27, 2026, the Google Analytics Data API, for example, defines ARPU as total revenue per active user with purchase, subscription, and ad revenue, and ARPPU as purchase revenue per paying active user. This is a product-specific contract, not a universal vocabulary: another company may define active user, payer, revenue, taxes, and refunds differently.

**Observed LTV**[^g-ltv] sums the value actually recorded for a cohort up to a given horizon, for example `30-day revenue LTV`. **Predicted LTV** estimates future value with a model and assumptions, for example `12-month predicted contribution LTV`. Revenue LTV does not subtract expenses; contribution/profit LTV uses an agreed margin basis. GA4 User Lifetime unifies lifetime interactions and supports observed and predictive metrics, but the identity method and sampling affect the result. That is why a user's LTV without a cohort, horizon, identity rule, value basis, and model status is not a defined scalar.

## Where monetization is lost: fill rate and win rate

Fill and win describe different stages with different owners. They are not complements of each other adding up to 100%.

| Metric | One common contract | Stage and owner | Why the count changes further |
|---|---|---|---|
| **Fill rate** | `counted filled impressions / eligible ad requests` | Publisher/ad server: request → delivery | A matched response may not render or may not become a counted impression |
| **Bid rate** | `submitted bids / eligible bid requests` | Buyer: request → bid/no-bid | The buyer filters opportunities and does not respond to every request |
| **Win rate** | `winning bids / submitted eligible bids` | Buyer/deal: bid → auction win | A win notice is not yet a delivery or billing event |

Fill rate[^g-fill-rate] has no single safe vendor-neutral denominator. A product may divide impressions, matched responses, or another fill event by requests, opportunities, or ad units. The Google Ad Manager sell-through documentation, checked on August 27, 2026, uses `Total impressions / Total ad requests`; for optimized video pods, part of the requests/unfilled units is derived from durations and the configured ad opportunity duration. This is an exact product definition, not a rule for every ad server. `Match rate`, `response rate`, `delivery rate`, and `fill rate` may name adjacent transitions rather than aliases.

Win rate[^g-win-rate] also requires a disclosed population. An auction may receive a bid, select it as the winner, send a win notice, and still not deliver the creative or create a billable impression. OpenRTB distinguishes a win notice from a billing notice; billing policy may depend on delivery, viewability, or other rules. The formula `Deals win rate = winning bids / bids` appeared in the legacy Google Ad Manager Reports metrics. The old Reports tool was fully deactivated in June 2026 in favor of Interactive reports, so this is a dated official example of a denominator, not guidance for the current UI or a universal taxonomy.

## One campaign, three truthful reports

Let us assemble the metrics on one consistent scenario. All numbers below are **instructional**. A subscription app is advertised inside a mobile game; the period is, say, one week, and the currency is USD. Each calculation uses its own explicitly named contract rather than assuming a shared global event store.

### Advertiser: outcome and acquisition efficiency

The advertiser report contains its subset: 8,000 counted impressions, 160 qualifying clicks, 24 attributed subscriptions, `$96` of spend, and `$480` of attributed conversion value.

```text
CTR  = 160 / 8,000 × 100%        = 2%
CPM  = $96 / 8,000 × 1,000       = $12
CPC  = $96 / 160                 = $0.60
CVR  = 24 / 160 × 100%           = 15%  # click → subscription
CPA  = $96 / 24                  = $4    # action = attributed subscription
ROAS = $480 / $96                = 5.0x
```

Here `$12 CPM` and `$4 CPA` are post-fact averages, not claims about a billing model or a bid. `$480` is attributed value, not proven causal value.

### Publisher: delivery and monetization

Over the same period the publisher aggregates all buyers, not just this advertiser: 100,000 eligible ad requests, 80,000 counted impressions, and `$800` of recognized publisher revenue.

```text
fill rate = 80,000 / 100,000 × 100% = 80%
eCPM      = $800 / 80,000 × 1,000   = $10
```

The publisher totals are naturally larger than the advertiser subset. Its `$800 revenue` is not the advertiser's `$96 spend`: it is a different population and a different ledger boundary.

### Platform: auction and delivery boundary

The platform in question sees 60,000 eligible bid requests, submits 45,000 bids, receives 9,000 wins; 8,000 of those events become counted/billable impressions under the chosen contract.

```text
bid rate = 45,000 / 60,000 × 100% = 75%
win rate = 9,000 / 45,000 × 100%  = 20%
```

The difference between 9,000 wins and 8,000 counted/billable impressions need not be an error: win and billing/delivery are different event points. Likewise, the platform's 60,000 requests need not equal the publisher's 100,000 requests because of boundary, routing, batching, fan-out, and filters.

| Perspective | Observed subset | Key decisions | Monetary meaning |
|---|---|---|---|
| Advertiser | Bought impressions, clicks, attributed outcomes | Acquisition and value efficiency | Spend/cost and attributed value |
| Publisher | All eligible requests and demand sources | Delivery and monetization | Recognized publisher revenue |
| Platform | Traversed requests, bids, wins, and its billing events | Auction participation and the delivery boundary | Its own revenue, spend, or downstream cost under a specific ledger |

Here the data flow and the money flow diverge. Impression/click/conversion events may arrive asynchronously into different reports; invoicing and settlement need not follow the same network path. Arithmetic consistency within each metric contract does not prove that raw events are equal across systems. For primary diagnostics, the seven questions are needed again: who counts, what, where, when, after which filters, in which denominator, and whose money. Detailed reconciliation belongs to chapter 32.

## What this is often confused with

- **An opportunity, an ad request, and a bid request are not one event.** An opportunity arises on the media surface; requests are system-bound messages subject to batching, fan-out, retries, and filtering.
- **An impression does not mean a human viewing.** Served, rendered, measurable, and viewable provide different levels of evidence; viewable means a standardized opportunity to see, not attention.
- **Non-viewable is not the same as non-measurable.** In the first case measurement completed and the criteria were not met; in the second the status could not be determined.
- **CTR and CVR have no hidden universal denominator.** CTR depends on the click/impression basis; CVR must be named as a specific transition.
- **Conversion and ROAS do not prove causality.** They depend on observation, attribution, and valuation rules.
- **CPM is not eCPM, and CPA is not CAC.** The first pairs differ in ledger perspective; the latter in action/customer definition and cost scope.
- **Spend, cost, and revenue must not be copied between participants.** One amount takes on a different meaning at different economic boundaries.
- **ROAS is not ROI.** ROAS normalizes attributed value against ad spend; ROI uses net profit and the full chosen investment cost.
- **ARPU, ARPPU, and LTV differ in more than the denominator.** They require different populations, revenue scopes, periods, cohorts, horizons, and model status.
- **Fill rate and win rate are not one auction metric seen from two sides.** Fill belongs to publisher delivery; win belongs to the bid → win transition under a disclosed auction contract.

## What to remember

1. A metric is a contract of measurement, not just a name and a formula.
2. An opportunity arises on the media surface; a request is a message to a system and does not correspond to an opportunity one-to-one.
3. An impression is a counted event. Served, rendered, measurable, and viewable describe different measurement points; none proves attention.
4. Reach requires unique-entity and universe definitions; frequency requires a shared impression basis, reached population, and period.
5. CTR and especially CVR are comparable only with named numerators, denominators, and filters.
6. CPM/CPC/CPA/CPI/CPL can be pricing, bid/target labels, or actual averages; eCPM usually normalizes seller revenue.
7. CAC uses new customers and a broad allocated acquisition cost, so it is not an alias of platform CPA.
8. ROAS measures attributed media return, ROI measures profit against the full chosen investment scope; attribution is not causality.
9. ARPU, ARPPU, and LTV require user, revenue, cohort, period/horizon, and model definitions.
10. Advertiser, publisher, and platform can simultaneously have correct but different reports on one campaign, because they see different boundaries and ledgers.

## Check yourself

1. One opportunity produced three downstream bid requests. Which count describes the media event, and which one the protocol messages?
2. Why can `CVR = 15%` not be compared with another `CVR = 12%` until the denominators and conversion rules are disclosed?
3. How can a campaign with `5.0x ROAS` have a negative ROI?
4. Which metric contracts allow an advertiser CPM of `$12`, a publisher eCPM of `$10`, and a platform win rate of `20%` at the same time without contradiction?

## Sources and Further Reading

1. [MRC — Standards & Guidelines](https://www.mediaratingcouncil.org/standards-and-guidelines)
2. [MRC/IAB — Desktop Display Impression Measurement Guidelines v1.1](https://www.mediaratingcouncil.org/sites/default/files/Standards/Desktop-Display-Impression-Measurement-Guidelines-US%20%28MMTF%20Final%20v1.1%29.pdf) and [MRC — Viewable Ad Impression Measurement Guidelines v2.0](https://mediaratingcouncil.org/sites/default/files/Standards/081815%20Viewable%20Ad%20Impression%20Guideline_v2.0_Final.pdf)
3. [MRC/IAB — Digital Audience-Based Measurement Standards, Final 1.0](https://www.mediaratingcouncil.org/sites/default/files/Standards/MRC%20Digital%20Audience-Based%20Measurement%20Standards%20Final%201.0.pdf)
4. [IAB/MRC — Click Measurement Guidelines v1.0](https://www.mediaratingcouncil.org/sites/default/files/Standards/click-measurement-guidelines2009-2.pdf)
5. [MRC — Outcomes and Data Quality Standards](https://www.mediaratingcouncil.org/sites/default/files/Standards/MRC%20Outcomes%20and%20Data%20Quality%20Standards%20%28Final%29.pdf)
6. [IAB Tech Lab — Programmatic Auction Definitions](https://github.com/InteractiveAdvertisingBureau/programmatic-auction-definitions/blob/main/auction%20definitions.md) and [OpenRTB 2.x](https://iabtechlab.com/standards/openrtb/)
7. [Google Ad Manager — Sell-through](https://support.google.com/admanager/answer/7304688?hl=en) and [Report metrics](https://support.google.com/admanager/table/7568664?hl=en)
8. [Google Ads — CTR](https://support.google.com/google-ads/answer/2615875?hl=en), [Conversion rate](https://support.google.com/google-ads/answer/2684489?hl=en), [ROI](https://support.google.com/google-ads/answer/1722066?hl=en), [Google Analytics Data API schema](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema) and [GA4 User lifetime](https://support.google.com/analytics/answer/9947257?hl=en)
