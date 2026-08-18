"use client"

import {useForm, useFieldArray} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {toast} from "sonner"
import { defaultFormValues, problemSchema } from "@/modules/problems/schema"

export function useCreateProblem(){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [sampleType, setSampleType] = useState("DP")

    const from = useForm({
        resolver:zodResolver(problemSchema),
        defaultValues:defaultFormValues
    })
}