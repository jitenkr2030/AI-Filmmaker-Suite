'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Video, Wand2, Download, Play, Pause, RefreshCw, Volume2 } from 'lucide-react'

interface Teaser {
  id: string
  projectId: string
  title?: string
  videoUrl?: string
  duration: number
  style: string
  description: string
  prompt?: string
  isGenerating?: boolean
  scenes: number[]
  includeMusic: boolean
  includeVoiceover: boolean
}

interface Scene {
  id: number
  title: string
  description: string
  duration: number
}

export default function TeaserGenerator() {
  const [teasers, setTeasers] = useState<Teaser[]>([])
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  // Teaser configuration
  const [teaserConfig, setTeaserConfig] = useState({
    title: '',
    duration: [30], // in seconds
    style: 'cinematic',
    pacing: 'dramatic',
    aspectRatio: '16:9',
    quality: 'high',
    includeMusic: true,
    includeVoiceover: true,
    includeSubtitles: false,
    musicStyle: 'epic',
    voiceStyle: 'dramatic_male'
  })

  const projects = [
    { 
      id: 'project1', 
      title: 'The Last Dawn',
      scenes: [
        { id: 1, title: 'Opening Dawn', description: 'Hero on mountain peak', duration: 5 },
        { id: 2, title: 'The Discovery', description: 'Finding ancient artifact', duration: 8 },
        { id: 3, title: 'Chase Sequence', description: 'Pursuit through tunnels', duration: 12 }
      ]
    },
    { 
      id: 'project2', 
      title: 'Coffee Shop Dreams',
      scenes: [
        { id: 1, title: 'Morning Coffee', description: 'Opening cafe scene', duration: 6 },
        { id: 2, title: 'First Meeting', description: 'Characters encounter', duration: 8 }
      ]
    }
  ]

  const teaserStyles = [
    { 
      value: 'cinematic', 
      label: 'Cinematic', 
      description: 'Professional movie trailer style',
      features: 'Dramatic cuts, professional transitions, epic music'
    },
    { 
      value: 'fast_paced', 
      label: 'Fast-Paced', 
      description: 'Quick cuts and high energy',
      features: 'Rapid editing, dynamic camera movement, intense music'
    },
    { 
      value: 'moody', 
      label: 'Moody', 
      description: 'Atmospheric and emotional',
      features: 'Slow pacing, atmospheric lighting, emotional music'
    },
    { 
      value: 'action', 
      label: 'Action', 
      description: 'High-energy action trailer',
      features: 'Quick cuts, explosion effects, intense percussion'
    },
    { 
      value: 'dramatic', 
      label: 'Dramatic', 
      description: 'Emotional and impactful',
      features: 'Emotional moments, swelling music, powerful narration'
    },
    { 
      value: 'mysterious', 
      label: 'Mysterious', 
      description: 'Intriguing and suspenseful',
      features: 'Shadowy visuals, tense music, minimal dialogue'
    }
  ]

  const pacings = [
    { value: 'dramatic', label: 'Dramatic', description: 'Emotional build-up' },
    { value: 'steady', label: 'Steady', description: 'Consistent pace' },
    { value: 'building', label: 'Building', description: 'Gradual intensity increase' },
    { value: 'explosive', label: 'Explosive', description: 'High impact ending' }
  ]

  const musicStyles = [
    { value: 'epic', label: 'Epic Orchestra' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'piano', label: 'Piano' },
    { value: 'ambient', label: 'Ambient' },
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' }
  ]

  const voiceStyles = [
    { value: 'dramatic_male', label: 'Dramatic Male' },
    { value: 'warm_female', label: 'Warm Female' },
    { value: 'deep_male', label: 'Deep Male' },
    { value: 'gentle_female', label: 'Gentle Female' },
    { value: 'energetic_male', label: 'Energetic Male' },
    { value: 'mysterious_female', label: 'Mysterious Female' }
  ]

  const selectedProjectScenes = projects.find(p => p.id === selectedProject)?.scenes || []
  const [selectedScenes, setSelectedScenes] = useState<number[]>([])

  const toggleSceneSelection = (sceneId: number) => {
    setSelectedScenes(prev => 
      prev.includes(sceneId)
        ? prev.filter(id => id !== sceneId)
        : [...prev, sceneId]
    )
  }

  const generateTeaser = async () => {
    if (!selectedProject) {
      setError('Please select a project first')
      return
    }

    if (selectedScenes.length === 0) {
      setError('Please select at least one scene')
      return
    }

    setIsGenerating(true)
    setError(null)
    setProgress(0)

    try {
      const teaserId = Date.now().toString()
      const newTeaser: Teaser = {
        id: teaserId,
        projectId: selectedProject,
        title: teaserConfig.title,
        duration: teaserConfig.duration[0],
        style: teaserConfig.style,
        description: `${teaserConfig.title || 'Teaser'} - ${teaserConfig.duration[0]}s ${teaserConfig.style} trailer`,
        scenes: selectedScenes,
        includeMusic: teaserConfig.includeMusic,
        includeVoiceover: teaserConfig.includeVoiceover,
        isGenerating: true
      }

      // Add teaser placeholder
      setTeasers(prev => [...prev, newTeaser])

      // Simulate video generation progress
      const steps = [
        { progress: 10, message: 'Analyzing scenes...' },
        { progress: 25, message: 'Generating storyboard...' },
        { progress: 40, message: 'Creating visual effects...' },
        { progress: 60, message: 'Adding transitions...' },
        { progress: 75, message: 'Composing music...' },
        { progress: 85, message: 'Adding voiceover...' },
        { progress: 95, message: 'Finalizing video...' },
        { progress: 100, message: 'Complete!' }
      ]

      for (const step of steps) {
        setProgress(step.progress)
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      // Generate mock video URL (in real implementation, this would be an actual video file)
      const videoUrl = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`

      // Update teaser with generated video
      setTeasers(prev => prev.map(teaser =>
        teaser.id === teaserId
          ? { ...teaser, videoUrl, isGenerating: false }
          : teaser
      ))

    } catch (err) {
      setError('Failed to generate teaser. Please try again.')
    } finally {
      setIsGenerating(false)
      setProgress(0)
    }
  }

  const deleteTeaser = (teaserId: string) => {
    setTeasers(prev => prev.filter(teaser => teaser.id !== teaserId))
    if (playingVideo === teaserId) {
      setPlayingVideo(null)
    }
  }

  const regenerateTeaser = async (teaserId: string) => {
    const teaser = teasers.find(t => t.id === teaserId)
    if (!teaser) return

    // Update teaser to generating state
    setTeasers(prev => prev.map(t =>
      t.id === teaserId
        ? { ...t, isGenerating: true }
        : t
    ))

    // Simulate regeneration
    await new Promise(resolve => setTimeout(resolve, 3000))

    const newVideoUrl = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4`
    
    setTeasers(prev => prev.map(t =>
      t.id === teaserId
        ? { ...t, videoUrl: newVideoUrl, isGenerating: false }
        : t
    ))
  }

  const downloadTeaser = (teaser: Teaser) => {
    if (!teaser.videoUrl) return
    
    // Create download link (in real implementation, this would download the actual video file)
    const link = document.createElement('a')
    link.href = teaser.videoUrl
    link.download = `${teaser.title || 'teaser'}-${teaser.id}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleVideoPlayback = (teaserId: string) => {
    setPlayingVideo(prev => prev === teaserId ? null : teaserId)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Teaser Configuration
            </CardTitle>
            <CardDescription>
              Create your movie trailer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Project Selection */}
            <div>
              <Label>Select Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Scene Selection */}
            {selectedProjectScenes.length > 0 && (
              <div>
                <Label>Select Scenes</Label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {selectedProjectScenes.map(scene => (
                    <div
                      key={scene.id}
                      className={`p-2 border rounded cursor-pointer transition-colors ${
                        selectedScenes.includes(scene.id)
                          ? 'border-purple-500 bg-purple-950/30'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                      onClick={() => toggleSceneSelection(scene.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">
                            Scene {scene.id}: {scene.title}
                          </div>
                          <div className="text-xs text-slate-400">{scene.duration}s</div>
                        </div>
                        {selectedScenes.includes(scene.id) && (
                          <Badge className="bg-purple-600 text-xs">Selected</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teaser Title */}
            <div>
              <Label htmlFor="teaser-title">Teaser Title (Optional)</Label>
              <Input
                id="teaser-title"
                value={teaserConfig.title}
                onChange={(e) => setTeaserConfig(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter teaser title"
                className="mt-1"
              />
            </div>

            {/* Duration */}
            <div>
              <Label>Duration: {teaserConfig.duration[0]}s</Label>
              <Slider
                value={teaserConfig.duration}
                onValueChange={(value) => setTeaserConfig(prev => ({ ...prev, duration: value }))}
                max={120}
                min={15}
                step={5}
                className="mt-1"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>15s</span>
                <span>120s</span>
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <Label>Trailer Style</Label>
              <Select value={teaserConfig.style} onValueChange={(value) => setTeaserConfig(prev => ({ ...prev, style: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teaserStyles.map(style => (
                    <SelectItem key={style.value} value={style.value}>
                      <div>
                        <div className="font-medium">{style.label}</div>
                        <div className="text-xs text-slate-500">{style.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Audio Options */}
            <div className="space-y-3">
              <Label>Audio Options</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-music"
                  checked={teaserConfig.includeMusic}
                  onCheckedChange={(checked) => setTeaserConfig(prev => ({ ...prev, includeMusic: checked as boolean }))}
                />
                <Label htmlFor="include-music" className="text-sm">Include Background Music</Label>
              </div>

              {teaserConfig.includeMusic && (
                <Select value={teaserConfig.musicStyle} onValueChange={(value) => setTeaserConfig(prev => ({ ...prev, musicStyle: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {musicStyles.map(style => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-voiceover"
                  checked={teaserConfig.includeVoiceover}
                  onCheckedChange={(checked) => setTeaserConfig(prev => ({ ...prev, includeVoiceover: checked as boolean }))}
                />
                <Label htmlFor="include-voiceover" className="text-sm">Include Voiceover</Label>
              </div>

              {teaserConfig.includeVoiceover && (
                <Select value={teaserConfig.voiceStyle} onValueChange={(value) => setTeaserConfig(prev => ({ ...prev, voiceStyle: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceStyles.map(style => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Generate Button */}
            <Button 
              onClick={generateTeaser}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Teaser...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Teaser
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Creating trailer...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Video Gallery */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Generated Teasers
            </CardTitle>
            <CardDescription>
              Your movie trailer collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            {teasers.length === 0 ? (
              <div className="text-center py-12">
                <Video className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                <h3 className="text-lg font-medium text-white mb-2">No Teasers Yet</h3>
                <p className="text-slate-400 mb-4">Create your first movie trailer</p>
                <div className="text-sm text-slate-500 space-y-1">
                  <p>• Select a project and scenes</p>
                  <p>• Choose duration and style</p>
                  <p>• Add music and voiceover</p>
                  <p>• Generate your trailer</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {teasers.map(teaser => (
                  <Card key={teaser.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      {/* Video Player */}
                      <div className="mb-4">
                        <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden">
                          {teaser.isGenerating ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <Wand2 className="h-12 w-12 mx-auto mb-4 animate-spin text-purple-500" />
                                <p className="text-purple-400">Generating trailer...</p>
                                <Progress value={progress} className="w-64 mt-2" />
                              </div>
                            </div>
                          ) : teaser.videoUrl ? (
                            <video
                              className="w-full h-full object-cover"
                              src={teaser.videoUrl}
                              controls={playingVideo === teaser.id}
                              onPlay={() => setPlayingVideo(teaser.id)}
                              onPause={() => setPlayingVideo(null)}
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                              <Video className="h-12 w-12" />
                            </div>
                          )}

                          {/* Custom Play/Pause Overlay */}
                          {!teaser.isGenerating && teaser.videoUrl && (
                            <div 
                              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                              onClick={() => toggleVideoPlayback(teaser.id)}
                            >
                              <Button variant="secondary" size="lg">
                                {playingVideo === teaser.id ? (
                                  <Pause className="h-6 w-6" />
                                ) : (
                                  <Play className="h-6 w-6" />
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Teaser Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {teaser.title || 'Untitled Teaser'}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{teaser.style}</Badge>
                            <Badge variant="outline">{teaser.duration}s</Badge>
                            {teaser.includeMusic && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Volume2 className="h-3 w-3" />
                                Music
                              </Badge>
                            )}
                            {teaser.includeVoiceover && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                Voice
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Scene List */}
                        <div>
                          <Label className="text-sm text-slate-400">Included Scenes:</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {teaser.scenes.map(sceneId => {
                              const scene = selectedProjectScenes.find(s => s.id === sceneId)
                              return scene ? (
                                <Badge key={sceneId} variant="outline" className="text-xs">
                                  Scene {sceneId}
                                </Badge>
                              ) : null
                            })}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => downloadTeaser(teaser)}
                            disabled={!teaser.videoUrl || teaser.isGenerating}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            disabled={teaser.isGenerating}
                            onClick={() => regenerateTeaser(teaser.id)}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Regenerate
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteTeaser(teaser.id)}
                            disabled={teaser.isGenerating}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}