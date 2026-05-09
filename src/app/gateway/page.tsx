"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  Activity, 
  Lock, 
  ChevronRight,
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

    // SNAPPY AUTH: No artificial delays
    if (activePortal && code.trim() === CODES[activePortal]) {
      // Set access keys
      localStorage.setItem(`medimatch_${activePortal}_access`, 'true')
      
      // Use window.location.href for a HARD REDIRECT to ensure the layout properly detects the new localStorage state
      // This prevents the "not unlocking" bug caused by Next.js client-side navigation race conditions
      window.location.href = activePortal === 'donor' ? '/dashboard/donor' : '/dashboard'
    } else {
      setError('Invalid Access Code. Please check and try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl w-full z-10 space-y-12">
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
          >
            <Lock className="h-3 w-3" /> System Access Control
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            MediMatch <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Gatekeeper</span>
          </motion.h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Select your authorized role and enter your unique code to unlock the portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setActivePortal('donor'); setCode(''); setError(''); }}
            className={`group relative p-8 rounded-3xl border transition-all cursor-pointer ${
              activePortal === 'donor' 
                ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_50px_-10px_rgba(59,130,246,0.4)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg">
                <Fingerprint className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Donor Access</h2>
              <p className="text-sm text-gray-400">Impact tracking & donation management.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setActivePortal('hospital'); setCode(''); setError(''); }}
            className={`group relative p-8 rounded-3xl border transition-all cursor-pointer ${
              activePortal === 'hospital' 
                ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_50px_-10px_rgba(99,102,241,0.4)]' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Hospital Access</h2>
              <p className="text-sm text-gray-400">Clinical allocation & matching engine.</p>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {activePortal && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleAccess} className="space-y-6">
                <div className="space-y-2">
                  <input 
                    type="text" 
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="ENTER ACCESS CODE"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-center text-2xl font-mono tracking-[0.3em] focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-800"
                  />
                  {error && <p className="text-sm font-bold text-red-500 text-center">{error}</p>}
                </div>
                <button 
                  type="submit"
                  disabled={!code || isSubmitting}
                  className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-blue-400 transition-all disabled:opacity-30 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? 'Decrypting...' : 'Unlock Portal'}
                  <ChevronRight className="h-5 w-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
