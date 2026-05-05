"use client"

import { useState } from 'react'
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
            <div className="space-y-8 animate-in fade-in duration-500">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
                <p className="text-muted-foreground mt-1">Infrastructure telemetry and node availability.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Latency', value: '14ms', icon: Wifi, color: 'text-success' },
                  { label: 'CPU Load', value: '52%', icon: Cpu, color: 'text-warning' },
                  { label: 'Uptime', value: '99.9%', icon: Database, color: 'text-success' },
                  { label: 'Nodes', value: '14', icon: Globe, color: 'text-primary' },
                ].map((stat, i) => (
                  <div key={i} className="bg-card border border-border p-5 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-muted ${stat.color}`}><stat.icon className="h-4 w-4" /></div>
                      <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-xl p-8 h-[400px]">
                <h3 className="font-semibold mb-6">Traffic Analysis</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={healthData}>
                      <defs><linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Area type="monotone" dataKey="requests" stroke="hsl(var(--primary))" fill="url(#p)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
                  <p className="text-muted-foreground mt-1">Full history of system changes and access events.</p>
                </div>
                <button className="px-4 py-2 bg-card border border-border rounded-md text-sm font-medium flex items-center gap-2 hover:bg-muted transition-colors">
                  <Download className="h-4 w-4" /> Export CSV
                </button>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30 flex justify-between">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="Filter logs..." className="bg-background border border-border rounded-md pl-9 pr-4 py-1.5 text-sm w-full outline-none focus:border-primary" />
                  </div>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">Event</th>
                      <th className="px-6 py-4 font-medium">User</th>
                      <th className="px-6 py-4 font-medium">Detail</th>
                      <th className="px-6 py-4 font-medium">Time</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-primary">{log.event}</td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{log.user}</td>
                        <td className="px-6 py-4">{log.detail}</td>
                        <td className="px-6 py-4 text-muted-foreground">{log.time}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.status === 'SUCCESS' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
