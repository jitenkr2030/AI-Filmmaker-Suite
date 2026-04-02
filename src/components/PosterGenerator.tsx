'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette } from 'lucide-react'

export default function PosterGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Poster Generator
        </CardTitle>
        <CardDescription>
          Create stunning movie posters with AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Palette className="h-16 w-16 mx-auto mb-4 text-slate-500" />
          <h3 className="text-lg font-medium text-white mb-2">Coming Soon</h3>
          <p className="text-slate-400">Poster generator module is under development</p>
        </div>
      </CardContent>
    </Card>
  )
}