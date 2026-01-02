"use client";
import { useState } from "react";
import { LogoBlack } from "./LogoBlack";
import { InvestButton } from "./InvestButton";

export default function Header() {
    const [open, setOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setOpen(false);
        }
    };

    return (
        <header
            className="
                relative
                mx-auto
                flex
                w-full
                items-center
                justify-between
                rounded-[24px]
                bg-brand-light
                px-8
                py-4
                md:h-[58px]
                md:w-[924px]
                md:rounded-[26px]
                md:px-8
                md:py-0
            "
        >
            {/* LOGO */}
            <div className="flex items-center md:mr-8">
                <LogoBlack />
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex md:flex-1 md:justify-center">
                <ul className="flex items-center gap-8 text-sm text-brand-text-primary">
                    <li
                        className="cursor-pointer whitespace-nowrap hover:opacity-70"
                        onClick={() => scrollToSection("quem-somos")}
                    >
                        Quem somos
                    </li>

                    <li
                        className="cursor-pointer whitespace-nowrap hover:opacity-70"
                        onClick={() => scrollToSection("estrategias")}
                    >
                        Estratégias
                    </li>

                    <li
                        className="cursor-pointer whitespace-nowrap hover:opacity-70"
                        onClick={() => scrollToSection("calculadoras")}
                    >
                        Calculadoras
                    </li>

                    <li
                        className="cursor-pointer whitespace-nowrap hover:opacity-70"
                        onClick={() => scrollToSection("noticias")}
                    >
                        Notícias
                    </li>
                </ul>
            </nav>

            {/* DESKTOP CTA */}
            <div className="hidden md:flex md:ml-8">
                <InvestButton />
            </div>

            {/* MOBILE HAMBURGER (ISOLADO) */}
            <button
                className="
                    ml-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-neutral-300
                    md:hidden
                "
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Abrir menu"
            >
                <span className="text-xl leading-none text-brand-text-primary">
                    {open ? "✕" : "☰"}
                </span>
            </button>

            {/* MOBILE MENU */}
            {open && (
                <div className="absolute left-0 top-full mt-3 w-full rounded-[20px] border border-neutral-200 bg-brand-light p-6 shadow-md md:hidden">
                    <ul className="flex flex-col gap-6 text-center text-sm text-brand-text-primary">
                        <li
                            className="cursor-pointer hover:opacity-70"
                            onClick={() => scrollToSection("quem-somos")}
                        >
                            Quem somos
                        </li>

                        <li
                            className="cursor-pointer hover:opacity-70"
                            onClick={() => scrollToSection("estrategias")}
                        >
                            Estratégias
                        </li>

                        <li
                            className="cursor-pointer hover:opacity-70"
                            onClick={() => scrollToSection("calculadoras")}
                        >
                            Calculadoras
                        </li>

                        <li
                            className="cursor-pointer hover:opacity-70"
                            onClick={() => scrollToSection("noticias")}
                        >
                            Notícias
                        </li>

                        <div className="pt-4">
                            <InvestButton />
                        </div>
                    </ul>
                </div>
            )}
        </header>
    );
}
