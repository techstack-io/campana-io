"use client"

import React, { useState, useEffect } from 'react';
import { BookOpen, Target, FileText, Zap, TrendingUp } from 'lucide-react';

export default function CampanaDualLayout() {
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState('first_time');
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tools = [
    { id: 'pinout', icon: '📋', label: 'View a pinout', color: 'cyan' },
    { id: 'research', icon: '🔬', label: 'Research a topic', color: 'green' },
    { id: 'spec', icon: '📄', label: 'Evaluate a spec sheet', color: 'orange' },
    { id: 'else', icon: '⚡', label: 'Something else', color: 'green' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-left gap-3 mb-4">
          <div className="w-14 h-14 bg-white-600 rounded-xl flex items-center justify-center">
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Pathfinder (Learning Journey) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Pathfinder</h2>
            <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">AI-Guided</span>
          </div>

          {/* User Type Toggle */}
          <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-3">
              👤 Viewing as user "Claude":
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => mounted && setUserType('first_time')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  userType === 'first_time'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="font-bold mb-1">First Time</div>
                <div className="text-xs opacity-90">Just signed up</div>
              </button>
              <button
                onClick={() => mounted && setUserType('returning')}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  userType === 'returning'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="font-bold mb-1">Returning</div>
                <div className="text-xs opacity-90">30 days, 45 uses</div>
              </button>
            </div>
          </div>

          {/* First Time Experience */}
          {userType === 'first_time' && (
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    C
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to Campana, Claude! 👋</h3>
                    <p className="text-gray-700 mb-2">
                      I'm your AI learning assistant. I'll help you master video technology through personalized guidance.
                    </p>
                    <p className="text-gray-700">
                      Let me ask you a few quick questions so I can create the perfect learning path for you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Question 1 */}
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-sm">
                    1
                  </div>
                  <p className="font-semibold text-gray-900">
                    What's your experience level with broadcast video technology?
                  </p>
                </div>
                <div className="space-y-2 ml-11">
                  <button className="w-full p-3 border-2 border-gray-200 rounded-lg text-left hover:border-green-500 hover:bg-green-50 transition-all">
                    <div className="font-medium">Complete beginner</div>
                    <div className="text-sm text-gray-600">I'm just starting out</div>
                  </button>
                  <button className="w-full p-3 border-2 border-gray-200 rounded-lg text-left hover:border-green-500 hover:bg-green-50 transition-all">
                    <div className="font-medium">Some experience</div>
                    <div className="text-sm text-gray-600">I know the basics</div>
                  </button>
                  <button className="w-full p-3 border-2 border-gray-200 rounded-lg text-left hover:border-green-500 hover:bg-green-50 transition-all">
                    <div className="font-medium">Professional</div>
                    <div className="text-sm text-gray-600">I work in the industry</div>
                  </button>
                </div>
              </div>

              {/* Locked Questions */}
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm opacity-50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">What's your goal with Campana?</p>
                    <p className="text-sm text-gray-500 mt-2">🔒 Answer question 1 first</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Returning User Experience */}
          {userType === 'returning' && (
            <div className="space-y-4">
              {/* Welcome Back */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    C
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome back, Claude! 🎉</h3>
                    <p className="text-gray-700 mb-2">
                      You're making great progress! You're 60% through the SDI Fundamentals course.
                    </p>
                    <p className="text-gray-700">
                      Ready to continue where you left off?
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Learning */}
              <div className="bg-white rounded-lg p-6 border-2 border-blue-200 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">Continue: SDI Cable Standards</h4>
                    <p className="text-gray-600 mb-4 text-sm">
                      Last time you learned about SMPTE 311M. Ready to explore cable selection?
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">60%</span>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all w-full">
                      Continue Learning →
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Your Progress
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">45</div>
                    <div className="text-xs text-gray-600 mt-1">Sessions</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-xs text-gray-600 mt-1">Courses</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-xs text-gray-600 mt-1">Topics</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pathfinder Info */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-lg">🧭</span>
              <div className="text-purple-900">
                <strong>Pathfinder:</strong> AI-powered personalized learning journey. The agent analyzes your background and creates a custom path just for you.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Tools */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-6 h-6 text-cyan-600" />
            <h2 className="text-2xl font-bold text-gray-900">Quick Tools</h2>
          </div>

          {/* Agent Message */}
          <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                C
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium mb-2">Welcome! Let's get started.</p>
                <p className="text-gray-600">What can I help you with today?</p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => mounted && setSelectedTool(tool.id)}
                className={`bg-white p-5 rounded-lg shadow-sm border-2 transition-all hover:shadow-md hover:scale-105 ${
                  selectedTool === tool.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-${tool.color}-100`}>
                      {tool.icon}
                    </div>
                    <span className="text-gray-900 font-medium text-lg">{tool.label}</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Tools Info */}
          <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <div className="text-cyan-900">
                <strong>Quick Tools:</strong> Jump straight to what you need without any questions. Perfect for experienced users who know exactly what they're looking for.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}