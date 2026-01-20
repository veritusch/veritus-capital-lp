"use client";

import { forwardRef } from "react";

interface NumberInputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    tabIndex?: number;
    placeholder?: string;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    ({ value, onChange, onKeyDown, tabIndex, placeholder }, ref) => {

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            // 👇 Aqui está a regra principal
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            onChange(onlyNumbers);
        }

        return (
            <input
                ref={ref}
                type="text"
                inputMode="numeric"
                placeholder={placeholder || "Somente números"}
                tabIndex={tabIndex}
                className="w-full rounded-lg bg-brand-dark-bg-chumbo px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.3)]"
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
            />
        );
    }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
