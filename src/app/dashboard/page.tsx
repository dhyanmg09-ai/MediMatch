"use client"

import { useState, useEffect } from 'react'
import { Heart, Activity, Clock, ShieldAlert, CheckCircle2, XCircle, AlertCircle, TrendingDown, Network } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock Data
const INITIAL_ORGANS = [
  {
    id: 'ORG-8392A',
    type: 'Heart',
    bloodType: 'O+',
    extractionTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    maxViabilityHours: 6,
    status: 'pending',
    primaryHospital: { name: 'Mass General', status: 'pending', timeGiven: '10m', trust: 92 },
    shadowHospitals: [
      { name: 'Brigham Women\'s', status: 'standby', trust: 88, rank: 2 },
      { name: 'Tufts Medical', status: 'standby', trust: 85, rank: 3 },
    ]
  },
  {
    id: 'ORG-7129B',
    type: 'Liver',
    bloodType: 'A-',
    extractionTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    maxViabilityHours: 12,
    status: 'accepted',
    primaryHospital: { name: 'Cleveland Clinic', status: 'accepted', timeGiven: '2m', trust: 98 },
    shadowHospitals: [
      { name: 'Mayo Clinic', status: 'bypassed', trust: 95, rank: 2 },
    ]
  },
  {
    id: 'ORG-9921C',
    type: 'Kidney',
    bloodType: 'B+',
    extractionTime: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    maxViabilityHours: 36,
    status: 'rejected',
    primaryHospital: { name: 'UCSF Medical', status: 'rejected', timeGiven: '45m', trust: 76 },
    shadowHospitals: [
      { name: 'Stanford Health', status: 'escalated', trust: 91, rank: 1 },
      { name: 'Cedars-Sinai', status: 'standby', trust: 89, rank: 2 },
    ]
  }
]

function DecayTimer({ extractionTime, maxHours }: { extractionTime: string, maxHours: number }) {
  const [viability, setViability] = useState(100)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const updateTimer = () => {
      const start = new Date(extractionTime).getTime()
      const now = new Date().getTime()
      const elapsed = now - start
      const maxMs = maxHours * 60 * 60 * 1000
      
      const remainingMs = Math.max(0, maxMs - elapsed)
      const percent = Math.max(0, (remainingMs / maxMs) * 100)
      
      setViability(percent)

      const hrs = Math.floor(remainingMs / (1000 * 60 * 60))
      const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))
      setTimeLeft(`${hrs}h ${mins}m`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [extractionTime, maxHours])

  const getColor = (v: number) => {
    if (v > 60) return 'bg-success'
    if (v > 30) return 'bg-warning'
    return 'bg-destructive'
  }

  const getTextColor = (v: number) => {
    if (v > 60) return 'text-success'
    if (v > 30) return 'text-warning'
    return 'text-destructive'
  }

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground flex items-center gap-1">
          <TrendingDown className="h-3 w-3" />
          Viability Decay
        </span>
        <span className={`${getTextColor(viability)} font-bold flex items-center gap-1`}>
          <Clock className="h-3 w-3" />
          {timeLeft} left
        </span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${getColor(viability)}`}
          initial={{ width: '100%' }}
          animate={{ width: `${viability}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [organs] = useState(INITIAL_ORGANS)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Allocations</h1>
          <p className="text-sm text-muted-foreground">Real-time monitoring of organ viability and hospital responses.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-muted text-foreground rounded-md text-sm font-medium border border-border flex items-center gap-2 hover:bg-muted/80">
            <ShieldAlert className="h-4 w-4" />
            Filter Critical
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="xl:col-span-2 space-y-4">
          <AnimatePresence>
            {organs.map((organ) => (
              <motion.div 
                key={organ.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-lg p-5 shadow-sm relative overflow-hidden"
              >
                {/* Status Indicator Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  organ.status === 'accepted' ? 'bg-success' : 
                  organ.status === 'rejected' ? 'bg-destructive' : 'bg-warning'
                }`} />

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left Column: Organ Details */}
                  <div className="w-full md:w-1/3 space-y-4 border-r border-border pr-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-destructive" />
                          <h2 className="text-xl font-bold">{organ.type}</h2>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono mt-1">{organ.id}</p>
                      </div>
                      <div className="px-2 py-1 bg-muted rounded text-xs font-bold border border-border">
                        {organ.bloodType}
                      </div>
                    </div>
                    
                    <DecayTimer extractionTime={organ.extractionTime} maxHours={organ.maxViabilityHours} />
                  </div>

                  {/* Right Column: Allocation Flow */}
                  <div className="w-full md:w-2/3 flex flex-col justify-center space-y-4">
                    {/* Primary Hospital */}
                    <div className={`p-3 rounded-md border ${
                      organ.status === 'accepted' ? 'bg-success/10 border-success/20' :
                      organ.status === 'rejected' ? 'bg-destructive/10 border-destructive/20 opacity-60' :
                      'bg-warning/10 border-warning/30'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Primary Target</span>
                        {organ.status === 'pending' && <span className="text-xs font-mono text-warning animate-pulse">Awaiting Response ({organ.primaryHospital.timeGiven})</span>}
                        {organ.status === 'accepted' && <span className="text-xs font-bold text-success flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Accepted</span>}
                        {organ.status === 'rejected' && <span className="text-xs font-bold text-destructive flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</span>}
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="font-semibold text-lg">{organ.primaryHospital.name}</span>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">Trust Score</span>
                          <p className="text-sm font-bold text-primary">{organ.primaryHospital.trust}/100</p>
                        </div>
                      </div>
                    </div>

                    {/* Shadow Hospitals */}
                    {organ.shadowHospitals.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                          <Network className="h-3 w-3" /> Shadow Queue
                        </span>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {organ.shadowHospitals.map((shadow, idx) => (
                            <div key={idx} className={`min-w-[200px] p-2 rounded border border-border bg-card text-xs ${shadow.status === 'escalated' ? 'ring-1 ring-primary border-primary' : ''}`}>
                              <div className="flex justify-between mb-1">
                                <span className="font-medium truncate">{shadow.name}</span>
                                <span className="text-muted-foreground">#{shadow.rank}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className={`text-[10px] px-1.5 rounded-sm uppercase tracking-wider font-bold ${
                                  shadow.status === 'escalated' ? 'bg-primary/20 text-primary' :
                                  shadow.status === 'bypassed' ? 'bg-muted text-muted-foreground' : 'bg-muted text-foreground'
                                }`}>
                                  {shadow.status}
                                </span>
                                <span className="text-[10px] text-muted-foreground">T: {shadow.trust}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              System Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Active Allocations</span>
                <span className="text-xl font-bold">14</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Avg. Match Time</span>
                <span className="text-xl font-bold text-success">14m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Decay Loss Rate</span>
                <span className="text-xl font-bold text-warning">2.4%</span>
              </div>
            </div>
          </div>

          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-5">
            <h3 className="font-semibold text-destructive flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4" />
              Critical Alerts (2)
            </h3>
            <ul className="space-y-3 mt-4">
              <li className="text-sm border-l-2 border-destructive pl-3">
                <p className="font-medium">ORG-8392A (Heart)</p>
                <p className="text-muted-foreground text-xs">Approaching 60% decay threshold. Immediate response required.</p>
              </li>
              <li className="text-sm border-l-2 border-warning pl-3">
                <p className="font-medium">Network Latency</p>
                <p className="text-muted-foreground text-xs">UCSF Medical responding 400ms slower than average.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
