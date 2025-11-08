"use client"

import { useState } from "react"
import { EventPlannerForm } from "@/components/organisms/event-planner-form"
import { ConceptsStep } from "@/components/organisms/concepts-step"
import { VendorsStep } from "@/components/organisms/vendors-step"
// </CHANGE>

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleContinueToStep2 = () => {
    setCurrentStep(2)
  }

  const handleContinueToStep3 = () => {
    setCurrentStep(3)
  }

  const handleContinueToStep4 = () => {
    console.log("[v0] Event planning complete!")
  }
  // </CHANGE>

  return (
    <>
      {currentStep === 1 && <EventPlannerForm onContinue={handleContinueToStep2} />}
      {currentStep === 2 && <ConceptsStep onContinue={handleContinueToStep3} />}
      {currentStep === 3 && <VendorsStep onContinue={handleContinueToStep4} />}
      {/* </CHANGE> */}
    </>
  )
}
