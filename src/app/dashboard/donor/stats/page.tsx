"use client"

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, HeartPulse, Activity, Star } from 'lucide-react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts'

const STATS_DATA = [
  { name: 'Jan', impact: 400 },
  { name: 'Feb', impact: 300 },
  { name: 'Mar', impact: 600 },
  { name: 'Apr', impact: 800 },
  { name: 'May', impact: 500 },
  { name: 'Jun', impact: 900 },
]

const CARDS = [
  { label: 'Lives Impacted', value: '4', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Years Added', value: '142', icon: HeartPulse, color: 'text-red-500', bg: 'bg-red-500/10' },
  { label: 'Network Points', value: '8,400', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { label: 'Global Rank', value: 'Top 2%', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
]

export default function StatsPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Impact Analytics</h1>
        <p className="text-gray-400">Visualizing the real-world difference you've made.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#111420] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all"
          >
            <div className={`h-12 w-12 ${card.bg} rounded-2xl flex items-center justify-center mb-4 border border-white/5`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{card.label}</p>
            <p className="text-3xl font-black text-white mt-1">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111420] border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Community Impact Growth
            </h2>
            <select className="bg-white/5 border border-white/10 text-xs font-bold rounded-lg px-3 py-2 text-gray-400 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STATS_DATA}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#4b5563', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111420', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="impact" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorImpact)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111420] border border-white/5 rounded-3xl p-8 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Regional Benchmarks</h2>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Response Rate', value: 98, color: 'bg-green-500' },
              { label: 'System Trust', value: 94, color: 'bg-blue-500' },
              { label: 'Advocacy Level', value: 85, color: 'bg-purple-500' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span className="text-gray-500">{stat.label}</span>
                  <span className="text-white">{stat.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${stat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-xs text-gray-400 italic">"Your altruism score is in the top 1% of the Northeast region."</p>
          </div>
        </div>
      </div>
    </div>
  )
}
