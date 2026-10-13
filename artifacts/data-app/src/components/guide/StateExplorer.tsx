import { useState } from 'react';
import type { NervousSystemState } from '@workspace/api-client-react';
import { ArrowRight } from 'lucide-react';

type StateExplorerProps = {
  states: NervousSystemState[];
};

export function StateExplorer({ states }: StateExplorerProps) {
  const [selectedId, setSelectedId] = useState(states[0]?.id ?? '');
  const selectedState = states.find((state) => state.id === selectedId) ?? states[0];

  return (
    <section className="states-section" id="states" aria-labelledby="states-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Polyvagal Theory</p>
          <h2 id="states-heading">States are signals.</h2>
        </div>
        <p className="section-intro">
          Explore the descriptions and signals in this framework. They are possibilities to notice,
          not labels to apply.
        </p>
      </div>
      <div className="states-layout">
          <div className="state-choices" role="group" aria-label="Nervous-system states">
          {states.map((state, index) => (
            <button
              aria-pressed={selectedState?.id === state.id}
              className={`state-choice state-choice-${index + 1}${selectedState?.id === state.id ? ' is-selected' : ''}`}
              data-testid={`state-select-${state.id}`}
              id={`state-tab-${state.id}`}
              key={state.id}
              onClick={() => setSelectedId(state.id)}
              type="button"
            >
              <span className="state-ordinal">0{index + 1}</span>
              <span className="state-choice-name">{state.name}</span>
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.7} />
            </button>
          ))}
        </div>
        {selectedState && (
          <article
            className="state-detail"
            aria-live="polite"
          >
            <div className="state-detail-heading">
              <span className="state-orb" aria-hidden="true" />
              <h3>{selectedState.name}</h3>
            </div>
            <p className="state-description">{selectedState.description}</p>
            {selectedState.signals.length > 0 && (
              <div className="signal-list">
                <p className="eyebrow">Possible signals</p>
                <ul>
                  {selectedState.signals.map((signal) => (
                    <li key={signal}>{signal}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        )}
      </div>
      <p className="gentle-note">
        These ideas offer language for learning. They are not a diagnosis or a personalized assessment.
      </p>
    </section>
  );
}
