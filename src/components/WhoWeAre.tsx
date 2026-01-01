export default function WhoWeAre() {
    return (
        <section className="mx-auto mt-24 w-[1167px]">
            <div className="flex justify-center gap-6">
                {/* Card esquerdo */}
                <div className="
                        w-[287px]
                        h-[247px]
                        rounded-[26px]
                        bg-brand-brown
                        p-8
                        text-brand-light
                        flex
                        flex-col
                        justify-between
                ">
                    <span className="text-sm opacity-80 typography-helvetica-italic">
                        Precisamos de um texto
                    </span>

                    <div>
                        <p className="text-[40px] typography-title leading-none">
                            +20 Mi
                        </p>
                        <p className="mt-1 text-sm typography-helvetica-italic opacity-80">
                            Em ativos investidos
                        </p>
                    </div>
                </div>

                {/* Card direito */}
                <div
                    className="
                        w-[575px]
                        h-[247px]
                        rounded-[26px]
                        bg-white
                        p-8
                        flex
                        flex-col
                        justify-center
                    "
                >
                    <h2 className="typography-title text-4xl text-brand-dark-deep">
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
