"use client";

import { forwardRef, useState } from "react";

interface CNPJInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  placeholder?: string;
}

const CNPJInput = forwardRef<HTMLInputElement, CNPJInputProps>(
  ({ value, onChange, onKeyDown, tabIndex, placeholder }, ref) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);

    function formatCNPJ(input: string): string {
      const numbers = input.replace(/\D/g, "");
      const limited = numbers.slice(0, 14);

      if (limited.length <= 2) {
        return limited;
      } else if (limited.length <= 5) {
        return `${limited.slice(0, 2)}.${limited.slice(2)}`;
      } else if (limited.length <= 8) {
        return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`;
      } else if (limited.length <= 12) {
        return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8)}`;
      } else {
        return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}/${limited.slice(8, 12)}-${limited.slice(12)}`;
      }
    }

    function validateCNPJ(cnpj: string): boolean {
      const numbers = cnpj.replace(/\D/g, "");
      
      if (numbers.length !== 14) return false;
      
      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(numbers)) return false;

      // Validação do primeiro dígito verificador
      let sum = 0;
      let weight = 5;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(numbers.charAt(i)) * weight;
        weight = weight === 2 ? 9 : weight - 1;
      }
      let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (digit !== parseInt(numbers.charAt(12))) return false;

      // Validação do segundo dígito verificador
      sum = 0;
      weight = 6;
      for (let i = 0; i < 13; i++) {
        sum += parseInt(numbers.charAt(i)) * weight;
        weight = weight === 2 ? 9 : weight - 1;
      }
      digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (digit !== parseInt(numbers.charAt(13))) return false;

      return true;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const formatted = formatCNPJ(e.target.value);
      onChange(formatted);
      
      // Valida apenas quando tiver 14 dígitos
      const numbers = formatted.replace(/\D/g, "");
      if (numbers.length === 14) {
        setIsValid(validateCNPJ(formatted));
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
          placeholder={placeholder || "00.000.000/0000-00"}
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
            CNPJ inválido
          </p>
        )}
        {isValid === true && (
          <p className="mt-1 typography-helvetica text-xs text-green-400">
            CNPJ válido
          </p>
        )}
      </div>
    );
  }
);

CNPJInput.displayName = "CNPJInput";

export default CNPJInput;
