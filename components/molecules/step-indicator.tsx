interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
}

export function StepIndicator({ currentStep, totalSteps, stepTitle }: StepIndicatorProps) {
  return (
    <div className="border-b bg-white px-6 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-12 rounded-full transition-colors ${
                  index < currentStep ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-balance">{stepTitle}</h1>
      </div>
    </div>
  )
}
