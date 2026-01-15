"use client"

import { useParams } from "next/navigation"
import MultiStepForm from "@/src/components/forms/MultiStepForm"

export default function FormPage() {
    const params = useParams()
    const token = params.token as string

    return (
        <div className="min-h-screen bg-brand-dark-bg-secondary p-6 flex items-center justify-center">
            <MultiStepForm token={token} />
        </div>
    )
}
