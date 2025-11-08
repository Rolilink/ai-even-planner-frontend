import { Card } from "@/components/ui/card"

interface VendorCardProps {
  name: string
  type: string
  reasoning: string
}

export function VendorCard({ name, type, reasoning }: VendorCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <h3 className="font-semibold text-base">{type}</h3>

        <div className="border-t pt-2">
          <p className="text-xs text-muted-foreground italic">
            <span className="font-medium not-italic">Why this vendor:</span> {reasoning}
          </p>
        </div>
      </div>
    </Card>
  )
}
