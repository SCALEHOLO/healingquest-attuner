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

type HarmonyResult = {
    dominantCategory: keyof AttunementScores
    weakestCategory: keyof AttunementScores
    insight: string
    theme: string
}

/**
 * Analyzes attunement scores and returns dominant/weakest categories, insight, and theme.
 * @param scores - Object with 8 attunement category scores (0-10)
 * @returns HarmonyResult
 */
export function analyzeHarmony(scores: Partial<AttunementScores>): HarmonyResult {
    // Logging input
    console.log("[HarmonyEngine] Input vector:", scores)

    // Validate input: ensure all 8 keys, values are numbers 0-10
    const categories: (keyof AttunementScores)[] = [
        "mental", "emotional", "physical", "spiritual",
        "environmental", "social", "financial", "creative"
    ]
    const safeScores: AttunementScores = {
        mental: 0, emotional: 0, physical: 0, spiritual: 0,
        environmental: 0, social: 0, financial: 0, creative: 0
    }
    let valid = true
    for (const cat of categories) {
        const val = scores[cat]
        if (typeof val === "number" && isFinite(val) && val >= 0 && val <= 10) {
            safeScores[cat] = val
        } else {
            valid = false
        }
    }

    // Find dominant and weakest categories
    let dominantCategory: keyof AttunementScores = "mental"
    let weakestCategory: keyof AttunementScores = "mental"
    let max = -Infinity
    let min = Infinity
    for (const cat of categories) {
        if (safeScores[cat] > max) {
            max = safeScores[cat]
            dominantCategory = cat
        }
        if (safeScores[cat] < min) {
            min = safeScores[cat]
            weakestCategory = cat
        }
    }

    // Logging computed categories
    console.log(`[HarmonyEngine] Dominant: ${dominantCategory} (${max}), Weakest: ${weakestCategory} (${min})`)

    // Rule-based insights and themes
    const insights: Record<keyof AttunementScores, string> = {
        mental: "Your clarity of thought and intellectual curiosity are your greatest strengths right now.",
        emotional: "Emotional awareness and empathy are guiding your journey. Trust your heart.",
        physical: "Vitality and physical well-being are at the core of your current harmony.",
        spiritual: "A deep sense of purpose and connection to something greater is leading you.",
        environmental: "Your relationship with your surroundings is a source of balance and inspiration.",
        social: "Community and relationships are central to your growth at this time.",
        financial: "You are attuned to practical matters and resourcefulness. Security is a focus.",
        creative: "Imagination and creative flow are your superpowers. Express yourself freely."
    }
    const themes: Record<keyof AttunementScores, string> = {
        mental: "light-mind",
        emotional: "water-heart",
        physical: "earth-body",
        spiritual: "sky-spirit",
        environmental: "forest-environment",
        social: "circle-community",
        financial: "gold-abundance",
        creative: "fire-creation"
    }

    // Fallbacks for invalid input
    if (!valid) {
        return {
            dominantCategory: "mental",
            weakestCategory: "mental",
            insight: "Your attunement profile is being established. Explore each area to discover your strengths.",
            theme: "default"
        }
    }

    return {
        dominantCategory,
        weakestCategory,
        insight: insights[dominantCategory],
        theme: themes[dominantCategory]
    }
}
