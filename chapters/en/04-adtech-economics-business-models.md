---
id: ch-04
type: chapter
part: I
chapter: 4
slug: adtech-economics-business-models
title: "AdTech Economics and Business Models"
language: en
status: draft
toc_requirements: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11", "4.12", "4.13", "4.14", "4.15"]
prerequisites: [ch-01, ch-02, ch-03]
---

# AdTech Economics and Business Models

## The gist: the price follows the contract, not the label in the dashboard

`CPM`[^g-cpm], `CPC`[^g-cpc], or `CPA`[^g-cpa] in an interface does not yet explain what is being paid for. The same label can be a contractual price, a `bid`, an optimization target, or a post-event average. The monetary obligation is created by the contractual **pricing basis**[^g-pricing-basis] together with the definition of a **billable event**[^g-billable-event] — a qualifying event after which an amount can be charged. Even an auction win[^g-win-rate] does not have to be billable in itself.

To read the economics of a deal, break it down into six independent layers:

| Layer | Main question | Example |
|---|---|---|
| Contractual pricing | On which basis was payment agreed? | `$10 CPM` per thousand qualifying impressions[^g-impression] |
| Billing | Which event creates the charge, and for what amount? | Render or another billing signal per contract policy |
| Optimization | Which outcome changes the system's future decisions? | `target CPA` on a subscription |
| Participant ledger | For whom is the amount spend, cost, payout, or retained amount? | `$100` advertiser spend; `$80` media cost of the intermediary |
| Accounting presentation | What does a particular entity recognize as revenue and cost? | Gross or net presentation |
| Settlement | When did the accrual become an invoice, and the obligation cash? | Month-end invoice, paid later |

**Pricing basis** is the contractual rule for calculating the price: per impression, click[^g-click], action, share of proceeds[^g-proceeds], a period of access to software, or another agreed object. **Billable amount** is the amount calculated under this rule after counts, rates, validation, and contractual adjustments. It is not necessarily invoiced yet, recognized as revenue, or paid in cash.

This decomposition explains the whole chapter: the parties choose not a pretty metric but a boundary of an observable event, a price, and a risk allocation; then each side records the result in its own ledger.

## CPM, CPC, and outcome pricing: who bears the risk until the next event

The funnel can stop after any step:

```text
opportunity → qualifying impression → qualifying click → install/lead/action → business value
```

The deeper the billable event, the longer the payee — the party awaiting payment — finances delivery without a guaranteed charge. But the risk does not "migrate" wholesale: after the paid event, the buyer still risks the quality of the next outcome.

| Pricing model | Contractual billable event | Payee risk before the charge | Advertiser risk after the charge | What must be defined |
|---|---|---|---|---|
| **CPM** | A thousand qualifying impressions | Receive and confirm the chosen impression event | Click, conversion[^g-conversion], and subsequent value may never occur | `served`, `rendered`, `viewable`[^g-viewable-impression], or another impression basis; filters and count owner |
| **CPC** | Qualifying click | Impressions may not lead to a click | The click may be low-quality and not produce a conversion | Click point, user initiation, deduplication, invalid-click filters |
| **CPA** | An agreed action, such as a paid subscription | Bring the user to the action and obtain valid attribution[^g-attribution]/validation | The action may have low margin, retention, or lifetime value[^g-ltv] | Exact action name, attribution rule, validator, approval state |
| **CPI**[^g-cpi] | Valid attributed install | Delivery and clicks may not lead to a counted install | The install may not launch, retain, or monetize | Install definition, attribution/validation owner, reinstall policy |
| **CPL**[^g-cpl] | Qualifying lead | Traffic may not produce an accepted lead | The lead may not pass further qualification or become a customer | Lead fields and criteria, duplicate/rejection rules, who accepts the lead |

For CPM the seller earns the right to a charge earlier in the funnel, so the advertiser[^g-advertiser] takes most of the post-impression performance risk. For CPC the payee takes the impression-to-click risk, and the advertiser the post-click risk. In CPA/CPI/CPL the payee takes more delivery, conversion, and measurement[^g-measurement] risk up to the deep event; the advertiser keeps the risk of the quality and monetization of the outcome. Fraud, attribution disputes, and caps can change the accepted count, but their mechanics are covered later.

