'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, LogOut, Crown, Zap, CreditCard, Settings } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function UserDashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="animate-pulse">Loading...</div>
  }

  if (!session) {
    return null
  }

  const { user } = session
  const creditsUsed = user.creditsUsed || 0
  const creditsLimit = user.creditsLimit || 10
  const creditsRemaining = creditsLimit - creditsUsed
  const creditsPercentage = (creditsUsed / creditsLimit) * 100

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-600'
      case 'starter': return 'bg-blue-600'
      case 'pro': return 'bg-purple-600'
      case 'enterprise': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'free': return <User className="h-4 w-4" />
      case 'starter': return <Zap className="h-4 w-4" />
      case 'pro': return <Crown className="h-4 w-4" />
      case 'enterprise': return <CreditCard className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || ''} alt={user.name || ''} />
              <AvatarFallback>
                {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-white text-lg">
                {user.name || 'User'}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {user.email}
              </CardDescription>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem 
                className="text-red-400 hover:text-red-300 focus:text-red-300"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Subscription Plan */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium text-slate-300">Current Plan</Label>
            <Badge className={`${getPlanColor(user.plan || 'free')} text-white`}>
              <div className="flex items-center gap-1">
                {getPlanIcon(user.plan || 'free')}
                {(user.plan || 'free').charAt(0).toUpperCase() + (user.plan || 'free').slice(1))}
              </div>
            </Badge>
          </div>
        </div>

        {/* Credits Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium text-slate-300">AI Credits</Label>
            <span className="text-sm text-slate-400">
              {creditsRemaining} / {creditsLimit}
            </span>
          </div>
          <Progress value={creditsPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>{creditsUsed} used</span>
            <span>{creditsRemaining} remaining</span>
          </div>
        </div>

        {/* Plan Benefits */}
        <div>
          <Label className="text-sm font-medium text-slate-300 mb-2">Plan Benefits</Label>
          <div className="space-y-1">
            {(user.plan === 'free' || user.plan === 'starter' || user.plan === 'pro' || user.plan === 'enterprise') && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Script analysis
              </div>
            )}
            {(user.plan === 'starter' || user.plan === 'pro' || user.plan === 'enterprise') && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                HD storyboards
              </div>
            )}
            {(user.plan === 'pro' || user.plan === 'enterprise') && (
              <>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Video teasers
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Priority processing
                </div>
              </>
            )}
            {user.plan === 'enterprise' && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                API access
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Button */}
        {user.plan === 'free' && (
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Starter
          </Button>
        )}

        {user.plan === 'starter' && (
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Pro
          </Button>
        )}

        {user.plan === 'pro' && (
          <Button variant="outline" className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Contact Sales for Enterprise
          </Button>
        )}
      </CardContent>
    </Card>
  )
}