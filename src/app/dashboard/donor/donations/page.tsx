"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Clock, CheckCircle2, ArrowRight, Heart, Calendar, ShieldCheck } from 'lucide-react'
import { Modal } from '@/components/Modal'

const DONATIONS = [
  {
    id: 'TX-9021',
    type: 'Kidney',
    date: 'Oct 14, 2025',
    recipient: 'Confidential (Region 4)',
    status: 'successful',
    impact: 'Life Restored',
    color: 'text-green-500'
  },
  {
    id: 'TX-8842',
    type: 'Blood Plasma',
    date: 'Jan 12, 2026',
    recipient: 'City General Hospital',
    status: 'completed',
    impact: 'Critical Support',
    color: 'text-blue-500'
  }
]

export default function DonationsPage() {
  const [showUpdate, setShowUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updated, setUpdated] = useState(false)

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      setUpdated(true)
      setTimeout(() => {
        setShowUpdate(false)
        setUpdated(false)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">My Donations</h1>
        <p className="text-gray-400">Tracking the legacy of your generosity.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {DONATIONS.map((donation, idx) => (
          <motion.div
            key={donation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#111420] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Gift className="h-32 w-32" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="h-20 w-20 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                <Heart className="h-10 w-10 text-blue-500" />
              </div>
              
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h2 className="text-xl font-bold text-white">{donation.type} Donation</h2>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {donation.status}
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-6 text-gray-500 text-sm">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {donation.date}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> ID: {donation.id}</span>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Impact Result</p>
                <p className="text-xl font-black text-white uppercase tracking-tighter">{donation.impact}</p>
              </div>

              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors">
                <ArrowRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-2 border-dashed border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 text-center"
        >
          <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center">
            <Gift className="h-8 w-8 text-gray-600" />
          </div>
          <div>
            <p className="text-white font-bold">Register New Donation</p>
            <p className="text-gray-500 text-sm mt-1">Ready to save another life? Update your donor status.</p>
          </div>
          <button 
            onClick={() => setShowUpdate(true)}
            className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]"
          >
            Update Registry
          </button>
        </motion.div>
      </div>

      {/* Registry Update Modal */}
      <Modal isOpen={showUpdate} onClose={() => setShowUpdate(false)} title="Update Donor Registry">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-4">
            <ShieldCheck className="h-6 w-6 text-blue-500 mt-1" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Updating your registry preferences ensures that your medical team has the most accurate information during the allocation process.
            </p>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Select Organs for Future Donation</label>
            <div className="grid grid-cols-2 gap-3">
              {['Heart', 'Liver', 'Kidneys', 'Lungs', 'Pancreas', 'Tissues'].map(organ => (
                <div key={organ} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-white">{organ}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={isUpdating || updated}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
              updated ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {isUpdating ? 'Updating Registry...' : updated ? 'Registry Updated' : 'Confirm Updates'}
          </button>
        </form>
      </Modal>
    </div>
  )
}

