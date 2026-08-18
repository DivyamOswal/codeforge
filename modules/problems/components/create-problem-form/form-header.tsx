"use client";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

type SampleType = "DP" | "string";

interface FormHeaderProps {
  sampleType: SampleType;
  setSampleType: (type: SampleType) => void;
  onLoadSample: () => void;
}

export function FormHeader({ sampleType, setSampleType, onLoadSample }: FormHeaderProps) {
  return (
    <CardHeader className="border-b border-border pb-6">
      <div className="flex flex-col gap-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-foreground">
          <FileText className="h-6 w-6 shrink-0 text-primary" />
          Create Problem
        </CardTitle>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SampleTypeToggle sampleType={sampleType} setSampleType={setSampleType} />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLoadSample}
            className="cursor-pointer gap-2 rounded-sm"
          >
            <Download className="h-4 w-4" />
            Load Sample
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}

interface SampleTypeToggleProps {
  sampleType: SampleType;
  setSampleType: (type: SampleType) => void;
}

function SampleTypeToggle({ sampleType, setSampleType }: SampleTypeToggleProps) {
  return (
    <div className="flex w-full overflow-hidden rounded-sm border border-border sm:w-auto">
      <Button
        type="button"
        variant={sampleType === "DP" ? "default" : "outline"}
        size="sm"
        className={`flex-1 cursor-pointer whitespace-nowrap rounded-none border-0 sm:flex-none ${
          sampleType === "DP" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
        }`}
        onClick={() => setSampleType("DP")}
      >
        DP Problem
      </Button>
      <Button
        type="button"
        variant={sampleType === "string" ? "default" : "outline"}
        size="sm"
        className={`flex-1 cursor-pointer whitespace-nowrap rounded-none border-0 border-l border-border sm:flex-none ${
          sampleType === "string" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
        }`}
        onClick={() => setSampleType("string")}
      >
        String Problem
      </Button>
    </div>
  );
}