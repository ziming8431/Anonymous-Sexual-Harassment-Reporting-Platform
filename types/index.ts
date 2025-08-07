export interface Report {
  id: string
  title: string
  summary: string
  content: string
  timestamp: Date
  isPublic: boolean
  category: 'workplace' | 'online' | 'public' | 'educational' | 'other'
  severity: 'low' | 'medium' | 'high'
  similarReportsCount?: number
}

export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type?: 'text' | 'summary' | 'action'
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  reportDraft?: Partial<Report>
  isActive: boolean
  createdAt: Date
}

export interface ReportSummary {
  title: string
  summary: string
  category: Report['category']
  severity: Report['severity']
  keyPoints: string[]
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}