"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ShieldAlert, 
  Terminal, 
  Lock, 
  ChevronRight,
  Fingerprint,
  Cpu
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminGateway() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ADMIN_CODE = 'MEDI-ADMIN-00'

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (code.trim() === ADMIN_CODE) {
      localStorage.setItem('medimatch_admin_access', 'true')
      // Hard redirect for reliability across ports/reloads
      window.location.href = '/'
    } else {
      setError('Unauthorized access code. Event has been logged.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Admin Visual Accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl w-full z-10 space-y-12">
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest"
          >
            <ShieldAlert className="h-3 w-3" /> Secure Administrative Terminal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            COMMAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-glow">CENTER</span>
          </motion.h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm font-medium tracking-wide">
            Restricted access area. Please verify your administrative credentials to initialize the control interface.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Terminal className="h-24 w-24" />
            </div>
            
            <form onSubmit={handleAccess} className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Fingerprint className="h-3 w-3" /> Authorization Key
                  </label>
                  <Cpu className="h-3 w-3 text-red-500/40 animate-pulse" />
                </div>
                <input 
                  type="password" 
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="•••• •••• ••••"
                  className={`w-full bg-white/5 border rounded-2xl px-6 py-5 text-center text-2xl font-mono tracking-[0.4em] focus:outline-none transition-all placeholder:text-gray-800 ${
                    error ? 'border-red-500 animate-shake' : 'border-white/10 focus:border-red-500/50'
                  }`}
                />
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                    >
                      <p className="text-[10px] font-bold text-red-500 text-center uppercase tracking-widest leading-relaxed">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                type="submit"
                disabled={!code || isSubmitting}
                className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/btn shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <>
                    Establish Connection
                    <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center space-y-4">
            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">
              Origin: PORT 3001 | System Root Access Only
            </p>
            {error && (
              <p className="text-[10px] text-gray-500">
                Tip: Ensure you are using zeros (0) instead of the letter 'O'.
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .text-glow {
          text-shadow: 0 0 30px rgba(239, 68, 68, 0.3);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  )
}
