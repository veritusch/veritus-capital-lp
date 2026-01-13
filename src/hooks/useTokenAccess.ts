"use client"

import { useEffect, useState } from "react"
import type { TokenAccess } from "@/src/types/access"

interface UseTokenAccessReturn {
    hasAccess: boolean
    isLoading: boolean
    saveEmail: (email: string) => void
}

export function useTokenAccess(token: string): UseTokenAccessReturn {
    const storageKey = `form-access-${token}`

    const [hasAccess, setHasAccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) return

        const raw = localStorage.getItem(storageKey)

        if (raw) {
            setHasAccess(true)
        }

        setIsLoading(false)
    }, [storageKey, token])

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
        saveEmail,
    }
}
