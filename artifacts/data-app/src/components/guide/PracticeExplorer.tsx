import { useState } from 'react';
import type { RegulationPractice } from '@workspace/api-client-react';
import { Plus, Minus } from 'lucide-react';

type PracticeExplorerProps = {
  practices: RegulationPractice[];
};

export function PracticeExplorer({ practices }: PracticeExplorerProps) {
  const [openId, setOpenId] = useState<string | null>(practices[0]?.id ?? null);

  return (
    <section className="practice-section" id="practices" aria-labelledby="practice-heading">
      <div className="practice-intro">
        <p className="eyebrow">A gentle return</p>
        <h2 id="practice-heading">Small ways back to the present.</h2>
        <p>
          These are invitations, not instructions. Choose what feels accessible, or simply take
          what is useful and leave the rest.
        </p>
        <span className="practice-scribble" aria-hidden="true">↘</span>
      </div>
      <div className="practice-list">
        {practices.map((practice, index) => {
          const isOpen = openId === practice.id;
          return (
            <article className={`practice-item${isOpen ? ' is-open' : ''}`} key={practice.id}>
              <button
                aria-controls={`practice-description-${practice.id}`}
                aria-expanded={isOpen}
                className="practice-toggle"
                data-testid={`practice-toggle-${practice.id}`}
                onClick={() => setOpenId(isOpen ? null : practice.id)}
                type="button"
              >
                <span className="practice-number">0{index + 1}</span>
                <span className="practice-name">{practice.name}</span>
                <span className="practice-icon" aria-hidden="true">
                  {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                </span>
              </button>
              {isOpen && (
                <div className="practice-description" id={`practice-description-${practice.id}`}>
                  <p>{practice.description}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
