import {
  AbsoluteFill,
  CanvasImage,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { WorkContext } from "../v62/WorkContext";
import { tracks } from "./take";
import { stageClip, homeCameraAt, homePoint, resolutionPose } from "./layout";
import { nativeAt, reopenedAt } from "./nativeEdit";
import { filmTime } from "./playback";
import { FilmStage, Preservation } from "../v63/Editorial";
import { BrandResolution } from "./BrandResolution";
import { CommandCue } from "../v63/CommandCue";
import {
  decisions as d,
  cameraAt,
  complete,
  short,
  frameAt,
  nativeWindow,
  ramp,
  type Timing,
} from "./direction";
export { ShortFilm } from "../v62/Film";
export const CompleteFilm = () => <Film mode="complete" />;
function Film({ mode }: { mode: "short" | "complete" }) {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = filmTime(frame / fps),
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
      <Audio
        src={staticFile(`native-demo/audio/${mode}.wav`)}
        premountFor={fps}
      />
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
                src={staticFile(nativeAt(t))}
                style={{ width: "100%", height: "100%", display: "block" }}
              />
            </div>
          )}
          {mode === "complete" && t >= 9.7 && t < 13.35 && (
            <Pointer
              x={
                1358 +
                122 * ramp(t, 9.7, d.original) -
                122 * ramp(t, 11.15, d.suggested) +
                128 * ramp(t, 12.3, d.accept)
              }
              y={358 + 394 * ramp(t, 12.3, d.accept)}
              opacity={ramp(t, 9.7, 9.85) * (1 - ramp(t, 13.15, 13.35))}
              press={
                ramp(t, d.original - 0.04, d.original) *
                  (1 - ramp(t, d.original + 0.06, d.original + 0.2)) +
                ramp(t, d.suggested - 0.04, d.suggested) *
                  (1 - ramp(t, d.suggested + 0.06, d.suggested + 0.2)) +
                ramp(t, d.accept - 0.04, d.accept) *
                  (1 - ramp(t, d.accept + 0.06, d.accept + 0.2))
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
            start={5.9}
            press={b.refine}
            end={8.05}
          />
          <Choice time={t} />
        </>
      )}
      <Preservation time={t} beats={b} />
      {mode === "complete" && (
        <CommandCue
          time={t}
          kind="home"
          start={d.homeCue}
          press={d.homePress}
          end={18.65}
        />
      )}
      {mode === "complete" && (
        <>
          <Closing time={t} start={b.closing} />
          <Retrieval time={t} start={b.retrieve} closing={b.closing} />
        </>
      )}
    </AbsoluteFill>
  );
}
function Choice({ time: t }: { time: number }) {
  if (t < d.preview || t > 14.05) return null;
  const p = ramp(t, d.preview, d.preview + 0.27) * (1 - ramp(t, 13.8, 14.05)),
    decision = ramp(t, d.accept, d.accept + 0.23);
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
        <clipPath id="v63-choice">
          <rect x={300} y={918} width={1050} height={62} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#v63-choice)"
        fill="#fbfafd"
        fontFamily="Georgia,serif"
        fontStyle="italic"
        fontSize={38}
        letterSpacing={-0.8}
      >
        <text x={300} y={960 - 66 * decision}>
          Compare. Then choose.
        </text>
        <text x={300} y={1026 - 66 * decision}>
          Suggestion applied.
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
  if (t < start || t >= closing + 1.55) return null;
  const entry = ramp(t, start, start + 0.4),
    opening = ramp(t, d.reopen, d.reopen + 0.32),
    exit = resolutionPose(t - closing);
  const { scale, x, y, width, height } = homeCameraAt(t),
    target = homePoint(t),
    cursorTravel = ramp(t, 20.9, 21.4);
  const sourceTime =
    t < d.search ? 0.1 + t - start : Math.min(4.4, 1.55 + t - d.search);
  return (
    <>
      <AbsoluteFill style={{ clipPath: stageClip }}>
        {t < d.reopen + 0.32 && (
          <div
            style={{
              position: "absolute",
              left: x,
              top: y + 30 * (1 - entry),
              width,
              height,
              overflow: "hidden",
              opacity: 1,
              filter: "drop-shadow(0 18px 28px #302a3826) drop-shadow(0 1px 1px #302a3826)",
              borderRadius: 28 * scale,
            }}
          >
            {/* Full native window, including its captured rounded alpha contour. */}
            <CanvasImage
              src={staticFile(
                `native-demo/${frameAt(tracks.home3, sourceTime)}`,
              )}
              style={{
                width: 2280 * scale,
                height: 1120 * scale,
                
                display: "block",
              }}
            />
          </div>
        )}
        {t >= d.reopen && (
          <div
            style={{
              position: "absolute",
              left: exit.x,
              top: exit.y + 18 * (1 - opening),
              width: 1280,
              height: 576,
              opacity: 1,
              filter: "drop-shadow(0 24px 30px #2c283933)",
            }}
          >
            <CanvasImage
              src={staticFile(reopenedAt(t))}
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </div>
        )}
        {t > 20.9 && t < 21.65 && (
          <Pointer
            x={620 + (target.x - 620) * cursorTravel}
            y={215 + (target.y - 215) * cursorTravel}
            opacity={ramp(t, 20.9, 21.05) * (1 - ramp(t, 21.5, 21.65))}
            press={ramp(t, 21.45, 21.5)}
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
          {t < d.reopen ? "Find it again." : "The same thought. Still here."}
        </text>
      </svg>
    </>
  );
}
function Closing({ time: t, start }: { time: number; start: number }) {
  if (t < start) return null;
  return <BrandResolution time={t - start} nativeNote={false} />;
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
