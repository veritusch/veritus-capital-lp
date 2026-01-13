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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-brand-dark-bg-chumbo p-8 shadow-2xl">
                <h2 className="typography-title text-2xl text-brand-text-light">
                    Seja bem-vindo!
                </h2>

                <p className="mt-2 typography-helvetica text-sm text-brand-text-light/70">
                    Para continuar, informe seu email.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setError("")
                        }}
                        className="w-full rounded-lg bg-brand-dark-bg-primary border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown transition-colors"
                    />

                    {error && (
                        <p className="typography-helvetica text-sm text-red-400">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-brand-brown text-brand-light h-[45px] rounded-[28px] typography-helvetica-bold hover:opacity-90 transition-opacity"
                    >
                        Continuar
                    </button>
                </form>
            </div>
        </div>
    )
}