The `billable event` is set by contract policy, not automatically by the protocol. In the programmatic[^g-programmatic] flow, IAB Tech Lab distinguishes the auction win from the event after which the auction becomes billable. OpenRTB also separates the win notice (`nurl`) from the billing notice (`burl`): a win does not guarantee delivery, and the billing signal depends on the policy of the publisher[^g-publisher] or exchange[^g-ad-exchange]. This is a programmatic example of the general rule, not a universal contract for all advertising.

The same instructional billable amount of `$100` can be produced by five **alternative**, not simultaneous, contracts:

| Contract | Qualifying volume and rate | Where the risk boundary passes |
|---|---:|---|
| CPM | 10,000 impressions at `$10 CPM` → `$100` | Impression |
| CPC | 200 clicks at `$0.50 CPC` → `$100` | Click |
| CPI | 20 installs at `$5 CPI` → `$100` | Attributed install |
| CPL | 25 leads at `$4 CPL` → `$100` | Accepted lead |
| CPA | 10 subscriptions at `$10 CPA` → `$100` | Attributed subscription |

An equal amount does not mean equal risk. In CPM the buyer already owes `$100` even if there are no subscriptions. In CPA the payee receives no charge for impressions and clicks that did not reach the accepted action — for the subscription.

### Billing, optimization, and the realized metric are different objects

Imagine a product-specific flow: the advertiser actually pays for qualifying clicks, while the bidding system optimizes decisions toward a `target CPA`. After the period, the dashboard can compute the realized CPM, CPC, and CPA from actual spend and events.

```text
optimization target: target CPA on a subscription
billing basis:       CPC per qualifying click
realized metrics:    observed CPM, CPC, and CPA after the period
```

Here `target CPA` does not turn the contract into CPA billing. A `bid` also expresses a decision input or willingness to pay, and does not prove an actual charge. The payment model establishes the contract; the realized average describes what has already happened; the optimization target[^g-optimization-target] influences future decisions.

## How intermediaries and software providers earn

An intermediary[^g-intermediary] can retain a portion of the media transaction, resell media with a markup, or receive separate payment for a service/software. These models cannot be added together until the contract boundary and calculation base are known.

| Model | Who pays | Calculation rule | Relation to the media dollar | Main risk or caveat |
|---|---|---|---|---|
| **Revenue share**[^g-revenue-share] | The party passing on proceeds under the contract | A share of a named revenue/proceeds base for a period | Usually divides the amount at a specific media boundary | The base, allowable deductions, and adjustments must be named |
| **Fixed fee**[^g-fixed-fee] | The client of the service provider | A pre-agreed amount for a period, scope, or deliverable | Can be fully separate | The provider carries the risk that the scope will require more work |
| **SaaS pricing**[^g-saas-pricing] | The customer of the software platform | Subscription, seats, usage tier, or processed volume | Usually a separate software/service flow | A usage event does not automatically become a media event |
| **Markup**[^g-markup] | The buyer pays the selling price to the intermediary | Spread relative to the acquisition/base cost | Yes, if the intermediary resells media | The percentage grows from the cost denominator, not from the selling amount |
| **Take rate**[^g-take-rate] | Depends on the boundary | Retained amount / named transaction flow | Usually characterizes retention at the chosen boundary | Without numerator, denominator, and included fees, the rate is not comparable |

### Revenue share: a percentage without a base is undefined

**Proceeds** is the transaction inflow amount before the agreed distribution at the chosen boundary. **Revenue share** is the contractual distribution of a named revenue or proceeds base. The contract must answer: whose proceeds, at which boundary, for which period, before or after which agreed adjustments, and who performs the calculation.

In the running example, the SSP[^g-ssp] receives `$80 gross proceeds` at its boundary and, under the seller contract, retains 15%:

```text
SSP retained amount = $12 / $80 SSP-boundary proceeds = 15%
publisher share      = $68 / $80 SSP-boundary proceeds = 85%
```

