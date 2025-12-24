interface InvestButtonProps {
    className?: string;
}

export function InvestButton({ className = "" }: InvestButtonProps) {
    return (
        <button
            className={`bg-[#9F8762] text-[#1E1E1E] w-[180px] h-[37px] rounded-[28px] font-sans font-bold text-xs leading-[100%] text-center whitespace-nowrap hover:opacity-90 transition-opacity ${className}`}
        >
           Quero investir!
        </button>
    );
}

