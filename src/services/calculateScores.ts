import { quizQuestions } from "@/data/quizQuestions";

/**
 * Calculates normalized scores for 8 attunement categories.
 * @param responses - Object mapping questionId to numeric response
 * @returns Object with scores for each category (0-10 scale)
 */
export function calculateScores(responses: { [questionId: string]: number }): {
    mental: number;
    emotional: number;
    physical: number;
    spiritual: number;
    environmental: number;
    social: number;
    financial: number;
    creative: number;
} {
    // Define all 8 categories
    const categories = [
        "mental",
        "emotional",
        "physical",
        "spiritual",
        "environmental",
        "social",
        "financial",
        "creative"
    ] as const;

    // Initialize accumulators and counts
    const rawScores: Record<typeof categories[number], number> = {
        mental: 0,
        emotional: 0,
        physical: 0,
        spiritual: 0,
        environmental: 0,
        social: 0,
        financial: 0,
        creative: 0
    };
    const counts: Record<typeof categories[number], number> = {
        mental: 0,
        emotional: 0,
        physical: 0,
        spiritual: 0,
        environmental: 0,
        social: 0,
        financial: 0,
        creative: 0
    };

    // Build a map of questionId -> category (if present)
    const questionCategoryMap: Record<string, string> = {};
    for (const q of quizQuestions) {
        questionCategoryMap[q.id] = q.category;
    }

    // Map quiz data categories to the 8 attunement categories (customize as needed)
    const categoryMapping: Record<string, typeof categories[number]> = {
        holistic: "mental",
        integration: "emotional",
        consciousness: "spiritual",
        resonance: "creative"
        // Add more mappings if quizQuestions.ts is updated
    };

    // Process responses
    for (const [questionId, value] of Object.entries(responses)) {
        const quizCategory = questionCategoryMap[questionId];
        if (!quizCategory) {
            console.warn(`[calculateScores] Warning: Question ID "${questionId}" not found in quizQuestions. Skipping.`);
            continue;
        }
        const attunementCategory = categoryMapping[quizCategory];
        if (!attunementCategory) {
            console.warn(`[calculateScores] Warning: Quiz category "${quizCategory}" for question "${questionId}" does not map to an attunement category. Skipping.`);
            continue;
        }
        rawScores[attunementCategory] += value;
        counts[attunementCategory] += 1;
    }

    // Calculate normalized scores (average, then scale to 0-10)
    const normalizedScores: Record<typeof categories[number], number> = { ...rawScores };
    for (const category of categories) {
        if (counts[category] > 0) {
            // Responses are on a 1-5 scale; normalize to 0-10
            const avg = rawScores[category] / counts[category];
            normalizedScores[category] = ((avg - 1) / 4) * 10;
        } else {
            normalizedScores[category] = 0;
        }
        // Logging for development/debugging
        console.log(
            `[calculateScores] Category: ${category} | Raw Total: ${rawScores[category]} | Count: ${counts[category]} | Normalized (0-10): ${normalizedScores[category].toFixed(2)}`
        );
    }

    return normalizedScores;
}
