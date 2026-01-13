"use client";

import { forwardRef, useState } from "react";

interface CPFInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  placeholder?: string;
}

const CPFInput = forwardRef<HTMLInputElement, CPFInputProps>(
  ({ value, onChange, onKeyDown, tabIndex, placeholder }, ref) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    function formatCPF(input: string): string {
      const numbers = input.replace(/\D/g, "");
      const limited = numbers.slice(0, 11);

      if (limited.length <= 3) {
        return limited;
      } else if (limited.length <= 6) {
        return `${limited.slice(0, 3)}.${limited.slice(3)}`;
      } else if (limited.length <= 9) {
        return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
      } else {
        return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
      }
    }

    function validateCPF(cpf: string): boolean {
      const numbers = cpf.replace(/\D/g, "");
      
      if (numbers.length !== 11) return false;
      
      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(numbers)) return false;

      // Validação do primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(numbers.charAt(i)) * (10 - i);
      }
      let digit = 11 - (sum % 11);
      if (digit >= 10) digit = 0;
      if (digit !== parseInt(numbers.charAt(9))) return false;

      // Validação do segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(numbers.charAt(i)) * (11 - i);
      }
      digit = 11 - (sum % 11);
      if (digit >= 10) digit = 0;
      if (digit !== parseInt(numbers.charAt(10))) return false;

      return true;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const formatted = formatCPF(e.target.value);
      onChange(formatted);
      
      // Valida apenas quando tiver 11 dígitos
      const numbers = formatted.replace(/\D/g, "");
      if (numbers.length === 11) {
        setIsValid(validateCPF(formatted));
      } else {
        setIsValid(null);
      }
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          placeholder={placeholder || "000.000.000-00"}
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
            CPF inválido
          </p>
        )}
        {isValid === true && (
          <p className="mt-1 typography-helvetica text-xs text-green-400">
            CPF válido
          </p>
        )}
      </div>
    );
  }
);

CPFInput.displayName = "CPFInput";

export default CPFInput;
