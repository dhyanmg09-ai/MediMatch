"use client"

import { motion } from 'framer-motion'
import { Bell, Heart, ShieldCheck, Mail, Info, Trash2 } from 'lucide-react'

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Donation Match Success",
    description: "Your kidney donation (TX-9021) has been successfully matched and transplanted. Check stories for updates.",
    time: "2h ago",
    type: "success",
    icon: Heart
  },
  {
    id: 2,
    title: "Security Update",
    description: "Your access code has been verified and your profile trust score increased to 94%.",
    time: "5h ago",
    type: "info",
    icon: ShieldCheck
  },
  {
    id: 3,
    title: "New Recipient Message",
    description: "You have received a new thank you note from Elena R.",
    time: "1d ago",
    type: "mail",
    icon: Mail
  }
]

export default function NotificationsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Notification Center</h1>
          <p className="text-gray-400">Stay updated on your impact and account status.</p>
        </div>
        <button className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center gap-2">
          <Trash2 className="h-4 w-4" /> Clear All
        </button>
      </div>

      <div className="space-y-4">
        {NOTIFICATIONS.map((note, idx) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#111420] border border-white/5 rounded-2xl p-6 flex items-start gap-6 hover:border-white/10 transition-all group"
          >
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
              note.type === 'success' ? 'bg-green-500/10 text-green-500' :
              note.type === 'info' ? 'bg-blue-500/10 text-blue-500' :
              'bg-purple-500/10 text-purple-500'
            }`}>
              <note.icon className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between">
                <h3 className="font-bold text-white">{note.title}</h3>
                <span className="text-[10px] text-gray-600 font-bold uppercase">{note.time}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{note.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
