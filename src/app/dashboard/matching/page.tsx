"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Network, Activity, Heart, ShieldCheck, Clock, ArrowRight } from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'

// Mock Data
const ACTIVE_ORGAN = { id: 'ORG-7129B', type: 'Liver', bloodType: 'A-' }

const INITIAL_HOSPITALS = [
  { id: 'H1', name: 'Cleveland Clinic', matchScore: 94, distance: '12 mi', status: 'Optimal', factors: { compatibility: 98, urgency: 85, decay: 95, trust: 98 } },
  { id: 'H2', name: 'Mayo Clinic', matchScore: 88, distance: '45 mi', status: 'Viable', factors: { compatibility: 90, urgency: 75, decay: 88, trust: 95 } },
  { id: 'H3', name: 'Mass General', matchScore: 82, distance: '120 mi', status: 'Viable', factors: { compatibility: 85, urgency: 90, decay: 60, trust: 92 } },
  { id: 'H4', name: 'Johns Hopkins', matchScore: 76, distance: '210 mi', status: 'Marginal', factors: { compatibility: 80, urgency: 70, decay: 50, trust: 89 } },
  { id: 'H5', name: 'Stanford Health', matchScore: 65, distance: '400 mi', status: 'Sub-optimal', factors: { compatibility: 60, urgency: 80, decay: 30, trust: 91 } },
]

