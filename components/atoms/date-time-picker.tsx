"use client"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, CalendarDays } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface DateTimePickerProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  timeStart: string
  timeEnd: string
  onTimeStartChange: (time: string) => void
  onTimeEndChange: (time: string) => void
}

export function DateTimePicker({
  date,
  onDateChange,
  timeStart,
  timeEnd,
  onTimeStartChange,
  onTimeEndChange,
}: DateTimePickerProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-black" />
          Event Date & Time
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal mt-2 bg-white hover:bg-white shadow-none",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 shadow-none" align="start">
            <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="time-start" className="text-sm text-muted-foreground">
            Start Time
          </Label>
          <Input
            id="time-start"
            type="time"
            value={timeStart}
            onChange={(e) => onTimeStartChange(e.target.value)}
            className="mt-1 shadow-none"
          />
        </div>
        <div>
          <Label htmlFor="time-end" className="text-sm text-muted-foreground">
            End Time (Optional)
          </Label>
          <Input
            id="time-end"
            type="time"
            value={timeEnd}
            onChange={(e) => onTimeEndChange(e.target.value)}
            className="mt-1 shadow-none"
          />
        </div>
      </div>
    </div>
  )
}
