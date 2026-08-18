"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FormHeader } from "./form-header"

type SampleType = "DP" | "string"

export function CreateProblemForm() {
  const [sampleType, setSampleType] = useState<SampleType>("DP")

  const handleLoadSample = () => {
    console.log("Loading sample:", sampleType)
  }

  return (
    <Card className="rounded-md border-border shadow-none">
        {/* FormHeader */}
      <FormHeader
        sampleType={sampleType}
        setSampleType={setSampleType}
        onLoadSample={handleLoadSample}
      />
      <CardContent className="p-6">
        {/* form fields go here */}
      </CardContent>
    </Card>
  )
}