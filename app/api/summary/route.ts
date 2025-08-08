import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { ChatMessage, ReportSummary } from '@/types'

// Initialize Google Gemini AI
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ''
})

function validateAISummary(summary: any): boolean {
  return (
    summary &&
    typeof summary.title === 'string' &&
    typeof summary.summary === 'string' &&
    typeof summary.category === 'string' &&
    typeof summary.severity === 'string' &&
    Array.isArray(summary.keyPoints) &&
    ['workplace', 'online', 'public', 'educational', 'other'].includes(summary.category) &&
    ['low', 'medium', 'high'].includes(summary.severity)
  )
}

function generateFallbackSummary(userMessages: string): ReportSummary {
  let category: ReportSummary['category'] = 'other'
  let severity: ReportSummary['severity'] = 'medium'
  
  const content = userMessages.toLowerCase()
  
  // Categorization logic
  if (content.includes('work') || content.includes('boss') || content.includes('supervisor') || content.includes('colleague')) {
    category = 'workplace'
  } else if (content.includes('online') || content.includes('social media') || content.includes('internet') || content.includes('email')) {
    category = 'online'
  } else if (content.includes('street') || content.includes('public') || content.includes('commute') || content.includes('walking')) {
    category = 'public'
  } else if (content.includes('school') || content.includes('university') || content.includes('professor') || content.includes('teacher')) {
    category = 'educational'
  }
  
  // Severity assessment
  if (content.includes('threat') || content.includes('violence') || content.includes('assault') || content.includes('stalking')) {
    severity = 'high'
  } else if (content.includes('uncomfortable') || content.includes('inappropriate comment') || content.includes('once')) {
    severity = 'low'
  }
  
  // Generate title and summary based on content
  const titles = {
    workplace: 'Workplace Harassment Incident',
    online: 'Online Harassment and Digital Abuse',
    public: 'Public Space Harassment',
    educational: 'Educational Institution Harassment',
    other: 'Harassment Incident Report'
  }
  
  return {
    title: titles[category],
    summary: `This report describes a ${severity}-severity ${category} harassment incident. The user has provided details about their experience and the impact it has had on them.`,
    category,
    severity,
    keyPoints: [
      'Incident details documented through conversation',
      'User provided context and circumstances',
      'Impact on user wellbeing noted',
      'Support and next steps discussed'
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const { conversationHistory } = await request.json()
    
    console.log('Summary API: Received summary request')
    console.log('Summary API: Gemini API Key available:', !!process.env.GEMINI_API_KEY)
    
    const userMessages = conversationHistory
      .filter((m: ChatMessage) => m.sender === 'user')
      .map((m: ChatMessage) => m.content)
      .join(' ')
    
    // Create prompt for Gemini to analyze and categorize the report
    const analysisPrompt = `Analyze this harassment report conversation and provide a structured summary. 
    
    Conversation content: ${userMessages}
    
    Please respond with a JSON object containing:
    {
      "title": "Brief descriptive title for the incident",
      "summary": "2-3 sentence summary of what happened",
      "category": "one of: workplace, online, public, educational, other",
      "severity": "one of: low, medium, high",
      "keyPoints": ["array of 2-4 key points from the incident"]
    }
    
    Guidelines:
    - Be factual and professional
    - Focus on the key details provided
    - Assess severity based on impact and nature of incidents
    - Choose category based on where harassment occurred
    - Key points should highlight important aspects like frequency, witnesses, evidence, etc.`
    
    console.log('Summary API: Calling Gemini API for summary')
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: analysisPrompt
    })
    
    const text = result.text
    console.log('Summary API: Gemini response received:', !!text, 'Length:', text?.length)
    
    // Try to parse the JSON response
    try {
      // Clean the response to extract JSON
      const jsonMatch = text?.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsedSummary = JSON.parse(jsonMatch[0])
        
        // Validate the parsed summary
        if (validateAISummary(parsedSummary)) {
          console.log('Summary API: Using Gemini-generated summary')
          return NextResponse.json({ summary: parsedSummary as ReportSummary })
        }
      }
    } catch (parseError) {
      console.error('Summary API: Error parsing AI summary:', parseError)
    }
    
    // Fallback to rule-based summary if AI parsing fails
    console.log('Summary API: Using fallback summary')
    return NextResponse.json({ summary: generateFallbackSummary(userMessages) })
    
  } catch (error) {
    console.error('Summary API: Error generating AI summary:', error)
    
    // Fallback to rule-based summary
    const fallbackSummary = generateFallbackSummary('')
    return NextResponse.json({ summary: fallbackSummary })
  }
}