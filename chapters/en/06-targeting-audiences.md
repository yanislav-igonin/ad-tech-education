---
id: ch-06
type: chapter
part: II
chapter: 6
slug: targeting-audiences
title: "Targeting and Audiences"
language: en
status: draft
toc_requirements: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "6.13", "6.14", "6.15", "6.16", "6.17"]
prerequisites: [ch-01, ch-02, ch-03, ch-04, ch-05]
---

# Targeting and Audiences

Targeting[^g-targeting] does not answer the question “who is certain to buy,” but an earlier question: **which advertising opportunities the system must reject, admit, or consider preferable**. From the entire stream of ad opportunities[^g-ad-opportunity], the advertiser[^g-advertiser] first forms an eligible set, then the delivery system ranks it for the chosen outcome.

```text
business intent
  → hard eligibility constraints
  → audience/context signals
  → eligible opportunity set
  → optimization ranks eligible opportunities
  → delivery outcomes become new signals
```

This chain is the chapter’s main mental model. It separates eligibility rules from relevance hypotheses and from optimization. Without this distinction, it is easy to mistake the `Audience` field in a vendor UI for a strict filter, even though a particular product may use it only as a model hint.

## Why Targeting Matters: From Universe to Eligible Set

A publisher[^g-publisher] creates a set of opportunities to show ads: in different countries, apps, browsers, contexts, and moments. Buying the entire set is irrational. A subscription app that is available only in Germany and only on supported mobile OSs should not pay for a desktop opportunity in France. But within Germany, it is impossible to know in advance which eligible user will subscribe. The configuration therefore has three semantic categories:

| Semantics | Meaning | Example |
|---|---|---|
| **Control / constraint** | The opportunity must pass the rule; otherwise delivery is prohibited | `geo = DE`, `device = mobile`, supported OS |
| **Signal / hint** | The attribute helps the model prioritize, but does not always restrict the set | Interest `fitness`, a seed of valuable subscribers |
| **Audience exclusion / suppression**[^g-audience-exclusion] | A negative rule filters out the matching entity | Do not show ads to current paid subscribers |

The word `targeting` in a product can cover all three rows. The semantics define the setting’s contract, not its position on the screen. It is especially important to determine whether the product can go beyond the positive input and which exclusions remain strict.

A set model for learning, not a production bidder formula:

```text
eligible(o) = geo(o)
           ∧ device(o)
           ∧ context_or_placement(o)
           ∧ audience_control(o)
           ∧ ¬suppression(o)

delivery_score(o) = model(features(o), targeting_signals, optimization_event)
```

`eligible(o)` is a boolean predicate for opportunity `o`. `delivery_score(o)` is meaningful only after the opportunity passes the mandatory rules: it sets relative priority within the eligible set. The optimization target[^g-optimization-target] indicates which outcome guides the ranking, for example `paid_subscription`; targeting itself does not guarantee this outcome.

Where exactly the product stores the rule—at the campaign[^g-campaign], ad group, or ad set[^g-ad-set] level—depends on the platform and campaign type. To carry the mental model across vendors, it is more useful to classify each field as a constraint, signal, or exclusion than to memorize a screen.

The data flow looks like this:

```text
advertiser rules and customer events ─────┐
publisher/platform opportunity + context ├─→ normalize/match
optional external data provider ──────────┘       ↓
                                           eligibility
                                               ↓
                                             ranking
                                               ↓
                                      delivery event → outcome
                                               └─→ feedback
```

The publisher or platform describes the opportunity; the advertiser supplies controls, seeds, and exclusions; an external data provider[^g-data-provider] may add a segment; and the DSP[^g-dsp] or closed platform performs matching, eligibility checks, and ranking. Outcomes return later and become inputs to subsequent decisions.

Targeting does not change the pricing model that governs the money flow. It changes the composition of available inventory and the distribution of media spend[^g-media-spend], but it does not determine the bid, budget[^g-budget], or pacing[^g-pacing]. External provider data may carry a separate fee; bidding and spending mechanics are covered in Chapter 7.

