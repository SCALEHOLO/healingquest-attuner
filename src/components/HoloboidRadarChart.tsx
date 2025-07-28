import React from "react";
import clsx from "clsx";

export type AttunementDimension =
  | "Mental"
  | "Environmental"
  | "Relational"
  | "Financial"
  | "Spiritual"
  | "Physical"
  | "Emotional"
  | "Professional"
  | "Holistic"
  | "Integration"
  | "Consciousness"
  | "Resonance";

export type AttunementScores12 = {
  [K in AttunementDimension]: number;
};

type HoloboidRadarChartProps = {
  scores: Partial<AttunementScores12> | undefined;
  exportRef?: React.RefObject<HTMLCanvasElement | null>;
  highlightDominant?: boolean;
  backgroundImage?: string; // NEW: Optional background image URL
  useBackgroundImage?: boolean; // NEW: Toggle between image and colored zones
};

const DIMENSIONS: AttunementDimension[] = [
  "Mental",
  "Environmental",
  "Relational",
  "Financial",
  "Spiritual",
  "Physical",
  "Emotional",
  "Professional",
];

const CATEGORY_LABELS: { [K in AttunementDimension]: string } = {
  Mental: "MENTAL",
  Emotional: "EMOTIONAL",
  Physical: "PHYSICAL",
  Spiritual: "SPIRITUAL",
  Financial: "FINANCIAL",
  Relational: "RELATIONAL",
  Environmental: "ENVIRONMENTAL",
  Professional: "PROFESSIONAL",
  Holistic: "HOLISTIC",
  Integration: "INTEGRATION",
  Consciousness: "CONSCIOUSNESS",
  Resonance: "RESONANCE",
};

const CATEGORY_COLORS: { [K in AttunementDimension]: string } = {
  Mental: "#8d6ff2ff", // soft indigo
  Emotional: "#f15987ff", // soft magenta
  Physical: "#f24f14ff", // soft green
  Spiritual: "#f4a92fff", // soft blue
  Financial: "#e2c97b", // soft gold
  Relational: "#a2f48bff", // soft red
  Environmental: "#9dd9eeff", // soft teal
  Professional: "#c471c1ff", // soft blue-violet
  Holistic: "#7bd1c6", // soft cyan
  Integration: "#b7d17b", // soft lime
  Consciousness: "#b07bd1", // soft violet
  Resonance: "#d17bb0", // soft rose
};

// Responsive sizing
const getChartSize = () => {
  if (typeof window === "undefined") return 400;
  const width = window.innerWidth;
  if (width < 640) return 280; // Mobile
  if (width < 1024) return 350; // Tablet
  return 400; // Desktop
};

const getRadius = (chartSize: number) => chartSize * 0.35; // 25% of chart size
const getLevels = () => 5;
const TICK_VALUES = [0, 2, 4, 6, 8, 10];

function isValidScores(scores: unknown): scores is AttunementScores12 {
  if (!scores || typeof scores !== "object") return false;
  const s = scores as Record<AttunementDimension, unknown>;
  for (const k of DIMENSIONS) {
    if (
      typeof s[k] !== "number" ||
      !isFinite(s[k] as number) ||
      (s[k] as number) < 0 ||
      (s[k] as number) > 10
    ) {
      return false;
    }
  }
  return true;
}

function getPointsForLevel(
  level: number,
  scores?: AttunementScores12,
  chartSize?: number
) {
  // If scores provided, use them for the data polygon
  // Otherwise, draw a regular polygon for grid
  const RADAR_SIZE = chartSize || 400;
  const CENTER = RADAR_SIZE / 2;
  const RADIUS = getRadius(RADAR_SIZE);
  const LEVELS = getLevels();

  const angleStep = (2 * Math.PI) / DIMENSIONS.length;
  return DIMENSIONS.map((dim, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const value =
      scores && typeof scores[dim] === "number"
        ? (scores[dim] / 10) * RADIUS
        : (level / LEVELS) * RADIUS;
    return {
      x: CENTER + value * Math.cos(angle),
      y: CENTER + value * Math.sin(angle),
    };
  });
}

