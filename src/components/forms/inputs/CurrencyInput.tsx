"use client";

import { forwardRef } from "react";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  placeholder?: string;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, onKeyDown, tabIndex, placeholder }, ref) => {
    function formatCurrency(input: string): string {
      // Remove tudo que não é número
      const numbers = input.replace(/\D/g, "");
      
      if (!numbers) return "";

      // Converte para número e formata
      const numberValue = parseInt(numbers, 10);
      
      // Formata com separador de milhares
      const formatted = numberValue.toLocaleString("pt-BR");
      
      return `R$ ${formatted}`;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const formatted = formatCurrency(e.target.value);
      onChange(formatted);
    }

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        placeholder={placeholder || "R$ 100.000"}
        tabIndex={tabIndex}
        className="w-full rounded-lg bg-brand-dark-bg-primary border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 transition-all"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
