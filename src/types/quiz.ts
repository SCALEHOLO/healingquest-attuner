export interface QuizResponse {
    questionId: string;
    value: number; // 1-4 scale
    timestamp: Date;
}

export interface UserQuizData {
    userId: string;
    email: string;
    responses: QuizResponse[];
    completedAt: Date;
    scores: Record<string, number>;
}
