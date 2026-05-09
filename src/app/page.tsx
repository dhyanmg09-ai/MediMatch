"use client"

import { useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sliders, Save, RotateCcw, ShieldAlert, Terminal, Lock, Activity, ShieldCheck, Bell, Cpu, Globe, Database, Wifi, FileText, Search, Download } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const healthData = [
  { time: '14:00', cpu: 45, latency: 12, requests: 2400 },
  { time: '14:15', cpu: 52, latency: 15, requests: 2800 },
  { time: '14:30', cpu: 48, latency: 14, requests: 2600 },
  { time: '14:45', cpu: 65, latency: 22, requests: 4200 },
  { time: '15:00', cpu: 58, latency: 18, requests: 3800 },
  { time: '15:15', cpu: 50, latency: 16, requests: 3100 },
]

const auditLogs = [
  { id: 1, event: 'Weight Change', user: 'Admin_Alpha', detail: 'Compatibility increased to 45%', time: '10 mins ago', status: 'SUCCESS' },
  { id: 2, event: 'Node Restart', user: 'SYSTEM', detail: 'Region East-01 rebooted', time: '25 mins ago', status: 'SUCCESS' },
  { id: 3, event: 'Alert Triggered', user: 'Engine_v2', detail: 'Latency spike in West-02', time: '42 mins ago', status: 'WARNING' },
  { id: 4, event: 'User Login', user: 'Admin_Beta', detail: 'Session established from 192.168.1.5', time: '1 hour ago', status: 'SUCCESS' },
  { id: 5, event: 'Database Backup', user: 'SYSTEM', detail: 'Snapshot COMP-992 created', time: '3 hours ago', status: 'SUCCESS' },
]

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'controls' | 'health' | 'audit'>('controls')
  const [weights, setWeights] = useState({
    compatibility: 40,
    urgency: 30,
    decay: 20,
    trust: 10
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useLayoutEffect(() => {
    const checkAccess = () => {
      const hasAccess = localStorage.getItem('medimatch_admin_access') === 'true'
      if (!hasAccess) {
        window.location.href = '/gateway'
      } else {
        setIsAuthorized(true)
      }
    }
    
    checkAccess()
  }, [])

  if (!isAuthorized) return null;

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  return (
    <div className="min-h-screen bg-[#050505] flex text-foreground">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col sticky top-0 h-screen shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border gap-2 text-primary">
          <Lock className="h-6 w-6" />
          <span className="font-bold text-lg text-foreground">MediMatch</span>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          <button 
            onClick={() => setActiveTab('controls')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'controls' ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Sliders className="h-5 w-5" />
            Global Controls
          </button>
          <button 
            onClick={() => setActiveTab('health')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'health' ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Activity className="h-5 w-5" />
            System Health
          </button>
          <button 
            onClick={() => setActiveTab('audit')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'audit' ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <ShieldCheck className="h-5 w-5" />
            Audit Logs
          </button>
        </nav>
        <div className="p-4 border-t border-border">
           <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30 border border-border">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/30">AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">SYSTEM_ROOT</p>
              <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">Admin Privileges</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
              Secure Port :3001
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-card"></span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'controls' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Global Controls</h1>
                  <p className="text-muted-foreground mt-1">Adjust engine weighting and threshold parameters.</p>
                </div>
                <div className="flex gap-3">
                   <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium border border-border hover:bg-secondary/80 transition-colors flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                  <button className={`px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${hasChanges ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'}`}>
                    <Save className="h-4 w-4" /> Push Changes
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-xl p-8 space-y-8">
                   {Object.entries(weights).map(([key, value]) => (
                     <div key={key} className="space-y-4">
                       <div className="flex justify-between items-end">
                         <label className="font-semibold text-sm capitalize">{key} Factor</label>
                         <span className="font-mono text-primary font-bold text-lg">{value}%</span>
                       </div>
                       <input 
                         type="range" min="0" max="100" value={value}
                         onChange={(e) => handleWeightChange(key as any, parseInt(e.target.value))}
                         className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                       />
                     </div>
                   ))}
                   <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-3 text-destructive">
                     <ShieldAlert className="h-5 w-5 shrink-0" />
                     <p className="text-xs font-medium">Critical changes made here propagate instantly to the live allocation stream.</p>
                   </div>
                </div>
                <div className="bg-[#0a0a0a] border border-border rounded-xl flex flex-col font-mono text-[11px] text-gray-400 h-[450px]">
                  <div className="p-3 border-b border-[#222] bg-[#111] flex items-center gap-2 text-muted-foreground">
                    <Terminal className="h-4 w-4 text-primary" /> system_stream.log
                  </div>
                  <div className="p-6 space-y-2 overflow-y-auto">
                    <p><span className="text-blue-500">[NET]</span> Allocation stream listening on :3000</p>
                    <p><span className="text-success">[AUTH]</span> Superuser session verified</p>
                    {hasChanges && <p className="text-warning animate-pulse">[WARN] Detected pending weight updates...</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white">Infrastructure Telemetry</h1>
                  <p className="text-muted-foreground mt-1">Real-time health of the global allocation backbone.</p>
                </div>
                <div className="flex gap-2">
                   <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Feed</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'System Latency', value: '14.2ms', icon: Wifi, color: 'text-success', trend: '-2.4%' },
                  { label: 'CPU Utilization', value: '42.8%', icon: Cpu, color: 'text-warning', trend: '+1.2%' },
                  { label: 'Storage Sync', value: '99.99%', icon: Database, color: 'text-success', trend: 'STABLE' },
                  { label: 'Active Nodes', value: '14/14', icon: Globe, color: 'text-primary', trend: 'ONLINE' },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-primary/30 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-white/5 ${stat.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-warning' : 'text-success'}`}>{stat.trend}</span>
                    </div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-black text-white mt-1 tabular-nums">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                  <h3 className="font-black uppercase tracking-widest text-xs text-gray-500 mb-8 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Network Topology Map
                  </h3>
                  
                  <div className="h-[400px] w-full relative flex items-center justify-center bg-[radial-gradient(circle_at_center,_#111_0%,_transparent_70%)]">
                    {/* Topology Visualization */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute w-32 h-32 rounded-full border border-primary/20 animate-pulse"></div>
                      <div className="absolute w-64 h-64 rounded-full border border-primary/10"></div>
                      
                      {/* Central Hub */}
                      <div className="z-20 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_50px_-5px_rgba(59,130,246,0.5)] border border-primary-foreground/20">
                          <Database className="h-8 w-8 text-white" />
                        </div>
                        <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-primary">Core Node</p>
                      </div>

                      {/* Regional Nodes */}
                      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                        const radius = 140
                        const x = Math.cos(angle * Math.PI / 180) * radius
                        const y = Math.sin(angle * Math.PI / 180) * radius
                        return (
                          <div key={i} className="absolute transition-transform hover:scale-110 cursor-pointer group/node" style={{ transform: `translate(${x}px, ${y}px)` }}>
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/node:border-primary/50 group-hover/node:bg-primary/10 transition-all">
                              <Globe className="h-5 w-5 text-gray-500 group-hover/node:text-primary" />
                            </div>
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity">
                              <span className="text-[9px] font-black uppercase tracking-widest bg-black px-2 py-1 rounded border border-white/10">Region {i+1} · OK</span>
                            </div>
                            <svg className="absolute top-1/2 left-1/2 -z-10 w-[200px] overflow-visible pointer-events-none" style={{ transform: `rotate(${angle + 180}deg)` }}>
                              <line x1="0" y1="0" x2="140" y2="0" stroke="rgba(59,130,246,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                            </svg>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col">
                  <h3 className="font-black uppercase tracking-widest text-xs text-gray-500 mb-8">Resource Load</h3>
                  <div className="flex-1 w-full flex flex-col justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={healthData}>
                        <defs>
                          <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        />
                        <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="mt-8 space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-bold uppercase tracking-widest">Database Health</span>
                        <span className="text-success font-black">99%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[99%] bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-bold uppercase tracking-widest">Network Load</span>
                        <span className="text-warning font-black">64%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[64%] bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white">Security Audit</h1>
                  <p className="text-muted-foreground mt-1">Immutable ledger of system events and access logs.</p>
                </div>
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all flex items-center gap-2">
                  <Download className="h-4 w-4" /> Export Ledger
                </button>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                  <div className="relative w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input type="text" placeholder="Search logs..." className="bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm w-full outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">All Events</button>
                    <button className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500">Errors Only</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-black/50 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                      <tr>
                        <th className="px-8 py-5 font-black">Event Type</th>
                        <th className="px-8 py-5 font-black">Principal</th>
                        <th className="px-8 py-5 font-black">Parameters</th>
                        <th className="px-8 py-5 font-black">Timestamp</th>
                        <th className="px-8 py-5 font-black">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6">
                            <span className="flex items-center gap-2 font-black text-white uppercase tracking-tighter">
                              <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'SUCCESS' ? 'bg-success' : 'bg-warning'}`}></div>
                              {log.event}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-gray-400 font-mono text-[10px]">{log.user}</td>
                          <td className="px-8 py-6 text-gray-300 text-xs">{log.detail}</td>
                          <td className="px-8 py-6 text-gray-500 text-xs">{log.time}</td>
                          <td className="px-8 py-6">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                              log.status === 'SUCCESS' 
                                ? 'bg-success/5 text-success border-success/20' 
                                : 'bg-warning/5 text-warning border-warning/20'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
        </div>
      </main>
    </div>
  )
}
