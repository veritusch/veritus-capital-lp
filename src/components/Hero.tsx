import { InvestButton } from "./InvestButton";

export default function Hero() {
    return (
        <section className="w-[1167px] h-[558px] bg-brand-beige rounded-[24px] px-12 pt-[85px] pb-16 mx-auto">
            <div className="pl-[57px] max-w-[520px] flex flex-col justify-center h-full">
                <h1 className="mt-20 typography-title text-[48px] text-brand-text-primary w-[674px]">
                    Não Siga a Manada.
                    <br />
                    Lidere Seu Próximo Passo!
                </h1>

                <p className="mt-12 typography-text-italic text-[20px] text-brand-brown">
                    Gestão de capital para quem busca resultados além do convencional.
                </p>

                <div className="mt-8">
                    <InvestButton />
                </div>
            </div>
        </section>
    );
}
