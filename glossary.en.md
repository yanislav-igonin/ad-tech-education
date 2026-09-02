---
id: glossary
type: glossary
chapter: 99
slug: glossary
title: "Glossary"
language: en
---

# Glossary

Definitions of the course's key terms. In the chapters, these terms are marked with a footnote; here they are described in full, with an example.

### RTB (real-time bidding) {#g-rtb}

**RTB (real-time bidding)** — a programmatic buying mechanism in which an individual advertising opportunity (`opportunity`) is put up for an automated auction and sold in a fraction of a second — before the page or app has even shown the ad. Buyers submit bids, usually through a DSP; trading happens on an ad exchange or inside an SSP with an auction function. RTB is not a synonym for programmatic, let alone AdTech: it is one of the automated buying mechanisms within the broader stack.

**Example:** a user opens a news app. The publisher puts the impression up for auction through an SSP; several DSPs, bidding on behalf of different advertisers, return bids within ~100 ms; the winning ad is delivered to the app before the user sees the content.

### Agency {#g-agency}

**Agency** — a contractor company that plans and executes marketing and media work on behalf of an advertiser: develops strategy, prepares `creative`, selects channels, launches a `campaign`, and reports on results. An advertiser can keep media buying in-house, hand it to an agency in full, or split the responsibility. An agency is an organization and a contractual role, as opposed to a media buyer — an operational function that can also work inside an advertiser.

**Example:** a sneaker manufacturer enters the German market. The agency receives a brief and a budget, plans the channels, sets up the `campaign` in a DSP, and reports on results. The advertiser sees one consolidated invoice from the agency, although internally the money is distributed across several contracts — media, platforms, fees.

### Ad network {#g-ad-network}

**Ad network** — an intermediary that aggregates advertising opportunities (`inventory`) from many publishers and sells them to advertisers as a single packaged product: the network takes over supply selection, pricing, and delivery, while the buyer gets one manageable offering instead of a dozen separate contracts. Prices inside the network are usually opaque to the buyer. Historically, many ad networks added auction mechanics and rebuilt themselves as ad exchanges, so both functions are often combined under one brand.

**Example:** it is easier for a small advertiser to buy "100,000 impressions in gaming apps at a CPM of $X" from a single network than to negotiate with each publisher separately. The network itself decides which apps to take impressions from and at what price it bought them from the publishers.

### Ad exchange {#g-ad-exchange}

**Ad exchange** — the transaction layer that connects buyers and sellers in an automated deal, usually through a real-time auction (RTB). The difference from an ad network is transparency: the buyer sees the description of an individual `opportunity` and decides for themselves how much to pay for it, and the price is set by the auction rather than by the network's price list. An exchange is not necessarily a separate company between the DSP and SSP: exchange and SSP functions are often combined in a single product.

**Example:** a DSP on behalf of an advertiser sees from the exchange the description of an impression: the app, the format, the approximate context — and decides within milliseconds whether to bid and how much to pay. The loser pays nothing; the winner gets the impression at the auction price.

### AdTech {#g-adtech}

**AdTech (advertising technology)** — the set of technologies that coordinate the buying, selling, selection, delivery, measurement, and payment for advertising between advertisers, publishers, and intermediaries: from the ad server and DSP/SSP to measurement and verification systems. Programmatic is only part of AdTech: direct deals, reserved buying, and closed platforms also run on AdTech. The boundary with MarTech is drawn by primary purpose: AdTech coordinates paid media, MarTech the customer lifecycle.

**Example:** an app with a subscription buys installs through a DSP, a publisher sells impressions through an SSP, the deal goes through an exchange, an ad server delivers the creative, and an MMP measures installs — all five systems belong to AdTech.

### Digital advertising {#g-digital-advertising}

**Digital advertising** — paid communication by which an advertiser tries to influence the audience's knowledge, attitude, or action in a digital environment. It is a market of coordination between advertisers (demand), publishers (supply), and users, not just banner delivery: the parties' values and goals conflict, and a significant part of AdTech exists to manage those conflicts.

**Example:** a content app shows ads between articles; a subscription service pays for the chance to reach its audience, and the user receives content "in exchange" for attention to the ads.

### Advertiser {#g-advertiser}

**Advertiser** — a market participant that funds advertising for a business result: installs, subscription purchases, growth in awareness. It buys not a person but the opportunity to address an audience in a specific context; it creates demand and sets goals, budget, and creative.

**Example:** a streaming service allocates a budget to acquire subscribers: its DSP looks for impressions in the target audience's apps and pays for each opportunity to show an ad.

### Publisher {#g-publisher}

**Publisher** — the owner or operator of a media environment where advertising opportunities arise: a website, a mobile app, a video service, a game. It monetizes the environment with advertising, creates supply, and decides which placements, formats, and buyers to admit, balancing revenue against user experience.

**Example:** a news app allocates a banner and a full-screen block after an article and opens them to programmatic buyers through an SSP, keeping a cap on impression frequency.

### Demand {#g-demand}

**Demand** — the budgets and intent of advertisers to buy suitable advertising opportunities; the market side around which the `buy side` / `demand side` groups — the people and systems that help plan and buy media (agencies, DSPs). Demand is a market side, not a specific technology: platforms must not be confused with sides.

**Example:** an advertiser allocates $500,000 to acquire users in three countries — that is demand; the DSP through which it buys media belongs to the demand side.

### Supply {#g-supply}

**Supply** — the advertising opportunities available from publishers; the market side around which the `sell side` / `supply side` groups — the people and systems that help describe, sell, and deliver advertising (SSPs, ad networks). Supply is the set of inventory for sale, not the name of a platform.

**Example:** a game app with twenty ad slots and rules for showing them — that is supply; the SSP through which it opens access to buyers is the supply side.

