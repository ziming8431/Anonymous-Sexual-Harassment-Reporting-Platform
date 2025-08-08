import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { ChatMessage } from '@/types'

// Initialize Google Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ''
})

// Predefined responses and questions
const supportiveResponses = [
  "Thank you for sharing that with me. Your experience is valid and important.",
  "I want you to know that what happened to you is not okay, and it's not your fault.",
  "You're showing incredible strength by speaking up about this.",
  "Your safety and wellbeing are the most important things right now.",
  "I'm here to listen and support you through this process."
]

const followUpQuestions = [
  "Can you provide more details about the specific incidents?",
  "How long has this been going on?",
  "Have you told anyone else about this?",
  "Do you feel safe in your current situation?",
  "What would help you feel more supported right now?",
  "Are there any patterns you've noticed in these incidents?"
]

const fallbackResponses = [
  "I'm sorry to hear about your experience. Can you tell me more about when this happened?",
  "That sounds very difficult. How did this situation make you feel?",
  "Thank you for sharing that with me. Can you describe the setting where this occurred?",
  "I understand this is hard to talk about. Were there any witnesses to what happened?",
  "You're being very brave by sharing this. How has this affected your daily life?",
  "Can you tell me about any steps you've already taken to address this situation?",
  "What kind of support do you feel you need right now?",
  "Have you experienced anything like this before, or was this an isolated incident?",
  "Thank you for trusting me with your story. Is there anything else important you'd like me to know?"
]

function getFallbackResponse(messageCount: number): string {
  if (messageCount <= 2) {
    const supportive = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)]
    const followUp = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)]
    return supportive + " " + followUp
  }
  
  if (messageCount <= 5) {
    return followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)]
  }
  
  if (messageCount >= 6) {
    return "Thank you for sharing all of this with me. I have a good understanding of what you've experienced. Let me create a summary of your report that you can review."
  }
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()
    
    console.log('API Route: Received chat request')
    console.log('API Route: Gemini API Key available:', !!process.env.GEMINI_API_KEY)
    
    const messageCount = conversationHistory.filter((m: ChatMessage) => m.sender === 'user').length
    
    // Build conversation context for Gemini
    const conversationContext = conversationHistory
      .slice(-6) // Keep last 6 messages for context
      .map((msg: ChatMessage) => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n')
    
    // Create system prompt for harassment support chatbot
    const systemPrompt = `You are a compassionate AI assistant helping someone report harassment. Your role is to:
    - Be empathetic, supportive, and non-judgmental
    - Ask thoughtful follow-up questions to gather important details
    - Validate their experience and emotions
    - Never blame the victim
    - Keep responses concise (2-3 sentences max)
    - Focus on gathering information for their report
    
    Use these supportive responses when appropriate:
    ${supportiveResponses.map((response, index) => `${index + 1}. ${response}`).join('\n    ')}
    
    Use these follow-up questions to guide the conversation:
    ${followUpQuestions.map((question, index) => `${index + 1}. ${question}`).join('\n    ')}
    
    Use these fallback responses if needed:
    ${fallbackResponses.map((response, index) => `${index + 1}. ${response}`).join('\n    ')}
    
    Current conversation context:
    ${conversationContext}
    
    User's latest message: ${message}
    
    Respond with empathy and ask a relevant follow-up question from the provided lists to help them document their experience. Choose the most appropriate response based on the conversation flow and user's emotional state.`
    
    console.log('API Route: Calling Gemini API')
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: systemPrompt
    })
    
    const text = result.text
    console.log('API Route: Gemini response received:', !!text, 'Length:', text?.length)
    
    if (text && text.length > 0) {
      console.log('API Route: Using Gemini response')
      return NextResponse.json({ response: text.trim() })
    }
    
    // Fallback to predefined responses
    console.log('API Route: Using fallback response')
    return NextResponse.json({ response: getFallbackResponse(messageCount) })
    
  } catch (error) {
    console.error('API Route: Error generating AI response:', error)
    
    // Return fallback response on error
    const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    return NextResponse.json({ response: fallback })
  }
}