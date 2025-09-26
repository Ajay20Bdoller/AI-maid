"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon, SparklesIcon } from 'lucide-react'
import { v4 } from 'uuid'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

function RoadmapGeneratorDialog({ openDialog, setOpenDialog }: any) {
  const [userInput, setUserInput] = useState<string>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { has } = useAuth()

  const GenerateRoadmap = async () => {
    const roadmapId = v4()
    setLoading(true)

    try {
      // @ts-ignore
      const hasSubscriptionEnabled = await has({ plan: 'pro' })

      if (!hasSubscriptionEnabled) {
        const resultHistory = await axios.get('/api/history')
        const historyList = resultHistory.data
        const isPresent = historyList.find(
          (item: any) => item?.aiAgentType == '/ai-tools/ai-roadmap-agent'
        )

        router.push('/billing')

        if (isPresent) {
          setLoading(false)
          return null
        }
      }

      const result = await axios.post('/api/ai-roadmap-agent', {
        roadmapId,
        userInput,
      })

      console.log(result.data)
      router.push('/ai-tools/ai-roadmap-agent/' + roadmapId)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter position/skills to generate roadmap</DialogTitle>
          <DialogDescription asChild>
            <div>
              <Input
                placeholder="e.g full stack developer"
                onChange={(event) => setUserInput(event.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={'outline'}>Cancel</Button>
          <Button
            onClick={GenerateRoadmap}
            disabled={loading || !userInput}
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <SparklesIcon />
            )}{' '}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RoadmapGeneratorDialog
