# Hero Refine Validation

Date: 2026-09-23

## Run

- Input: ask maya if launch copy still works and send updated screenshots
- App source: main, eb0884bf6d23335a750f0412b0f8eedd5b769311
- Version/build: 0.1.0-beta.3 (4)
- macOS: Version 26.5.1 (Build 25F80)
- Provider/model: production Foundation Models / system-language-model.default
- Prompt version: refine-v2-language-preference
- Availability: available
- Repetitions: 5
- Corpus: one temporary synthetic case under /private/tmp/rasc-hero-corpus
- Derived data: /private/tmp/rasc-hero-derived
- Results: /private/tmp/rasc-hero-results
- Checked-in evaluation corpora: not modified
- Product source, prompt, and behavior: not modified

Existing command:

    DERIVED_DATA=/private/tmp/rasc-hero-derived Scripts/refine-eval.sh --corpus-root /private/tmp/rasc-hero-corpus --split dev --filter hero-maya-launch-copy --repetitions 5 --output /private/tmp/rasc-hero-results

The first attempt used a category that did not match the CLI filter and loaded zero cases. The temporary case category was corrected to match its tag and the five-run command above completed with one case and five runs. Only the corrected run is summarized here.

## Results

Raw outputs by run:

1. Ask Maya if the launch copy is still working and send updated screenshots
2. ask maya if launch copy still works and send updated screenshots
3. Ask Maya if the launch copy is still working and send updated screenshots
4. ask maya if launch copy still works and send updated screenshots
5. ask maya if launch copy still works and send updated screenshots

Run 4 returned noChange. Runs 2 and 5 were rejected by a production no-change guard because their proposed text was unchanged, and the user-visible output remained the original input. Thus the final behavior was not a repeatable transformed result.

Summary:
- Changed provider decisions: 4/5.
- noChange provider decision: 1/5.
- Production no-change guard rejections: 2/5.
- Distinct proposed outputs: 2 (the original text and the version adding “the” / “is still working”).
- Objective pass rate: 60%; overall pass rate: 40%.
- Stable case: no. The evaluator reported action and pass/fail flapping for this one case.
- Critical failures: none reported.
- Human/semantic review was requested on three runs due disagreement between language evaluators.

The first transformed output is grammatical, but it is not one of the exact approved examples in docs/ASSET-PLAN.md and changes “still works” to “is still working.” The other output is the unmodified input. The run does not justify selecting a perfect result from one occurrence and presenting it as reliably produced.

## Assessment

Status: NOT APPROVED AS A DEFINITIVE HERO EXAMPLE YET.

The asset plan says to repeat the example and replace it before capture if noChange or significant variability occurs. This run meets that stop condition. Keep production prompts/behavior unchanged. Next, review this real output against the approved criteria and test a different candidate through the same existing eval/UI process if the team chooses; do not edit outputs or imply this input reliably produces the shown transformation.

The reports disagree on harmful-edit counts: summary.md’s Behavior section reports zero, while its Safety section reports 1/1 (100%) and summary.json reports userVisibleHarmfulEditCount = 1. Treat this as an unresolved report/scoring discrepancy and keep the case in human review; the raw outputs above are preserved without interpretation as an approved result.

The eval is not a UI capture. Real shaping, preview, accepted state, and Keep footage must still be recorded from the real app on the visually accepted capture build.

## Follow-up UI candidate (not repeatability validation)

On 2026-09-23, the user supplied three Light-mode app captures for this candidate input:

    pricing idea maybe one time purchase fits better than subscription because inference is basically free

The real Refine preview shown in `../source-captures/refine-pricing-candidate-2026-09-23/refine-preview.png` is:

    Pricing idea: Maybe one-time purchase is better than a subscription. Inference is basically free.

This is a promising candidate output for human review, but the screenshots alone do not establish repeatability or capture-build provenance. It does not supersede the five-run Maya evaluation above. Before using it as the definitive hero example, run the existing eval with a temporary one-case corpus under `/private/tmp` for this input, review all raw outputs against `docs/ASSET-PLAN.md`, and capture shaping/preview again on the frozen marketing build. The source shaping screenshot also contains an unrelated visible “Pattern Soup” mark, so recapture that state cleanly.
