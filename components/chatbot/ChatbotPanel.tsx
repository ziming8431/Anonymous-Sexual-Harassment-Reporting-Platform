'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot } from 'lucide-react'
import { ChatMessage, ReportSummary } from '@/types'
import { ChatBubble } from './ChatBubble'
import { SummaryCard } from './SummaryCard'
import { generateAIResponse, generateReportSummary } from '@/lib/chatbot'

interface ChatbotPanelProps {
  isOpen: boolean
  onClose: () => void
  onReportGenerated: (summary: ReportSummary) => void
  onKeepPrivate: () => void
}

export function ChatbotPanel({ 
  isOpen, 
  onClose, 
  onReportGenerated, 
  onKeepPrivate 
}: ChatbotPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null)
  const [showSummaryActions, setShowSummaryActions] = useState(false)

  // Initialize chat when panel opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        content: "Hi, I'm here to help you report safely and anonymously. Please tell me what happened, and I'll guide you through the process. Take your time - this is a safe space.",
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const aiResponse = await generateAIResponse(inputValue, messages)
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
      
      // Check if we have enough information to generate a summary
      if (messages.length >= 6) { // After a few exchanges
        setTimeout(() => {
          generateSummary()
        }, 2000)
      }
    } catch (error) {
      console.error('Error generating AI response:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const generateSummary = async () => {
    try {
      const summary = await generateReportSummary(messages)
      setReportSummary(summary)
      setShowSummaryActions(true)
      
      const summaryMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "I've created a summary of your report based on our conversation. Please review it below and let me know if you'd like to keep it private or share it publicly to help others.",
        sender: 'ai',
        timestamp: new Date(),
        type: 'summary'
      }
      
      setMessages(prev => [...prev, summaryMessage])
    } catch (error) {
      console.error('Error generating summary:', error)
    }
  }

  const handleKeepPrivate = () => {
    onKeepPrivate()
    resetChat()
  }

  const handleSharePublicly = () => {
    if (reportSummary) {
      onReportGenerated(reportSummary)
      resetChat()
    }
  }

  const resetChat = () => {
    setMessages([])
    setReportSummary(null)
    setShowSummaryActions(false)
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-800 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold">AI Assistant</h2>
                  <p className="text-sm text-primary-100">Safe & Anonymous</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              
              {reportSummary && (
                <div className="space-y-4">
                  <SummaryCard summary={reportSummary} />
                  
                  {showSummaryActions && (
                    <motion.div
                      className="flex flex-col space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <button
                        onClick={handleSharePublicly}
                        className="btn-primary w-full"
                      >
                        Share Publicly (Anonymous)
                      </button>
                      <button
                        onClick={handleKeepPrivate}
                        className="btn-secondary w-full"
                      >
                        Keep Private
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
              
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm">AI is typing...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Talk about what happened..."
                  className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={2}
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}