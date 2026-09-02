---
id: ch-02
type: chapter
part: I
chapter: 2
slug: adtech-ecosystem-participants
title: "AdTech Ecosystem Participants"
language: en
status: draft
toc_requirements: ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9", "2.10", "2.11", "2.12", "2.13", "2.14", "2.15", "2.16", "2.17"]
prerequisites: [ch-01]
---

# AdTech Ecosystem Participants

## The essence: roles, not boxes

In the first chapter we saw the two economic sides of the market: `advertiser`[^g-advertiser] creates demand[^g-demand], while `publisher`[^g-publisher] creates supply[^g-supply]. Many systems may sit between them, but the map of AdTech[^g-adtech] becomes clear once you look not at company names but at **roles** — logical functions in an advertising deal.

`Role`, `company`, and `product` are different levels:

- **role** answers the question "what function is performed here?";
- **company** — an organization that signs the contract and may perform several roles;
- **product** — a specific offering of that company: a UI, an API, a managed service, or a set of tools.

Therefore, a logo cannot be placed in a single cell of the map forever. One product suite may simultaneously buy media, sell access to inventory[^g-inventory], deliver ads, and build reporting. Conversely, the advertiser role may be split between the company's own team and several providers.

To analyze any role, use a single card:

| Question | What it clarifies |
|---|---|
| What problem does the role solve? | The reason it exists |
| Who is the customer? | Who uses the product or service |
| Who is the beneficiary? | Who receives the economic benefit |
| Who is the payer? | Who pays for media or the service under contract |
| What data comes in and goes out? | The technical boundaries of the function |
| What decision is made or executed? | The actual work, not a marketing label |
| How does money move? | Media money, a separate fee, or no payment in this flow |

Customer, beneficiary, and payer may not coincide. For example, a media buyer[^g-media-buyer] works in a platform's UI, the advertiser receives the benefit, and the agency[^g-agency] may pay the invoice. This distinction matters especially when reading contracts, data flows, and reports.

Let's fill in the card for the main economic participant. The advertiser wants to change the knowledge or behavior of an audience, funds the campaign[^g-campaign], hands over the goal, budget, and ad materials, and receives outcomes and reporting. The **creative**[^g-creative] is the ad material itself: for example, an image, a video, or text. The advertiser is usually the beneficiary and the source of money, but may delegate the operational work and the payment of specific invoices to an agency.

Such an analysis is more useful than a linear diagram of seventeen mandatory boxes: in a specific campaign some roles will be absent, and several others will hide behind a single contract.

## Who sets the goal and who executes the purchase

Let's start not with platforms but with those for whom the market exists.

**Advertiser** — an organization that funds advertising for the sake of a business outcome. For an app with a paid subscription, the outcome may be immediate — a trial or a paid subscription — or more delayed: knowledge of the product and the willingness to consider it later. The advertiser defines the goal, the acceptable spend, the audience, and the success criteria; on its own or through contractors, it decides where to buy media.

This gives rise to two advertising orientations:

- **brand advertising**[^g-brand-advertising] primarily changes awareness, consideration, or perception — knowledge of the product, consideration of it, and attitude toward it;
- **performance advertising**[^g-performance-advertising] is driven around a measurable action or outcome and the cost of obtaining it: registrations, trials, installs, or purchases.

These are not two mutually exclusive kinds of companies. One subscription app may simultaneously run a video campaign to introduce the brand and an acquisition campaign optimized for trials. Moreover, a single user may first encounter the product through brand advertising and later respond to performance advertising. What differ above all are the goal, the evaluation horizon, and the expected evidence of results.

**Publisher** — an organization that owns or operates a media environment where advertising opportunities[^g-ad-opportunity] arise: a website, an app, a game, or a video service. The publisher defines placements[^g-placement] and serving rules, provides context and access to inventory, receives delivery information, and earns publisher revenue[^g-publisher-revenue]. Its interest is to sell opportunities profitably enough while preserving the quality of the product and the user experience.

Between the advertiser's business goal and the technical purchase there often stand people and service organizations:

- **agency** — a contractor company that plans or executes marketing and media work on behalf of the advertiser. It may develop strategy, prepare creatives, choose channels, launch campaigns, manage reporting, and sometimes handle payments;
- **media buyer** — a person, team, or function that chooses media, platforms, and purchase terms, allocates spend, and sets up campaigns. A media buyer may work inside the advertiser, inside the agency, or inside another buying organization.

