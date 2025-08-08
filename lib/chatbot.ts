import { ChatMessage, ReportSummary } from '@/types'

// Fallback responses for when API is unavailable
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

const followUpQuestions = [
  "Can you provide more details about the specific incidents?",
  "How long has this been going on?",
  "Have you told anyone else about this?",
  "Do you feel safe in your current situation?",
  "What would help you feel more supported right now?",
  "Are there any patterns you've noticed in these incidents?"
]

const supportiveResponses = [
  "Thank you for sharing that with me. Your experience is valid and important.",
  "I want you to know that what happened to you is not okay, and it's not your fault.",
  "You're showing incredible strength by speaking up about this.",
  "Your safety and wellbeing are the most important things right now.",
  "I'm here to listen and support you through this process."
]

// Simulate AI processing delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function generateAIResponse(
  userMessage: string, 
  conversationHistory: ChatMessage[]
): Promise<string> {
  try {
    console.log('Client: Calling chat API route')
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory
      })
    })
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Client: Received response from API')
    
    return data.response || getFallbackResponse(conversationHistory.filter(m => m.sender === 'user').length)
    
  } catch (error) {
    console.error('Client: Error calling chat API:', error)
    // Fallback to predefined responses when API fails
    const messageCount = conversationHistory.filter(m => m.sender === 'user').length
    return getFallbackResponse(messageCount)
  }
}

function getFallbackResponse(messageCount: number): string {
  // Simplified fallback when Gemini API is unavailable
  // Provide supportive responses early in conversation
  if (messageCount <= 2) {
    return getRandomSupportiveResponse() + " " + getRandomFollowUp()
  }
  
  // Ask follow-up questions in middle of conversation
  if (messageCount <= 5) {
    return getRandomFollowUp()
  }
  
  // Prepare for summary generation
  if (messageCount >= 6) {
    return "Thank you for sharing all of this with me. I have a good understanding of what you've experienced. Let me create a summary of your report that you can review."
  }
  
  // Default responses
  return getRandomFallbackResponse()
}

function getRandomFallbackResponse(): string {
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}

function getRandomFollowUp(): string {
  return followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)]
}

function getRandomSupportiveResponse(): string {
  return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)]
}

export async function generateReportSummary(
  conversationHistory: ChatMessage[]
): Promise<ReportSummary> {
  try {
    console.log('Client: Calling summary API route')
    
    const response = await fetch('/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationHistory: conversationHistory
      })
    })
    
    if (!response.ok) {
      throw new Error(`Summary API request failed: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Client: Received summary from API')
    
    return data.summary || generateFallbackSummary('')
    
  } catch (error) {
    console.error('Client: Error calling summary API:', error)
    // Fallback to rule-based summary
    const userMessages = conversationHistory
      .filter(m => m.sender === 'user')
      .map(m => m.content)
      .join(' ')
    return generateFallbackSummary(userMessages)
  }
}



function generateFallbackSummary(userMessages: string): ReportSummary {
  // Simple keyword-based categorization (fallback)
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
    educational: 'Academic Environment Harassment',
    other: 'Harassment Incident Report'
  }
  
  const summaryTemplates = {
    workplace: 'Experienced inappropriate behavior in a professional setting that created a hostile work environment.',
    online: 'Targeted harassment through digital platforms including inappropriate messages and online abuse.',
    public: 'Encountered unwanted attention and harassment in public spaces affecting sense of safety.',
    educational: 'Faced inappropriate conduct in an academic setting that impacted learning environment.',
    other: 'Experienced harassment that affected personal safety and wellbeing.'
  }
  
  // Extract key points from conversation
  const keyPoints: string[] = []
  
  if (content.includes('multiple') || content.includes('repeated') || content.includes('ongoing')) {
    keyPoints.push('Repeated incidents over time')
  }
  
  if (content.includes('witness') || content.includes('saw') || content.includes('others')) {
    keyPoints.push('Witnesses present during incidents')
  }
  
  if (content.includes('reported') || content.includes('told') || content.includes('complained')) {
    keyPoints.push('Previously reported to authorities/management')
  }
  
  if (content.includes('photo') || content.includes('evidence') || content.includes('documented')) {
    keyPoints.push('Evidence or documentation available')
  }
  
  if (content.includes('scared') || content.includes('afraid') || content.includes('unsafe')) {
    keyPoints.push('Significant impact on sense of safety')
  }
  
  return {
    title: titles[category],
    summary: summaryTemplates[category] + ' The incident(s) have been documented with relevant details and context provided.',
    category,
    severity,
    keyPoints: keyPoints.length > 0 ? keyPoints : ['Detailed account provided', 'Impact on wellbeing documented']
  }
}

export function validateReportSummary(summary: ReportSummary): boolean {
  return (
    summary.title.length > 0 &&
    summary.summary.length > 10 &&
    ['workplace', 'online', 'public', 'educational', 'other'].includes(summary.category) &&
    ['low', 'medium', 'high'].includes(summary.severity)
  )
}