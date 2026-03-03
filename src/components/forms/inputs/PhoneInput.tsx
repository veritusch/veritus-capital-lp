"use client";

import { forwardRef, useState, useEffect } from "react";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  maxDigits: number;
  format: (digits: string) => string;
}

const COUNTRIES: Country[] = [
  // +1
  {
    code: "US",
    name: "Estados Unidos",
    dialCode: "1",
    flag: "🇺🇸",
    maxDigits: 10,
    format: (d) => {
      if (d.length <= 3) return d.length ? `(${d}` : "";
      if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    },
  },
  {
    code: "CA",
    name: "Canadá",
    dialCode: "1",
    flag: "🇨🇦",
    maxDigits: 10,
    format: (d) => {
      if (d.length <= 3) return d.length ? `(${d}` : "";
      if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    },
  },
  // +33
  {
    code: "FR",
    name: "França",
    dialCode: "33",
    flag: "🇫🇷",
    maxDigits: 9,
    format: (d) => {
      const chunks = [];
      for (let i = 0; i < d.length; i += 2) chunks.push(d.slice(i, i + 2));
      return chunks.join(" ");
    },
  },
  // +34
  {
    code: "ES",
    name: "Espanha",
    dialCode: "34",
    flag: "🇪🇸",
    maxDigits: 9,
    format: (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
    },
  },
  // +39
  {
    code: "IT",
    name: "Itália",
    dialCode: "39",
    flag: "🇮🇹",
    maxDigits: 10,
    format: (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
    },
  },
  // +41
  {
    code: "CH",
    name: "Suíça",
    dialCode: "41",
    flag: "🇨🇭",
    maxDigits: 9,
    format: (d) => {
      if (d.length <= 2) return d;
      if (d.length <= 5) return `${d.slice(0, 2)} ${d.slice(2)}`;
      return `${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
    },
  },
  // +44
  {
    code: "GB",
    name: "Reino Unido",
    dialCode: "44",
    flag: "🇬🇧",
    maxDigits: 10,
    format: (d) => {
      if (d.length <= 4) return d;
      if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
      return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
    },
  },
  // +49
  {
    code: "DE",
    name: "Alemanha",
    dialCode: "49",
    flag: "🇩🇪",
    maxDigits: 11,
    format: (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 7) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
    },
  },
  // +55
  {
    code: "BR",
    name: "Brasil",
    dialCode: "55",
    flag: "🇧🇷",
    maxDigits: 11,
    format: (d) => {
      if (d.length <= 2) return d;
      if (d.length <= 3) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3)}`;
      return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
    },
  },
  // +351
  {
    code: "PT",
    name: "Portugal",
    dialCode: "351",
    flag: "🇵🇹",
    maxDigits: 9,
    format: (d) => {
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
      return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
    },
  },
];

function parseValueToCountryAndLocal(
  value: string
): { country: Country; localFormatted: string } {
  const defaultCountry = COUNTRIES.find((c) => c.code === "BR") ?? COUNTRIES[0];
  if (!value) return { country: defaultCountry, localFormatted: "" };

  // Try to match a dial code prefix like "+55 ..." or "+351 ..."
  const match = value.match(/^\+(\d{1,4})\s?(.*)/);
  if (match) {
    const dialCode = match[1];
    const rest = match[2];
    // Find country by dialCode (prefer exact, longer codes first)
    const found = [...COUNTRIES]
      .sort((a, b) => b.dialCode.length - a.dialCode.length)
      .find((c) => c.dialCode === dialCode);
    if (found) {
      return { country: found, localFormatted: rest };
    }
  }

  return { country: defaultCountry, localFormatted: value };
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  placeholder?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, onKeyDown, tabIndex, placeholder }, ref) => {
    const parsed = parseValueToCountryAndLocal(value);
    const [selectedCountry, setSelectedCountry] = useState<Country>(parsed.country);
    const [localValue, setLocalValue] = useState<string>(parsed.localFormatted);

    // Sync external value changes (e.g. form reset)
    useEffect(() => {
      const p = parseValueToCountryAndLocal(value);
      setSelectedCountry(p.country);
      setLocalValue(p.localFormatted);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function formatLocal(input: string, country: Country): string {
      const digits = input.replace(/\D/g, "").slice(0, country.maxDigits);
      return country.format(digits);
    }

    function emitChange(country: Country, local: string) {
      const full = local ? `+${country.dialCode} ${local}` : "";
      onChange(full);
    }

    function handleLocalChange(e: React.ChangeEvent<HTMLInputElement>) {
      const formatted = formatLocal(e.target.value, selectedCountry);
      setLocalValue(formatted);
      emitChange(selectedCountry, formatted);
    }

    function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
      const country = COUNTRIES.find((c) => c.code === e.target.value) ?? COUNTRIES[0];
      // Reformat existing digits with new country's format
      const digits = localValue.replace(/\D/g, "");
      const reformatted = formatLocal(digits, country);
      setSelectedCountry(country);
      setLocalValue(reformatted);
      emitChange(country, reformatted);
    }

    const inputPlaceholder =
      placeholder ??
      (selectedCountry.code === "BR"
        ? "Número com DDD"
        : selectedCountry.code === "US" || selectedCountry.code === "CA"
        ? "(XXX) XXX-XXXX"
        : "número");

    return (
      <div className="flex w-full rounded-lg overflow-hidden border border-brand-brown/30 focus-within:border-brand-brown focus-within:ring-2 focus-within:ring-brand-brown/20 transition-all bg-brand-dark-bg-primary">
        {/* Country selector */}
        <select
          value={selectedCountry.code}
          onChange={handleCountryChange}
          tabIndex={tabIndex !== undefined ? tabIndex - 1 : undefined}
          className="shrink-0 bg-brand-dark-bg-primary text-brand-text-light typography-helvetica text-sm pl-3 pr-1 py-3 border-r border-brand-brown/30 focus:outline-none cursor-pointer"
          aria-label="País"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} +{c.dialCode}
            </option>
          ))}
        </select>

        {/* Local number input */}
        <input
          ref={ref}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={inputPlaceholder}
          tabIndex={tabIndex}
          className="flex-1 min-w-0 bg-transparent px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none"
          value={localValue}
          onChange={handleLocalChange}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
