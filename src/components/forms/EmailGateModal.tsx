// src/components/forms/EmailGateModal.tsx

"use client"

import { useState } from "react"

interface EmailGateModalProps {
    isOpen: boolean
    onSubmit: (email: string) => void
}

export default function EmailGateModal({
    isOpen,
    onSubmit,
}: EmailGateModalProps) {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    if (!isOpen) return null

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!validateEmail(email)) {
            setError("Digite um email válido")
            return
        }

        onSubmit(email)
    }

    function validateEmail(value: string) {
        return /\S+@\S+\.\S+/.test(value)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900">
                    Seja bem-vindo!
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    Para continuar, informe seu email.
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setError("")
                        }}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
                    />

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-black py-2 text-white transition hover:bg-gray-800"
                    >
                        Continuar
                    </button>
                </form>
            </div>
        </div>
    )
}
