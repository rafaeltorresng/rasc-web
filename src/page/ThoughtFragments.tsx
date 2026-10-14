import { Fragment, type CSSProperties } from 'react';
import { landingCopy } from '../content/copy';
import { sceneMotion } from '../product/timeline';
import { createTypingPlan } from '../product/typing';
import EditorialEntrance from './EditorialEntrance';

let sequenceEnd = 0;
const fragments = landingCopy.pause.thoughts.map((groups) => {
  const text = groups.join(' ');
  const plan = createTypingPlan(text, undefined, 0.48);
  const start = sequenceEnd;
  const end = start + plan.at(-1)!.at;
  sequenceEnd = end + sceneMotion.editorialThoughtPause;
  let offset = 0;
  const words = groups.map((group) => {
    const strokes = plan.filter((stroke) => stroke.end > offset && stroke.end <= offset + group.length);
    offset += group.length + 1;
    return { group, strokes };
  });
  return { text, words, start, end };
});

export default function ThoughtFragments() {
  return (
    <EditorialEntrance className="thought-writing-sequence">
      <ul className="thought-fragments" aria-label="Examples of unfinished thoughts">
        {fragments.map(({ text, words, start, end }) => {
          return (
            <li className="thought-fragment" key={text} style={{
              '--thought-start': `${start}ms`,
              '--thought-last': `${end}ms`,
            } as CSSProperties}>
              <span className="visually-hidden">{text}</span>
              <q aria-hidden="true">{words.map(({ group, strokes }, groupIndex) => (
                <Fragment key={group}>
                  {groupIndex > 0 && ' '}
                  <span className="thought-word-group">{strokes.map((stroke) => (
                    <span className="thought-character" key={stroke.end} style={{ '--character-at': `${start + stroke.at}ms` } as CSSProperties}>{stroke.character}</span>
                  ))}</span>
                </Fragment>
              ))}</q>
            </li>
          );
        })}
      </ul>
    </EditorialEntrance>
  );
}
