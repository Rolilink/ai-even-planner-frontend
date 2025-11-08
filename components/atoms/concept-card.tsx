"use client"

import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { EventConcept } from "@/store/event-planner"

interface ConceptCardProps {
  concept: EventConcept
  isSelected: boolean
  onSelect: () => void
}

export function ConceptCard({ concept, isSelected, onSelect }: ConceptCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={`cursor-pointer p-4 transition-all hover:shadow-md relative ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      <h3 className="text-lg font-semibold mb-0.5">{concept.title}</h3>
      <p className="text-sm text-muted-foreground">{concept.description}</p>
    </Card>
  )
}
