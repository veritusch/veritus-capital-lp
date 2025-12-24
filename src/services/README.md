# Exemplo de uso do serviço de cotações

## 1. Configure a URL da API

Crie/edite `.env.local`:
```bash
NEXT_PUBLIC_COTACOES_API_URL=https://sua-api-de-cotacoes.com
```

## 2. Use em Server Component (recomendado)

```tsx
// src/app/cotacoes/page.tsx
import { getCotacoesDoDia } from "@/services/cotacoes";

export default async function CotacoesPage() {
    const cotacoes = await getCotacoesDoDia();
    
    return (
        <div>
            <h1>Cotações do Dia</h1>
            {cotacoes.data.map((cotacao) => (
                <div key={cotacao.moeda}>
                    {cotacao.moeda}: R$ {cotacao.valor}
                </div>
            ))}
        </div>
    );
}
```

## 3. Use em Client Component

```tsx
'use client';
import { useEffect, useState } from 'react';
import { getCotacoesDoDia } from "@/services/cotacoes";
import { CotacoesResponse } from "@/types/cotacoes";

export default function CotacoesClient() {
    const [cotacoes, setCotacoes] = useState<CotacoesResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCotacoesDoDia()
            .then(setCotacoes)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (!cotacoes) return <div>Erro ao carregar</div>;

    return (
        <div>
            {cotacoes.data.map((cotacao) => (
                <div key={cotacao.moeda}>
                    {cotacao.moeda}: R$ {cotacao.valor}
                </div>
            ))}
        </div>
    );
}
```

## Estrutura criada

```
src/
├── services/
│   └── cotacoes.ts       # Chamadas à API
├── types/
│   └── cotacoes.ts       # Tipos TypeScript
```

## Vantagens desta estrutura

- ✅ Separação de responsabilidades
- ✅ Reutilizável em múltiplos componentes
- ✅ Type-safe com TypeScript
- ✅ Tratamento de erros centralizado
- ✅ Fácil de testar e manter
