"use client";

import { forwardRef } from "react";

interface CEPInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  placeholder?: string;
}

const CEPInput = forwardRef<HTMLInputElement, CEPInputProps>(
  ({ value, onChange, onKeyDown, tabIndex, placeholder }, ref) => {
    function formatCEP(input: string): string {
      // Remove tudo que não é dígito
      const numbers = input.replace(/\D/g, "");
      // Limita a 8 dígitos
      const limited = numbers.slice(0, 8);

      // Formata: 50000-000
      if (limited.length <= 5) {
        return limited;
      } else {
        return `${limited.slice(0, 5)}-${limited.slice(5)}`;
      }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const formatted = formatCEP(e.target.value);
      onChange(formatted);
    }

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        placeholder={placeholder || "00000-000"}
        tabIndex={tabIndex}
        className="w-full rounded-lg bg-brand-golden-light border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 transition-all"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);

CEPInput.displayName = "CEPInput";

export default CEPInput;
