import { ramp } from "./direction";
/** Original fictional design-review workspace. All Rasc UI remains native capture. */
export function WorkContext({
  time,
  resumeAt,
}: {
  time: number;
  resumeAt: number;
}) {
  const compare = ramp(time, 0.55, 0.95),
    returned = time >= resumeAt;
  return (
    <div
      style={{
        position: "absolute",
        left: 160,
        top: 96,
        width: 1600,
        height: 744,
        borderRadius: 20,
        overflow: "hidden",
        background: "#faf8f2",
        boxShadow: "0 24px 65px #283e341b,0 0 0 1px #d9d5ca",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif',
        color: "#273e38",
      }}
    >
      <div
        style={{
          height: 62,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 10,
          borderBottom: "1px solid #dedbd2",
          background: "#eeece5",
        }}
      >
        {["#e87c70", "#e3bd62", "#83ad89"].map((c) => (
          <span
            key={c}
            style={{ width: 13, height: 13, borderRadius: 20, background: c }}
          />
        ))}
        <div
          style={{
            margin: "0 auto",
            width: 560,
            textAlign: "center",
            background: "#e2e0d8",
            borderRadius: 7,
            padding: 8,
            fontSize: 17,
            color: "#74766c",
          }}
        >
          studio.example / common-ground / review
        </div>
        <span style={{ fontSize: 25, color: "#888b80" }}>＋</span>
      </div>
      <div
        style={{
          height: 76,
          padding: "0 36px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          borderBottom: "1px solid #dedbd2",
        }}
      >
        <strong style={{ fontSize: 25, letterSpacing: -1 }}>atelier</strong>
        <span style={{ color: "#999b8f" }}>/</span>
        <span style={{ fontSize: 21 }}>Common Ground</span>
        <span style={{ marginLeft: "auto", fontSize: 16, color: "#818476" }}>
          Review · 04 studies
        </span>
        <span
          style={{
            fontSize: 17,
            border: "1px solid #c7cbbf",
            padding: "10px 17px",
            borderRadius: 6,
          }}
        >
          Preview project ↗
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1060px 540px",
          height: 606,
        }}
      >
        <div style={{ padding: "25px 32px", borderRight: "1px solid #dedbd2" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 17,
              marginBottom: 18,
              color: "#74796a",
            }}
          >
            <span>
              {compare > 0.5
                ? "Final / early directions"
                : "Identity / a shared place"}
            </span>
            <span>{returned ? "02" : "01"} / 04</span>
          </div>
          <div
            style={{
              position: "relative",
              height: 437,
              overflow: "hidden",
              borderRadius: 7,
              background: "#e9e3d5",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                translate: `0 ${90 * compare}px`,
                scale: 1 - 0.58 * compare,
                transformOrigin: "0 0",
                width: 996,
              }}
            >
              <Cover />
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: -576 * (1 - compare),
                width: 576,
                height: 437,
                background: "#e9e3d5",
                borderLeft: "1px solid #bbb5a7",
                padding: 25,
              }}
            >
              <div style={{ fontSize: 13, letterSpacing: 2, color: "#6d7868" }}>
                PROCESS / {returned ? "02" : "01"}
              </div>
              <Sketch second={returned} />
              <div
                style={{
                  fontFamily: "Georgia,serif",
                  fontStyle: "italic",
                  fontSize: 24,
                  color: "#776e59",
                  rotate: "-3deg",
                  marginTop: 10,
                }}
              >
                a little less finished?
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 18,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 92,
                  height: 58,
                  border:
                    "2px solid " +
                    (i === (returned ? 2 : compare > 0.5 ? 1 : 0)
                      ? "#b46c45"
                      : "transparent"),
                  padding: 3,
                  borderRadius: 4,
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 92 58">
                  <rect
                    width="92"
                    height="58"
                    fill={i === 0 ? "#273e38" : "#e4dece"}
                  />
                  {i === 0 ? (
                    <text
                      x="10"
                      y="38"
                      fontFamily="Georgia,serif"
                      fontSize="32"
                      fill="#e5d9ad"
                    >
                      cg.
                    </text>
                  ) : (
                    <path
                      d={
                        i === 1
                          ? "M12 18L62 10 75 43 23 48Z M43 13L46 46 M12 31L79 28"
                          : "M12 40Q39 7 78 26M12 46Q39 16 78 33"
                      }
                      fill="none"
                      stroke="#65765e"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
            ))}
            <span
              style={{ marginLeft: "auto", fontSize: 15, color: "#777e6e" }}
            >
              Working file · saved locally
            </span>
          </div>
        </div>
        <div style={{ position: "relative", padding: 32 }}>
          <div style={{ fontSize: 24, fontWeight: 550, letterSpacing: -0.6 }}>
            Project review
          </div>
          <div style={{ fontSize: 15, color: "#858879", marginTop: 13 }}>
            COMMON GROUND · VISUAL IDENTITY
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "Georgia,serif",
              fontSize: 28,
              lineHeight: 1.22,
              color: "#45563e",
            }}
          >
            A place for the things
            <br />
            we make together.
          </div>
          <div
            style={{
              position: "absolute",
              left: 32,
              right: 32,
              top: 235,
              fontSize: 15,
              color: "#7b8270",
            }}
          >
            Versions
          </div>
          <div
            style={{
              position: "absolute",
              left: 24,
              right: 24,
              top: 267,
              borderRadius: 8,
              border: "1px solid #d6d7c9",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 67,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
                background: compare < 0.5 ? "#e3e6da" : "#f7f5ed",
                fontSize: 20,
              }}
            >
              <span>Final study</span>
              <span style={{ fontSize: 16, color: "#7a846d" }}>04</span>
            </div>
            <div
              style={{
                height: 67,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
                background: compare > 0.5 ? "#e3e6da" : "#f7f5ed",
                borderTop: "1px solid #d6d7c9",
                fontSize: 20,
              }}
            >
              <span>Process</span>
              <span style={{ fontSize: 16, color: "#7a846d" }}>
                18 explorations
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                padding: 14,
                opacity: compare,
              }}
            >
              {[0, 1, 2].map((i) => (
                <svg
                  key={i}
                  width="128"
                  height="88"
                  viewBox="0 0 128 88"
                  style={{ background: "#e9e3d5", borderRadius: 3 }}
                >
                  <path
                    d={
                      i === 0
                        ? "M22 20L80 15 94 65 27 72Z M51 18L56 70 M14 44L101 39"
                        : i === 1
                          ? "M17 51Q54 1 106 38M20 61Q59 14 106 49"
                          : "M30 18H70Q108 18 103 49Q99 75 63 70H26Z M43 10L83 78"
                    }
                    fill="none"
                    stroke="#68765d"
                    strokeWidth="1.8"
                  />
                </svg>
              ))}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 32,
              bottom: 32,
              fontSize: 16,
              lineHeight: 1.45,
              color: "#7a826f",
            }}
          >
            Case study in progress
            <br />
            <span style={{ fontSize: 14, color: "#959a8c" }}>
              Last edited a moment ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function Cover() {
  return (
    <svg width="996" height="437" viewBox="0 0 996 437">
      <rect width="996" height="437" fill="#273e38" />
      <path d="M650 0H996V437H650Z" fill="#b96847" />
      <circle cx="827" cy="218" r="120" fill="#d6ca9e" />
      <path d="M710 218H944M827 99V338" stroke="#273e38" strokeWidth="2" />
      <text x="38" y="45" fill="#d6ca9e" fontSize="14" letterSpacing="3">
        A SHARED PLACE / PORTO
      </text>
      <text
        x="35"
        y="184"
        fill="#f0e9d7"
        fontFamily="Georgia,serif"
        fontSize="92"
        letterSpacing="-5"
      >
        common
      </text>
      <text
        x="35"
        y="280"
        fill="#f0e9d7"
        fontFamily="Georgia,serif"
        fontSize="92"
        letterSpacing="-5"
      >
        ground.
      </text>
      <path d="M38 357H602" stroke="#d6ca9e" />
      <text x="38" y="392" fill="#d6ca9e" fontSize="14" letterSpacing="1.4">
        IDENTITY / SPACE / EVERYDAY LIFE
      </text>
    </svg>
  );
}
function Sketch({ second }: { second: boolean }) {
  return (
    <svg width="526" height="300" viewBox="0 0 526 300">
      <path
        d={
          second
            ? "M50 190Q198 25 450 130 M56 220Q210 61 450 167 M70 247Q224 101 443 205 M140 273L360 265"
            : "M65 50L295 30 345 245 88 265Z M181 40L194 253 M36 153L377 133 M358 43L470 232 M345 248L481 72"
        }
        fill="none"
        stroke="#61735b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M44 278h108m17 0h70" stroke="#a89b7a" strokeWidth="2" />
    </svg>
  );
}
