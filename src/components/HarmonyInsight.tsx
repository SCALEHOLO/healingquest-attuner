import React from "react"
import clsx from "clsx"

const CATEGORY_COLORS: Record<string, string> = {
    mental: "bg-purple-500 text-white",
    emotional: "bg-pink-400 text-white",
    physical: "bg-green-400 text-white",
    spiritual: "bg-blue-400 text-white",
    environmental: "bg-yellow-400 text-gray-900",
    social: "bg-red-400 text-white",
    financial: "bg-yellow-500 text-gray-900",
    creative: "bg-rose-400 text-white"
}

type HarmonyInsightProps = {
    dominantCategory: string
    insight: string
    weakestCategory?: string
    theme?: string
    tone?: "neutral" | "positive" | "gentle" | "bold"
    callToAction?: string
}

export const HarmonyInsight: React.FC<HarmonyInsightProps> = ({
    dominantCategory,
    insight,
    weakestCategory,
    theme,
    tone = "neutral",
    callToAction
}) => {
    if (!dominantCategory || !insight) {
        return null
    }

    // Pick color for dominant or fallback
    const domColor =
        CATEGORY_COLORS[dominantCategory.toLowerCase()] ||
        (theme ? `${theme}` : "bg-gray-200 text-gray-900")

    // Animation classes
    const animation =
        "animate-fade-in-up transition-all duration-700 ease-out"

    return (
        <section
            className={clsx(
                "w-full max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
                animation
            )}
            style={{
                borderColor: "transparent"
            }}
        >
            <h2 className="text-2xl font-bold mb-2 text-center tracking-tight">
                Your Wholeness Signature
            </h2>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                <span
                    className={clsx(
                        "px-3 py-1 rounded-full font-semibold text-sm shadow",
                        domColor
                    )}
                >
                    Dominant: {dominantCategory.charAt(0).toUpperCase() + dominantCategory.slice(1)}
                </span>
                {weakestCategory && (
                    <span
                        className={clsx(
                            "px-3 py-1 rounded-full font-semibold text-sm shadow bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                        )}
                    >
                        Weakest: {weakestCategory.charAt(0).toUpperCase() + weakestCategory.slice(1)}
                    </span>
                )}
                {theme && (
                    <span className="px-3 py-1 rounded-full font-semibold text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        Theme: {theme}
                    </span>
                )}
            </div>
            <p
                className={clsx(
                    "text-lg text-center mb-4",
                    {
                        "text-gray-700 dark:text-gray-200": tone === "neutral",
                        "text-green-600 dark:text-green-400": tone === "positive",
                        "text-blue-600 dark:text-blue-400": tone === "gentle",
                        "text-purple-700 dark:text-purple-300": tone === "bold"
                    }
                )}
                style={{ fontFamily: "inherit", lineHeight: 1.6 }}
            >
                {insight}
            </p>
            {callToAction && (
                <div className="flex justify-center mt-2">
                    <button
                        className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition-transform"
                        type="button"
                    >
                        {callToAction}
                    </button>
                </div>
            )}
        </section>
    )
}

export default HarmonyInsight

// Tailwind animation (add to global CSS if not present):
// .animate-fade-in-up {
//   @apply opacity-0 translate-y-6;
//   animation: fadeInUp 0.7s ease-out forwards;
// }
// @keyframes fadeInUp {
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
