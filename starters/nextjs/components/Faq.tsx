import { Icon, CHEVRON } from "./icons";

// <details> needs no client JavaScript: keys, state and find-in-page come free. Same name = one open at a time.
const QA: [string, string][] = [
  ["How do I install Sumlight?", "Add the script to your site's head tag. Page views are recorded on their own, and you can send your own events from the browser."],
  ["Does Sumlight use cookies?", "No. Visits are joined with a daily salted hash that can't be traced back to a person, so you don't need a consent banner for Sumlight."],
  ["How does revenue tracking work?", "Connect your billing provider once. Each payment is matched to the visit that started the session, and refunds are taken off automatically."],
  ["Can I export my data?", "Any view exports as CSV in one click, and the REST API returns the same numbers."],
];

export function Faq() {
  return (
    <section className="wrap sec" id="faq" aria-labelledby="faq-title">
      <h2 className="sec-head center" id="faq-title">Questions, answered.</h2>
      <div className="faq">
        {QA.map(([q, a], i) => (
          <details key={q} name="faq" open={i === 0}>
            <summary>{q}<Icon d={CHEVRON} /></summary>
            <div className="ans">{a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
