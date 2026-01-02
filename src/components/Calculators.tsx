export default function Calculators() {
    return (
        <section className="w-full bg-brand-dark py-16">
            <div className="mx-auto w-full max-w-[1167px] px-4 md:px-0">
                {/* TÍTULO */}
                <div className="mb-16 max-w-[440px]">
                    <h2 className="typography-title text-brand-text-light text-3xl">
                        Calculadoras
                    </h2>

                    <p className="mt-2 text-sm typography-text-italic text-brand-brown">
                        Invista de maneira sábia e Rentável
                    </p>
                </div>

                {/* GRID DESKTOP */}
                <div className="hidden md:flex md:justify-center">
                    <div className="grid grid-cols-[252px_252px_244px] gap-2">
                        {/* Coluna 1 */}
                        <div className="flex flex-col gap-2">
                            <CalcCardSmall title="Juros Compostos" />
                            <CalcCardWide title="Juros Simples horizontal" />
                        </div>

                        {/* Coluna 2 */}
                        <div className="flex flex-col gap-2">
                            <CalcCardSmall title="Planilha de Investimentos" />
                        </div>

                        {/* Coluna 3 */}
                        <div>
                            <CalcCardTall title="Juros Simples vertical" />
                        </div>
                    </div>
                </div>


                {/* MOBILE */}
                <div className="flex flex-col gap-4 md:hidden">
                    <CalcCardSmall title="Juros Compostos" />
                    <CalcCardSmall title="Planilha de Investimentos" />
                    <CalcCardWide title="Juros Simples horizontal" />
                    <CalcCardTall title="Juros Simples vertical" />
                </div>
            </div>
        </section>
    );
}

/* ---------- CARDS ---------- */

function BaseCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`
                flex items-center justify-center
                rounded-[15px]
                bg-brand-beige
                text-brand-text-primary
                shadow-sm
                transition hover:scale-[1.02]
                cursor-pointer
                ${className}
            `}
        >
            <span className="text-center font-medium">{children}</span>
        </div>
    );
}

function CalcCardSmall({ title }: { title: string }) {
    return (
        <BaseCard className="h-[135px] w-[252px] text-sm md:text-base">
            {title}
        </BaseCard>
    );
}

function CalcCardWide({ title }: { title: string }) {
    return (
        <BaseCard className="h-[167px] w-[510px] text-sm md:text-base">
            {title}
        </BaseCard>
    );
}

function CalcCardTall({ title }: { title: string }) {
    return (
        <BaseCard className="h-[308px] w-[244px] text-sm md:text-base">
            {title}
        </BaseCard>
    );
}
