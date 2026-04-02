'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Wand2, Plus, Download, Eye, RefreshCw } from 'lucide-react'

interface Character {
  id: string
  name: string
  description: string
  appearance: string
  personality: string
  role: string
  designs: CharacterDesign[]
}

interface CharacterDesign {
  id: string
  characterId: string
  imageUrl?: string
  style: string
  description: string
  prompt?: string
  isGenerating?: boolean
}

export default function CharacterDesigner() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Form state for new character
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    description: '',
    appearance: '',
    personality: '',
    role: 'supporting'
  })

  // Design generation state
  const [designConfig, setDesignConfig] = useState({
    style: 'realistic',
    expression: 'neutral',
    angle: 'front',
    mood: 'determined'
  })

  const characterRoles = [
    { value: 'protagonist', label: 'Protagonist' },
    { value: 'antagonist', label: 'Antagonist' },
    { value: 'supporting', label: 'Supporting' },
    { value: 'narrator', label: 'Narrator' },
    { value: 'mentor', label: 'Mentor' }
  ]

  const designStyles = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic style' },
    { value: 'cinematic', label: 'Cinematic', description: 'Movie-style rendering' },
    { value: 'anime', label: 'Anime', description: 'Japanese animation style' },
    { value: 'comic', label: 'Comic Book', description: 'Graphic novel style' },
    { value: 'concept_art', label: 'Concept Art', description: 'Digital painting style' },
    { value: 'watercolor', label: 'Watercolor', description: 'Traditional art style' }
  ]

  const expressions = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'determined', 'mysterious']
  const angles = ['front', 'profile', 'three-quarter', 'back', 'action_pose']
  const moods = ['determined', 'friendly', 'intimidating', 'wise', 'youthful', 'veteran']

  const createCharacter = () => {
    if (!newCharacter.name.trim()) {
      setError('Character name is required')
      return
    }

    const character: Character = {
      id: Date.now().toString(),
      ...newCharacter,
      designs: []
    }

    setCharacters(prev => [...prev, character])
    setSelectedCharacter(character)
    setNewCharacter({
      name: '',
      description: '',
      appearance: '',
      personality: '',
      role: 'supporting'
    })
    setError(null)
  }

  const generateCharacterDesign = async () => {
    if (!selectedCharacter) return

    setIsGenerating(true)
    setError(null)
    setProgress(0)

    try {
      const designId = Date.now().toString()
      const newDesign: CharacterDesign = {
        id: designId,
        characterId: selectedCharacter.id,
        style: designConfig.style,
        description: `${selectedCharacter.name} - ${designConfig.expression} ${designConfig.angle} view`,
        isGenerating: true
      }

      // Add design placeholder
      setCharacters(prev => prev.map(char => 
        char.id === selectedCharacter.id
          ? { ...char, designs: [...char.designs, newDesign] }
          : char
      ))

      // Simulate API call progress
      for (let i = 0; i <= 100; i += 20) {
        setProgress(i)
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // Generate mock image URL
      const imageUrl = `https://picsum.photos/seed/character-${selectedCharacter.id}-${designId}/400/600.jpg`

      // Update design with generated image
      setCharacters(prev => prev.map(char => 
        char.id === selectedCharacter.id
          ? {
              ...char,
              designs: char.designs.map(design =>
                design.id === designId
                  ? { ...design, imageUrl, isGenerating: false }
                  : design
              )
            }
          : char
      ))

      // Update selected character
      setSelectedCharacter(prev => prev ? {
        ...prev,
        designs: prev.designs.map(design =>
          design.id === designId
            ? { ...design, imageUrl, isGenerating: false }
            : design
        )
      } : null)

    } catch (err) {
      setError('Failed to generate character design. Please try again.')
    } finally {
      setIsGenerating(false)
      setProgress(0)
    }
  }

  const deleteCharacter = (characterId: string) => {
    setCharacters(prev => prev.filter(char => char.id !== characterId))
    if (selectedCharacter?.id === characterId) {
      setSelectedCharacter(null)
    }
  }

  const deleteDesign = (characterId: string, designId: string) => {
    setCharacters(prev => prev.map(char =>
      char.id === characterId
        ? { ...char, designs: char.designs.filter(design => design.id !== designId) }
        : char
    ))

    if (selectedCharacter?.id === characterId) {
      setSelectedCharacter(prev => prev ? {
        ...prev,
        designs: prev.designs.filter(design => design.id !== designId)
      } : null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Characters
            </CardTitle>
            <CardDescription>
              Manage your film characters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Character Form */}
            <div className="space-y-3 p-4 bg-slate-800/50 rounded-lg">
              <div>
                <Label htmlFor="char-name">Name</Label>
                <Input
                  id="char-name"
                  value={newCharacter.name}
                  onChange={(e) => setNewCharacter(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Character name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="char-role">Role</Label>
                <Select value={newCharacter.role} onValueChange={(value) => setNewCharacter(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {characterRoles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={createCharacter} className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Character
              </Button>
            </div>

            {/* Character List */}
            <div className="space-y-2">
              {characters.map(character => (
                <div
                  key={character.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCharacter?.id === character.id
                      ? 'border-purple-500 bg-purple-950/30'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => setSelectedCharacter(character)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{character.name}</div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {character.role}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400">
                      {character.designs.length} designs
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {characters.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No characters yet</p>
                <p className="text-xs">Add your first character above</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Character Details and Design */}
        <Card className="lg:col-span-2">
          {selectedCharacter ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white">{selectedCharacter.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{selectedCharacter.role}</Badge>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-400">{selectedCharacter.designs.length} designs</span>
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => deleteCharacter(selectedCharacter.id)}>
                    Delete
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={selectedCharacter.description}
                          onChange={(e) => {
                            const updated = { ...selectedCharacter, description: e.target.value }
                            setSelectedCharacter(updated)
                            setCharacters(prev => prev.map(char => 
                              char.id === updated.id ? updated : char
                            ))
                          }}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label>Appearance</Label>
                        <Textarea
                          value={selectedCharacter.appearance}
                          onChange={(e) => {
                            const updated = { ...selectedCharacter, appearance: e.target.value }
                            setSelectedCharacter(updated)
                            setCharacters(prev => prev.map(char => 
                              char.id === updated.id ? updated : char
                            ))
                          }}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Personality</Label>
                      <Textarea
                        value={selectedCharacter.personality}
                        onChange={(e) => {
                          const updated = { ...selectedCharacter, personality: e.target.value }
                          setSelectedCharacter(updated)
                          setCharacters(prev => prev.map(char => 
                            char.id === updated.id ? updated : char
                          ))
                        }}
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Art Style</Label>
                        <Select value={designConfig.style} onValueChange={(value) => setDesignConfig(prev => ({ ...prev, style: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {designStyles.map(style => (
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

                      <div>
                        <Label>Expression</Label>
                        <Select value={designConfig.expression} onValueChange={(value) => setDesignConfig(prev => ({ ...prev, expression: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {expressions.map(expr => (
                              <SelectItem key={expr} value={expr}>
                                {expr.charAt(0).toUpperCase() + expr.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Angle</Label>
                        <Select value={designConfig.angle} onValueChange={(value) => setDesignConfig(prev => ({ ...prev, angle: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {angles.map(angle => (
                              <SelectItem key={angle} value={angle}>
                                {angle.replace('_', ' ').charAt(0).toUpperCase() + angle.replace('_', ' ').slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Mood</Label>
                        <Select value={designConfig.mood} onValueChange={(value) => setDesignConfig(prev => ({ ...prev, mood: value }))}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {moods.map(mood => (
                              <SelectItem key={mood} value={mood}>
                                {mood.charAt(0).toUpperCase() + mood.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={generateCharacterDesign}
                      disabled={isGenerating}
                      className="w-full"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating Design...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Design
                        </>
                      )}
                    </Button>

                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Creating character design...</span>
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
                  </TabsContent>

                  <TabsContent value="gallery" className="space-y-4">
                    {selectedCharacter.designs.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                        <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">No Designs Yet</h3>
                        <p className="text-sm mb-4">Generate your first character design</p>
                        <Button onClick={() => {}} variant="outline">
                          Go to Design Tab
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedCharacter.designs.map(design => (
                          <Card key={design.id} className="overflow-hidden">
                            <div className="aspect-[2/3] bg-slate-800 relative">
                              {design.isGenerating ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Wand2 className="h-8 w-8 animate-spin text-purple-500" />
                                </div>
                              ) : design.imageUrl ? (
                                <img
                                  src={design.imageUrl}
                                  alt={design.description}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                                  <Users className="h-8 w-8" />
                                </div>
                              )}
                            </div>
                            
                            <CardContent className="p-3">
                              <div className="text-sm font-medium text-white mb-1">
                                {design.style}
                              </div>
                              <div className="text-xs text-slate-400 mb-2">
                                {design.description}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Download className="h-3 w-3 mr-1" />
                                  Save
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => deleteDesign(selectedCharacter.id, design.id)}
                                >
                                  <RefreshCw className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center text-slate-400">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a Character</h3>
                <p className="text-sm">Choose a character from the list to view and edit details</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}