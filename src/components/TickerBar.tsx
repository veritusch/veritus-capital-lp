"use client";
import { useEffect, useState } from "react";
import { getCotacoes } from "../services/cotacoes";

type Quote = {
    symbol: string;
    regularMarketPrice: number;
    regularMarketChangePercent: number;
};

export default function TickerBar() {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    async function load() {
        try {
            const data = await getCotacoes();
            setQuotes(data);
        } catch (error) {
            console.error("Erro ao carregar cotações:", error);
        }
    }

    useEffect(() => {
        load();
        const interval = setInterval(load, 60000); // atualiza 1x/min
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-[#111] text-white overflow-hidden border-b border-neutral-800">
            <div className="flex gap-10 animate-scroll whitespace-nowrap py-2">
                {quotes.map((q) => (
                    <div key={q.symbol} className="flex gap-2 text-sm">
                        <span className="opacity-80">{q.symbol.replace(".SA", "")}</span>
                        <span>R$ {q.regularMarketPrice?.toFixed(2)}</span>
                        <span
                            className={
                                q.regularMarketChangePercent >= 0 ? "text-green-400" : "text-red-400"
                            }
                        >
                            {q.regularMarketChangePercent?.toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
