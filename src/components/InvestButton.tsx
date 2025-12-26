interface InvestButtonProps {
    className?: string;
}

export function InvestButton({ className = "" }: InvestButtonProps) {
    return (
        <button
            className={`bg-brand-brown text-brand-light w-[180px] h-[37px] 
                rounded-[28px] typography-helvetica-bold text-xs text-center whitespace-nowrap hover:opacity-90 transition-opacity ${className}`}
        >
            Quero investir!
        </button>
    );
}