Agency and media buyer are not synonyms: the former is an organization and a contractual role, the latter an operational function. A media buyer is also not a DSP[^g-dsp]: a human formulates and configures decisions, while a DSP executes part of the buying workflow at scale.

| Role | Problem and beneficiary | Typical payer | Data in | Decision or output |
|---|---|---|---|---|
| Advertiser | Achieve a business outcome; the advertiser itself receives the benefit | Source of media spend[^g-media-spend] and many service fees | Business goal, constraints, customer data | Campaign goal, budget, success criteria |
| Publisher | Monetize the media environment; the publisher receives the benefit | Usually not a payer in the media sale; may pay technology providers | Placements, context, inventory rules | Available opportunities, delivery rules, publisher revenue |
| Agency | Perform the work for which the advertiser does not build a team or expertise | Advertiser; sometimes the agency acts as payer on downstream invoices | Brief, budget, creatives, results | Plan, settings, execution, and reporting |
| Media buyer | Turn the goal and budget into concrete purchases | Not a separate payer as a function; paid by employer/client | Campaign goals, available channels, reports | Choice of media and platforms, allocation, and settings |

The advertiser may keep buying in-house, hand it entirely to an agency, or split the responsibility. This changes the control boundary: who has access to the account, raw data, and the contract; who is responsible for setup mistakes; and who can reallocate spend.

## Who connects demand and supply

A single advertiser cannot manually evaluate every short-lived opportunity at thousands of publishers, and a publisher cannot phone around for a buyer for each impression. The next group of roles solves the scale problem, but does so from different sides.

The possible paths look like this:

```text
advertiser ───────────── direct buying ─────────────→ publisher
advertiser ───────────── ad network ────────────────→ publisher
advertiser / buyer → DSP ⇄ exchange / SSP functions → publisher

advertiser ad server and publisher ad server can support different branches;
no single line is a mandatory universal pipeline.
```

**Ad network**[^g-ad-network] aggregates supply and/or demand and sells a managed media offering. The buyer usually chooses the available offer, the goal, and the constraints, while the network takes on a significant share of traffic distribution and publisher relationships. The network may accept media money and settle with supply partners; the specific commercial model depends on the contract.

**DSP (Demand-Side Platform)** — a buying platform that helps a media buyer evaluate and purchase opportunities from several supply sources according to campaign rules. The customer is an advertiser, an agency, or another buyer. The DSP receives campaign settings, creatives, and available opportunity signals; accepts or executes buying decisions; and returns results and reporting. Compared to a managed network offering, a DSP usually gives the buyer more campaign-level control, but real products may combine both models.

**SSP (Supply-Side Platform)**[^g-ssp] — a sell-side platform for the publisher. It describes available opportunities, gives demand sources access to inventory, and helps manage its sale. The SSP receives inventory rules and context signals from the publisher side, passes an admissible description of the opportunity to buyers, and returns the sale decision and related metadata. The publisher is the primary customer and beneficiary, although the SSP often takes its payment within the media settlement.

**Ad exchange**[^g-ad-exchange] — a transaction layer or function that connects buyers and sellers and performs matching or an auction. An exchange is not necessarily a separate company between DSP and SSP: exchange and SSP functions are often combined in one product. A useful distinction is this: the SSP represents the publisher's sell-side workflow, while the exchange performs the automated transaction function between the parties themselves.

**Ad server**[^g-ad-server] selects, delivers, and records ads according to given campaign or inventory rules. It is not just a CDN with files: a CDN may deliver creative bytes, while an ad server applies rules and creates an observable point of delivery.

- An advertiser ad server helps the buyer side manage creatives, their delivery, and event recording independently of the specific place of purchase.
- A publisher ad server matches available demand sources and manages delivery on the publisher's inventory.

Detailed `order`, `line item`, priorities, and serving mechanics will appear in chapter 11. What matters here is that the two kinds of ad server look at the same impression from different operational boundaries.

| Role | Primary customer | Data in | Decision or output | Money relationship |
|---|---|---|---|---|
| Ad network | Advertiser/agency; also needs supply partners | Campaign constraints, creatives, aggregated supply | Managed distribution and reporting | Often accepts media money; other contracts are possible |
| DSP | Advertiser, agency, media buyer | Campaign settings, creatives, opportunity signals | Buying decision, access to supply, reports | Media spend and/or platform fee depending on the contract |
| SSP | Publisher | Inventory rules, opportunity and context signals | Access to demand, sale decision metadata, reports | Participates in the settlement or receives a fee under contract |
| Ad exchange | Buyers and sellers or their platforms | Opportunity descriptions and buying responses | Matching/transaction result | May participate in the media settlement or receive a fee |
| Ad server | Advertiser or publisher | Campaign/inventory rules, creatives, delivery signals | Selection, delivery, and event registration | Usually a separate service, license, or usage fee; the model depends on the provider |

