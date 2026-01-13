"use client"

import { useParams } from "next/navigation"
import { useTokenAccess } from "@/src/hooks/useTokenAccess"
import EmailGateModal from "@/src/components/forms/EmailGateModal"
import Form from "@/src/components/forms/Form"

export default function FormPage() {
    const params = useParams()
    const token = params.token as string

    const { hasAccess, isLoading, saveEmail } = useTokenAccess(token)

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-600">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <EmailGateModal
                isOpen={!hasAccess}
                onSubmit={saveEmail}
            />

            {hasAccess && (
                <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
                    <Form token={token} />
                </div>
            )}
        </div>
    )
}
