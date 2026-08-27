# Резюме аудита

Текущий draft объёмом 327 строк прочитан заново двумя bounded reads: строки 1–180 и 181–327. Source заканчивается на строке 327 записью 8 раздела «Источники и дополнительное чтение»; `[Showing lines ...]` в файле отсутствует и не принимался за содержимое главы.

Все 25 требований master TOC (3.1–3.25) раскрыты по существу. Глава даёт цельную mental model от opportunity и protocol requests до outcomes, денежных метрик и трёх measurement perspectives; формулы и walkthrough арифметически согласованы. Блокирующих, существенных или вводящих в заблуждение проблем не найдено.

# Блокеры

None.

# Важные проблемы

None.

# Необязательные улучшения

None.

# Проверка корректности

Определения и distinctions согласованы с planner research и датированными первичными источниками. Раздел «От opportunity до возможного exposure» не отождествляет media opportunity с HTTP/OpenRTB request, разделяет served, rendered, measurable, viewable, non-viewable и non-measurable, а classic MRC thresholds сопровождает format/environment caveat. Раздел «От exposure к реакции и outcome» корректно отделяет observation, attribution и causality. CPM/eCPM, CPA/CAC, spend/cost/revenue и ROAS/ROI разведены по denominator, participant и ledger boundary.

Все вычисления walkthrough перепроверены: CTR `2%`, CPM `$12`, CPC `$0.60`, click-to-subscription CVR `15%`, CPA `$4`, ROAS `5.0x`, ROI `−20%`, ARPU `$1`, ARPPU `$10`, fill rate `80%`, eCPM `$10`, bid rate `75%`, win rate `20%`. Текущие и legacy claims маркированы корректно: OpenRTB 2.6 PDF не выдан за исчерпывающее current implementation state; Google Ad Manager old Reports обозначен как deactivated в июне 2026 года, а sell-through — как current product-specific definition; MRC documents приведены с датами и ограничениями scope.

Cross-reference в строке 283 ведёт к главе 32 «Почему цифры не сходятся», где master TOC помещает reconciliation (32.20); ссылка корректна.

# Проверка границ и плотности

Глава остаётся в заявленных границах. Она не повторяет роли экосистемы из главы 2, передаёт gross/net accounting и settlement в главу 4, tracking/attribution mechanics — в главы 21–29, детальную reconciliation — в главу 32, fraud — в главу 36, глубокую viewability methodology — в главу 37. OpenRTB, MRC и Google examples используются только для определения measurement contracts и current/legacy caveats, без ухода в protocol или vendor UI tutorial.

Повторы между «С чем это часто путают» и «Что важно запомнить» компактны и выполняют разные педагогические функции: первый раздел исправляет misconceptions, второй конденсирует operational checklist. Для 25 обязательных метрик и distinctions плотность оправдана; лишних rabbit holes или материала соседних глав не найдено.

# Coverage Table

