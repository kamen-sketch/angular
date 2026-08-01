# mXSS loop — real-browser reproduction (F-01)

Real-Chromium evidence for the `html_sanitizer.ts` mXSS stabilization-loop
defect described in `analysis/DEFECTS.txt` (F-01). Replaces the earlier
abstract JS simulation that a first report was rejected for.

## What this proves

Running the **verbatim** Angular sanitizer code (`html_sanitizer.ts` +
`inert_body.ts`, ported into `sanitizer.js`) against the **browser's own
DOMParser** in Chromium 141:

1. The shipped loop performs **at most 2 iterations** for every input — the
   5-attempt budget is unused and the `"input is unstable"` throw is dead code.
2. Real inputs need **≥3 rounds** to stabilize (`math/mtext`, `li foster`) —
   the shipped loop stops before the fixed point.
3. A real input (`<plaintext>…`) **never stabilizes**; the corrected loop
   fails-closed (throws), the shipped loop fails-open (returns silently).
4. **Honest limitation:** the allowlist serializer neutralizes every tested
   payload regardless of round count — no live `onerror`/`script` in any
   output. This is a defense-in-depth / fail-closed regression, **not a
   demonstrated XSS**.

## Files

- `sanitizer.js` — verbatim port: inert-body helper, constants,
  `SanitizingHtmlSerializer`, and both the shipped (BUGGY) and corrected
  (FIXED) loops. Attaches functions to `window`.
- `report.html` — the authoritative report page (renders the screenshot).
- `harness.html` — 32-vector iteration/divergence battery.
- `shot.mjs` — renders `report.html` and writes the screenshot.
- `divergence.mjs` — buggy-vs-fixed output comparison per vector.
- `output-stability.mjs` — checks whether any buggy output is dangerous on
  reparse (the actual security question).
- `chain.mjs` — prints exact round-by-round parse chains.

## Run

```
cd analysis/tools/mxss-browser
# needs: npm i playwright  (browser download can be skipped if Chromium present)
node shot.mjs            # -> mxss-proof.png
node output-stability.mjs
```

Screenshot committed at `analysis/evidence/mxss-loop-real-chromium.png`.
