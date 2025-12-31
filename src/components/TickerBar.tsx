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
            if (!res.ok) {
                const errorData = await res.json();
                console.error('API Error:', errorData);
                return;
            }
            const data = await res.json();
            console.log('Quotes loaded:', data);
            setQuotes(data);
        } catch (error) {
            console.error('Failed to load quotes:', error);
        }
    }

    useEffect(() => {
        load();
        const i = setInterval(load, 60000);
        return () => clearInterval(i);
    }, []);

    return (
        <div className="w-full bg-[#0c0c0c] border-y border-neutral-800 overflow-hidden">
            <div className="flex gap-6 whitespace-nowrap animate-scroll py-2 will-change-transform">
                {quotes.map(q => {
                    const positive = q.percent >= 0;
                    return (
                        <div
                            key={q.symbol}
                            className="flex items-center gap-3 bg-[#141414] px-4 py-2 rounded-full border border-neutral-800 shadow-sm"
                        >
                            <span className="font-semibold text-white">{q.symbol}</span>

                            <span className="text-gray-300">
                                {q.price?.toFixed(2)}
                            </span>

                            <span className={positive ? "text-green-400" : "text-red-400"}>
                                {q.change?.toFixed(2)} ({q.percent?.toFixed(2)}%)
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
