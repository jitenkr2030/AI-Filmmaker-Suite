'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Video } from 'lucide-react'

export default function TeaserGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Teaser Generator
        </CardTitle>
        <CardDescription>
          Generate AI-powered teaser trailers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Video className="h-16 w-16 mx-auto mb-4 text-slate-500" />
          <h3 className="text-lg font-medium text-white mb-2">Coming Soon</h3>
          <p className="text-slate-400">Teaser generator module is under development</p>
        </div>
      </CardContent>
    </Card>
  )
}