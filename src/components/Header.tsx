import { Logo } from "./Logo";
import { InvestButton } from "./InvestButton";

export default function Header() {
    return (
        <header className="w-full h-auto bg-brand-light rounded-[24px] mx-auto flex items-center justify-between px-4 py-4 md:w-[924px] md:h-[58px] md:rounded-[26px] md:px-8 md:py-0">
            {/* Logo - Left */}
            <div className="flex items-center md:mr-8">
                <Logo />
            </div>

            {/* Nav - Center (Oculto no mobile) */}
            <nav className="hidden md:flex md:flex-1 md:justify-center">
                <ul className="flex items-center gap-10 text-sm font-libre text-[#1E1E1E]">
                    <li className="flex items-center gap-2">
                        <span className="cursor-pointer hover:opacity-70 whitespace-nowrap">
                            Quem somos
                        </span>
                    </li>

                    <li className="cursor-pointer hover:opacity-70 whitespace-nowrap">
                        Estratégias
                    </li>

                    <li className="cursor-pointer hover:opacity-70 whitespace-nowrap">
                        Contato
                    </li>
                </ul>
            </nav>

            {/* Button - Right */}
            <div className="flex items-center md:ml-8">
                <InvestButton />
            </div>
        </header>
    );
}