`DSP ≠ ad network`: a DSP is primarily the buyer's tool and decision layer, while a network is an aggregated managed media offering. `SSP ≠ exchange`: the first role organizes the sale on the publisher's side, the second is a transaction function. But none of these boundaries guarantees separate vendors or non-overlapping features.

## Who measures and verifies

A platform that sold or bought media sees only its own measurement[^g-measurement] points and is at the same time interested in the outcome of the deal. Therefore advertisers and publishers may connect cross-cutting providers. They do not stand as mandatory hops in the creative path: their integrations receive events and return separate conclusions.

**Attribution provider**[^g-attribution] matches available advertising touchpoints — for example, an impression[^g-impression] or a click — with outcomes such as a registration or a purchase, and applies rules for assigning credit. The result answers the question "to which source, under the chosen rules, is this conversion attributed?", not "was the advertising the true cause of the action?" Attribution does not prove causality.

**MMP (Mobile Measurement Partner)**[^g-mmp] — a mobile-specialized category of measurement and attribution providers for app acquisition, installs, and in-app outcomes. A specific MMP may have features for other environments and for analytics, but its primary role here is to match available acquisition signals with app events and to give the advertiser a consistent view across media sources. An MMP is not a synonym for product analytics: product analytics primarily studies behavior inside the product, whereas an MMP links acquisition to advertising sources. Technical details of SDKs, install matching, postbacks, and platform privacy restrictions belong to chapters 27–29.

**Verification provider**[^g-verification] creates a separate point for evaluating the conditions and quality of ad delivery. Depending on the integration, it may analyze available delivery, render, placement, context, and quality signals and return verification results to the advertiser, the publisher, or a platform. Verification is broader than fraud detection alone: the questions may also concern the environment and the conditions of serving. But a separate provider is not absolute truth — the completeness of its conclusions depends on the environment, the available signals, and the methodology.

For a single app ad, the systems may receive partially overlapping events:

```text
impression / click signals ─┬→ buying and selling platform reports
                            ├→ attribution provider / MMP
delivery / context signals ─┴→ verification provider

install / subscription events → MMP and the advertiser's systems, if integrations allow it
```

Reports may differ not only because of error. Platform reporting answers what the platform itself observed; the MMP applies its own attribution rules to acquisition and app events; the verification provider evaluates the delivery conditions available to it. These are different questions and different measurement boundaries.

## Who supplies, organizes, and connects data

The word `data` hides several different tasks. Supplying an external dataset, managing an audience segment, storing a customer record, and matching identifiers are not one role.

| Role | Customer and inputs | Persistent state | Output / activation | What the role itself does not do |
|---|---|---|---|---|
| **Data provider**[^g-data-provider] | Advertiser, publisher, or platform; its own or collected datasets | Datasets, attributes, or segments | Data for permitted activation, decisioning, or analysis | Not required to store the customer's customer record or make media decisions |
| **DMP**[^g-dmp] | Advertising/marketing team; audience data and campaign signals | Audience profiles and segments in the chosen product model | Segmentation and activation through advertising integrations | Not required to be the system of record for the full customer lifecycle |
| **CDP**[^g-cdp] | Advertiser; first-party events and customer data from the product, CRM, and other systems | Persistent unified customer record | Customer profiles, events, and segments made available to downstream systems | Not required to buy media or assign attribution credit |
| **Identity provider**[^g-identity-provider] | Advertiser, publisher, or platform; identifiers from permitted sources | A mapping or identity graph within the specific solution | Linked or translated identifiers for activation and measurement | Does not create consent, does not register all events, and does not prove the identity of a real person |

**Data provider** sells or provides datasets, attributes, or audience segments. The customer pays for an additional signal: for example, a context classification or an audience attribute that can be used legally and technically. The quality, provenance, and permitted use cases of such data matter, but a deep examination of them is beyond the scope of this chapter.

**DMP (Data Management Platform)** — an advertising-oriented system for managing, segmenting, and activating audience data. **CDP (Customer Data Platform)** maintains a persistent unified customer record and makes customer data available to downstream systems. The historical rule "DMP — cookies and anonymous data only; CDP — PII only" is unreliable: modern products and deployment models overlap. The working boundary lies in the primary task and the record model — advertising audience activation versus a durable customer record.

