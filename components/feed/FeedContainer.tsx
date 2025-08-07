'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ReportCard } from './ReportCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Report } from '@/types'
import { fetchReports } from '@/lib/api'

interface FeedContainerProps {
  onReportClick: (report: Report) => void
}

export function FeedContainer({ onReportClick }: FeedContainerProps) {
  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Unable to load reports at this time.</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports yet</h3>
          <p className="text-gray-600 mb-6">
            Be the first to share your experience and help create a safer community.
          </p>
          <p className="text-sm text-gray-500">
            All reports are anonymous and help others feel less alone.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Reports</h2>
        <p className="text-gray-600">
          Anonymous experiences shared to build awareness and support.
        </p>
      </div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ReportCard 
              report={report} 
              onClick={() => onReportClick(report)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button - for future infinite scroll implementation */}
      <div className="text-center mt-8">
        <button className="btn-secondary">
          Load More Reports
        </button>
      </div>
    </div>
  )
}