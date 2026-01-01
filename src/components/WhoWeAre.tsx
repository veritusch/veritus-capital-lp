export default function WhoWeAre() {
    return (
        <section className="mx-auto mt-18 w-full px-4 md:w-[1167px] md:px-0">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">

                {/* Card esquerdo */}
                <div className="
                        w-full
                        rounded-[26px]
                        bg-brand-brown
                        p-6
                        text-brand-light
                        flex
                        flex-col
                        justify-between
                        md:w-[287px]
                        md:h-[247px]
                        md:p-8
                ">
                    <span className="text-sm opacity-80 typography-helvetica-italic">
                        Precisamos de um texto
                    </span>

                    <div className="mt-6 md:mt-0">
                        <p className="text-[36px] leading-none md:text-[40px] typography-title">
                            +20 Mi
                        </p>
                        <p className="mt-1 text-sm opacity-80 typography-helvetica-italic">
                            Em ativos investidos
                        </p>
                    </div>
                </div>

                {/* Card direito */}
                <div
                    className="
                        w-full
                        rounded-[26px]
                        bg-white
                        p-6
                        flex
                        flex-col
                        md:w-[575px]
                        md:h-[247px]
                        md:p-8
                        md:justify-center
                    "
                >
                    <h2 className="text-xl text-brand-text-primary md:text-4xl typography-title text-brand-dark-deep">
                        Quem somos
                    </h2>

                    <p className="mt-4 max-w-[420px] text-sm text-neutral-600 typography-helvetica-italic">
                        Precisamos ainda definir qual será o texto que falaremos.
                    </p>
                </div>
            </div>
        </section>
    );
}
