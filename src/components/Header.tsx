import { Logo } from "./Logo";
import { InvestButton } from "./InvestButton";

export default function Header() {
    return (
        <header className="w-[924px] h-[58px] bg-[#FFFFFF] rounded-[26px] mx-auto flex items-center justify-between px-8">
            {/* Logo - Left */}
            <div className="flex items-center mr-8">
                <Logo />
            </div>

            {/* Nav - Center */}
            <nav className="flex-1 flex justify-center">
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
            <div className="flex items-center ml-8">
                <InvestButton />
            </div>
        </header>
    );
}
