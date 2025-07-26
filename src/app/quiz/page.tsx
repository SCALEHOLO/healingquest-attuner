'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { quizQuestions, scaleLabels } from '@/data/quizQuestions';
import { saveQuizResults, saveIndividualResponse } from '@/services/quizService';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/Button';
import Image from 'next/image';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userExperience, setUserExperience] = useState('');
  const [isUserExperienceSubmitted, setIsUserExperienceSubmitted] = useState(false);
  const [responses, setResponses] = useState<{ [questionId: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    // try {
    //   await logout();
    //   router.push('/');
    // } catch (error) {
    //   console.error('Error logging out:', error);
    // }
  };

  const handleResponse = async (value: number) => {
    const questionId = quizQuestions[currentQuestion].id;
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);

    console.log('📝 Response recorded:', { questionId, value });
    console.log('📊 Current responses:', newResponses);
    console.log('🔢 Total responses:', Object.keys(newResponses).length);

    // Save individual response immediately
    // if (user) {
    //   await saveIndividualResponse(user.uid, user.email!, questionId, value);
    // }

    // Check if this completes the quiz
    const isQuizComplete = Object.keys(newResponses).length === quizQuestions.length;
    console.log('✅ Quiz complete?', isQuizComplete);

    // No auto-advance - user must click Next button
  };

  const handleNext = () => {
    const currentQuestionId = quizQuestions[currentQuestion].id;
    const hasAnswered = responses[currentQuestionId] !== undefined;

    if (hasAnswered && currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    setError('');

    console.log('🔥 Starting quiz submission...');
    console.log('User ID:', user.uid);
    console.log('User Email:', user.email);
    console.log('Responses:', responses);
    console.log('Number of responses:', Object.keys(responses).length);

    try {
      await saveQuizResults({
        responses,
        email: user.email!,
        userId: user.uid,
        userExperience
      });

      console.log('✅ Quiz results saved successfully!');
      router.push('/results');
    } catch (err: unknown) {
      console.error('❌ Error saving quiz:', err);
      setError('Failed to save your responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isComplete = Object.keys(responses).length === quizQuestions.length;
  const progress = isComplete ? 100 : ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Debug: Show which questions are missing
  useEffect(() => {
    const answeredQuestions = Object.keys(responses);
    const missingQuestions = quizQuestions.filter(q => !answeredQuestions.includes(q.id));
    if (missingQuestions.length > 0) {
      console.log('🔍 Missing questions:', missingQuestions.map(q => q.id));
      console.log('📝 Answered questions:', answeredQuestions);
      console.log('🎯 Current question:', quizQuestions[currentQuestion]?.id);
    }
  }, [responses, currentQuestion]);

  return (
    // <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src="/healingQuest/ATTUNERHEADERlOGO.png"
                  alt="ATTUNER.ai Logo"
                  width={300}
                  height={300}
                  className="rounded-lg w-[150px] h-[60px] object-cover"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-xs sm:text-sm text-gray-300">
                  {isComplete ? (
                    <span className="text-cyan-400 font-semibold">✅ Complete!</span>
                  ) : (
                    `Question ${currentQuestion + 1} of ${quizQuestions.length}`
                  )}
                </div>

                {/* <button
                    onClick={handleLogout}
                    className="bg-red-500/20 hover:bg-red-500/30 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all backdrop-blur-sm border border-red-500/30 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/25"
                  >
                    Logout
                  </button> */}
                <button
                  onClick={handleLogout}
                  className="inline-block rounded-full px-5 py-2 text-lg text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#b57e03] via-yellow-400 to-[#b57e03] shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:brightness-110  text-[25px] font-bold w-max"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-black/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quiz Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {!isComplete ? (
            <div className="text-center">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 max-w-2xl mx-auto">
                <div className="mb-6 sm:mb-8">
                  <div className="inline-block p-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-4">
                    <div className="bg-purple-900 rounded-full px-3 py-1 sm:px-4">
                      <span className="text-xs sm:text-sm font-medium">
                        {quizQuestions[currentQuestion].category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                    {quizQuestions[currentQuestion].question}
                  </h2>

                  {quizQuestions[currentQuestion].description && (
                    <p className="text-gray-300 text-base sm:text-lg">
                      {quizQuestions[currentQuestion].description}
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {scaleLabels.map((label, index) => {
                    const value = index + 1;
                    const isSelected = responses[quizQuestions[currentQuestion].id] === value;

                    return (
                      <button
                        key={index}
                        onClick={() => handleResponse(value)}
                        className={`w-full p-4 sm:p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation ${isSelected
                          ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                          : 'border-white/20 hover:border-white/40 hover:bg-white/5 active:bg-white/10'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-left text-sm sm:text-base font-medium">{label}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs sm:text-sm text-gray-400 font-medium">{value}</span>
                            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${isSelected
                              ? 'border-cyan-400 bg-cyan-400'
                              : 'border-white/40'
                              }`}>
                              {isSelected && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Helper text */}
                {!responses[quizQuestions[currentQuestion].id] && (
                  <div className="mt-4 text-center">
                    <p className="text-yellow-400 text-sm">
                      👆 Please select an answer to continue
                    </p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6 sm:mt-8">
                  <button
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 sm:px-6 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all text-sm sm:text-base"
                  >
                    Previous
                  </button>

                  <div className="flex space-x-1 sm:space-x-2">
                    {quizQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentQuestion
                          ? 'bg-cyan-400'
                          : responses[quizQuestions[index].id]
                            ? 'bg-purple-400'
                            : 'bg-white/20'
                          }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentQuestion === quizQuestions.length - 1 || !responses[quizQuestions[currentQuestion].id]}
                    className="px-4 py-2 sm:px-6 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all text-sm sm:text-base"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
                {isUserExperienceSubmitted? 
                  <div className="text-center animate-fade-in">
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 max-w-2xl mx-auto">
                      <div className="mb-6 sm:mb-8">
                        {/* Success Animation */}
                        <div className="relative mx-auto mb-6 flex justify-center">
                          {/* <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
                              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div> */}
                          {/* <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-full mx-auto animate-ping"></div> */}
                          <Image
                            src="/assets/9.svg"
                            alt="ATTUNER.ai Logo"
                            width={32}
                            height={32}
                            className="rounded-lg w-[150px] h-[150px] object-cover"
                          />
                        </div>
                        <div className='flex items-center justify-center mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold'>
                          <span className=''>🎉</span>
                          <h2 className="  bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text !text-[20px] text-transparent sm:text-3xl">
                            Assessment Complete!
                          </h2>
                        </div>

                        <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
                          Congratulations! You&apos;ve completed all <strong>8 questions</strong> of your consciousness profile assessment.
                        </p>

                        <div className="bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-lg p-4 mb-6 sm:mb-8 border border-cyan-400/20">
                          <p className="text-cyan-300 text-sm sm:text-base">
                            ✨ Your unique HOLO attunement pattern is ready to be revealed
                          </p>
                        </div>
                      </div>

                      {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-red-400 text-sm sm:text-base">{error}</p>
                        </div>
                      )}

                      <div className="space-y-4">
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="inline-flex items-center "
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black mr-2"></div>
                              Analyzing Your Responses...
                            </>
                          ) : (
                            <>

                              <span className='max-w-[200px] sm:max-w-[260px] !text-[20px] sm:!text-[30px] relative' style={{ lineHeight: 1.1 }}>
                                <span className='text-[30px] absolute left-[-30px] top-[50%] translate-y-[-50%]'>🔮</span>
                                Reveal My Wholeness Profile
                              </span>
                              {/* <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg> */}
                            </>
                          )}
                        </Button>

                        <p className="text-xs sm:text-sm text-white mb-6">
                          This will take you to your personalized results page
                        </p>

                        {/* Logout Button - COMMENTED OUT */}
                        {/*
                          <div className="border-t border-white/10 pt-6">
                            <Button
                              onClick={handleLogout}
                              className="bg-red-500/20 hover:bg-red-500/30 text-white border border-red-500/30 hover:border-red-500/50"
                            >
                              Logout
                            </Button>
                          </div>
                          */}
                      </div>
                    </div>
                  </div>
                  :
                  <div className="text-center">
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 max-w-2xl mx-auto">
                      <div className="mb-6 sm:mb-8">
                        <div className="inline-block p-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-4">
                          <div className="bg-purple-900 rounded-full px-3 py-1 sm:px-4">
                            <span className="text-xs sm:text-sm font-medium">
                              Experience
                            </span>
                          </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                            Please describe the most powerful experience you have had with AI.
                        </h2>

                        {/* {quizQuestions[currentQuestion].description && ( */}
                          <p className="text-gray-300 text-base sm:text-lg">
                            Take as much space as you like
                          </p>
                        {/* )} */}
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        {/* {scaleLabels.map((label, index) => {
                          const value = index + 1;
                          const isSelected = responses[quizQuestions[currentQuestion].id] === value;

                          return ( */}
                            <textarea
                              // key={index}
                              onChange={(e) => setUserExperience(e?.target?.value ?? "")}
                              className={`w-full p-4 sm:p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation h-[200px] ${true
                                ? 'border-cyan-400 bg-cyan-400/10 text-white'
                                : 'border-white/20 hover:border-white/40 hover:bg-white/5 active:bg-white/10'
                                }`}
                            >
                              {/* <div className="flex items-center justify-between">
                                <span className="text-left text-sm sm:text-base font-medium">{label}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs sm:text-sm text-gray-400 font-medium">{value}</span>
                                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${isSelected
                                    ? 'border-cyan-400 bg-cyan-400'
                                    : 'border-white/40'
                                    }`}>
                                    {isSelected && (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div> */}
                            </textarea>
                          {/* );
                        })} */}
                      </div>

                      
                      {/* Navigation */}
                      <div className="flex justify-between items-center mt-6 sm:mt-8">
                        <button
                          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                          disabled={currentQuestion === 0}
                          className="px-4 py-2 sm:px-6 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all text-sm sm:text-base"
                        >
                          Previous
                        </button>


                        <button
                          // onClick={handleNext}
                          // disabled={currentQuestion === quizQuestions.length - 1 || !responses[quizQuestions[currentQuestion].id]}
                          onClick={()=> setIsUserExperienceSubmitted(true)}
                          className="inline-block rounded-full px-10 py-4 text-lg text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#b57e03] via-yellow-400 to-[#b57e03] shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:brightness-110  text-[25px] font-bold w-max"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                }
            </>
          )}
        </main>
      </div>
    // </ProtectedRoute>
  );
} 