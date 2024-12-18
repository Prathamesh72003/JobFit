'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Video } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function HelpSupport() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Implement form submission logic here
    console.log('Submitting support request:', { name, email, message, file })
    toast({
      title: "Support Request Sent",
      description: "We've received your request and will get back to you soon.",
    })
  }

  const faqItems = [
    {
      question: "How do I analyze a job posting?",
      answer: "To analyze a job posting, go to the 'Job Posting Analysis' section, paste the URL of the job posting, and click 'Submit'. Our AI will analyze the posting and provide you with insights and recommendations."
    },
    {
      question: "Can I customize my resume for each job application?",
      answer: "Yes, you can customize your resume for each job application. Use the 'Resume Builder' feature to create a base resume, then use the 'Job Posting Analysis' results to tailor your resume for specific job applications."
    },
    {
      question: "How does the Cold Email Generator work?",
      answer: "The Cold Email Generator uses AI to create personalized email templates based on your profile and the job you're interested in. You can then edit and customize the email before sending it to the hiring manager or recruiter."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All your personal information and job-related data are encrypted and stored securely. We never share your information with third parties without your explicit consent."
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <h2 className="text-3xl font-bold text-purple-300">Help & Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-pink-400">Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-pink-400">Contact Support</CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="file">Attach Screenshot (optional)</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-400">Tutorials & Guides</CardTitle>
          <CardDescription>Learn how to use our features effectively</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
            <Video className="h-12 w-12 text-gray-400" />
          </div>
          <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
            <Video className="h-12 w-12 text-gray-400" />
          </div>
          <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
            <Video className="h-12 w-12 text-gray-400" />
          </div>
          <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
            <Video className="h-12 w-12 text-gray-400" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Tutorials
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-400">Live Chat Support</CardTitle>
          <CardDescription>Get real-time assistance from our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-700 rounded-lg p-4 h-64 flex flex-col justify-end">
            <div className="space-y-2">
              <div className="bg-gray-600 rounded-lg p-2 max-w-[80%]">
                Hello! How can I assist you today?
              
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <form className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type your message..."
              className="flex-grow bg-gray-700 border-gray-600 text-white"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>

      <div className="text-center">
        <Button variant="link" className="text-purple-400">
          Access Full Documentation
        </Button>
      </div>
    </motion.div>
  )
}