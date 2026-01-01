"use client";
import { useEffect, useState } from "react";

type Quote = {
    symbol: string;
    price: number;
    change: number;
    percent: number;
};

export default function TickerBar() {
    const [quotes, setQuotes] = useState<Quote[]>([]);

    async function load() {
        try {
            const res = await fetch("/api/quotes");
            const data = await res.json();
            console.log('data :>> ', data);
            setQuotes(data);
        } catch (err) {
            console.error("Failed to load quotes", err);
        }
    }

    useEffect(() => {
        load();
        // Busca apenas uma vez ao carregar o componente
    }, []);

    if (!quotes.length) return null;

    return (
        <div className="absolute bottom-0 left-0 w-full bg-brand-dark-deep border-t border-neutral-800">
            <div className="overflow-hidden">
                <div className="flex w-max animate-ticker gap-3 px-4 py-1.5">
                    {[...quotes, ...quotes].map((q, i) => {
                        const positive = q.percent >= 0;

                        return (
                            <div
                                key={`${q.symbol}-${i}`}
                                className="
                                    flex items-center gap-2
                                    rounded-full
                                    bg-[#141414]
                                    px-3 py-1
                                    text-xs
                                    border border-neutral-800
                                "
                            >
                                <span className="font-medium text-white">
                                    {q.symbol}
                                </span>

                                <span className="text-neutral-400">
                                    {q.price.toFixed(2)}
                                </span>

                                <span
                                    className={
                                        positive
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }
                                >
                                    {positive ? "+" : ""}
                                    {q.percent.toFixed(2)}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
