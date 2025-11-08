"use client"

import { Card } from "@/components/ui/card"

interface FeedbackCardProps {
  onExpand: () => void
}

export function FeedbackCard({ onExpand }: FeedbackCardProps) {
  return (
    <Card
      onClick={onExpand}
      className="cursor-pointer p-4 transition-all border-dashed border-2 bg-white hover:bg-transparent flex flex-col items-center justify-center text-center space-y-0.5 h-full"
    >
      <h3 className="text-lg font-semibold">Didn't like any of these?</h3>
      <p className="text-sm text-muted-foreground">Generate new concepts with your feedback</p>
    </Card>
  )
}
