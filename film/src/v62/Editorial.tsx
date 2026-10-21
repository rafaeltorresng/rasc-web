import { AbsoluteFill, interpolateColors } from "remotion";
import { ramp, type Timing } from "./direction";
import { CommandCue } from "./CommandCue";
export function FilmStage({
  time: t,
  beats: b,
}: {
  time: number;
  beats: Timing;
}) {
  const refine =
    ramp(t, b.refine - 0.15, b.refine + 0.7) *
    (1 - ramp(t, b.keepCue - 0.1, b.keepCue + 0.55));
  const presence =
    ramp(t, b.window, b.window + 0.65) * (1 - ramp(t, b.hide, b.hide + 0.6));
  return (
    <AbsoluteFill
      style={{
        background: interpolateColors(refine, [0, 1], ["#fbfafd", "#29272f"]),
      }}
    >
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M1920 0H1776C1834 330 1798 822 1548 1080H1920Z"
          fill="#7564d8"
          opacity={refine}
        />
        <path
          d="M96 878H1824"
          stroke="#7564d8"
          strokeWidth={2}
          opacity={presence * 0.2 * (1 - refine)}
        />
      </svg>
    </AbsoluteFill>
  );
}
export function Preservation({
  time: t,
  beats: b,
}: {
  time: number;
  beats: Timing;
}) {
  const end = Math.min(b.retrieve, b.duration - 0.2),
    p = ramp(t, b.keepPress + 0.38, b.keepPress + 0.8),
    exit = ramp(t, end - 0.4, end);
  return (
    <>
      <CommandCue
        time={t}
        kind="keep"
        start={b.keepCue}
        press={b.keepPress}
        end={b.keepPress + 0.55}
      />
      {t > b.keepPress + 0.38 && t < end && (
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, opacity: p * (1 - exit) }}
        >
          <g transform={`translate(96 ${12 * (1 - p)})`}>
            <path d={`M0 1005H${126 * p}`} stroke="#c74a14" strokeWidth={3} />
            <text
              x={0}
              y={960}
              fill="#a93c10"
              fontSize={34}
              letterSpacing={-0.6}
            >
              Kept for later
            </text>
          </g>
        </svg>
      )}
    </>
  );
}
