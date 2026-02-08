"use client"

import { useParams } from "next/navigation"
import { useTokenAccess } from "@/src/hooks/useTokenAccess"
import MultiStepForm from "@/src/components/forms/MultiStepForm"
import LinkExpired from "@/src/components/forms/LinkExpired."

export default function FormPage() {
    const params = useParams()
    const token = params.token as string
    const { isLoading, isTokenUsed } = useTokenAccess(token)

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-dark-bg-secondary p-6 flex items-center justify-center">
                <div className="text-brand-text-light typography-helvetica">
                    Carregando...
                </div>
            </div>
        )
    }

    // Token já foi usado - link expirado
    if (isTokenUsed) {
        return <LinkExpired />
    }

    // Mostra o formulário
    return (
        <div className="min-h-screen bg-brand-dark-bg-secondary p-6 flex items-center justify-center">
            <MultiStepForm token={token} />
        </div>
    )
}
