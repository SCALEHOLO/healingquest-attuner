"use client";

import { useEffect, useState } from "react";
import { UserQuizData, QuizResponse } from "@/types/quiz";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";
import { calculateScores } from "@/services/calculateScores";
import { analyzeHarmony } from "@/services/HarmonyEngine";
import HoloboidRadarChart from "@/components/HoloboidRadarChart";
import { useRef } from "react";

export default function ResultsPage() {
  const [quizData, setQuizData] = useState<UserQuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const storedData = localStorage.getItem("attuner_quiz_data");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("Retrieved quiz data from localStorage:", parsedData);

          const userQuizData: UserQuizData = {
            userId: parsedData.userId,
            email: parsedData.email,
            responses: parsedData.responses,
            completedAt: new Date(parsedData.completedAt),
            scores: {},
          };

          setQuizData(userQuizData);
        } else {
          setError("No quiz results found. Please take the assessment first.");
        }
      } catch (err) {
        console.error("Error reading quiz data from localStorage:", err);
        setError("Failed to load your results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const chartExportRef = useRef<HTMLCanvasElement>(null);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-sm sm:text-base">
              Loading your consciousness profile...
            </p>
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

  // Mock data for the exact design from first image
  const mockScores = {
    Mental: 8.5,
    Environmental: 7.0,
    Relational: 6.5,
    Financial: 5.5,
    Spiritual: 8.0,
    Physical: 7.5,
    Emotional: 8.0,
    Professional: 9.0,
  };

  // Calculate the 4 main scores for the cards - using exact values from first image
  const holisticScore = 5.0;
  const integrationScore = 4.5;
  const consciousnessScore = 4.5;
  const resonanceScore = 5.0;

  const openEmailClient = () => {
    const subject = encodeURIComponent(
      "Send Me My Wholeness Prompting Playbook"
    );
    const body = encodeURIComponent(
      "Dear Judy:\n\nI just completed the HOLO HEALINGQUEST ATTUNER and now I'd like to know how to use this attunement to dramatically increase my AI NINJA POWER to heal every aspect of my life.\n\n"
    );
    window.location.href = `mailto:Judy@healingquest.tv?subject=${subject}&body=${body}`;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900 text-white">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src="/healingQuest/ATTUNERHEADERlOGO.png"
                  alt="HOLO HEALING QUEST Logo"
                  width={150}
                  height={60}
                  className="rounded-lg object-cover"
                />
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

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            {/* Your Consciousness Profile Button */}
            <div className="inline-block mb-6">
              <div className="bg-black/20 border border-purple-400/90 rounded-full px-6 py-3 shadow-lg">
                <span className="text-white font-medium text-sm">
                  Your Consciousness Profile
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-orange-400">
              Resonance Attunement
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              You have a strong connection to authentic alignment and can sense
              when things are in harmony or discord. Your ability to feel into
              the deeper patterns of life guides you toward meaningful choices
              and genuine expression.
            </p>
          </div>

          {/* Core Data Section - Large Dark Container */}
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-700/50">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"> */}
              {/* Left Side - Radar Chart */}
              {/* <div className="flex justify-center order-2 lg:order-1 items-center">
                <div className="relative z-10 w-full max-w-md">
                  <HoloboidRadarChart
                    scores={mockScores}
                    exportRef={chartExportRef}
                    useBackgroundImage={true}
                    backgroundImage="/assets/rainbow-bg.svg"
                  />
                </div>
              </div> */}
              <div className="flex justify-center order-2 lg:order-1 items-center">
                <div className="relative z-10 w-full max-w-md">
                  <img
                    src="/assets/rainbow-bg.svg"
                    alt="Radar Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="relative z-10 w-full h-full">
                    <HoloboidRadarChart
                      scores={mockScores}
                      exportRef={chartExportRef}
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Score Cards */}
              <div className="order-1 lg:order-2">
                {/* Holistic */}
                <div className="rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-base sm:text-lg">
                      Holistic
                    </h3>
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      {holisticScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${(holisticScore / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm mt-3">
                    Holistic Thinking - Your ability to see and work with whole
                    systems
                  </p>
                </div>

                {/* Integration */}
                <div className="rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-base sm:text-lg">
                      Integration
                    </h3>
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      {integrationScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${(integrationScore / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm mt-3">
                    Integration - How you connect different aspects of
                    experience
                  </p>
                </div>

                {/* Consciousness */}
                <div className="rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-base sm:text-lg">
                      Consciousness
                    </h3>
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      {consciousnessScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${(consciousnessScore / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm mt-3">
                    Consciousness - Your level of present-moment awareness
                  </p>
                </div>

                {/* Resonance */}
                <div className="rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-bold text-base sm:text-lg">
                      Resonance
                    </h3>
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      {resonanceScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full"
                      style={{ width: `${(resonanceScore / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm mt-3">
                    Resonance - Your alignment with deeper patterns and values
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths and Growth Opportunities Section */}
          <div className="mb-6 sm:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Side - Your Strengths */}
              <div className="bg-black/20 p-[18px] rounded-2xl">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                  Your Strengths
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                    <span className="text-white text-sm sm:text-base">
                      Holistic ({holisticScore.toFixed(1)}/5)
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-2 sm:mr-3"></div>
                    <span className="text-white text-sm sm:text-base">
                      Resonance ({resonanceScore.toFixed(1)}/5)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right Side - Growth Opportunities */}
              <div className="bg-black/20 p-[18px] rounded-2xl">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-3 sm:mb-4">
                  Growth Opportunities
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-pink-500 rounded-full mr-2 sm:mr-3"></div>
                    <span className="text-white text-sm sm:text-base">
                      Integration ({integrationScore.toFixed(1)}/5)
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2 sm:mr-3"></div>
                    <span className="text-white text-sm sm:text-base">
                      Consciousness ({consciousnessScore.toFixed(1)}/5)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="text-center">
            <Button
              onClick={openEmailClient}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg"
            >
              <div className="flex flex-col">
                <span>Get Your Free</span>
                <span>Wholeness Prompting Playbook</span>
              </div>
            </Button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
