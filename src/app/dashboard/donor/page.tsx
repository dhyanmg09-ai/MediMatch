"use client"

import { useState } from 'react'
import { 
  Heart, 
  Users, 
  Gift, 
  Activity, 
  ChevronRight, 
  Bell, 
  MapPin, 
  CheckCircle2, 
  UserPlus, 
  Download, 
  Calendar,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Info,
  ArrowRight,
  Quote
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

// Custom Organ Icons
const LiverIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3c-4.5 0-9 2-9 6s4.5 9 9 9 9-5 9-9-4.5-6-9-6Z" />
    <path d="M12 18c-2 0-4-1-4-3" />
  </svg>
)

const KidneyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 3c-2 0-4 2-4 5s2 7 4 7 4-2 4-5-2-7-4-7Z" />
    <path d="M16 9c-2 0-4 2-4 5s2 7 4 7 4-2 4-5-2-7-4-7Z" />
  </svg>
)

const LungsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 3c-2 0-4 3-4 7s2 11 4 11 4-3 4-7-2-11-4-11Z" />
    <path d="M17 3c-2 0-4 3-4 7s2 11 4 11 4-3 4-7-2-11-4-11Z" />
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
    <div className="space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Arjun 👋</h1>
          <p className="text-muted-foreground">Thank you for being a life-saver.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">3</span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">Arjun Patel</p>
              <p className="text-xs text-muted-foreground">Donor ID: DON-84219</p>
            </div>
            <div className="relative h-10 w-10 rounded-full border-2 border-primary/20 overflow-hidden">
              <Image src="/assets/arjun.png" alt="Arjun" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Lives You've Helped", value: "2", icon: Heart, color: "text-green-500", bg: "bg-green-500/10", detail: "People received a second chance thanks to you." },
          { label: "Donations Made", value: "2", icon: Gift, color: "text-blue-500", bg: "bg-blue-500/10", detail: "You've registered 2 organ donations." },
          { label: "Organs Donated", value: "5", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10", detail: "Total organs donated across 2 donations." },
          { label: "Lives Impacted", value: "5+", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10", detail: "Lives positively impacted by your generosity." },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{stat.detail}</p>
            <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              View Details <ChevronRight className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 units) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Donation Summary */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">My Donation Summary</h2>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">
                All Donations Successful
              </span>
            </div>
            <div className="space-y-6">
              {DONATIONS.map((donation, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-primary/20 pb-6 last:pb-0">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <p className="font-bold">{donation.date}</p>
                        <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">{donation.id}</p>
                        <span className="text-[10px] uppercase font-bold text-green-500 tracking-wider">Completed</span>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {donation.organs.map((organ, j) => (
                          <div key={j} className="flex flex-col items-center gap-1">
                            <div className={`p-2 rounded-lg bg-muted ${organ.color}`}>
                              <organ.icon className="h-5 w-5" />
                            </div>
                            <span className="text-[10px] text-muted-foreground font-medium">{organ.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:text-right">
                      <div>
                        <p className="text-xs text-muted-foreground">Hospital</p>
                        <p className="text-sm font-bold">{donation.hospital}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Lives Helped</p>
                        <p className="text-sm font-bold text-primary">{donation.livesHelped}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors border-t border-border pt-4">
              View All Donations →
            </button>
          </div>

          {/* Impact Over Time */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Your Impact Over Time</h2>
                <p className="text-xs text-muted-foreground">Visualizing your life-saving journey</p>
              </div>
              <select className="bg-muted text-xs font-bold px-3 py-1.5 rounded-md border-none focus:ring-1 ring-primary">
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#888', fontSize: 12}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#888', fontSize: 12}} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" align="right" height={36}/>
                  <Line 
                    type="monotone" 
                    dataKey="lives" 
                    name="Lives Helped" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#3b82f6' }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="organs" 
                    name="Organs Donated" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#10b981' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transplant Stories */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
              <div className="p-6 pb-2 flex justify-between items-center">
                <h2 className="text-xl font-bold">Transplant Stories</h2>
                <button className="text-xs font-bold text-primary hover:underline">See All Stories →</button>
              </div>
              <div className="flex-1 p-6 pt-2">
                <div className="relative group">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeStory}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-muted/50 rounded-xl p-4 border border-border"
                    >
                      <div className="flex gap-4 mb-4">
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={STORIES[activeStory].image} alt={STORIES[activeStory].name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold">{STORIES[activeStory].name}</p>
                          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{STORIES[activeStory].role}</span>
                          <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">
                            "{STORIES[activeStory].quote}"
                          </p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-primary flex items-center gap-1">
                        Read {STORIES[activeStory].name.split("'")[0]}'s Story <ArrowRight className="h-3 w-3" />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex justify-center gap-2 mt-4">
                    {STORIES.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveStory(i)}
                        className={`h-1.5 rounded-full transition-all ${i === activeStory ? 'w-6 bg-primary' : 'w-1.5 bg-muted'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Did You Know? */}
            <div className="bg-gradient-to-br from-card to-primary/5 border border-border rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <Info className="h-32 w-32" />
              </div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Did You Know?
              </h2>
              <div className="space-y-4 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                    <Heart className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    One organ donor can save <span className="text-green-500 font-bold">up to 8 lives</span>. Your decision creates a ripple effect of hope.
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Users key={i} className={`h-4 w-4 ${i <= 5 ? 'text-primary' : 'text-muted'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 units) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Real-time Impact Map */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
            <div className="p-5 pb-0 flex justify-between items-center">
              <h2 className="text-lg font-bold">Real-time Impact</h2>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="relative h-[200px] w-full mt-4 bg-muted/30">
              {/* Mock Map Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 200">
                  <path d="M50 50 Q100 20 150 80 T250 40 T350 90" stroke="currentColor" fill="none" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="150" cy="80" r="4" fill="currentColor" />
                  <circle cx="250" cy="40" r="4" fill="currentColor" />
                </svg>
              </div>
              {/* Live Status Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="bg-background/80 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Liver Donated Successfully</p>
                      <p className="text-[10px] text-muted-foreground mb-2">Today, 09:15 AM</p>
                      <p className="text-xs leading-tight text-muted-foreground">Your liver donation has been successfully transplanted to a patient in need.</p>
                      <button className="text-xs font-bold text-primary mt-2 hover:underline">View Details →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-1">Quick Actions</h2>
            {[
              { icon: Calendar, label: "Update My Availability", detail: "Let us know if your availability has changed" },
              { icon: ShieldCheck, label: "Health Check-in", detail: "Share your latest health information" },
              { icon: UserPlus, label: "Refer a Friend", detail: "Encourage others to be life-savers" },
              { icon: Download, label: "Download Donor Card", detail: "Show your commitment wherever you go" },
            ].map((action, i) => (
              <button 
                key={i}
                className="w-full flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:bg-muted/50 hover:border-primary/50 transition-all text-left group"
              >
                <div className="p-2.5 rounded-lg bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{action.label}</p>
                  <p className="text-[10px] text-muted-foreground">{action.detail}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>

          {/* Quote Section */}
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform">
              <Quote className="h-24 w-24" />
            </div>
            <Quote className="h-6 w-6 text-indigo-500 mb-4" />
            <p className="text-sm font-medium italic leading-relaxed text-foreground/80">
              "The best way to find yourself is to lose yourself in the service of others."
            </p>
            <p className="text-xs font-bold text-indigo-500 mt-4">— Mahatma Gandhi</p>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="w-full p-8 rounded-2xl bg-gradient-to-r from-blue-600/20 via-primary/10 to-indigo-600/20 border border-primary/20 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] shadow-inner" />
        <h2 className="text-2xl font-bold mb-2 relative z-10">Your generosity is changing lives every day.</h2>
        <p className="text-muted-foreground max-w-xl mx-auto relative z-10">
          Thank you for being a part of something bigger than us all. Together we are closing the gap in organ allocation.
        </p>
      </motion.div>
    </div>
  )
}
