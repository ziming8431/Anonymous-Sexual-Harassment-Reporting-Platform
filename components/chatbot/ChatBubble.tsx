'use client'

import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import { ChatMessage } from '@/types'
import { formatTime } from '@/lib/utils'

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user'
  const isAI = message.sender === 'ai'

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'ml-2' : 'mr-2'} ${
          isUser 
            ? 'bg-primary-100 text-primary-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`px-4 py-3 rounded-2xl max-w-full ${
              isUser
                ? 'bg-accent-light text-gray-800 rounded-br-md'
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          
          {/* Timestamp */}
          <span className="text-xs text-gray-500 mt-1 px-2">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}