### Advertising inventory {#g-inventory}

**Advertising inventory** — the set of available or forecast opportunities to show advertising, bounded by the environment, the slot, the format, the time, the publisher's rules, and the permissible audience context. Inventory is not a list of users and not a warehouse of pre-produced impressions: an opportunity arises and disappears at the moment the product is used.

**Example:** a game forecasts 10 million full-screen impressions for the next month — that is inventory; a specific opportunity arises only when a player finishes a level.

### Placement (ad slot) {#g-placement}

**Placement (ad slot)** — a predefined slot or rule for ad appearance in a publisher's environment: a banner, a full-screen block after a level, a pre-roll. A placement exists in the product design before a specific opportunity arises and generates a stream of ad opportunities as the product is used.

**Example:** "a full-screen block after completing a level in a game" is a placement; the moment a specific player reaches that point is already an ad opportunity.

### Ad opportunity {#g-ad-opportunity}

**Ad opportunity** — a specific opportunity to select and show an ad that arises when a user reaches a placement. A short-lived event: in a digital environment it can vanish faster than a person can make a decision, so systems process it in milliseconds, and in programmatic it is put up for bidding as a separate unit.

**Example:** a player finished a level — the app sends a request with a description of the context, and before the screen is rendered the systems manage to select and return an ad.

### Impression {#g-impression}

**Impression** — a delivery or display event for the selected ad, recorded by a system under a specific rule; a counting unit, not a fact of human perception. `Served`, `rendered`, and `viewable` are different delivery states, so the counters of different participants in the same deal may not match.

**Example:** an ad server counted 100,000 impressions under the rule "banner loaded," while the measurement provider counted 82,000 under the rule "at least one second of visible area"; both are right under their own rules.

### DSP (Demand-Side Platform) {#g-dsp}

**DSP (Demand-Side Platform)** — a platform that automates the purchase of advertising opportunities for an advertiser: it aggregates access to several supply sources, evaluates each opportunity, and decides whether to bid and how much to pay. It belongs to the demand side not because it "creates demand" but because it acts in the buyer's interest.

**Example:** an advertiser loads a budget, a goal, and audiences into a DSP; the DSP participates in auctions on dozens of exchanges and SSPs and buys impressions while staying within the target cost per install.

### SSP (Supply-Side Platform) {#g-ssp}

**SSP (Supply-Side Platform)** — a platform that helps publishers manage the sale of inventory: it sets buyer access rules, connects programmatic demand (DSPs, exchanges), and runs or forwards the auction. SSP and exchange functions are often combined in a single product.

**Example:** a news website sets minimum prices and a ban on certain ad categories in its SSP; the SSP opens the impressions to hundreds of DSPs and picks the best offer.

### Ad server {#g-ad-server}

**Ad server** — a system that selects, delivers, and logs advertising under given rules. There are publisher-side ad servers (matching direct campaigns, networks, and programmatic demand, managing delivery) and advertiser-side ones (storing creatives, counting impressions and clicks); the term denotes a function, not a market side.

**Example:** a publisher ad server receives a decision from an SSP, a direct campaign, and a network reservation — and decides whose ad to return in this request; meanwhile an advertiser ad server serves the creative and logs the impression.

### Programmatic {#g-programmatic}

**Programmatic** — automated buying and selling of advertising: decisions about each opportunity are made by systems, not people. RTB is only one of its mechanisms; programmatic also includes automated reserved and direct mechanics without an auction. Programmatic is part of AdTech, but not all of AdTech.

**Example:** a guaranteed deal — "impressions from the sports section at a fixed price via an automated agreement" — is programmatic without a real-time auction.

### Creative {#g-creative}

**Creative** — the advertising material that is delivered and shown to the user: a banner, a video, a native format, a playable. Along with targeting rules it is an object of delivery and must match the format and rules of the publisher's environment; for a campaign, several creatives are usually prepared.

**Example:** for a campaign, a 15-second vertical video and a playable version are prepared and uploaded to the DSP with format and size metadata.

### Campaign {#g-campaign}

**Campaign** — an organized set of an advertiser's advertising activity with a goal, a budget, delivery rules, and creatives. Before delivery, its conditions are communicated to the buying systems; objects and events are linked by identifiers such as `campaign_id`.

**Example:** the subscription service's autumn campaign: the goal is installs, the budget is $200,000, three creatives, a frequency cap — everything is set up in the DSP before the first impression.

### Measurement {#g-measurement}

**Measurement** — the function of recording and aggregating advertising events (impressions, clicks, outcomes) for reporting and optimization. Measurement providers give an independent point of observation; different participants have different timestamps and counting rules, so reports do not have to match perfectly. In mobile, the dedicated category is the MMP.

**Example:** an advertiser cross-checks impressions between its own records, the ad server, and the measurement provider — the counters diverge due to different observation points and rules.

### MMP (Mobile Measurement Partner) {#g-mmp}

**MMP (Mobile Measurement Partner)** — a specialized category of measurement providers for mobile: it measures installs and in-app events, performs attribution, and provides independent data to the parties in the deal. Not a synonym for just any measurement system.

**Example:** an app connects an MMP to link a click from an ad with the install from the app store and the subsequent subscription purchase.

### Verification {#g-verification}

**Verification** — an independent assessment of the quality and conditions of delivery: viewability, environment, fraud, compliance with the rules. Verification providers plug in across the chain and take no part in the commercial decision about the deal.

**Example:** a verification provider marks 4% of impressions as non-viewable and 1% as fraud — the advertiser deducts them from payment.

### Intermediary {#g-intermediary}

