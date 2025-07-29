import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserQuizData, QuizResponse, quizQuestions } from '@/data/quizQuestions';

export interface QuizSubmission {
  responses: { [questionId: string]: number };
  email: string;
  userId: string;
  userExperience: string;
}

export const calculateScores = (responses: { [questionId: string]: number }) => {
  const categoryScores = {
    mental: 0,
    emotional: 0,
    professional: 0,
    physical: 0,
    spiritual: 0,
    financial: 0,
    relational: 0,
    environmental: 0,
    holistic: 0,
    Integration: 0,
    consciousness: 0,
    resonance: 0,
  };

  const categoryCounts = {
    mental: 0,
    emotional: 0,
    professional: 0,
    physical: 0,
    spiritual: 0,
    financial: 0,
    relational: 0,
    environmental: 0,
    holistic: 0,
    Integration: 0,
    consciousness: 0,
    resonance: 0,
  };

  // Calculate average scores per category
  Object.entries(responses).forEach(([questionId, value]) => {
    const question = quizQuestions.find(q => q.id === questionId);
    if (question) {
      const category = question.category as keyof typeof categoryScores;
      categoryScores[category] += value;
      categoryCounts[category]++;
    }
  });

  // // Convert to averages (1-5 scale)
  Object.keys(categoryScores).forEach(category => {
    const cat = category as keyof typeof categoryScores;
    if (categoryCounts[cat] > 0) {
      categoryScores[cat] = categoryScores[cat] / categoryCounts[cat];
    }
  });

  return categoryScores;
};

export const saveIndividualResponse = async (userId: string, email: string, questionId: string, value: number): Promise<void> => {
  try {
    console.log('💾 Saving individual response:', { userId, questionId, value });
    
    // Save individual response to a sub-collection
    await addDoc(collection(db, 'quizResults', userId, 'responses'), {
      questionId,
      value,
      timestamp: serverTimestamp()
    });
    
    // Also update the user's basic info
    await setDoc(doc(db, 'quizResults', userId), {
      userId,
      email,
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    console.log('✅ Individual response saved successfully');
  } catch (error) {
    console.error('❌ Error saving individual response:', error);
    // Don't throw error to avoid disrupting quiz flow
  }
};

export const saveQuizResults = async (submission: QuizSubmission): Promise<void> => {
  try {
    const { responses, email, userId, userExperience } = submission;
    
    console.log('🔥 QUIZ SERVICE: Starting to save quiz results...');
    console.log('📧 Email:', email);
    console.log('🆔 User ID:', userId);
    console.log('📝 Raw responses:', responses);
    
    // Calculate scores
    const scores = calculateScores(responses);
    console.log('📊 Calculated scores:', scores);
    
    // Convert responses to QuizResponse format
    const quizResponses: QuizResponse[] = Object.entries(responses).map(([questionId, value]) => ({
      questionId,
      value,
      timestamp: new Date()
    }));
    console.log('📋 Quiz responses array:', quizResponses);

    // Create user quiz data
    const userQuizData: UserQuizData = {
      userId,
      email,
      responses: quizResponses,
      completedAt: new Date(),
      scores
    };
    console.log('📦 User quiz data to save:', userQuizData);

    // Save to Firestore under user's UID
    const docRef = doc(db, 'quizResults', userId);
    console.log('📄 Saving to document path: quizResults/' + userId);
    
    await setDoc(docRef, {
      ...userQuizData,
      completedAt: serverTimestamp(),
      responses: quizResponses // Don't use serverTimestamp() inside arrays
    });
    console.log('✅ Successfully saved to quizResults collection');

    // Also save to leads collection for marketing
    const leadData = {
      userId,
      email,
      scores,
      userExperience,
      completedAt: serverTimestamp(),
      source: 'quiz'
    };
    console.log('📈 Saving lead data:', leadData);
    
    await addDoc(collection(db, 'leads'), leadData);
    console.log('✅ Successfully saved to leads collection');

    console.log('🎉 Quiz results saved successfully to both collections!');
  } catch (error) {
    console.error('❌ Error saving quiz results:', error);
    throw error;
  }
};

export const getUserQuizResults = async (userId: string): Promise<UserQuizData | null> => {
  try {
    const docRef = doc(db, 'quizResults', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserQuizData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting quiz results:', error);
    return null;
  }
};

export const getPersonalizedInsight = (scores: UserQuizData['scores']): string => {
  const dominantCategory = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0];

  const insights = {
    holistic: "You have a natural gift for seeing the bigger picture and understanding how individual elements contribute to larger wholes. Your holistic perspective allows you to navigate complexity with wisdom and find elegant solutions that others might miss.",
    integration: "Your strength lies in connecting seemingly separate aspects of life and experience. You naturally bridge different domains of knowledge and help others see the relationships between ideas, people, and systems.",
    consciousness: "You possess a heightened awareness of the present moment and the subtle dimensions of experience. Your consciousness allows you to perceive what others might overlook and brings depth to your interactions.",
    resonance: "You have a strong connection to authentic alignment and can sense when things are in harmony or discord. Your ability to feel into the deeper patterns of life guides you toward meaningful choices and genuine expression."
  };

  return insights[dominantCategory as keyof typeof insights] || insights.holistic;
}; 