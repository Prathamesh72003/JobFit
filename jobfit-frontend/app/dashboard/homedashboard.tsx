import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

export default function HomeDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold text-purple-300 mb-6">Welcome back, User!</h2>

            <Card className="mb-6 bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl text-pink-400">Quick Start</CardTitle>
                    <CardDescription>Begin your job application process here</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Analyze a Job Posting
                    </Button>
                </CardContent>
            </Card>

            {/* Recent Analyses Section */}
            <Card className="mb-6 bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl text-pink-400">Recent Analyses</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {['Software Engineer at TechCorp', 'Data Scientist at DataCo', 'Product Manager at InnovateTech'].map((job, index) => (
                            <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-700 rounded transition-colors duration-200">
                                <span>{job}</span>
                                <Button variant="outline" size="sm">View</Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="text-purple-400">View All Analyses</Button>
                </CardFooter>
            </Card>

            {/* Skills & Projects Preview */}
            <Card className="mb-6 bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                    <CardTitle className="text-2xl text-pink-400">My Skills & Projects</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {['React', 'Node.js', 'Python', 'Machine Learning'].map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-600 bg-opacity-50 rounded-full text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Skill or Project
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}