'use client'

import { motion } from 'framer-motion'
import { FileText, AlertTriangle, Tag } from 'lucide-react'
import { ReportSummary } from '@/types'

interface SummaryCardProps {
  summary: ReportSummary
}

export function SummaryCard({ summary }: SummaryCardProps) {
  const getSeverityColor = (severity: ReportSummary['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'low':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getCategoryLabel = (category: ReportSummary['category']) => {
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
    <motion.div
      className="bg-gradient-to-br from-primary-50 to-accent-light border border-primary-200 rounded-lg p-4 space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">Report Summary</h3>
          <p className="text-sm text-gray-600">
            Here's what I've captured from our conversation
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">{summary.title}</h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          {summary.summary}
        </p>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
          <Tag className="w-3 h-3" />
          <span>{getCategoryLabel(summary.category)}</span>
        </span>
        
        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(summary.severity)}`}>
          <AlertTriangle className="w-3 h-3" />
          <span className="capitalize">{summary.severity} Severity</span>
        </span>
      </div>

      {/* Key Points */}
      {summary.keyPoints && summary.keyPoints.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-900">Key Points:</h5>
          <ul className="space-y-1">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-primary-600 rounded-full mt-2" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="bg-white bg-opacity-60 rounded-md p-3 border border-primary-200">
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Privacy Notice:</strong> If you choose to share this publicly, only this summary will be visible. 
          Your identity and personal details will remain completely anonymous.
        </p>
      </div>
    </motion.div>
  )
}