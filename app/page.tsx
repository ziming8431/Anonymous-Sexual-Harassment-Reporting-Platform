'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, Lock, Users, Globe, CheckCircle, ArrowRight, Eye, Database, Zap, Cpu, Network, Layers, Hexagon } from 'lucide-react'
import { useWallet } from '@suiet/wallet-kit'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { FeedContainer } from '@/components/feed/FeedContainer'
import { ChatbotPanel } from '@/components/chatbot/ChatbotPanel'
import { ConfirmationModal } from '@/components/modals/ConfirmationModal'
import { ReportDetailModal } from '@/components/modals/ReportDetailModal'
import { Report } from '@/types'

export default function HomePage() {
  const router = useRouter()
  const wallet = useWallet()
  const [activeFeature, setActiveFeature] = useState(0)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [isReportDetailModalOpen, setIsReportDetailModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [reportToShare, setReportToShare] = useState<Report | null>(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  useEffect(() => {
    // Check wallet connection status
    const checkWalletConnection = () => {
      const walletAddress = localStorage.getItem('walletAddress')
      setIsWalletConnected(wallet.connected && !!wallet.account && !!walletAddress)
    }

    checkWalletConnection()
    
    // Listen for wallet connection changes
    const interval = setInterval(checkWalletConnection, 1000)
    return () => clearInterval(interval)
  }, [wallet.connected, wallet.account])

  const handleReportClick = () => {
    setIsChatbotOpen(true)
  }

  const handleReportCardClick = (report: Report) => {
    setSelectedReport(report)
    setIsReportDetailModalOpen(true)
  }

  const handleShareReport = (report: Report) => {
    setReportToShare(report)
    setIsConfirmationModalOpen(true)
  }

  const handleConfirmShare = () => {
    if (reportToShare) {
      // Handle sharing logic here
      console.log('Sharing report:', reportToShare.id)
      setIsConfirmationModalOpen(false)
      setReportToShare(null)
    }
  }

  // Show main app interface if wallet is connected
  if (isWalletConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onReportClick={handleReportClick} />
        
        <div className="flex">
          <Sidebar className="hidden lg:block" />
          
          <main className="flex-1 lg:ml-64">
            <div className="pt-16">
              <FeedContainer onReportClick={handleReportCardClick} />
            </div>
          </main>
        </div>

        <ChatbotPanel
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          onReportGenerated={handleShareReport}
        />

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={handleConfirmShare}
          report={reportToShare}
        />

        <ReportDetailModal
          isOpen={isReportDetailModalOpen}
          onClose={() => setIsReportDetailModalOpen(false)}
          report={selectedReport}
        />
      </div>
    )
  }

  // Show landing page if wallet is not connected

  const features = [
    {
      icon: Shield,
      title: "Anonymous & Secure",
      description: "End-to-end encrypted reporting with zero-knowledge proofs. Only you hold the decryption key."
    },
    {
      icon: Database,
      title: "Immutable Records",
      description: "Blockchain technology creates tamper-proof, time-stamped records that can't be altered or deleted."
    },
    {
      icon: Eye,
      title: "Victim-Controlled Access",
      description: "Reports stay private until you decide to share. You maintain complete control over your data."
    },
    {
      icon: Globe,
      title: "Global & Decentralized",
      description: "No central server to hack or shut down. Accessible worldwide, especially valuable in jurisdictions with weak protections."
    }
  ]

  const stats = [
    { number: "70%", label: "of sexual assaults go unreported" },
    { number: "75%", label: "of harassment incidents are never reported" },
    { number: "85%", label: "more likely to report with guaranteed anonymity" }
  ]

  const benefits = [
    {
      title: "Empowerment & Higher Reporting Rates",
      description: "Anonymity plus immutable evidence lowers the psychological barrier to speak up"
    },
    {
      title: "Deters Repeat Offenders",
      description: "Threat of irrevocable, pseudonymous complaints and potential pattern-matching of multiple reports"
    },
    {
      title: "Institutional Accountability",
      description: "Open, anonymized statistics highlight hotspots and force policy change"
    },
    {
      title: "Long-term Evidence Preservation",
      description: "Strengthens future legal cases even years later with immutable blockchain records"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border border-green-400/20 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-cyan-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 border border-purple-400/20 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 border border-green-400/20 rounded-full animate-bounce"></div>
        
        {/* Floating Blockchain Nodes */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
          animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
          animate={{ y: [-15, 15, -15], x: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-green-400/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Shield className="h-8 w-8 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <div className="absolute inset-0 h-8 w-8 bg-green-400/20 rounded-full blur-sm animate-pulse"></div>
              </div>
              <span className="text-xl font-bold text-white bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">SafeSpace</span>
            </div>
            <button
              onClick={() => router.push('/connect')}
              className="relative bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-400/40 border border-green-400/30"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-lg blur-sm"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative">
            {/* 3D Blockchain Visualization */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg shadow-lg shadow-green-400/50 border border-green-400/30"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 shadow-sm shadow-green-400/50"></div>
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg shadow-lg shadow-cyan-400/50 border border-cyan-400/30"
                  animate={{ rotateY: [360, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 shadow-sm shadow-cyan-400/50"></div>
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-br from-purple-400 to-green-400 rounded-lg shadow-lg shadow-purple-400/50 border border-purple-400/30"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 mt-16"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Anonymous Sexual Harassment</span>
              <span className="block bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">Reporting Platform</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              A <span className="text-green-400 font-semibold">privacy-first</span>, <span className="text-cyan-400 font-semibold">blockchain-backed</span> DApp that empowers survivors to report incidents safely 
              while maintaining complete <span className="text-purple-400 font-semibold">anonymity</span> and control over their data.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={() => router.push('/connect')}
                className="relative group bg-gradient-to-r from-green-500 via-cyan-500 to-green-500 hover:from-green-400 hover:via-cyan-400 hover:to-green-400 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 shadow-xl shadow-green-500/30 hover:shadow-green-400/50 border border-green-400/50 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Start Reporting Safely</span>
                  <ArrowRight className="h-5 w-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </motion.button>
              <motion.button 
                className="relative group border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <Network className="w-5 h-5" />
                  <span>Learn More</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The Under-Reporting Crisis</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Current reporting systems fail survivors. Our platform addresses the core barriers that prevent people from speaking up.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const colors = [
                { gradient: 'from-green-400 to-cyan-400', glow: 'rgba(34,197,94,0.3)', hoverGlow: 'rgba(34,197,94,0.5)', blur: 'text-green-400/20' },
                { gradient: 'from-cyan-400 to-blue-400', glow: 'rgba(34,211,238,0.3)', hoverGlow: 'rgba(34,211,238,0.5)', blur: 'text-cyan-400/20' },
                { gradient: 'from-purple-400 to-pink-400', glow: 'rgba(168,85,247,0.3)', hoverGlow: 'rgba(168,85,247,0.5)', blur: 'text-purple-400/20' }
              ]
              const colorScheme = colors[index % colors.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center group"
                >
                  <div className="relative">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent mb-2 drop-shadow-[0_0_20px_${colorScheme.glow}] group-hover:drop-shadow-[0_0_30px_${colorScheme.hoverGlow}] transition-all duration-300`}>{stat.number}</div>
                    <div className={`absolute inset-0 text-4xl font-bold ${colorScheme.blur} blur-sm`}>{stat.number}</div>
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900/50 to-slate-800/50 backdrop-blur-sm border-y border-green-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-4"
            >
              How <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">SafeSpace</span> Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Built on cutting-edge <span className="text-cyan-400 font-semibold">blockchain technology</span> with privacy-first design principles.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const colors = [
                { bg: 'from-green-400/20 to-cyan-400/20', border: 'border-green-400/30 hover:border-green-400/50', icon: 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.8)]', title: 'group-hover:text-green-400' },
                { bg: 'from-cyan-400/20 to-blue-400/20', border: 'border-cyan-400/30 hover:border-cyan-400/50', icon: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]', title: 'group-hover:text-cyan-400' },
                { bg: 'from-purple-400/20 to-pink-400/20', border: 'border-purple-400/30 hover:border-purple-400/50', icon: 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]', title: 'group-hover:text-purple-400' },
                { bg: 'from-emerald-400/20 to-green-400/20', border: 'border-emerald-400/30 hover:border-emerald-400/50', icon: 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]', title: 'group-hover:text-emerald-400' }
              ]
              const colorScheme = colors[index % colors.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-gradient-to-br from-gray-800/80 to-slate-900/80 p-6 rounded-xl shadow-xl border ${colorScheme.border} backdrop-blur-sm transition-all duration-300 cursor-pointer group`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`bg-gradient-to-br ${colorScheme.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4 border ${colorScheme.border.split(' ')[0].replace('border-', 'border-').replace('/30', '/40')} group-hover:${colorScheme.border.split(' ')[1].replace('hover:border-', 'border-').replace('/50', '/60')} transition-all duration-300`}>
                    <Icon className={`h-6 w-6 ${colorScheme.icon} transition-all duration-300`} />
                  </div>
                  <h3 className={`text-lg font-semibold text-white mb-2 ${colorScheme.title} transition-colors duration-300`}>{feature.title}</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 text-sm transition-colors duration-300">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Typical Workflow</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and completely under your control.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">File Report</h3>
              <p className="text-gray-600">
                Submit your report through our secure, encrypted interface. Your identity remains completely anonymous.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Record ID</h3>
              <p className="text-gray-600">
                Get an immutable, blockchain-based record ID that proves your report exists without revealing details.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Control Access</h3>
              <p className="text-gray-600">
                Decide when and with whom to share your report. Grant access to lawyers, police, or support services as needed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Expected Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Creating systemic change through technology, transparency, and survivor empowerment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why SafeSpace is Different</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlike existing solutions, we provide true anonymity with cryptographic accountability.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Unique Value Proposition</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">True anonymity with cryptographic accountability via zero-knowledge proofs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Decentralized, censorship-resistant architecture</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">You own your data—even developers cannot read or delete it</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Purpose-built for harassment reporting with trauma-informed UX</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Limitations We Overcome</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Traditional Platforms</h4>
                    <p className="text-sm text-gray-600">Require identity disclosure to HR or management</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Centralized Solutions</h4>
                    <p className="text-sm text-gray-600">Single point of failure, can be hacked or shut down</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">Campus-Only Tools</h4>
                    <p className="text-sm text-gray-600">Limited scope, not globally accessible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join the movement to create safer spaces through technology. Your voice matters, and your privacy is protected.
          </p>
          <button
            onClick={() => router.push('/connect')}
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center space-x-2"
          >
            <span>Get Started Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-green-400" />
                <span className="text-xl font-bold">SafeSpace</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering survivors through privacy-first, blockchain-backed anonymous reporting.
              </p>
              <p className="text-sm text-gray-500">
                Built with ❤️ for a safer world
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Counseling Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SafeSpace. All rights reserved. Built on blockchain for transparency and immutability.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    suiWallet?: {
      accounts?: { address: string }[]
      name?: string
    }
    sui?: {
      accounts?: { address: string }[]
      name?: string
    }
    slush?: {
      accounts?: { address: string }[]
      name?: string
    }
    martian?: {
      sui?: {
        accounts?: { address: string }[]
        name?: string
      }
    }
  }
}