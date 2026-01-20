"use client";

import { forwardRef, useState } from "react";

interface RGInputProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    tabIndex?: number;
    placeholder?: string;
}

const RGInput = forwardRef<HTMLInputElement, RGInputProps>(
    ({ value, onChange, onKeyDown, tabIndex, placeholder }, ref) => {

        const [isValid, setIsValid] = useState<boolean | null>(null);

        function formatRG(input: string): string {
            // remove espaços extras
            return input.trimStart();
        }

        function validateRG(rg: string): boolean {
            const limpo = rg.trim();

            // Tamanho aceitável de RGs no Brasil
            if (limpo.length < 5) return false;
            if (limpo.length > 14) return false;

            // Apenas letras e números
            if (!/^[a-zA-Z0-9]+$/.test(limpo)) return false;

            // Bloqueia sequências repetidas tipo 111111 ou AAAAA
            if (/^([a-zA-Z0-9])\1+$/.test(limpo)) return false;

            return true;
        }

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            const formatted = formatRG(e.target.value);
            onChange(formatted);

            if (formatted.length >= 5) {
                setIsValid(validateRG(formatted));
            } else {
                setIsValid(null);
            }
        }

        return (
            <div className="relative">
                <input
                    ref={ref}
                    type="text"
                    placeholder={placeholder || "RG"}
                    tabIndex={tabIndex}
                    className={`w-full rounded-lg bg-brand-dark-bg-primary border px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:ring-2 transition-all
            ${isValid === false
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : isValid === true
                                ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                                : "border-brand-brown/30 focus:border-brand-brown focus:ring-brand-brown/20"
                        }`}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                />

                {isValid === false && (
                    <p className="mt-1 typography-helvetica text-xs text-red-400">
                        RG inválido
                    </p>
                )}

                {isValid === true && (
                    <p className="mt-1 typography-helvetica text-xs text-green-400">
                        RG válido
                    </p>
                )}
            </div>
        );
    }
);

RGInput.displayName = "RGInput";

export default RGInput;
