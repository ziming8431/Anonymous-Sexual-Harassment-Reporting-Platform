import { Report, PaginatedResponse, ApiResponse } from '@/types'

// Mock data for demonstration
const mockReports: Report[] = [
  {
    id: '1',
    title: 'Workplace Harassment by Supervisor',
    summary: 'Experienced repeated inappropriate comments and unwanted advances from direct supervisor over several months. Created hostile work environment affecting job performance.',
    content: 'Over the past six months, my direct supervisor has made numerous inappropriate comments about my appearance and personal life. The behavior escalated to unwanted physical contact and suggestions of career advancement in exchange for personal favors. I documented incidents with dates and witnesses when possible. HR was contacted but response was inadequate.',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    isPublic: true,
    category: 'workplace',
    severity: 'high',
    similarReportsCount: 12
  },
  {
    id: '2',
    title: 'Online Harassment and Doxxing',
    summary: 'Targeted harassment campaign including doxxing, threats, and coordinated attacks across multiple social media platforms after speaking out about industry issues.',
    content: 'After posting about gender inequality in tech, I became the target of a coordinated harassment campaign. Personal information was shared without consent, threatening messages were sent to family members, and fake accounts were created to impersonate me. The harassment continued for weeks despite reporting to platform moderators.',
    timestamp: new Date('2024-01-12T14:20:00Z'),
    isPublic: true,
    category: 'online',
    severity: 'high',
    similarReportsCount: 8
  },
  {
    id: '3',
    title: 'Street Harassment During Commute',
    summary: 'Regular verbal harassment and following behavior from strangers during daily commute. Incidents occur multiple times per week affecting sense of safety.',
    content: 'During my daily commute to work, I regularly experience catcalling, inappropriate comments, and sometimes being followed for several blocks. This happens 3-4 times per week and has made me change my route and schedule. Some incidents involved groups of people making it feel more threatening.',
    timestamp: new Date('2024-01-10T09:15:00Z'),
    isPublic: true,
    category: 'public',
    severity: 'medium',
    similarReportsCount: 23
  },
  {
    id: '4',
    title: 'Academic Harassment by Professor',
    summary: 'Professor made inappropriate advances and created hostile learning environment. Grades appeared to be affected by rejection of advances.',
    content: 'A professor in my major began making inappropriate comments during office hours and suggested that better grades could be earned through personal relationships. When I declined and reported the behavior, my grades in the class suffered noticeably. Other students have hinted at similar experiences.',
    timestamp: new Date('2024-01-08T16:45:00Z'),
    isPublic: true,
    category: 'educational',
    severity: 'high',
    similarReportsCount: 5
  },
  {
    id: '5',
    title: 'Harassment at Social Event',
    summary: 'Unwanted physical contact and persistent advances at professional networking event despite clear rejection. Event organizers were unresponsive.',
    content: 'At a professional networking event, an attendee made repeated unwanted advances including inappropriate touching and following me around the venue. Despite clearly stating I was not interested and asking them to stop, the behavior continued. When I reported it to event staff, they said they would "keep an eye on it" but took no concrete action.',
    timestamp: new Date('2024-01-05T19:30:00Z'),
    isPublic: true,
    category: 'other',
    severity: 'medium',
    similarReportsCount: 7
  }
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchReports(page = 1, limit = 10): Promise<Report[]> {
  await delay(800) // Simulate network delay
  
  // In a real app, this would be an actual API call
  // const response = await fetch(`/api/reports?page=${page}&limit=${limit}`)
  // return response.json()
  
  return mockReports
}

export async function fetchReportById(id: string): Promise<Report | null> {
  await delay(500)
  
  const report = mockReports.find(r => r.id === id)
  return report || null
}

export async function createReport(report: Omit<Report, 'id' | 'timestamp'>): Promise<ApiResponse<Report>> {
  await delay(1000)
  
  const newReport: Report = {
    ...report,
    id: Date.now().toString(),
    timestamp: new Date()
  }
  
  // In a real app, this would save to a database
  mockReports.unshift(newReport)
  
  return {
    data: newReport,
    success: true,
    message: 'Report created successfully'
  }
}

export async function searchReports(query: string): Promise<Report[]> {
  await delay(600)
  
  const lowercaseQuery = query.toLowerCase()
  return mockReports.filter(report => 
    report.title.toLowerCase().includes(lowercaseQuery) ||
    report.summary.toLowerCase().includes(lowercaseQuery) ||
    report.content.toLowerCase().includes(lowercaseQuery)
  )
}