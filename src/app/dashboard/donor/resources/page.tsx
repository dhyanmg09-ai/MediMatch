"use client"

import { motion } from 'framer-motion'
import { BookOpen, FileText, Video, Download, ExternalLink, HelpCircle } from 'lucide-react'

const RESOURCES = [
  { title: "Post-Donation Care Guide", type: "PDF", size: "2.4 MB", icon: FileText },
  { title: "Understanding Organ Allocation", type: "VIDEO", size: "12:40", icon: Video },
  { title: "Legal Rights for Donors", type: "PDF", size: "1.1 MB", icon: FileText },
  { title: "Mental Wellness Support", type: "ARTICLE", size: "8 min read", icon: BookOpen },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Knowledge Base</h1>
        <p className="text-gray-400">Everything you need to know about your journey as a donor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESOURCES.map((res, idx) => (
          <motion.div
            key={res.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#111420] border border-white/5 rounded-3xl p-6 hover:border-blue-500/30 transition-all group flex items-center gap-6"
          >
            <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-blue-500/10 transition-colors">
              <res.icon className="h-8 w-8 text-gray-500 group-hover:text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{res.title}</h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{res.type}</span>
                <span className="text-[10px] text-gray-500 font-medium">{res.size}</span>
              </div>
            </div>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <Download className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="md:col-span-2 bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 flex flex-col justify-center gap-4">
          <HelpCircle className="h-10 w-10 text-blue-500" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">Can't find what you're looking for?</h2>
          <p className="text-gray-400 max-w-md">Our medical advocacy team is available 24/7 to answer your questions and provide personalized support.</p>
          <button className="self-start px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2">
            Ask a Specialist <ExternalLink className="h-4 w-4" />
          </button>
        </div>
        <div className="bg-[#111420] border border-white/5 rounded-3xl p-8 space-y-6">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Quick Links</h3>
          {[
            "Privacy Policy",
            "Terms of Registry",
            "Donor Bill of Rights",
            "FAQ Database",
            "Community Forum"
          ].map((link) => (
            <a key={link} href="#" className="block text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-between group">
              {link}
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
