"use client"

import { motion } from 'framer-motion'
import { Settings, Bell, Lock, User, Globe, Shield } from 'lucide-react'

export default function PreferencesPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Portal Preferences</h1>
        <p className="text-gray-400">Customize your security and communication settings.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[
          { label: 'Notification Settings', desc: 'Manage impact updates and health reminders.', icon: Bell },
          { label: 'Privacy & Visibility', desc: 'Control how your stories and impact stats are shared.', icon: Globe },
          { label: 'Security & Access', desc: 'Update your secondary verification methods.', icon: Shield },
          { label: 'Personal Information', desc: 'Sync your data with regional medical centers.', icon: User },
        ].map((pref, idx) => (
          <motion.div
            key={pref.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#111420] border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-white/20 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:text-blue-500 transition-colors">
                <pref.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">{pref.label}</h3>
                <p className="text-sm text-gray-500">{pref.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 group-hover:bg-blue-500/20 transition-all">
                 <div className="w-4 h-4 bg-gray-500 rounded-full absolute right-1"></div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-3xl">
        <h3 className="text-red-500 font-bold flex items-center gap-2 mb-2">
          <Lock className="h-4 w-4" /> Danger Zone
        </h3>
        <p className="text-sm text-gray-500 mb-4">Requesting to withdraw from the organ registry requires formal medical consultation.</p>
        <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all">
          Request Consultation
        </button>
      </div>
    </div>
  )
}