function getDominantCategory(scores: AttunementScores12): AttunementDimension {
  let max = -Infinity;
  let dominant: AttunementDimension = DIMENSIONS[0];
  for (const k of DIMENSIONS) {
    if (scores[k] > max) {
      max = scores[k];
      dominant = k;
    }
  }
  return dominant;
}

export const HoloboidRadarChart: React.FC<HoloboidRadarChartProps> = ({
  scores,
  exportRef,
  backgroundImage,
  useBackgroundImage = false,
}) => {
  const [chartSize, setChartSize] = React.useState(400);

  React.useEffect(() => {
    const updateSize = () => {
      setChartSize(getChartSize());
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!isValidScores(scores)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-red-100 dark:bg-red-900 rounded-lg p-6">
        <span className="text-red-700 dark:text-red-200 font-semibold text-lg">
          Unable to display radar chart: Invalid or missing attunement scores.
        </span>
      </div>
    );
  }

  const dominant = getDominantCategory(scores);
  const CENTER = chartSize / 2;
  const RADIUS = getRadius(chartSize);
  const LEVELS = getLevels();

  // SVG layers: background image OR colored zones, grid, ticks, labels, data polygon
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center w-full",
        "max-w-xl mx-auto p-2 sm:p-4 lg:p-6",
        "relative"
      )}

    // style={{
    //   // background: "#0003", // Black background to match first image exactly
    //   // backgroundImage:
    //   //   useBackgroundImage && backgroundImage
    //   //     ? `url(${backgroundImage})`
    //   //     : "none",
    //   backgroundSize: "contain",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat",
    // }}
    >
      <svg
        width={chartSize}
        height={chartSize}
        viewBox={`0 -12 ${chartSize} ${chartSize}`}
        style={{ display: "block", margin: "0 auto", background: "none" }}
        ref={exportRef as React.RefObject<SVGSVGElement> | undefined}
      >
        {/* Background Image OR Colored energy zones */}
        {/* {useBackgroundImage && backgroundImage ? (
          // Background Image Option - Dynamically scaled
          <defs>
            <pattern
              id="backgroundPattern"
              patternUnits="userSpaceOnUse"
              width={chartSize}
              height={chartSize}
            >
              <image
                href={backgroundImage}
                width={chartSize}
                height={chartSize}
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
        ) : null} */}

        {/* Central black void - exact match to first image */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={8} // Small black circle at center
          fill="#000000"
        />

        {/* Background Image - HIDDEN - now using external background */}
        {/* {useBackgroundImage && backgroundImage ? (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS + 8} // Perfect fit - extends just beyond radar grid
            fill="url(#backgroundPattern)"
            opacity={1.0} // Full opacity for maximum vibrancy
            style={{
              filter: "blur(0px)", // No blur for crisp, vibrant appearance
            }}
          />
        ) : ( */}

        {/* Original Colored energy zones - now always visible */}
        {/* {DIMENSIONS.map((dim, i) => {
          // Place each circle so its inner edge touches the radar center, but does not extend past the grid
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / DIMENSIONS.length;
          // Reduce radius so circles just touch the center and do not extend past the grid
          const zoneRadius = RADIUS / 1.5;
          const x = CENTER + zoneRadius * Math.cos(angle);
          const y = CENTER + zoneRadius * Math.sin(angle);
          return (
            <circle
              key={dim}
              cx={x}
              cy={y}
              r={zoneRadius}
              fill={CATEGORY_COLORS[dim]}
              fillOpacity={0.14}
              style={{
                filter: "blur(1.2px)",
                mixBlendMode: "lighten",
                transition: "r 0.3s, fill 0.3s",
              }}
            />
          );
        })}
        {/* )} */}

        {/* Concentric polygon grid - integrated Mandala design */}
        {[...Array(LEVELS + 1)].map((_, level) => {
          if (level === 0) return null;
          const points = getPointsForLevel(level, undefined, chartSize);
          const d =
            points
              .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
              .join(" ") + " Z";
          return (
            <path
              key={level}
              d={d}
              fill="none"
              stroke="#fff"
              strokeOpacity={0.12}
              strokeWidth={1}
              style={{
                filter: "blur(0.3px)",
                mixBlendMode: "lighten",
              }}
            />
          );
        })}

        {/* COMMENTED OUT: Axis lines - not visible in first image */}
        {DIMENSIONS.map((dim, i) => {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / DIMENSIONS.length;
          const x = CENTER + RADIUS * Math.cos(angle);
          const y = CENTER + RADIUS * Math.sin(angle);
          return (
            <line
              key={dim}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="#fff"
              strokeOpacity={0.08}
              strokeWidth={1}
            />
          );
        })}

        {/* COMMENTED OUT: Ticks - not visible in first image */}
        {/* {TICK_VALUES.map((tick) => {
          if (tick === 0) return null;
          const r = (tick / 10) * RADIUS;
          return (
            <circle
              key={tick}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="#fff"
              strokeOpacity={0.08}
              strokeWidth={0.8}
            />
          );
        })} */}

        {/* Tick labels - integrated with Mandala design */}
        {TICK_VALUES.map((tick) => {
          const yOffset = (tick / 10) * RADIUS;
          return (
            <text
              key={tick}
              x={CENTER}
              y={CENTER - yOffset + 3}
              textAnchor="middle"
              fontSize={chartSize < 350 ? 8 : 9}
              fill="#fff"
              opacity={0.9}
              fontWeight={500}
              style={{
                userSelect: "none",
                filter: "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
              }}
            >
              {tick}
            </text>
          );
        })}

        {/* COMMENTED OUT: Axis labels - not visible in first image */}
        {/* {DIMENSIONS.map((dim, i) => {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / DIMENSIONS.length;
          const labelRadius = RADIUS + 48;
          const x = CENTER + labelRadius * Math.cos(angle);
          const y = CENTER + labelRadius * Math.sin(angle);
          return (
            <text
              key={dim}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={15}
              fontWeight="bold"
              fill="#fff"
              style={{
                textTransform: "uppercase",
                letterSpacing: 1.5,
                filter: "drop-shadow(0 1px 4px #0008)",
                userSelect: "none",
              }}
            >
              {CATEGORY_LABELS[dim]}
            </text>
          );
        })} */}

        {/* Data polygon - integrated Mandala design */}
        {(() => {
          // Use radius that creates harmonious Mandala proportions
          const polygonRadius = RADIUS; // Perfect proportion for smaller radar
          const angleStep = (2 * Math.PI) / DIMENSIONS.length;
          const points = DIMENSIONS.map((dim, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            const value =
              scores && typeof scores[dim] === "number"
                ? (scores[dim] / 10) * polygonRadius
                : polygonRadius;
            return {
              x: CENTER + value * Math.cos(angle),
              y: CENTER + value * Math.sin(angle),
            };
          });
          const d =
            points
              .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
              .join(" ") + " Z";
          return (
            <path
              d={d}
              fill="none"
              stroke="#fff"
              strokeWidth={chartSize < 350 ? 1.5 : 2} // Harmonious stroke width for smaller radar
              style={{
                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
                mixBlendMode: "lighten",
              }}
            />
          );
        })()}

        {/* Data points - integrated Mandala design */}
        {(() => {
          // Use the exact same radius as the polygon for perfect alignment
          const polygonRadius = RADIUS; // Same radius as polygon
          const angleStep = (2 * Math.PI) / DIMENSIONS.length;
          const points = DIMENSIONS.map((dim, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            const value =
              scores && typeof scores[dim] === "number"
                ? (scores[dim] / 10) * polygonRadius
                : polygonRadius;
            return {
              x: CENTER + value * Math.cos(angle),
              y: CENTER + value * Math.sin(angle),
            };
          });
          return points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={chartSize < 350 ? 2 : 2.5} // Harmonious radius for smaller radar
              fill="#fff"
              stroke={CATEGORY_COLORS[DIMENSIONS[i]]}
              strokeWidth={1} // Harmonious stroke width for smaller radar
              style={{
                filter: "drop-shadow(0 0 3px rgba(255,255,255,0.5))",
                mixBlendMode: "lighten",
              }}
            />
          ));
        })()}
      </svg>
      {/* <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-200 text-center">
        <span>
          Dominant:{" "}
          <span
            className="font-bold"
            style={{ color: CATEGORY_COLORS[dominant] }}
          >
            {CATEGORY_LABELS[dominant]}
          </span>
        </span>
      </div> */}
    </div>
  );
};

export default HoloboidRadarChart;