import { useState, useEffect, useRef } from 'react'
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  GraduationCap,
  Briefcase,
  Calendar,
  FileText,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Search,
  TrendingUp
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const QUICK_ACTIONS = [
  { icon: Briefcase, label: 'Eligible Drives', prompt: 'Show me eligible drives' },
  { icon: Calendar, label: 'Interview Tips', prompt: 'Give me interview tips' },
  { icon: FileText, label: 'My Applications', prompt: 'Show my applications' },
  { icon: TrendingUp, label: 'Placement Stats', prompt: 'Show placement statistics' },
]

const SAMPLE_QUESTIONS = [
  'What are my eligible drives?',
  'Give me interview tips',
  'How can I improve my resume?',
  'What companies are visiting?',
  'What is the placement process?',
]

function PlacementBot() {
  const { user, getEligibleDrives, getMyApplications, INTERVIEW_TIPS, getAnalytics } = useApp()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Welcome message
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: `Hello ${user?.name || 'there'}! 👋 I'm PlacementBot, your placement assistant. I can help you with:\n\n• Finding eligible placement drives\n• Interview preparation tips\n• Application status updates\n• Placement statistics\n• Resume guidance\n\nHow can I help you today?`,
        timestamp: new Date()
      }
    ])
  }, [user])

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase()
    
    // Eligible drives - for students
    if (input.includes('eligible') || input.includes('drive') || input.includes('job') || input.includes('placement')) {
      const eligibleDrives = getEligibleDrives()
      
      if (eligibleDrives.length > 0) {
        const drivesList = eligibleDrives.map(d => 
          `• ${d.company} - ${d.role} (${d.package})\n  Last Date: ${d.lastDate}`
        ).join('\n\n')
        
        return `Based on your profile (CGPA: ${user?.cgpa || 'N/A'}, Branch: ${user?.branch || 'N/A'}), here are your eligible drives:\n\n${drivesList}\n\nWould you like to apply to any of these?`
      } else {
        return `I couldn't find any eligible drives for you. This could be because:\n\n• Your CGPA might be below the minimum requirement\n• Your branch might not be eligible for current drives\n• No drives are currently active\n\nTry updating your profile with your CGPA and branch, or check back later!`
      }
    }
    
    // Interview tips
    if (input.includes('interview') || input.includes('tip') || input.includes('prepare')) {
      const tips = INTERVIEW_TIPS.map((tip, i) => `${i + 1}. ${tip}`).join('\n\n')
      return `Here are some important interview tips:\n\n${tips}\n\nWould you like more specific guidance on any of these?`
    }
    
    // Application status
    if (input.includes('application') || input.includes('status') || input.includes('applied')) {
      const applications = getMyApplications()
      
      if (applications.length > 0) {
        const appsList = applications.map(a => 
          `• ${a.company} - ${a.position}\n  Status: ${a.status}\n  Applied: ${a.appliedDate}`
        ).join('\n\n')
        
        return `Here are your current applications:\n\n${appsList}\n\nKeep track of your application status and prepare for interviews!`
      } else {
        return `You haven't applied to any drives yet. Would you like me to show you eligible placement drives?`
      }
    }
    
    // Resume help
    if (input.includes('resume') || input.includes('cv') || input.includes('profile')) {
      return `Here are some resume tips:\n\n1. Keep it concise - 1-2 pages max\n2. Highlight relevant projects and internships\n3. Include key skills prominently\n4. Quantify achievements where possible\n5. Proofread multiple times\n\nWould you like to use our Resume Builder to create a professional resume?`
    }
    
    // Placement statistics
    if (input.includes('stat') || input.includes('placement rate') || input.includes('package') || input.includes('average')) {
      const analytics = getAnalytics()
      return `Here are the placement statistics:\n\n• Total Students: ${analytics.totalStudents}\n• Placement Rate: ${analytics.placementRate}%\n• Average Package: ₹${analytics.avgPackage} LPA\n• Active Drives: ${analytics.activeDrives}\n• Total Companies: ${analytics.totalCompanies}\n\nThese are aggregate statistics for the current placement season.`
    }
    
    // Greeting
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return `Hello! 👋 How can I help you with your placement journey today?`
    }
    
    // Help
    if (input.includes('help') || input.includes('what can you do')) {
      return `I can help you with:\n\n• 🎯 Finding eligible placement drives\n• 📝 Interview preparation tips\n• 📋 Checking your application status\n• 📊 Placement statistics\n• 📄 Resume guidance\n• ❓ General placement queries\n\nJust ask me anything!`
    }
    
    // Thank you
    if (input.includes('thank') || input.includes('thanks')) {
      return `You're welcome! 😊 Let me know if there's anything else I can help you with. Good luck with your placement journey!`
    }
    
    // Default response
    return `I'm not sure I understand that. 😅\n\nHere are some things I can help you with:\n\n• 🎯 Eligible placement drives\n• 📝 Interview tips\n• 📋 Your application status\n• 📊 Placement statistics\n• 📄 Resume guidance\n\nTry asking me one of these!`
  }

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setShowSuggestions(false)
    setIsTyping(true)
    
    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(input),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickAction = (prompt) => {
    setInput(prompt)
    setTimeout(() => handleSend(), 100)
  }

  const handleSuggestionClick = (question) => {
    handleQuickAction(question)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-280px)]">
      {/* Left Panel - Quick Actions */}
      <div className="lg:col-span-1 space-y-4">
        <div className="card-glass">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            Quick Actions
          </h3>
          <div className="space-y-2">
            {QUICK_ACTIONS.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action.prompt)}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-primary-50 rounded-xl transition-colors text-left"
              >
                <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card-glass">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary-600" />
            Common Questions
          </h3>
          <div className="space-y-2">
            {SAMPLE_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question)}
                className="w-full text-left p-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="lg:col-span-2 card-glass flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">PlacementBot</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-primary-500 to-purple-500' 
                    : 'bg-gray-100'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white'
                    : 'bg-gray-50 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about placements..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlacementBot
