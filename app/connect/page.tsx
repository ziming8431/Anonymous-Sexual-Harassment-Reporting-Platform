'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, CheckCircle, Shield, Network, Cpu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ConnectButton, useWallet, addressEllipsis } from '@suiet/wallet-kit'

export default function ConnectWalletPage() {
  const router = useRouter()
  const wallet = useWallet()

  useEffect(() => {
    // Redirect to main app when wallet is connected
    if (wallet.connected && wallet.account) {
      console.log('Wallet connected:', {
        name: wallet.name,
        address: wallet.account.address,
        status: wallet.status
      })
      
      // Store connection info
      localStorage.setItem('walletAddress', wallet.account.address)
      localStorage.setItem('walletType', wallet.name || 'unknown')
      
      // Redirect to main app immediately
      router.push('/')
    }
  }, [wallet.connected, wallet.account, wallet.name, router])

  const truncateAddress = (address: string) => {
    return addressEllipsis(address)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-green-400/5 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-10 left-10 w-28 h-28 bg-cyan-400/5 rounded-full blur-lg animate-pulse delay-1500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Blockchain Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg shadow-lg shadow-green-400/50 border border-green-400/30"
          animate={{ 
            y: [0, -20, 0],
            rotateY: [0, 360]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg shadow-lg shadow-cyan-400/50 border border-cyan-400/30"
          animate={{ 
            y: [0, 15, 0],
            rotateY: [360, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/3 w-5 h-5 bg-gradient-to-br from-purple-400 to-green-400 rounded-lg shadow-lg shadow-purple-400/50 border border-purple-400/30"
          animate={{ 
            y: [0, -25, 0],
            rotateY: [0, 360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gradient-to-br from-gray-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-400/30 p-8 md:p-12 max-w-md w-full relative overflow-hidden"
        >
          {/* Card Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-cyan-400/5 rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent -skew-x-12 animate-pulse"></div>
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-20 h-20 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30 border border-green-400/50 relative"
            >
              <Wallet size={32} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full animate-pulse"></div>
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Courier New, monospace' }}>
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">SafeSpace</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium mb-2">
              <span className="text-green-400">Anonymous</span> Harassment Reports
            </p>
            <p className="text-gray-400 text-sm">
              Connect your wallet to access the <span className="text-cyan-400">platform</span>
            </p>
          </div>

          {/* Connection Status */}
          {wallet.connected && wallet.account ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-6 relative z-10"
            >
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="text-green-400 mr-2 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" size={20} />
                <span className="text-green-400 font-medium">Wallet Connected</span>
              </div>
              <div className="bg-gradient-to-br from-gray-700/50 to-slate-800/50 rounded-lg p-4 mb-4 border border-green-400/30 backdrop-blur-sm">
                <p className="text-white font-mono text-sm mb-1">
                  {truncateAddress(wallet.account.address)}
                </p>
                <p className="text-cyan-400 text-xs">
                  {wallet.name}
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <p className="text-sm text-gray-300">Redirecting to the platform...</p>
              </div>
            </motion.div>
          ) : (
            <div className="mb-6">
              {/* Wallet Status */}
              {wallet.status && (
                <div className="mb-6 p-3 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 border border-cyan-400/30 rounded-lg backdrop-blur-sm relative z-10">
                  <p className="text-sm text-cyan-400">
                    <strong>Status:</strong> <span className="text-white">{wallet.status}</span>
                  </p>
                  {wallet.connecting && (
                    <div className="flex items-center mt-2">
                      <motion.div 
                        className="w-3 h-3 bg-cyan-400 rounded-full mr-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <p className="text-xs text-gray-300">Please approve the connection in your wallet...</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Connect Button - Centered and Styled */}
              <div className="flex justify-center relative z-10">
                <div className="w-full max-w-xs relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ConnectButton 
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                      color: 'white',
                      border: '1px solid rgba(34, 197, 94, 0.5)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 10
                    }}
                  />
                </div>
              </div>
            </div>
          )}



          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-green-400/20 text-center relative z-10">
            <p className="text-xs text-gray-400">
              Powered by <span className="text-green-400">Suiet Wallet Kit</span> • <span className="text-cyan-400">Secure</span> & <span className="text-purple-400">Anonymous</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}