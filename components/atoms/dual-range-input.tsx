"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface DualRangeInputProps {
  label: string
  icon?: React.ReactNode
  min: number
  max: number
  step: number
  valueMin: number
  valueMax: number
  onValueChange: (values: [number, number]) => void
  formatValue?: (value: number) => string
  hideValueDisplay?: boolean
}

export function DualRangeInput({
  label,
  icon,
  min,
  max,
  step,
  valueMin,
  valueMax,
  onValueChange,
  formatValue = (v) => v.toString(),
  hideValueDisplay = false,
}: DualRangeInputProps) {
  const handleSliderChange = (values: number[]) => {
    onValueChange([values[0], values[1]])
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value)
    if (!isNaN(newMin) && newMin >= min && newMin <= valueMax) {
      onValueChange([newMin, valueMax])
    }
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value)
    if (!isNaN(newMax) && newMax <= max && newMax >= valueMin) {
      onValueChange([valueMin, newMax])
    }
  }

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2">
        {icon && <span className="text-black">{icon}</span>}
        {label}
      </Label>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[valueMin, valueMax]}
        onValueChange={handleSliderChange}
        className="w-full [&_[data-range]]:bg-accent"
      />
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor={`${label}-min`} className="text-sm text-muted-foreground">
            Minimum
          </Label>
          <Input
            id={`${label}-min`}
            type="number"
            min={min}
            max={valueMax}
            step={step}
            value={valueMin}
            onChange={handleMinInputChange}
            className="mt-1 shadow-none"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor={`${label}-max`} className="text-sm text-muted-foreground">
            Maximum
          </Label>
          <Input
            id={`${label}-max`}
            type="number"
            min={valueMin}
            max={max}
            step={step}
            value={valueMax}
            onChange={handleMaxInputChange}
            className="mt-1 shadow-none"
          />
        </div>
      </div>
      {!hideValueDisplay && (
        <p className="text-sm text-muted-foreground text-center">
          {formatValue(valueMin)} - {formatValue(valueMax)}
        </p>
      )}
    </div>
  )
}
