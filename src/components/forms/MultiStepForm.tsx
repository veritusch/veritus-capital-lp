"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PhoneInput from "./inputs/PhoneInput";
import CurrencyInput from "./inputs/CurrencyInput";
import TextInput from "./inputs/TextInput";

interface FormProps {
  token: string;
}

type StepType = "text" | "email" | "tel" | "currency" | "select" | "textarea";

interface Step {
  name: keyof FormData;
  label: string;
  type: StepType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  valorInvestimento: string;
  perfilInvestidor: string;
  observacoes: string;
}

const SELECT_TRANSITION_DELAY_MS = 250;

export default function MultiStepForm({ token }: FormProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    valorInvestimento: "",
    perfilInvestidor: "",
    observacoes: "",
  });

  const inputRef = useRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  >(null);

  const steps: Step[] = [
    {
      name: "nome",
      label: "Qual é o seu nome completo?",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Qual é o seu melhor e-mail?",
      type: "email",
      required: true,
    },
    {
      name: "telefone",
      label: "Qual é o seu telefone?",
      type: "tel",
      required: true,
    },
    {
      name: "valorInvestimento",
      label: "Qual valor pretende investir?",
      type: "currency",
      placeholder: "R$ 100.000",
      required: true,
    },
    {
      name: "perfilInvestidor",
      label: "Qual é o seu perfil de investidor?",
      type: "select",
      options: [
        { label: "Conservador", value: "conservador" },
        { label: "Moderado", value: "moderado" },
        { label: "Arrojado", value: "arrojado" },
      ],
      required: true,
    },
    {
      name: "observacoes",
      label: "Quer deixar alguma observação?",
      type: "textarea",
    },
  ];

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const isValid = canProceed();

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function canProceed() {
    if (!currentStep.required) return true;

    const value = formData[currentStep.name];

    // Validação específica por tipo de campo
    if (currentStep.type === "email") {
      const trimmed = value.trim();
      if (!trimmed) return false;
      // Validação básica de formato de e-mail: texto@texto.dominio
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(trimmed);
    }

    if (currentStep.type === "tel") {
      // Telefone precisa ter pelo menos 10 dígitos: DDD + 8 dígitos
      const numbers = value.replace(/\D/g, "");
      return numbers.length >= 11;
    }

    if (currentStep.type === "currency") {
      // Valor precisa ter pelo menos um número
      const numbers = value.replace(/\D/g, "");
      return numbers.length > 0;
    }

    return Boolean(value && value.trim());
  }

  function handleNext() {
    if (!canProceed()) return;
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    setStep((prev) => Math.max(0, prev - 1));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Dados enviados:", { ...formData, token });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl w-full px-4">
      {/* Logo */}
      <div className="flex justify-center mb-16 pt-8">
        <Image
          src="/logo_veritus_branca.svg"
          alt="Veritus"
          width={240}
          height={60}
          priority
        />
      </div>

      {/* Header com indicador de etapa */}
      

      {/* Renderiza apenas o step atual */}
      <div className="relative min-h-[280px]">
        <div className="space-y-5">
          <h2 className="typography-title text-2xl text-brand-text-light leading-tight">
            {currentStep.label}
          </h2>

          {currentStep.type === "text" && (
            <TextInput
              ref={inputRef as any}
              type="text"
              value={formData[currentStep.name]}
              onChange={(value) => handleChange(currentStep.name, value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canProceed()) {
                  e.preventDefault();
                  handleNext();
                }
              }}
              placeholder={currentStep.placeholder}
              autoComplete={currentStep.name === "nome" ? "name" : undefined}
            />
          )}

          {currentStep.type === "email" && (
            <TextInput
              ref={inputRef as any}
              type="email"
              value={formData[currentStep.name]}
              onChange={(value) => handleChange(currentStep.name, value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canProceed()) {
                  e.preventDefault();
                  handleNext();
                }
              }}
              placeholder={currentStep.placeholder}
              autoComplete="email"
            />
          )}

          {currentStep.type === "tel" && (
            <PhoneInput
              ref={inputRef as any}
              value={formData[currentStep.name]}
              onChange={(value) => handleChange(currentStep.name, value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canProceed()) {
                  e.preventDefault();
                  handleNext();
                }
              }}
              placeholder={currentStep.placeholder}
            />
          )}

          {currentStep.type === "currency" && (
            <CurrencyInput
              ref={inputRef as any}
              value={formData[currentStep.name]}
              onChange={(value) => handleChange(currentStep.name, value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canProceed()) {
                  e.preventDefault();
                  handleNext();
                }
              }}
              placeholder={currentStep.placeholder}
            />
          )}

          {currentStep.type === "textarea" && (
            <textarea
              ref={inputRef as any}
              rows={4}
              placeholder="Opcional..."
              className="w-full rounded-lg bg-brand-dark-bg-chumbo px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none transition-all resize-none shadow-[2px_2px_8px_rgba(0,0,0,0.3)]"
              value={formData[currentStep.name]}
              onChange={(e) => handleChange(currentStep.name, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  handleNext();
                }
              }}
            />
          )}

          {currentStep.type === "select" && (
            <div className="space-y-3">
              {currentStep.options?.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    handleChange(currentStep.name, opt.value);
                    setTimeout(handleNext, SELECT_TRANSITION_DELAY_MS);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleChange(currentStep.name, opt.value);
                      setTimeout(handleNext, 250);
                    }
                    if (e.key === "Tab" && formData[currentStep.name]) {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                  className={`w-full border rounded-lg px-4 py-3 text-left typography-helvetica transition-all
                    ${formData[currentStep.name] === opt.value
                      ? "border-brand-brown bg-brand-brown/20 text-brand-text-light shadow-sm"
                      : "border-brand-brown/30 text-brand-text-light/70 hover:bg-brand-dark-bg-primary hover:border-brand-brown/50 hover:text-brand-text-light"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            tabIndex={0}
            className="flex items-center gap-2 typography-helvetica-bold text-sm text-brand-text-light/60 hover:text-brand-text-light transition-colors group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </button>
        ) : (
          <div></div>
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            tabIndex={0}
            className="bg-brand-golden brand-text-light-alt h-[45px] px-8 rounded-[28px] typography-helvetica-bold hover:opacity-70 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Avançar
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            tabIndex={0}
            className="bg-brand-brown text-brand-light h-[45px] px-8 rounded-[28px] typography-helvetica-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        )}
      </div>

      {submitStatus === "success" && (
        <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <p className="typography-helvetica text-sm text-green-400 text-center">
            ✓ Formulário enviado com sucesso!
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="typography-helvetica text-sm text-red-400 text-center">
            ✕ Erro ao enviar formulário. Tente novamente.
          </p>
        </div>
      )}
    </div>
  );
}
