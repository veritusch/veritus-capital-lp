"use client";

import { forwardRef } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  placeholder?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, onKeyDown, tabIndex, placeholder }, ref) => {
    function formatPhone(input: string): string {
      const numbers = input.replace(/\D/g, "");
      const limited = numbers.slice(0, 11);

      if (limited.length <= 2) {
        return limited;
      } else if (limited.length <= 3) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
      } else if (limited.length <= 7) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2, 3)} ${limited.slice(3)}`;
      } else {
        return `(${limited.slice(0, 2)}) ${limited.slice(2, 3)} ${limited.slice(3, 7)}-${limited.slice(7)}`;
      }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const formatted = formatPhone(e.target.value);
      onChange(formatted);
    }

    return (
      <input
        ref={ref}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder={placeholder || "Digite seu número com DDD"}
        tabIndex={tabIndex}
        className="w-full rounded-lg bg-brand-dark-bg-primary border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 transition-all"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
