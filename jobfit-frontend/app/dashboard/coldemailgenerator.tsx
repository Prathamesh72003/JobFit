'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function ColdEmailGenerator() {
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [personalNote, setPersonalNote] = useState('')
  const [previousEmails, setPreviousEmails] = useState([
    { id: 1, recipient: 'John Doe', timestamp: '2023-04-01 14:30' },
    { id: 2, recipient: 'Jane Smith', timestamp: '2023-03-28 09:15' },
  ])

  const generateEmail = () => {
    const generatedContent = `Dear ${recipientName},

I hope this email finds you well. I recently came across your profile and was impressed by your experience in [specific field/industry]. I'm reaching out because I believe my skills and background in [your relevant skills] could be a great fit for [company name].

[Insert 2-3 sentences about your relevant experience and how it aligns with the company's goals or recent projects]

I would love the opportunity to discuss how my expertise could contribute to your team's success. Would you be available for a brief call next week to explore potential opportunities?

Thank you for your time and consideration.

Best regards,
[Your Name]

${personalNote}`

    setEmailContent(generatedContent)
  }

  const handleSendEmail = () => {
    // Implement email sending functionality here
    console.log('Sending email to:', recipientEmail)
    toast({
      title: "Email Sent",
      description: `Your email has been sent to ${recipientName} (${recipientEmail}).`,
    })
    setPreviousEmails([
      { id: previousEmails.length + 1, recipient: recipientName, timestamp: new Date().toLocaleString() },
      ...previousEmails
    ])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailContent)
    toast({
      title: "Copied to Clipboard",
      description: "The email content has been copied to your clipboard.",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <h2 className="text-3xl font-bold text-purple-300">Cold Email Generator</h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Generate New Email</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Generate Cold Email</DialogTitle>
            <DialogDescription>
              Enter the recipient`&apos`s details to generate a personalized cold email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="col-span-3 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="col-span-3 bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={generateEmail}>Generate Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-400">Email Preview</CardTitle>
          <CardDescription>Review and edit your generated email</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[300px] bg-gray-700 border-gray-600 text-white"
          />
          <div className="mt-4">
            <Label htmlFor="personal-note">Personal Note</Label>
            <Textarea
              id="personal-note"
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              placeholder="Add a personal touch to your email..."
              className="mt-2 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
          <Button onClick={handleSendEmail}>
            <Send className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-400">Previous Emails</CardTitle>
          <CardDescription>Recently generated cold emails</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {previousEmails.map((email) => (
              <li key={email.id} className="flex justify-between items-center p-2 hover:bg-gray-700 rounded transition-colors duration-200">
                <span>{email.recipient}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{email.timestamp}</span>
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