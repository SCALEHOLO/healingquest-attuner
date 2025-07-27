// HOLO Healing 12-Dimension Questionnaire (Brooks-edited, 2025-07-26)

export type ResponseType = "numeric" | "multiple_choice";

export interface QuizOption {
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  dimension: string;
  question: string;
  response_type: ResponseType;
  max_score: number;
  min?: number;
  max?: number;
  ui?: string;
  visual_feedback?: string;
  options?: QuizOption[];
  notes?: string;
}

export const questionPool: Record<string, QuizQuestion[]> = {
  Mental: [
    {
      id: "mental-main",
      dimension: "Mental",
      question: "On a scale of 1–10, how clear and focused do you feel in your thinking and decision-making this week?",
      response_type: "numeric",
      max_score: 10,
      min: 1,
      max: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ],
  Emotional: [
    {
      id: "emotional-main",
      dimension: "Emotional",
      question: "How able are you to recognize and process your emotions in real time (1 = rarely, 10 = consistently)?",
      response_type: "numeric",
      max_score: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ],
  Professional: [
    {
      id: "professional-main",
      dimension: "Professional",
      question: "Which statement best describes your current relationship with your work/calling?",
      response_type: "multiple_choice",
      options: [
        { label: "A) Inspired daily", score: 4 },
        { label: "B) Sometimes purposeful", score: 3 },
        { label: "C) Going through motions", score: 2 },
        { label: "D) Feeling stuck", score: 1 }
      ],
      max_score: 4
    }
  ],
  Physical: [
    {
      id: "physical-main",
      dimension: "Physical",
      question: "How energized, healthy, and vital do you feel in your body right now (1–10)?",
      response_type: "numeric",
      max_score: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ],
  Spiritual: [
    {
      id: "spiritual-main",
      dimension: "Spiritual",
      question: "How often do you feel connected to a sense of purpose, meaning, or something greater than yourself?",
      response_type: "multiple_choice",
      options: [
        { label: "A) Daily", score: 4 },
        { label: "B) Weekly", score: 3 },
        { label: "C) Occasionally", score: 2 },
        { label: "D) Rarely", score: 1 }
      ],
      max_score: 4
    }
  ],
  Financial: [
    {
      id: "financial-main",
      dimension: "Financial",
      question: "How confident are you in your current financial path and ability to create future abundance (1–10)?",
      response_type: "numeric",
      max_score: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ],
  Relational: [
    {
      id: "relational-main",
      dimension: "Relational",
      question: "To what extent do your closest relationships feel nourishing, authentic, and mutually supportive (1–10)?",
      response_type: "numeric",
      max_score: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ],
  Environmental: [
    {
      id: "environmental-main",
      dimension: "Environmental",
      question: "How supported do you feel by your living/working environment (nature, home, community)(1–10)?",
      response_type: "numeric",
      max_score: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ],
  Holistic: [
    {
      id: "holistic-main",
      dimension: "Holistic",
      question: "How well do you see and work with the interconnectedness of all areas of your life (1–10)?",
      response_type: "numeric",
      max_score: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ],
  Integration: [
    {
      id: "integration-main",
      dimension: "Integration",
      question: "How easily do you integrate lessons and experiences from one area of your life into others?",
      response_type: "multiple_choice",
      options: [
        { label: "A) Seamlessly", score: 4 },
        { label: "B) Sometimes", score: 3 },
        { label: "C) Rarely", score: 2 },
        { label: "D) Never", score: 1 }
      ],
      max_score: 4
    }
  ],
  Consciousness: [
    {
      id: "consciousness-main",
      dimension: "Consciousness",
      question: "How present and aware do you feel in your daily experience (1 = not at all, 10 = extremely)?",
      response_type: "numeric",
      max_score: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ],
  Resonance: [
    {
      id: "resonance-main",
      dimension: "Resonance",
      question: "How strongly do you sense alignment with your core values and deeper patterns in your life (1-10)?",
      response_type: "numeric",
      max_score: 10,
      ui: "slider",
      visual_feedback: "gradient-scale"
    }
  ]
};

export function getRandomQuizQuestions() {
  return Object.entries(questionPool).map(([, questions]) => {
    const selected = questions[Math.floor(Math.random() * questions.length)];
    return selected;
  });
}

export const quizQuestions = getRandomQuizQuestions();
