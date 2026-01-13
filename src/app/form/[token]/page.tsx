"use client"

import { useParams } from "next/navigation"
import { useTokenAccess } from "@/src/hooks/useTokenAccess"
import EmailGateModal from "@/src/components/forms/EmailGateModal"
import MultiStepForm from "@/src/components/forms/MultiStepForm"

export default function FormPage() {
    const params = useParams()
    const token = params.token as string

    const { hasAccess, isLoading, saveEmail } = useTokenAccess(token)

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-dark-bg-primary">
                <p className="typography-helvetica text-brand-text-light">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-brand-dark-bg-primary p-6 flex items-center justify-center">
            <EmailGateModal
                isOpen={!hasAccess}
                onSubmit={saveEmail}
            />

            {hasAccess && <MultiStepForm token={token} />}
        </div>
    )
}
