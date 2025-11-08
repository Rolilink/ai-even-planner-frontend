"use client"

import { useAtom } from "jotai"
import { eventFormAtom } from "@/store/event-planner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StepIndicator } from "@/components/molecules/step-indicator"
import { EventOverviewSection } from "@/components/molecules/event-overview-section"
import { DualRangeInput } from "@/components/atoms/dual-range-input"
import { DateTimePicker } from "@/components/atoms/date-time-picker"
import { PreferencesSection } from "@/components/molecules/preferences-section"
import { ArrowRight, DollarSign, Users } from "lucide-react"

interface EventPlannerFormProps {
  onContinue: () => void
}

export function EventPlannerForm({ onContinue }: EventPlannerFormProps) {
  const [formData, setFormData] = useAtom(eventFormAtom)

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`

  const handleNext = () => {
    console.log("[v0] Form data:", formData)
    onContinue()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <StepIndicator
        currentStep={1}
        totalSteps={3}
        stepTitle="Tell us about your event and we'll help you bring it to life"
      />

      <div className="flex items-center justify-center p-4 pt-8">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardContent className="space-y-8 pt-4">
            <EventOverviewSection
              value={formData.overview}
              onChange={(value) => setFormData({ ...formData, overview: value })}
            />

            <Separator />

            <div className="space-y-8">
              <DualRangeInput
                label="Budget Range"
                icon={<DollarSign className="h-5 w-5" />}
                min={0}
                max={5000}
                step={100}
                valueMin={formData.budgetMin}
                valueMax={formData.budgetMax}
                onValueChange={([min, max]) => setFormData({ ...formData, budgetMin: min, budgetMax: max })}
                formatValue={formatCurrency}
              />

              <DualRangeInput
                label="Expected Guest Count"
                icon={<Users className="h-5 w-5" />}
                min={0}
                max={100}
                step={1}
                valueMin={formData.guestsMin}
                valueMax={formData.guestsMax}
                onValueChange={([min, max]) => setFormData({ ...formData, guestsMin: min, guestsMax: max })}
                formatValue={(v) => `${v} ${v === 1 ? "guest" : "guests"}`}
                hideValueDisplay={true}
              />

              <DateTimePicker
                date={formData.eventDate}
                onDateChange={(date) => setFormData({ ...formData, eventDate: date })}
                timeStart={formData.eventTimeStart}
                timeEnd={formData.eventTimeEnd}
                onTimeStartChange={(time) => setFormData({ ...formData, eventTimeStart: time })}
                onTimeEndChange={(time) => setFormData({ ...formData, eventTimeEnd: time })}
              />
            </div>

            <Separator />

            <PreferencesSection
              mustHaves={formData.mustHaves}
              niceToHaves={formData.niceToHaves}
              thingsToAvoid={formData.thingsToAvoid}
              onMustHavesChange={(value) => setFormData({ ...formData, mustHaves: value })}
              onNiceToHavesChange={(value) => setFormData({ ...formData, niceToHaves: value })}
              onThingsToAvoidChange={(value) => setFormData({ ...formData, thingsToAvoid: value })}
            />

            <Separator />

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="dietary" className="text-sm font-medium text-gray-700">
                  Dietary Restrictions
                </label>
                <textarea
                  id="dietary"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="List any dietary restrictions or allergies (e.g., gluten-free, vegetarian, nut allergies)..."
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="special-needs" className="text-sm font-medium text-gray-700">
                  Special Needs
                </label>
                <textarea
                  id="special-needs"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Any accessibility requirements or special accommodations needed..."
                  value={formData.specialNeeds}
                  onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleNext} size="lg" className="gap-2">
                Continue to Next Step
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
