'use client'

import { Plus, Leaf, CheckCircle, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWallet, addressEllipsis } from '@suiet/wallet-kit'

interface HeaderProps {
  onReportClick: () => void
}

export function Header({ onReportClick }: HeaderProps) {
  const wallet = useWallet()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-800 rounded-full">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SafeSpace</h1>
              <p className="text-sm text-gray-600">Anonymous Reports</p>
            </div>
          </div>

          {/* Wallet Status */}
          <div className="flex items-center space-x-3">
            {wallet.connected && wallet.account ? (
              <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {addressEllipsis(wallet.account.address)}
                </span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  {wallet.account.label || 'Connected'}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                <Wallet className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Disconnected</span>
              </div>
            )}
          </div>

          {/* Navigation and Report Button */}
          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex items-center space-x-6">
              <a 
                href="#" 
                className="text-gray-700 hover:text-primary-800 font-medium transition-colors"
              >
                Home
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-primary-800 font-medium transition-colors"
              >
                Resources
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-primary-800 font-medium transition-colors"
              >
                Support
              </a>
            </nav>

            {/* Report Button */}
          <motion.button
            onClick={onReportClick}
            className="relative flex items-center space-x-2 bg-gradient-to-r from-primary-800 to-primary-600 hover:from-primary-700 hover:to-primary-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-opacity-50 overflow-hidden group"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Open report form"
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
            
            <Plus className="w-5 h-5 relative z-10" />
            <span className="hidden sm:inline relative z-10 tracking-wide">Report</span>
            
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
}