"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartPulse, Calendar, Activity, ClipboardCheck, ArrowRight, Thermometer, Droplets, Zap } from 'lucide-react'
import { Modal } from '@/components/Modal'

const NEXT_CHECKS = [
  { label: 'Post-Op Follow-up', date: 'May 24, 2026', hospital: 'Cleveland Clinic', status: 'Upcoming' },
  { label: 'Routine Vitals Sync', date: 'June 12, 2026', hospital: 'Home Kit / Remote', status: 'Scheduled' },
]

export default function HealthPage() {
  const [showDetails, setShowDetails] = useState(false)
  const [showLog, setShowLog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setShowLog(false)
        setSubmitted(false)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Health Check-ins</h1>
          <p className="text-gray-400">Monitoring your wellness after your gift of life.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
          <Activity className="h-4 w-4 animate-pulse" />
          Status: Optimal
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">Upcoming Checks</h2>
          <div className="space-y-4">
            {NEXT_CHECKS.map((check, idx) => (
              <motion.div
                key={check.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111420] border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded text-[10px] font-black uppercase">
                    {check.status}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1">{check.label}</h3>
                <p className="text-xs text-gray-500 mb-4">{check.date} · {check.hospital}</p>
                <button 
                  onClick={() => setShowDetails(true)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Check Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">Health Log</h2>
          <div className="bg-[#111420] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center justify-center h-[calc(100%-3rem)]">
            <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <ClipboardCheck className="h-8 w-8 text-gray-600" />
            </div>
            <p className="text-white font-bold">No issues reported</p>
            <p className="text-gray-500 text-sm mt-1 max-w-[200px]">Everything looks perfect. Continue following your recovery plan.</p>
            <button 
              onClick={() => setShowLog(true)}
              className="mt-6 px-6 py-2 bg-white text-black rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-400 transition-all"
            >
              Submit Daily Log
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)} title="Check-up Details">
        <div className="space-y-6">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Appointment Info</p>
            <p className="text-white font-bold">Post-Op Follow-up</p>
            <p className="text-sm text-gray-400">May 24, 2026 at 10:30 AM</p>
            <p className="text-sm text-gray-400">Cleveland Clinic · Main Building, 4th Floor</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Required Prep</p>
              <p className="text-sm text-white">Fast 12h before</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Duration</p>
              <p className="text-sm text-white">~45 minutes</p>
            </div>
          </div>
          <button 
            onClick={() => setShowDetails(false)}
            className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest"
          >
            Add to Calendar
          </button>
        </div>
      </Modal>

      {/* Daily Log Modal */}
      <Modal isOpen={showLog} onClose={() => setShowLog(false)} title="Daily Health Log">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Energy Levels</label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map(v => (
                  <button type="button" key={v} className="py-2 bg-white/5 border border-white/10 rounded-lg hover:border-blue-500 text-white font-bold">{v}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Symptoms</label>
              <textarea 
                placeholder="Any pain, fatigue, or discomfort?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 min-h-[100px]"
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={isSubmitting || submitted}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
              submitted ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {isSubmitting ? 'Syncing...' : submitted ? 'Logged Successfully' : 'Submit Log'}
          </button>
        </form>
      </Modal>
    </div>
  )
}

