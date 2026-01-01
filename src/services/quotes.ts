// Função auxiliar para adicionar delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getQuotes() {
    const symbols = ["ITUB4.SA", "B3SA3.SA", "VALE3.SA", "PETR4.SA", "WEGE3.SA"];
    const apiKey = "RHRVI17IHZOL1IOG";

    try {
        // AlphaVantage tem limite de 5 req/min na versão free
        // Fazemos as requisições sequencialmente com delay
        const results = [];
        
        for (const symbol of symbols) {
            try {
                const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
                
                const res = await fetch(url, { 
                    cache: "no-store",
                    next: { revalidate: 60 }
                });

                if (!res.ok) {
                    console.error(`AlphaVantage API returned ${res.status} for ${symbol}`);
                    continue;
                }

                const data = await res.json();

                // Verifica se há dados válidos
                const timeSeries = data["Time Series (Daily)"];
                if (!timeSeries || Object.keys(timeSeries).length === 0) {
                    console.warn(`No data for ${symbol}`, data);
                    continue;
                }

                // Pega as duas datas mais recentes para calcular a variação
                const dates = Object.keys(timeSeries).sort().reverse();
                const latestDate = dates[0];
                const previousDate = dates[1];

                const latestData = timeSeries[latestDate];
                const previousData = timeSeries[previousDate];

                const currentPrice = parseFloat(latestData["4. close"]);
                const previousPrice = parseFloat(previousData["4. close"]);
                const change = currentPrice - previousPrice;
                const changePercent = (change / previousPrice) * 100;

                results.push({
                    symbol: symbol.replace(".SA", ""),
                    price: currentPrice,
                    change: change,
                    percent: changePercent
                });

                // Delay de 12 segundos entre requisições (5 req/min = 1 req a cada 12s)
                if (symbols.indexOf(symbol) < symbols.length - 1) {
                    await delay(12000);
                }
            } catch (error) {
                console.error(`Error fetching ${symbol}:`, error);
            }
        }

        return results;
    } catch (error) {
        console.error('Error in getQuotes:', error);
        throw error;
    }
}
