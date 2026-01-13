"use client";

import { useEffect, useRef, useState } from "react";

interface FormProps {
  token: string;
}

type StepType = "text" | "email" | "tel" | "select" | "textarea";

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
      type: "text",
      placeholder: "Ex: R$ 100.000,00",
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

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  function handleChange(value: string) {
    setFormData((prev) => ({
      ...prev,
      [currentStep.name]: value,
    }));
  }

  function canProceed() {
    if (!currentStep.required) return true;
    return Boolean(formData[currentStep.name]);
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
    <div className="mx-auto max-w-xl w-full rounded-xl bg-brand-dark-bg-chumbo p-8 shadow-lg">
      {/* Header com indicador de etapa */}
      <div className="mb-6">
        <p className="typography-helvetica text-sm text-brand-text-light/60 mb-4">
          Etapa {step + 1} de {steps.length}
        </p>
        
        {/* Progress */}
        <div className="h-1 w-full bg-brand-dark-bg-primary rounded">
          <div
            className="h-1 bg-brand-brown rounded transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Slides Container - IMPORTANTE: overflow-hidden aqui */}
      <div className="relative overflow-hidden min-h-[280px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          {steps.map((s, index) => (
            <div 
              key={s.name} 
              className="w-full flex-shrink-0 px-1"
              style={{ minWidth: '100%' }}
            >
              <div className="space-y-5">
                <h2 className="typography-title text-2xl text-brand-text-light leading-tight">
                  {s.label}
                </h2>

                {s.type !== "select" && s.type !== "textarea" && (
                  <input
                    ref={index === step ? (inputRef as any) : null}
                    type={s.type}
                    placeholder={s.placeholder}
                    className="w-full rounded-lg bg-brand-dark-bg-primary border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 transition-all"
                    value={formData[s.name]}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && canProceed()) {
                        e.preventDefault();
                        handleNext();
                      }
                    }}
                  />
                )}

                {s.type === "textarea" && (
                  <textarea
                    ref={index === step ? (inputRef as any) : null}
                    rows={4}
                    placeholder="Opcional..."
                    className="w-full rounded-lg bg-brand-dark-bg-primary border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 transition-all resize-none"
                    value={formData[s.name]}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                )}

                {s.type === "select" && (
                  <div className="space-y-3">
                    {s.options?.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          handleChange(opt.value);
                          setTimeout(handleNext, 250);
                        }}
                        className={`w-full border rounded-lg px-4 py-3 text-left typography-helvetica transition-all
                          ${formData[s.name] === opt.value
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
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 typography-helvetica-bold text-sm text-brand-text-light/70 hover:text-brand-text-light transition-colors group"
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
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-brand-brown text-brand-light h-[45px] px-8 rounded-[28px] typography-helvetica-bold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuar →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
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
