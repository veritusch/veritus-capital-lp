"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PhoneInput from "./inputs/PhoneInput";
import CurrencyInput from "./inputs/CurrencyInput";
import TextInput from "./inputs/TextInput";
import CPFInput from "./inputs/CPFInput";
import CEPInput from "./inputs/CEPInput";
import DateInput from "./inputs/DateInput";

interface FormProps {
  token: string;
}

type StepType = "text" | "email" | "tel" | "currency" | "select" | "textarea" | "cpf" | "cep" | "date";

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
  cpf: string;
  logradouro: string;
  numeroResidencia?: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  dataInicioContrato: string;
  dataNascimentoCliente?: string;
  valorInvestimento: string;
  chavePixCliente: string;
  nomeHerdeiro1?: string;
  nomeHerdeiro2?: string;
  nomeHerdeiro3?: string;
  cpfHerdeiro1?: string;
  cpfHerdeiro2?: string;
  cpfHerdeiro3?: string;
  rgHerdeiro1?: string;
  rgHerdeiro2?: string;
  rgHerdeiro3?: string;
  grauParentescoHerdeiro1?: string;
  grauParentescoHerdeiro2?: string;
  grauParentescoHerdeiro3?: string;
  nomeTerceiro: string;
  cpfTerceiro: string;
  nomeBancoTerceiro: string;
  agenciaTerceiro: string;
  contaTerceiro: string;
  chavePixTerceiro: string;
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
    cpf: "",
    logradouro: "",
    valorInvestimento: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    dataInicioContrato: "",
    dataNascimentoCliente: "",
    chavePixCliente: "",
    nomeTerceiro: "",
    cpfTerceiro: "",
    nomeBancoTerceiro: "",
    agenciaTerceiro: "",
    contaTerceiro: "",
    chavePixTerceiro: "",
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
      name: "dataNascimentoCliente",
      label: "Qual é a sua data de nascimento?",
      type: "date",
      placeholder: "DD/MM/AAAA",
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
      name: "cpf",
      label: "Qual é o seu CPF?",
      type: "cpf",
      required: true,
    },
    {
      name: "logradouro",
      label: "Qual é o seu logradouro?",
      type: "text",
      placeholder: "(Rua, Avenida, etc)",
      required: true,
    },
    {
      name: "numeroResidencia",
      label: "Qual é o número da sua residência?",
      type: "text"
    },
    {
      name: "complemento",
      label: "Qual é o seu Complemento",
      type: "text",
      placeholder: "(Apto, Bloco, Casa, etc.)"
    },
    {
      name: "bairro",
      label: "Qual é o seu bairro?",
      type: "text",
      required: true,
    },
    {
      name: "cep",
      label: "Qual é o seu CEP?",
      type: "cep",
      required: true,
    },
    {
      name: "cidade",
      label: "Qual é a sua cidade?",
      type: "text",
      required: true,
    },
    {
      name: "estado",
      label: "Qual é o seu estado?",
      type: "select",
      required: true,
      options: [
        { label: "Acre", value: "Acre" },
        { label: "Alagoas", value: "Alagoas" },
        { label: "Amapá", value: "Amapá" },
        { label: "Amazonas", value: "Amazonas" },
        { label: "Bahia", value: "Bahia" },
        { label: "Ceará", value: "Ceará" },
        { label: "Distrito Federal", value: "Distrito Federal" },
        { label: "Espírito Santo", value: "Espírito Santo" },
        { label: "Goiás", value: "Goiás" },
        { label: "Maranhão", value: "Maranhão" },
        { label: "Mato Grosso", value: "Mato Grosso" },
        { label: "Mato Grosso do Sul", value: "Mato Grosso do Sul" },
        { label: "Minas Gerais", value: "Minas Gerais" },
        { label: "Pará", value: "Pará" },
        { label: "Paraíba", value: "Paraíba" },
        { label: "Paraná", value: "Paraná" },
        { label: "Pernambuco", value: "Pernambuco" },
        { label: "Piauí", value: "Piauí" },
        { label: "Rio de Janeiro", value: "Rio de Janeiro" },
        { label: "Rio Grande do Norte", value: "Rio Grande do Norte" },
        { label: "Rio Grande do Sul", value: "Rio Grande do Sul" },
        { label: "Rondônia", value: "Rondônia" },
        { label: "Roraima", value: "Roraima" },
        { label: "Santa Catarina", value: "Santa Catarina" },
        { label: "São Paulo", value: "São Paulo" },
        { label: "Sergipe", value: "Sergipe" },
        { label: "Tocantins", value: "Tocantins" },
      ],
    },
    {
      name: "dataInicioContrato",
      label: "Qual é a data de início do contrato?",
      type: "date",
      placeholder: "DD/MM/AAAA",
      required: true,
    },
    {
      name: "valorInvestimento",
      label: "Qual valor pretende investir?",
      type: "currency",
      placeholder: "R$ 100.000,00",
      required: true,
    },
    {
      name: "chavePixCliente",
      label: "Qual é a sua chave PIX?",
      type: "text",
      required: true,
    }
  ];

  const currentStep = steps[step];

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  function canProceed() {
    if (!currentStep.required) return true;

    const value = formData[currentStep.name];

    // Verifica se o valor existe e é uma string
    if (!value) return false;

    const stringValue = typeof value === 'string' ? value :
      Array.isArray(value) ? value[0] || '' :
        String(value);

    // Validação específica por tipo de campo
    if (currentStep.type === "email") {
      const trimmed = stringValue.trim();
      if (!trimmed) return false;
      // Validação básica de formato de e-mail: texto@texto.dominio
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(trimmed);
    }

    if (currentStep.type === "tel") {
      // Telefone precisa ter pelo menos 10 dígitos: DDD + 8 dígitos
      const numbers = stringValue.replace(/\D/g, "");
      return numbers.length >= 11;
    }

    if (currentStep.type === "currency") {
      // Valor precisa ter pelo menos um número
      const numbers = stringValue.replace(/\D/g, "");
      return numbers.length > 0;
    }

    if (currentStep.type === "cpf") {
      // CPF precisa ter exatamente 11 dígitos e ser válido
      const numbers = stringValue.replace(/\D/g, "");
      if (numbers.length !== 11) return false;
      return validateCPF(stringValue);
    }

    if (currentStep.type === "cep") {
      // CEP precisa ter exatamente 8 dígitos
      const numbers = stringValue.replace(/\D/g, "");
      return numbers.length === 8;
    }

    if (currentStep.type === "date") {
      // Data precisa estar no formato DD/MM/AAAA
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(stringValue)) return false;
      
      // Valida se é uma data válida
      const [day, month, year] = stringValue.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    }

    return Boolean(stringValue && stringValue.trim());
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
              value={typeof formData[currentStep.name] === 'string' ? formData[currentStep.name] as string : ''}
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
              value={typeof formData[currentStep.name] === 'string' ? formData[currentStep.name] as string : ''}
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
              value={typeof formData[currentStep.name] === 'string' ? formData[currentStep.name] as string : ''}
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
              value={typeof formData[currentStep.name] === 'string' ? formData[currentStep.name] as string : ''}
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
              value={typeof formData[currentStep.name] === 'string' ? formData[currentStep.name] as string : ''}
              onChange={(e) => handleChange(currentStep.name, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  handleNext();
                }
              }}
            />
          )}

          {currentStep.type === "cpf" && (
            <CPFInput
              ref={inputRef as any}
              value={typeof formData[currentStep.name] === 'string' ? formData[currentStep.name] as string : ''}
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

          {currentStep.type === "cep" && (
            <CEPInput
              ref={inputRef as any}
              value={typeof formData[currentStep.name] === 'string' ? formData[currentStep.name] as string : ''}
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

          {currentStep.type === "date" && (
            <DateInput
              ref={inputRef as any}
              value={typeof formData[currentStep.name] === 'string' ? formData[currentStep.name] as string : ''}
              onChange={(value) => handleChange(currentStep.name, value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canProceed()) {
                  e.preventDefault();
                  handleNext();
                }
              }}
              placeholder={currentStep.placeholder}
              maxDate={currentStep.name === "dataNascimentoCliente" ? new Date().toISOString().split('T')[0] : undefined}
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
