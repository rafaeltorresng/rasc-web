import {
  AbsoluteFill,
  CanvasImage,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { WorkContext } from "./WorkContext";
import { tracks } from "./take";
import { stageClip } from "./layout";
import { nativeAt } from "./nativeEdit";
import { FilmStage, Preservation } from "./Editorial";
import { BrandClosing } from "./BrandStudies";
import { CommandCue } from "./CommandCue";
import {
  cameraAt,
  complete,
  short,
  frameAt,
  nativeWindow,
  ramp,
  type Timing,
} from "./direction";
export const ShortFilm = () => <Film mode="short" />;
export const CompleteFilm = () => <Film mode="complete" />;
function Film({ mode }: { mode: "short" | "complete" }) {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = frame / fps,
    b = mode === "short" ? short : complete;
  const cam = cameraAt(t, b),
    shaping =
      ramp(t, b.refine - 0.15, b.refine + 0.7) *
      (1 - ramp(t, b.keepCue - 0.1, b.keepCue + 0.55));
  const returning = ramp(t, b.hide - 0.22, b.hide),
    retreat = ramp(t, b.retrieve, b.retrieve + 0.5),
    enter = ramp(t, b.window, b.window + 0.25);
  return (
    <AbsoluteFill
      style={{
        background: "#fbfafd",
        color: "#29272f",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif',
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile(`v62/audio/${mode}.wav`)} premountFor={fps} />
      <FilmStage time={t} beats={b} />
      <AbsoluteFill style={{ clipPath: stageClip }}>
        <AbsoluteFill
          style={{
            transformOrigin: "0 0",
            transform: `translate(${960 - cam.x * cam.s}px,${540 - cam.y * cam.s - 70 * retreat}px) scale(${cam.s})`,
            opacity: 1 - retreat,
          }}
        >
          <div style={{ opacity: 1 - shaping }}>
            <WorkContext time={t} resumeAt={b.resume} />
          </div>
          <AbsoluteFill
            style={{
              background: `rgba(251,250,253,${0.18 * enter * (1 - returning) * (1 - shaping)})`,
            }}
          />
          <WorkCursor time={t} beats={b} />
          {t >= b.window && t < b.hide && (
            <div
              style={{
                position: "absolute",
                left: nativeWindow.left,
                top: nativeWindow.top + (1 - enter) * 14,
                width: nativeWindow.width,
                height: nativeWindow.height,
                opacity: enter,
                filter:
                  "drop-shadow(0 24px 30px #2c283933) drop-shadow(0 3px 4px #2c283915)",
              }}
            >
              <CanvasImage
                src={staticFile(nativeAt(t, mode))}
                style={{ width: "100%", height: "100%", display: "block" }}
              />
            </div>
          )}
          {mode === "complete" && t >= 8.85 && t < 10.78 && (
            <Pointer
              x={
                1358 +
                122 * ramp(t, 8.85, 9.15) -
                122 * ramp(t, 9.5, 9.8) +
                128 * ramp(t, 10.15, 10.65)
              }
              y={358 + 394 * ramp(t, 10.15, 10.65)}
              opacity={ramp(t, 8.85, 8.98) * (1 - ramp(t, 10.68, 10.78))}
              press={
                ramp(t, 9.12, 9.15) * (1 - ramp(t, 9.18, 9.25)) +
                ramp(t, 9.77, 9.8) * (1 - ramp(t, 9.83, 9.9)) +
                ramp(t, 10.62, 10.65) * (1 - ramp(t, 10.68, 10.75))
              }
            />
          )}
        </AbsoluteFill>
      </AbsoluteFill>
      <CommandCue
        time={t}
        kind="capture"
        start={b.captureCue}
        press={b.capturePress}
        end={2.9}
      />
      {mode === "complete" && (
        <>
          <CommandCue
            time={t}
            kind="refine"
            start={6.0}
            press={b.refine}
            end={7.7}
          />
          <Choice time={t} />
        </>
      )}
      <Preservation time={t} beats={b} />
      {mode === "complete" && (
        <>
          <Retrieval time={t} start={b.retrieve} closing={b.closing} />
          <Closing time={t} start={b.closing} />
        </>
      )}
    </AbsoluteFill>
  );
}
function Choice({ time: t }: { time: number }) {
  if (t < 8.2833 || t > 11.1) return null;
  const p = ramp(t, 8.2833, 8.55) * (1 - ramp(t, 10.8, 11.1)),
    decision = ramp(t, 10.65, 10.82);
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, opacity: p }}
    >
      <text x={96} y={960} fill="#c1b7ed" fontSize={24}>
        Optional Refine
      </text>
      <defs>
        <clipPath id="v62-choice">
          <rect x={300} y={918} width={1050} height={62} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#v62-choice)"
        fill="#fbfafd"
        fontFamily="Georgia,serif"
        fontStyle="italic"
        fontSize={38}
        letterSpacing={-0.8}
      >
        <text x={300} y={960 - 66 * decision}>
          Same thought. Your choice.
        </text>
        <text x={300} y={1026 - 66 * decision}>
          Use the suggestion.
        </text>
      </g>
    </svg>
  );
}
function Retrieval({
  time: t,
  start,
  closing,
}: {
  time: number;
  start: number;
  closing: number;
}) {
  if (t < start || t >= closing + 0.68) return null;
  const entry = ramp(t, start, start + 0.4),
    focus = ramp(t, 16.85, 17.6),
    opening = ramp(t, 18.2, 18.52);
  const scale = 0.8 + 0.2 * focus,
    x = 160 + 80 * focus,
    y = 112 + 4 * focus;
  const sourceTime =
    t < 16 ? 0.5 + t - start : Math.min(4.8, 1.9 + (t - 16) * 1.8);
  return (
    <>
      <AbsoluteFill style={{ clipPath: stageClip }}>
        {t < 18.52 && (
          <div
            style={{
              position: "absolute",
              left: x,
              top: y + 30 * (1 - entry),
              width: 1600 - 140 * focus,
              height: 707 - 207 * focus,
              overflow: "hidden",
              opacity: 1,
              filter: "drop-shadow(0 18px 28px #302a3826)",
            }}
          >
            {/* Camera crops blank native bottom/right only; no replacement chrome or UI. */}
            <CanvasImage
              src={staticFile(
                `v62/native/${frameAt(tracks["home-search"], sourceTime)}`,
              )}
              style={{
                width: 2000 * scale,
                height: 1360 * scale,
                translate: `0 ${-56 * scale}px`,
                display: "block",
              }}
            />
          </div>
        )}
        {t >= 18.2 && (
          <div
            style={{
              position: "absolute",
              left: 320,
              top: 214 + 18 * (1 - opening),
              width: 1280,
              height: 576,
              opacity: 1,
              filter: "drop-shadow(0 24px 30px #2c283933)",
            }}
          >
            <CanvasImage
              src={staticFile(
                `v62/native/${frameAt(tracks.reopened, 0.35 + Math.max(0, t - 18.2))}`,
              )}
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </div>
        )}
        {t > 17.65 && t < 18.35 && (
          <Pointer
            x={620 - 170 * ramp(t, 17.65, 18.15)}
            y={215 + 70 * ramp(t, 17.65, 18.15)}
            opacity={ramp(t, 17.65, 17.8) * (1 - ramp(t, 18.2, 18.35))}
            press={ramp(t, 18.12, 18.18)}
          />
        )}
      </AbsoluteFill>
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          inset: 0,
          opacity:
            ramp(t, start + 0.35, start + 0.65) *
            (1 - ramp(t, closing - 0.15, closing)),
        }}
      >
        <text
          x={96}
          y={960}
          fontFamily="Georgia,serif"
          fontStyle="italic"
          fontSize={38}
          letterSpacing={-0.6}
          fill="#29272f"
        >
          {t < 18.2 ? "Find it again." : "The same thought. Still here."}
        </text>
      </svg>
    </>
  );
}
function Closing({ time: t, start }: { time: number; start: number }) {
  if (t < start) return null;
  const p = ramp(t, start, start + 0.68);
  return (
    <AbsoluteFill
      style={{
        clipPath: `inset(0 0 0 ${1920 * (1 - p)}px)`,
      }}
    >
      <BrandClosing time={0.6 + t - start} />
    </AbsoluteFill>
  );
}
function Pointer({
  x,
  y,
  opacity,
  press = 0,
}: {
  x: number;
  y: number;
  opacity: number;
  press?: number;
}) {
  return (
    <svg
      width={28}
      height={36}
      viewBox="0 0 28 36"
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        scale: 1 - 0.12 * press,
        transformOrigin: "3px 3px",
        filter: "drop-shadow(0 2px 2px #0003)",
      }}
    >
      <path
        d="M2 2V28L9 21L14 32L19 30L14 19H24Z"
        fill="#292b28"
        stroke="#fff"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
}
function WorkCursor({ time: t, beats: b }: { time: number; beats: Timing }) {
  const early = t < 2,
    a = ramp(t, 0.08, 0.55),
    back = ramp(t, b.hide + 0.05, b.hide + 0.4);
  const x = early
      ? 1560 - 110 * a
      : 1480 - 20 * ramp(t, b.hide + 0.08, b.resume - 0.15),
    y = early
      ? 580 + 21 * a
      : 674 + 28 * ramp(t, b.hide + 0.08, b.resume - 0.15);
  const opacity = early ? 1 - ramp(t, 1.25, 1.6) : back,
    press = early
      ? ramp(t, 0.5, 0.55) * (1 - ramp(t, 0.6, 0.7))
      : ramp(t, b.resume - 0.04, b.resume) *
        (1 - ramp(t, b.resume + 0.05, b.resume + 0.14));
  return <Pointer x={x} y={y} opacity={opacity} press={press} />;
}
