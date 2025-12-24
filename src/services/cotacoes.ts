/**
 * Busca cotações do Yahoo Finance
 */
export async function getCotacoes() {
    const symbols = ["B3SA3.SA", "WEGE3.SA", "IBOV.SA", "USDBRL=X"];
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`;

    const res = await fetch(url, {
        next: { revalidate: 60 } // Cache por 60 segundos
    });

    const json = await res.json();
    return json.quoteResponse.result;
}
