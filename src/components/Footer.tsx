import Link from "next/link";
import { LogoWhite } from "./LogoWhite";

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-brand-text-light">
            {/* MAIN FOOTER */}
            <div className="mx-auto max-w-[1167px] px-6 py-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 md:ml-16">
                    {/* LOGO + DESCRIÇÃO */}
                    <div className="lg:col-span-2">
                        <div className="mb-6 flex items-center gap-2">
                            <LogoWhite />
                        </div>

                        <p className="max-w-md text-sm leading-relaxed text-neutral-400">
                            Escrever mais alguma coisa sobre a empresa e o que
                            faz, um breve mission statement institucional.
                        </p>
                    </div>

                    {/* RECURSOS */}
                    <div>
                        <h3 className="mb-6 text-sm font-medium text-brand-text-light">
                            Recursos
                        </h3>

                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-neutral-400 transition hover:text-brand-text-light"
                                >
                                    Blog
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/suporte"
                                    className="text-sm text-neutral-400 transition hover:text-brand-text-light"
                                >
                                    Suporte
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/calculadora"
                                    className="text-sm text-neutral-400 transition hover:text-brand-text-light"
                                >
                                    Calculadora
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* EMPRESA */}
                    <div>
                        <h3 className="mb-6 text-sm font-medium text-brand-text-light">
                            A empresa
                        </h3>

                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/sobre"
                                    className="text-sm text-neutral-400 transition hover:text-brand-text-light"
                                >
                                    Sobre
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contato"
                                    className="text-sm text-neutral-400 transition hover:text-brand-text-light"
                                >
                                    Contato
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/socios"
                                    className="text-sm text-neutral-400 transition hover:text-brand-text-light"
                                >
                                    Sócios
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-neutral-800 bg-brand-dark-deep mb-2">
                <div className="mx-auto max-w-[1167px] px-6 py-6">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs text-neutral-500">
                            © {new Date().getFullYear()} VERITUS CAPITAL. Todos
                            os direitos reservados.
                        </p>

                        <div className="flex gap-8">
                            <Link
                                href="/termos"
                                className="text-xs text-neutral-500 transition hover:text-brand-text-light"
                            >
                                Termos de uso
                            </Link>

                            <Link
                                href="/privacidade"
                                className="text-xs text-neutral-500 transition hover:text-brand-text-light"
                            >
                                Política de Privacidade
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