**Intermediary** — a participant that connects market sides or performs a specialized function: agencies, ad networks, exchanges, ad servers, measurement, verification, and data providers. It is justified when the value of its function (reach, aggregation, interoperability, speed, measurement, risk control) exceeds the cost and complexity; it need not be present in every deal.

**Example:** a small advertiser buys impressions from an ad network because it is not ready to maintain dozens of integrations with publishers directly — the aggregation function justifies the fee.

### Media spend {#g-media-spend}

**Media spend** — the money an advertiser allocates and spends on buying advertising. It passes through the media sellers and ultimately forms publisher revenue, shrinking along the way by fees; it is not a synonym for publisher revenue, nor for intermediary fees — these are different amounts in one chain.

**Example:** of $100 in media spend, $70 reaches the publisher as revenue, platforms take $20, and the agency's fee is $10; the data provider receives a separate subscription outside the media money.

### Publisher revenue {#g-publisher-revenue}

**Publisher revenue** — the part of media spend that reached the inventory owner after deductions by intermediaries and platforms; it differs from advertiser spend by the sum of all fees in the chain. It is formed only from media payments: participants' service and SaaS fees outside the media money do not count toward it.

**Example:** the advertiser spent $100, of which the publisher received $68 after the exchange and the SSP — that is its publisher revenue for this deal.

### MarTech {#g-martech}

**MarTech (marketing technology)** — technologies for the broader management of marketing and the customer lifecycle: customer data, communications, and the advertiser's own channels (CRM, marketing automation, CDP, email/push platforms). It overlaps with AdTech in measurement, attribution, identity, and activation, so the boundary is drawn by the system's primary purpose, not by the vendor's label.

**Example:** a subscription purchase is an outcome signal for AdTech measurement and, at the same time, a trigger for a retention email chain in MarTech.

### Data / identity provider {#g-data-provider}

**Data / identity provider** — a cross-cutting category of providers that supply or link permissible data signals: they help systems interpret context and connect data about the same user across participants. They work in parallel to the buying chain, not "between" two mandatory neighbors.

**Example:** an identity provider issues a shared key by which, within permitted rules, the DSP and the publisher recognize the same user across different requests.

### Media buyer {#g-media-buyer}

**Media buyer** — a person, team, or function that selects media, platforms, and buying terms, allocates spend, and sets up campaigns. It is an operational role, not an organization: a media buyer can work inside an advertiser, inside an agency, or at another buying organization. Not a synonym for an agency (a contractor organization) and not a synonym for a DSP: the person formulates and configures decisions, while the platform executes part of the buying workflow at scale.

**Example:** a media buyer at an agency receives a channel plan and a budget, creates the campaign in a DSP, sets audiences and bids, and redistributes spend between platforms over the month based on report results.

### Brand advertising {#g-brand-advertising}

**Brand advertising** — an orientation of advertising that primarily changes the audience's awareness, consideration, or perception: knowledge, consideration, and attitude toward the product. It is evaluated on lagging metrics, not on immediate action. This is an orientation, not a company type: one advertiser can combine brand and performance activity.

**Example:** a streaming service runs a video campaign to introduce the brand and evaluates it by the lift in awareness and intention, not by installs over a week.

### Performance advertising {#g-performance-advertising}

**Performance advertising** — an orientation of advertising built around a measurable action and the cost of obtaining it: registrations, trials, installs, purchases. It is evaluated through attribution and the cost of the outcome. This is an orientation, not a company type and not a synonym for "measurable advertising": the goal, the evaluation horizon, and the expected evidence of the result differ from brand advertising.

**Example:** an app's acquisition campaign is optimized in a DSP for cost per install: the bid is adjusted for each source to stay within the target CPI.

### Attribution {#g-attribution}

**Attribution** — the rules by which the available advertising touchpoints (impression, click) are matched to outcomes (install, registration, purchase) and receive credit for the conversion. Attribution answers the question "which source was credited with the action under the chosen rules," not "whether the ad was the true cause": credit does not prove causality. Attribution providers are a separate cross-cutting category; in mobile, the MMP.

**Example:** a user saw a video in a game, clicked a banner the next day, and subscribed; under the "last click" rule the MMP assigns credit to the banner, and the other sources get no credit, even if they played a part.

### DMP (Data Management Platform) {#g-dmp}

**DMP (Data Management Platform)** — an advertising-oriented system for managing, segmenting, and activating audience data: it collects campaign signals and external datasets, builds audience profiles and segments, and activates them through advertising integrations. It does not have to be the system of record for the full customer lifecycle. The historical rule "a DMP is only cookies and anonymous data" is unreliable; the working boundary with the CDP runs along the primary task — advertising audience activation versus a durable customer record.

**Example:** a media team builds in a DMP the segment "played casual games, saw the ad, but did not install the app" and activates it in a DSP for an acquisition campaign.

### CDP (Customer Data Platform) {#g-cdp}

**CDP (Customer Data Platform)** — a system that collects first-party events and customer data from the product, CRM, and other systems into a persistent unified customer record and makes profiles, events, and segments available to downstream systems. It does not buy media and does not assign attribution credit; it belongs to customer lifecycle management, which makes it part of MarTech.

**Example:** a subscription app sends trial and subscription events to the CDP; the CDP assembles a unified profile and passes the segment "completed the trial, did not pay" to the advertising and email systems.

### Identity provider {#g-identity-provider}

**Identity provider** — a provider that links or translates identifiers from permitted sources for activation, measurement, and related use cases: for example, matching an advertiser's customer ID with a platform-specific ID. It does not create consent and does not prove the identity of a real person: matching within one solution is not legal permission. It differs from a data provider in its task — it does not supply datasets but establishes correspondence between identifiers.

**Example:** an advertiser and a publisher use different identifiers for the same user; the identity provider translates them into a common identifier so that impression frequency is counted per person rather than twice.