The numerator of the first percentage is `$12`, the denominator `$80`. That is not 15% of the original advertiser spend of `$100`: relative to the original `$100`, the same `$12` is 12%. The word `gross` here describes the transaction base before the split, not automatically `gross revenue`[^g-gross-net-revenue] in financial reporting.

### Markup, spread, and take rate

**Spread**[^g-spread] is the absolute difference between the selling amount and the acquisition/downstream amount at a named boundary. If a managed network[^g-ad-network] buys media for `$80` and sells it to the advertiser for `$100`, the spread is `$20`.

**Markup** measures the markup over the base cost:

```text
network markup = $20 spread / $80 acquisition cost = 25%
```

**Take rate** measures the retained amount relative to a named transaction flow at the same boundary:

```text
network take rate = $20 retained / $100 advertiser spend = 20%
```

`25% markup` and `20% take rate` describe the same `$20 spread` with different denominators. Neither percentage can be compared with someone else's rate without the participant boundary, numerator, denominator, and the list of included fees. `Markup` is also not gross margin[^g-gross-margin]: gross margin uses accounting revenue and cost of revenue[^g-cost-of-revenue], not arbitrarily chosen buy/sell amounts.

### SaaS sidecar: separate `$2,000/month`

Suppose the advertiser pays an ad server[^g-ad-server] or measurement platform a fixed `$2,000/month` for software access and a usage tier. This amount:

- is a service/software charge under a separate contract;
- is not deducted from the instructional `$100 media flow`;
- does not become a publisher payout[^g-publisher-revenue] or an intermediary take rate;
- may depend on the number of processed impressions, but that does not make it a CPM purchase of inventory.

Including the `$2,000` in the media dollar is valid only if a specific contract genuinely combines these charges. Otherwise you get two money flows: the media transaction and the SaaS subscription.

## One transaction, different ledgers and points in time

**Ledger**[^g-ledger-boundary] — a particular entity's records of accrued amounts and obligations. A single transaction has no single neutral monetary label: one party's inflow is another party's outflow, and an intermediate entity simultaneously sells upstream and buys downstream.

- **Advertiser spend**[^g-media-spend] — the amount charged to the advertiser for a chosen media/service scope. The dashboard may include or exclude platform/data fees, taxes, credits, and adjustments; the scope must be named.
- **Media cost**[^g-cost] — the cost of acquired media for a particular entity. For the advertiser in our narrow example it is `$100`; for the network, the downstream acquisition cost is `$80`. So `media cost` without an owner is undefined.
- **Publisher payout** — the amount that, under the seller contract, must be transferred to the publisher after the share, fees, and adjustments. For the SSP it is a payable; for the publisher, a receivable and part of its economics, and revenue recognition follows its policy.

**Receivable** — an amount a counterparty owes the entity. **Payable** — an amount the entity owes a supplier or another party. These words describe the direction of an obligation, not the moment of cash movement.

It helps to distinguish states:

```text
accrued  → qualifying events reconciled; the amount is earned or incurred under the contract
billed   → the amount is included in an invoice; a formal payment request exists
settled  → the obligation is discharged in cash or another agreed way
```

`Accrued` means an accrual recognized under the timing of the contract, before any mandatory movement of money. An `invoice` documents a demand for payment. `Cash settlement` happens later; taxes, credits, refunds, and FX can change the invoiced or settled amount, but their mechanics are not covered here.

### Event/data flow

```text
10,000 qualifying impressions
  → contract-specific billable count at the network and the SSP
  → participant event records with their own measurement boundaries
  → period reconciliation
  → ledger amounts: $100, $80, and $68 at different boundaries
```

Events can travel from publisher-side systems to buyers and reporting systems asynchronously. They prove the basis for the calculation, but no money moves along this network path itself.

### Invoice and cash flow

```text
network → invoice $100 → advertiser
SSP     → invoice $80  → network
publisher → invoice/statement $68 → SSP

later, cash:
advertiser → $100 → network → $80 → SSP → $68 → publisher
```

