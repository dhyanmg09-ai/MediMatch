"use client"

import { useState } from 'react'
import { 
  Heart, 
  Users, 
  Gift, 
  Activity, 
  ChevronRight, 
  MapPin, 
  CheckCircle2, 
  UserPlus, 
  Download, 
  Calendar,
  ShieldCheck,
  TrendingUp,
  Info,
  ArrowRight,
  Quote,
  Clock,
  ChevronDown,
  HeartPulse
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts'
import Image from 'next/image'

// Custom Organ Icons to match image colors
const LiverIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3c-4.5 0-9 2-9 6s4.5 9 9 9 9-5 9-9-4.5-6-9-6Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 18c-2 0-4-1-4-3" />
  </svg>
)

const KidneyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 3c-2 0-4 2-4 5s2 7 4 7 4-2 4-5-2-7-4-7Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M16 9c-2 0-4 2-4 5s2 7 4 7 4-2 4-5-2-7-4-7Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
)

const LungsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 3c-2 0-4 3-4 7s2 11 4 11 4-3 4-7-2-11-4-11Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M17 3c-2 0-4 3-4 7s2 11 4 11 4-3 4-7-2-11-4-11Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
)

const CHART_DATA = [
  { name: 'Jan', lives: 0, organs: 0 },
  { name: 'Feb', lives: 2, organs: 1 },
  { name: 'Mar', lives: 3, organs: 2 },
  { name: 'Apr', lives: 5, organs: 4 },
  { name: 'May', lives: 6, organs: 5 },
]

const DONATIONS = [
  {
    date: '20 May 2024',
    id: 'DON-2024-0051',
    status: 'Completed',
    hospital: 'City Hospital, Mumbai',
    livesHelped: 3,
    organs: [
      { name: 'Liver', icon: LiverIcon, color: 'text-orange-500' },
      { name: 'Kidneys (2)', icon: KidneyIcon, color: 'text-purple-500' },
      { name: 'Heart', icon: Heart, color: 'text-red-500' },
      { name: 'Lungs', icon: LungsIcon, color: 'text-blue-500' },
    ]
  },
  {
    date: '02 Jan 2024',
    id: 'DON-2024-0007',
    status: 'Completed',
    hospital: 'City Medical Center',
    livesHelped: 2,
    organs: [
      { name: 'Kidney', icon: KidneyIcon, color: 'text-purple-500' },
    ]
  }
]

const STORIES = [
  {
    id: 1,
    name: "Neha's New Beginning",
    role: "Liver Recipient",
    image: "/assets/neha.png",
    quote: "Thanks to my donor, I got a second chance at life. I'm forever grateful."
  },
  {
    id: 2,
    name: "Rahul's Heart Story",
    role: "Heart Recipient",
    image: "/assets/neha.png", // Reusing for demo
    quote: "Every beat of my heart is a reminder of the selfless gift I received."
  }
]

