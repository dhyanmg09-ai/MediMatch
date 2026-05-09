"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Gift, 
  BarChart3, 
  BookOpen, 
  Bell, 
  User, 
  HeartPulse, 
  Settings, 
  HelpCircle, 
  LifeBuoy,
  ChevronDown,
  Activity
} from 'lucide-react'
import { useState, useLayoutEffect } from 'react'
import Image from 'next/image'

const donorNavigation = [
  { name: 'Overview', href: '/dashboard/donor', icon: LayoutDashboard },
  { name: 'My Donations', href: '/dashboard/donor/donations', icon: Gift },
  { name: 'Impact & Stats', href: '/dashboard/donor/stats', icon: BarChart3 },
  { name: 'Transplant Stories', href: '/dashboard/donor/stories', icon: BookOpen },
  { name: 'Notifications', href: '/dashboard/donor/notifications', icon: Bell, badge: 2 },
  { name: 'Profile', href: '/dashboard/donor/profile', icon: User },
  { name: 'Health Check-ins', href: '/dashboard/donor/health', icon: HeartPulse },
  { name: 'Preferences', href: '/dashboard/donor/preferences', icon: Settings },
  { name: 'Resources', href: '/dashboard/donor/resources', icon: HelpCircle },
  { name: 'Support', href: '/dashboard/donor/support', icon: LifeBuoy },
]

export default function DonorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useLayoutEffect(() => {
    const hasAccess = localStorage.getItem('medimatch_donor_access') === 'true'
    if (!hasAccess) {
      router.replace('/gateway')
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#0a0c14] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800/50 flex flex-col bg-[#0a0c14] hidden lg:flex">
        <div className="p-6">
          <div className="flex flex-col items-center gap-2 mb-8 text-center">
            <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
              <Activity className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Organ Allocation System</h1>
              <p className="text-xs text-green-500 font-medium tracking-widest uppercase">Donor Portal</p>
            </div>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Donor Services</p>
              <div className="space-y-1">
                {donorNavigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                        ${isActive 
                          ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)]' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-auto p-6">
          <div className="bg-blue-600/5 border border-blue-600/10 rounded-xl p-4 text-center">
            <p className="text-sm font-bold mb-1">Need Help?</p>
            <p className="text-[10px] text-gray-500 mb-4">We're here for you 24/7</p>
            <button className="w-full py-2 bg-[#161b2b] border border-gray-700 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-800/30">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Donor Dashboard</p>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-600 border-2 border-[#0a0c14] rounded-full flex items-center justify-center text-[10px] font-bold text-white">3</span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-800">
              <div className="relative h-10 w-10 rounded-full border border-gray-700 overflow-hidden">
                <Image src="/assets/arjun.png" alt="Arjun" fill className="object-cover" />
              </div>
              <div className="text-left leading-tight hidden sm:block">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">Arjun Patel</p>
                  <ChevronDown className="h-3 w-3 text-gray-500" />
                </div>
                <p className="text-[10px] text-gray-500">Donor ID: DON-84219</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0c14;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1f2e;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a2f3e;
        }
      `}</style>
    </div>
  )
}
