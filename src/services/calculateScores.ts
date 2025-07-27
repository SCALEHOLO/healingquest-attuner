import { quizQuestions } from "@/data/quizQuestions";

/**
 * Calculates normalized scores for 12 attunement dimensions.
 * @param responses - Object mapping questionId to numeric response
 * @returns Object with scores for each dimension (0-10 scale)
 */
export function calculateScores(responses: { [questionId: string]: number }): Record<string, number> {
    // Define all 12 dimensions
    const dimensions = [
        "Mental",
        "Emotional",
        "Physical",
        "Spiritual",
        "Financial",
        "Relational",
        "Environmental",
        "Professional",
        "Holistic",
        "Integration",
        "Consciousness",
        "Resonance"
    ] as const;

    // Initialize accumulators and counts
    const rawScores: Record<string, number> = {};
    const counts: Record<string, number> = {};
    for (const dim of dimensions) {
        rawScores[dim] = 0;
        counts[dim] = 0;
    }

    // Build a map of questionId -> dimension and questionId -> max_score
    const questionDimensionMap: Record<string, string> = {};
    const questionMaxScoreMap: Record<string, number> = {};
    for (const q of quizQuestions) {
        questionDimensionMap[q.id] = q.dimension;
        questionMaxScoreMap[q.id] = q.max_score;
    }

    // Process responses (normalize each to 0-10 using max_score)
    for (const [questionId, value] of Object.entries(responses)) {
        const dimension = questionDimensionMap[questionId];
        const maxScore = questionMaxScoreMap[questionId];
        if (!dimension || !maxScore) {
            console.warn(`[calculateScores] Warning: Question ID "${questionId}" not found in quizQuestions or missing max_score. Skipping.`);
            continue;
        }
        if (!(dimension in rawScores)) {
            console.warn(`[calculateScores] Warning: Dimension "${dimension}" for question "${questionId}" is not a recognized dimension. Skipping.`);
            continue;
        }
        // Normalize to 0-10 scale (assume min is 1)
        const normalized = ((value - 1) / (maxScore - 1)) * 10;
        rawScores[dimension] += normalized;
        counts[dimension] += 1;
    }

    // Calculate normalized scores (average of normalized values, already 0-10)
    const normalizedScores: Record<string, number> = { ...rawScores };
    for (const dim of dimensions) {
        if (counts[dim] > 0) {
            const avg = rawScores[dim] / counts[dim];
            normalizedScores[dim] = avg;
        } else {
            normalizedScores[dim] = 0;
        }
        // Logging for development/debugging
        console.log(
            `[calculateScores] Dimension: ${dim} | Normalized Total: ${rawScores[dim]} | Count: ${counts[dim]} | Normalized Avg (0-10): ${normalizedScores[dim].toFixed(2)}`
        );
    }

    return normalizedScores;
}
