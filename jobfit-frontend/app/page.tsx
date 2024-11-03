'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Mail, Send, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function Home() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Beta Signup:', email)
  }

  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0a0a1f] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-40 text-center">

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          <div>JobFit AI is the new</div>
          <div>
            <span className="text-purple-400">standard</span>{' '}
            <span className="text-pink-500">for</span>{' '}
            <span className="text-orange-400">job applications</span>
          </div>
        </h1>

        <p className="text-gray-400 text-xl mb-12">
          Tailor your resume and generate personalized cold emails in seconds.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4 mb-8">
          <Input
            type="email"
            placeholder="Enter your email to join our beta..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            required
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Join Beta
          </Button>
        </form>

        <Button
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          onClick={() => handleGetStarted()}
        >
          GET STARTED
          <ChevronRight className="ml-2 w-6 h-6 animate-bounce" />
        </Button>

        <div className="mt-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 max-w-6xl mx-auto text-left shadow-2xl">
          <div className="flex items-center mb-4 rounded-t-lg p-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="mx-auto text-white text-sm">JobFit AI</div>
          </div>

          <div className="flex gap-4">
            <div className="w-64  rounded-lg p-4 space-y-4">
              <div className="text-white font-medium">My Profile</div>
              <div className="text-gray-300 text-sm">Skills</div>
              <div className="text-gray-300 text-sm">Tech Stack</div>
              <div className="text-gray-300 text-sm">Projects</div>
            </div>

            <div className="flex-1 space-y-4 bg-gray-800 p-5">
              <div className=" rounded-lg p-4">
                <div className="text-white font-medium mb-2">Job Posting URL</div>
                <div className="flex gap-2">
                  <Input placeholder="Paste job URL here" className="border-gray-500 text-white" />
                  <Button className="bg-purple-600 hover:bg-purple-700"><Send className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-pink-600 hover:bg-pink-700">
                  <FileText className="w-4 h-4 mr-2" /> FIT your resume
                </Button>
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <Mail className="w-4 h-4 mr-2" /> Generate cold email
                </Button>
              </div>

              <div className=" rounded-lg p-4">
                <div className="text-white font-medium mb-2">Analysis Results</div>
                <Textarea
                  readOnly
                  className=" border-gray-500 text-white h-40"
                  placeholder="Your tailored resume content or cold email will appear here..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}