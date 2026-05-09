"use client"

import Link from 'next/link'
import { Activity, ShieldCheck, Clock, ArrowRight, Network } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navbar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Activity className="h-6 w-6" />
            <span className="font-bold text-xl tracking-tight text-foreground">MediMatch</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#security" className="hover:text-foreground transition-colors">Security</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/gateway" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">
              Login
            </Link>
            <Link 
              href="/gateway" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Launch System
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-24 pb-32 overflow-hidden">
          {/* Abstract Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                System Operational v2.4
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter"
              >
                Incentive-Aware <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Real-Time Organ Allocation
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                A mission-critical engine that dynamically ranks recipients using real-time decay metrics, 
                hospital trust scores, and complex compatibility algorithms.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Link 
                  href="/gateway"
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
                >
                  Enter Portal
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  href="/dashboard/simulation"
                  className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground rounded-md font-semibold hover:bg-secondary/80 transition-all flex items-center justify-center gap-2 border border-border"
                >
                  Run Simulation
                  <Activity className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-24 bg-card/30 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Real-Time Decay Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Live monitoring of organ viability from the moment of extraction. Rankings adjust dynamically as time elapses.
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Network className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Dynamic Shadow Offers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Parallel allocation paths ensure that if a primary hospital rejects an organ, the next best match is instantly notified.
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Hospital Trust Scoring</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Incentivize honest behavior. Data Integrity Credits track acceptance rates and response times to optimize future allocations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
        <p>© 2026 MediMatch. For demonstration and simulation purposes only.</p>
      </footer>
    </div>
  )
}
