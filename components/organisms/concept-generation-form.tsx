"use client"

import { useState, useRef, useEffect } from "react"
import { useAtom } from "jotai"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ConceptCard } from "@/components/atoms/concept-card"
import { FeedbackCard } from "@/components/atoms/feedback-card"
import { conceptGenerationAtom, generateMockConcepts } from "@/store/event-planner"
import { Lightbulb, RefreshCw, Loader2 } from "lucide-react"

export function ConceptGenerationForm() {
  const [conceptData, setConceptData] = useAtom(conceptGenerationAtom)
  const [showConcepts, setShowConcepts] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const feedbackFormRef = useRef<HTMLDivElement>(null)
  const likedInputRef = useRef<HTMLTextAreaElement>(null)

  const handleGenerateConcepts = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const concepts = generateMockConcepts()
    setConceptData({
      ...conceptData,
      concepts,
      showFeedbackForm: false,
    })
    setShowConcepts(true)
    setIsLoading(false)
  }

  const handleRegenerateConcepts = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const concepts = generateMockConcepts()
    setConceptData({
      ...conceptData,
      concepts,
      feedbackLiked: "",
      feedbackDisliked: "",
      showFeedbackForm: false,
    })
    setIsLoading(false)
  }

  const handleSelectConcept = (conceptId: string) => {
    setConceptData({
      ...conceptData,
      selectedConceptId: conceptId,
    })
  }

  const handleExpandFeedback = () => {
    setConceptData({
      ...conceptData,
      showFeedbackForm: true,
    })
  }

  useEffect(() => {
    if (conceptData.showFeedbackForm && feedbackFormRef.current && likedInputRef.current) {
      feedbackFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      setTimeout(() => {
        likedInputRef.current?.focus()
      }, 300)
    }
  }, [conceptData.showFeedbackForm])

  if (isLoading) {
    return (
      <Card className="p-12 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">Generating event concepts...</p>
        <p className="text-sm text-muted-foreground">This will take just a moment</p>
      </Card>
    )
  }

  if (!showConcepts) {
    return (
      <Card className="p-6 space-y-4">
        <div>
          <Label htmlFor="additionalIdeas" className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4" />
            Additional Ideas or Preferences
          </Label>
          <Textarea
            id="additionalIdeas"
            placeholder="Tell us more about your vision, any specific themes, or ideas you have in mind..."
            value={conceptData.additionalIdeas}
            onChange={(e) => setConceptData({ ...conceptData, additionalIdeas: e.target.value })}
            className="min-h-[150px] shadow-none"
          />
        </div>

        <Button onClick={handleGenerateConcepts} className="w-full">
          <Lightbulb className="w-4 h-4 mr-2" />
          Suggest Concepts
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {conceptData.showFeedbackForm && (
        <Card ref={feedbackFormRef} className="p-6 space-y-4 bg-white">
          <h3 className="text-xl font-semibold">Help us understand your preferences</h3>

          <div className="space-y-2">
            <Label htmlFor="feedbackLiked" className="text-base font-medium">
              What did you like?
            </Label>
            <Textarea
              ref={likedInputRef}
              id="feedbackLiked"
              placeholder="Tell us what aspects you enjoyed..."
              value={conceptData.feedbackLiked}
              onChange={(e) => setConceptData({ ...conceptData, feedbackLiked: e.target.value })}
              className="min-h-[100px] shadow-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedbackDisliked" className="text-base font-medium">
              What would you like to change?
            </Label>
            <Textarea
              id="feedbackDisliked"
              placeholder="Tell us what you'd like to see differently..."
              value={conceptData.feedbackDisliked}
              onChange={(e) => setConceptData({ ...conceptData, feedbackDisliked: e.target.value })}
              className="min-h-[100px] shadow-none"
            />
          </div>

          <Button onClick={handleRegenerateConcepts} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate New Concepts
          </Button>
        </Card>
      )}

      {!conceptData.showFeedbackForm && (
        <div className="grid grid-cols-2 gap-4">
          {conceptData.concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              isSelected={conceptData.selectedConceptId === concept.id}
              onSelect={() => handleSelectConcept(concept.id)}
            />
          ))}
          <FeedbackCard onExpand={handleExpandFeedback} />
        </div>
      )}
    </div>
  )
}
