export default function Calculators() {
    return (
        <section className="w-full bg-brand-dark py-16">
            <div className="mx-auto w-full max-w-[1167px] px-4 md:px-0">
                {/* TÍTULO */}
                <div className="mb-16 text-center">
                    <h2 className="typography-title text-brand-text-light text-3xl">
                        Calculadoras
                    </h2>

                    <p className="mt-2 text-sm typography-text-italic text-brand-brown">
                        Invista de maneira sábia e Rentável
                    </p>
                </div>

                {/* GRID DESKTOP */}
                <div className="hidden md:flex md:justify-center md:gap-4">
                    <CalcCardTall title="Juros Simples" />
                    <CalcCardTall title="Planilha de Custos Mensais" />
                </div>

                {/* MOBILE */}
                <div className="flex flex-col items-center gap-4 md:hidden">
                    <CalcCardTall title="Juros Simples" mobile />
                    <CalcCardTall title="Planilha de Custos Mensais" mobile />
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

function CalcCardSmall({
    title,
    mobile,
}: {
    title: string;
    mobile?: boolean;
}) {
    return (
        <BaseCard
            className={`
                h-[135px]
                ${mobile ? "w-full max-w-[320px]" : "w-[252px]"}
                text-sm md:text-base
            `}
        >
            {title}
        </BaseCard>
    );
}

function CalcCardWide({
    title,
    mobile,
}: {
    title: string;
    mobile?: boolean;
}) {
    return (
        <BaseCard
            className={`
                h-[167px]
                ${mobile ? "w-full max-w-[320px]" : "w-[510px]"}
                text-sm md:text-base
            `}
        >
            {title}
        </BaseCard>
    );
}

function CalcCardTall({
    title,
    mobile,
}: {
    title: string;
    mobile?: boolean;
}) {
    return (
        <BaseCard
            className={`
                h-[308px]
                ${mobile ? "w-full max-w-[320px]" : "w-[244px]"}
                text-sm md:text-base
            `}
        >
            {title}
        </BaseCard>
    );
}
