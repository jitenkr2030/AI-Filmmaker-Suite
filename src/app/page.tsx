'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, FileText, Users, Image, Video, Film, Palette } from 'lucide-react'
import ScriptInput from '@/components/ScriptInput'
import ProjectDashboard from '@/components/ProjectDashboard'
import StoryboardGenerator from '@/components/StoryboardGenerator'
import CharacterDesigner from '@/components/CharacterDesigner'
import PosterGenerator from '@/components/PosterGenerator'
import TeaserGenerator from '@/components/TeaserGenerator'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Film className="h-12 w-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">AI Filmmaker Suite</h1>
          </div>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Transform your scripts into stunning visual content with AI. 
            From storyboard to teaser trailer, create entire films in minutes.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
              <FileText className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="script" className="data-[state=active]:bg-purple-600">
              <Upload className="h-4 w-4 mr-2" />
              Script
            </TabsTrigger>
            <TabsTrigger value="storyboard" className="data-[state=active]:bg-purple-600">
              <Image className="h-4 w-4 mr-2" />
              Storyboard
            </TabsTrigger>
            <TabsTrigger value="characters" className="data-[state=active]:bg-purple-600">
              <Users className="h-4 w-4 mr-2" />
              Characters
            </TabsTrigger>
            <TabsTrigger value="poster" className="data-[state=active]:bg-purple-600">
              <Palette className="h-4 w-4 mr-2" />
              Poster
            </TabsTrigger>
            <TabsTrigger value="teaser" className="data-[state=active]:bg-purple-600">
              <Video className="h-4 w-4 mr-2" />
              Teaser
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <ProjectDashboard />
            </TabsContent>

            <TabsContent value="script" className="space-y-6">
              <ScriptInput />
            </TabsContent>

            <TabsContent value="storyboard" className="space-y-6">
              <StoryboardGenerator />
            </TabsContent>

            <TabsContent value="characters" className="space-y-6">
              <CharacterDesigner />
            </TabsContent>

            <TabsContent value="poster" className="space-y-6">
              <PosterGenerator />
            </TabsContent>

            <TabsContent value="teaser" className="space-y-6">
              <TeaserGenerator />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}