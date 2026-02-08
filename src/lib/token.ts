/**
 * Gera um token aleatório e seguro usando a Web Crypto API.
 * Ideal para links de acesso únicos no frontend.
 */
export function generateToken(bytes: number = 16): string {
    if (typeof window === "undefined") {
        throw new Error("generateToken deve ser executado no client-side")
    }

    const array = new Uint8Array(bytes)
    window.crypto.getRandomValues(array)

    return Array.from(array, byte =>
        byte.toString(16).padStart(2, "0")
    ).join("")
}

/**
 * Valida um token verificando se ele existe no armazenamento local
 * ou através de uma API (você pode implementar a lógica desejada)
 */
export async function validateToken(token: string): Promise<boolean> {
    if (!token || token.trim() === "") {
        return false;
    }

    // Opção 1: Validar localmente (tokens previamente salvos)
    if (typeof window !== "undefined") {
        const validTokens = localStorage.getItem("validTokens");
        if (validTokens) {
            const tokens = JSON.parse(validTokens);
            return tokens.includes(token);
        }
    }

    // Opção 2: Validar via API (descomente se preferir)
    // try {
    //     const response = await fetch(`/api/validate-token?token=${token}`);
    //     const data = await response.json();
    //     return data.valid;
    // } catch (error) {
    //     console.error("Erro ao validar token:", error);
    //     return false;
    // }

    return false;
}

/**
 * Salva um token como válido no armazenamento local
 */
export function saveToken(token: string): void {
    if (typeof window === "undefined") return;

    const validTokens = localStorage.getItem("validTokens");
    const tokens = validTokens ? JSON.parse(validTokens) : [];
    
    if (!tokens.includes(token)) {
        tokens.push(token);
        localStorage.setItem("validTokens", JSON.stringify(tokens));
    }
}

/**
 * Remove um token do armazenamento local, invalidando-o
 */
export function removeToken(token: string): void {
    if (typeof window === "undefined") return;

    // Marca o token como usado
    const usedKey = `form-used-${token}`;
    localStorage.setItem(usedKey, JSON.stringify({
        usedAt: new Date().toISOString()
    }));

    // Remove da lista de tokens válidos
    const validTokens = localStorage.getItem("validTokens");
    if (validTokens) {
        const tokens = JSON.parse(validTokens);
        const filtered = tokens.filter((t: string) => t !== token);
        localStorage.setItem("validTokens", JSON.stringify(filtered));
    }

    // Remove o acesso específico do formulário
    const storageKey = `form-access-${token}`;
    localStorage.removeItem(storageKey);
}
