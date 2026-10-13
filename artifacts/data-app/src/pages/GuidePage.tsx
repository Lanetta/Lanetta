import { useGetRegulationGuide } from '@workspace/api-client-react';
import { RefreshCw, Leaf, ArrowDown, BookOpen } from 'lucide-react';
import { FrameworkExplorer } from '@/components/guide/FrameworkExplorer';
import { StateExplorer } from '@/components/guide/StateExplorer';
import { PracticeExplorer } from '@/components/guide/PracticeExplorer';

function GuideLoading() {
  return (
    <main className="guide-shell" aria-label="Loading Regulation and Clarity">
      <div className="topbar skeleton-block" />
      <section className="loading-hero">
        <div className="skeleton-line skeleton-short" />
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-title skeleton-title-small" />
        <div className="skeleton-line skeleton-copy" />
        <div className="loading-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
      <div className="loading-sections">
        <div className="skeleton-panel" />
        <div className="skeleton-panel" />
      </div>
    </main>
  );
}

export default function GuidePage() {
  const guideQuery = useGetRegulationGuide();
  const guide = guideQuery.data;

  if (guideQuery.isLoading || guideQuery.isFetching) {
    return <GuideLoading />;
  }

  if (guideQuery.isError) {
    return (
      <main className="status-page">
        <div className="status-mark"><Leaf aria-hidden="true" size={25} /></div>
        <p className="eyebrow">A moment of pause</p>
        <h1>We couldn’t open the guide.</h1>
        <p className="status-copy">The guide is having trouble loading. Please try again when you’re ready.</p>
        <button
          className="action-button"
          data-testid="retry-guide"
          onClick={() => void guideQuery.refetch()}
          type="button"
        >
          <RefreshCw aria-hidden="true" size={16} />
          Try again
        </button>
      </main>
    );
  }

  if (
    !guide ||
    (!guide.title &&
      !guide.introduction &&
      guide.frameworks.length === 0 &&
      guide.nervousSystemStates.length === 0 &&
      guide.returningPractices.length === 0 &&
      guide.wellbeingPrinciples.length === 0)
  ) {
    return (
      <main className="status-page">
        <div className="status-mark"><BookOpen aria-hidden="true" size={25} /></div>
        <p className="eyebrow">Regulation &amp; Clarity</p>
        <h1>The guide is still taking shape.</h1>
        <p className="status-copy">There isn’t any guide content available right now. Please check back later.</p>
        <button
          className="action-button"
          data-testid="refresh-empty-guide"
          onClick={() => void guideQuery.refetch()}
          type="button"
        >
          <RefreshCw aria-hidden="true" size={16} />
          Check again
        </button>
      </main>
    );
  }

  return (
    <main className="guide-shell">
      <header className="topbar">
        <a aria-label="Regulation and Clarity home" className="brand-lockup" data-testid="link-home-top" href="#top">
          <span className="brand-symbol" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Regulation <i>&amp;</i> Clarity</span>
        </a>
        <nav aria-label="Guide navigation" className="main-nav">
          <a data-testid="link-guide-frameworks" href="#frameworks">The frameworks</a>
          <a data-testid="link-guide-states" href="#states">Nervous system</a>
          <a data-testid="link-guide-practices" href="#practices">Practices</a>
        </nav>
        <span className="topbar-note"><span /> A learning space</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" />An introduction to self-regulation</p>
          <h1>{guide.title}</h1>
          <p className="hero-introduction">{guide.introduction}</p>
          <a className="hero-link" data-testid="explore-guide" href="#frameworks">
            Explore the guide
            <span><ArrowDown aria-hidden="true" size={15} /></span>
          </a>
          <p className="hero-disclaimer">Educational, not diagnostic or treatment advice.</p>
        </div>
        <div className="hero-art" aria-label="Three overlapping perspectives converge at a shared center">
          <div className="hero-art-caption hero-caption-top">Awareness</div>
          <div className="hero-art-caption hero-caption-left">Physiology</div>
          <div className="hero-art-caption hero-caption-right">Capacity</div>
          <div className="hero-loop loop-one" />
          <div className="hero-loop loop-two" />
          <div className="hero-loop loop-three" />
          <div className="hero-art-center">
            <span className="center-mark" aria-hidden="true"><span /><span /><span /></span>
            <span>{guide.center}</span>
          </div>
          <div className="hero-art-footnote">Not one skill, but an integration.</div>
        </div>
        <div className="hero-bottomline"><span>01 / 04</span><span>Start with curiosity</span></div>
      </section>

      <div className="guide-content">
        {guide.frameworks.length > 0 && (
          <FrameworkExplorer frameworks={guide.frameworks} center={guide.center} />
        )}
        {guide.nervousSystemStates.length > 0 && (
          <StateExplorer states={guide.nervousSystemStates} />
        )}
        {guide.returningPractices.length > 0 && (
          <PracticeExplorer practices={guide.returningPractices} />
        )}
        {guide.wellbeingPrinciples.length > 0 && (
          <section className="principles-section" id="principles" aria-labelledby="principles-heading">
            <div className="principles-heading">
              <p className="eyebrow">Keep close</p>
              <h2 id="principles-heading">A few things worth remembering.</h2>
              <p>Well-being is built through small, human moments—not a perfect performance.</p>
            </div>
            <ol className="principle-list">
              {guide.wellbeingPrinciples.map((principle, index) => (
                <li key={`${index}-${principle}`}>
                  <span className="principle-index">0{index + 1}</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
      <footer className="guide-footer">
        <a className="brand-lockup footer-brand" data-testid="link-footer-home" href="#top">
          <span className="brand-symbol" aria-hidden="true"><span /><span /><span /></span>
          <span>Regulation <i>&amp;</i> Clarity</span>
        </a>
        <p>Learn gently. Take what is useful.</p>
        <a className="back-to-top" href="#top" data-testid="back-to-top">Back to the beginning ↑</a>
      </footer>
    </main>
  );
}
