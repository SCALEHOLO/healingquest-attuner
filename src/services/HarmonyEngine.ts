type AttunementScores = {
    mental: number
    emotional: number
    physical: number
    spiritual: number
    financial: number
    relational: number
    environmental: number
    professional: number
    holistic: number
    integration: number
    consciousness: number
    resonance: number
}

type HarmonyResult = {
    dominant: keyof AttunementScores
    weakest: keyof AttunementScores
    overall_average: number
    insight: string
    theme: string
}

/**
 * Analyzes attunement scores and returns dominant/weakest categories, overall average, insight, and theme.
 * @param scores - Object with 12 attunement category scores (0-10)
 * @returns HarmonyResult
 */
export function analyzeHarmony(scores: Partial<AttunementScores>): HarmonyResult {
    // Logging input
    console.log("[HarmonyEngine] Input vector:", scores);

    // 12-dimension keys
    const categories: (keyof AttunementScores)[] = [
        "mental", "emotional", "physical", "spiritual",
        "financial", "relational", "environmental", "professional",
        "holistic", "integration", "consciousness", "resonance"
    ];
    const safeScores: AttunementScores = {
        mental: 0, emotional: 0, physical: 0, spiritual: 0,
        financial: 0, relational: 0, environmental: 0, professional: 0,
        holistic: 0, integration: 0, consciousness: 0, resonance: 0
    };
    let valid = true;
    let sum = 0;
    let count = 0;
    for (const cat of categories) {
        const val = scores[cat];
        if (typeof val === "number" && isFinite(val) && val >= 0 && val <= 10) {
            safeScores[cat] = val;
            sum += val;
            count++;
        } else {
            valid = false;
        }
    }

    // Find dominant and weakest categories
    let dominant: keyof AttunementScores = "mental";
    let weakest: keyof AttunementScores = "mental";
    let max = -Infinity;
    let min = Infinity;
    for (const cat of categories) {
        if (safeScores[cat] > max) {
            max = safeScores[cat];
            dominant = cat;
        }
        if (safeScores[cat] < min) {
            min = safeScores[cat];
            weakest = cat;
        }
    }

    // Logging computed categories
    console.log(`[HarmonyEngine] Dominant: ${dominant} (${max}), Weakest: ${weakest} (${min})`);

    // Rule-based insights and themes for 12 dimensions
    const insights: Record<keyof AttunementScores, string> = {
        mental: "Your clarity of thought and intellectual curiosity are your greatest strengths right now.",
        emotional: "Emotional awareness and empathy are guiding your journey. Trust your heart.",
        physical: "Vitality and physical well-being are at the core of your current harmony.",
        spiritual: "A deep sense of purpose and connection to something greater is leading you.",
        financial: "You are attuned to practical matters and resourcefulness. Security is a focus.",
        relational: "Your ability to connect and build relationships is a key source of growth.",
        environmental: "Your relationship with your surroundings is a source of balance and inspiration.",
        professional: "Your professional life and sense of purpose in work are thriving.",
        holistic: "You are integrating all aspects of self for a holistic sense of well-being.",
        integration: "You are synthesizing diverse experiences into a unified whole.",
        consciousness: "Your awareness and presence are expanding, elevating your experience.",
        resonance: "You are in tune with the subtle energies and vibrations around you."
    };
    const themes: Record<keyof AttunementScores, string> = {
        mental: "light-mind",
        emotional: "water-heart",
        physical: "earth-body",
        spiritual: "sky-spirit",
        financial: "gold-abundance",
        relational: "rose-connection",
        environmental: "forest-environment",
        professional: "indigo-purpose",
        holistic: "cyan-holistic",
        integration: "lime-integration",
        consciousness: "violet-consciousness",
        resonance: "pink-resonance"
    };

    // Fallbacks for invalid input
    if (!valid || count !== 12) {
        return {
            dominant: "mental",
            weakest: "mental",
            overall_average: 0,
            insight: "Your attunement profile is being established. Explore each area to discover your strengths.",
            theme: "default"
        };
    }

    const overall_average = sum / count;

    return {
        dominant,
        weakest,
        overall_average,
        insight: insights[dominant],
        theme: themes[dominant]
    };
}
