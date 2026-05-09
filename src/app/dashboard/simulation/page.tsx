"use client"

import { useState, useEffect } from 'react'
import { Play, Pause, FastForward, RotateCcw, GitCompare, Heart, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SimulationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<{id: number, time: string, msg: string, type: 'info' | 'success' | 'warning'}[]>([
    { id: 1, time: '00:00', msg: 'Simulation initialized. Ready for organ generation.', type: 'info' }
  ])

  const addLog = () => {
    if (!isRunning) return
    const now = new Date()
    const timeString = `${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    
    const events = [
      { msg: 'New organ (Kidney O+) generated.', type: 'info' as const },
      { msg: 'Traditional System: Waitlisted at regional center.', type: 'warning' as const },
      { msg: 'Intelligent System: Allocated to shadow hospital (Mass General).', type: 'success' as const },
      { msg: 'Decay threshold warning. Re-ranking shadow queue.', type: 'warning' as const },
    ]
    const randomEvent = events[Math.floor(Math.random() * events.length)]
    
    setLogs(prev => [{ id: Date.now(), time: timeString, ...randomEvent }, ...prev].slice(0, 8))
  }

  // Simulation logic: starts/stops the interval based on isRunning state
  useEffect(() => {
    let interval: any
    if (isRunning) {
      interval = setInterval(addLog, 2500)
    }
    return () => clearInterval(interval)
  }, [isRunning, addLog])

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Simulation</h1>
          <p className="text-sm text-muted-foreground">Compare traditional regional allocation vs incentive-aware intelligent routing.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-md">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`p-2 rounded ${isRunning ? 'bg-warning text-warning-foreground' : 'bg-success text-success-foreground hover:bg-success/90'} transition-colors`}
            title={isRunning ? "Pause Simulation" : "Start Simulation"}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button className="p-2 rounded hover:bg-muted text-muted-foreground transition-colors" title="Fast Forward">
            <FastForward className="h-4 w-4" />
          </button>
          <button 
            onClick={() => { setIsRunning(false); setLogs([{ id: Date.now(), time: '00:00', msg: 'Simulation reset.', type: 'info' }]) }}
            className="p-2 rounded hover:bg-muted text-muted-foreground transition-colors" title="Reset Simulation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* Left: Traditional System */}
        <div className="bg-card border border-border rounded-lg flex flex-col opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="p-4 border-b border-border bg-muted/50 flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Traditional Regional System
            </h3>
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded font-mono">Legacy Protocol</span>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center relative">
             <div className="w-full max-w-sm space-y-4">
               {/* Fixed linear queue */}
               <div className="text-center pb-4 border-b border-border border-dashed">
                 <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                 <p className="text-sm font-medium">Waitlist Queue (Linear)</p>
               </div>
               {[1, 2, 3].map((item) => (
                 <div key={item} className="p-3 border border-border rounded bg-background flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Hospital Region {item}</span>
                   <span className="text-xs text-muted-foreground uppercase">Awaiting</span>
                 </div>
               ))}
               <p className="text-xs text-center text-muted-foreground mt-4">Static ranking. No decay awareness. High waste probability.</p>
             </div>
          </div>
        </div>

        {/* Right: Intelligent System */}
        <div className="bg-card border-2 border-primary/20 rounded-lg flex flex-col shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)] relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="p-4 border-b border-border bg-primary/10 flex items-center justify-between z-10 relative">
            <h3 className="font-semibold flex items-center gap-2 text-primary">
              <GitCompare className="h-4 w-4" />
              Intelligent Allocation Engine
            </h3>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded font-mono shadow-[0_0_10px_rgba(59,130,246,0.5)]">MediMatch v2.4</span>
          </div>
          <div className="flex-1 p-6 flex flex-col z-10 relative">
            
            {/* Live Visualization Mock */}
            <div className="flex-1 flex flex-col justify-center gap-6">
              <div className="flex justify-center">
                <motion.div 
                  animate={{ scale: isRunning ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center relative shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                  <Heart className="h-8 w-8 text-primary" />
                  {isRunning && (
                    <>
                      <motion.div className="absolute -inset-4 rounded-full border border-primary/50" animate={{ scale: [1, 1.5], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.div className="absolute -inset-8 rounded-full border border-primary/20" animate={{ scale: [1, 1.2], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                    </>
                  )}
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-primary/30 rounded bg-background/80 flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Primary Match</span>
                  <span className="font-bold text-sm text-primary">Cleveland Clinic</span>
                  <span className="text-[10px] text-muted-foreground mt-1">98% Match · 4m response</span>
                </div>
                <div className="p-3 border border-warning/30 rounded bg-background/80 flex flex-col items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Shadow Match 1</span>
                  <span className="font-bold text-sm text-warning">Mayo Clinic</span>
                  <span className="text-[10px] text-muted-foreground mt-1">94% Match · Standby</span>
                </div>
              </div>
            </div>

            {/* Event Log */}
            <div className="h-32 mt-6 border-t border-border/50 pt-4 relative">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 absolute -top-3 bg-card px-2">Live Engine Logs</h4>
              <div className="space-y-2 overflow-y-hidden h-full relative">
                {/* Gradient fade for top of list */}
                <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-card to-transparent z-10" />
                <AnimatePresence>
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="font-mono text-[10px] text-muted-foreground pt-1 min-w-[35px]">{log.time}</span>
                      <span className={`
                        ${log.type === 'success' ? 'text-success' : ''}
                        ${log.type === 'warning' ? 'text-warning' : ''}
                        ${log.type === 'info' ? 'text-foreground' : ''}
                      `}>
                        {log.msg}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
