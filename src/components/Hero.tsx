export default function Hero() {
    return (
        <section className="mt-[53px] flex justify-center px-4">
            <div className="w-full max-w-[1167px] min-h-[558px] rounded-[24px] bg-[#EFEBE2] flex items-center">
                <div className="pl-[57px] max-w-[520px]">
                    <h1 className="font-serif font-bold text-[48px] leading-[100%] text-[#1E1E1E]">
                        Não Siga a Manada.
                        <br />
                        Lidere Seu Próximo Passo!
                    </h1>

                    <p className="mt-4 font-serif italic text-[20px] leading-[100%] text-[#9F8762]">
                        Gestão de capital para quem busca resultados além do convencional.
                    </p>

                    <button
                        className="
              mt-8
              min-w-[180px]
              h-[37px]
              rounded-[28px]
              bg-[#9F8762]
              px-6
              font-serif
              text-sm
              text-[#1E1E1E]
              transition-colors
              duration-300
              hover:bg-[#8A7556]
            "
                    >
                        Quero investir!
                    </button>
                </div>
            </div>
        </section>
    );
}
