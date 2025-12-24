import { InvestButton } from "./InvestButton";

export default function Hero() {
    return (
        <section className="w-[1167px] h-[558px] bg-[#EFEBE2] rounded-[24px] px-12 pt-[85px] pb-16 mx-auto">
            <div className="pl-[57px] max-w-[520px] flex flex-col justify-center h-full">
                <h1 className="font-libre font-bold text-[48px] leading-[100%] text-[#1E1E1E] w-[674px]">
                    Não Siga a Manada.
                    <br />
                    Lidere Seu Próximo Passo!
                </h1>

                <p className="mt-4 font-libre italic text-[20px] leading-[100%] text-[#9F8762]">
                    Gestão de capital para quem busca resultados além do convencional.
                </p>

                <div className="mt-8">
                    <InvestButton />
                </div>
            </div>
        </section>
    );
}
