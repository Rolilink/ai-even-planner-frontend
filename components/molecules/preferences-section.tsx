"use client"

import { CheckCircle2, Sparkles, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface PreferencesSectionProps {
  mustHaves: string
  niceToHaves: string
  thingsToAvoid: string
  onMustHavesChange: (value: string) => void
  onNiceToHavesChange: (value: string) => void
  onThingsToAvoidChange: (value: string) => void
}

export function PreferencesSection({
  mustHaves,
  niceToHaves,
  thingsToAvoid,
  onMustHavesChange,
  onNiceToHavesChange,
  onThingsToAvoidChange,
}: PreferencesSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="must-haves" className="text-base font-medium flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-black" />
          Must-haves
        </Label>
        <Input
          id="must-haves"
          value={mustHaves}
          onChange={(e) => onMustHavesChange(e.target.value)}
          placeholder="e.g., Photographer, cake, DJ"
          className="shadow-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nice-to-haves" className="text-base font-medium flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-black" />
          Nice-to-haves
        </Label>
        <Input
          id="nice-to-haves"
          value={niceToHaves}
          onChange={(e) => onNiceToHavesChange(e.target.value)}
          placeholder="e.g., Live band, board games"
          className="shadow-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="things-to-avoid" className="text-base font-medium flex items-center gap-2">
          <X className="h-5 w-5 text-black" />
          Things to avoid
        </Label>
        <Input
          id="things-to-avoid"
          value={thingsToAvoid}
          onChange={(e) => onThingsToAvoidChange(e.target.value)}
          placeholder="e.g., Red decorations, punk music"
          className="shadow-none"
        />
      </div>
    </div>
  )
}
