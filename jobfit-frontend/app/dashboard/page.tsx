'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    FileText, Mail, Send,
    User, Settings, LogOut, Menu, X
} from 'lucide-react'
import axios from 'axios'

export default function Dashboard() {
    const [jobUrl, setJobUrl] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [resumeContent, setResumeContent] = useState('')
    const [emailContent, setEmailContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleJobSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        console.log('Job URL submitted:', jobUrl)

        try {
            const res = await axios.get('http://localhost:8000/get-fit-resume', {
                params: {
                    url: jobUrl
                }
            })

            setResumeContent(res.data.resume_section)

        } catch (error) {
            console.error('Error fetching content:', error)
            setResumeContent('An error occurred while fetching your resume. Please try again.')
        } finally {
            setIsLoading(false)
        }

        setEmailContent('Dear Hiring Manager,<br><br>I hope this email finds you well. I am writing to express my strong interest in the [Job Title] position at [Company Name].<br><br>Best regards,<br>Your Name')
    }

    const formatResumeSection = (content: string) => {
        if (!content) return ''

        const sections = content.split('###').filter(section => section.trim() !== '')

        return sections.map(section => {
            const [title, ...items] = section.split('\n').filter(item => item.trim() !== '')
            return `
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-2">${title.trim()}</h3>
                    <ul class="list-disc list-inside">
                        ${items.map(item => `<li>${item.replace(/^-\s*/, '')}</li>`).join('')}
                    </ul>
                </div>
            `
        }).join('')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a1f] to-[#1a1a3f]">
            <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-white text-xl font-bold">JobFit AI</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Button variant="ghost" className="text-white">Dashboard</Button>
                                <Button variant="ghost" className="text-white">Profile</Button>
                                <Button variant="ghost" className="text-white">Settings</Button>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                {sidebarOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
                    <div className="fixed inset-y-0 left-0 w-64 bg-[#0a0a1f] p-5">
                        <div className="flex flex-col space-y-4">
                            <Button variant="ghost" className="text-white justify-start">
                                <User className="mr-2 h-4 w-4" /> Profile
                            </Button>
                            <Button variant="ghost" className="text-white justify-start">
                                <Settings className="mr-2 h-4 w-4" /> Settings
                            </Button>
                            <Button variant="ghost" className="text-white justify-start">
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content */}
            <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Job URL submission */}
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-white mb-4">Submit Job Posting</h2>
                        <form onSubmit={handleJobSubmit} className="flex gap-4">
                            <Input
                                type="url"
                                placeholder="Paste job URL here"
                                value={jobUrl}
                                onChange={(e) => setJobUrl(e.target.value)}
                                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                                required
                            />
                            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                                <Send className="w-4 h-4 mr-2" /> {isLoading ? 'Loading...' : 'Analyze Job'}
                            </Button>
                        </form>
                    </div>

                    {/* Dashboard grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Resume Fit */}
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 animate-fade-in animate-delay-100">
                            <h3 className="text-xl font-bold text-white mb-4">Resume Fit</h3>
                            <Button className="w-full bg-pink-600 hover:bg-pink-700 mb-4">
                                <FileText className="w-4 h-4 mr-2" /> Generate ATS-Friendly Resume
                            </Button>
                            <div className="bg-white/5 rounded p-4 mb-4 max-h-96 overflow-auto">
                                <div
                                    className="text-white"
                                    dangerouslySetInnerHTML={{ __html: formatResumeSection(resumeContent) }}
                                />
                            </div>
                        </div>

                        {/* Cold Email */}
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 animate-fade-in animate-delay-200">
                            <h3 className="text-xl font-bold text-white mb-4">Cold Email</h3>
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 mb-4">
                                <Mail className="w-4 h-4 mr-2" /> Generate Personalized Email
                            </Button>
                            {emailContent && (
                                <div
                                    className="mt-4 bg-white/5 border border-white/10 rounded p-4 text-white"
                                    dangerouslySetInnerHTML={{ __html: emailContent }}
                                />
                            )}
                        </div>

                        {/* Skills Analysis */}
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 animate-fade-in animate-delay-300">
                            <h3 className="text-xl font-bold text-white mb-4">Skills Analysis</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Required Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Node.js', 'TypeScript', 'AWS'].map((skill) => (
                                            <span key={skill} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Your Matching Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'TypeScript'].map((skill) => (
                                            <span key={skill} className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}