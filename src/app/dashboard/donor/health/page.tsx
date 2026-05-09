"use client"

import { motion } from 'framer-motion'
import { HeartPulse, Calendar, Activity, ClipboardCheck, ArrowRight } from 'lucide-react'

const NEXT_CHECKS = [
  { label: 'Post-Op Follow-up', date: 'May 24, 2026', hospital: 'Cleveland Clinic', status: 'Upcoming' },
  { label: 'Routine Vitals Sync', date: 'June 12, 2026', hospital: 'Home Kit / Remote', status: 'Scheduled' },
]

export default function HealthPage() {
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
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-colors">
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
            <button className="mt-6 px-6 py-2 bg-white text-black rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-400 transition-all">
              Submit Daily Log
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
