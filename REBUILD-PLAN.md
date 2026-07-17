# seo-guildford.uk — Full Rebuild Plan: Foundation First, Then Dominate

**Repo:** `C:\Users\sunny\repos\seo-guildford\` · **Deploy:** `git push` to `master` → Cloudflare Pages auto-build · **Date:** 2026-07-17

---

## 1. Reality Check

The "position 3" reading for "seo guildford" was VPN/geo-proximity personalization bias and is discarded. The true national baseline is **position 47-56 and worsening** (other core queries 45-95), with **539 impressions and 1 click over 28 days** (0.19% CTR), and **9 of 10 core URLs unknown to Google** — worse than 10 days ago. The site already has content depth and schema breadth; the constraint is **trust and discoverability**: zero real backlinks/citations, an entity ghost (empty `sameAs: []` everywhere, no named human, no phone), and live spam-policy liabilities (fabricated Review schema, invented ROI figures). Rank/convert/AI work on unindexed pages is wasted motion, so nothing in Phase 2 starts until Phase 1's indexation gate is met.

**Load-bearing sequence:** F1 clean → F2 index (exit gate: ≥9/10 core URLs indexed) → F3 entity + F4 citations corroborate → then Phase 2 (D1 activate → D2 AI gap → D3 build → D4 scale → D5 continuous loop).

**Known cross-dependency:** F1 step on "we/our team" copy is gated on F3's identity decision — land them in the same commit or F3 first. Do not treat F1/F3 as fully parallel.

---

## 2. Phase 1 — Foundation

### F1 — Spam-Policy & Trust Remediation (de-risk the domain)

**Objective:** Remove every fabricated-trust liability from markup and copy so the first clean recrawl sees a policy-compliant site.

**Why first:** Pushing the current pages into the index would submit fabricated `@type: Review` markup (5-star reviews from fictional personas) and undisclosed invented ROI figures straight into Google's spam-detection surface. Clean before F2's resubmission so indexation is requested on a site that can survive review.

**Tactical checklist:**

1. **Strip fake Review schema — case study 1.** `src/pages/case-studies/guildford-property-firm-local-seo.astro:25-31` — delete the `Review`/`reviewRating`/`author: Person` block entirely (fictional "Director, Guildford Estate Agency"). Do not replace with `aggregateRating` — there is no real review data.
2. **Strip fake Review schema — case study 2.** `src/pages/case-studies/surrey-research-park-tech-startup.astro:~25-31` — same removal ("CTO, Surrey Research Park Startup").
3. **De-claim SERP-facing metadata.** In both case-study files, rewrite the `Article.description` schema field and `<Base title/description>` props to drop bare stat claims ("280% more GBP calls", "£2.4M in attributed property sales", "340% organic traffic growth") — these surface in SERP snippets with no visible "illustrative" qualifier. Reframe as capability statements with no numbers in title/meta.
4. **Surface the disclaimer.** Move the "illustrative, anonymised" disclosure from buried FAQ copy to a visible top-of-page notice directly under the H1, above the `quick-answer` block (matching `case-studies/index.astro`'s intro treatment). On-page numeric figures may stay only under this visible disclaimer, labelled "illustrative range", and never repeated in schema.
5. **Pricing-page ROI disclaimer.** `src/pages/seo-pricing-guildford.astro` ~lines 283-297 ("ROI Examples for Guildford Businesses": estate agent 18:1, B2B software, physiotherapy scenarios) — add a visible disclaimer line immediately under the `<h2>` heading, e.g. *"These are illustrative scenarios based on typical Guildford market data, not results from a specific named client."* Reuse the existing disclaimer callout CSS class from about/case-study pages, don't invent new markup.
6. **Full-site claims sweep.** `grep -rn "£[0-9]" src/pages/` and `grep -rniE '[0-9]{2,3}%|£[0-9][0-9,]*' src/pages/index.astro src/pages/about.astro src/pages/services/index.astro src/pages/industries/index.astro` — manually verify no other page carries an unqualified specific-client claim and the 07-07 homepage hero-stats fix hasn't regressed.
7. **Resolve "we/our team" language** (gated on F3 identity decision — same commit or after). All 5 instances: `about.astro:202`, `contact.astro:201`, `free-seo-audit-guildford.astro:118,179`, `seo-pricing-guildford.astro:333`. Either model drops "team" framing entirely — there is no team.
8. **Verify + deploy.** `grep -rn "\"@type\": \"Review\"\|aggregateRating" src/` must return zero. `npm run build`, confirm 18 pages compile, grep `dist/` to confirm compiled HTML emits no Review schema, commit as a spam-policy fix, push.
9. **Post-deploy:** Rich Results Test both case-study URLs — no Review/Rating type detected. Monitor GSC URL Inspection for manual-action flags (non-blocking). Update repo `CLAUDE.md` to close the 07-07 "residual fake-review-schema risk" note.

**Acceptance criteria:**
- Zero `@type: Review` / `aggregateRating` blocks in `src/` (grep-confirmed) unless backed by a real, attributable review.
- Rich Results Test on both case-study URLs returns no Review/Rating markup.
- Pricing ROI Examples section carries the same visible illustrative disclaimer as the case studies.
- No page presents a specific £/ratio figure as a factual client result without a disclaimer.

---

### F2 — Indexation Recovery & Crawl Architecture

**Objective:** Fix every mechanical reason Google could fail to discover, crawl, or trust the URL set, then actively request (re)crawl of all core URLs. **This workstream's exit metric is the Phase 2 gate.**

**Why here:** Free, fully-in-control fixes and hard prerequisites — a phantom `/tools/` breadcrumb node pointing at a live 404, orphaned tool pages, and an incomplete `llms.txt`/sitemap bleed crawl equity. Resubmit only once the site is clean (F1) and internally coherent.

**Tactical checklist:**

1. **Build `src/pages/tools/index.astro`.** Currently a live 404 while all 3 tool pages' BreadcrumbList schema (`ai-search-readiness-checker.astro:10`, `local-seo-checklist.astro:10,98`, `seo-roi-calculator.astro:10`) reference `/tools/` as parent. Model on `src/pages/case-studies/index.astro` — cards to all 3 tools, own BreadcrumbList/CollectionPage schema, canonical `/tools/`.
2. **Desktop nav.** `src/layouts/Base.astro:62-70` — add `Tools` (`/tools/`) and `Pricing` (`/seo-pricing-guildford/`) links to the primary `<nav>` (neither currently in header nav).
3. **Mobile drawer.** `Base.astro:78-90` — add matching Tools + Pricing links.
4. **Footer.** Pricing already exists at `Base.astro:112` — add a Tools `<li>` beside it.
5. **Cross-link the 3 tools.** Add a "Related tools" block near the bottom of each tool page linking to the other two + back to `/tools/`.
6. **Complete `public/llms.txt`.** Currently 12 URLs; add the 6 missing: `/tools/`, `/tools/ai-search-readiness-checker/`, `/tools/local-seo-checklist/`, `/tools/seo-roi-calculator/`, `/case-studies/guildford-property-firm-local-seo/`, `/case-studies/surrey-research-park-tech-startup/` — total ~18 matching the sitemap.
7. **Verify sitemap.** `@astrojs/sitemap` is configured with no exclusions in `astro.config.mjs`; after adding the tools index, `npm run build` and confirm `dist/sitemap-index.xml` / `dist/sitemap-0.xml` list all ~18 URLs. Verify `sitemap-index.xml` is reachable post-deploy.
8. **Deploy first, then submit:**
   - GSC: confirm the `seo-guildford.uk` property via `mcp__gsc-sunnypat81__list_properties` (add via `add_site` if absent), then `submit_sitemap`.
   - `mcp__gsc-sunnypat81__batch_url_inspection` (or manual URL Inspection → Request Indexing) on the 10 core URLs: `/`, `/services/`, `/areas/`, `/industries/`, `/seo-pricing-guildford/`, `/ai-search-optimisation-guildford/`, `/technical-seo-guildford/`, `/case-studies/`, `/about/`, `/tools/`.
   - Mirror to Bing: `mcp__bing-webmaster__add_site` if needed, then `submit_url_batch` on the same 10 (Bing indexes faster; Google sometimes follows Bing's crawl signal on young domains).
9. **Resubmit sitemap after the F3 schema/entity push** — a fresh ping after a meaningful entity update can nudge recrawl priority.
10. **Recheck at the 2-3 week mark** via `mcp__gsc-sunnypat81__check_indexing_issues` / URL Inspection. If still stuck after GBP + 3-4 citations are live (F4), escalate per the repo brain's earmarked fallback (targeted manual link acquisition).

**Acceptance criteria:**
- `/tools/` returns 200; no internal link or schema node in `src/` points at a 404.
- All ~18 canonical URLs appear in both the XML sitemap and `llms.txt`.
- Tools and Pricing reachable from primary nav on desktop and mobile (present in `Base.astro` markup).
- Sitemap shows Success in GSC with full URL count discovered.
- All 10 core URLs put through URL Inspection → Request Indexing (submissions logged).
- **PRIMARY EXIT METRIC / PHASE 2 GATE:** GSC returns "Indexed" (minimum "Crawled/Discovered", off "unknown to Google") for ≥9/10 core URLs on recheck.

---

### F3 — Entity Home & Identity Signals

**Objective:** Establish one corroborated real-world identity — named human, contact reality, populated `sameAs` — so Google and AI engines can resolve the entity behind the domain.

**Why here:** Part of why the domain has no crawl trust is that it's an unincorporated entity ghost — plural "team" with zero named humans, `sameAs: []` on every schema block, no phone, email-only. The site's own AI-optimisation page names `sameAs`/entity salience the #1 GEO factor while practicing the opposite. Runs concurrent with F2 once F1 lands; resolves the identity question F1 depends on.

**Tactical checklist:**

1. **Identity decision (blocks F1 we→I copy and all schema below — business decision, needs Sunny's confirmation).** Default recommendation: real named practitioner = Sunny Patel, `Person` schema, ND Media LTD as operating entity — consistent with the existing rate-card/invoicing setup (verify which entity this domain sits under in `master-builds.md` / `reference_invoicing-system.md`). Alternative: honest first-person-singular solo positioning with no named-person schema.
2. **Bio block.** Replace "Our team brings..." (`about.astro:202,204`) with a real bio/photo/credentials; remove the unverifiable "25,000 indexed pages" portfolio-scale claim (`about.astro:204`) unless backed by a specific named evidenced site.
3. **`Person` schema** in `about.astro`: `name`, `jobTitle`, `worksFor` (SEO Guildford), `sameAs` (LinkedIn etc.), `image`. Name byte-identical across site, GBP, LinkedIn.
4. **Entity schema hardening:** add `logo` and `image` to both `orgSchema` blocks (`index.astro:7-20`, `about.astro:25-37`) pointing at a hosted square logo in `public/` (Knowledge Panel eligibility); add `founder` Person to `about.astro`'s orgSchema linking the real LinkedIn.
5. **Create/confirm external profiles** to make `sameAs` truthful: Google Business Profile (F4.1), LinkedIn personal + company page, Companies House cross-link if ND Media LTD is the trading entity (link it, don't hide it), Bing Places.
6. **Populate all 10 empty `sameAs` arrays** with the identical URL set: `about.astro:31`, `ai-search-optimisation-guildford.astro:31`, `contact.astro:35`, `free-seo-audit-guildford.astro:31`, `index.astro:13,29`, `seo-audit-guildford.astro:34`, `seo-pricing-guildford.astro:30`, `technical-seo-guildford.astro:34`. Grep-verify: `grep -rn "\"sameAs\": \[\]" src/` returns zero.
7. **Real contact channel beyond email.** No `telephone` or `tel:` exists anywhere in `src/`. Add a real phone number to the `LocalBusiness`/`ContactPage` schema (`contact.astro` ~line 34, `index.astro`, `about.astro`) and visibly in `Base.astro` footer (~line 106), and/or a live booking link (see D1.2 — decide whether Sunny wants inbound calls on this domain; a Cal.com/Calendly link satisfies the criterion if not).
8. **NAP lock.** Once GBP exists (F4), byte-diff `contact.astro`'s address block (`addressLocality: Guildford, addressRegion: Surrey`) against the GBP listing — exact match including service-area wording.

**Acceptance criteria:**
- No plural "team" or unverifiable portfolio-scale claim remains unbacked by a named, evidenced human.
- At least one named person on-site with matching `Person` schema, name consistent across site/GBP/LinkedIn.
- `sameAs` non-empty and identical across every schema block; every URL resolves to a live on-brand profile; zero `sameAs: []` remaining (grep-confirmed).
- Working contact method beyond email exists in markup and visible on the contact page.
- NAP byte-for-byte consistent between site and GBP.

---

### F4 — Initial Local Citations & Foundational Backlinks

**Objective:** First tranche of real, consistent citations and links so a young zero-link domain earns external corroboration and discovery paths. Deliberately modest — aggressive scaling is D4.

**Why last in Phase 1:** Citations require F3's finalized NAP — building first would propagate inconsistent data. This addresses the diagnosed root cause: indexation here is a domain-trust/backlink problem, not a content problem.

**Tactical checklist:**

1. **Claim + verify Google Business Profile** — category "SEO agency"/"Marketing consultant", NAP exactly matching `contact.astro`, link to `https://seo-guildford.uk`. Postcard/phone verification per GBP flow. Single highest-leverage move: GBP verification is itself a trust signal cross-referenced against site schema.
2. **Citation targets (≥3 required, priority order, NAP-identical):**
   - Google Business Profile (above)
   - Bing Places for Business (pairs with F2's Bing Webmaster submission)
   - Surrey Chamber of Commerce member directory — actually join; the site already name-checks it in copy
   - LinkedIn Company Page
   - Companies House cross-link (if ND Media LTD is the registered entity)
   - One general UK directory with real NAP fields and a live outbound link (Yell.com, Thomson Local, or FreeIndex)
   - Optional: Clutch.co / DesignRush agency listings; Guildford BID / Guildford Business Forum directory; Surrey Research Park business listing (matches `industries/` cluster)
3. **NAP identical everywhere** — copy-paste name/phone/URL from the F3 canonical block into every form; zero manual retyping.
4. **Crawlable link check:** confirm at least one citation's live HTML contains `<a href="https://seo-guildford.uk">` (view-source on the published listing, not the submission form).
5. **Populate `sameAs`** with each confirmed profile URL as it goes live (loop-closes F3.6).
6. **2-3 genuine backlinks in month one**, not directory filler: guest contribution or quoted comment on a Surrey business/local-news site; a portfolio cross-link only if topically defensible (single, contextual, editorial — skip if it'd look like a link farm).
7. **Log every citation URL** (GBP dashboard link, listing URLs) — this log is the acceptance evidence.
8. **Explicitly do not:** buy links, use PBNs, or link-exchange schemes — matches the site's own stated stance.

**Acceptance criteria:**
- GBP claimed and verified (confirmed in GBP dashboard).
- ≥3 real local citations live, NAP identical to site and GBP, URLs logged and manually confirmed live.
- Zero NAP variants across any listing.
- ≥1 citation passes a crawler-followable link back to the domain (confirmed in live HTML).

---

## 3. Phase 2 — Dominate

**Hard gate: nothing below begins until F2's exit metric passes (≥9/10 core URLs indexed/crawled).** Before kickoff, re-verify the Phase 1 assumptions that Phase 2 depends on — confirm each F-workstream was actually closed; don't assume.

### D1 — Conversion Architecture Activation

**Objective:** Convert now-indexed traffic by closing trust-and-action gaps for cold local leads. Activation, not construction — the assets (transparent pricing, two-tier audit funnel, three interactive tools) already exist.

**Tactical checklist:**

1. **Phone.** No `tel:` link exists anywhere (grep-confirmed). Decide real mobile vs VoIP/forwarding number for a solo operator; add `tel:` to `Base.astro` header (next to line 69) and footer (near line 106) — one shared layout cascades to all 18 pages.
2. **Booking link.** Zero scheduling hrefs exist. Sunny action: create a Cal.com/Calendly free-tier link (e.g. `cal.com/seo-guildford/15min`). Then wire:
   - `free-seo-audit-guildford.astro:181` — "you may book a 15-minute call" is plain text; make it a link.
   - `Base.astro` header CTA (line 69) + mobile drawer CTA (line 89) — add secondary "Book a Call".
   - `contact.astro` ~line 118 — booking block beside the StaticForms form as the lower-friction path.
   - `seo-pricing-guildford.astro:413-414` — add booking as third CTA (pricing visitors are closest to decision).
3. **Above-the-fold check:** post-deploy, verify at 375px and 1280px that phone/booking renders in the first viewport on `/`, `/contact/`, `/seo-pricing-guildford/`.
4. **Fix the invisible form confirmation.** Both forms redirect to `?sent=1` (`contact.astro:124`, `free-seo-audit-guildford.astro:127`) but neither page reads `Astro.url.searchParams` — visitors land on a blank form with no confirmation. Add a `sent` check in both frontmatters and render a confirmation banner. Manually test both forms end-to-end live post-deploy.
5. **Tools funnel:** confirm `/tools/` index exists and all three tools cross-link each other and the audit CTA (should be closed in F2; verify, fix here if not).

**Acceptance criteria:**
- Working booking link resolves from every "book a call" CTA; no dead/implied-only CTAs.
- Phone/booking above the fold on home, contact, pricing.
- All contact + audit forms submit end-to-end and show their confirmation (manually tested post-deploy).
- All three tools link to the audit CTA and to each other.

### D2 — AI-Search / GEO-AEO Citation Optimization

**Objective:** Make the site the extractable, citable answer source for Guildford/Surrey SEO queries across AI Overviews, ChatGPT, Perplexity, Copilot, Claude. The competitor snapshot shows GEO/AI messaging is an open differentiation gap (only Air Social and Artemis push it) — this is the highest-leverage differentiation available.

**Hard dependency check:** if `sameAs` is still `[]` at kickoff, D2 is blocked on F3, full stop.

**Tactical checklist:**

1. **`llms.txt` completeness diff** against sitemap output — must be a 100% match (F2 added the missing 6; maintain it).
2. **Tighten `quick-answer` blocks** (exist site-wide on all 18 pages — activation, not construction). Each must be a self-contained 2-3 sentence extractable answer with no dependent pronouns, answering "what is X service" not "why choose us". Priority: `technical-seo-guildford.astro:118`, `seo-audit-guildford.astro:118`, `ai-search-optimisation-guildford.astro:118`, `seo-pricing-guildford.astro`, `/`.
3. **Validate FAQPage schema** on all 13 files carrying it via Rich Results Test post-deploy; log pass/fail per URL.
4. **Entity consistency sweep:** grep all `"sameAs"` occurrences across `src/pages/**/*.astro` — identical URL set in every file, name/Person references consistent, no drift.
5. **Baseline AI-citation check:** manually query ChatGPT and Perplexity (minimum) for `seo guildford`, `seo agency guildford`, `ai search optimisation guildford`, `technical seo surrey` — log cited-or-not per engine per query in a dated table. Presence/absence only, no fabricated numbers. This is the D4/D5 measurement baseline.

**Acceptance criteria:**
- FAQPage schema validates on every page carrying an FAQ block.
- `llms.txt` = 100% of canonical URLs (manual diff vs sitemap).
- On-page entity references internally consistent across all pages (grep/diff-confirmed).
- Each core service page has a self-contained extractable answer block for its head query.
- Baseline AI-citation table logged for core queries across ≥2 engines.

### D3 — Topical Expansion & Content Freshness Engine

**Objective:** Give the 18-page brochure a real freshness mechanism, expand coverage against demonstrated demand, and remove the AI-generated "tell". Content is deliberately NOT earlier — it was never the bottleneck. Needed because the site recommends "content updated monthly" to clients while having no blog (an E-E-A-T self-contradiction), and the repeated metaphor is a fingerprint.

**Tactical checklist:**

1. **De-duplicate the metaphor.** Cartographer/surveyor/gardener imagery: 6 instances across 3 pages — `index.astro:116,190,219,316`, `about.astro:113`, `industries/index.astro:217`. Acceptance is ≤1 page site-wide: keep it on `about.astro` only (methodology home), rewrite all `index.astro` and `industries/index.astro` instances in direct literal language (no substitute stock metaphor — per Koray semantic rules).
2. **Stand up the blog.** `src/pages/blog/index.astro` listing + `src/content/blog/` Astro content collection for dated posts (no blog infrastructure exists today — grep-confirmed).
3. **Seed post:** publish 1 dated post, topic sourced from real query data (item 4), not invented.
4. **Demand-driven topics:** once impressions accrue post-indexation, pull queries via `mcp__seogets__list_site_queries` (SEO Gets preferred per its own MCP instructions) or `mcp__gsc-sunnypat81__get_search_analytics`; log source queries against each planned page in the D5 tracker.
5. **Every new page passes `/semantic-audit` before publish** — standing rule, no exceptions.
6. **Maintain completeness:** update `llms.txt` + confirm sitemap coverage on every post — don't let the freshness engine reopen the D2 gap.

**Acceptance criteria:**
- Functioning blog/insights section with working index route and ≥1 published dated post.
- Metaphor appears on ≤1 page (grep-confirmed across `src/pages/`).
- Every new topic has a logged source query from real GSC data.
- Every new page passes `/semantic-audit` pre-publish.

### D4 — Authority & Backlink Scaling

**Objective:** Scale beyond F4's foundational citations to genuine editorial authority — the competitor snapshot shows awards/partner/third-party-validation signals are the niche's trust currency, and the site has none. Compounding, not bootstrapping: requires live link-worthy assets (tools in-nav from F2/D1, fresh content from D3) and a stable indexed entity.

**Tactical checklist:**

1. **Target: N = 5 new editorially-earned referring domains** for the first cycle (solo-operator-realistic). Log each as URL + anchor + date + manual verification (loads, followable, on-topic) in a tracker (`docs/backlink-log.md` or a Sheets tab under existing tracker infra).
2. **Outreach tied to real assets:** pitch the 3 interactive tools ("free AI search readiness tool for Surrey businesses") and case content to Surrey business blogs, Surrey Chambers, Guildford BID, genuinely on-topic local audiences. No generic directory spam.
3. **One third-party validation signal**, solo-operator-realistic: Clutch.co or DesignRush profile (free-tier, corroborable), Surrey Chamber membership badge, or a genuine client testimonial with reciprocal backlink.
4. **Track the delta:** GSC Links report baseline is confirmed zero referring domains pre-Phase-1; log the observed delta at each review — never a projection.
5. **Never:** PBNs, bought links, exchanges.

**Acceptance criteria:**
- ≥5 new editorially-earned referring domains beyond F4, each logged and manually verified live/followable/on-topic.
- ≥1 third-party validation signal live on-site and corroborated by the issuing source.
- GSC referring-domain count increased from the zero baseline (delta logged as observed fact).

### D5 — Measurement, CTR & Rank Loop (continuous)

**Objective:** The standing feedback loop that turns indexed pages into ranked, clicked pages and catches decay. Last because it consumes data that only exists once Phase 1 succeeds — the current 0.19% CTR is a symptom of invisibility, not a title problem.

**Tactical checklist:**

1. **Monitoring view** (Sheet or SEO Gets dashboard) tracking the core national query set with the baseline hard-coded: "seo guildford" pos 47-56, others 45-95, 539 impressions / 1 click per 28 days. Primary source: `mcp__seogets__get_gsc_performance` (longer history), GSC/Bing secondary.
2. **CTR rewrites only fire on URLs with real impression volume post-indexation.** Respect the ≤20 pages/site guard (`feedback_ctr_rewrite_guard.md`); never run this site in the same week as another site's CTR batch. Use `/ctr-rewrite`; keep a change log (URL, old/new title+meta, date, impressions-at-trigger).
3. **Observed facts only:** each cycle logs position/impression deltas against baseline — no targets or forecasts in the log (no-unearned-claims rule).
4. **Cadence:** weekly indexation/impression check via `check_indexing_issues`; monthly striking-distance/decay pass via the `content-decay` skill only once ≥90 days of post-indexation data exists (insufficient signal before that). Log every cycle's output in the same tracker.

**Acceptance criteria:**
- Repeatable monitoring view exists with the pre-work baseline recorded.
- CTR rewrites touch ≤20 pages, only on URLs with real impression data, with a change log.
- Every cycle logs deltas as observed facts only.
- Decay/striking-distance check runs on the defined cadence with logged output.

---

## 4. How We'll Know It's Working

Real, checkable leading indicators only — all pulled from GSC/Bing/GA4, all measured against the recorded baseline. No traffic or revenue projections at any stage.

| Indicator | Baseline (2026-07-17) | Source | Signal of progress |
|---|---|---|---|
| Core URLs indexed | 1/10 (9 "unknown to Google") | GSC URL Inspection / `check_indexing_issues` | ≥9/10 Indexed or Crawled — the Phase 2 gate |
| Sitemap discovery | Not fully submitted/complete | GSC Sitemaps report | Success status, full ~18-URL count discovered |
| Crawl recency | Stale/never on 9 URLs | URL Inspection "last crawl" | Fresh crawl dates appearing on core URLs post-F2 |
| Referring domains | 0 | GSC Links report | Any nonzero count (F4), then D4 delta — logged, not projected |
| Position, "seo guildford" (national) | 47-56, worsening | GSC / SEO Gets | Delta logged per cycle; direction reversal is the first meaningful signal |
| Positions, other core queries | 45-95 | GSC / SEO Gets | Same — observed deltas only |
| Impressions / clicks (28d) | 539 / 1 | GSC performance | Impression growth first (indexation working), click growth second |
| Spam-risk surface | Fake Review schema live, undisclosed ROI figures | Rich Results Test + grep | Zero Review/rating markup detected; disclaimers visible |
| Entity corroboration | `sameAs: []` × 10, no GBP, no phone | grep + GBP dashboard | All arrays populated with resolving URLs; GBP verified |
| AI citation presence | Unknown (unbaselined) | Manual ChatGPT/Perplexity checks (D2.5) | Dated cited/not-cited table; any first appearance is the signal |
| Form conversions | Confirmation invisible (broken UX) | Live end-to-end tests + GA4 | Confirmed submissions post-D1 fix |

Interpretation rules: impressions recover before positions, positions before clicks. If the indexation gate hasn't moved 2-3 weeks after F1-F4 complete, escalate per F2.10 (targeted manual link) rather than adding content.

---

## 5. What NOT to Do Yet

1. **Do not scale content onto an unindexed site.** D3's blog/expansion waits for the F2 gate.
2. **Do not request indexing before the spam cleanup ships.** F1 strictly precedes F2 submission.
3. **Do not run CTR title/meta rewrites.** 539 impressions/1 click is invisibility, not a title problem.
4. **Do not build citations before F3's NAP is locked.**
5. **Do not start outreach/digital PR (D4) before foundation citations and link-worthy assets are live.**
6. **Do not buy links, use PBNs, or exchange links — ever.**
7. **Do not trust geo-personalised rank checks.** All measurement is national position from GSC/SEO Gets; no VPN/incognito spot-checks as evidence.
8. **Do not assert any target position, traffic, or revenue number anywhere** — logs record observed deltas only.
9. **Do not run the content-decay loop before ≥90 days of post-indexation data.**
10. **Do not assume Phase 1 items are done at Phase 2 kickoff.** Verify each F-workstream's grep-checkable criteria before opening D1.

---

**Immediate next action:** F1 items 1-2 (delete both fake Review schema blocks) — smallest change, removes the largest live risk, and unblocks the entire F2 resubmission chain. Pair with the F3 identity decision (Sunny call: named-practitioner vs solo-anonymous) in the same working session so the we→I copy fix can land in one commit.
