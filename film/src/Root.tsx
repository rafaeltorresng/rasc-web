import { Composition } from "remotion";
import { CompleteFilm, ShortFilm } from "./native-demo/Film";
import { durationInFrames } from "./native-demo/playback";

/** Approved cuts only. Historical studies are preserved in the production archive. */
export const RemotionRoot = () => <>
  <Composition id="Rasc-Native-Demo-Complete" component={CompleteFilm} durationInFrames={durationInFrames} fps={60} width={1920} height={1080} />
  <Composition id="Rasc-Short" component={ShortFilm} durationInFrames={600} fps={60} width={1920} height={1080} />
</>;
