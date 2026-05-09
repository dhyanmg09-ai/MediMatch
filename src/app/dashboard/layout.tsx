"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Activity, LayoutDashboard, Network, ShieldCheck, Settings, Bell, Search, Menu, X, Sliders, Heart } from 'lucide-react'
import { useState, useLayoutEffect } from 'react'

const navigation = [
  { name: 'Live Allocation', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Matching Engine', href: '/dashboard/matching', icon: Network },
  { name: 'Hospital Trust', href: '/dashboard/hospital-trust', icon: ShieldCheck },
  { name: 'Simulation Mode', href: '/dashboard/simulation', icon: Activity },
  { name: 'Donor Portal', href: '/dashboard/donor', icon: Heart },
  { name: 'Admin Panel', href: '/dashboard/admin', icon: Sliders },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useLayoutEffect(() => {
    const hasAccess = localStorage.getItem('medimatch_hospital_access') === 'true'
    if (!hasAccess) {
      router.replace('/gateway')
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:w-64
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Activity className="h-6 w-6" />
            <span className="font-bold text-lg text-foreground">MediMatch</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            if (item.name === 'Admin Panel') return null; // Admin Panel moved to separate portal
            
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                {item.name}
                {item.name === 'Live Allocation' && (
                  <span className="ml-auto flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-default border border-transparent">
            <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs border bg-muted text-muted-foreground border-border">
              HU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Hospital User</p>
              <p className="text-xs text-muted-foreground truncate">Transplant Surgeon</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md border border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search UNOS ID..." 
                className="bg-transparent border-none focus:outline-none text-sm text-foreground w-48 placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-xs font-medium">
              <Activity className="h-3 w-3" />
              System Status: High Load
            </div>
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-card"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
