'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserQuizResults, getPersonalizedInsight } from '@/services/quizService';
import { UserQuizData, categoryDescriptions } from '@/data/quizQuestions';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
export default function ResultsPage() {
  const [quizData, setQuizData] = useState<UserQuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     router.push('/'); // Redirect to landing page
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };

  useEffect(() => {
    const fetchResults = async () => {
      if (!user) return;
      
      try {
        const data = await getUserQuizResults(user.uid);
        if (data) {
          setQuizData(data);
        } else {
          setError('No quiz results found. Please take the assessment first.');
        }
      } catch (err) {
        setError('Failed to load your results. Please try again.');
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-sm sm:text-base">Loading your consciousness profile...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !quizData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
          <div className="text-center text-white">
            <p className="text-lg sm:text-xl mb-4">{error}</p>
            <Link
              href="/quiz"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold rounded-full hover:from-cyan-300 hover:to-purple-300 transition-all"
            >
              Take Assessment
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const { scores } = quizData;
  const insight = getPersonalizedInsight(scores);
  const dominantCategory = Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
  )[0];

  const categoryColors = {
    holistic: 'from-cyan-400 to-blue-500',
    integration: 'from-purple-400 to-pink-500',
    consciousness: 'from-pink-400 to-red-500',
    resonance: 'from-yellow-400 to-orange-500'
  };
  const openEmailClient = () => {
    const subject = encodeURIComponent('Send Me My Conscious Prompting Playbook');
    const body = encodeURIComponent(
      'Dear Brooks:\n\nI just completed the HOLO ATTUNER and now I\'d like to know how to use this attunement to dramatically increase my AI NINJA POWER.\n\n'
    );
    window.location.href = `mailto:brooks@teamholo.com?subject=${subject}&body=${body}`;
  };
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src="/assets/1.svg"
                  alt="ATTUNER.ai Logo"
                  width={32}
                  height={32}
                  className="rounded-lg w-[150px] h-[60px] object-cover"
                />
                {/* <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  ATTUNER.ai
                </h1> */}
              </div>
              <Link
                href="/"
                className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block p-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-4 sm:mb-6">
              <div className="bg-purple-900 rounded-full px-4 py-2 sm:px-6">
                <span className="text-xs sm:text-sm font-medium">Your Consciousness Profile</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
              <span className={`bg-gradient-to-r ${categoryColors[dominantCategory as keyof typeof categoryColors]} bg-clip-text text-transparent`}>
                {dominantCategory.charAt(0).toUpperCase() + dominantCategory.slice(1)} Attunement
              </span>
            </h1>
            
            <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed mb-8">
              {insight}
            </p>
            
            {/* Top Logout Button - COMMENTED OUT */}
            {/*
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 mb-4 border border-orange-500/20 max-w-lg mx-auto">
              <p className="text-orange-300 text-sm font-medium mb-3">
                📋 Important: Please log out when finished
              </p>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-white font-semibold rounded-full text-sm sm:text-base hover:from-red-500/30 hover:to-pink-500/30 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/25 border border-red-500/30 hover:border-red-500/50 touch-manipulation"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout & Return to Landing Page
              </button>
            </div>
            */}
          </div>

          {/* Visualization */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/10">
            {/* <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Your HOLO Dimensions</h2> */}
            
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Radar Chart Visualization */}
              <div className="flex flex-col items-center justify-center order-2 lg:order-1">
              <Image
                  src="/assets/1.svg"
                  alt="ATTUNER.ai Logo"
                  width={32}
                  height={32}
                  className="rounded-lg w-[150px] h-[50px] object-cover mb-10" 
                />
                <div className="relative w-full h-80  sm:h-80">
                  {/* <Image
                      src="/assets/9.svg"
                      alt="ATTUNER.ai Logo"
                      width={32}
                      height={32}
                      className="rounded-lg w-[280px] h-[280px] object-cover absolute top-[50%] left-[50%] !translate-x-[-50%] !translate-y-[-50%]" 
                    /> */}
                    <Image
                      src="/signal.svg"
                      alt="ATTUNER.ai Logo"
                      width={32}
                      height={32}
                      className="rounded-lg w-full max-w-[500px] h-[400px] object-contain absolute top-[50%] left-[50%] !translate-x-[-50%] !translate-y-[-50%]" 
                    />
                  {/* Outer rings */}
                  {/* <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                  <div className="absolute inset-6 sm:inset-8 border border-white/10 rounded-full"></div>
                  <div className="absolute inset-12 sm:inset-16 border border-white/10 rounded-full"></div>
                  <div className="absolute inset-18 sm:inset-24 border border-white/10 rounded-full"></div> */}
                  
                  {/* Cross lines */}
                  {/* <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-px bg-white/10"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-px bg-white/10"></div>
                  </div> */}
                  
                  {/* Score indicators */}
                  {/* {Object.entries(scores).map(([category, score], index) => {
                    const angle = (index * 90) - 90; // Start from top, go clockwise
                    const maxRadius = window.innerWidth < 640 ? 110 : 140; // Smaller radius on mobile
                    const radius = (score / 5) * maxRadius;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    
                    return (
                      <div
                        key={category}
                        className="absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full transform -translate-x-1.5 -translate-y-1.5 sm:-translate-x-2 sm:-translate-y-2"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          background: `linear-gradient(to right, ${categoryColors[category as keyof typeof categoryColors].split(' ')[1]}, ${categoryColors[category as keyof typeof categoryColors].split(' ')[3]})`
                        }}
                      />
                    );
                  })} */}
                  
                  {/* Category labels */}
                  {/* <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-medium">
                    Holistic
                  </div>
                  <div className="absolute top-1/2 -right-12 sm:-right-16 transform -translate-y-1/2 text-xs sm:text-sm font-medium">
                    Integration
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-medium">
                    Consciousness
                  </div>
                  <div className="absolute top-1/2 -left-12 sm:-left-16 transform -translate-y-1/2 text-xs sm:text-sm font-medium">
                    Resonance
                  </div> */}
                </div>
              </div>

              {/* Scores List */}
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                {Object.entries(scores).map(([category, score]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base sm:text-lg font-semibold capitalize">{category}</h3>
                      <span className="text-xl sm:text-2xl font-bold">{score.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 sm:h-3">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} transition-all duration-1000`}
                        style={{ width: `${(score / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Insights */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Your Strengths</h3>
              <div className="space-y-3">
                {Object.entries(scores)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 2)
                  .map(([category, score]) => (
                    <div key={category} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]}`} />
                      <span className="capitalize font-medium text-sm sm:text-base">{category}</span>
                      <span className="text-gray-400 text-xs sm:text-sm">({score.toFixed(1)}/5)</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Growth Opportunities</h3>
              <div className="space-y-3">
                {Object.entries(scores)
                  .sort(([,a], [,b]) => a - b)
                  .slice(0, 2)
                  .map(([category, score]) => (
                    <div key={category} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]}`} />
                      <span className="capitalize font-medium text-sm sm:text-base">{category}</span>
                      <span className="text-gray-400 text-xs sm:text-sm">({score.toFixed(1)}/5)</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button
                    onClick={openEmailClient}
                    disabled={false}
                    className="inline-flex items-center "
                  >
                    {false ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black mr-2"></div>
                        Analyzing Your Responses...
                      </>
                    ) : (
                      <>

                        <span className='max-w-[350px] !text-[20px] sm:!text-[30px] relative' style={{ lineHeight: 1.1 }}>
                          {/* <span className='text-[30px] absolute left-[-30px] top-[50%] translate-y-[-50%]'>🔮</span> */}
                          Get Your Free Wholeness Prompting Playbook
                        </span>
                        {/* <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg> */}
                      </>
                    )}
                  </Button>
          </div>

                              {/* Logout Section - COMMENTED OUT */}
          {/* 
          <div className="text-center">
            <div className="bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 mb-4 border border-orange-500/20">
                <p className="text-orange-300 text-sm sm:text-base font-medium mb-2">
                  📋 Important: Please log out when finished
                </p>
                <p className="text-orange-200 text-xs sm:text-sm">
                  This allows the next participant to start fresh with their own assessment
                </p>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-red-500/20 hover:bg-red-500/30 text-white border border-red-500/30 hover:border-red-500/50"
              >
                <div className="inline-flex items-center">
                  <svg className="mr-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout & Return to Landing Page
                </div>
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                This will log you out and return you to the main page
              </p>
            </div>
          </div>
          */}
        </main>
      </div>
    </ProtectedRoute>
  );
} 