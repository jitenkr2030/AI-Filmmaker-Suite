'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Plus, Film, Users, Image, Palette, Video, Clock, Star } from 'lucide-react'

interface Project {
  id: string
  title: string
  description?: string
  status: string
  createdAt: string
  updatedAt: string
  scenes: number
  characters: number
  storyboards: number
  posters: number
  teasers: number
}

export default function ProjectDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'The Last Dawn',
        description: 'A sci-fi thriller about humanity\'s final stand',
        status: 'in_progress',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        scenes: 12,
        characters: 6,
        storyboards: 8,
        posters: 2,
        teasers: 1
      }
    ]
    
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600'
      case 'in_progress': return 'bg-blue-600'
      case 'draft': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  const getProjectProgress = (project: Project) => {
    const total = project.scenes + project.characters + project.storyboards + project.posters + project.teasers
    const completed = project.storyboards + project.posters + project.teasers
    return total > 0 ? (completed / total) * 100 : 0
  }

  if (loading) {
    return <div className="space-y-6">Loading projects...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Projects</p>
                <p className="text-2xl font-bold text-white">{projects.length}</p>
              </div>
              <Film className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Scenes</p>
                <p className="text-2xl font-bold text-white">
                  {projects.reduce((acc, p) => acc + p.scenes, 0)}
                </p>
              </div>
              <Image className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Characters</p>
                <p className="text-2xl font-bold text-white">
                  {projects.reduce((acc, p) => acc + p.characters, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Completed</p>
                <p className="text-2xl font-bold text-white">
                  {projects.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-600">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Start a New Project</h3>
              <p className="text-sm text-purple-200">Upload your script and bring your story to life</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Your Projects</h2>
        
        {projects.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Film className="h-16 w-16 mx-auto mb-4 text-slate-500" />
              <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
              <p className="text-slate-400 mb-4">Create your first AI-powered film project</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-slate-800/50 border-slate-700 hover:border-purple-600 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white mb-2">{project.title}</CardTitle>
                      {project.description && (
                        <CardDescription className="text-slate-400">
                          {project.description}
                        </CardDescription>
                      )}
                    </div>
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Project Progress</span>
                      <span className="text-purple-400">{Math.round(getProjectProgress(project))}%</span>
                    </div>
                    <Progress value={getProjectProgress(project)} className="h-2" />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Project
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}