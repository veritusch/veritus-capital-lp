"use client"

import { useState } from "react"

interface PasswordGateModalProps {
    isOpen: boolean
    onSubmit: (password: string) => boolean
}

export default function PasswordGateModal({
    isOpen,
    onSubmit,
}: PasswordGateModalProps) {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    if (!isOpen) return null

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const success = onSubmit(password)

        if (!success) {
            setError("Senha incorreta")
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-xl bg-brand-dark-bg-chumbo p-8 shadow-2xl">
                <h2 className="typography-title text-2xl text-brand-text-light">
                    Área restrita
                </h2>

                <p className="mt-2 typography-helvetica text-sm text-brand-text-light/70">
                    Informe a senha para continuar
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
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
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}
