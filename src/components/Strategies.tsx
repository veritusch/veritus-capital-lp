"use client";
import { useEffect, useRef, useState } from "react";
import { InvestButton } from "./InvestButton";

type Strategy = {
    title: string;
    description: string;
};

const strategies: Strategy[] = [
    {
        title: "Estratégia Conservadora",
        description:
            "Preservação de capital com foco em estabilidade e controle de risco.",
    },
    {
        title: "Estratégia Moderada",
        description:
            "Equilíbrio entre segurança e crescimento, buscando retornos consistentes.",
    },
    {
        title: "Estratégia Arrojada",
        description:
            "Foco em crescimento acelerado com maior tolerância a risco para maximizar retornos.",
    },
];

export default function Estrategias() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const lock = useRef(false);

    function onWheel(e: WheelEvent) {
        if (window.innerWidth < 768) return;

        e.preventDefault();
        if (lock.current) return;

        lock.current = true;

        setActiveIndex((prev) => {
            if (e.deltaY > 0) return Math.min(prev + 1, strategies.length - 1);
            return Math.max(prev - 1, 0);
        });

        setTimeout(() => {
            lock.current = false;
        }, 300);
    }

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    return (
        <section className="relative mt-32 w-full">
            {/* TÍTULO DA SEÇÃO */}
            <div className="mx-auto mb-16 w-full px-4 md:w-[1167px] md:px-0 md:mb-24">
                <h2
                    className="
                        typography-title
                        text-brand-text-light
                        max-w-[438px]
                        text-3xl
                        leading-tight
                        md:text-4xl
                        md:ml-10
                    "
                >
                    Como simplificamos
                    <br />
                    sua vida financeira?
                </h2>
            </div>
            {/* DESKTOP STACK */}
            <div
                ref={containerRef}
                className="relative mx-auto hidden h-[420px] w-[1167px] md:block"
            >
                {strategies.map((s, index) => {
                    const offset = index - activeIndex;

                    return (
                        <div
                            key={s.title}
                            className="absolute left-1/2 top-0 transition-all duration-500 ease-out"
                            style={{
                                transform: `
                                    translateX(-50%)
                                    translateY(${offset * 28}px)
                                    scale(${1 - Math.abs(offset) * 0.04})
                                `,
                                opacity: 1,
                                zIndex: strategies.length - Math.abs(offset),
                                pointerEvents: offset === 0 ? "auto" : "none",
                            }}
                        >
                            <StrategyCard strategy={s} />
                        </div>
                    );
                })}
            </div>

            {/* MOBILE */}
            <div className="mx-auto flex w-full flex-col gap-6 px-4 md:hidden">
                {strategies.map((s) => (
                    <StrategyCard key={s.title} strategy={s} />
                ))}
            </div>
        </section>
    );
}

function StrategyCard({ strategy }: { strategy: Strategy }) {
    return (
        <div
            className="
                flex
                h-auto
                w-full
                rounded-[26px]
                bg-white
                shadow-sm
                md:h-[343px]
                md:w-[879px]
            "
        >
            {/* Conteúdo */}
            <div className="flex max-w-[420px] flex-col justify-center p-8 md:p-10">
                <h3 className="typography-title text-2xl text-brand-text-primary">
                    {strategy.title}
                </h3>

                <p className="mt-4 text-sm text-neutral-600">
                    {strategy.description}
                </p>

                <div className="mt-8">
                    <InvestButton />
                </div>
            </div>

            {/* Bloco visual direito */}
            <div
                className="
                    ml-auto
                    hidden
                    h-full
                    w-[320px]
                    rounded-r-[26px]
                    bg-brand-brown
                    md:block
                "
            />
        </div>
    );
}
