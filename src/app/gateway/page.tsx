"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  ChevronRight,
  Sparkles,
  Building2,
  Fingerprint
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GatewayPage() {
  const router = useRouter()
  const [activePortal, setActivePortal] = useState<'donor' | 'hospital' | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const CODES = {
    donor: 'MEDI-DONOR-77',
    hospital: 'MEDI-HOSP-99'
  }

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Simulate network delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 1200))

    if (activePortal && code === CODES[activePortal]) {
      localStorage.setItem(`medimatch_${activePortal}_access`, 'true')
      router.push(activePortal === 'donor' ? '/dashboard/donor' : '/dashboard')
    } else {
      setError('Invalid Access Code. Please check and try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="max-w-4xl w-full z-10 space-y-12">
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
          >
            <Lock className="h-3 w-3" /> Secure Access Gateway
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">MediMatch</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            Please select your portal and enter your secure access code to proceed to the clinical environment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donor Portal Card */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setActivePortal('donor')}
            className={`group relative p-8 rounded-3xl border transition-all cursor-pointer ${
              activePortal === 'donor' 
                ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`absolute top-4 right-4 p-2 rounded-full transition-all ${activePortal === 'donor' ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-500'}`}>
              <Heart className="h-6 w-6" />
            </div>
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Fingerprint className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Donor Portal</h2>
                <p className="text-sm text-gray-400 mt-2">Access your impact stats, donation history, and stories.</p>
              </div>
            </div>
          </motion.div>

          {/* Hospital Portal Card */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setActivePortal('hospital')}
            className={`group relative p-8 rounded-3xl border transition-all cursor-pointer ${
              activePortal === 'hospital' 
                ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_50px_-10px_rgba(99,102,241,0.3)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`absolute top-4 right-4 p-2 rounded-full transition-all ${activePortal === 'hospital' ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-500'}`}>
              <Building2 className="h-6 w-6" />
            </div>
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Hospital Portal</h2>
                <p className="text-sm text-gray-400 mt-2">Manage allocations, track viability, and match recipients.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Access Form */}
        <AnimatePresence>
          {activePortal && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleAccess} className="space-y-6">
                <div className="space-y-2 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Enter {activePortal === 'donor' ? 'Donor' : 'Hospital'} Access Code
                  </p>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="XXXX-XXXX-XX"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-xl font-mono tracking-[0.2em] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
                    />
                    {isSubmitting && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {error && <p className="text-xs font-bold text-red-500 mt-2">{error}</p>}
                </div>
                <button 
                  type="submit"
                  disabled={!code || isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-white shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  Verify Identity & Proceed
                  <ChevronRight className="h-5 w-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Footer */}
        <div className="text-center">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
            Authorized Personnel Only • 256-Bit Encryption Active
          </p>
        </div>
      </div>
    </div>
  )
}