## Available Attributes: Geography, Device, OS/Browser, and Demographics

The simplest targeting dimensions describe the opportunity’s environment or probable properties of an entity. Their presence in a request does not make them error-free facts.

| Dimension | What it describes | Possible sources | Typical uncertainty | Possible semantics |
|---|---|---|---|---|
| Geography | Likely presence, regular presence, or interest in a location | IP, device settings, account data, search/content behavior | VPN, travel, stale or inferred location | Control or a product-specific broad option |
| Device | Device class and sometimes family/model | Request/device metadata, app/platform | Coarsening, spoofing, `unknown` | Often a criterion/control |
| OS/browser | Software environment: family and version when available | User agent, app SDK, platform metadata | Reduced version, missing field, unsupported criterion | Channel- and product-specific |
| Demographics | Profile category | Declared, partner-supplied, or inferred data | `unknown`, misclassification, stale inference | Control or suggestion |

### Geography

A geography criterion may specify a country, region, city, postal area, or radius around a point. But the value `DE` does not yet prove a person’s physical location. A product may interpret it as likely presence, regular presence, or interest in Germany. The source almost always provides a best-effort inference, not a certified coordinate.

Google Ads provides a product-specific example of this distinction: as of 2 September 2026, advanced location options distinguish between `Presence or Interest` and `Presence`, and the documentation explicitly warns that location is inferred from several signals and is not 100% accurate. This is not a universal industry default; in every product, the exact semantics of positive and negative geo rules must be checked.

### Device, OS, and Browser

`Mobile` describes a device class, `Android` an OS family, `Android 15` an OS version, and `Chrome` a browser family. These axes are related but not interchangeable. An opportunity from an Android tablet may pass the OS rule and fail the `phone only` device-class rule. In-app inventory may supply an OS but have no useful browser attribute at all.

Granularity depends on the channel and platform. Some platforms expose the device model, while others expose only `mobile/desktop/tablet`; explicit browser targeting may be unavailable even though the browser remains a model feature or reporting dimension. `Unknown` and coarsened values are normal, so a control should define its policy for unknown values in advance rather than silently treating them as a non-match or a match.

### Demographics

Demographics are categories such as age range, gender, parental status, or household income, if supported by the product and policy. Membership may be:

- **declared** — the user provided the value;
- **observed/supplied** — the value came from a permitted account or partner source;
- **inferred/modeled** — the platform estimated the category from behavior and other features.

Consequently, `age=25–34` is a classification signal with a source, confidence, and recency, not a verified passport fact. `Unknown` cannot be treated as a rare error: by excluding the unknown population, an advertiser may substantially reduce the eligible set. Available categories, the use of sensitive characteristics, and the handling of unknown values depend on the country, channel, and policy; legal and consent mechanisms are covered later in the course.

For a subscription app, hard controls might be `DE + mobile + supported OS`. Demographics should be added only after answering two questions: is this a strict boundary or a suggestion, and what will happen to `Unknown`?

## A User Hypothesis and the Ad Context Are Different Types of Data

Interests and behavior describe a presumed user or their history. Context, keyword, and placement[^g-placement] describe the current media opportunity or a way to find it. These attributes may correlate, but they answer different questions.

| Input | Main question | Outdoor store example |
|---|---|---|
| **Interest** | What is the entity presumed to have a lasting affinity for? | `interest: hiking` |
| **Behavior** | What named action or pattern was observed, and when? | `viewed_boots within 14d` |
| **Contextual targeting**[^g-contextual-targeting] | What is the current page, app screen, or video about? | An article about winter hiking |
| **Search keyword** | What query/intent does the product match the ad to? | `winter boots` in search |
| **Context keyword** | What term or semantic concept describes the content? | `winter boots` in the review text |
| **Placement** | In which explicitly selected property/channel/site/app/video/slot is the ad eligible to appear? | `outdoor-news app/article_feed` |

