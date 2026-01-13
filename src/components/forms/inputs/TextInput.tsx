"use client";

import { forwardRef } from "react";

interface TextInputProps {
  type?: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  placeholder?: string;
  autoComplete?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = "text", value, onChange, onKeyDown, tabIndex, placeholder, autoComplete }, ref) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      onChange(e.target.value);
    }

    return (
      <input
        ref={ref}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder || "Digite aqui..."}
        tabIndex={tabIndex}
        className="w-full rounded-lg bg-brand-dark-bg-primary border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 transition-all"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
