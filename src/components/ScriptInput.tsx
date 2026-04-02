'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, FileText, Wand2, CheckCircle, AlertCircle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ScriptInput() {
  const [scriptData, setScriptData] = useState({
    title: '',
    content: '',
    format: 'plain'
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeScript = async () => {
    if (!scriptData.content.trim()) {
      setError('Please enter a script first.')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/script/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scriptData)
      })

      if (!response.ok) throw new Error('Failed to analyze script')
      
      const result = await response.json()
      setAnalysisResult(result)
    } catch (err) {
      setError('Failed to analyze script. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Script Input
        </CardTitle>
        <CardDescription>
          Upload your script or write it directly. AI will analyze scenes, characters, and settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Script Title</Label>
          <Input
            id="title"
            value={scriptData.title}
            onChange={(e) => setScriptData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter your script title..."
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="format">Script Format</Label>
          <Select value={scriptData.format} onValueChange={(value) => setScriptData(prev => ({ ...prev, format: value }))}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select script format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plain">Plain Text</SelectItem>
              <SelectItem value="fountain">Fountain</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="content">Script Content</Label>
          <Textarea
            id="content"
            value={scriptData.content}
            onChange={(e) => setScriptData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Write your script here or paste it from another source..."
            className="mt-2 min-h-[300px] font-mono text-sm"
          />
        </div>

        <Button 
          onClick={analyzeScript} 
          disabled={isAnalyzing || !scriptData.content.trim()}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Wand2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing Script...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Analyze Script
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {analysisResult && (
          <Card className="bg-green-900/20 border-green-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                Script Analysis Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{analysisResult.scenes?.length || 0}</div>
                  <div className="text-sm text-slate-400">Scenes</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{analysisResult.characters?.length || 0}</div>
                  <div className="text-sm text-slate-400">Characters</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{analysisResult.settings?.length || 0}</div>
                  <div className="text-sm text-slate-400">Settings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}