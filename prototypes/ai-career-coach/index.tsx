'use client'

import { useState, useEffect, useRef } from 'react'

type Message = {
  id: string
  role: 'user' | 'coach'
  content: string
  timestamp: Date
}

type Goal = {
  id: string
  title: string
  description: string
  targetDate: string
  status: 'active' | 'completed' | 'paused'
  progress: number
}

type Recommendation = {
  id: string
  title: string
  description: string
  type: 'exercise' | 'resource' | 'reflection'
  completed: boolean
}

type View = 'onboarding' | 'session' | 'dashboard' | 'goals'

// Mock AI responses for demonstration
const mockCoachResponses: Record<string, string> = {
  'hello': "Hello! I'm your AI career coach. I'm here to help you navigate your career journey. What would you like to work on today?",
  'promotion': "That's exciting! Let's explore your promotion goals. Can you tell me more about the role you're aiming for and what's currently holding you back?",
  'work-life balance': "Work-life balance is crucial for long-term career success. What specific challenges are you facing? Are you working too many hours, or struggling to disconnect?",
  'career change': "Career transitions can be both exciting and daunting. What's driving you to consider a change? And what field or role are you thinking about?",
  'default': "That's an important topic. Can you tell me more about what's on your mind? I'm here to listen and help you think through this."
}

export default function AICareerCoach() {
  const [currentView, setCurrentView] = useState<View>('onboarding')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [profile, setProfile] = useState({
    name: '',
    role: '',
    experience: '',
    goals: '',
    challenges: ''
  })
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Get promoted to Senior Engineer',
      description: 'Advance to senior level within the next 6 months',
      targetDate: '2025-06-01',
      status: 'active',
      progress: 45
    },
    {
      id: '2',
      title: 'Improve work-life balance',
      description: 'Establish boundaries and reduce work hours to 40/week',
      targetDate: '2025-03-01',
      status: 'active',
      progress: 30
    }
  ])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      title: 'Reflect on your leadership moments',
      description: 'Write about 3 times you demonstrated leadership, even in small ways',
      type: 'reflection',
      completed: false
    },
    {
      id: '2',
      title: 'Practice the STAR method',
      description: 'Prepare 5 STAR stories for your promotion conversation',
      type: 'exercise',
      completed: false
    },
    {
      id: '3',
      title: 'Read: "Crucial Conversations"',
      description: 'Chapter 3 on mastering your stories',
      type: 'resource',
      completed: true
    }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onboardingQuestions = [
    { key: 'name', question: "Hi! I'm your AI career coach. What's your name?", placeholder: 'Enter your name' },
    { key: 'role', question: `Nice to meet you, ${profile.name || 'there'}! What's your current role?`, placeholder: 'e.g., Software Engineer, Product Manager' },
    { key: 'experience', question: 'How many years of professional experience do you have?', placeholder: 'e.g., 3 years' },
    { key: 'goals', question: "What are your main career goals right now? What would you like to achieve?", placeholder: 'Share your goals' },
    { key: 'challenges', question: "What's your biggest career challenge at the moment?", placeholder: 'Tell me about your challenges' }
  ]

  const handleOnboardingSubmit = () => {
    if (onboardingStep < onboardingQuestions.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      // Complete onboarding
      setCurrentView('dashboard')
      addMessage('coach', "Perfect! I've got a good understanding of where you are. Let's start working on your career goals. You can start a coaching session anytime, or check out your dashboard to see your goals and recommendations.")
    }
  }

  const addMessage = (role: 'user' | 'coach', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const simulateCoachResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('promotion') || lowerMessage.includes('promote')) {
      return mockCoachResponses['promotion']
    } else if (lowerMessage.includes('balance') || lowerMessage.includes('work-life')) {
      return mockCoachResponses['work-life balance']
    } else if (lowerMessage.includes('change') || lowerMessage.includes('transition')) {
      return mockCoachResponses['career change']
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return mockCoachResponses['hello']
    }
    
    return mockCoachResponses['default']
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    addMessage('user', userMessage)
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const coachResponse = simulateCoachResponse(userMessage)
      addMessage('coach', coachResponse)
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (currentView === 'onboarding') {
        handleOnboardingSubmit()
      } else {
        handleSendMessage()
      }
    }
  }

  const toggleRecommendation = (id: string) => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, completed: !rec.completed } : rec
      )
    )
  }

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, progress: Math.min(100, Math.max(0, progress)) } : goal
      )
    )
  }

  if (currentView === 'onboarding') {
    const currentQuestion = onboardingQuestions[onboardingStep]
    const profileKey = currentQuestion.key as keyof typeof profile

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                AI
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Career Coach</h1>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((onboardingStep + 1) / onboardingQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-4">{currentQuestion.question}</p>
            <input
              type="text"
              value={profile[profileKey] as string}
              onChange={(e) => setProfile(prev => ({ ...prev, [profileKey]: e.target.value }))}
              onKeyPress={handleKeyPress}
              placeholder={currentQuestion.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              autoFocus
            />
          </div>

          <button
            onClick={handleOnboardingSubmit}
            disabled={!profile[profileKey]}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {onboardingStep < onboardingQuestions.length - 1 ? 'Continue' : 'Complete Setup'}
          </button>
        </div>
      </div>
    )
  }

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                AI
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Career Dashboard</h1>
            </div>
            <button
              onClick={() => setCurrentView('session')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Session
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Goals Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Goals</h2>
              <div className="space-y-4">
                {goals.map(goal => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        goal.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentView('goals')}
                className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Manage Goals →
              </button>
            </div>

            {/* Recommendations Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
              <div className="space-y-3">
                {recommendations.map(rec => (
                  <div
                    key={rec.id}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={rec.completed}
                      onChange={() => toggleRecommendation(rec.id)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${rec.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {rec.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          rec.type === 'exercise' ? 'bg-purple-100 text-purple-800' :
                          rec.type === 'resource' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {rec.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Career Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
                <div className="text-sm text-gray-600">Active Goals</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">1</div>
                <div className="text-sm text-gray-600">Completed Actions</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">38%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Pattern identified:</strong> You're making steady progress on your promotion goal. 
                Consider scheduling a conversation with your manager to discuss your growth trajectory.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'goals') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Manage Goals</h1>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              {goals.map(goal => (
                <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
                      <p className="text-gray-600 mb-4">{goal.description}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      goal.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {goal.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateGoalProgress(goal.id, goal.progress - 10)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      -10%
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.id, goal.progress + 10)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      +10%
                    </button>
                    <span className="text-sm text-gray-500">Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Session view
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Coaching Session</h1>
            <p className="text-sm text-gray-500">Your AI career coach is ready to help</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('goals')}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Goals
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                AI
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Start Your Coaching Session</h2>
              <p className="text-gray-600 mb-6">What would you like to work on today?</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Help with promotion', 'Work-life balance', 'Career change', 'Skill development'].map(topic => (
                  <button
                    key={topic}
                    onClick={() => {
                      setInputValue(topic)
                      setTimeout(() => handleSendMessage(), 100)
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

