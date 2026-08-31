# Резюме аудита

Глава полно покрывает требования 5.1–5.14 и выдерживает Planner Brief: campaign показана как иерархическая control-plane-конфигурация, а не как отчёт, денежный flow или единая vendor schema. Все обязательные понятия объяснены через назначение, scope и причинную связь; central distinctions `account ≠ legal advertiser`, `ad ≠ creative`, `objective ≠ optimization event`, `targeting ≠ placement`, `bid strategy ≠ bid`, `tracking path ≠ destination path` и `configured status ≠ effective/learning status` проведены последовательно. Материальных ошибок, пропусков и устаревших механизмов как current practice не обнаружено. Найдено 0 блокеров, 0 важных проблем и 3 необязательных уточнения.

# Блокеры

None.

# Важные проблемы

None.

# Необязательные улучшения

1. **Не распространять переносимую namespace-модель на любой `event ID`.** Раздел «Зачем кампании нужна иерархия: account как корень управления» утверждает: «Campaign, ad и event IDs уникальны как минимум в контексте platform/account». Для campaign/ad resource IDs это понятная иллюстрация namespace, но scope и uniqueness event identifiers зависят от event source и deduplication contract; один identifier иногда намеренно передают в нескольких копиях одного события. Безопаснее ограничить тезис resource IDs либо прямо назвать product-specific scope event IDs. Это локальная оговорка и не ослабляет основное объяснение account boundary.
2. **Согласовать географию сквозного примера.** В разделе про account показаны отдельные `ad account EU` и `ad account US`, после чего текст выбирает EU account для сквозного примера. Однако JSON-like дерево содержит `"account_id": "acct_eu_1"` и одновременно группы `grp_us_1` и `grp_de_1`. Такая configuration возможна, но без пояснения reader может решить, что regional label account либо обязательно ограничивает targeting, либо вообще ничего не означает. Один согласованный набор labels или короткая оговорка снимет лишнюю неоднозначность.
3. **Точнее развести `manager account` и способ выдачи agency access.** Раздел про account говорит: «Manager account или agency access — административный слой над несколькими ad accounts». Manager account действительно может централизовать несколько accounts, но agency access может быть выдан и непосредственно к одному account без отдельного multi-account layer. Основной вывод — access не является delivery level — корректен; уточнение нужно только против слишком буквального обобщения.

# Проверка корректности

- Раздел «Зачем кампании нужна иерархия: account как корень управления» корректно определяет ad account как tenant и administrative boundary для ownership/access, billing context, currency/time zone и shared configuration. Legal advertiser, ad account и manager account явно разведены; inheritance назван product-specific contract, а не универсальным порядком override.
- Раздел «Execution tree: campaign, ad group/ad set, ad и creative» не выдаёт Google-like и Meta-like модели за одинаковую schema. Campaign описана как общий delivery scope, middle layer — как scope shared execution rules, ad — как delivery binding, creative — как content/assets. Повторное использование `cr_video_a` двумя ads substantively показывает, зачем ad и creative являются разными объектами.
- Раздел «Objective и optimization event» корректно отделяет high-level business intent от наблюдаемого signal, конкретной conversion action, набора tracked events, bid strategy и billing basis. Пример `install` versus `paid_subscription` объясняет причинный trade-off signal depth, delay, reliability и volume, не объявляя самый глубокий event автоматически лучшим.
- Раздел «Targeting и placement» последовательно различает eligibility по opportunity/user/context и media environment/slot. Возможное API nesting placements внутри `targeting` не превращено в conceptual equivalence; audience engineering, identity и privacy явно переданы главе 6.
- Раздел «Bid strategy» правильно различает strategy, target/cap, actual bid и price/charge. Auction calculation, pacing и tuning не симулируются и отложены до главы 7; billing/optimization distinction из главы 4 используется только как prerequisite reminder.
- Раздел «Ресурсы и время: budget и schedule» не обещает жёсткую универсальную semantics daily budget: текст допускает hard cap, average daily target и другие product rules. Daily, lifetime и shared/ad-set scopes разведены; `€700 / 7 days ≠ €100/day` и `≠ €350 per ad set` корректно показывают отсутствие гарантии равномерного allocation. Schedule раскрыт через start/end, account time zone, dayparting и effective eligibility.
- Раздел «Куда приходит user и откуда система получает сигналы» отделяет destination от measurement path, перечисляет URL/macros/templates и pixel/SDK/server/MMP integration points, а attribution оставляет configuration boundary. Parallel tracking прямо маркирован как Google-specific example, не universal behavior. Фраза «MMP также не получает campaign hierarchy магически» корректно требует mapping IDs и event names.
- Раздел «Lifecycle без ложной линейности» немедленно опровергает буквальное чтение mnemonic `draft → learning → active → paused → completed`. State vector, четырёхосевая таблица, Google example `Eligible + Learning`, Meta example `Active + Learning`, обратимый pause и scheduled end согласованы. Significant edits и thresholds явно названы vendor-specific; causal explanation повторного learning не обещает universal duration или reset rule.
- Технические заявления, чувствительные к platform behavior, привязаны к Google Ads или Meta и согласуются с датированными 2026-08-31 official sources из Planner Brief. Legacy tracking, universal status enums или фиксированные learning thresholds как current industry standard не представлены.

