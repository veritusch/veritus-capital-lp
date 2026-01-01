import TickerBar from "./TickerBar";
import { InvestButton } from "./InvestButton";

export default function Hero() {
    return (
        <section
            className="
                relative
                w-full
                min-h-[500px]
                bg-brand-beige
                rounded-[24px]
                px-4
                pt-12
                pb-20
                mx-auto
                overflow-hidden
                md:w-[1167px]
                md:h-[558px]
                md:px-12
                md:pt-[85px]
            "
        >
            <div className="flex flex-col justify-center h-full md:pl-[57px] md:max-w-[520px]">
                <h1 className="typography-title text-[32px] leading-tight text-brand-text-primary w-full md:mt-20 md:text-[48px] md:w-[674px]">
                    Não Siga a Manada.
                    <br />
                    Lidere Seu Próximo Passo!
                </h1>

                <p className="mt-6 typography-text-italic text-[16px] text-brand-brown md:mt-12 md:text-[20px]">
                    Gestão de capital para quem busca resultados além do convencional.
                </p>

                <div className="mt-6 md:mt-8">
                    <InvestButton />
                </div>
            </div>

            {/* TickerBar agora VIVE dentro do Hero */}
            <TickerBar />
        </section>
    );
}
