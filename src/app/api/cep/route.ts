// src/app/api/cep/route.ts
import { NextResponse } from "next/server";

type ViaCepResponse = {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    erro?: boolean;
};

type BrasilApiResponse = {
    cep?: string;
    street?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
};

type NormalizedResponse = {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
};

async function fetchViaCep(cep: string): Promise<NormalizedResponse | null> {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            headers: { "Accept": "application/json" },
            signal: AbortSignal.timeout(5000), // 5s timeout
        });

        if (!response.ok) return null;

        const data = (await response.json()) as ViaCepResponse;
        if (data.erro) return null;

        return {
            cep: data.cep,
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
        };
    } catch (error) {
        console.error("[CEP API] ViaCEP failed:", error);
        return null;
    }
}

async function fetchBrasilApi(cep: string): Promise<NormalizedResponse | null> {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
            headers: { "Accept": "application/json" },
            signal: AbortSignal.timeout(5000), // 5s timeout
        });

        if (!response.ok) return null;

        const data = (await response.json()) as BrasilApiResponse;

        return {
            cep: data.cep,
            logradouro: data.street,
            bairro: data.neighborhood,
            localidade: data.city,
            uf: data.state,
        };
    } catch (error) {
        console.error("[CEP API] BrasilAPI failed:", error);
        return null;
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const cep = searchParams.get("cep");

        if (!cep) {
            return NextResponse.json(
                { error: "CEP is required" },
                { status: 400 }
            );
        }

        // Normalize CEP (remove non-digits)
        const cepNormalized = cep.replace(/\D/g, "");

        if (cepNormalized.length !== 8) {
            return NextResponse.json(
                { error: "Invalid CEP format" },
                { status: 400 }
            );
        }

        // Try BrasilAPI first (more stable)
        console.log("[CEP API] Trying BrasilAPI...");
        let data = await fetchBrasilApi(cepNormalized);

        // If BrasilAPI fails, try ViaCEP as fallback
        if (!data) {
            console.log("[CEP API] BrasilAPI failed, trying ViaCEP...");
            data = await fetchViaCep(cepNormalized);
        }

        if (!data) {
            return NextResponse.json(
                { error: "CEP not found" },
                { status: 404 }
            );
        }

        console.log("[CEP API] Success:", data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("[CEP API] Error:", error);
        return NextResponse.json(
            { 
                error: "Internal server error",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
