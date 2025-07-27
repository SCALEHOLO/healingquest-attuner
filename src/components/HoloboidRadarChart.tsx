import React, { useRef, useEffect } from "react"
import { Radar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
    Chart
} from "chart.js"
import "chart.js/auto"
import clsx from "clsx"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

type AttunementScores = {
    mental: number
    emotional: number
    physical: number
    spiritual: number
    environmental: number
    social: number
    financial: number
    creative: number
}

type HoloboidRadarChartProps = {
    scores: Partial<AttunementScores> | undefined
    themeColor?: string
    exportRef?: React.RefObject<HTMLCanvasElement>
    highlightDominant?: boolean
}

const CATEGORY_LABELS: { [K in keyof AttunementScores]: string } = {
    mental: "Mental",
    emotional: "Emotional",
    physical: "Physical",
    spiritual: "Spiritual",
    environmental: "Environmental",
    social: "Social",
    financial: "Financial",
    creative: "Creative"
}

const CATEGORY_COLORS: { [K in keyof AttunementScores]: string } = {
    mental: "#7c3aed", // purple
    emotional: "#f472b6", // pink
    physical: "#34d399", // green
    spiritual: "#60a5fa", // blue
    environmental: "#fbbf24", // yellow
    social: "#f87171", // red
    financial: "#facc15", // gold
    creative: "#fb7185" // rose
}

function isValidScores(scores: any): scores is AttunementScores {
    if (!scores || typeof scores !== "object") return false
    const keys = Object.keys(CATEGORY_LABELS)
    for (const k of keys) {
        if (
            typeof scores[k] !== "number" ||
            !isFinite(scores[k]) ||
            scores[k] < 0 ||
            scores[k] > 10
        ) {
            return false
        }
    }
    return true
}

function getDominantCategory(scores: AttunementScores): keyof AttunementScores {
    let max = -Infinity
    let dominant: keyof AttunementScores = "mental"
    for (const k of Object.keys(scores) as (keyof AttunementScores)[]) {
        if (scores[k] > max) {
            max = scores[k]
            dominant = k
        }
    }
    return dominant
}

export const HoloboidRadarChart: React.FC<HoloboidRadarChartProps> = ({
    scores,
    themeColor,
    exportRef,
    highlightDominant = false
}) => {
    // Defensive fallback
    if (!isValidScores(scores)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-red-100 dark:bg-red-900 rounded-lg p-6">
                <span className="text-red-700 dark:text-red-200 font-semibold text-lg">
                    Unable to display radar chart: Invalid or missing attunement scores.
                </span>
            </div>
        )
    }

    const dominant = getDominantCategory(scores)
    const color = themeColor || CATEGORY_COLORS[dominant] || "#7c3aed"

    // Chart.js data and options
    const data: ChartData<"radar"> = {
        labels: Object.values(CATEGORY_LABELS),
        datasets: [
            {
                label: "Attunement Profile",
                data: Object.keys(CATEGORY_LABELS).map(k => scores[k as keyof AttunementScores]),
                backgroundColor: color + "33", // semi-transparent fill
                borderColor: color,
                borderWidth: 3,
                pointBackgroundColor: Object.keys(CATEGORY_LABELS).map(k =>
                    highlightDominant && k === dominant ? "#fff" : color
                ),
                pointBorderColor: Object.keys(CATEGORY_LABELS).map(k =>
                    highlightDominant && k === dominant ? CATEGORY_COLORS[dominant] : color
                ),
                pointRadius: Object.keys(CATEGORY_LABELS).map(k =>
                    highlightDominant && k === dominant ? 8 : 5
                ),
                pointHoverRadius: 10
            }
        ]
    }

    const options: ChartOptions<"radar"> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 2,
                    color: "#a1a1aa",
                    font: { size: 14 }
                },
                pointLabels: {
                    color: "#4b5563",
                    font: { size: 16, weight: "bold" }
                },
                grid: {
                    color: "#d1d5db"
                },
                angleLines: {
                    color: "#d1d5db"
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: ctx =>
                        `${ctx.label}: ${ctx.formattedValue} / 10`
                }
            }
        },
        animation: {
            duration: 1200,
            easing: "easeOutQuart"
        }
    }

    // Export as PNG (bonus)
    const chartRef = useRef<Chart<"radar"> | null>(null)
    useEffect(() => {
        if (exportRef && exportRef.current && chartRef.current) {
            // Assign the canvas to exportRef for parent to use
            exportRef.current = chartRef.current.canvas as HTMLCanvasElement
        }
    }, [exportRef])

    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-center w-full",
                "max-w-xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg",
                "border border-gray-200 dark:border-gray-700"
            )}
        >
            <div className="w-full" style={{ minHeight: 350, height: 400 }}>
                <Radar
                    ref={chartRef}
                    data={data}
                    options={options}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
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
    )
}

export default HoloboidRadarChart
