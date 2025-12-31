export async function getQuotes() {
    const symbols = ["ITUB4.SA", "B3SA3.SA", "VALE3.SA", "PETR4.SA", "WEGE3.SA"];
    const apiKey = "RHRVI17IHZOL1IOG";

    try {
        // AlphaVantage requer uma chamada por símbolo, fazemos em paralelo
        const promises = symbols.map(async (symbol) => {
            const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
            
            const res = await fetch(url, { 
                cache: "no-store",
                next: { revalidate: 60 }
            });

            if (!res.ok) {
                throw new Error(`AlphaVantage API returned ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();

            // Verifica se há dados válidos
            if (!data["Global Quote"] || Object.keys(data["Global Quote"]).length === 0) {
                console.warn(`No data for ${symbol}`, data);
                return null;
            }

            const quote = data["Global Quote"];
            const price = parseFloat(quote["05. price"] || 0);
            const change = parseFloat(quote["09. change"] || 0);
            const changePercent = parseFloat((quote["10. change percent"] || "0").replace("%", ""));

            return {
                symbol: symbol.replace(".SA", ""),
                price,
                change,
                percent: changePercent
            };
        });

        const results = await Promise.all(promises);
        
        // Filtra resultados nulos
        return results.filter((q) => q !== null);
    } catch (error) {
        console.error('Error in getQuotes:', error);
        throw error;
    }
}
