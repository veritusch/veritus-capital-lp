// src/services/cep.service.ts

export type CepAddress = {
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
};

type ViaCepResponse = {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    erro?: boolean;
};

export class CepService {
    private static readonly VIA_CEP_URL = "https://viacep.com.br/ws";

    private static readonly UF_TO_STATE: Record<string, string> = {
        AC: "Acre",
        AL: "Alagoas",
        AP: "Amapá",
        AM: "Amazonas",
        BA: "Bahia",
        CE: "Ceará",
        DF: "Distrito Federal",
        ES: "Espírito Santo",
        GO: "Goiás",
        MA: "Maranhão",
        MT: "Mato Grosso",
        MS: "Mato Grosso do Sul",
        MG: "Minas Gerais",
        PA: "Pará",
        PB: "Paraíba",
        PR: "Paraná",
        PE: "Pernambuco",
        PI: "Piauí",
        RJ: "Rio de Janeiro",
        RN: "Rio Grande do Norte",
        RS: "Rio Grande do Sul",
        RO: "Rondônia",
        RR: "Roraima",
        SC: "Santa Catarina",
        SP: "São Paulo",
        SE: "Sergipe",
        TO: "Tocantins",
    };

    static normalize(cep: string): string {
        return (cep || "").replace(/\D/g, "");
    }

    static isValid(cep: string): boolean {
        return this.normalize(cep).length === 8;
    }

    static async lookup(cepRaw: string): Promise<CepAddress | null> {
        const cep = this.normalize(cepRaw);

        if (!this.isValid(cep)) return null;

        const res = await fetch(`${this.VIA_CEP_URL}/${cep}/json/`, {
            method: "GET",
            headers: { Accept: "application/json" },
        });

        if (!res.ok) return null;

        const data = (await res.json()) as ViaCepResponse;

        if (data.erro) return null;

        const uf = data.uf?.trim() || "";
        const estadoNome = this.UF_TO_STATE[uf] || uf;

        return {
            logradouro: data.logradouro?.trim() || "",
            bairro: data.bairro?.trim() || "",
            cidade: data.localidade?.trim() || "",
            estado: estadoNome,
        };
    }
}
