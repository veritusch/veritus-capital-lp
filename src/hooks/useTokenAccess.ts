"use client"

import { useEffect, useState } from "react"
import type { TokenAccess } from "@/src/types/access"

interface UseTokenAccessReturn {
    hasAccess: boolean
    isLoading: boolean
    isTokenUsed: boolean
    saveEmail: (email: string) => void
}

export function useTokenAccess(token: string): UseTokenAccessReturn {
    const storageKey = `form-access-${token}`
    const usedKey = `form-used-${token}`

    const [hasAccess, setHasAccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isTokenUsed, setIsTokenUsed] = useState(false)

    useEffect(() => {
        if (!token) return

        // Verifica se o token já foi usado (formulário enviado)
        const isUsed = localStorage.getItem(usedKey)
        if (isUsed) {
            setIsTokenUsed(true)
            setIsLoading(false)
            return
        }

        // Verifica se tem acesso
        const raw = localStorage.getItem(storageKey)
        if (raw) {
            setHasAccess(true)
        }

        setIsLoading(false)
    }, [storageKey, usedKey, token])

    function saveEmail(email: string) {
        const access: TokenAccess = {
            email,
            token,
            createdAt: new Date().toISOString(),
        }

        localStorage.setItem(storageKey, JSON.stringify(access))
        setHasAccess(true)
    }

    return {
        hasAccess,
        isLoading,
        isTokenUsed,
        saveEmail,
    }
}
