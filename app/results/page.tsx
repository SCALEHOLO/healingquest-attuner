'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserQuizResults } from '@/services/quizService';
import { UserQuizData, QuizResponse } from '@/types/quiz';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import { calculateScores } from '@/services/calculateScores';
import { analyzeHarmony } from '@/services/HarmonyEngine';
import HoloboidRadarChart from '@/components/HoloboidRadarChart';
import HarmonyInsight from '@/components/HarmonyInsight';
import { useRef } from 'react';
import emailjs from 'emailjs-com';
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
      } catch {
        setError('Failed to load your results. Please try again.');
        // Optionally keep the console.error if desired
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  // Email summary state (move all hooks to top level)
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailMsg, setEmailMsg] = useState('');
  const chartExportRef = useRef<HTMLCanvasElement>(null);

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
  quizData.responses.forEach((r: QuizResponse) => {
    responseMap[r.questionId] = r.value;
  });

  const scores = calculateScores(responseMap);
  const insightData = analyzeHarmony(scores);

  // Dynamic theming: map dominant category to Tailwind/hex color and gradient
  const CATEGORY_THEME: Record<string, { bg: string; gradient: string; color: string }> = {
    Mental: {
      bg: "bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900",
      gradient: "from-purple-400 to-indigo-500",
      color: "#7c3aed"
    },
    Emotional: {
      bg: "bg-gradient-to-br from-pink-500 via-pink-700 to-purple-900",
      gradient: "from-pink-400 to-purple-500",
      color: "#f472b6"
    },
    Physical: {
      bg: "bg-gradient-to-br from-green-400 via-green-600 to-emerald-900",
      gradient: "from-green-400 to-emerald-500",
      color: "#34d399"
    },
    Spiritual: {
      bg: "bg-gradient-to-br from-blue-400 via-blue-700 to-indigo-900",
      gradient: "from-blue-400 to-indigo-500",
      color: "#60a5fa"
    },
    Financial: {
      bg: "bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700",
      gradient: "from-yellow-300 to-yellow-500",
      color: "#facc15"
    },
    Relational: {
      bg: "bg-gradient-to-br from-red-400 via-pink-600 to-rose-900",
      gradient: "from-red-400 to-pink-500",
      color: "#f87171"
    },
    Environmental: {
      bg: "bg-gradient-to-br from-yellow-200 via-green-200 to-green-700",
      gradient: "from-yellow-200 to-green-400",
      color: "#fbbf24"
    },
    Professional: {
      bg: "bg-gradient-to-br from-indigo-400 via-indigo-700 to-gray-900",
      gradient: "from-indigo-400 to-indigo-700",
      color: "#6366f1"
    },
    Holistic: {
      bg: "bg-gradient-to-br from-cyan-400 via-cyan-700 to-blue-900",
      gradient: "from-cyan-400 to-blue-500",
      color: "#06b6d4"
    },
    Integration: {
      bg: "bg-gradient-to-br from-lime-300 via-lime-500 to-green-900",
      gradient: "from-lime-300 to-green-500",
      color: "#a3e635"
    },
    Consciousness: {
      bg: "bg-gradient-to-br from-violet-400 via-violet-700 to-indigo-900",
      gradient: "from-violet-400 to-indigo-500",
      color: "#818cf8"
    },
    Resonance: {
      bg: "bg-gradient-to-br from-rose-400 via-pink-700 to-purple-900",
      gradient: "from-rose-400 to-pink-500",
      color: "#fb7185"
    }
  };

  const dominant = insightData?.dominant
    ? insightData.dominant.charAt(0).toUpperCase() + insightData.dominant.slice(1)
    : null;
  const themeObj = dominant && CATEGORY_THEME[dominant] ? CATEGORY_THEME[dominant] : {
    bg: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900",
    gradient: "from-purple-400 to-indigo-500",
    color: "#7c3aed"
  };
  const themeColor = themeObj.color;
  const themeGradient = themeObj.gradient;
  const themeBg = themeObj.bg;

  const openEmailClient = () => {
    const subject = encodeURIComponent('Send Me My Wholeness Prompting Playbook');
    const body = encodeURIComponent(
      'Dear Judy:\n\nI just completed the HOLO HEALINGQUEST ATTUNER and now I\'d like to know how to use this attunement to dramatically increase my AI NINJA POWER to heal every aspect of my life.\n\n'
    );
    window.location.href = `mailto:Judy@healingquest.tv?subject=${subject}&body=${body}`;
  };
  return (
    <ProtectedRoute>
      <div className={`min-h-screen ${themeBg} text-white relative`}>
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
        {/* Optional symbolic overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%">
            <defs>
              <radialGradient id="thematicOverlay" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor={themeColor} stopOpacity="0.15" />
                <stop offset="100%" stopColor={themeColor} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#thematicOverlay)" />
          </svg>
        </div>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block p-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mb-4 sm:mb-6">
              <div className="bg-purple-900 rounded-full px-4 py-2 sm:px-6">
                <span className="text-xs sm:text-sm font-medium">Your Consciousness Profile</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {insightData.dominant.charAt(0).toUpperCase() + insightData.dominant.slice(1)} Attunement
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed mb-8">
              {insightData.insight}
            </p>
          </div>

          {/* Visualization */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/10">
            <div className="flex flex-col items-center justify-center">
              <HoloboidRadarChart
                scores={scores}
                highlightDominant
                exportRef={chartExportRef}
              />
              <div className="w-full mt-8">
                <HarmonyInsight
                  {...insightData}
                  theme={themeGradient}
                />
              </div>
              {/* Email summary form */}
              <div className="w-full mt-8 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">Email Me My Results</h3>
                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                  <input
                    type="email"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-black"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={sending}
                  />
                  <Button
                    onClick={async () => {
                      setSending(true);
                      setEmailStatus('idle');
                      setEmailMsg('');
                      try {
                        // Get chart image as data URL
                        let chartImg = '';
                        if (chartExportRef.current) {
                          chartImg = chartExportRef.current.toDataURL('image/png');
                        }
                        // Prepare email params
                        const params = {
                          to_email: email,
                          dominant: insightData.dominant,
                          weakest: insightData.weakest || '',
                          insight: insightData.insight,
                          chart_image: chartImg,
                          theme: insightData.theme,
                          overall_average: insightData.overall_average
                        };
                        // TODO: Replace with your EmailJS service/template/user IDs
                        const serviceId = 'YOUR_SERVICE_ID';
                        const templateId = 'YOUR_TEMPLATE_ID';
                        const userId = 'YOUR_USER_ID';
                        await emailjs.send(serviceId, templateId, params, userId);
                        setEmailStatus('success');
                        setEmailMsg('Summary sent! Check your inbox.');
                      } catch {
                        setEmailStatus('error');
                        setEmailMsg('Failed to send email. Please try again.');
                      } finally {
                        setSending(false);
                      }
                    }}
                    disabled={sending || !email}
                  >
                    {sending ? 'Sending...' : 'Send'}
                  </Button>
                </div>
                {emailStatus === 'success' && (
                  <div className="mt-2 text-green-500">{emailMsg}</div>
                )}
                {emailStatus === 'error' && (
                  <div className="mt-2 text-red-500">{emailMsg}</div>
                )}
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
