"use client";

import { forwardRef } from "react";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  placeholder?: string;
  minDate?: string; // formato: YYYY-MM-DD
  maxDate?: string; // formato: YYYY-MM-DD
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onChange, onKeyDown, tabIndex, placeholder, minDate, maxDate }, ref) => {
    // Converte DD/MM/YYYY para YYYY-MM-DD (formato do input date)
    function formatToInputDate(dateStr: string): string {
      if (!dateStr) return "";
      
      // Se já está no formato YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr;
      }
      
      // Se está no formato DD/MM/YYYY
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }
      
      return "";
    }

    // Converte YYYY-MM-DD para DD/MM/YYYY (formato brasileiro)
    function formatToBrazilianDate(dateStr: string): string {
      if (!dateStr) return "";
      
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
      }
      
      return dateStr;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const inputValue = e.target.value; // YYYY-MM-DD
      const brazilianFormat = formatToBrazilianDate(inputValue);
      onChange(brazilianFormat);
    }

    const inputValue = formatToInputDate(value);

    return (
      <input
        ref={ref}
        type="date"
        tabIndex={tabIndex}
        className="w-full rounded-lg bg-brand-dark-bg-chumbo px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.3)] 
        [color-scheme:dark]
        cursor-pointer
        hover:bg-brand-dark-bg-chumbo/80"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        min={minDate}
        max={maxDate}
        placeholder={placeholder}
      />
    );
  }
);

DateInput.displayName = "DateInput";

export default DateInput;
