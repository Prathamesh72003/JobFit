'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Home, Briefcase, FileText, Mail, HelpCircle, Moon, Sun, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import HomeDashboard from './homedashboard'
import MySkillsAndProjects from './myskillsandprojects'
import JobPostingAnalysis from './jobpostinganalysis'
import ResumeBuilder from './resumebuilder'
import ColdEmailGenerator from './coldemailgenerator'
import HelpSupport from './helpsupport'

export default function Dashboard() {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [activeSection, setActiveSection] = useState('home')

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

    const sidebarItems = [
        { icon: Home, label: 'Home Dashboard', id: 'home' },
        { icon: Briefcase, label: 'My Skills & Projects', id: 'skills' },
        { icon: Search, label: 'Job Posting Analysis', id: 'analysis' },
        { icon: FileText, label: 'Resume Builder', id: 'resume' },
        { icon: Mail, label: 'Cold Email Generator', id: 'email' },
        { icon: HelpCircle, label: 'Help/Support', id: 'help' },
    ]

    const renderContent = () => {
        switch (activeSection) {
            case 'skills':
                return <MySkillsAndProjects />
            case 'analysis':
                return <JobPostingAnalysis />
            case 'resume':
                return <ResumeBuilder />
            case 'email':
                return <ColdEmailGenerator />
            case 'help':
                return <HelpSupport />
            default:
                return <HomeDashboard />
        }
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <motion.aside
                    className="w-64 bg-gray-800 bg-opacity-50 backdrop-blur-lg border-r border-gray-700"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="p-4">
                        <h1 className="text-2xl font-bold text-purple-400">JobFit AI</h1>
                    </div>
                    <nav className="mt-8">
                        {sidebarItems.map((item) => (
                            <motion.button
                                key={item.id}
                                className={`flex items-center w-full px-4 py-2 mt-2 text-sm font-semibold ${activeSection === item.id ? 'bg-purple-600 bg-opacity-50' : 'hover:bg-purple-600 hover:bg-opacity-25'
                                    } transition-colors duration-200`}
                                onClick={() => setActiveSection(item.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </motion.button>
                        ))}
                    </nav>
                </motion.aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 backdrop-blur-lg border-b border-gray-700">
                        <div className="flex items-center">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="w-64 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="Chad" />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">shadcn</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                m@example.com
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    )
}