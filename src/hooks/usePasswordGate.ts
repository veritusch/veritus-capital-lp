"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "generate-page-auth"

// ⚠️ Senha fixa no frontend
const ACCESS_PASSWORD = "veritus2026"

export function usePasswordGate() {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === "true") {
            setIsAuthorized(true)
        }
        setIsLoading(false)
    }, [])

    function authorize(password: string): boolean {
        if (password === ACCESS_PASSWORD) {
            localStorage.setItem(STORAGE_KEY, "true")
            setIsAuthorized(true)
            return true
        }

        return false
    }

    function logout() {
        localStorage.removeItem(STORAGE_KEY)
        setIsAuthorized(false)
    }

    return {
        isAuthorized,
        isLoading,
        authorize,
        logout,
    }
}