| Requirement | Status | Evidence / Explanation |
|---|---|---|
| 3.1 | ✅ COVERED | Раздел «От opportunity до возможного exposure» определяет opportunity как событие на media surface, request как system-bound message и объясняет связи `0..N`, fan-out, retries и batching; diagram показывает protocol boundary. |
| 3.2 | ✅ COVERED | Там же impression определён как зарегистрированное событие по counting rule конкретной системы; явно сказано, что label без qualifier не доказывает render, viewability или attention. |
| 3.3 | ✅ COVERED | Таблица состояний различает served, rendered, measurable, viewable, non-viewable и non-measurable; MRC thresholds датированы и ограничены format/environment, а `viewable ≠ attention` сформулировано явно. |
| 3.4 | ✅ COVERED | Подраздел «Reach и frequency» даёт reach count/rate formulas, требует unique entity, universe, period и cross-device de-duplication scope и сравнивает device, person и household counts. |
| 3.5 | ✅ COVERED | Frequency определена как `qualifying impressions / reached unique entities` за тот же период; пример `60,000 / 20,000 = 3` объясняет, что это среднее, а не одинаковое число показов каждому. |
| 3.6 | ✅ COVERED | Click определён как qualifying user-initiated interaction; flow различает initiated, measured, received и resolved click и объясняет расхождения через закрытие экрана, network failure, redirects и filters. |
| 3.7 | ✅ COVERED | Дана формула `CTR = qualifying clicks / counted impressions × 100%`, расчёт `160 / 8,000 = 2%` и объяснение зависимости от impression/click basis, filters и aggregation population. |
| 3.8 | ✅ COVERED | Conversion раскрыта как advertiser-defined valuable action; subscription example различает install, trial, payment и renewal, а текст отделяет observed outcome, attributed conversion и causal effect. |
| 3.9 | ✅ COVERED | CVR задана через declared eligible precursor; таблица сопоставляет click-to-install, install-to-trial и click-to-subscription, а пример Google Ads объясняет допустимый CVR выше 100% при multiple actions/`Every`. |
| 3.10 | ✅ COVERED | CPM определён и как возможный pricing/bid label, и как observed `advertiser cost or spend / counted impressions × 1,000`; buyer perspective и расчёт `$12` показаны явно. |
| 3.11 | ✅ COVERED | eCPM дан как `recognized revenue / counted impressions × 1,000`, обычно с publisher/seller perspective; текст объясняет нормализацию demand с разными underlying pricing mechanics и отличие от CPM. |
| 3.12 | ✅ COVERED | CPC определён как `cost / qualifying clicks`, отделён от bid/target CPC и рассчитан в walkthrough как `$96 / 160 = $0.60`. |
| 3.13 | ✅ COVERED | CPA определён как `cost / qualifying advertiser-defined actions`; перечислены trial, order, lead и subscription, проведено содержательное отличие action-level platform CPA от CAC. |
| 3.14 | ✅ COVERED | CPI задан как `cost / qualifying installs`; прямо указана зависимость install count от measurement и attribution rules и связь с mobile acquisition. |
| 3.15 | ✅ COVERED | CPL задан как `cost / qualifying leads`; глава требует business definition lead, отмечает quality limitation и не приравнивает lead к customer. |
| 3.16 | ✅ COVERED | CAC определён как `allocated acquisition costs / new customers`; объяснены customer event, media/agency/sales/onboarding allocation, refunds и причина, по которой platform CPA нельзя переименовать в CAC. |
| 3.17 | ✅ COVERED | Раздел «Чьи деньги и какой return» определяет revenue относительно выбранной entity и recognition rules, различает estimated, invoiced, settled и recognized states и требует period/currency/participant scope. |
| 3.18 | ✅ COVERED | Spend определён как buyer media outflow, cost — как затраты анализируемой entity; money-label flow показывает смену смысла суммы между advertiser, platform и publisher и передаёт settlement details в главу 4. |
| 3.19 | ✅ COVERED | ROAS задан как `attributed conversion value or revenue / ad spend`, объяснены формы `5.0x`/`500%`, attribution/value-field dependence и отсутствие causal proof. |
| 3.20 | ✅ COVERED | ROI задан как `net profit / total relevant investment cost` и эквивалентная формула через return и costs; пример `−$120 / $600 = −20%` показывает совместимость высокого ROAS с отрицательным ROI. |
| 3.21 | ✅ COVERED | Таблица ARPU/ARPPU различает all eligible users и paying users, revenue scopes, period и refunds; пример даёт `$1` против `$10`, а GA Data API приведён как product-specific, не universal contract. |
| 3.22 | ✅ COVERED | LTV раскрыт через cohort, horizon, identity, observed/predicted status и revenue/contribution basis; отдельно объяснены observed 30-day и predicted 12-month variants. |
| 3.23 | ✅ COVERED | Fill rate помещён на publisher/ad-server stage и дан как один распространённый contract; chapter отдельно раскрывает ambiguous numerator/denominator, matched-without-render case, video pods и соседние match/response/delivery labels. |
| 3.24 | ✅ COVERED | Win rate помещён на bid-to-win stage, дан как `winning bids / submitted eligible bids`, сопоставлен с bid rate и отделён от delivery/billing; Google Ad Manager example явно помечен legacy. |
| 3.25 | ✅ COVERED | Раздел «Одна campaign, три правдивых отчёта» согласованно показывает advertiser, publisher и platform subsets, формулы, boundaries и ledgers; объясняет asynchronous events, filters и отличие data flow от money flow, затем направляет reconciliation в главу 32. |

# Вердикт

PASS