### Metric contract {#g-metric-contract}

**Metric contract** — the complete definition of a metric by which its number can be reproduced and interpreted: the event definition, measurement point, filters and deduplication, numerator/denominator, dimensions, period and windows, currency, perspective, and ledger boundary. A metric's name without a contract does not fix its meaning: the same formula on different contracts answers different questions.

**Example:** `CTR = 2%` from an ad server over rendered impressions and filtered clicks is not the same number as `CTR = 2%` from a platform over served impressions and all clicks: the names match, the contracts differ.

### Click {#g-click}

**Click** — a qualifying user-initiated interaction with an ad, recorded under a specific system's rule. Even a single action has several measurement points: initiated, measured (click tracker), received (destination), and resolved (landing page) clicks need not match due to dropped connections, redirect chains, and filters.

**Example:** the user clicked a banner, but the connection dropped on a redirect: the click tracker counted a measured click while the destination received no request — the counters diverge, and both are honest under their own rules.

### Conversion {#g-conversion}

**Conversion** — a valuable action or outcome that the advertiser has defined as significant (install, trial, first payment, renewal, purchase) and that a system has counted under its measurement and attribution rules. Conversions cannot be summed without an explicit counting rule: one click can lead to several conversions. An observed conversion is a recorded event; an attributed conversion is an event to which an attribution rule assigned credit; neither proves causality.

**Example:** a click led to an install, then to a trial and a subscription payment — under the reporting rules these are three conversions of one interaction, and the total depends on the counting mode (one or each conversion per interaction).

### Viewable impression {#g-viewable-impression}

