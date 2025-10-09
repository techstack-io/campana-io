"use client"

import React, { useState, useEffect } from 'react';
import { MessageSquare, FileSearch, Database, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export default function CampanaOnboarding() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState('welcome');
  const [messages, setMessages] = useState<Array<{role: string; content: string; data?: any}>>([]);
  const [currentOptions, setCurrentOptions] = useState<any[]>([]);
  const [userBehavior, setUserBehavior] = useState({ stage: 'Unknown', actions: [] as string[] });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleActionSelect = (action: any) => {
    setMessages([...messages, { role: 'user', content: action.label }]);
    setStage('processing');
    
    setUserBehavior(prev => ({
      ...prev,
      actions: [...prev.actions, action.id]
    }));
    
    setTimeout(() => {
      if (action.id === 'pinout') {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I can help you find the right pinout. Which connector are you working with?"
        }]);
        
        setCurrentOptions([
          {
            id: 'smpte_311m',
            label: 'SMPTE 311M (HD-SDI)',
            type: 'fetch_pinout',
            data: { connector: 'smpte_311m' }
          },
          {
            id: 'smpte_304m',
            label: 'SMPTE 304M (SD-SDI)',
            type: 'fetch_pinout',
            data: { connector: 'smpte_304m' }
          },
          {
            id: 'not_sure',
            label: 'Not sure - show me options',
            type: 'show_guide',
            data: { guide: 'connector_selection' }
          }
        ]);
        
        setUserBehavior(prev => ({ ...prev, stage: 'EPS (Research)' }));
        
      } else if (action.type === 'fetch_pinout') {
        const pinoutData = {
          smpte_311m: {
            name: 'SMPTE 311M HD-SDI',
            pins: [
              { num: 1, signal: 'Shield/Ground', color: 'silver' },
              { num: 2, signal: 'Center Conductor', color: 'gold' }
            ],
            voltage: '0.8V p-p',
            impedance: '75Ω'
          },
          smpte_304m: {
            name: 'SMPTE 304M SD-SDI',
            pins: [
              { num: 1, signal: 'Shield/Ground', color: 'silver' },
              { num: 2, signal: 'Center Conductor', color: 'gold' }
            ],
            voltage: '0.8V p-p',
            impedance: '75Ω'
          }
        }[action.data.connector];
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Here's the ${pinoutData?.name} pinout:`,
          data: pinoutData
        }]);
        
        setCurrentOptions([
          {
            id: 'view_guide',
            label: '📖 View Installation Guide',
            type: 'show_guide',
            data: { guide: action.data.connector }
          },
          {
            id: 'compare',
            label: '⚖️ Compare with other connectors',
            type: 'compare',
            data: { base: action.data.connector }
          },
          {
            id: 'quiz',
            label: '✅ Test my knowledge',
            type: 'quiz',
            data: { topic: action.data.connector }
          }
        ]);
        
        setUserBehavior(prev => ({ ...prev, stage: 'LPS (Learning)' }));
        
      } else if (action.id === 'research') {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "What technical topic interests you?"
        }]);
        
        setCurrentOptions([
          { id: 'smpte_st2110', label: 'SMPTE ST 2110 Standards', type: 'research_topic' },
          { id: 'fiber_optics', label: 'Fiber Optic Transmission', type: 'research_topic' },
          { id: 'signal_integrity', label: 'Signal Integrity Best Practices', type: 'research_topic' }
        ]);
        
        setUserBehavior(prev => ({ ...prev, stage: 'EPS (Exploring)' }));
        
      } else if (action.id === 'spec') {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I'll help you analyze a spec sheet. Upload or paste the specifications, and I'll identify key requirements and compatibility."
        }]);
        
        setCurrentOptions([
          { id: 'upload', label: '📤 Upload spec sheet', type: 'upload' },
          { id: 'paste', label: '📋 Paste specifications', type: 'paste' }
        ]);
        
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: action.response || "How else can I assist you today?"
        }]);
        setCurrentOptions([]);
      }
      
      setStage('continue');
    }, 1000);
  };

  const initialActions = [
    {
      id: 'pinout',
      label: 'View a pinout',
      icon: Database,
      color: 'bg-teal-500'
    },
    {
      id: 'research',
      label: 'Research a topic',
      icon: FileSearch,
      color: 'bg-green-600'
    },
    {
      id: 'spec',
      label: 'Evaluate a spec sheet',
      icon: MessageSquare,
      color: 'bg-amber-500'
    },
    {
      id: 'other',
      label: 'Something else',
      icon: Zap,
      color: 'bg-emerald-500',
      response: 'Tell me more about what you\'re working on!'
    }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
              <span className="text-white text-xl">🎓</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              Campana
            </h1>
          </div>
          <p className="text-slate-600 uppercase tracking-wider text-sm">Learn Smarter</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                {stage === 'welcome' && (
                  <div className="flex items-start gap-3 animate-fade-in">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                      C
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl rounded-tl-sm p-4">
                        <p className="text-slate-800 font-medium mb-2">
                          Welcome! Let's get started.
                        </p>
                        <p className="text-slate-600">
                          What can I help you with today?
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div key={idx}>
                    <div
                      className={`flex items-start gap-3 ${
                        msg.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-slate-600 to-slate-700'
                            : 'bg-green-600'
                        }`}
                      >
                        {msg.role === 'user' ? 'U' : 'C'}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`rounded-2xl p-4 ${
                            msg.role === 'user'
                              ? 'bg-slate-100 rounded-tr-sm'
                              : 'bg-gradient-to-br from-green-50 to-teal-50 rounded-tl-sm'
                          }`}
                        >
                          <p className="text-slate-800">{msg.content}</p>
                          
                          {msg.data && (
                            <div className="mt-4 border-t border-green-200 pt-4">
                              <div className="bg-white rounded-lg p-4 border border-green-200">
                                <h4 className="font-bold text-green-700 mb-3">{msg.data.name}</h4>
                                <div className="space-y-2">
                                  {msg.data.pins.map((pin: any, i: number) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                      <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                                        {pin.num}
                                      </span>
                                      <span className="font-medium">{pin.signal}</span>
                                      <span className="text-slate-500">({pin.color})</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200 text-sm space-y-1">
                                  <div><strong>Voltage:</strong> {msg.data.voltage}</div>
                                  <div><strong>Impedance:</strong> {msg.data.impedance}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {stage === 'processing' && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                      C
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl rounded-tl-sm p-4">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {(stage === 'welcome' || stage === 'continue') && (
                <div className="border-t border-slate-200 p-6 bg-slate-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(currentOptions.length > 0 ? currentOptions : initialActions).map((action) => {
                      const Icon = action.icon || CheckCircle;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleActionSelect(action)}
                          className="group relative flex items-center gap-3 p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all duration-200"
                        >
                          <div className={`w-10 h-10 ${action.color || 'bg-green-600'} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-slate-800 group-hover:text-green-600 transition-colors">
                              {action.label}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Agent Behavior
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Behavioral Stage</div>
                  <div className="text-sm font-medium text-green-700">{userBehavior.stage}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Actions Tracked</div>
                  <div className="text-sm text-slate-700">{userBehavior.actions.length} interactions</div>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <div className="text-xs text-slate-500 mb-2">Recent Activity:</div>
                  <div className="space-y-1">
                    {userBehavior.actions.slice(-3).map((action, i) => (
                      <div key={i} className="text-xs bg-green-50 rounded px-2 py-1 text-green-700">
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-bold text-green-800 mb-2">🤖 What Makes This Agentic?</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Agent decides next steps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Fetches structured data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Tracks user behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Suggests relevant actions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {stage !== 'welcome' && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setStage('welcome');
                setMessages([]);
                setCurrentOptions([]);
                setUserBehavior({ stage: 'Unknown', actions: [] });
              }}
              className="text-sm text-slate-600 hover:text-slate-800 underline"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
