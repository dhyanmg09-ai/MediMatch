"use client"

import { motion } from 'framer-motion'
import { LifeBuoy, MessageSquare, Phone, Mail, Globe, Clock, ChevronRight } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
          <LifeBuoy className="h-3 w-3" /> Support Command Center
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">We're Here to Help</h1>
        <p className="text-gray-400 max-w-xl mx-auto italic">
          "Your generosity is matched by our commitment to your lifelong wellness."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Live Chat', value: 'Instant', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Medical Hotline', value: '24/7 Priority', icon: Phone, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Email Support', value: '1h Response', icon: Mail, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            whileHover={{ y: -5 }}
            className="bg-[#111420] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center group cursor-pointer hover:border-white/20 transition-all"
          >
            <div className={`h-16 w-16 ${card.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <card.icon className={`h-8 w-8 ${card.color}`} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{card.label}</h3>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#111420] border border-white/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Emergency Coordination</h2>
          <p className="text-gray-400 leading-relaxed">
            If you are experiencing a medical emergency related to your donation, please use the red priority hotline on the back of your Donor ID card or contact our emergency coordinator immediately.
          </p>
          <div className="flex flex-wrap gap-4">
             <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                <Globe className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Global Support</span>
             </div>
             <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Always Active</span>
             </div>
          </div>
        </div>
        <div className="w-full md:w-80 space-y-3">
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)] flex items-center justify-center gap-3">
            Start Live Chat <ChevronRight className="h-4 w-4" />
          </button>
          <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3">
            Open Support Ticket
          </button>
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em]">MediMatch Support Backbone v4.1</p>
      </div>
    </div>
  )
}
