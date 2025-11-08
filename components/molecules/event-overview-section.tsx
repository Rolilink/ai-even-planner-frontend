"use client"

import { FileText } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface EventOverviewSectionProps {
  value: string
  onChange: (value: string) => void
}

export function EventOverviewSection({ value, onChange }: EventOverviewSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="overview" className="text-base font-medium flex items-center gap-2">
        <FileText className="h-5 w-5 text-black" />
        Event Overview
      </Label>
      <Textarea
        id="overview"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your event, including what you're celebrating, preferred venue type (restaurant, rooftop, park, home, beach), and any important details..."
        className="min-h-32 resize-none shadow-none"
      />
    </div>
  )
}
