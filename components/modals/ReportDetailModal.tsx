'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Users, AlertTriangle, Share, FileText } from 'lucide-react'
import { Report } from '@/types'
import { formatDistanceToNow } from '@/lib/utils'

interface ReportDetailModalProps {
  isOpen: boolean
  onClose: () => void
  report: Report | null
}

export function ReportDetailModal({ isOpen, onClose, report }: ReportDetailModalProps) {
  if (!report) return null

  const getSeverityColor = (severity: Report['severity']) => {
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

  const handleShareWithLawyer = () => {
    // This would typically generate a PDF or formatted document
    console.log('Sharing with lawyer:', report)
    // You could implement PDF generation or email functionality here
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-primary-800 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      Report Details
                    </h2>
                    <p className="text-sm text-primary-100">
                      Anonymous community report
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShareWithLawyer}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    title="Share with lawyer"
                  >
                    <Share className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Title and Metadata */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {report.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDistanceToNow(report.timestamp)}</span>
                    </span>
                    
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full font-medium">
                      {getCategoryLabel(report.category)}
                    </span>
                    
                    <span className={`flex items-center space-x-1 px-3 py-1 rounded-full font-medium border ${getSeverityColor(report.severity)}`}>
                      <AlertTriangle className="w-3 h-3" />
                      <span className="capitalize">{report.severity} Severity</span>
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {report.summary}
                  </p>
                </div>

                {/* Full Content */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Full Report</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {report.content}
                    </p>
                  </div>
                </div>

                {/* Statistics */}
                {report.similarReportsCount && report.similarReportsCount > 0 && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary-600" />
                      <div>
                        <h5 className="font-medium text-primary-900">
                          Similar Reports
                        </h5>
                        <p className="text-sm text-primary-800">
                          {report.similarReportsCount} other people have reported similar experiences
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Support Resources */}
                <div className="bg-accent-light border border-primary-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-3">
                    Support Resources
                  </h5>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      • <strong>Crisis Hotline:</strong> 1-800-656-HOPE (4673)
                    </p>
                    <p className="text-gray-700">
                      • <strong>Legal Aid:</strong> Contact local legal aid organizations
                    </p>
                    <p className="text-gray-700">
                      • <strong>Counseling:</strong> RAINN.org for confidential support
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600">
                  This report was shared anonymously to help build community awareness.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleShareWithLawyer}
                    className="btn-secondary text-sm"
                  >
                    Share with Lawyer
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-primary text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}