**Interest** is usually a relatively persistent hypothesis about a preference or affinity. It may be declared, inferred from content consumption, or supplied by a partner. An interest in hiking is not the same as a current intent to buy boots: source, recency, and confidence matter as much as the label.

**Behavior** is built from past actions or patterns: viewing a product page, searching, adding to cart, installing, making frequent purchases. A useful behavioral rule always names the event and observation window: `viewed_boots within 14 days` is more informative than `active shopper`. An observed action does not guarantee a future purchase and does not by itself define a retargeting tactic.

**Contextual targeting** selects opportunities based on the current media context: topic, semantics, page/app/video category, and related signals. It can work without claiming that the platform knows the user’s persistent cross-site identity: classifying the environment in which the opportunity arose is enough. This distinguishes `reading an article about hiking now` from the audience hypothesis `interested in hiking in general`.

Keyword targeting has two common semantics. In Search, a keyword is associated with a user query and presumed intent according to the product’s match rules. In display/video, a keyword may describe content and aid contextual selection. In neither case does a keyword necessarily imply a universal exact string match: stemming, semantic expansion, negative rules, and combinations of criteria depend on the product contract.
Placement is a more explicit answer to “where”: a specific publisher property, app, site, channel, video, section, or slot-level scope. A contextual system may dynamically find thousands of hiking pages; a placement rule may allow only the named outdoor-news app. Formats, ad units, and creative[^g-creative] compatibility are covered in Chapter 8.

`Placement` is an overloaded product term. On the publisher side, it is a specific ad slot or a rule for ad appearance; on the buy side, the same word may refer to a selectable media scope—an entire site, app, channel, video, section, or individual slot. When reading a configuration, clarify the level rather than treating them as a single entity.

A minimal opportunity description could look like this; this is illustrative JSON, not a vendor API:

```json
{
  "geo": "DE",
  "device": "mobile",
  "os": "Android",
  "context_topic": "outdoor/hiking",
  "placement": "publisher_app:article_feed"
}
```

Boolean semantics cannot be inferred from fields being adjacent. One product will apply `topic OR placement`, another `topic AND placement`, and a third will use topic as a signal within selected placements. The contract must explicitly define composition and precedence.

## How Data Becomes an Audience Segment

An audience segment[^g-audience-segment] is not necessarily a list of known people. It is an addressable set of entities for which the following are defined:

1. **Entity:** user, account, device, browser, household, or modeled profile.
2. **Membership rule:** what condition includes and excludes the entity.
3. **Provenance:** who obtained the source data and how.
4. **Observation window:** the interval over which events are considered.
5. **Activation contract:** how the platform matches membership to its addressable entities.

Here, the observation window sets the recency requirement for membership, for example, “trial started within the last 7 days.” This is not an attribution window: the segment determines whom to consider for delivery, while attribution[^g-attribution] later allocates credit for a conversion[^g-conversion].

### First-Party Audiences

A first-party audience[^g-first-party-audience] is built from data obtained by an advertiser or publisher through a direct relationship: CRM records, customer lists, site/app events, subscriptions, and purchases. For a subscription app, the pipeline might be:

```text
CRM + app events + subscription status
  → normalize + deduplicate
  → rule: trial_started AND no paid_subscription within 7d
  → platform matching/onboarding
  → addressable audience
```

A CDP[^g-cdp] or an in-house data pipeline may calculate membership, but an uploaded record is not yet the same as an activatable entity. The platform must perform a match; some records will remain unmatched, may be updated after a delay, or may be unavailable in a particular channel/region. `First-party` describes provenance, not automatic consent, a legal basis, exclusive ownership, or a 100% match.

Google Customer Match is a time-specific vendor example: an advertiser supplies its own online/offline customer data, and Google matches it for activation; since March 2024, certain activation options on partner inventory have been restricted in the EEA, UK, and Switzerland, while owned-and-operated properties are supported under their own terms. The basic concept of a first-party audience has not changed, but availability changed due to product policy.

### Third-Party Audiences

A third-party audience[^g-third-party-audience] is supplied by an external provider that is not a party to the advertiser’s direct relationship with the entity. A typical flow:

