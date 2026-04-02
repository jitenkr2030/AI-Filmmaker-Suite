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
import { Palette, Wand2, Download, Eye, RefreshCw, Film } from 'lucide-react'

interface Poster {
  id: string
  projectId: string
  title?: string
  tagline?: string
  imageUrl?: string
  style: string
  description: string
  prompt?: string
  isGenerating?: boolean
}

export default function PosterGenerator() {
  const [posters, setPosters] = useState<Poster[]>([])
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Poster configuration
  const [posterConfig, setPosterConfig] = useState({
    title: '',
    tagline: '',
    style: 'cinematic',
    mood: 'dramatic',
    aspectRatio: '2:3',
    colorScheme: 'dramatic'
  })

  const projects = [
    { id: 'project1', title: 'The Last Dawn' },
    { id: 'project2', title: 'Coffee Shop Dreams' },
    { id: 'project3', title: 'Midnight in Tokyo' }
  ]

  const posterStyles = [
    { 
      value: 'cinematic', 
      label: 'Cinematic', 
      description: 'Professional movie poster style',
      examples: 'Dramatic lighting, film grain, professional typography'
    },
    { 
      value: 'minimalist', 
      label: 'Minimalist', 
      description: 'Clean and simple design',
      examples: 'Negative space, simple shapes, limited color palette'
    },
    { 
      value: 'vintage', 
      label: 'Vintage', 
      description: 'Retro movie poster style',
      examples: 'Aged paper texture, classic typography, retro colors'
    },
    { 
      value: 'modern', 
      label: 'Modern', 
      description: 'Contemporary design style',
      examples: 'Bold typography, geometric shapes, vibrant colors'
    },
    { 
      value: 'artistic', 
      label: 'Artistic', 
      description: 'Painterly, illustrated style',
      examples: 'Digital painting, brush strokes, artistic interpretation'
    },
    { 
      value: 'noir', 
      label: 'Film Noir', 
      description: 'Black and white mystery style',
      examples: 'High contrast, dramatic shadows, monochrome'
    }
  ]

  const moods = [
    { value: 'dramatic', label: 'Dramatic', description: 'Intense and serious' },
    { value: 'adventurous', label: 'Adventurous', description: 'Exciting and bold' },
    { value: 'romantic', label: 'Romantic', description: 'Emotional and intimate' },
    { value: 'mysterious', label: 'Mysterious', description: 'Intriguing and enigmatic' },
    { value: 'action', label: 'Action', description: 'Dynamic and energetic' },
    { value: 'horror', label: 'Horror', description: 'Dark and suspenseful' },
    { value: 'comedy', label: 'Comedy', description: 'Light and humorous' }
  ]

  const aspectRatios = [
    { value: '2:3', label: 'Portrait (2:3)', description: 'Standard movie poster' },
    { value: '1:1.5', label: 'Portrait (1:1.5)', description: 'Alternative portrait' },
    { value: '16:9', label: 'Landscape (16:9)', description: 'Wide format' },
    { value: '1:1', label: 'Square (1:1)', description: 'Social media ready' }
  ]

  const colorSchemes = [
    { value: 'dramatic', label: 'Dramatic', colors: 'Deep blues, blacks, gold accents' },
    { value: 'vibrant', label: 'Vibrant', colors: 'Bright, saturated colors' },
    { value: 'monochrome', label: 'Monochrome', colors: 'Black, white, gray tones' },
    { value: 'warm', label: 'Warm', colors: 'Reds, oranges, yellows' },
    { value: 'cool', label: 'Cool', colors: 'Blues, greens, purples' },
    { value: 'pastel', label: 'Pastel', colors: 'Soft, muted colors' }
  ]

  const generatePoster = async () => {
    if (!selectedProject) {
      setError('Please select a project first')
      return
    }

    if (!posterConfig.title.trim()) {
      setError('Poster title is required')
      return
    }

    setIsGenerating(true)
    setError(null)
    setProgress(0)

    try {
      const posterId = Date.now().toString()
      const newPoster: Poster = {
        id: posterId,
        projectId: selectedProject,
        title: posterConfig.title,
        tagline: posterConfig.tagline,
        style: posterConfig.style,
        description: `${posterConfig.title} - ${posterConfig.style} movie poster`,
        isGenerating: true
      }

      // Add poster placeholder
      setPosters(prev => [...prev, newPoster])

      // Simulate API call progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      // Generate mock image URL based on style and aspect ratio
      const aspectRatioMap: { [key: string]: string } = {
        '2:3': '400x600',
        '1:1.5': '400x600',
        '16:9': '800x450',
        '1:1': '600x600'
      }
      
      const dimensions = aspectRatioMap[posterConfig.aspectRatio] || '400x600'
      const imageUrl = `https://picsum.photos/seed/poster-${posterId}-${posterConfig.style}/${dimensions}.jpg`

      // Update poster with generated image
      setPosters(prev => prev.map(poster =>
        poster.id === posterId
          ? { ...poster, imageUrl, isGenerating: false }
          : poster
      ))

    } catch (err) {
      setError('Failed to generate poster. Please try again.')
    } finally {
      setIsGenerating(false)
      setProgress(0)
    }
  }

  const deletePoster = (posterId: string) => {
    setPosters(prev => prev.filter(poster => poster.id !== posterId))
  }

  const regeneratePoster = async (posterId: string) => {
    const poster = posters.find(p => p.id === posterId)
    if (!poster) return

    // Update poster to generating state
    setPosters(prev => prev.map(p =>
      p.id === posterId
        ? { ...p, isGenerating: true }
        : p
    ))

    // Simulate regeneration
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newImageUrl = `https://picsum.photos/seed/poster-${posterId}-regen-${Date.now()}/400x600.jpg`
    
    setPosters(prev => prev.map(p =>
      p.id === posterId
        ? { ...p, imageUrl: newImageUrl, isGenerating: false }
        : p
    ))
  }

  const downloadPoster = (poster: Poster) => {
    if (!poster.imageUrl) return
    
    // Create download link
    const link = document.createElement('a')
    link.href = poster.imageUrl
    link.download = `${poster.title || 'poster'}-${poster.id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Poster Configuration
            </CardTitle>
            <CardDescription>
              Design your movie poster
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

            {/* Poster Title */}
            <div>
              <Label htmlFor="poster-title">Poster Title</Label>
              <Input
                id="poster-title"
                value={posterConfig.title}
                onChange={(e) => setPosterConfig(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter poster title"
                className="mt-1"
              />
            </div>

            {/* Tagline */}
            <div>
              <Label htmlFor="poster-tagline">Tagline (Optional)</Label>
              <Input
                id="poster-tagline"
                value={posterConfig.tagline}
                onChange={(e) => setPosterConfig(prev => ({ ...prev, tagline: e.target.value }))}
                placeholder="Enter tagline"
                className="mt-1"
              />
            </div>

            {/* Style Selection */}
            <div>
              <Label>Visual Style</Label>
              <Select value={posterConfig.style} onValueChange={(value) => setPosterConfig(prev => ({ ...prev, style: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {posterStyles.map(style => (
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

            {/* Mood Selection */}
            <div>
              <Label>Mood</Label>
              <Select value={posterConfig.mood} onValueChange={(value) => setPosterConfig(prev => ({ ...prev, mood: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {moods.map(mood => (
                    <SelectItem key={mood.value} value={mood.value}>
                      {mood.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <Label>Aspect Ratio</Label>
              <Select value={posterConfig.aspectRatio} onValueChange={(value) => setPosterConfig(prev => ({ ...prev, aspectRatio: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatios.map(ratio => (
                    <SelectItem key={ratio.value} value={ratio.value}>
                      {ratio.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Scheme */}
            <div>
              <Label>Color Scheme</Label>
              <Select value={posterConfig.colorScheme} onValueChange={(value) => setPosterConfig(prev => ({ ...prev, colorScheme: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorSchemes.map(scheme => (
                    <SelectItem key={scheme.value} value={scheme.value}>
                      <div>
                        <div className="font-medium">{scheme.label}</div>
                        <div className="text-xs text-slate-500">{scheme.colors}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button 
              onClick={generatePoster}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Poster...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Poster
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Creating poster...</span>
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

        {/* Poster Gallery */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Film className="h-5 w-5" />
              Generated Posters
            </CardTitle>
            <CardDescription>
              Your movie poster collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            {posters.length === 0 ? (
              <div className="text-center py-12">
                <Palette className="h-16 w-16 mx-auto mb-4 text-slate-500" />
                <h3 className="text-lg font-medium text-white mb-2">No Posters Yet</h3>
                <p className="text-slate-400 mb-4">Create your first movie poster</p>
                <div className="text-sm text-slate-500 space-y-1">
                  <p>• Select a project</p>
                  <p>• Choose style and mood</p>
                  <p>• Generate your poster</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posters.map(poster => (
                  <Card key={poster.id} className="overflow-hidden">
                    <div className="relative">
                      <div 
                        className="bg-slate-800 relative overflow-hidden"
                        style={{ aspectRatio: posterConfig.aspectRatio === '16:9' ? '16/9' : posterConfig.aspectRatio === '1:1' ? '1/1' : '2/3' }}
                      >
                        {poster.isGenerating ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <Wand2 className="h-12 w-12 mx-auto mb-4 animate-spin text-purple-500" />
                              <p className="text-purple-400">Generating poster...</p>
                            </div>
                          </div>
                        ) : poster.imageUrl ? (
                          <img
                            src={poster.imageUrl}
                            alt={poster.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                            <Palette className="h-12 w-12" />
                          </div>
                        )}

                        {/* Poster Overlay Info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white font-bold text-lg mb-1">{poster.title}</h3>
                          {poster.tagline && (
                            <p className="text-white/80 text-sm italic">"{poster.tagline}"</p>
                          )}
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {poster.style}
                            </Badge>
                            <Badge variant="outline" className="text-xs text-white">
                              {posterConfig.mood}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => downloadPoster(poster)}
                          disabled={!poster.imageUrl || poster.isGenerating}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          disabled={poster.isGenerating}
                          onClick={() => regeneratePoster(poster.id)}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Regenerate
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deletePoster(poster.id)}
                          disabled={poster.isGenerating}
                        >
                          Delete
                        </Button>
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