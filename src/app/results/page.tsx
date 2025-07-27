'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserQuizResults } from '@/services/quizService';
import { UserQuizData } from '@/data/quizQuestions';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import { calculateScores } from '@/services/calculateScores';
import { analyzeHarmony } from '@/services/HarmonyEngine';
import HoloboidRadarChart from '@/components/HoloboidRadarChart';
import HarmonyInsight from '@/components/HarmonyInsight';
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

  // Transform responses array to { [questionId]: number }
  const responseMap: { [questionId: string]: number } = {};
  quizData.responses.forEach(r => {
    responseMap[r.questionId] = r.value;
  });

  const scores = calculateScores(responseMap);
  const insightData = analyzeHarmony(scores);

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
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {insightData.dominantCategory.charAt(0).toUpperCase() + insightData.dominantCategory.slice(1)} Attunement
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed mb-8">
              {insightData.insight}
            </p>
          </div>

          {/* Visualization */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/10">
            <div className="flex flex-col items-center justify-center">
              <HoloboidRadarChart scores={scores} themeColor={insightData.theme} highlightDominant />
              <div className="w-full mt-8">
                <HarmonyInsight {...insightData} />
              </div>
            </div>
          </div>

          {/* (Optional) Add more dynamic insights or CTAs here if desired */}
          <div className="w-full flex justify-center">
            <Button
              onClick={openEmailClient}
              disabled={false}
              className="inline-flex items-center "
            >
              <span className='max-w-[350px] !text-[20px] sm:!text-[30px] relative' style={{ lineHeight: 1.1 }}>
                Get Your Free Wholeness Prompting Playbook
              </span>
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