export default function DonorDashboard() {
  const [activeStory, setActiveStory] = useState(0)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Arjun 👋</h2>
        <p className="text-sm text-gray-400 mt-1">Thank you for being a life-saver.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Lives You've Helped", value: "2", icon: Heart, color: "text-green-500", bg: "bg-green-500/10", detail: "People received a second chance thanks to you.", action: "View My Donations" },
          { label: "Donations Made", value: "2", icon: Gift, color: "text-blue-500", bg: "bg-blue-500/10", detail: "You've registered 2 organ donations.", action: "View History" },
          { label: "Organs Donated", value: "5", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10", detail: "Total organs donated across 2 donations.", action: "See Details" },
          { label: "Lives Impacted", value: "5+", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10", detail: "Lives positively impacted by your generosity.", action: "How It Works" },
        ].map((stat, i) => (
          <div 
            key={i}
            className="bg-[#111624] border border-gray-800/40 rounded-xl p-6 relative overflow-hidden group hover:border-gray-700 transition-all shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">{stat.detail}</p>
            <button className="text-xs font-bold text-blue-400 flex items-center gap-2 group-hover:gap-3 transition-all">
              {stat.action} <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* My Donation Summary */}
          <div className="bg-[#111624] border border-gray-800/40 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">My Donation Summary</h3>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-lg border border-green-500/20 uppercase tracking-widest">
                All Donations Successful
              </span>
            </div>
            <div className="space-y-10">
              {DONATIONS.map((donation, i) => (
                <div key={i} className="flex flex-col md:flex-row justify-between gap-6 pb-10 border-b border-gray-800/30 last:border-0 last:pb-0">
                  <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-lg">{donation.date}</p>
                      <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Donation ID: {donation.id}</span>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded uppercase tracking-wider">Completed</span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Organs Donated</p>
                      <div className="flex flex-wrap gap-4">
                        {donation.organs.map((organ, j) => (
                          <div key={j} className="flex flex-col items-center gap-1.5 group cursor-help">
                            <div className={`p-2.5 rounded-xl bg-[#161b2b] border border-gray-800/50 ${organ.color} group-hover:scale-110 transition-transform`}>
                              <organ.icon className="h-5 w-5" />
                            </div>
                            <span className="text-[9px] text-gray-500 font-bold uppercase">{organ.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-12 md:text-right">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Hospital</p>
                      <p className="text-sm font-bold text-gray-200">{donation.hospital}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Lives Helped</p>
                      <p className="text-lg font-bold text-white">{donation.livesHelped}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-xs font-bold text-blue-400 hover:bg-blue-400/5 rounded-xl border border-blue-400/20 transition-all">
              View All Donations →
            </button>
          </div>

          {/* Your Impact Over Time */}
          <div className="bg-[#111624] border border-gray-800/40 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold">Your Impact Over Time</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Growth of your contribution</p>
              </div>
              <div className="flex items-center gap-2 bg-[#161b2b] border border-gray-800 p-1 rounded-lg">
                <span className="text-[10px] font-bold px-3 text-gray-300">This Year</span>
                <ChevronDown className="h-3 w-3 text-gray-500 mr-2" />
              </div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#4b5563', fontSize: 10, fontWeight: 700}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#4b5563', fontSize: 10, fontWeight: 700}} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111624', border: '1px solid #1f2937', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" align="center" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#4b5563' }}/>
                  <Line 
                    type="monotone" 
                    dataKey="lives" 
                    name="Lives Helped" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#10b981', strokeWidth: 0 }} 
                    activeDot={{ r: 8, strokeWidth: 0 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="organs" 
                    name="Organs Donated" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transplant Stories & Did You Know? Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Transplant Stories */}
            <div className="bg-[#111624] border border-gray-800/40 rounded-2xl p-8 shadow-xl flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Transplant Stories</h3>
                <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">See All Stories →</button>
              </div>
              <div className="flex-1 bg-[#161b2b] border border-gray-800/50 rounded-2xl p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <HeartPulse className="h-32 w-32" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeStory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-700 shadow-2xl">
                      <Image src={STORIES[activeStory].image} alt={STORIES[activeStory].name} fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-lg">{STORIES[activeStory].name}</p>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[9px] font-bold rounded uppercase tracking-wider">{STORIES[activeStory].role}</span>
                      <p className="text-xs text-gray-400 italic leading-relaxed pt-2">
                        "{STORIES[activeStory].quote}"
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-6 flex justify-between items-center">
                  <button className="text-[10px] font-bold text-blue-400 flex items-center gap-1">
                    Read {STORIES[activeStory].name.split("'")[0]}'s Story <ArrowRight className="h-3 w-3" />
                  </button>
                  <div className="flex gap-2">
                    {STORIES.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveStory(i)}
                        className={`h-1.5 rounded-full transition-all ${i === activeStory ? 'w-6 bg-blue-500' : 'w-1.5 bg-gray-700'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Did You Know? */}
            <div className="bg-[#111624] border border-gray-800/40 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 opacity-5 text-green-500">
                <Activity className="h-48 w-48" />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Info className="h-5 w-5 text-green-500" />
                Did You Know?
              </h3>
              <div className="bg-[#161b2b] border border-gray-800/50 rounded-2xl p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                    <Heart className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    One organ donor can save <span className="text-green-500 font-bold">Up to 8 lives</span>. Your decision creates a ripple effect of hope.
                  </p>
                </div>
                <div className="flex gap-3 pt-2 justify-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Users key={i} className={`h-5 w-5 ${i <= 6 ? 'text-green-500/80' : 'text-gray-700'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Real-time Impact */}
          <div className="bg-[#111624] border border-gray-800/40 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">Real-time Impact</h3>
              <span className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                Live
              </span>
            </div>
            <div className="h-48 bg-[#0a0c14] relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
              {/* Mock Map Dotted Line */}
              <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 200 100">
                <path d="M40 80 Q100 20 160 50" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />
                <circle cx="40" cy="80" r="3" fill="#ef4444" className="animate-pulse" />
                <circle cx="160" cy="50" r="3" fill="#10b981" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="bg-[#111624]/90 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-2xl translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white mb-0.5">Liver Donated Successfully</p>
                      <p className="text-[9px] text-gray-500 mb-2 font-bold uppercase tracking-wider">Today, 09:15 AM</p>
                      <p className="text-[10px] leading-relaxed text-gray-400">Your liver donation has been successfully transplanted to a patient in need.</p>
                      <button className="text-[10px] font-bold text-blue-400 mt-3 flex items-center gap-1 group-hover:underline">View Details <ArrowRight className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-2">Quick Actions</h3>
            {[
              { icon: Calendar, label: "Update My Availability", detail: "Let us know if your availability has changed" },
              { icon: ShieldCheck, label: "Health Check-in", detail: "Share your latest health information" },
              { icon: UserPlus, label: "Refer a Friend", detail: "Encourage others to be life-savers" },
              { icon: Download, label: "Download Donor Card", detail: "Show your commitment wherever you go" },
            ].map((action, i) => (
              <button 
                key={i}
                className="w-full flex items-center gap-4 p-5 bg-[#111624] border border-gray-800/40 rounded-2xl hover:border-blue-500/30 hover:bg-[#161b2b] transition-all text-left group shadow-lg"
              >
                <div className="p-3 rounded-xl bg-[#161b2b] border border-gray-800/50 text-gray-500 group-hover:text-blue-400 group-hover:border-blue-400/20 transition-all">
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{action.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{action.detail}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          {/* Quote Section */}
          <div className="bg-[#111624] border border-gray-800/40 rounded-2xl p-8 relative overflow-hidden group shadow-xl">
            <div className="absolute right-0 top-0 p-8 opacity-[0.03] text-blue-500 group-hover:scale-110 transition-transform duration-1000">
              <Quote className="h-32 w-32" />
            </div>
            <div className="relative z-10">
              <Quote className="h-8 w-8 text-blue-500/20 mb-6" />
              <p className="text-sm font-medium italic leading-relaxed text-gray-300">
                "The best way to find yourself is to lose yourself in the service of others."
              </p>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">— Mahatma Gandhi</p>
                <div className="h-8 w-8 rounded-full border border-gray-800 flex items-center justify-center text-blue-500/20">
                  <Heart className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Visual Banner */}
      <div className="relative rounded-3xl overflow-hidden mt-12 bg-gradient-to-r from-blue-600/10 via-blue-900/10 to-blue-600/10 border border-blue-500/20 p-12 text-center group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-700">Your generosity is changing lives every day.</h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Thank you for being a part of something bigger than us all. Together we are closing the gap in organ allocation and giving people a second chance at life.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  )
}
