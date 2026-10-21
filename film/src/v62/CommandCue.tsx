import { interpolate, spring, useVideoConfig } from "remotion";
import { ramp } from "./direction";
/** One vector scene avoids nested CSS clipping/translated text layers in exports. */
export function CommandCue({
  time,
  kind,
  start,
  press,
  end,
}: {
  time: number;
  kind: "capture" | "keep" | "refine";
  start: number;
  press: number;
  end: number;
}) {
  const { fps } = useVideoConfig();
  const enter = spring({
      frame: (time - start) * fps,
      fps,
      config: { damping: 28, stiffness: 260, mass: 0.85 },
    }),
    exit = ramp(time, end - 0.3, end);
  const impulse = interpolate(
    time,
    [press - 0.04, press + 0.035, press + 0.11, press + 0.25],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const color = kind === "keep" ? "#c74a14" : "#7564d8",
    keys =
      kind === "capture"
        ? ["⌥", "\\"]
        : kind === "refine"
          ? ["⌘", "J"]
          : ["⇧", "⌘", "K"];
  if (time < start || time > end) return null;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
      <g
        transform={`translate(${710 + 88 * (1 - enter)} ${928 + 22 * exit})`}
        opacity={1 - exit}
      >
        <rect
          x={0}
          y={5}
          width={500}
          height={104}
          rx={18}
          fill="#29272f"
          opacity={0.1}
        />
        <rect
          width={500}
          height={104}
          rx={18}
          fill="#29272f"
          stroke="#ffffff20"
        />
        <rect x={28} y={39} width={3} height={25} rx={1.5} fill={color} />
        <text
          x={44}
          y={64}
          fill="white"
          fontSize={30}
          fontWeight={500}
          letterSpacing={-0.6}
        >
          {kind === "capture"
            ? "Capture"
            : kind === "refine"
              ? "Refine"
              : time > press + 0.08
                ? "Kept"
                : "Keep"}
        </text>
        {keys.map((key, i) => {
          const e = spring({
              frame: (time - start - 0.04 * i) * fps,
              fps,
              config: { damping: 25, stiffness: 290 },
            }),
            s = 1 - 0.045 * impulse;
          return (
            <g
              key={key}
              opacity={e}
              transform={`translate(${500 - 18 - keys.length * 62 - (keys.length - 1) * 9 + i * 71 + 31 * (1 - s)} ${15 + 18 * (1 - e) + 3 * impulse + 33 * (1 - s)}) scale(${s})`}
            >
              <rect
                y={3 * (1 - impulse)}
                width={62}
                height={66}
                rx={11}
                fill="#bdb6c5"
              />
              <rect
                width={62}
                height={66}
                rx={11}
                fill={impulse > 0.1 ? color : "#fbfafd"}
              />
              <text
                x={31}
                y={35}
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={40}
                fontWeight={500}
                fill={impulse > 0.1 ? "white" : "#29272f"}
              >
                {key}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