A real operational path may use a different invoice owner or settlement arrangement. The main point: the event path, invoice path, and cash path do not have to match in direction, participants, or timing.

## Gross/net revenue and gross margin: a separate accounting boundary

**Reporting entity** — the company whose financial statements we are reading. **Recognized revenue**[^g-revenue] — the amount it presents as revenue under the applicable accounting policy; it is not just any invoice, collection, or cash inflow. **Gross billings**[^g-gross-billings] — a broader amount invoiced to customers or passed through collection before the exclusion of supplier components; gross billings are not a synonym for recognized revenue.

`Gross revenue` and `net revenue` are not "money before expenses" and "money after expenses". The presentation depends on whether the entity is a **principal**[^g-principal-agent] or an **agent** with respect to the specific promised good or service:

- **Specified good/service** — the specific promise to the customer being assessed: for example, to provide advertising delivery or to arrange access to supply.
- A **principal** controls the specified good/service before it is transferred to the customer; under that conclusion, the agreed payment is usually presented gross as revenue, with the supplier component presented separately under the applicable cost policy.
- An **agent** arranges for another party to provide the specified good/service; under that conclusion, revenue is usually the net fee or commission.
- **Control** here means the ability to direct the use of and obtain the substantial benefits from the good or service before transfer — not the existence of an API, an invoice, or a product label.

```text
What did the entity promise the customer?
  → which specified good/service is transferred?
  → did the entity control it before transfer?
      principal conclusion → usually gross revenue presentation
      agent conclusion     → usually net fee/commission presentation
```

`Primary responsibility`, `inventory risk`, and `pricing discretion` can serve as evidence, but they do not form a mechanical score. The conclusion is made for a specific promise and transaction: one AdTech company[^g-adtech] can be a principal in one flow and an agent in another.

### Identical transaction economics, two mutually exclusive presentations

Take only the network boundary of `$100 sell / $80 supplier component`. The table is illustrative; in real reporting, one cannot choose a presentation for a prettier margin.

| Illustrative conclusion | Recognized revenue | Supplier component as cost of revenue | Gross profit before other CoR | Gross margin before other CoR |
|---|---:|---:|---:|---:|
| Principal / gross | `$100` | `$80` | `$20` | `20%` |
| Agent / net | `$20` fee | `$80` excluded from revenue and matching cost | `$20` | `100%` |

**Cost of revenue (CoR)** — the expenses the reporting entity classifies as directly associated with obtaining recognized revenue under its policy. It is not just any cash outflow. **Gross profit** and **gross margin** are computed on one entity and one accounting basis:

```text
gross profit = recognized revenue − cost of revenue
gross margin = (recognized revenue − cost of revenue) / recognized revenue
```

In the net row, `100%` is a mechanical result of the instructional isolation: `$20 recognized revenue`, `$0` of other shown cost of revenue, and `$20 gross profit`. It is not a benchmark, not a forecast, and not a claim that a platform runs for free. A real entity incurs infrastructure, data, operations, and other expenses; some of them may fall into cost of revenue under its policy. Operating expenses, interest, and taxes sit below gross profit and likewise do not turn a retained amount into profit.

As of the 2026-08-28 snapshot, public filings show the contract-specific nature of this boundary:

- In its Form 10-K for 2025, Magnite described net presentation of most platform transactions and gross presentation of some insertion-order campaigns, under different principal-agent conclusions.
- In its Form 10-K for 2025, The Trade Desk separated gross billings and the related receivables/payables from net recognized revenue, with an agent conclusion for Supplier Components.

These are examples of specific companies' policies for a specific period, not a universal classification of an SSP or DSP[^g-dsp]. ASC 606, IFRS 15, the contract, and professional accounting judgment determine the actual conclusion; the chapter provides a mental model, not accounting advice.

## Arbitrage: a spread in exchange for accepted risk

**Arbitrage**[^g-arbitrage], in the broad AdTech sense, arises when an intermediary buys media/traffic cheaper and sells it dearer, or buys on one pricing basis and sells on another. Its economics depend on the spread and the risk between boundaries.

A simple variant:

