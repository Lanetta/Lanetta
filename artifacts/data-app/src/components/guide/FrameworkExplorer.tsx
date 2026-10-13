import { useState } from 'react';
import type { Framework } from '@workspace/api-client-react';
import { ArrowUpRight } from 'lucide-react';

type FrameworkExplorerProps = {
  frameworks: Framework[];
  center: string;
};

export function FrameworkExplorer({ frameworks, center }: FrameworkExplorerProps) {
  const [activeId, setActiveId] = useState(frameworks[0]?.id ?? '');
  const activeFramework = frameworks.find((framework) => framework.id === activeId) ?? frameworks[0];

  if (!activeFramework) {
    return null;
  }

  return (
    <section className="framework-section" id="frameworks" aria-labelledby="framework-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Three lenses, one human experience</p>
          <h2 id="framework-heading">A map, not a measure.</h2>
        </div>
        <p className="section-intro">
          Each framework notices a different part of how we meet the moment.
        </p>
      </div>

      <div className="framework-layout">
        <div className="framework-orbit" aria-label="Explore the three frameworks">
          <div className="orbit-line orbit-line-one" />
          <div className="orbit-line orbit-line-two" />
          <div className="orbit-line orbit-line-three" />
          <div className="orbit-center">
            <span className="center-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>{center}</span>
          </div>
          {frameworks.map((framework, index) => (
            <button
              aria-pressed={activeFramework.id === framework.id}
              className={`orbit-node orbit-node-${index + 1}${activeFramework.id === framework.id ? ' is-active' : ''}`}
              data-testid={`framework-select-${framework.id}`}
              key={framework.id}
              onClick={() => setActiveId(framework.id)}
              type="button"
            >
              <span className="orbit-number">0{index + 1}</span>
              <span>{framework.name}</span>
            </button>
          ))}
        </div>

        <article className="framework-detail" aria-live="polite">
          <div className="detail-topline">
            <span className="detail-index">A way of seeing</span>
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.6} />
          </div>
          <h3>{activeFramework.name}</h3>
          <p className="originator">{activeFramework.originator}</p>
          <p className="detail-summary">{activeFramework.summary}</p>
          {activeFramework.keyIdeas.length > 0 && (
            <div className="key-ideas">
              <p className="eyebrow">Key ideas</p>
              <ul>
                {activeFramework.keyIdeas.map((idea) => (
                  <li key={idea}>{idea}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
