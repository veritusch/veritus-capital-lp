export default function Newsletter() {
    return (
        <section className="w-full bg-brand-dark py-14">
            <div className="mx-auto w-full px-4 md:max-w-[1132px] md:px-0">
                <div
                    className="
                        flex
                        h-auto
                        flex-col
                        justify-between
                        gap-10
                        rounded-[33px]
                        bg-brand-beige
                        px-8
                        py-10
                        md:h-[335px]
                        md:flex-row
                        md:items-center
                        md:px-16
                    "
                >
                    {/* TEXTO */}
                    <div className="max-w-[520px]">
                        <h2 className="typography-title text-brand-text-primary text-3xl leading-tight">
                            Receba as principais notícias
                            <br />
                            sobre o mercado financeiro
                        </h2>

                        <p className="mt-4 max-w-[420px] text-sm italic text-neutral-600">
                            Fique por dentro da economia de nosso país e receba
                            índices semanais de nossas melhores operações.
                        </p>
                    </div>

                    {/* FORM */}
                    <div className="w-full max-w-[420px]">
                        <div className="flex flex-col gap-3 md:flex-row">
                            <input
                                type="email"
                                placeholder="Seu melhor e-mail"
                                className="
                                    h-[44px]
                                    w-full
                                    rounded-full
                                    bg-brand-beige-subtle
                                    px-5
                                    text-sm
                                    text-brand-text-primary
                                    outline-none
                                    placeholder:text-neutral-500
                                "
                            />

                            <button
                                className="
                                    h-[44px]
                                    rounded-full
                                    bg-brand-brown
                                    px-6
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:brightness-110
                                "
                            >
                                Inscrever
                            </button>
                        </div>

                        <p className="mt-3 text-[11px] text-neutral-500">
                            Ao inscrever-se, você concorda com os termos
                            de nossa{" "}
                            <span className="underline">
                                política de privacidade
                            </span>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