# Проверка границ и плотности

Границы Planner Brief соблюдены. Глава не повторяет pricing models, risk transfer, spend/revenue/payout ledgers, take rate и путь `$100` из главы 4. Строка `Billing basis` и различие `target CPA`/actual bid/charge — короткая необходимая связь с prerequisite, а не повтор economics.

Материал главы 3 о click measurement points, conversions и attribution не пересказывается. Глава 5 использует только минимальный user/measurement path, чтобы объяснить configuration ownership, destination и event-source integration. Served/rendered/viewable, metric formulas и discrepancy analysis не затрагиваются.

Targeting/data/privacy, bidding algorithms/pacing, format production, attribution mechanics, mobile privacy, CRO, moderation и reporting остаются за заявленными границами. Упоминания этих тем выполняют роль integration boundary и явно передают глубину последующим главам. Итоговые misconceptions и checklist повторяют central distinctions для самопроверки, но не добавляют filler или второй параллельный walkthrough.

# Coverage Table

| Requirement | Status | Evidence / Explanation |
|---|---|---|
| 5.1 | ✅ COVERED | «Зачем кампании нужна иерархия: account как корень управления» определяет advertiser/ad account как tenant, раскрывает ownership/access, billing identity, currency/time zone, shared configuration и inheritance, а также отделяет legal advertiser и manager/agency access от delivery hierarchy. |
| 5.2 | ✅ COVERED | «Execution tree» определяет campaign как верхнеуровневый container одного business intent/flight и shared delivery scope; parent pause, schedule и limits показаны как влияющие на descendants, при этом расположение полей названо product-specific. |
| 5.3 | ✅ COVERED | Ad group/ad set объяснён как middle scope shared execution rules; Google-like grouping ads/criteria и Meta-like audience/placements/optimization/bid/budget/schedule сопоставлены без ложной взаимозаменяемости. JSON-like дерево показывает несколько groups и ads. |
| 5.4 | ✅ COVERED | Ad определён как executable delivery binding parent, identity, creative, destination, tracking и status; creative — как message/assets, inline или reusable object. Повторный `creative_id` при разных ad IDs/parents демонстрирует различие на практике. |
| 5.5 | ✅ COVERED | «Targeting и placement» определяет placement как media environment и slot, приводит feed/stories/search/video/in-app examples, отделяет его от audience и связывает с format eligibility, оставляя format depth главе 8. |
| 5.6 | ✅ COVERED | «Objective и optimization event» раскрывает campaign objective как high-level intent/setup guidance, приводит awareness/traffic/leads/app promotion/sales и предупреждает, что labels/combinations product-specific и не равны exact optimization event. |
| 5.7 | ✅ COVERED | Optimization event/performance goal объяснён как observable result для delivery decisions; conversion action и primary/secondary grouping обозначены, а `install` versus `paid_subscription` раскрывает роль signal volume, delay, reliability и event source. |
| 5.8 | ✅ COVERED | Targeting определён как eligibility rules и model inputs по geo, device, context, audience/keyword criteria и exclusions; distinction с placement дано в таблице, а data provenance, identity и privacy явно переданы главе 6. |
| 5.9 | ✅ COVERED | Bid strategy определена как policy, переводящая goal и constraints в auction bids. Схема отдельно показывает strategy, target/cap, actual bid и price/charge; mechanics и pacing переданы главе 7. |
| 5.10 | ✅ COVERED | Budget раскрыт как resource constraint, а не гарантия result/spend/invoice; разобраны daily, lifetime/campaign-total, shared, campaign-level и ad-set scopes, allocation/inheritance и неравномерность pacing на примере `€700`. |
| 5.11 | ✅ COVERED | Schedule/flight раскрыт через start/end, account time zone, optional dayparting и eligibility. Future start даёт enabled-but-pending example, end приводит к ended/completed даже с остатком budget; interaction со status объяснён. |
| 5.12 | ✅ COVERED | Tracking settings включают IDs, URL parameters/macros/templates, pixel/SDK/server/MMP integration, conversion actions и attribution boundary. Двойная схема user/measurement paths, URL example и mapping caveat объясняют назначение и общий механизм. |
| 5.13 | ✅ COVERED | Landing page/destination/final URL определён как web page, store listing или deep link после interaction и отделён от tracking record/template. Таблица creative promise → destination → event показывает semantic alignment без ухода в CRO. |
| 5.14 | ✅ COVERED | Lifecycle mnemonic приведён и сразу заменён корректной state-vector model. Draft, learning, active, paused и completed/ended объяснены; review/schedule/effective/learning axes, reversible pause, scheduled completion и material-edit re-entry показаны отдельно. |

# Вердикт

PASS
Оркестратор применил все три необязательных улучшения 2026-08-31: namespace-тезис ограничен resource IDs; labels в JSON-дереве снабжены оговоркой; manager account и agency access разведены точнее. Coverage Table не изменяется: правки соответствуют рекомендациям аудита и не влияют на статусы.
