"use client"

import { useAtom } from "jotai"
import { Button } from "@/components/ui/button"
import { StepIndicator } from "@/components/molecules/step-indicator"
import { EventSummaryCard } from "@/components/molecules/event-summary-card"
import { ConceptGenerationForm } from "@/components/organisms/concept-generation-form"
import { eventFormAtom, conceptGenerationAtom } from "@/store/event-planner"
import { ArrowRight } from "lucide-react"

interface ConceptsStepProps {
  onContinue: () => void
}

export function ConceptsStep({ onContinue }: ConceptsStepProps) {
  const [eventData] = useAtom(eventFormAtom)
  const [conceptData] = useAtom(conceptGenerationAtom)

  const handleContinue = () => {
    console.log("[v0] Selected concept:", conceptData.selectedConceptId)
    onContinue()
  }

  const canContinue = conceptData.selectedConceptId !== null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <StepIndicator currentStep={2} totalSteps={3} stepTitle="Tell us what will be the vibe ✨ of your event" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <EventSummaryCard data={eventData} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <ConceptGenerationForm />

            <div className="flex justify-end">
              <Button onClick={handleContinue} disabled={!canContinue} size="lg">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