**Viewable impression** — an impression that met the applicable geometry/time criteria of viewability (the classic MRC benchmark: at least 50% of the creative's pixels on screen for one continuous second for display and two for video). Viewable means a standardized opportunity to see, not a person's attention; non-viewable (the measurement took place, the criteria were not met) is not the same as non-measurable (the status could not be determined).

**Example:** the banner loaded and rendered, but half of its area stayed outside the viewport beyond the threshold — the measurement marks it non-viewable, even though the rendered impression took place.

### Reach {#g-reach}

**Reach** — the de-duplicated number of unique entities (persons, devices, households, accounts, or a modeled audience) that received at least one qualifying exposure in a period, or the share of such entities in an explicitly defined population: `reach rate = reached unique entities / declared universe × 100%`. Comparable only with identical entity definition, exposure rule, population, de-duplication scope, and period.

**Example:** a campaign reached 20,000 de-duplicated persons out of a universe of 200,000 — a reach count of 20,000 and a reach rate of 10%; the same impressions counted by device IDs would give different numbers.

### Frequency {#g-frequency}

**Frequency** — the average number of qualifying exposures per reached unique entity over the same period: `frequency = qualifying impressions / reached unique entities`. It is an average, not a distribution: it does not mean that every person saw the ad the same number of times.

**Example:** 60,000 qualifying viewable impressions on 20,000 de-duplicated persons — an average frequency of 3, although some users had one impression and others fifteen.

### CTR (Click-Through Rate) {#g-ctr}

**CTR (Click-Through Rate)** — the share of selected impressions after which the selected clicks were recorded: `CTR = qualifying clicks / counted impressions × 100%`. The number depends on the click/impression basis (served or rendered, filtered or all) and the population; a high CTR by itself does not indicate quality traffic, conversions, or causal lift.

**Example:** 160 clicks on 8,000 counted impressions — a CTR of 2%; replacing served impressions with rendered changes the denominator and the result.

### CVR (Conversion Rate) {#g-cvr}

**CVR (Conversion Rate)** — the share of qualifying conversions among the declared eligible precursor events: `CVR = qualifying conversions / declared eligible precursor events × 100%`. A bare CVR hides the transition: only named transitions such as click-to-install or install-to-trial are comparable; a value above 100% is possible with several conversion actions on one interaction.

**Example:** 24 attributed subscriptions on 160 eligible clicks — a click-to-subscription CVR of 15%; the same campaign has a different click-to-install CVR, and the two cannot be compared directly.

### CPM (Cost per Mille) {#g-cpm}

**CPM (Cost per Mille)** — the cost of a thousand counted impressions for the buyer: `CPM = advertiser cost or spend / counted impressions × 1,000`. The term is ambiguous without a contract: it can mean a pricing basis, a rate, a bid, or a post-fact observed average CPM; the observed CPM answers the question "how much did the buyer spend per thousand counted impressions."

**Example:** $96 of spend on 8,000 counted impressions — an observed CPM of $12, even if the bids in the auction were different.

### eCPM (effective CPM) {#g-ecpm}

**eCPM (effective CPM)** — the seller's recognized revenue per thousand counted impressions: `eCPM = recognized revenue / counted impressions × 1,000`. Usually the publisher's perspective; it makes it possible to compare demand paid on CPM, CPC, or CPA on a common realized-revenue basis. Not a synonym for CPM: the numerators belong to different ledger boundaries.

**Example:** a seller received $800 of recognized revenue for 80,000 counted impressions — an eCPM of $10, even though buyers paid on different models: one on CPM, another on CPC, a third on CPA.

### CPC (Cost per Click) {#g-cpc}

**CPC (Cost per Click)** — the cost or spend per qualifying clicks under a disclosed rule: `CPC = cost / qualifying clicks`. A bid/target CPC is not the actual average CPC: the former is a bid or an optimization target, the latter is a post-fact average.

**Example:** $96 on 160 qualifying clicks — an average CPC of $0.60, regardless of what bids were placed during the period.

### CPA (Cost per Action) {#g-cpa}

**CPA (Cost per Action)** — the cost per advertiser-defined qualifying actions: `CPA = cost / qualifying actions`. The action is defined by the campaign contract — a trial, an order, a lead, or a subscription, not necessarily a new customer — so a CPA cannot be read without the name of the action or compared between campaigns directly.

**Example:** $96 for 24 attributed subscriptions — a CPA of $4 with action = attributed subscription; for a neighboring campaign the action is a lead, and its CPA is not comparable with this number.

### CPI (Cost per Install) {#g-cpi}

**CPI (Cost per Install)** — the cost of mobile acquisition per qualifying installs: `CPI = cost / qualifying installs`. The install count depends on the measurement and attribution rules, so a CPI is comparable only under named install-counting rules.

**Example:** $5,000 of spend on 2,500 attributed installs — a CPI of $2 under the chosen MMP's rules; a different attribution window gives a different install count and a different CPI.

### CPL (Cost per Lead) {#g-cpl}

**CPL (Cost per Lead)** — the cost per business-defined qualifying leads: `CPL = cost / qualifying leads`. Lead definitions and quality differ between businesses, and a lead is not yet a customer, so a low CPL is useless without qualification.

**Example:** $2,000 for 100 submitted forms — a CPL of $20; if a quarter of the leads fail qualification, the effective cost is noticeably higher.

### CAC (Customer Acquisition Cost) {#g-cac}

**CAC (Customer Acquisition Cost)** — the business's allocated acquisition costs per new customer: `CAC = allocated acquisition costs / new customers`. Broader than the platform CPA: the numerator can include media, agency, sales, and onboarding costs, and a new customer is defined by a business rule (for example, the first confirmed payment). A platform CPA cannot be renamed a CAC until the customer event, period, cost allocation, and refunds are agreed.

**Example:** the platform report shows a $4 CPA per subscription, but the business included media, agency, and onboarding in its acquisition costs and recognizes a customer from the first payment — its CAC turned out to be $7.

### Revenue {#g-revenue}

**Revenue** — the amount recognized by the chosen entity under its accounting rules on its ledger boundary. Estimated dashboard value, invoiced amount, settled amount, and recognized revenue can be different states of one chain; for comparison, the period, timezone, currency conversion, taxes/refunds, and participant must be agreed.

**Example:** the platform recognized $100 of revenue for the deal, while the publisher recognized $68: both amounts are correct, but they are different entities with different revenue-recognition rules.

### Cost {#g-cost}

**Cost** — the expenses of the entity whose economics are being analyzed, in the chosen scope: for an advertiser, the media cost; for a platform, the downstream cost; for a business, a broader set of expenses. Not a synonym for spend: spend is the buyer's outlay on media, while cost can include non-payment and out-of-media components and is always tied to a perspective.

**Example:** an advertiser spent $96 in media spend, but its full cost including product delivery, agency, and operations is $600; ROI is calculated on the second amount.

### ROAS (Return on Ad Spend) {#g-roas}

**ROAS (Return on Ad Spend)** — media efficiency: attributed conversion value or revenue per ad spend: `ROAS = attributed conversion value or revenue / ad spend`; written as `5.0x` or `500%`. Attribution-dependent: it depends on the attribution rules and the chosen value field, and without a causal design it does not prove incremental return. A high ROAS is compatible with a negative ROI.

**Example:** $480 of attributed conversion value on $96 of ad spend — an ROAS of 5.0x; but at a full cost of $600 the same campaign loses money.

### ROI (Return on Investment) {#g-roi}

**ROI (Return on Investment)** — the profitability of a broader investment scope: `ROI = net profit / total relevant investment cost = (return − total relevant cost) / total relevant cost`. Unlike ROAS, it uses the full chosen cost scope, not just ad spend.

**Example:** a return of $480 at a full cost of $600 — a net profit of −$120 and an ROI of −20%, although the ROAS on media spend is 5.0x.

### ARPU (Average Revenue per User) {#g-arpu}

**ARPU (Average Revenue per User)** — the selected revenue across all eligible users of the chosen population or cohort for a period: `ARPU = selected revenue / all eligible users`. It requires a user definition, revenue categories (purchase, subscription, ad), a period, and a cohort/population; it includes non-paying users.

**Example:** 1,000 active users brought $1,000 of recognized revenue in a month — an ARPU of $1; this number says nothing about lifetime without a cohort and a horizon.

### ARPPU (Average Revenue per Paying User) {#g-arppu}

**ARPPU (Average Revenue per Paying User)** — the purchase revenue per paying user: `ARPPU = selected purchase revenue / paying users`. It divides only by payers and requires a payer event, purchase revenue, refund rules, and a period; it is always higher than the ARPU of the same population.

**Example:** the same $1,000 of purchase revenue from 100 payers out of 1,000 users — an ARPPU of $10 with an ARPU of $1.

### LTV (Lifetime Value) {#g-ltv}

**LTV (Lifetime Value)** — the cumulative observed or predicted value of a cohort's members: `LTV = cumulative observed or predicted value / cohort members`. It requires a cohort, a horizon, an identity rule, a value basis (revenue or contribution), and an observed/predicted status; revenue LTV does not subtract costs, and contribution LTV is calculated on the agreed marginal basis. Without these definitions, "a user's LTV" is not a defined scalar.

**Example:** the observed 30-day revenue LTV of an install cohort is $4.20; the predicted 12-month contribution LTV from a model is $6.80: these are different metrics, not one number with different precision.

### Fill rate {#g-fill-rate}

**Fill rate** — the share of eligible ad requests that led to a fill, for example `counted filled impressions / eligible ad requests`. A publisher/ad server metric of the request → delivery transition; there is no safe vendor-neutral denominator — a product may divide impressions, matched responses, or another fill event by requests, opportunities, or ad units. A fill is not a final outcome: a matched response may not render and may not become a counted impression. Not a synonym for match, response, or delivery rate.

**Example:** 80,000 counted impressions on 100,000 eligible ad requests — a fill rate of 80%; some filled responses did not become impressions, so the fill rate does not equal final impression delivery.

### Win rate {#g-win-rate}

**Win rate** — the share of submitted eligible bids that won the auction: `winning bids / submitted eligible bids`. A buyer/deal metric of the bid → auction win transition; it requires the population to be disclosed. A win notice is not yet delivery and not a billing event: the auction can select a bid as the winner, but the creative may not be delivered or the impression may not become billable.

**Example:** 9,000 wins on 45,000 bids — a win rate of 20%, while the counted/billable impressions are 8,000: win and billing are different event points, and the discrepancy is not an error.

### Ledger boundary {#g-ledger-boundary}

**Ledger boundary** — the boundary within which an entity recognizes and records amounts and events under its own rules: the same amount is revenue on one boundary and a downstream media/traffic cost on another. Because of different ledger boundaries, the reports of the advertiser, the platform, and the publisher about the same deal naturally do not match and do not have to match.

**Example:** the advertiser spent $100; the buying platform recognized $100 of revenue on its boundary, and the publisher saw $68 — the numbers differ because each entry lives in its own ledger.

### Pricing basis {#g-pricing-basis}

**Pricing basis** — the contractual rule for calculating a price: the object for which the buyer pays — an impression, click, action, install, lead, a share of proceeds, a period of access to software, or another agreed result. A metric's name in an interface (`CPM`, `CPC`, `CPA`) does not by itself fix the basis: the same name can be a contractual price, a bid, or the actual average after the events, so only the basis named in the contract creates a monetary obligation.

**Example:** a contract of "`$10 CPM`, billable event — rendered impression" and a contract of "`$10 CPA`, billable event — subscription" give the same price figure but a different distribution of risk along the funnel.

### Billable event {#g-billable-event}

**Billable event** — a qualifying event defined by the contract, after which the payee is entitled to accrue the billable amount — the sum under the pricing basis after counts, rates, validation, and contractual adjustments; it is not necessarily invoiced, recognized as revenue, or paid. The event is set by contract policy, not automatically by the protocol: an auction win, a win notice, and a billing notice are different points, and a win does not guarantee delivery or a charge.

**Example:** in OpenRTB the win notice (`nurl`) and the billing notice (`burl`) are separate — the auction picked a bid as the winner, but the accrual arises only after the contractual event, for example a rendered impression.

### Revenue share {#g-revenue-share}

**Revenue share** — the contractual distribution of a named revenue or proceeds base between the parties in a specified share. Without disclosure of the base it is undefined: you need to know whose proceeds, on which ledger boundary, for which period, before or after which agreed adjustments, and who performs the calculation; a share of one boundary does not equal a share of the original advertiser spend.

**Example:** the SSP retains 15% of `$80` of proceeds on its boundary — `$12`; relative to the original `$100` of advertiser spend, the same `$12` is 12%.

### Fixed fee {#g-fixed-fee}

**Fixed fee** — an amount agreed in advance for a period, a scope, or a deliverable that does not depend on the volume of media transactions. An entirely separate money flow relative to media money: it is not deducted from the media dollar and does not become a publisher payout or a take rate. The provider bears the risk that the agreed scope will require more work.

**Example:** `$2,000/month` for access to an ad server and a usage tier — a service charge under a separate contract, even if the number of processed impressions affects the tier.

### SaaS pricing {#g-saas-pricing}

**SaaS pricing** — the payment model for a software platform: subscription, seats, usage tiers, or processed volume for access to the product. It forms a separate software/service flow: the platform's usage event does not automatically become a media event, and a SaaS charge does not turn the relationship into a purchase of inventory.

**Example:** the platform charges `$2,000/month` plus a tier by the number of processed impressions; growth in volume changes the tier but does not make this payment a media cost.

### Markup {#g-markup}

**Markup** — a surcharge on the base cost expressed as a share of the cost denominator: `markup = (selling amount − acquisition cost) / acquisition cost`. It is not the spread (the absolute difference) and not the gross margin (which uses the reporting entity's accounting revenue and cost of revenue); comparable only when the buy/sell amounts are named.

**Example:** a network buys media for `$80` and sells it to the advertiser for `$100`: the spread of `$20` is a 25% markup on the acquisition cost and, at the same time, a 20% take rate relative to the spend.

### Take rate {#g-take-rate}

**Take rate** — the retained amount relative to a named transaction flow on the chosen boundary: `take rate = retained amount / named transaction flow`. Comparable only when the numerator, denominator, and included fees are disclosed: the same amount yields different rates relative to the boundary proceeds and the original advertiser spend.

**Example:** the SSP retains `$12` out of `$80` of proceeds — a take rate of 15% on its boundary, but 12% relative to the original `$100` of spend.

### Spread {#g-spread}

**Spread** — the absolute difference between the selling amount and the acquisition/downstream amount on a named boundary. The economic core of an intermediary's resale and arbitrage models; the markup and the take rate are computed from the same spread with different denominators and are not comparable without the named boundary.

**Example:** buying media for `$80` and selling for `$100` — a spread of `$20`; this is a 25% markup on the cost and a 20% take rate on the spend at the same time.

### Proceeds {#g-proceeds}

**Proceeds** — the amount of the transaction inflow before the agreed distribution on the chosen boundary. The word `gross` next to proceeds describes the base before the split, not automatically `gross revenue` in financial reporting: for calculating shares, the boundary, the period, and the permitted deductions matter.

**Example:** SSP-boundary proceeds of `$80` are split into `$12` retained and `$68` publisher share; relative to the original `$100` of advertiser spend, these are different percentages.

### Retained amount {#g-retained-amount}

**Retained amount** — the part of the transaction flow remaining with a participant on its boundary before its own costs. It characterizes transaction economics but is not recognized revenue or profit: the accounting presentation and the expenses are determined by the entity's separate policy.

**Example:** in the decomposition `$100 → $80 → $68`, the network retained `$20` and the SSP retained `$12` — both amounts are flow residuals, not accounting profit.

### Gross/net revenue presentation {#g-gross-net-revenue}

**Gross/net revenue (presentation)** — a variant of how the reporting entity presents revenue: gross shows the agreed payment in full, net only the fee or commission. The choice follows the contract-specific principal-agent assessment for the specific specified good/service, not the logic of "money before/after expenses": the product's label, the invoice, or gross billings do not by themselves determine the conclusion.

**Example:** a network with `$100` sold and an `$80` supplier component shows, under a principal conclusion, revenue of `$100` and cost of revenue of `$80`; under an agent conclusion, only the net fee of `$20`.

### Gross billings {#g-gross-billings}

**Gross billings** — the amount invoiced to clients or passed through collection before excluding supplier components; a broader quantity than recognized revenue and not its synonym. Billings describe billing, not the principal/agent accounting conclusion.

**Example:** under an agent conclusion the platform shows gross billings of `$100` with receivables/payables, while the recognized revenue is only the net fee of `$20`.

### Cost of revenue {#g-cost-of-revenue}

**Cost of revenue (CoR)** — the expenses that the reporting entity classifies as directly connected with earning the recognized revenue under its policy. Not just any cash outflow: the composition is determined by the company's policy, and operating expenses, interest, and taxes sit below gross profit.

**Example:** under gross presentation, the supplier component of `$80` is shown as cost of revenue next to the recognized revenue of `$100`.

### Gross margin {#g-gross-margin}

**Gross margin** — the share of recognized revenue remaining after the cost of revenue of the same reporting entity on the same accounting basis: `gross margin = (recognized revenue − cost of revenue) / recognized revenue`; gross profit is the numerator of this formula. Not the same as the take rate, which divides the retained amount by a named transaction flow.

**Example:** gross presentation: revenue of `$100`, CoR of `$80` — gross profit of `$20`, a margin of 20%; the same business in net presentation shows a margin of 100% on the same `$20` economics — the margin depends on the presentation.

### Principal / agent {#g-principal-agent}

**Principal / agent** — the accounting assessment of the reporting entity's role with respect to a specific promised specified good/service: the principal controls it before transferring it to the customer and presents the payment gross; the agent arranges for its provision by another party and presents the net fee/commission. Control is the ability to direct the use and obtain significant benefits before transfer; `primary responsibility`, `inventory risk`, and `pricing discretion` are evidence, not a mechanical score; one company can be a principal in one flow and an agent in another.

**Example:** an AdTech platform, under an agent conclusion, recognizes the net fee on platform transactions, but may be a principal on individual insertion-order campaigns where it itself commits to the delivery.

### Arbitrage {#g-arbitrage}

**Arbitrage** — an intermediary model that buys media/traffic cheaper and sells it dearer, or buys on one pricing basis and sells on another. The economics rest on the spread in exchange for accepted risk: volume/fulfillment, basis mismatch, and reconciliation risk can turn the spread into a loss. Not every intermediary fee is arbitrage, and arbitrage is not automatically abuse; the problem is the opacity of the buy/sell basis and the spread to the customer.

**Example:** a network committed to buying a batch of media for `$80` but sold the advertiser only part of the agreed scope — the cost of the unsold remainder falls on it, and the spread shrinks or becomes a loss.

### Basis mismatch {#g-basis-mismatch}

**Basis mismatch** — buying and selling the same media on different pricing bases, for example buying impressions on a CPM and selling clicks or actions on a CPC/CPA. It adds performance risk to arbitrage: the intermediary's revenue depends on the realized CTR/CVR and validation, while the original media cost remains if the downstream billable amount does not cover it.

**Example:** an intermediary bought impressions for `$80` expecting 100 clicks, but 60 were recorded — the CPC revenue does not cover the media cost.

### Optimization target {#g-optimization-target}

**Optimization target** — the outcome toward which a bidding system tunes its future decisions, for example `target CPA`. It does not turn the contract into CPA billing: the payment model establishes the contract, the realized metrics describe what happened post-fact, and the optimization target influences only decisions before the event.

**Example:** the advertiser pays CPC for qualifying clicks while the system optimizes toward a `target CPA` on subscriptions — the billing basis and the optimization target coexist in one campaign.

### Ad account (advertiser account) {#g-ad-account}

**Ad account (advertiser account)** — a tenant on an advertising platform within which campaigns and related settings exist; it forms several boundaries at once: ownership and access (the operators' roles and permissions), the billing identity, the currency and time zone, the namespace of identifiers, and the shared configuration (data sources, brand assets, defaults). The advertiser's legal company and the ad account are not the same thing: one company may have several accounts across regions, brands, and currencies, and one account may serve several initiatives of the same legal entity.

**Example:** Subscription App Ltd. runs an EU ad account (EUR, time zone Europe/Berlin) and a separate US ad account (USD); the agency gets delegated access to both, but the owner and the billing identity remain with the advertiser.

### Manager account {#g-manager-account}

**Manager account** — the platform's administrative layer that gives an agency or an internal group centralized delegated access to several ad accounts. This is administrative access, not an additional delivery layer: a manager account does not participate in the delivery hierarchy of each campaign.

**Example:** an agency gets manager access to the ad accounts of ten clients — operators sign in through a single login, but each account's budget, targeting, and reporting remain separate.

### Ad {#g-ad}

**Ad** — the executable delivery unit of a campaign: it links the parent group (ad group or ad set), the advertiser identity, the creative, the destination, tracking, and the status. An ad is not the same as a creative: one creative can run in several ads with different parent rules, destinations, and states.

**Example:** a video creative is reused by two ads: one leads to the store listing for new users, the other deep-links into the app for those who have installed it; each ad has its own ID, status, and tracking settings.

### Ad group / ad set {#g-ad-set}

**Ad group / ad set** — the intermediate level of the campaign hierarchy between the campaign and the ad, grouping ads with shared execution rules. The names and the set of fields are vendor-specific, and there is no universal schema: in the Google-like model, the ad group groups closely related ads and triggering criteria (for example, related keywords); in the Meta-like model, the ad set holds the audience, placements, optimization, bid, budget, and schedule.

**Example:** in a Meta campaign, the ad set "US" contains the audience, placements, and budget, and inside it — three ads with different creatives; in Google Ads, the ad group with keywords plays the same middle-layer role.

### Campaign objective {#g-campaign-objective}

**Campaign objective** — the high-level business intent or setup guidance communicated to the platform when the campaign is created: awareness, traffic, leads, app promotion, sales. The objective suggests campaign types, features, and defaults, but need not match the event that the optimizer directly predicts: the optimization event is chosen separately.

**Example:** the subscription service selects the objective `App promotion` and the optimization event `paid_subscription`: the objective describes the intent, while the signal observed for delivery is determined separately.

### Targeting {#g-targeting}

**Targeting** — the campaign's eligibility rules: which opportunities, users, or contexts are permitted or preferred for showing an ad — geo, device, context, audience/keyword criteria, exclusions. Targeting answers the question "for which opportunities/users/contexts is showing possible," as opposed to placement ("where exactly"); even if the API stores them in one object, these are different axes, and an opportunity must pass the constraints of both.

**Example:** an ad set is limited to the geo `DE`, mobile devices, and the exclusion "already installed the app"; within these rules, showing is possible only in the selected placements.

### Bid strategy {#g-bid-strategy}

**Bid strategy** — a policy that translates the optimization goal and constraints (a target or a cap) into auction bids. The strategy, its target/cap, the actual bid for a specific opportunity, and the billable price are four different entities: a single numeric `target CPA` is not the actual bid, and the actual bid does not by itself determine the billable amount.

**Example:** the strategy "maximize conversions with a target CPA of $4" decides for itself how much to offer for each impression; the actual bid may be $1 or $9, and the pricing basis of the contract determines the charge.

### Budget {#g-budget}

**Budget** — a constraint on the available spend over a given scope (a campaign, an ad set, a shared pool of several campaigns) and time basis. Common are the daily budget (a hard calendar cap, an average daily target, or another form — the product defines this) and the lifetime/flight budget for the whole interval. A budget constrains spending but does not guarantee inventory, conversions, even pacing, or an exact invoice amount.

**Example:** a campaign received a lifetime budget of €700 for a seven-day flight with two ad sets — you cannot conclude either €100 per day or €350 for each ad set: the allocation depends on the opportunities and the product configuration.

### Pacing {#g-pacing}

**Pacing** — the policy of distributing spend over time within budget constraints: whether to spend evenly, accelerate on cheap or high-quality opportunities, or hold back the budget. Pacing allocates the resource but does not promise even spending: the available opportunities and the allocation change.

**Example:** with a lifetime budget of €700 for a week, the system may spend €180 on the first day on cheap inventory and less on the rest — pacing optimizes the result, not calendar evenness.

### Schedule (flight) {#g-schedule}

**Schedule (flight)** — the campaign's temporal eligibility: the start and end, the account time zone in which the dates are interpreted, and, where the product supports it, dayparting (the permitted days of the week and hours). Before the start, the campaign can be enabled but have the effective status `pending`; after the end it finishes, even if part of the budget was not spent.

**Example:** a campaign is enabled with a start of 2026-09-07 00:00 Europe/Berlin — before that date there are no impressions, and the dayparting "working hours only" makes it temporarily ineligible within the active flight.

### Destination (landing page) {#g-destination}

**Destination (landing page, final URL)** — the first target surface after an interaction with the ad: a web page, an App Store/Google Play listing, or a deep link into an app. It is part of the user path, not a tracking record: the tracking template and URL parameters control the measurement path, but not the landing page.

**Example:** the ad promises premium features and leads to a store listing — the destination must describe the same product and offer, otherwise the creative's promise and what the user sees diverge.

### Tracking settings {#g-tracking-settings}

**Tracking settings** — the campaign's observability configuration: the transmitted identifiers (campaign/group/ad IDs), URL parameters, macros, the tracking template and final URL suffix, the event sources (pixel, app SDK, server-to-server integration, MMP), the selected conversion actions, and the attribution configuration boundary. Tracking settings govern the measurement path and do not replace the destination; URL parameter names are not an industry standard.

**Example:** the tracking template routes the click through a measurement domain with the macros `{campaignid}` and `{creative}`: the platform substitutes the actual IDs at the moment of the click, and the user goes to the destination their own way.

### Learning phase {#g-learning-phase}

**Learning phase (learning status)** — the state of the optimizer in which the delivery/bidding model gathers evidence after launch or a material configuration change: earlier data describe the new decisions less accurately. Learning is one of the axes of the operational state alongside the configured, effective, and review statuses, not the opposite of active: impressions and spend continue, and vendor-specific significant edits (targeting, creative, optimization event, the set of ads, the bid strategy) can return the optimizer to learning without changing the configured status.

**Example:** an ad set with stable delivery on installs is switched to the optimization event `paid_subscription` — the configured status remains `active`, but the optimizer is back in learning until it has gathered enough data on the new event.
