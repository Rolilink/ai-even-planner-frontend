import { Card } from "@/components/ui/card"
import {
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  Sparkles,
  X,
  FileText,
  Lightbulb,
  UtensilsCrossed,
  Accessibility,
} from "lucide-react"
import { format } from "date-fns"
import type { EventFormData, EventConcept } from "@/store/event-planner"

interface EventSummaryCardProps {
  data: EventFormData
  selectedConcept?: EventConcept
}

export function EventSummaryCard({ data, selectedConcept }: EventSummaryCardProps) {
  return (
    <Card className="p-6 sticky top-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Event Summary</h2>
        <div className="h-px bg-border" />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 flex-shrink-0 text-black" />
            <h3 className="text-sm font-medium text-muted-foreground">Event Description</h3>
          </div>
          <p className="text-sm flex items-start gap-2">
            <span className="w-4 flex-shrink-0"></span>
            <span>{data.overview || "No description provided"}</span>
          </p>
        </div>

        {selectedConcept && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-4 h-4 flex-shrink-0 text-black" />
              <h3 className="text-sm font-medium text-muted-foreground">Event Vibe</h3>
            </div>
            <p className="text-sm flex items-start gap-2">
              <span className="w-4 flex-shrink-0"></span>
              <span>{selectedConcept.title}</span>
            </p>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 flex-shrink-0 text-black" />
            <h3 className="text-sm font-medium text-muted-foreground">Budget Range</h3>
          </div>
          <p className="text-sm flex items-start gap-2">
            <DollarSign className="w-4 flex-shrink-0 opacity-0" />
            <span>
              ${data.budgetMin.toLocaleString()} - ${data.budgetMax.toLocaleString()}
            </span>
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 flex-shrink-0 text-black" />
            <h3 className="text-sm font-medium text-muted-foreground">Guest Count</h3>
          </div>
          <p className="text-sm flex items-start gap-2">
            <Users className="w-4 flex-shrink-0 opacity-0" />
            <span>
              {data.guestsMin} - {data.guestsMax} guests
            </span>
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 flex-shrink-0 text-black" />
            <h3 className="text-sm font-medium text-muted-foreground">Event Date & Time</h3>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 flex-shrink-0 opacity-0" />
            <div>
              <p className="text-sm">{data.eventDate ? format(data.eventDate, "PPP") : "No date selected"}</p>
              {data.eventTimeStart && data.eventTimeEnd && (
                <p className="text-sm text-muted-foreground">
                  {data.eventTimeStart} - {data.eventTimeEnd}
                </p>
              )}
            </div>
          </div>
        </div>

        {data.mustHaves && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-black" />
              <h3 className="text-sm font-medium text-muted-foreground">Must-haves</h3>
            </div>
            <p className="text-sm flex items-start gap-2">
              <CheckCircle2 className="w-4 flex-shrink-0 opacity-0" />
              <span>{data.mustHaves}</span>
            </p>
          </div>
        )}

        {data.niceToHaves && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 flex-shrink-0 text-black" />
              <h3 className="text-sm font-medium text-muted-foreground">Nice-to-haves</h3>
            </div>
            <p className="text-sm flex items-start gap-2">
              <Sparkles className="w-4 flex-shrink-0 opacity-0" />
              <span>{data.niceToHaves}</span>
            </p>
          </div>
        )}

        {data.thingsToAvoid && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <X className="w-4 h-4 flex-shrink-0 text-black" />
              <h3 className="text-sm font-medium text-muted-foreground">Things to Avoid</h3>
            </div>
            <p className="text-sm flex items-start gap-2">
              <X className="w-4 flex-shrink-0 opacity-0" />
              <span>{data.thingsToAvoid}</span>
            </p>
          </div>
        )}

        {data.dietaryRestrictions && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <UtensilsCrossed className="w-4 h-4 flex-shrink-0 text-black" />
              <h3 className="text-sm font-medium text-muted-foreground">Dietary Restrictions</h3>
            </div>
            <p className="text-sm flex items-start gap-2">
              <UtensilsCrossed className="w-4 flex-shrink-0 opacity-0" />
              <span>{data.dietaryRestrictions}</span>
            </p>
          </div>
        )}

        {data.specialNeeds && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Accessibility className="w-4 h-4 flex-shrink-0 text-black" />
              <h3 className="text-sm font-medium text-muted-foreground">Special Needs</h3>
            </div>
            <p className="text-sm flex items-start gap-2">
              <Accessibility className="w-4 flex-shrink-0 opacity-0" />
              <span>{data.specialNeeds}</span>
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
