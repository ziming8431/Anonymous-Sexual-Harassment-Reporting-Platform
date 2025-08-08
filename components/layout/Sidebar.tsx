'use client'

import { motion } from 'framer-motion'
import { 
  Home, 
  Users, 
  Briefcase, 
  Inbox, 
  User, 
  Bell, 
  Search, 
  Settings, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '@suiet/wallet-kit'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  className?: string
}

const navigationItems = [
  { icon: Home, label: 'Feed', href: '/', active: true },
  { icon: Users, label: 'Groups', href: '/groups' },
  { icon: Briefcase, label: 'Collabs', href: '/collabs' },
  { icon: Inbox, label: 'Inbox', href: '/inbox' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar({ className = '' }: SidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeItem, setActiveItem] = useState('Feed')
  const wallet = useWallet()
  const router = useRouter()

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleLogout = async () => {
    try {
      // Disconnect the wallet
      await wallet.disconnect()
      
      // Clear any stored wallet data
      localStorage.removeItem('walletAddress')
      localStorage.removeItem('walletType')
      
      // Redirect to connect page
      router.push('/connect')
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed left-0 top-0 h-full w-70 bg-white border-r border-gray-200 z-40 flex flex-col ${className}`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-lg text-gray-900">SafeSpace</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.label
            
            return (
              <li key={item.label}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveItem(item.label)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    isActive
                      ? 'bg-gray-100 text-gray-700 border-t border-b border-gray-300 border-l-0 border-r-0'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-700 hover:border hover:border-green-200'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={isActive ? 'text-gray-600' : 'text-gray-500 group-hover:text-green-600'} 
                  />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {isDarkMode ? (
              <Sun size={20} className="text-gray-500" />
            ) : (
              <Moon size={20} className="text-gray-500" />
            )}
            <span className="font-medium">{isDarkMode ? 'Light' : 'Dark'}</span>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors ${
            isDarkMode ? 'bg-green-600' : 'bg-gray-300'
          }`}>
            <motion.div
              animate={{ x: isDarkMode ? 24 : 2 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 bg-white rounded-full mt-0.5 shadow-sm"
            />
          </div>
        </motion.button>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} className="text-gray-500" />
          <span className="font-medium">Log Out</span>
        </motion.button>
      </div>
    </motion.aside>
  )
}