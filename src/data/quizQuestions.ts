export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  category: string;
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
    holistic: number;
    integration: number;
    consciousness: number;
    resonance: number;
  };
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "holistic-thinking",
    question: "I prefer to see the big picture rather than focus on individual details",
    description: "How do you approach complex problems?",
    category: "holistic"
  },
  {
    id: "interconnectedness",
    question: "I often notice how different aspects of life are interconnected",
    description: "Your awareness of systemic relationships",
    category: "integration"
  },
  {
    id: "intuitive-decisions",
    question: "I trust my intuition when making important decisions",
    description: "How do you process information and make choices?",
    category: "consciousness"
  },
  {
    id: "pattern-recognition",
    question: "I easily recognize patterns and connections others might miss",
    description: "Your ability to see underlying structures",
    category: "resonance"
  },
  {
    id: "systems-thinking",
    question: "I consider how my actions affect the whole system, not just immediate outcomes",
    description: "Your approach to cause and effect",
    category: "holistic"
  },
  {
    id: "emotional-intelligence",
    question: "I can sense the emotional undercurrents in group dynamics",
    description: "Your awareness of collective emotional states",
    category: "integration"
  },
  {
    id: "present-awareness",
    question: "I am fully present and aware in most moments of my day",
    description: "Your level of mindful awareness",
    category: "consciousness"
  },
  {
    id: "harmonic-alignment",
    question: "I feel most energized when my actions align with my deeper values",
    description: "Your sense of authentic alignment",
    category: "resonance"
  }
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