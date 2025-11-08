"use client"

import { useAtom } from "jotai"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { StepIndicator } from "@/components/molecules/step-indicator"
import { EventSummaryCard } from "@/components/molecules/event-summary-card"
import { VendorCard } from "@/components/atoms/vendor-card"
import { eventFormAtom, vendorSelectionAtom, generateMockVendors, conceptGenerationAtom } from "@/store/event-planner"
import { RefreshCw, MessageSquare } from "lucide-react"

interface VendorsStepProps {
  onContinue: () => void
}

export function VendorsStep({ onContinue }: VendorsStepProps) {
  const [eventData] = useAtom(eventFormAtom)
  const [conceptData] = useAtom(conceptGenerationAtom)
  const [vendorData, setVendorData] = useAtom(vendorSelectionAtom)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // Generate initial vendors if not already done
  if (vendorData.categories.length === 0) {
    setVendorData({
      ...vendorData,
      categories: generateMockVendors(),
    })
  }

  const handleSendFeedback = () => {
    setIsGenerating(true)
    // Simulate AI generation delay
    setTimeout(() => {
      setVendorData({
        ...vendorData,
        categories: generateMockVendors(),
      })
      setIsGenerating(false)
      setShowFeedback(false) // Hide feedback card after submission
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30">
      <StepIndicator currentStep={3} totalSteps={3} stepTitle="Review and select your vendors" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Event Summary */}
          <div className="lg:col-span-1">
            <EventSummaryCard
              data={eventData}
              selectedConcept={conceptData.concepts.find((c) => c.id === conceptData.selectedConceptId)}
            />
          </div>

          {/* Right Column - Vendor Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vendor Categories */}
            <div className="space-y-8">
              {vendorData.categories.map((category, index) => (
                <div key={category.id}>
                  <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.vendors.map((vendor) => (
                      <VendorCard key={vendor.id} name={vendor.name} type={vendor.type} reasoning={vendor.reasoning} />
                    ))}
                  </div>
                  {index < vendorData.categories.length - 1 && <div className="mt-8 border-t border-gray-200" />}
                </div>
              ))}
            </div>

            {showFeedback ? (
              <Card className="p-6 space-y-4">
                <h3 className="text-base font-semibold">
                  Do you have any feedback on the selected categories and vendor ideas?
                </h3>
                <Textarea
                  id="vendor-feedback"
                  placeholder="Share your thoughts on the vendors, suggest changes, or let us know what you'd like to see differently..."
                  value={vendorData.vendorFeedback}
                  onChange={(e) => setVendorData({ ...vendorData, vendorFeedback: e.target.value })}
                  rows={4}
                  className="shadow-none"
                />
                <Button
                  onClick={handleSendFeedback}
                  disabled={isGenerating}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                  Send Feedback
                </Button>
              </Card>
            ) : (
              <Button onClick={() => setShowFeedback(true)} className="w-full h-12 bg-primary hover:bg-primary/90">
                <MessageSquare className="w-4 h-4 mr-2" />
                Have feedback on these vendors?
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
