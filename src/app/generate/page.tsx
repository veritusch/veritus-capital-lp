"use client"

import { useState } from "react"
import Image from "next/image"
import { generateToken } from "@/src/lib/token"
import { usePasswordGate } from "@/src/hooks/usePasswordGate"
import PasswordGateModal from "@/src/components/forms/PasswordGateModal"

export default function GeneratePage() {
    const { isAuthorized, isLoading, authorize, logout } = usePasswordGate()
    const [generatedLink, setGeneratedLink] = useState("")
    const [copied, setCopied] = useState(false)

    function handleGenerate() {
        const token = generateToken()
        const link = `${window.location.origin}/form/${token}`
        setGeneratedLink(link)
        setCopied(false)
    }

    function handleCopy() {
        navigator.clipboard.writeText(generatedLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-dark-bg-secondary">
                <p className="typography-helvetica text-brand-text-light">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-brand-dark-bg-secondary p-6 flex items-center justify-center">
            <PasswordGateModal
                isOpen={!isAuthorized}
                onSubmit={authorize}
            />

            {isAuthorized && (
                <div className="mx-auto max-w-xl w-full px-4">
                    {/* Logo */}
                    <div className="flex justify-center mb-16 pt-8">
                        <Image
                            src="/logo_veritus_branca.svg"
                            alt="Veritus"
                            width={240}
                            height={60}
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="typography-title text-3xl text-brand-text-light text-center">
                            Gerar link de formulário
                        </h1>

                        <button
                        onClick={handleGenerate}
                        className="bg-brand-brown text-brand-light w-full h-[45px] rounded-[28px] typography-helvetica-bold text-sm hover:opacity-90 transition-opacity"
                    >
                        Gerar novo link
                    </button>

                    {generatedLink && (
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    value={generatedLink}
                                    readOnly
                                    className="w-full rounded-lg bg-brand-dark-bg-primary border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light text-sm pr-12"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:opacity-70 transition-opacity"
                                    title="Copiar link"
                                >
                                    <Image
                                        src="/ico-copy.svg"
                                        alt="Copiar"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>

                            {copied && (
                                <p className="typography-helvetica text-sm text-brand-brown text-center">
                                    ✓ Link copiado!
                                </p>
                            )}
                        </div>
                    )}

                        <div className="flex justify-end">
                            <button
                                onClick={logout}
                                className="typography-helvetica text-sm text-brand-text-light/60 hover:text-brand-text-light underline transition-colors"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
