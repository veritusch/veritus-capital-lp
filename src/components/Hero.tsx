import TickerBar from "./TickerBar";
import { InvestButton } from "./InvestButton";

export default function Hero() {
    return (
        <section
            className="
                relative
                mx-auto
                w-full
                overflow-hidden
                rounded-[24px]
                bg-brand-beige
                px-4
                pt-20
                pb-24
                md:w-[1167px]
                md:h-[558px]
                md:px-12
                md:pt-[85px]
            "
        >
            {/* CONTEÚDO */}
            <div
                className="
                    flex
                    h-full
                    flex-col
                    items-center
                    justify-center
                    text-center
                    md:items-start
                    md:text-left
                    md:pl-[57px]
                    md:max-w-[520px]
                "
            >
                <h1
                    className="
                        typography-title
                        text-brand-text-primary
                        text-[28px]
                        leading-tight
                        md:mt-20
                        md:w-[674px]
                        md:text-[48px]
                    "
                >
                    Não Siga a Manada.
                    <br />
                    Lidere Seu Próximo Passo!
                </h1>

                <p
                    className="
                        mt-4
                        typography-text-italic
                        text-[15px]
                        text-brand-brown
                        md:mt-12
                        md:text-[20px]
                    "
                >
                    Gestão de capital para quem busca resultados além do convencional.
                </p>

                <div className="mt-6 md:mt-8">
                    <InvestButton />
                </div>
            </div>

            {/* TICKER BAR */}
            <div className="mt-10 md:mt-0">
                <TickerBar />
            </div>
        </section>
    );
}