export default function MatchingPage() {
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS)
  const [selectedHospital, setSelectedHospital] = useState(INITIAL_HOSPITALS[0])
  const [isSimulating, setIsSimulating] = useState(true)

  // Simulate real-time ranking shifts
  useEffect(() => {
    if (!isSimulating) return
    
    const interval = setInterval(() => {
      setHospitals(current => {
        const updated = current.map(h => {
          // Add some random noise to the match score
          const noise = (Math.random() * 4) - 2
          const newScore = Math.max(0, Math.min(100, h.matchScore + noise))
          return { ...h, matchScore: Number(newScore.toFixed(1)) }
        })
        return updated.sort((a, b) => b.matchScore - a.matchScore)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isSimulating])

  // Update selected hospital data when rankings shift to keep side-panel live
  useEffect(() => {
    const updatedSelected = hospitals.find(h => h.id === selectedHospital.id)
    if (updatedSelected) {
      setSelectedHospital(updatedSelected)
    }
  }, [hospitals, selectedHospital.id])

  const radarData = [
    { subject: 'Compatibility', A: selectedHospital.factors.compatibility, fullMark: 100 },
    { subject: 'Urgency', A: selectedHospital.factors.urgency, fullMark: 100 },
    { subject: 'Time Decay (Dist)', A: selectedHospital.factors.decay, fullMark: 100 },
    { subject: 'Trust Score', A: selectedHospital.factors.trust, fullMark: 100 },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success'
    if (score >= 75) return 'text-warning'
    return 'text-destructive'
  }

  const getStatusBg = (status: string) => {
    if (status === 'Optimal') return 'bg-success/20 text-success border-success/30'
    if (status === 'Viable') return 'bg-warning/20 text-warning border-warning/30'
    return 'bg-destructive/20 text-destructive border-destructive/30'
  }

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dynamic Matching Engine</h1>
          <p className="text-sm text-muted-foreground">Interactive network visualization and real-time algorithmic ranking.</p>
        </div>
        <button 
          onClick={() => setIsSimulating(!isSimulating)}
          className={`px-4 py-2 rounded-md text-sm font-medium border flex items-center gap-2 transition-colors ${
            isSimulating ? 'bg-primary/20 text-primary border-primary/30' : 'bg-muted text-muted-foreground border-border'
          }`}
        >
          <Activity className={`h-4 w-4 ${isSimulating ? 'animate-pulse' : ''}`} />
          {isSimulating ? 'Live Processing' : 'Processing Paused'}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Network Visualization Panel */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-muted/30 backdrop-blur-sm z-10">
            <h3 className="font-semibold flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              Allocation Network Graph
            </h3>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-card via-background to-background">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Center Node (Organ) */}
            <motion.div 
              className="absolute z-20 flex flex-col items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/50 shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]">
                <Heart className="h-10 w-10 text-primary animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></div>
              </div>
              <div className="mt-4 text-center bg-card/80 backdrop-blur-sm px-3 py-1 rounded border border-border">
                <p className="font-bold text-sm">{ACTIVE_ORGAN.type}</p>
                <p className="text-xs text-muted-foreground">{ACTIVE_ORGAN.id}</p>
              </div>
            </motion.div>

            {/* Orbiting Hospital Nodes */}
            {hospitals.map((hospital, index) => {
              const angle = (index / hospitals.length) * Math.PI * 2 - Math.PI / 2
              const radius = 180 // Distance from center
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              const isSelected = selectedHospital.id === hospital.id

              // Line thickness based on score
              const strokeWidth = Math.max(1, (hospital.matchScore - 50) / 10)
              const lineOpacity = isSelected ? 0.8 : 0.2

              return (
                <div key={hospital.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Connecting Line SVG */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                    <motion.line
                      x1="50%" y1="50%"
                      x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`}
                      stroke={isSelected ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
                      strokeWidth={strokeWidth}
                      strokeOpacity={lineOpacity}
                      strokeDasharray={isSelected ? "5,5" : "0"}
                      animate={{
                        strokeOpacity: isSelected ? [0.4, 0.8, 0.4] : 0.2,
                        strokeDashoffset: isSelected ? [0, -20] : 0
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>

                  {/* Hospital Node */}
                  <motion.button
                    className={`absolute w-32 flex flex-col items-center pointer-events-auto transition-transform ${isSelected ? 'scale-110 z-30' : 'scale-100 z-10 hover:scale-105'}`}
                    style={{ x, y }}
                    onClick={() => setSelectedHospital(hospital)}
                    layoutId={`node-${hospital.id}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg ${
                      isSelected 
                        ? 'bg-primary border-primary-foreground text-primary-foreground' 
                        : 'bg-card border-border text-foreground hover:border-primary/50'
                    }`}>
                      <Activity className="h-5 w-5" />
                    </div>
                    <div className={`mt-2 text-center p-1.5 rounded backdrop-blur-md ${isSelected ? 'bg-primary/10 border border-primary/20' : 'bg-background/50 border border-transparent'}`}>
                      <p className="text-xs font-bold whitespace-nowrap">{hospital.name}</p>
                      <p className={`text-[10px] font-bold ${getScoreColor(hospital.matchScore)}`}>{hospital.matchScore}% Match</p>
                    </div>
                  </motion.button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Side Panel: Leaderboard & Radar Chart */}
        <div className="flex flex-col gap-6 min-h-0">
          
          {/* Live Leaderboard */}
          <div className="bg-card border border-border rounded-lg p-4 flex flex-col flex-1 min-h-0">
            <h3 className="font-semibold mb-3 flex items-center justify-between">
              Live Rankings
              <span className="text-xs font-normal text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Updating
              </span>
            </h3>
            <div className="overflow-y-auto pr-2 space-y-2 flex-1">
              {hospitals.map((hospital, index) => (
                <motion.div 
                  key={hospital.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  onClick={() => setSelectedHospital(hospital)}
                  className={`p-3 rounded-md border cursor-pointer transition-colors ${
                    selectedHospital.id === hospital.id 
                      ? 'bg-primary/10 border-primary/30 shadow-sm' 
                      : 'bg-background border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm flex items-center gap-2">
                      <span className="text-muted-foreground font-mono text-xs">#{index + 1}</span>
                      {hospital.name}
                    </span>
                    <span className={`text-sm font-bold ${getScoreColor(hospital.matchScore)}`}>
                      {hospital.matchScore}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{hospital.distance}</span>
                    <span className={`px-1.5 py-0.5 rounded border ${getStatusBg(hospital.status)}`}>
                      {hospital.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scoring Factors Radar Chart */}
          <div className="bg-card border border-border rounded-lg p-4 h-72 flex flex-col">
            <h3 className="font-semibold mb-2 flex items-center justify-between text-sm">
              Factor Weighting
              <span className="text-primary">{selectedHospital.name}</span>
            </h3>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.4}
                    isAnimationActive={true}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--primary))' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
