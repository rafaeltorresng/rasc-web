import { landingCopy } from '../content/copy';
import EditorialEntrance from './EditorialEntrance';
import EditorialCompanion from './EditorialCompanion';
import ThoughtFragments from './ThoughtFragments';
import type { ReactNode } from 'react';

export function OwnedMoment({ aside }: { aside?: ReactNode } = {}) {
  const { pause } = landingCopy;
  return (
    <section className="owned-moment section-pad" aria-labelledby="owned-title">
      <div className="page-container owned-layout">
        <div className="owned-aside">
          <p className="eyebrow">The place before the note</p>
          {aside ?? <EditorialCompanion />}
        </div>
        <div className="reading-column">
          <h2 id="owned-title">{pause.title}</h2>
          <p className="owned-intro">{pause.intro}</p>
          <ThoughtFragments />
          <EditorialEntrance className="owned-resolution">
            <p className="owned-statement" data-editorial-beat>
              <span>{pause.statement.capture}</span>
              <span>{pause.statement.organize} <em>{pause.statement.yet}</em></span>
            </p>
            <p className="owned-close" data-editorial-beat>{pause.close}</p>
          </EditorialEntrance>
        </div>
      </div>
    </section>
  );
}

export function NoSystemSection() {
  const { system } = landingCopy;
  return (
    <section className="no-system-section section-pad" aria-labelledby="no-system-title">
      <div className="page-container no-system-layout">
        <h2 id="no-system-title">{system.title}</h2>
        <div className="no-system-copy">
          <EditorialEntrance className="system-promises">
            {system.promises.map(promise => (
              <p className="system-promise" data-editorial-beat key={promise.lead}>
                <strong>{promise.lead}</strong>{' '}<span>{promise.rest}</span>
              </p>
            ))}
          </EditorialEntrance>
          <p className="system-close">{system.close}</p>
        </div>
      </div>
    </section>
  );
}