```text
network buys batch media for $80
network sells the same agreed scope to the advertiser for $100
buy/sell spread = $20
```

If the network committed to pay downstream `$80` but did not sell the whole agreed scope, or the customer did not accept the delivery, the spread can shrink or become a loss. It takes on inventory/volume, fulfillment, and reconciliation risk to the extent set by the contracts.

**Basis mismatch**[^g-basis-mismatch] adds performance risk. An intermediary can buy impressions on CPM and sell clicks or actions on CPC/CPA. Its revenue then depends on the realized CTR[^g-ctr]/CVR[^g-cvr] and validation. If clicks or actions occur worse than expected, the original media cost remains, and the downstream billable amount does not cover it.

Not every intermediary fee is arbitrage, and arbitrage does not automatically mean abuse. Transparent fees, revenue share, or a resale spread can pay for aggregation, reach, service, and accepted risk. The opacity problem arises when the customer does not understand the buy/sell basis, the size of the spread, the intermediary's function, or the conflict of incentives. The CMA's 2020 study illustrates this mechanism in UK open display, but its rates cannot be used as a current 2026 benchmark.

## The path of the instructional `$100` from advertiser to publisher

Let us assemble the layers in one scenario. A subscription-app advertiser buys media in a mobile publisher's app through a managed network and an SSP. All numbers are **instructional**, not a market benchmark and not a claim about a typical chain length.

Assumptions:

- 10,000 identical qualifying billable impressions are needed only to isolate the economics;
- the advertiser/network contract uses `$10 CPM`, the network/SSP contract `$8 CPM`;
- the SSP/publisher contract splits the `$80` proceeds: 15% SSP, 85% publisher;
- the currency is USD; taxes, FX, refunds, rebates, fraud adjustments, and credit risk are excluded;
- amounts are accrued after reconciliation, but invoices and cash are not yet settled;
- the separate `$2,000/month` SaaS from the sidecar is not part of the media flow.

### Contract arithmetic

```text
Advertiser → network: 10,000 / 1,000 × $10 CPM = $100
Network → SSP:        10,000 / 1,000 ×  $8 CPM =  $80
Network spread:                                 =  $20
SSP retained share:             15% × $80       =  $12
Publisher payout:               85% × $80       =  $68
Check:                         $20 + $12 + $68   = $100
```

On one original advertising dollar, the contract economics are 20 cents of retained network, 12 cents of retained SSP, and 68 cents of publisher payout. In the full example, the intermediary retained amount[^g-retained-amount] is `$20 + $12 = $32`. This is the decomposition of specific contracts, not an industry benchmark and not accounting profit.

### Denominators

```text
network markup on acquisition cost = $20 / $80  = 25%
network take on advertiser spend    = $20 / $100 = 20%
SSP take on its boundary            = $12 / $80  = 15%
SSP share of original spend         = $12 / $100 = 12%
combined intermediary share         = $32 / $100 = 32%
publisher payout share              = $68 / $100 = 68%
```

Every line names its numerator and denominator. That is why `SSP take = 15%` and `SSP share of original spend = 12%` are true at the same time but answer different questions.

### Participant ledgers

| Entity | Contract/billable basis | Inflow/receivable view | Outflow/payable view | Economic remainder | What the record does not prove |
|---|---|---:|---:|---:|---|
| Advertiser | `$10 CPM` × 10,000 | — | `$100` advertiser spend/media cost | — | Invoice date, cash date, or business return |
| Managed network | Customer charge `$100`; downstream `$8 CPM` | `$100` billed/receivable | `$80` downstream media cost/payable | `$20` spread | That `$100` is recognized revenue or `$20` is profit |
| SSP | Revenue-share base `$80` | `$80` boundary proceeds/receivable | `$68` publisher payout/payable | `$12` retained amount | That `$80` is recognized revenue or that 15% refers to the `$100` |
| Publisher | 85% of SSP-boundary proceeds | `$68` payout receivable | — | `$68` publisher economics | That the amount is already settled cash or how exactly revenue is recognized |