```text
data originators
  → provider aggregation / classification / modeling
  → labeled segment
  → DSP/platform match
  → activation
```

The label `likely subscription buyers` does not disclose the segment’s composition. At a minimum, the following are needed before use:

- provenance and collection method;
- observation period and recency;
- membership criteria;
- the proportions of observed and modeled members;
- permissions and permitted use cases;
- activation coverage and match boundary.

The IAB Tech Lab Audience Taxonomy provides a common nomenclature for labels such as demographic, interest-based, and purchase-intent because vendor taxonomies have historically been incompatible. The Data Transparency Standard adds disclosures about provenance, recency, segmentation, and modeling. Neither the taxonomy nor a Data Label is a quality score: identical labels do not guarantee the same set, accuracy, or performance.

First-party data is not always more accurate: sparse or poorly instrumented events produce a weak segment. Third-party data is not always useless: a provider may have a relevant source that the advertiser lacks. The comparison should focus on the rule, provenance, freshness, and match—not on whether the data is labeled first- or third-party.

## Retargeting and Lookalikes: Past Contact Versus New Prospects

Retargeting[^g-retargeting] addresses entities again after they performed a named interaction within a specified window. For a subscription app, this might be the segment `installed AND trial_started AND no_paid_subscription after 7d`; those entities are shown a message about premium features. Recency and the event definition are part of the tactic: a visitor to the pricing page yesterday and a visitor from a year ago are not the same audience.

```text
past interaction + window
  → retargeting membership
  → match at new opportunity
  → re-engagement
```

Retargeting determines whom to show an ad to again. It neither assigns attribution credit nor proves incrementality: a high conversion rate may reflect pre-existing intent.

A lookalike audience[^g-lookalike-audience] solves the opposite problem—it finds **new prospects** from a seed audience. The platform extracts or uses features of seed entities and ranks other addressable entities by similarity or predicted relevance.

```text
seed: paid subscribers with 90-day value > €50
  → platform model/features
  → new similar prospects
  → prospecting delivery
```

The quality of the seed defines the model’s task: a mixed seed of random trials does not teach the same thing as stable high-value subscribers. There is usually a trade-off between similarity and size: a narrower threshold yields a smaller set, while a broader one provides more reach but weaker similarity. A lookalike audience does not have to include the seed, does not guarantee a conversion, and does not prove a causal effect.

Inclusion semantics also change by product mode. As of 2 September 2026, Google is transitioning Lookalike segments specifically in Demand Gen, in phases, from a similarity-threshold constraint to suggestion mode: the seed and reach level guide the model, but delivery may go beyond the threshold; a separate opt-out path preserves the previous constraint semantics. This is not a rule for all campaign types or vendors. Meta Lookalike retains a seed-based model, but in Advantage+ audience, an included custom/lookalike audience may be a suggestion rather than a boundary. Thus, the word `Lookalike` describes how the prospect signal is built, but not, by itself, the strictness of delivery.

## Exclusions and Overlap: Negative Rules and Set Logic

Suppression is needed when “do not show” matters more than a positive preference. An acquisition campaign usually excludes current customers; a re-engagement campaign excludes users who have already performed the desired action; a population subject to regulation or incompatible with the product may have its own hard control. A negative predicate should have clear precedence over a positive signal:

```text
eligible(entity) = positive_rules(entity)
                AND NOT excluded(entity)
```

But the actual completeness of an exclusion is limited by observability. If a subscription event arrives late, membership is stale, identity is not matched, or the platform interprets the field as a suggestion, the business entity may receive an impression. Therefore, an exclusion expresses an intention and is a contract rule, not a promise of zero leakage.

Audience overlap[^g-audience-overlap] is the intersection of memberships in multiple segments within a single activation universe. Before launch, a subscription app might inspect:

```text
A = trial_no_purchase
B = existing_paid
C = high_value_seed_lookalike

inspect: A ∩ B, A ∩ C, B ∩ C
```

