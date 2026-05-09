"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Quote, Heart, Share2, Bookmark, Send } from 'lucide-react'
import { Modal } from '@/components/Modal'

const INITIAL_STORIES = [
  {
    id: 1,
    author: "Elena R.",
    role: "Recipient",
    content: "Thank you for giving me a second chance. Because of your kidney donation, I was able to see my daughter graduate from college this spring. You are a true hero.",
    date: "2 weeks ago",
    likes: 124,
    liked: false
  },
  {
    id: 2,
    author: "Samuel K.",
    role: "Family Member",
    content: "Our family was losing hope until the call came. The liver transplant saved my brother's life. We are eternally grateful for the selflessness of donors like you.",
    date: "1 month ago",
    likes: 89,
    liked: false
  },
  {
    id: 3,
    author: "Dr. Aris Thorne",
    role: "Transplant Surgeon",
    content: "In my 20 years of surgery, the impact of a timely organ allocation never ceases to amaze me. The MediMatch system ensures that your gift goes exactly where it's needed most.",
    date: "3 days ago",
    likes: 45,
    liked: false
  }
]

export default function StoriesPage() {
  const [stories, setStories] = useState(INITIAL_STORIES)
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [showShare, setShowShare] = useState(false)
  const [newStory, setNewStory] = useState('')

  const handleLike = (id: number) => {
    setStories(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, likes: s.liked ? s.likes - 1 : s.likes + 1, liked: !s.liked }
      }
      return s
    }))
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Impact Stories</h1>
          <p className="text-gray-400">Messages from the lives you've changed.</p>
        </div>
        <button 
          onClick={() => setShowShare(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]"
        >
          <Share2 className="h-4 w-4" />
          Share Your Story
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {stories.map((story, idx) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#111420] border border-white/5 rounded-3xl p-8 relative overflow-hidden group"
          >
            <Quote className="absolute top-4 right-8 h-24 w-24 text-white/5 group-hover:text-blue-500/10 transition-colors" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center">
                  <Heart className={`h-6 w-6 transition-colors ${story.liked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                </div>
                <div>
                  <p className="text-white font-bold">{story.author}</p>
                  <p className="text-xs text-blue-500 font-bold uppercase tracking-widest">{story.role}</p>
                </div>
                <span className="ml-auto text-xs text-gray-600 font-medium">{story.date}</span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed italic">
                "{story.content}"
              </p>

              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <button 
                  onClick={() => handleLike(story.id)}
                  className={`flex items-center gap-2 transition-colors ${story.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                >
                  <Heart className={`h-4 w-4 ${story.liked ? 'fill-red-500' : ''}`} />
                  <span className="text-xs font-bold">{story.likes}</span>
                </button>
                <button 
                  onClick={() => setReplyTo(story.author)}
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs font-bold">Reply</span>
                </button>
                <button className="ml-auto text-gray-500 hover:text-white transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reply Modal */}
      <Modal isOpen={!!replyTo} onClose={() => setReplyTo(null)} title={`Reply to ${replyTo}`}>
        <div className="space-y-6">
          <textarea 
            placeholder="Write your response..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 min-h-[120px]"
          />
          <button 
            onClick={() => setReplyTo(null)}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <Send className="h-5 w-5" />
            Send Response
          </button>
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal isOpen={showShare} onClose={() => setShowShare(false)} title="Share Your Journey">
        <div className="space-y-6">
          <p className="text-sm text-gray-400">Your story can inspire others to become donors. Share your experience with the community.</p>
          <textarea 
            placeholder="Tell your story..."
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 min-h-[150px]"
          />
          <button 
            onClick={() => setShowShare(false)}
            className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest"
          >
            Post Story
          </button>
        </div>
      </Modal>
    </div>
  )
}