For the advertiser, `$100` is spend. For the network, `$80` is media cost. For the SSP, `$68` is a publisher payable. For the publisher, the same `$68` is a receivable. The labels change not because of inconsistency, but because of different reporting entities and counterparties.

`Transaction amount`, `retained amount`, `recognized revenue`, `gross profit`, `gross margin`, `invoice`, and `cash` answer different questions:

| Term | What it tells you |
|---|---|
| Transaction amount | How much was charged at a specific contract boundary |
| Retained amount | What portion of the flow stays with a participant before its own costs |
| Recognized revenue | What the reporting entity presents as revenue under its accounting policy |
| Gross profit | How much remains from recognized revenue after that entity's cost of revenue |
| Gross margin | What share of recognized revenue the gross profit is, on the same accounting basis |
| Invoice | Which receivable/payable was formally presented to a counterparty; proves neither revenue presentation nor payment |
| Cash | Which obligation was actually settled, and when; does not prove retained amount or profit |

### Operational checklist for analyzing vendor economics

1. Name the customer, payer, payee, counterparties, and the promised product/service.
2. Record the contractual pricing basis, qualifying billable event, rate, validation owner, and billable amount. Separately write down the optimization target and the realized metrics.
3. Draw the participants' ledgers: where the advertiser spend, media cost, publisher payout, receivable, and payable sit.
4. For each fee or share, state the absolute amount, numerator, denominator, boundary, and allowable adjustments. Separate media money from a fixed/SaaS charge.
5. Check the accounting policy for the specific transaction type: specified good/service, principal/agent conclusion, recognized revenue, and cost of revenue. Then compute gross profit and gross margin.
6. Place accrual, reconciliation, invoice, and cash settlement on a timeline. Do not infer accounting presentation from the invoice owner or the direction of payment.

## What this is often confused with

- **Pricing model, optimization target, and realized metric are not the same thing.** `Target CPA` can govern bids under CPC billing, while the observed CPA is computed only after the period.
- **An auction win is not necessarily a billable event.** The charge arises after the event and validation defined by the contract; the win notice and the billing notice can be different signals.
- **A deeper billable event does not eliminate risk.** Under CPM the advertiser bears post-impression risk; under CPC the payee takes the impression-to-click risk; under CPA/CPI/CPL the advertiser is still responsible for the quality, retention, and monetization of the outcome.
- **Revenue share without a base is undefined.** An SSP share of `15%` of `$80` means `$12`; relative to the original `$100` it is 12%.
- **Markup and take rate do not contradict each other.** One spread of `$20` yields a `25% markup` on a cost of `$80` and a `20% take rate` on a spend of `$100`.
- **Spend, media cost, and publisher payout are not aliases.** They are labels of different participant ledgers and boundaries.
- **Gross/net revenue is not "before/after expenses".** The presentation follows a contract-specific principal-agent assessment; invoices and gross billings do not by themselves determine it.
- **Retained amount, recognized revenue, gross profit, and cash are different quantities.** They answer transaction, accounting, profitability, and settlement questions respectively.
- **Gross margin is not the take rate.** The former uses recognized revenue and cost of revenue of one reporting entity; the latter, a retained amount and a named transaction-flow denominator.
- **Not every intermediary income is arbitrage.** Arbitrage presupposes a buy/sell spread or basis mismatch and the corresponding risk; a transparent fee or revenue share can pay for a separate function.
- **Fixed fee and SaaS pricing do not have to shrink the media dollar.** A separate software/service contract forms a separate money flow.

## What to remember

1. Economics starts with the contract: the pricing basis and the billable event define the charge and allocate risk.
2. CPM, CPC, CPA, CPI, and CPL can be called the same in billing, bidding, optimization, and reporting, yet they are different layers.
3. Revenue share, markup, and take rate become comparable only after the numerator, denominator, and participant boundary are disclosed.
4. One flow of `$100 → $80 → $68` simultaneously creates advertiser spend, an intermediary's media cost, and a publisher payout.
5. Network retained `$20` and SSP retained `$12` describe transaction economics, but not automatically recognized revenue or profit.
6. Gross/net presentation is determined for a specified good/service through a principal-agent assessment, not a company's product label.
7. Gross profit equals recognized revenue minus cost of revenue; gross margin divides that result by the recognized revenue of the same entity and basis.
8. Arbitrage can yield a spread, but the intermediary takes volume, performance, or reconciliation risk and can end up with a loss.
9. Event/data flow, participant ledgers, invoice flow, and cash settlement must be analyzed separately.
10. The instructional split `$20 + $12 + $68 = $100` shows a method of analysis, not a typical market share.