`A ∩ B` often indicates stale events, inconsistent windows, or an error in the rules: the same account is simultaneously considered an unpaid trial and a paid subscriber. `B ∩ C` may be valid if the lookalike product includes the seed; for prospecting, it is still sensible to remove it through an exclusion if the goal is new customers.

An illustrative Jaccard-like ratio can be used to compare two sets:

```text
overlap(A, B) = |A ∩ B| / |A ∪ B|
```

The numerator and denominator must refer to the same entity definition, activation universe, and snapshot time. Platform estimates may differ due to matching and identity coverage. Overlap can reduce distinct reach[^g-reach], fragment the setup, and complicate segment-level interpretation, but by itself it does not prove duplicate billing or that campaigns “bid against themselves”—auction and deduplication semantics depend on the platform.

## Broad and Algorithmic Delivery: The Boundary Between Targeting and Optimization

Broad targeting is a setup with few positive audience restrictions. This does not mean an absence of rules: geo, policy, technical compatibility, placements, brand-safety controls, and exclusions remain. Algorithmic targeting[^g-algorithmic-targeting] uses the optimization goal, seeds, context, creative/landing signals, and outcome feedback to find likely useful opportunities; it goes beyond the selected audience only where the input is declared a suggestion rather than a hard control.

| Setup | Hard controls | Positive audience input | Can it go beyond the input? | What the optimizer does |
|---|---|---|---|---|
| Manual / narrow | Geo, device, context, and audience boundaries | Selected segment as a constraint | Usually not, if the contract is truly hard | Ranks within a narrow eligible set |
| Broad | Basic geo/policy/inventory guardrails and exclusions | Few or no positive restrictions | The set is broad from the outset | Finds likely outcomes in a broad set |
| Algorithmic with signals | Hard controls and exclusions | Seed, interest, keyword, creative/landing signals | Yes, if the input is a suggestion | Expands or reallocates delivery toward the goal |

As of 2 September 2026, two vendor examples demonstrate the portable distinction `control ≠ signal`:

- In Google Ads, optimized targeting for supported campaign types may seek conversions beyond manually selected inputs. The specific signals differ: for Display, the documentation names audience segments, keywords, and topics; for Video and Demand Gen, it names audience, custom, and customer-data segments, while selected Video placements remain boundaries. Customer-data exclusions and separate brand-safety controls have different semantics.
- In Meta Advantage+ audience, as of the review date, `Locations`, minimum age, languages, and excluded custom audiences may serve as controls, while suggested age, gender, detailed targeting, and included custom audiences guide AI that may deliver to other users within those controls. Availability depends on the campaign and policy category.

This is not a performance comparison or a universal recommendation to enable automation. The conclusion is narrower: audience inputs that look the same may have different contracts.

### Subscription App: End-to-End Flow

An advertiser wants new paid subscriptions in Germany. Configuration and data pass through the following stages:

1. **Hard eligibility:** `DE`, `mobile`, supported OS, permitted placements, and policy rules. The geo option has been checked to determine whether it means presence or interest.
2. **Suppression:** current paid subscribers are excluded from acquisition. A match delay is acknowledged as a possible source of leakage.
3. **Retargeting branch:** the first-party rule `trial_started AND no paid_subscription in 7d` creates a separate audience for re-engagement.
4. **Prospecting branch:** high-value paid subscribers form the seed; the lookalike is used as a constraint or hint according to the selected product mode.
5. **Broad/algorithmic branch:** positive audience restrictions are minimal, but hard controls and exclusions remain. The model ranks eligible opportunities to optimize for the `paid_subscription` event.
6. **Feedback:** impressions[^g-impression], clicks[^g-click], installs, trials, and subscription events update reporting, segment membership, and model inputs.

In this flow, targeting establishes eligibility and preferences; optimization directs delivery toward the event. Bid calculation, budget allocation, and pacing are not needed to draw this boundary and are covered in the next chapter.

Six questions are enough when evaluating any targeting product:

