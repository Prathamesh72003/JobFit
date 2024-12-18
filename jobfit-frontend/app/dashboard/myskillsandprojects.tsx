'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function MySkillsAndProjects() {
  const [skills, setSkills] = useState(['React', 'Node.js', 'Python', 'Machine Learning'])
  const [projects, setProjects] = useState([
    { id: 1, title: 'E-commerce Platform', technologies: ['React', 'Node.js', 'MongoDB'], description: 'A full-stack e-commerce solution with real-time inventory management.' },
    { id: 2, title: 'AI Chatbot', technologies: ['Python', 'TensorFlow', 'NLP'], description: 'An intelligent chatbot capable of understanding and responding to customer queries.' }
  ])
  const [newSkill, setNewSkill] = useState('')
  const [newProject, setNewProject] = useState({ title: '', technologies: '', description: '' })
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [isAddingProject, setIsAddingProject] = useState(false)

  const addSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill])
      setNewSkill('')
      setIsAddingSkill(false)
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const addProject = () => {
    if (newProject.title && newProject.technologies) {
      setProjects([...projects, { ...newProject, id: projects.length + 1, technologies: newProject.technologies.split(',').map(tech => tech.trim()) }])
      setNewProject({ title: '', technologies: '', description: '' })
      setIsAddingProject(false)
    }
  }

  const removeProject = (projectId: number) => {
    setProjects(projects.filter(project => project.id !== projectId))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-300">My Skills & Projects</h2>
        <Progress value={66} className="w-1/3" />
      </div>

      {/* Skills Section */}
      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-400">Skills</CardTitle>
          <CardDescription>Manage your professional skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-2 py-1 bg-purple-600 bg-opacity-50">
                {skill}
                <button onClick={() => removeSkill(skill)} className="ml-2 text-gray-400 hover:text-gray-200">
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          {isAddingSkill ? (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button onClick={addSkill}>Add</Button>
              <Button variant="outline" onClick={() => setIsAddingSkill(false)}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={() => setIsAddingSkill(true)} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add New Skill
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-400">Projects</CardTitle>
          <CardDescription>Showcase your work and experiences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-300">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{project.description}</p>
                </CardContent>
                <CardFooter className="justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => removeProject(project.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>Enter the details of your new project</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingProject(false)}>Cancel</Button>
                <Button onClick={addProject}>Add Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  )
}