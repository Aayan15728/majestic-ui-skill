import { Logo, Icon, GLOBE } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RevenueBoard } from "@/components/RevenueBoard";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { DottedHills } from "@/components/DottedHills";

// Server components by default; only the board, the pricing switch, the theme toggle and the canvas ship JavaScript.
export default function Page() {
  return (
    <>
      <header className="wrap nav">
        <a className="logo" href="#main" aria-label="Sumlight home"><Logo />Sumlight</a>
        <nav className="links" aria-label="Main">
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-r">
          <ThemeToggle />
          <a className="login" href="#signin">Log in</a>
          <a className="btn ink" href="#start">Start free</a>
        </div>
      </header>

      <main id="main">
        <section className="wrap hero" aria-labelledby="hero-title">
          <h1 id="hero-title">See which post <span>paid the rent.</span></h1>
          <p className="lead">Add one script tag. Sumlight follows each visit to the signup and the payment, so <b>$4,180 from a Tuesday thread</b> shows up as exactly that.</p>
          <form className="capture" id="start" action="#">
            <Icon d={GLOBE} />
            <label className="sr" htmlFor="site">Your website</label>
            <input id="site" name="site" type="url" inputMode="url" autoComplete="url" placeholder="yourwebsite.com…" spellCheck={false} />
            <button className="btn primary" type="submit">Add my website</button>
          </form>
          <p className="fine">Free for 14 days, then <b>$14/month</b>. No card required.</p>
          <RevenueBoard />
        </section>

        <Pricing />
        <Faq />

        <section className="wrap close" aria-labelledby="close-title">
          <h2 id="close-title">Add one script tag tonight. <span>Know by Friday.</span></h2>
          <a className="btn primary" href="#start" style={{ marginTop: 32 }}>Add my website</a>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <div className="about">
            <a className="logo" href="#main" aria-label="Sumlight home"><Logo />Sumlight</a>
            <p>Revenue analytics for small software teams.</p>
          </div>
          <div className="cols">
            <div><h3>Product</h3><ul><li><a href="#pricing">Pricing</a></li><li><a href="#faq">FAQ</a></li></ul></div>
            <div><h3>Company</h3><ul><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul></div>
          </div>
        </div>
        <DottedHills />
        <div className="wrap legal">
          <span>© 2026 Sumlight</span>
          <ul><li><a href="#privacy">Privacy</a></li><li><a href="#terms">Terms</a></li></ul>
        </div>
      </footer>
    </>
  );
}