## Test yourself

1. An advertiser optimizes a campaign toward a `target CPA` but pays for qualifying clicks. What are the pricing basis, billable event, optimization target, and realized metric here?
2. Why can `$20 / $80 = 25%` and `$20 / $100 = 20%` simultaneously and correctly describe the network's economics?
3. Can an entity issue a `$100` invoice, recognize `$20 net revenue`, and later receive `$100 cash` without a contradiction? Which layers does each amount describe?
4. What contract, ledger, accounting, and settlement data are needed before comparing the gross margin and take rate of two AdTech vendors?

## Sources and Further Reading

1. [IAB Tech Lab — Programmatic Auction Definitions, Final](https://github.com/InteractiveAdvertisingBureau/programmatic-auction-definitions/blob/main/auction%20definitions.md) and [OpenRTB 2.x Implementation Guidelines, sections 7.8–7.9](https://github.com/InteractiveAdvertisingBureau/openrtb2.x/blob/main/implementation.md) — definitions of `Billable Event`, the transaction ledger, and the distinction between `nurl` and `burl`; protocol guidance does not replace contractual billing policy.
2. [Google Ads — CPC](https://support.google.com/google-ads/answer/116495?hl=en), [CPM](https://support.google.com/google-ads/answer/6310?hl=en), and [Bidding basics](https://support.google.com/google-ads/answer/2459326?hl=en) — product-specific examples of pricing and optimization; this is not a vendor-neutral contract.
3. [FASB — Revenue from Contracts with Customers, Topic 606, paragraphs 606-10-55-36–55-40](https://asc.fasb.org/layoutComponents/getPdf?fileName=GUID-E90460CF-B750-4654-B149-5DD3F6B6DBA9.pdf&isSitesBucket=false) and [IASB — IFRS 15 PIR: Principal versus Agent Considerations, AP6B](https://www.ifrs.org/content/dam/ifrs/meetings/2024/february/iasb/ap6b-ifrs-15-pir-principal-vs-agent-considerations.pdf) — the principal-agent mental model; application depends on the reporting framework, the contract, and professional judgment.
4. [FASB — GAAP Taxonomy Implementation Guide: Revenue from Contracts with Customers](https://xbrl.fasb.org/impguidance/Rev2_TIG/revenue_2.pdf) — gross profit as the difference between revenue and cost of revenue/cost of goods sold; the composition of cost of revenue remains company-specific.
5. [Magnite — Form 10-K for the year ended 2025-12-31](https://www.sec.gov/Archives/edgar/data/1595974/000159597426000007/mgni-20251231.htm) — company-specific examples of percentages, fixed CPM/monthly pricing, and different gross/net presentations; not an industry benchmark.
6. [The Trade Desk — Form 10-K for the year ended 2025-12-31](https://www.sec.gov/Archives/edgar/data/1671933/000167193326000014/ttd-20251231.htm) — the distinction between platform fee, gross billings, receivables/payables, and net revenue; the conclusions relate to this company's contracts and policies.
7. [UK Competition and Markets Authority — Appendix M: Intermediation in open display advertising](https://assets.publishing.service.gov.uk/media/5fe495c28fa8f56afaf406d4/Appendix_M_-_intermediation_in_open_display_advertising_WEB.pdf) and [official landing page](https://www.gov.uk/find-digital-market-research/online-platforms-and-digital-advertising-market-study-appendix-m-intermediation-in-open-display-advertising-2020-cma) — a historical analysis of UK open display from 2020; describes the mechanics of arbitrage and fee opacity, but its rates cannot be used as a current 2026 benchmark.