1. What entity belongs to the audience, and what constitutes an opportunity?
2. Which criteria are hard, which are suggested, and which are negative?
3. Who created the signal, and what are its provenance, window, and freshness?
4. Can the model go beyond the selected audience or seed?
5. What optimization event guides the ranking?
6. What limits remain around `unknown` values, matching, permissions, and policy?

## Common Confusions

- **Targeting ≠ optimization.** The former sets constraints and preferences; the latter ranks eligible opportunities toward an outcome.
- **Audience ≠ context.** An audience describes a matched entity or history; context is the current media environment.
- **Interest ≠ intent ≠ behavior.** Affinity, a current query, and a past action are different kinds of evidence.
- **Placement ≠ contextual selection.** A placement explicitly names “where”; a contextual system selects environments based on content signals.
- **First-party ≠ automatically permitted or fully matched.** Provenance does not replace permission and an activation contract.
- **Retargeting ≠ attribution.** A delivery tactic does not determine who receives conversion credit.
- **Lookalike ≠ a copy of the seed.** It is a modeled prospect set; inclusion and expansion semantics are product-specific.
- **Overlap ≠ double charge.** It is a set intersection; billing consequences require separate contract evidence.

## Key Takeaways

1. Targeting narrows or guides the opportunity universe, but does not promise an outcome.
2. Every setting should be classified as a hard control, signal/hint, or exclusion.
3. Geo, demographics, interests, and behavior are often inferred and may be `unknown` or stale.
4. Device, OS, and browser are different axes with different availability.
5. Contextual targeting describes current content; audience targeting describes an entity or its history.
6. A segment is defined not by its label, but by its entity, membership rule, provenance, window, and activation contract.
7. First-party and third-party describe the origin of data, not guaranteed quality.
8. Retargeting again targets entities in a known interaction set; a lookalike finds new prospects from a seed.
9. Broad delivery retains guardrails; algorithmic expansion must not confuse hard controls with suggestions.
10. Optimization begins after eligibility and uses outcomes as feedback.

## Check Your Understanding

1. Why might `geo = DE` mean something other than “the user is physically in Germany”?
2. How do `interest: hiking`, `viewed_boots in 14d`, and an article about hiking differ as targeting inputs?
3. What five characteristics are needed to meaningfully describe an audience segment?
4. Why is an included audience in an algorithmic product not always a strict delivery boundary?

# Sources and Further Reading

1. [IAB Tech Lab — Audience Taxonomy](https://iabtechlab.com/standards/audience-taxonomy/) — a common nomenclature for audience categories; updated 11 December 2024, accessed 2 September 2026.
2. [IAB Tech Lab — Data Transparency Standard](https://iabtechlab.com/standards/data-transparency-standard/) — disclosure of provenance, recency, segmentation, and modeling without a quality grade; updated 23 April 2024, accessed 2 September 2026.
3. [Google Ads Help — About advanced location options](https://support.google.com/google-ads/answer/1722038?hl=en) — `Presence or Interest`, `Presence`, and best-effort geo inference; accessed 2 September 2026.
4. [Google Ads API — Targeting criteria](https://developers.google.com/google-ads/api/docs/targeting/criteria) — product-specific criteria and scopes; accessed 2 September 2026.
5. [Google Ads Help — About Customer Match](https://support.google.com/google-ads/answer/6379332?hl=en) — first-party customer-data matching and current availability limits; accessed 2 September 2026.
6. [Google Ads Help — About optimized targeting](https://support.google.com/google-ads/answer/10537509?hl=en) — manually selected segments as signals and separate controls; accessed 2 September 2026.
7. [Google Ads Help — Use Lookalike segments to grow your audience](https://support.google.com/google-ads/answer/13541369?hl=en) — phased Demand Gen transition to suggestion mode during 2026; accessed 2 September 2026.
8. [Meta Business Help Center — Audience controls and Audience suggestions in Advantage+ audience](https://www.facebook.com/business/help/938372127764391) — product-specific distinction between controls and suggestions; accessed 2 September 2026.
