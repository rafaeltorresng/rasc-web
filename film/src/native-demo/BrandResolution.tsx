import {
  AbsoluteFill,
  CanvasImage,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ramp, complete } from "./direction";
import { reopenedAt } from "./nativeEdit";
import { resolutionPose } from "./layout";
export type ResolutionKind = "margin" | "lift";
/** Editorial choreography outside an unchanged native capture. */
export function BrandResolution({
  time: t,
  variant = "margin",
  nativeNote = true,
}: {
  time: number;
  variant?: ResolutionKind;
  nativeNote?: boolean;
}) {
  const { progress: p, x, y } = resolutionPose(t, variant),
    margin = variant === "margin",
    nativeX = x,
    nativeY = y;
  const src = staticFile(reopenedAt(complete.closing + t));
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          clipPath: margin
            ? `inset(0 ${Math.max(0, 1920 - (nativeX - 48))}px 0 0)`
            : `inset(${Math.max(0, nativeY + 576 + 48)}px 0 0 0)`,
        }}
      >
        <BrandBoard time={t} />
      </AbsoluteFill>
      {nativeNote && p < 1 && (
        <AbsoluteFill
          style={{ clipPath: "inset(64px 64px 208px 64px round 18px)" }}
        >
          <div
            style={{
              position: "absolute",
              left: nativeX,
              top: nativeY,
              width: 1280,
              height: 576,
              filter: "drop-shadow(0 24px 30px #2c283933)",
            }}
          >
            <CanvasImage
              src={src}
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}
export function BrandBoard({ time: t }: { time: number }) {
  const mark = ramp(t, 0.02, 0.72),
    type = ramp(t, 0.4, 1.4),
    domain = ramp(t, 1.05, 1.7),
    underline = ramp(t, 1.4, 1.95);
  return (
    <AbsoluteFill
      style={{
        background: "#fbfafd",
        color: "#29272f",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif',
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 112,
          top: 152,
          display: "flex",
          alignItems: "center",
          gap: 38,
          clipPath: `inset(0 0 ${100 * (1 - mark)}% 0)`,
          translate: `0 ${40 * (1 - mark)}px`,
        }}
      >
        <CanvasImage
          src={staticFile("brand-symbol.svg")}
          style={{ width: 156, height: 156 }}
        />
        <span
          style={{
            fontSize: 210,
            fontWeight: 550,
            letterSpacing: -10,
            lineHeight: 1.05,
            // Negative tracking leaves terminal glyph ink past its advance box.
            // Keep that ink inside the group's animated reveal mask.
            paddingRight: 16,
          }}
        >
          Rasc
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          top: 560,
          clipPath: `inset(0 ${100 * (1 - type)}% 0 0)`,
          translate: `${22 * (1 - type)}px 0`,
        }}
      >
        <div style={{ fontSize: 108, letterSpacing: -4.2, lineHeight: 1.18 }}>
          A scratchpad for
        </div>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontStyle: "italic",
            fontSize: 118,
            letterSpacing: -4,
            lineHeight: 1.22,
            color: "#6253bc",
          }}
        >
          unfinished thoughts.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 112,
          top: 286,
          width: 224,
          fontSize: 64,
          letterSpacing: -2,
          opacity: domain,
          translate: `0 ${18 * (1 - domain)}px`,
        }}
      >
        rasc.app
        <div
          style={{
            height: 3,
            marginTop: 16,
            width: 224 * underline,
            background: "#c74a14",
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
function Study({ variant }: { variant: ResolutionKind }) {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#fbfafd" }}>
      <BrandResolution time={f / fps} variant={variant} />
    </AbsoluteFill>
  );
}
export const MarginStudy = () => <Study variant="margin" />;
export const LiftStudy = () => <Study variant="lift" />;
