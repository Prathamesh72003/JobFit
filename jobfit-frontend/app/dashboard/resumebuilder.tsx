'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, HelpCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ResumeBuilder() {
  const [resumeSections, setResumeSections] = useState({
    skills: "React, Node.js, Python, Machine Learning, Data Analysis",
    technologies: "AWS, Docker, MongoDB, Git, REST APIs",
    projects: `1. E-commerce Platform: Developed a full-stack e-commerce solution using React and Node.js.
2. AI Chatbot: Created an intelligent chatbot using Python and TensorFlow for natural language processing.`
  })

  const [includedSections, setIncludedSections] = useState({
    skills: true,
    technologies: true,
    projects: true
  })

  const profileCompleteness = 80 

  const handleSectionChange = (section: string, value: string) => {
    setResumeSections(prev => ({ ...prev, [section]: value }))
  }

  type Section = 'skills' | 'technologies' | 'projects';

  const handleIncludedChange = (section: Section) => {
    setIncludedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const exportResume = (format: string) => {
    // Implement export functionality (PDF, Word, or plain text)
    console.log(`Exporting resume as ${format}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-300">Resume Builder</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Profile Completeness:</span>
          <Progress value={profileCompleteness} className="w-32" />
          <span className="text-sm font-semibold">{profileCompleteness}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-pink-400">Resume Preview</CardTitle>
              <CardDescription>ATS-friendly resume sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(resumeSections).map(([section, content]) => (
                <div key={section} className={!includedSections[section as Section] ? 'opacity-50' : ''}>
                  <h3 className="text-lg font-semibold capitalize mb-2">{section}</h3>
                  <Textarea
                    value={content}
                    onChange={(e) => handleSectionChange(section, e.target.value)}
                    className="w-full bg-gray-700 border-gray-600 text-white"
                    rows={section === 'projects' ? 6 : 3}
                  />
                  <div className="flex items-center mt-2">
                    <Checkbox
                      id={`include-${section}`}
                      checked={includedSections[section as Section]}
                      onCheckedChange={() => handleIncludedChange(section as Section)}
                    />
                    <label htmlFor={`include-${section}`} className="ml-2 text-sm">
                      Include in resume
                    </label>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <div className="flex space-x-2">
                <Button onClick={() => exportResume('pdf')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
                <Button onClick={() => exportResume('docx')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as Word
                </Button>
                <Button onClick={() => exportResume('txt')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as Text
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-pink-400">ATS Optimization Tips</CardTitle>
              <CardDescription>Improve your resume`&apos`s chances of passing ATS scans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TooltipProvider>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="mr-2 h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Use keywords from the job description in your resume.</p>
                      </TooltipContent>
                    </Tooltip>
                    Use relevant keywords
                  </li>
                  <li className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="mr-2 h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Avoid using images, charts, or unusual fonts that ATS might not be able to read.</p>
                      </TooltipContent>
                    </Tooltip>
                    Keep formatting simple
                  
                  </li>
                  <li className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="mr-2 h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Use standard section headings like `&quot`Work Experience`&quot` and `&quot`Education`&quot`.</p>
                      </TooltipContent>
                    </Tooltip>
                    Use standard section headings
                  </li>
                  <li className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="mr-2 h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Spell out acronyms at least once to ensure the ATS recognizes them.</p>
                      </TooltipContent>
                    </Tooltip>
                    Spell out acronyms
                  </li>
                </ul>
              </TooltipProvider>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-pink-400">Profile Completeness</CardTitle>
              <CardDescription>Enhance your resume by completing your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={profileCompleteness} className="w-full mb-4 bg-white" />
              <p className="text-sm text-gray-400">
                Complete your profile to improve your resume. Add more skills, technologies, and projects to stand out.
              </p>
            </CardContent>
            <CardFooter>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}