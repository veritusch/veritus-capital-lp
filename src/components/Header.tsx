import { Logo } from "./Logo";

export default function Header() {
    return (
        <header className="w-full max-w-[1100px] h-[58px] bg-[#EFEBE2] rounded-full px-6 md:px-10 mb-[6px] grid grid-cols-3 items-center mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-10 justify-self-start">
                <Logo />
            </div>

            {/* Menu */}
            <nav className="justify-self-center">
                <ul className="flex items-center gap-10 text-sm font-libre text-[#1E1E1E]">
                    <li className="flex items-center gap-2">
                        <span className="text-xs">•</span>
                        <span className="cursor-pointer hover:opacity-70">
                            Quem somos
                        </span>
                    </li>

                    <li className="cursor-pointer hover:opacity-70">
                        Estratégias
                    </li>

                    <li className="cursor-pointer hover:opacity-70">
                        Contato
                    </li>
                </ul>
            </nav>


            {/* Botão */}
            <button
                className="
      bg-[#9F8762]
      text-[#1E1E1E]
      px-4
      py-1.5
      rounded-full
      text-sm
      font-libre
    "
                style={{ justifySelf: 'end' }}
            >
                Quero investir!
            </button>
        </header>

    );
}
