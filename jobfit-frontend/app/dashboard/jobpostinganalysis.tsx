'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function JobPostingAnalysis() {
    const [jobUrl, setJobUrl] = useState('')
    interface AnalysisResult {
        matchScore: number;
        keySkills: string[];
        experienceRequired: string;
        technologies: string[];
        comparison: { skill: string; job: boolean; user: boolean }[];
    }

    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
    const [recentAnalyses, setRecentAnalyses] = useState([
        { id: 1, title: 'Software Engineer at TechCorp', url: 'https://example.com/job1', timestamp: '2023-04-01 14:30' },
        { id: 2, title: 'Data Scientist at DataCo', url: 'https://example.com/job2', timestamp: '2023-03-28 09:15' },
    ])

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        // Simulating API call for job analysis
        setTimeout(() => {
            setAnalysisResult({
                matchScore: 75,
                keySkills: ['React', 'Node.js', 'Python', 'Machine Learning'],
                experienceRequired: '3-5 years',
                technologies: ['AWS', 'Docker', 'MongoDB'],
                comparison: [
                    { skill: 'React', job: true, user: true },
                    { skill: 'Node.js', job: true, user: true },
                    { skill: 'Python', job: true, user: true },
                    { skill: 'Machine Learning', job: true, user: true },
                    { skill: 'AWS', job: true, user: false },
                    { skill: 'Docker', job: true, user: false },
                    { skill: 'MongoDB', job: true, user: false },
                ]
            })
            setRecentAnalyses([
                { id: recentAnalyses.length + 1, title: 'New Job Analysis', url: jobUrl, timestamp: new Date().toLocaleString() },
                ...recentAnalyses
            ])
        }, 1500)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 space-y-6"
        >
            <h2 className="text-3xl font-bold text-purple-300">Job Posting Analysis</h2>

            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl text-pink-400">Analyze Job Posting</CardTitle>
                    <CardDescription>Paste the URL of the job posting you want to analyze</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="url"
                            placeholder="https://example.com/job-posting"
                            value={jobUrl}
                            onChange={(e) => setJobUrl(e.target.value)}
                            className="flex-grow bg-gray-700 border-gray-600 text-white"
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>

            {analysisResult && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-2xl text-pink-400">Analysis Summary</CardTitle>
                            <CardDescription>Key insights from the job posting</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-lg">Match Score:</span>
                                <div className="flex items-center">
                                    <Progress value={analysisResult.matchScore} className="w-32 mr-2" />
                                    <span className="text-lg font-semibold">{analysisResult.matchScore}%</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg mb-2">Key Skills Required:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysisResult.keySkills.map((skill, index) => (
                                        <span key={index} className="px-2 py-1 bg-purple-600 bg-opacity-50 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg mb-2">Experience Required:</h4>
                                <p>{analysisResult.experienceRequired}</p>
                            </div>
                            <div>
                                <h4 className="text-lg mb-2">Technologies:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysisResult.technologies.map((tech, index) => (
                                        <span key={index} className="px-2 py-1 bg-pink-600 bg-opacity-50 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg mb-2">Skills Comparison:</h4>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Skill</TableHead>
                                            <TableHead>Job Requirement</TableHead>
                                            <TableHead>Your Profile</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {analysisResult.comparison.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.skill}</TableCell>
                                                <TableCell>
                                                    {item.job ? (
                                                        <CheckCircle className="text-green-500" />
                                                    ) : (
                                                        <XCircle className="text-red-500" />
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {item.user ? (
                                                        <CheckCircle className="text-green-500" />
                                                    ) : (
                                                        <XCircle className="text-red-500" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button>
                                Generate Resume Sections
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button>
                                Create Cold Email
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            )}

            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl text-pink-400">Recent Analyses</CardTitle>
                    <CardDescription>Previously analyzed job postings</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {recentAnalyses.map((analysis) => (
                            <li key={analysis.id} className="flex justify-between items-center p-2 hover:bg-gray-700 rounded transition-colors duration-200">
                                <span>{analysis.title}</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-400">{analysis.timestamp}</span>
                                    <Button variant="outline" size="sm">View</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
    )
}