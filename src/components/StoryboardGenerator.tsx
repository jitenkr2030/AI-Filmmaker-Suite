'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Image, Wand2, Download, Eye, Settings, Grid3X3 } from 'lucide-react'

export default function StoryboardGenerator() {
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [selectedScenes, setSelectedScenes] = useState<number[]>([])
  const [style, setStyle] = useState('cinematic')
  const [framesPerScene, setFramesPerScene] = useState([3])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const generateStoryboards = async () => {
    if (selectedScenes.length === 0) return

    setIsGenerating(true)
    setProgress(0)

    // Simulate generation
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    setIsGenerating(false)
  }

  const toggleSceneSelection = (sceneNumber: number) => {
    setSelectedScenes(prev => 
      prev.includes(sceneNumber)
        ? prev.filter(n => n !== sceneNumber)
        : [...prev, sceneNumber]
    )
  }

  const mockScenes = [
    { number: 1, title: "Opening Dawn", setting: "Mountain peak at sunrise" },
    { number: 2, title: "The Discovery", setting: "Ancient temple interior" },
    { number: 3, title: "Chase Sequence", setting: "Busy city streets at night" }
  ]

  const styles = [
    { value: 'cinematic', label: 'Cinematic' },
    { value: 'realistic', label: 'Realistic' },
    { value: 'anime', label: 'Anime' },
    { value: 'comic', label: 'Comic Book' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5" />
          Storyboard Generator
        </CardTitle>
        <CardDescription>
          Select scenes and customize your storyboard style
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Select Project</Label>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose a project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project1">The Last Dawn</SelectItem>
              <SelectItem value="project2">Coffee Shop Dreams</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Select Scenes</Label>
          <div className="mt-2 space-y-2">
            {mockScenes.map((scene) => (
              <div
                key={scene.number}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedScenes.includes(scene.number)
                    ? 'border-purple-500 bg-purple-950/30'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                onClick={() => toggleSceneSelection(scene.number)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">
                      Scene {scene.number}: {scene.title}
                    </div>
                    <div className="text-sm text-slate-400">{scene.setting}</div>
                  </div>
                  {selectedScenes.includes(scene.number) && (
                    <Badge className="bg-purple-600">Selected</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Visual Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose a style" />
            </SelectTrigger>
            <SelectContent>
              {styles.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Frames per Scene: {framesPerScene[0]}</Label>
          <Slider
            value={framesPerScene}
            onValueChange={setFramesPerScene}
            max={8}
            min={1}
            step={1}
            className="mt-2"
          />
        </div>

        <Button 
          onClick={generateStoryboards}
          disabled={isGenerating || selectedScenes.length === 0}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Wand2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Storyboards...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Storyboards
            </>
          )}
        </Button>

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Generating frames...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}