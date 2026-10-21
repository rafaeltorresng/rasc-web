import {
  AbsoluteFill,
  CanvasImage,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ramp } from "./direction";
export type EndingVariant = "open-margin" | "graphite-imprint" | "violet-field";
/** Brand-only endboards. The example note never enters this layer. */
export function BrandClosing({
  time,
  variant = "open-margin",
}: {
  time: number;
  variant?: EndingVariant;
}) {
  const p = ramp(time, 0, 0.72),
    line = ramp(time, 0.25, 1.05),
    domain = ramp(time, 0.65, 1.1);
  const font = '-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif';
  if (variant === "graphite-imprint")
    return (
      <AbsoluteFill
        style={{ background: "#29272f", color: "#fbfafd", fontFamily: font }}
      >
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 128,
            fontSize: 224,
            letterSpacing: -11,
            fontWeight: 550,
          }}
        >
          Rasc
        </div>
        <CanvasImage
          src={staticFile("brand-symbol.svg")}
          style={{
            position: "absolute",
            right: 112,
            top: 128,
            width: 390,
            height: 390,
            filter: "brightness(0) invert(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 490,
            fontSize: 106,
            letterSpacing: -4,
            lineHeight: 1.2,
          }}
        >
          A scratchpad for
          <br />
          <em
            style={{
              fontFamily: "Georgia,serif",
              color: "#c1b7ed",
              fontSize: 116,
            }}
          >
            unfinished thoughts.
          </em>
        </div>
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 883,
            fontSize: 72,
            letterSpacing: -2,
          }}
        >
          rasc.app
        </div>
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 994,
            width: 285,
            height: 4,
            background: "#c74a14",
          }}
        />
      </AbsoluteFill>
    );
  if (variant === "violet-field")
    return (
      <AbsoluteFill
        style={{ background: "#7564d8", color: "#fbfafd", fontFamily: font }}
      >
        <CanvasImage
          src={staticFile("brand-symbol.svg")}
          style={{
            position: "absolute",
            left: 112,
            top: 112,
            width: 108,
            height: 108,
            filter: "brightness(0) invert(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 300,
            fontSize: 316,
            letterSpacing: -18,
            fontWeight: 550,
            lineHeight: 1,
          }}
        >
          Rasc
        </div>
        <div
          style={{
            position: "absolute",
            left: 1040,
            top: 357,
            fontSize: 67,
            letterSpacing: -2,
            lineHeight: 1.22,
          }}
        >
          A scratchpad for
          <br />
          <em style={{ fontFamily: "Georgia,serif", fontSize: 84 }}>
            unfinished
            <br />
            thoughts.
          </em>
        </div>
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 862,
            fontSize: 86,
            letterSpacing: -3,
          }}
        >
          rasc.app
        </div>
        <div
          style={{
            position: "absolute",
            left: 1040,
            top: 927,
            width: 768,
            height: 2,
            background: "#fbfafd70",
          }}
        />
      </AbsoluteFill>
    );
  return (
    <AbsoluteFill
      style={{
        background: "#fbfafd",
        color: "#29272f",
        fontFamily: font,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 112,
          top: 142,
          display: "flex",
          alignItems: "center",
          gap: 38,
          clipPath: `inset(0 0 ${(1 - p) * 100}% 0)`,
          translate: `0 ${42 * (1 - p)}px`,
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
          }}
        >
          Rasc
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          top: 463,
          clipPath: `inset(0 ${(1 - line) * 100}% 0 0)`,
          translate: `${36 * (1 - line)}px 0`,
        }}
      >
        <div style={{ fontSize: 108, letterSpacing: -4.2, lineHeight: 1.2 }}>
          A scratchpad for
        </div>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontStyle: "italic",
            fontSize: 118,
            letterSpacing: -4,
            lineHeight: 1.24,
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
          top: 278,
          fontSize: 64,
          fontWeight: 450,
          letterSpacing: -2,
          opacity: domain,
          translate: `0 ${18 * (1 - domain)}px`,
        }}
      >
        rasc.app
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d={`M112 906H${112 + 1696 * line}`}
          fill="none"
          stroke="#7564d8"
          strokeWidth={3}
        />
        <path
          d={`M112 ${418 - 34 * line}V418H${112 + 64 * line}`}
          fill="none"
          stroke="#c74a14"
          strokeWidth={5}
        />
      </svg>
    </AbsoluteFill>
  );
}
function Study({ variant }: { variant: EndingVariant }) {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig();
  return <BrandClosing time={1.3 + f / fps} variant={variant} />;
}
export const EndingOpen = () => <Study variant="open-margin" />;
export const EndingGraphite = () => <Study variant="graphite-imprint" />;
export const EndingViolet = () => <Study variant="violet-field" />;
