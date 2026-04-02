'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, FileText, Users, Image, Video, Film, Palette, LogIn } from 'lucide-react'
import ScriptInput from '@/components/ScriptInput'
import ProjectDashboard from '@/components/ProjectDashboard'
import StoryboardGenerator from '@/components/StoryboardGenerator'
import CharacterDesigner from '@/components/CharacterDesigner'
import PosterGenerator from '@/components/PosterGenerator'
import TeaserGenerator from '@/components/TeaserGenerator'
import UserDashboard from '@/components/UserDashboard'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Film className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Film className="h-16 w-16 text-purple-400 mr-4" />
              <h1 className="text-5xl font-bold text-white">AI Filmmaker Suite</h1>
            </div>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-8">
              Transform your scripts into stunning visual content with AI. 
              From storyboard to teaser trailer, create entire films in minutes.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/signin">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-950">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-600 transition-colors">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Script Analysis</h3>
                <p className="text-slate-400 text-sm">AI-powered script analysis with scene and character extraction</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-600 transition-colors">
              <CardContent className="p-6 text-center">
                <Image className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Storyboard Generation</h3>
                <p className="text-slate-400 text-sm">Create visual storyboards in multiple artistic styles</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-600 transition-colors">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Character Design</h3>
                <p className="text-slate-400 text-sm">AI-generated character concepts and designs</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-600 transition-colors">
              <CardContent className="p-6 text-center">
                <Palette className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Poster Creation</h3>
                <p className="text-slate-400 text-sm">Generate professional movie posters and promo materials</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-600 transition-colors">
              <CardContent className="p-6 text-center">
                <Video className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Teaser Videos</h3>
                <p className="text-slate-400 text-sm">Create AI-powered video trailers with narration</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-600 transition-colors">
              <CardContent className="p-6 text-center">
                <Film className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Project Management</h3>
                <p className="text-slate-400 text-sm">Organize all your film projects in one place</p>
              </CardContent>
            </Card>
          </div>

          {/* Pricing */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">Free</CardTitle>
                  <CardDescription className="text-slate-400">Perfect for trying out</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-white mb-4">$0<span className="text-lg text-slate-400">/month</span></div>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="text-slate-300 text-sm">✓ 10 AI credits/month</li>
                    <li className="text-slate-300 text-sm">✓ Script analysis</li>
                    <li className="text-slate-300 text-sm">✓ Basic storyboards</li>
                    <li className="text-slate-300 text-sm">✓ 1 project</li>
                  </ul>
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/30 border-purple-600">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">Pro</CardTitle>
                  <CardDescription className="text-purple-200">Most popular</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-white mb-4">$30<span className="text-lg text-slate-400">/month</span></div>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="text-slate-300 text-sm">✓ 500 AI credits/month</li>
                    <li className="text-slate-300 text-sm">✓ All features</li>
                    <li className="text-slate-300 text-sm">✓ HD video generation</li>
                    <li className="text-slate-300 text-sm">✓ 20 projects</li>
                    <li className="text-slate-300 text-sm">✓ Priority support</li>
                  </ul>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Free Trial</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="text-center">
                  <CardTitle className="text-white">Enterprise</CardTitle>
                  <CardDescription className="text-slate-400">For teams</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-white mb-4">Custom</div>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="text-slate-300 text-sm">✓ Unlimited credits</li>
                    <li className="text-slate-300 text-sm">✓ All features</li>
                    <li className="text-slate-300 text-sm">✓ API access</li>
                    <li className="text-slate-300 text-sm">✓ Custom models</li>
                    <li className="text-slate-300 text-sm">✓ Dedicated support</li>
                  </ul>
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full">Contact Sales</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with User Info */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Film className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">AI Filmmaker Suite</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Welcome, {session.user?.name || session.user?.email}</span>
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                Switch Account
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Dashboard Sidebar */}
          <div className="lg:col-span-1">
            <UserDashboard />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
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
      </div>
    </div>
  )
}