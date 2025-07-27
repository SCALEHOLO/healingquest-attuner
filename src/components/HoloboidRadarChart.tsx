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
    Mental: "#8d6ff2ff",        // soft indigo
    Emotional: "#f15987ff",     // soft magenta
    Physical: "#f24f14ff",      // soft green
    Spiritual: "#f4a92fff",     // soft blue
    Financial: "#e2c97b",     // soft gold
    Relational: "#a2f48bff",    // soft red
    Environmental: "#9dd9eeff", // soft teal
    Professional: "#c471c1ff",  // soft blue-violet
    Holistic: "#7bd1c6",      // soft cyan
    Integration: "#b7d17b",   // soft lime
    Consciousness: "#b07bd1", // soft violet
    Resonance: "#d17bb0",     // soft rose
};

const RADAR_SIZE = 400;
const CENTER = RADAR_SIZE / 2;
const RADIUS = 150;
const LEVELS = 5;
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

function getPointsForLevel(level: number, scores?: AttunementScores12) {
    // If scores provided, use them for the data polygon
    // Otherwise, draw a regular polygon for grid
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
}) => {
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

    // SVG layers: colored zones, grid, ticks, labels, data polygon
    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-center w-full",
                "max-w-xl mx-auto p-4 sm:p-6 lg:p-8",
                "border border-gray-200 dark:border-gray-700",
                "relative"
            )}
            style={{
                background: "radial-gradient(ellipse at 60% 40%, #7ec6f7 0%, #3a6ea5 60%, #1b2e4b 100%)"
            }}
        >
            <svg
                width={RADAR_SIZE + 120}
                height={RADAR_SIZE + 96}
                viewBox={`-60 -48 ${RADAR_SIZE + 120} ${RADAR_SIZE + 96}`}
                style={{ display: "block", margin: "0 auto", background: "none" }}
                ref={exportRef as React.RefObject<SVGSVGElement> | undefined}
            >
                {/* Colored energy zones */}
                {DIMENSIONS.map((dim, i) => {
                    // Place each circle so its inner edge touches the radar center, but does not extend past the grid
                    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / DIMENSIONS.length;
                    // Reduce radius so circles just touch the center and do not extend past the grid
                    const zoneRadius = RADIUS / 2;
                    const x = CENTER + zoneRadius * Math.cos(angle);
                    const y = CENTER + zoneRadius * Math.sin(angle);
                    return (
                        <circle
                            key={dim}
                            cx={x}
                            cy={y}
                            r={zoneRadius}
                            fill={CATEGORY_COLORS[dim]}
                            fillOpacity={0.54}
                            style={{
                                filter: "blur(1.2px)",
                                mixBlendMode: "lighten",
                                transition: "r 0.3s, fill 0.3s"
                            }}
                        />
                    );
                })}

                {/* Concentric polygon grid */}
                {[...Array(LEVELS + 1)].map((_, level) => {
                    if (level === 0) return null;
                    const points = getPointsForLevel(level);
                    const d = points
                        .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
                        .join(" ") + " Z";
                    return (
                        <path
                            key={level}
                            d={d}
                            fill="none"
                            stroke="#fff"
                            strokeOpacity={0.18}
                            strokeWidth={1.5}
                        />
                    );
                })}

                {/* Axis lines */}
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
                            strokeOpacity={0.18}
                            strokeWidth={1.2}
                        />
                    );
                })}

                {/* Ticks (0,2,4,6,8,10) */}
                {TICK_VALUES.map((tick) => {
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
                })}

                {/* Tick labels */}
                {TICK_VALUES.map((tick) => {
                    const yOffset = (tick / 10) * RADIUS;
                    return (
                        <text
                            key={tick}
                            x={CENTER}
                            y={CENTER - yOffset}
                            textAnchor="middle"
                            fontSize={13}
                            fill="#fff"
                            opacity={0.7}
                            fontWeight={500}
                            style={{ userSelect: "none" }}
                        >
                            {tick}
                        </text>
                    );
                })}

                {/* Axis labels */}
                {DIMENSIONS.map((dim, i) => {
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
                })}

                {/* Data polygon */}
                {(() => {
                    const points = getPointsForLevel(LEVELS, scores);
                    const d =
                        points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
                    return (
                        <path
                            d={d}
                            fill="none"
                            stroke="#fff"
                            strokeWidth={3.5}
                            style={{
                                filter: "drop-shadow(0 0 8px #fff8)",
                            }}
                        />
                    );
                })()}

                {/* Data points */}
                {getPointsForLevel(LEVELS, scores).map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r={6}
                        fill="#fff"
                        stroke={CATEGORY_COLORS[DIMENSIONS[i]]}
                        strokeWidth={2.5}
                        style={{
                            filter: "drop-shadow(0 0 4px #fff8)",
                        }}
                    />
                ))}
            </svg>
            <div className="mt-4 text-sm text-gray-200 text-center">
                <span>
                    Dominant:{" "}
                    <span
                        className="font-bold"
                        style={{ color: CATEGORY_COLORS[dominant] }}
                    >
                        {CATEGORY_LABELS[dominant]}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default HoloboidRadarChart;
