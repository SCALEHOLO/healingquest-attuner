export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  category: string;
  type?: string;
  options?: string[];
  range?: number;
}

export interface QuizResponse {
  questionId: string;
  value: number; // 1-5 scale
  timestamp: Date;
}

export interface UserQuizData {
  userId: string;
  email: string;
  responses: QuizResponse[];
  completedAt: Date;
  scores: {
    mental: number,
    emotional: number,
    professional: number,
    physical: number,
    spiritual: number,
    financial: number,
    relational: number,
    environmental: number,
    holistic: number,
    Integration: number,
    consciousness: number,
    resonance: number,
  };
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "mental-main",
    question: "On a scale of 1–10, how clear and focused do you feel in your thinking and decision-making this week?",
    description: "Captures cognitive clarity and self-perceived mental presence.",
    category: "mental",
    type: "range",
  },
  {
    id: "emotional-main",
    question: "How able are you to recognize and process your emotions in real time? (1 = rarely, 10 = consistently)",
    description: "Gauges emotional intelligence and real-time awareness.",
    category: "emotional",
    type: "range",
  },
  {
    id: "professional-main",
    question: "Which statement best describes your current relationship with your work/calling?",
    description: "Taps into work fulfillment and professional flow.",
    category: "professional",
    type: "multi-choice",
    options: [
      "Inspired daily",
      "Sometimes purposeful",
      "Going through motions",
      "Feeling stuck"
    ]
  },
  {
    id: "physical-main",
    question: "How energized, healthy, and vital do you feel in your body right now",
    description: "Quick somatic check-in; tracks body-mind alignment.",
    category: "physical",
    type: "range"
  },
  {
    id: "spiritual-main",
    question: "How often do you feel connected to a sense of purpose, meaning, or something greater than yourself?",
    description: "Your approach to cause and effect",
    category: "spiritual",
    type: "multi-choice",
    options: [
      "Daily",
      "Weekly",
      "Occasionally",
      "Rarely"
    ]
  },
  {
    id: "financial-main",
    question: "How confident are you in your current financial path and ability to create future abundance?",
    description: "Measures money mindset, confidence, and empowerment.",
    category: "financial",
    type: "range"
  },
  {
    id: "relational-main",
    question: "To what extent do your closest relationships feel nourishing, authentic, and mutually supportive?",
    description: "Measures relational health and emotional safety.",
    category: "relational",
    type: "range"
  },
  {
    id: "environmental-main",
    question: "How supported do you feel by your living/working environment (nature, home, community)?",
    description: "Checks resonance with immediate surroundings.",
    category: "environmental",
    type: "range"
  },
  {
    id: "holistic-main",
    question: "How well do you see and work with the interconnectedness of all areas of your life?",
    description: "Assesses systems-thinking and holistic perception.",
    category: "holistic",
    type: "range"
  },
  {
    id: "integration-main",
    question: "How easily do you integrate lessons and experiences from one area of your life into others?",
    description: "Measures ability to cross-pollinate growth.",
    category: "Integration",
    type: "multi-choice",
    options: [
      "Seamlessly",
      "Sometimes",
      "Rarely",
      "Never"
    ]
  },
  {
    id: "consciousness-main",
    question: "How present and aware do you feel in your daily experience?",
    description: "Taps into state of mindfulness and meta-awareness.",
    category: "consciousness",
    type: "range"
  },
  {
    id: "resonance-main",
    question: "How strongly do you sense alignment with your core values and deeper patterns in your life?",
    description: "Measures frequency alignment and soul congruence.",
    category: "resonance",
    type: "range"
  },
];

export const scaleLabels = [
  "Strongly Disagree",
  "Disagree", 
  "Neutral",
  "Agree",
  "Strongly Agree"
];

export const categoryDescriptions = {
  holistic: "Holistic Thinking - Your ability to see and work with whole systems",
  integration: "Integration - How you connect different aspects of experience", 
  consciousness: "Consciousness - Your level of present-moment awareness",
  resonance: "Resonance - Your alignment with deeper patterns and values"
}; 