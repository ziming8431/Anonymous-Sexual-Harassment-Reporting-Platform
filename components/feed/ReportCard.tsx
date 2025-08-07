'use client'

import { motion } from 'framer-motion'
import { Clock, Users, AlertTriangle } from 'lucide-react'
import { Report } from '@/types'
import { formatDistanceToNow } from '@/lib/utils'

interface ReportCardProps {
  report: Report
  onClick: () => void
}

export function ReportCard({ report, onClick }: ReportCardProps) {
  const getSeverityColor = (severity: Report['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-orange-600 bg-orange-50'
      case 'low':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getCategoryLabel = (category: Report['category']) => {
    const labels = {
      workplace: 'Workplace',
      online: 'Online',
      public: 'Public Space',
      educational: 'Educational',
      other: 'Other'
    }
    return labels[category] || 'Other'
  }

  return (
    <motion.article
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={onClick}
      whileHover={{ y: -2 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`Read full report: ${report.title}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {report.title}
          </h3>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(report.timestamp)}</span>
            </span>
            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
              {getCategoryLabel(report.category)}
            </span>
          </div>
        </div>
        
        {/* Severity Indicator */}
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
          <AlertTriangle className="w-3 h-3" />
          <span className="capitalize">{report.severity}</span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-gray-700 mb-4 line-clamp-3">
        {report.summary}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {report.similarReportsCount && report.similarReportsCount > 0 && (
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{report.similarReportsCount} similar reports</span>
            </span>
          )}
        </div>
        
        <button 
          className="text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          Read More →
        </button>
      </div>
    </motion.article>
  )
}