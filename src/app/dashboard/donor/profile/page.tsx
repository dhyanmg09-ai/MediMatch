"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, ShieldCheck, Edit3, Camera, Save } from 'lucide-react'
import Image from 'next/image'
import { Modal } from '@/components/Modal'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Arjun Patel',
    email: 'arjun.patel@hospital-net.org',
    phone: '+1 (555) 012-8421',
    location: 'Boston, MA · Northeast Region'
  })
  const [tempProfile, setTempProfile] = useState({ ...profile })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(tempProfile)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-[#111420] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Cover Photo */}
        <div className="h-40 bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#111420_100%)] opacity-40"></div>
        </div>
        
        <div className="px-8 pb-8 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="relative group">
              <div className="h-40 w-40 rounded-full border-8 border-[#0a0c14] overflow-hidden relative shadow-2xl bg-gray-900">
                <Image src="/assets/arjun.png" alt={profile.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 h-8 w-8 bg-green-500 rounded-full border-4 border-[#0a0c14] flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 pb-4 text-center md:text-left">
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{profile.name}</h1>
              <p className="text-blue-500 font-bold uppercase tracking-widest text-xs mt-1">Verified Life-Saver · Member since 2024</p>
            </div>
            
            <button 
              onClick={() => { setTempProfile({...profile}); setIsEditing(true); }}
              className="mb-4 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400 group cursor-default">
                  <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{profile.email}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 group cursor-default">
                  <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 group cursor-default">
                  <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:text-white transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{profile.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">Medical Status</h2>
              <div className="bg-[#0a0c14] border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Blood Type</span>
                  <span className="text-white font-black text-xl">O+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Organ Registry</span>
                  <span className="text-green-500 font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Trust Level</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <ShieldCheck key={i} className={`h-4 w-4 ${i <= 4 ? 'text-blue-500' : 'text-gray-700'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Update Profile">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Full Name</label>
              <input 
                type="text" 
                value={tempProfile.name}
                onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Email Address</label>
              <input 
                type="email" 
                value={tempProfile.email}
                onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Phone Number</label>
              <input 
                type="text" 
                value={tempProfile.phone}
                onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Location</label>
              <input 
                type="text" 
                value={tempProfile.location}
                onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-3"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  )
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

