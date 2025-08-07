'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, Eye, Users } from 'lucide-react'
import { ReportSummary } from '@/types'

interface ConfirmationModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  reportSummary: ReportSummary | null
}

export function ConfirmationModal({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  reportSummary 
}: ConfirmationModalProps) {
  if (!reportSummary) return null

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
            onClick={onCancel}
          >
            {/* Modal */}
            <motion.div
              className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Share Publicly?
                    </h2>
                    <p className="text-sm text-gray-600">
                      Confirm anonymous sharing
                    </p>
                  </div>
                </div>
                <button
                  onClick={onCancel}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Report Preview */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-medium text-gray-900">
                    {reportSummary.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {reportSummary.summary}
                  </p>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                      {reportSummary.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                      {reportSummary.severity} severity
                    </span>
                  </div>
                </div>

                {/* Privacy Assurance */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary-600" />
                    <span>Your Privacy is Protected</span>
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        <strong>Anonymous:</strong> No personal information or identifying details will be shared
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        <strong>Summary Only:</strong> Only the AI-generated summary above will be visible
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        <strong>Helpful:</strong> Your report may help others feel less alone and recognize similar situations
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Statement */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-primary-900 mb-1">
                        Help Build a Safer Community
                      </h5>
                      <p className="text-sm text-primary-800">
                        By sharing your experience, you're contributing to awareness and helping others 
                        recognize patterns of harassment. Every report matters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={onCancel}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 btn-primary"
                >
                  Confirm & Share Anonymously
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}