**Identity provider** links or translates identifiers for permitted activation, measurement, and adjacent use cases. For example, one integration may know the advertiser's customer ID while another knows a platform-specific ID; the identity function helps establish a permissible correspondence. This does not mean the provider has always identified the physical person.

Distinguish four operations:

```text
identity    → links entities or identifiers
tracking    → records events
attribution → assigns conversion credit according to rules
consent     → expresses permission or a choice in a separate governance/legal context
```

An identity provider does not create legal permission merely by matching. Specific identifiers, resolution algorithms, and privacy rules will be covered in chapters 24 and 40–42.

In the running example, the subscription app sends first-party trial and subscription events to the CDP to maintain the customer record. A DMP or platform integration can form and activate a permitted audience segment. An identity provider helps link the necessary identifiers between permitted environments, and an external data provider can enrich the segment with an additional attribute. These functions are optional and may be performed by different products or by a single suite.

## One campaign: data and money kept separate

Let's assemble the roles in one scenario. A subscription app is advertised inside a mobile game. The advertiser has hired an agency; a media buyer at the agency runs acquisition through a DSP. The game's publisher provides the opportunity through an SSP whose product also includes an exchange function. An MMP measures mobile acquisition, a verification provider optionally evaluates delivery, and the data/identity functions are connected only where they are needed and permitted.

This is one possible composition, not a mandatory chain. The advertiser could have bought media directly or through an ad network; the publisher could have used a different monetization path; the agency, DSP, SSP, exchange, MMP, and verification could have belonged to fewer companies or been absent altogether.

### Data flow

```text
advertiser / media buyer
  ── campaign goal, settings, creative metadata ──→ buying and serving systems

publisher app
  ── opportunity, placement, format, permitted context ──→ sell-side and decision systems

decision systems
  ── the selected ad + delivery metadata ──→ publisher app

publisher app and participating systems
  ── impression / click / delivery events ──→ reporting, MMP, verification

subscription app / advertiser backend
  ── install, trial, subscription events ──→ MMP, CDP, and advertiser reporting
```

Not every participant receives every event. The set of data depends on integrations, the environment, contracts, and privacy/platform restrictions. The event flow is often bidirectional and asynchronous; it need not repeat either the creative path or the financial relationships.

### Money flow

```text
advertiser funding
  → agency / buying contract
  → media sellers and intermediaries
  → publisher revenue

separately, depending on the contracts:
advertiser / agency / publisher
  → license, usage, or service fees
  → ad server, MMP, verification, data/identity providers
```

The advertiser is the economic source of media spend, but the agency may be the contractual payer on the DSP's invoice. A DSP or ad network may collect payment for media; sell-side participants may participate in the settlement with the publisher. Part of the sum becomes publisher revenue, and providers receive the agreed fees. The exact model, the deductions, and the path of a hypothetical `$100` are the subject of chapter 4.

Not every box takes a percentage of every advertising dollar. An MMP may receive a subscription or usage fee, a verification provider a service fee, a data provider a charge for data, and an identity provider a license or usage fee. They may not handle media money at all.

Finally, the **invoice path**, the actual **settlement path**, the creative delivery path, and the HTTP/event path may have different endpoints. The advertiser may see one consolidated invoice from the agency even though the money is then distributed across several contracts; the creative may come from an ad server or a CDN; a conversion event may go asynchronously to the MMP and never return through the SSP. The financial scheme above is typical in direction, but not universal in the composition of participants or contracts.

## Why one company occupies several places on the map

Companies combine roles because of acquisitions, shared infrastructure and data, and the desire to offer a managed service, a single workflow, reporting, and contract. Such combining is called **role bundling**; when a company controls several consecutive levels of the value chain, one often speaks of **vertical integration**.

For the customer, bundling may mean fewer integrations, lower operational overhead, faster data exchange, and one UI for setup and reports. But the same properties create risks:

- a conflict of incentives when one side simultaneously represents buyer and seller;
- opacity of fee boundaries and internal money transfers;
- an advantage for its own supply or demand in decisioning;
- self-measurement, when the executor of the deal evaluates its quality itself;
- difficulty exporting data and comparing external alternatives.

Imagine a hypothetical Platform X: it sells a managed media package, gives the media buyer DSP-like controls, delivers creatives, and shows an attribution report in one UI. Calling it merely a "DSP" is not enough. Let's break the suite into functions:

