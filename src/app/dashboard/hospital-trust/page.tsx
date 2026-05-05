"use client"

import { useState } from 'react'
import { ShieldCheck, TrendingUp, Search, Filter, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'

const INITIAL_HOSPITALS = [
  { id: 'H1', name: 'Cleveland Clinic', trust: 98, responseTime: '4m', acceptanceRate: '92%', trend: 'up' },
  { id: 'H2', name: 'Mayo Clinic', trust: 95, responseTime: '7m', acceptanceRate: '88%', trend: 'up' },
  { id: 'H3', name: 'Mass General', trust: 92, responseTime: '12m', acceptanceRate: '85%', trend: 'stable' },
  { id: 'H4', name: 'Johns Hopkins', trust: 89, responseTime: '15m', acceptanceRate: '78%', trend: 'down' },
  { id: 'H5', name: 'Stanford Health', trust: 91, responseTime: '11m', acceptanceRate: '82%', trend: 'up' },
  { id: 'H6', name: 'UCSF Medical', trust: 76, responseTime: '45m', acceptanceRate: '41%', trend: 'down', alert: true },
]

const chartData = [
  { month: 'Jan', 'Cleveland Clinic': 90, 'UCSF Medical': 85 },
  { month: 'Feb', 'Cleveland Clinic': 92, 'UCSF Medical': 82 },
  { month: 'Mar', 'Cleveland Clinic': 95, 'UCSF Medical': 80 },
  { month: 'Apr', 'Cleveland Clinic': 96, 'UCSF Medical': 78 },
  { month: 'May', 'Cleveland Clinic': 98, 'UCSF Medical': 76 },
]

export default function HospitalTrustPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredHospitals = INITIAL_HOSPITALS.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hospital Behavior & Trust</h1>
          <p className="text-sm text-muted-foreground">Monitor Data Integrity Credits and behavioral metrics across the network.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Table */}
        <div className="xl:col-span-2 bg-card border border-border rounded-lg shadow-sm flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
            <div className="flex items-center gap-2 bg-background border border-border rounded-md px-3 py-1.5 w-64">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search hospitals..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-1.5 text-muted-foreground hover:bg-muted rounded border border-transparent hover:border-border transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Hospital Name</th>
                  <th className="px-6 py-4 font-medium">Trust Score</th>
                  <th className="px-6 py-4 font-medium">Avg Response</th>
                  <th className="px-6 py-4 font-medium">Acceptance Rate</th>
                  <th className="px-6 py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHospitals.map((hospital) => (
                  <tr key={hospital.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                      {hospital.name}
                      {hospital.alert && <AlertTriangle className="h-4 w-4 text-destructive" />}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${hospital.trust >= 90 ? 'text-success' : hospital.trust >= 80 ? 'text-warning' : 'text-destructive'}`}>
                          {hospital.trust}
                        </span>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${hospital.trust >= 90 ? 'bg-success' : hospital.trust >= 80 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${hospital.trust}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">{hospital.responseTime}</td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">{hospital.acceptanceRate}</td>
                    <td className="px-6 py-4 text-right">
                      {hospital.trend === 'up' && <span className="inline-flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded border border-success/20"><TrendingUp className="h-3 w-3" /> Improving</span>}
                      {hospital.trend === 'stable' && <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded border border-border">Stable</span>}
                      {hospital.trend === 'down' && <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded border border-destructive/20">Declining</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel: Charts */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Trust Score Trends
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="Cleveland Clinic" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--success))' }} />
                  <Line type="monotone" dataKey="UCSF Medical" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--destructive))' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-4 text-xs text-muted-foreground justify-center">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-success"></div> Cleveland Clinic</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-destructive"></div> UCSF Medical</div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
            <h3 className="font-semibold text-primary mb-2">Integrity Credits Overview</h3>
            <p className="text-sm text-muted-foreground mb-4">Hospitals with high integrity credits receive priority in shadow allocation queues.</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Network Credits Issued</span>
                <span className="font-bold">142,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Penalty Deduction</span>
                <span className="font-bold text-destructive">-450</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