| Platform X function | Separate role card |
|---|---|
| Packages and sells access to media | Ad network-like managed offering |
| Selects opportunities according to campaign rules | DSP-like buying/decisioning |
| Delivers the creative and records delivery | Ad serving |
| Links touchpoints with outcomes | Attribution/measurement |

One login and one invoice do not turn these functions into a single role. For each of them you need to ask separately: who is the customer and the payer, what data comes in and goes out, what decision is made, where the fee arises, and whose interests it may conflict with.

This is the way to analyze an unfamiliar AdTech company: first list the roles it performs, then fill in for each one `problem → customer → payer → data in/out → decision → money`. Only then does it make sense to compare vendors by their labels.

## What this is often confused with

- **"A brand advertiser and a performance advertiser are different kinds of companies."** No: these are orientations of activity. One company can run both.
- **"Agency, media buyer, and DSP are one link."** The agency is an organization, the media buyer is a function, the DSP is a technology platform. They can work together but are not interchangeable.
- **"Ad network is the old name for a DSP."** A network usually offers more managed media aggregation; a DSP is a buyer tool and decision layer. Real suites may combine both functions.
- **"An SSP and an exchange must be different companies" or "they are complete synonyms."** Both extremes are wrong: the sell-side workflow and the transaction function are distinguishable, but often bundled.
- **"An MMP knows the true reason for an install, and a verification provider sees the absolute truth of an impression."** Both work with available measurement points and methodologies. Attribution credit is not causality; a verification result is limited by the integration.
- **"Data provider, DMP, CDP, and identity provider are four names for the user base."** They respectively supply data, organize audience activation, maintain the customer record, and link identifiers.
- **"All roles form a single chain and take a share of the spend."** Paths may be direct or bundled, and many technology providers receive a separate fee and do not participate in the media settlement.

## What to remember

1. The AdTech map describes logical roles, not a mandatory list of companies.
2. The advertiser funds advertising for the sake of an outcome; the publisher creates the media environment and opportunities.
3. Brand and performance are orientations of goals and measurement that one advertiser may combine.
4. The agency is a contractor organization, the media buyer is a function, and the DSP is a tool and decision layer for the buyer.
5. An ad network offers managed media aggregation; a DSP helps the buyer manage purchasing; an SSP serves the sell-side workflow; an exchange performs the transaction function.
6. Advertiser-side and publisher-side ad servers apply different sets of rules, although both roles select, deliver, and record ads.
7. MMP/attribution, verification, data, and identity are cross-cutting functions, not mandatory hops of the creative path.
8. The data flow, the delivery path, the invoice path, and the settlement path need not coincide.
9. One company may perform several roles; bundling reduces integration friction but raises questions about incentives, fees, data boundaries, and measurement independence.

## Check yourself

1. Why can a subscription app simultaneously be a brand and a performance advertiser?
2. How does a media buyer differ from an agency and from a DSP?
3. Why might a publisher use an SSP and a publisher ad server in one flow without considering them one role?
4. Platform X has one UI for buying, ad serving, and attribution. Which separate role cards need to be filled in before evaluating the product?

## Sources and Further Reading

1. [IAB Tech Lab — Programmatic Auction Definitions](https://iabtechlab.com/programmatic-auction-definitions/)
2. [UK Government — Online Advertising Programme consultation](https://www.gov.uk/government/consultations/online-advertising-programme-consultation/online-advertising-programme-consultation)
3. [Competition and Markets Authority — Intermediation in open display advertising](https://www.gov.uk/find-digital-market-research/online-platforms-and-digital-advertising-market-study-appendix-m-intermediation-in-open-display-advertising-2020-cma)
4. [Adjust — What is a Mobile Measurement Partner](https://www.adjust.com/glossary/mobile-measurement-partner-mmp/)
5. [IAB Tech Lab — Open Measurement SDK](https://iabtechlab.com/standards/open-measurement-sdk/)
6. [IAB Tech Lab — Identity Solutions Guidance and Recommended Practices](https://iabtechlab.com/wp-content/uploads/2024/05/Identity-Solutions-Guidance-FINAL.pdf)
7. [CDP Institute — What is a CDP?](https://www.cdpinstitute.org/what-is-a-cdp/)
8. [Oracle Marketing Cloud — CDP vs CRM vs DMP](https://blogs.oracle.com/marketingcloud/cdp-vs-crm-vs-dmp)
