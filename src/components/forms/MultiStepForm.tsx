"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import PhoneInput from "./inputs/PhoneInput";
import CurrencyInput from "./inputs/CurrencyInput";
import TextInput from "./inputs/TextInput";
import NumberInput from "./inputs/NumberInput";
import CPFInput from "./inputs/CPFInput";
import CNPJInput from "./inputs/CNPJInput";
import CEPInput from "./inputs/CEPInput";
import DateInput from "./inputs/DateInput";
import RGInput from "./inputs/RGInput";
import { generateId } from "@/src/utils/uuid";
import { CepService } from "@/src/services/cep.service";
import { removeToken } from "@/src/lib/token";
import FormSuccess from "./FormSuccess";

interface FormProps {
  token: string;
}

type StepType = "text" | "email" | "tel" | "currency" | "select" | "textarea" | "cpf" | "cnpj" | "cep" | "date" | "rg" | "number" | "address";

interface Step {
  name: keyof FormData;
  label: string;
  type: StepType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
}

interface FormData {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  telefoneEhWhatsapp?: string;
  numeroWhatsapp?: string;
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
  desejaAdicionarHerdeiros?: string;
  quantidadeHerdeiros?: string;
  desejaDepositoTerceiro?: string;
  tipoTerceiro?: string;
  chavePixCliente?: string;
  nomeHerdeiro1?: string;
  nomeHerdeiro2?: string;
  nomeHerdeiro3?: string;
  cpfHerdeiro1?: string;
  cpfHerdeiro2?: string;
  cpfHerdeiro3?: string;
  grauParentescoHerdeiro1?: string;
  grauParentescoHerdeiro2?: string;
  grauParentescoHerdeiro3?: string;
  nomeTerceiro: string;
  cpfTerceiro: string;
  cnpjTerceiro: string;
  nomeBancoTerceiro: string;
  agenciaTerceiro: string;
  contaTerceiro: string;
  chavePixTerceiro: string;
  aceiteLGPD?: string;
}

const SELECT_TRANSITION_DELAY_MS = 250;

export default function MultiStepForm({ token }: FormProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<"idle" | "success" | "error">("idle");
  const [logradouroFromAPI, setLogradouroFromAPI] = useState(false);
  const [bairroFromAPI, setBairroFromAPI] = useState(false);
  const [cepError, setCepError] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    id: generateId(),
    nomeCompleto: "",
    email: "",
    telefone: "",
    telefoneEhWhatsapp: "",
    numeroWhatsapp: "",
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
    desejaAdicionarHerdeiros: "",
    quantidadeHerdeiros: "",
    desejaDepositoTerceiro: "",
    nomeTerceiro: "",
    cpfTerceiro: "",
    cnpjTerceiro: "",
    nomeBancoTerceiro: "",
    agenciaTerceiro: "",
    contaTerceiro: "",
    chavePixTerceiro: "",
    aceiteLGPD: "",
  });

  const inputRef = useRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  >(null);

  const steps: Step[] = useMemo(() => {
    const baseSteps: Step[] = [
      {
        name: "nomeCompleto",
        label: "Qual é o seu nome completo?",
        type: "text",
        required: true,
      },
      {
        name: "dataNascimentoCliente",
        label: "Informe sua data de nascimento?",
        type: "date",
        placeholder: "DD/MM/AAAA",
        required: true,
      },
      {
        name: "email",
        label: "Informe seu melhor e-mail?",
        type: "email",
        required: true,
      },
      {
        name: "telefone",
        label: "Informe seu telefone?",
        type: "tel",
        required: true,
      },
      {
        name: "telefoneEhWhatsapp",
        label: "Este telefone é WhatsApp?",
        type: "select",
        required: true,
        options: [
          { label: "Sim", value: "Sim" },
          { label: "Não", value: "Não" },
        ],
      },
    ];

    // Adiciona campo para número do WhatsApp se o telefone não for WhatsApp
    if (formData.telefoneEhWhatsapp === "Não") {
      baseSteps.push({
        name: "numeroWhatsapp",
        label: "Informe seu número de WhatsApp?",
        type: "tel",
        required: true,
      });
    }

    baseSteps.push({
      name: "cpf",
      label: "Informe seu CPF?",
      type: "cpf",
      required: true,
    });

    // Todos os campos de endereço em uma única tela
    baseSteps.push({
      name: "cep",
      label: "Informe seu endereço completo",
      type: "address",
      required: true,
    });

    baseSteps.push({
      name: "dataInicioContrato",
      label: "Qual é a data de início do contrato?",
      type: "date",
      placeholder: "DD/MM/AAAA",
      required: true,
    });

    baseSteps.push({
      name: "valorInvestimento",
      label: "Qual valor pretende investir?",
      type: "currency",
      placeholder: "R$ 100.000,00",
      required: true,
    });

    baseSteps.push({
      name: "desejaAdicionarHerdeiros",
      label: "Deseja adicionar Herdeiros ao contrato?",
      type: "select",
      required: true,
      options: [
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
      ],
    });


    // Adiciona pergunta sobre quantidade de herdeiros se a resposta for "Sim"
    if (formData.desejaAdicionarHerdeiros === "Sim") {
      baseSteps.push({
        name: "quantidadeHerdeiros",
        label: "Quantos herdeiros deseja adicionar?",
        type: "select",
        required: true,
        options: [
          { label: "1 herdeiro", value: "1" },
          { label: "2 herdeiros", value: "2" },
          { label: "3 herdeiros", value: "3" },
        ],
      });

      const quantidade = parseInt(formData.quantidadeHerdeiros || "0");

      // Adiciona campos para o Herdeiro 1
      if (quantidade >= 1) {
        baseSteps.push(
          {
            name: "nomeHerdeiro1",
            label: "Informe o nome completo do 1º herdeiro?",
            type: "text",
            required: true,
          },
          {
            name: "cpfHerdeiro1",
            label: "Informe o CPF do 1º herdeiro?",
            type: "cpf",
            required: true,
          },
          {
            name: "grauParentescoHerdeiro1",
            label: "Informe o grau de parentesco do 1º herdeiro?",
            type: "text",
            placeholder: "(Ex: Filho, Cônjuge, Irmão)",
            required: true,
          }
        );
      }

      // Adiciona campos para o Herdeiro 2
      if (quantidade >= 2) {
        baseSteps.push(
          {
            name: "nomeHerdeiro2",
            label: "Informe o nome completo do 2º herdeiro?",
            type: "text",
            required: true,
          },
          {
            name: "cpfHerdeiro2",
            label: "Informe o CPF do 2º herdeiro?",
            type: "cpf",
            required: true,
          },
          {
            name: "grauParentescoHerdeiro2",
            label: "Informe o grau de parentesco do 2º herdeiro?",
            type: "text",
            placeholder: "(Ex: Filho, Cônjuge, Irmão)",
            required: true,
          }
        );
      }

      // Adiciona campos para o Herdeiro 3
      if (quantidade >= 3) {
        baseSteps.push(
          {
            name: "nomeHerdeiro3",
            label: "Informe o nome completo do 3º herdeiro?",
            type: "text",
            required: true,
          },
          {
            name: "cpfHerdeiro3",
            label: "Informe o CPF do 3º herdeiro?",
            type: "cpf",
            required: true,
          },
          {
            name: "grauParentescoHerdeiro3",
            label: "Informe o grau de parentesco do 3º herdeiro?",
            type: "text",
            placeholder: "(Ex: Filho, Cônjuge, Irmão)",
            required: true,
          }
        );
      }
    }

    // Adiciona pergunta sobre depósito em conta de terceiro
    baseSteps.push({
      name: "desejaDepositoTerceiro",
      label: "Deseja que os rendimentos mensais sejam depositados em conta de terceiros?",
      type: "select",
      required: true,
      options: [
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
      ],
    });

    // Adiciona campos de terceiro se a resposta for "Sim"
    if (formData.desejaDepositoTerceiro === "Sim") {
      // Adiciona pergunta sobre tipo de pessoa
      baseSteps.push({
        name: "tipoTerceiro",
        label: "Informe se esta pessoa é física ou jurídica",
        type: "select",
        required: true,
        options: [
          { label: "CPF", value: "CPF" },
          { label: "CNPJ", value: "CNPJ" },
        ],
      });

      // Se escolheu CPF (Pessoa Física)
      if (formData.tipoTerceiro === "CPF") {
        baseSteps.push(
          {
            name: "cpfTerceiro",
            label: "Informe o CPF do terceiro?",
            type: "cpf",
            required: true,
          },
          {
            name: "nomeTerceiro",
            label: "Informe o nome completo do terceiro?",
            type: "text",
            required: true,
          },
          {
            name: "nomeBancoTerceiro",
            label: "Informe o nome do banco?",
            type: "text",
            placeholder: "(Ex: Banco do Brasil, Bradesco, Itaú)",
            required: true,
          },
          {
            name: "agenciaTerceiro",
            label: "Informe a agência?",
            type: "text",
            placeholder: "(Ex: 0001)",
            required: true,
          },
          {
            name: "contaTerceiro",
            label: "Informe o número da conta?",
            type: "text",
            placeholder: "(Ex: 12345-6)",
            required: true,
          },
          {
            name: "chavePixTerceiro",
            label: "Informe a chave PIX do terceiro?",
            type: "text",
            required: true,
          }
        );
      }

      // Se escolheu CNPJ (Pessoa Jurídica)
      if (formData.tipoTerceiro === "CNPJ") {
        baseSteps.push(
          {
            name: "cnpjTerceiro",
            label: "Informe o CNPJ do terceiro?",
            type: "cnpj",
            required: true,
          },
          {
            name: "nomeTerceiro",
            label: "Informe a razão social do terceiro?",
            type: "text",
            required: true,
          },
          {
            name: "nomeBancoTerceiro",
            label: "Informe o nome do banco?",
            type: "text",
            placeholder: "(Ex: Banco do Brasil, Bradesco, Itaú)",
            required: true,
          },
          {
            name: "agenciaTerceiro",
            label: "Informe a agência?",
            type: "text",
            placeholder: "(Ex: 0001)",
            required: true,
          },
          {
            name: "contaTerceiro",
            label: "Informe o número da conta?",
            type: "text",
            placeholder: "(Ex: 12345-6)",
            required: true,
          },
          {
            name: "chavePixTerceiro",
            label: "Informe a chave PIX do terceiro?",
            type: "text",
            required: true,
          }
        );
      }
    }

    // Adiciona o campo chave PIX do cliente no final
    if (formData.desejaDepositoTerceiro === "Não") {
      baseSteps.push({
        name: "chavePixCliente",
        label: "Qual é a sua chave PIX?",
        type: "text",
        required: true
      });
    }

    return baseSteps;
  }, [formData.desejaAdicionarHerdeiros, formData.quantidadeHerdeiros, formData.desejaDepositoTerceiro, formData.tipoTerceiro, formData.telefoneEhWhatsapp]);

  const currentStep = steps[step] ?? steps[steps.length - 1];

  useEffect(() => {
    if (step >= steps.length) {
      setStep(steps.length - 1);
    }
  }, [steps.length, step]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  // Desmarca o checkbox da LGPD se os campos PIX ficarem vazios
  useEffect(() => {
    const pixClienteVazio = !formData.chavePixCliente?.trim();
    const pixTerceiroVazio = !formData.chavePixTerceiro?.trim();

    // Se ambos os campos PIX estiverem vazios e o checkbox estiver marcado, desmarca
    if (pixClienteVazio && pixTerceiroVazio && formData.aceiteLGPD === "Sim") {
      setFormData((prev) => ({
        ...prev,
        aceiteLGPD: "",
      }));
    }
  }, [formData.chavePixCliente, formData.chavePixTerceiro, formData.aceiteLGPD]);

  if (submitStatus === "success") return <FormSuccess />;

  if (!currentStep) return null;

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

    if (currentStep.type === "cnpj") {
      // CNPJ precisa ter exatamente 14 dígitos e ser válido
      const numbers = stringValue.replace(/\D/g, "");
      if (numbers.length !== 14) return false;
      return validateCNPJ(stringValue);
    }

    if (currentStep.type === "rg") {
      const limpo = stringValue.trim();

      if (limpo.length < 5) return false;
      if (limpo.length > 14) return false;

      if (!/^[a-zA-Z0-9]+$/.test(limpo)) return false;

      if (/^([a-zA-Z0-9])\1+$/.test(limpo)) return false;

      return true;
    }


    if (currentStep.type === "cep") {
      // CEP precisa ter exatamente 8 dígitos
      const numbers = stringValue.replace(/\D/g, "");
      return numbers.length === 8;
    }

    if (currentStep.type === "address") {
      // Valida todos os campos obrigatórios de endereço
      const cepNumbers = (formData.cep || "").replace(/\D/g, "");
      const hasValidCep = cepNumbers.length === 8;
      const hasLogradouro = Boolean(formData.logradouro?.trim());
      const hasBairro = Boolean(formData.bairro?.trim());
      const hasCidade = Boolean(formData.cidade?.trim());
      const hasEstado = Boolean(formData.estado?.trim());

      return hasValidCep && hasLogradouro && hasBairro && hasCidade && hasEstado;
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

  // ================= UTILITÁRIOS DE FORMATAÇÃO =================

  const capitalize = (text = "") =>
    text
      .toString()
      .toLowerCase()
      .split(" ")
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");

  const cleanText = (text: any = "") =>
    text
      ?.toString()
      .trim()
      .replace(/\s+/g, " ") || "";

  const getFirstName = (fullName: string) => {
    const cleaned = cleanText(fullName);
    if (!cleaned) return "";
    return capitalize(cleaned.split(" ")[0]);
  };

  function buildHerdeiros(data: FormData) {
    const total = parseInt(data.quantidadeHerdeiros || "0");

    return Array.from({ length: total }).map((_, i) => {
      const n = i + 1;

      return {
        nome: capitalize(cleanText(data[`nomeHerdeiro${n}` as keyof FormData] as string)),
        cpf: data[`cpfHerdeiro${n}` as keyof FormData],
        parentesco: capitalize(cleanText(data[`grauParentescoHerdeiro${n}` as keyof FormData] as string)),
      };
    });
  }

  function preparePayload(data: FormData) {
    // Extrair o dia de dataInicioContrato (formato DD/MM/AAAA)
    const diaPagamento = data.dataInicioContrato ? data.dataInicioContrato.split("/")[0] : "";
    const anoAtual = new Date().getFullYear();

    // Formatar data no padrão DD/MM/YYYY HH:mm no timezone de São Paulo
    const now = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).replace(",", "");

    return {
      id: data.id,
      cliente: {
        nomeCompleto: capitalize(cleanText(data.nomeCompleto)),
        email: cleanText(data.email).toLowerCase(),
        telefone: data.telefone,
        numeroWhatsapp: data.telefoneEhWhatsapp === "Sim" ? data.telefone : (data.numeroWhatsapp || ""),
        telefoneEhWhatsapp: data.telefoneEhWhatsapp === "Sim",
        cpf: data.cpf,
        dataNascimento: data.dataNascimentoCliente,
      },

      endereco: {
        logradouro: capitalize(cleanText(data.logradouro)),
        numeroResidencia: data.numeroResidencia
          ? Number(data.numeroResidencia)
          : "",
        complemento: capitalize(cleanText(data.complemento || "")),
        bairro: capitalize(cleanText(data.bairro)),
        cep: data.cep,
        cidade: capitalize(cleanText(data.cidade)),
        estado: capitalize(cleanText(data.estado)),
      },

      investimento: {
        valorInvestimento: data.valorInvestimento,
        dataInicioContrato: data.dataInicioContrato,
        diaPagamento: diaPagamento,

        // ✅ REGRA OFICIAL DO CONTRATO
        chavePixCliente:
          data.chavePixCliente?.trim()
            ? cleanText(data.chavePixCliente)
            : "Não informada pelo Contratante",
      },
      dataCadastro: now,
      anoAtual: anoAtual,

      herdeiros:
        data.desejaAdicionarHerdeiros === "Sim"
          ? buildHerdeiros(data)
          : [],

      terceiro:
        data.desejaDepositoTerceiro === "Sim"
          ? {
            nome: capitalize(cleanText(data.nomeTerceiro)),
            documento: data.tipoTerceiro === "CNPJ" ? data.cnpjTerceiro : data.cpfTerceiro,

            banco: capitalize(cleanText(data.nomeBancoTerceiro)),
            agencia: cleanText(data.agenciaTerceiro),
            conta: cleanText(data.contaTerceiro),

            // ✅ regra jurídica correta
            chavePix:
              data.chavePixTerceiro?.trim()
                ? cleanText(data.chavePixTerceiro)
                : "Não informada",
          }
          : null,

      meta: {
        desejaHerdeiros: data.desejaAdicionarHerdeiros,
        depositoTerceiro: data.desejaDepositoTerceiro,
        aceiteLGPD: data.aceiteLGPD === "Sim",
      },
    };
  }

  function formatDateToISO(dateStr: string) {
    // espera DD/MM/YYYY
    const [day, month, year] = dateStr.split("/");
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  // Para BR remove o +55, para outros países mantém o formato internacional
  function stripDialCode(phone: string): string {
    const brMatch = phone.match(/^\+55\s?(.*)/);
    if (brMatch) return brMatch[1];
    return phone.replace(/^\+/, "");
  }

  function flattenPayload(payload: ReturnType<typeof preparePayload>) {

    const flat: Record<string, any> = {
      id: payload.id,
      cliente_nomeCompleto: payload.cliente.nomeCompleto || "",
      cliente_email: payload.cliente.email || "",
      cliente_telefone: stripDialCode(payload.cliente.telefone || ""),
      cliente_numeroWhatsapp: stripDialCode(payload.cliente.numeroWhatsapp || "").replace(/\D/g, ""),
      numero_internacional: (payload.cliente.telefone || "").startsWith("+55") ? false : true,
      cliente_cpf: payload.cliente.cpf || "",
      cliente_dataNascimento: formatDateToISO(payload.cliente.dataNascimento || ""),

      logradouro: payload.endereco.logradouro || "",
      numero_residencia: String(payload.endereco.numeroResidencia || "s/n"),
      complemento: payload.endereco.complemento || "",
      bairro: payload.endereco.bairro || "",
      cep: payload.endereco.cep || "",
      cidade: payload.endereco.cidade || "",
      estado: payload.endereco.estado || "",

      valor_investimento: payload.investimento.valorInvestimento || "",
      data_inicio_contrato: formatDateToISO(payload.investimento.dataInicioContrato || ""),
      dia_pagamento: Number(payload.investimento.diaPagamento || 0),
      cliente_chavePix: payload.investimento.chavePixCliente || "",

      meta_desejaHerdeiros: payload.meta.desejaHerdeiros === "Sim",
      meta_depositoTerceiro: payload.meta.depositoTerceiro === "Sim",
      aceite_lgpd: payload.meta.aceiteLGPD,

      token_forms: token || "",
    };

    // Herdeiros (até 3)
    payload.herdeiros.forEach((h, i) => {
      const idx = i + 1;
      flat[`herdeiro${idx}_nome`] = h.nome || "";
      flat[`herdeiro${idx}_cpf`] = h.cpf || "";
      flat[`herdeiro${idx}_parentesco`] = h.parentesco || "";
    });

    // Preencher colunas vazias se tiver menos de 3 herdeiros
    for (let i = payload.herdeiros.length + 1; i <= 3; i++) {
      flat[`herdeiro${i}_nome`] = "";
      flat[`herdeiro${i}_cpf`] = "";
      flat[`herdeiro${i}_parentesco`] = "";
    }

    // Terceiro
    if (payload.terceiro) {
      flat["terceiro_nome"] = payload.terceiro.nome || "";
      flat["terceiro_cpf"] = payload.terceiro.documento || "";
      flat["terceiro_banco"] = payload.terceiro.banco || "";
      flat["terceiro_agencia"] = payload.terceiro.agencia || "";
      flat["terceiro_conta"] = payload.terceiro.conta || "";
      flat["terceiro_chavePix"] = payload.terceiro.chavePix || "";
    } else {
      flat["terceiro_nome"] = "";
      flat["terceiro_cpf"] = "";
      flat["terceiro_banco"] = "";
      flat["terceiro_agencia"] = "";
      flat["terceiro_conta"] = "";
      flat["terceiro_chavePix"] = "";
    }

    return flat;
  }
  // ================= FIM UTILITÁRIOS DE FORMATAÇÃO =================


  function handleNext() {
    if (!canProceed()) return;
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    // Limpa o valor do campo atual antes de voltar
    const updatedData: Partial<FormData> = {
      [currentStep.name]: "",
    };

    // Se o campo atual for de endereço (cep ou address), limpa todos os campos relacionados
    if (currentStep.type === "cep" || currentStep.type === "address") {
      updatedData.cep = "";
      updatedData.logradouro = "";
      updatedData.numeroResidencia = "";
      updatedData.complemento = "";
      updatedData.bairro = "";
      updatedData.cidade = "";
      updatedData.estado = "";
      setLogradouroFromAPI(false);
      setBairroFromAPI(false);
    }

    setFormData((prev) => ({
      ...prev,
      ...updatedData,
    }));
    setStep((prev) => Math.max(0, prev - 1));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = preparePayload(formData);
      const flatPayload = flattenPayload(payload);

      if (process.env.NODE_ENV !== "production") {
        console.log("Payload:", flatPayload);
      }

      // ========== MOCK - REMOVER DEPOIS ==========
      // Simula envio bem-sucedido sem chamar a API

      // await new Promise(resolve => setTimeout(resolve, 1500));
      // setSubmitStatus("success");
      // removeToken(token);
      // return;
      // ========== FIM MOCK ==========

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flatPayload),
      });

      if (!res.ok) {
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");

      // Invalida o token após envio bem-sucedido
      removeToken(token);
    } catch (err) {
      console.error(err);
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
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>

      {/* Renderiza apenas o step atual */}
      <div className="relative min-h-[280px]">
        <div className="space-y-5">
          <h2 className="typography-title text-2xl text-brand-text-light leading-tight">
            {currentStep?.label || ""}
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
              autoComplete={currentStep.name === "nomeCompleto" ? "name" : undefined}
              disabled={currentStep.disabled}
            />
          )}

          {currentStep.type === "number" && (
            <NumberInput
              ref={inputRef as any}
              value={
                typeof formData[currentStep.name] === "string"
                  ? formData[currentStep.name] as string
                  : ""
              }
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
              className="w-full rounded-lg bg-brand-dark-bg-primary border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 transition-all resize-none"
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

          {currentStep.type === "cnpj" && (
            <CNPJInput
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

          {/* {currentStep.type === "rg" && (
            <RGInput
              ref={inputRef as any}
              value={
                typeof formData[currentStep.name] === "string"
                  ? (formData[currentStep.name] as string)
                  : ""
              }
              onChange={(value) => handleChange(currentStep.name, value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canProceed()) {
                  e.preventDefault();
                  handleNext();
                }
              }}
              placeholder={currentStep.placeholder}
            />
          )} */}


          {currentStep.type === "cep" && (
            <CEPInput
              ref={inputRef as any}
              value={
                typeof formData[currentStep.name] === "string"
                  ? (formData[currentStep.name] as string)
                  : ""
              }
              onChange={async (value) => {
                handleChange(currentStep.name, value);

                const cepLimpo = CepService.normalize(value);

                if (cepLimpo.length === 8) {
                  const address = await CepService.lookup(cepLimpo);

                  if (address) {
                    setLogradouroFromAPI(Boolean(address.logradouro?.trim()));
                    setBairroFromAPI(Boolean(address.bairro?.trim()));
                    setFormData((prev) => ({
                      ...prev,
                      cep: value,
                      logradouro: address.logradouro || prev.logradouro,
                      bairro: address.bairro || prev.bairro,
                      cidade: address.cidade || prev.cidade,
                      estado: address.estado || prev.estado,
                    }));
                  }
                } else if (cepLimpo.length === 0) {
                  // Limpa os campos quando o CEP é removido
                  setLogradouroFromAPI(false);
                  setBairroFromAPI(false);
                  setFormData((prev) => ({
                    ...prev,
                    cep: value,
                    logradouro: "",
                    numeroResidencia: "",
                    complemento: "",
                    bairro: "",
                    cidade: "",
                    estado: "",
                  }));
                }
              }}
              placeholder={currentStep.placeholder}
            />
          )}

          {currentStep.type === "address" && (
            <div className="space-y-4">
              {/* CEP */}
              <div>
                <label className="block text-sm text-brand-text-light/70 mb-2 typography-helvetica">
                  CEP *
                </label>
                <CEPInput
                  value={formData.cep || ""}
                  onChange={async (value) => {
                    handleChange("cep", value);
                    setCepError(""); // Limpa erro ao digitar

                    const cepLimpo = CepService.normalize(value);

                    if (cepLimpo.length === 8) {
                      const address = await CepService.lookup(cepLimpo);

                      if (address) {
                        setLogradouroFromAPI(Boolean(address.logradouro?.trim()));
                        setBairroFromAPI(Boolean(address.bairro?.trim()));
                        setFormData((prev) => ({
                          ...prev,
                          cep: value,
                          logradouro: address.logradouro || prev.logradouro,
                          bairro: address.bairro || prev.bairro,
                          cidade: address.cidade || prev.cidade,
                          estado: address.estado || prev.estado,
                        }));
                      } else {
                        // CEP não encontrado
                        setCepError("CEP não encontrado. Verifique o número digitado.");
                      }
                    } else if (cepLimpo.length === 0) {
                      // Limpa os campos quando o CEP é removido
                      setLogradouroFromAPI(false);
                      setBairroFromAPI(false);
                      setFormData((prev) => ({
                        ...prev,
                        cep: value,
                        logradouro: "",
                        numeroResidencia: "",
                        complemento: "",
                        bairro: "",
                        cidade: "",
                        estado: "",
                      }));
                    }
                  }}
                  placeholder="00000-000"
                />
                {cepError && (
                  <p className="mt-2 text-sm text-red-600 typography-helvetica">
                    {cepError}
                  </p>
                )}
              </div>

              {/* Logradouro */}
              <div>
                <label className="block text-sm text-brand-text-light/70 mb-2 typography-helvetica">
                  Logradouro *
                </label>
                <TextInput
                  type="text"
                  value={formData.logradouro || ""}
                  onChange={(value) => handleChange("logradouro", value)}
                  placeholder="Rua, Avenida, etc."
                  disabled={logradouroFromAPI}
                />
              </div>

              {/* Número e Complemento na mesma linha */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-brand-text-light/70 mb-2 typography-helvetica">
                    Número
                  </label>
                  <NumberInput
                    value={formData.numeroResidencia || ""}
                    onChange={(value) => handleChange("numeroResidencia", value)}
                    placeholder="123"
                  />
                </div>
                <div>
                  <label className="block text-sm text-brand-text-light/70 mb-2 typography-helvetica">
                    Complemento
                  </label>
                  <TextInput
                    type="text"
                    value={formData.complemento || ""}
                    onChange={(value) => handleChange("complemento", value)}
                    placeholder="Apto, Bloco, etc."
                    className="w-full rounded-lg bg-brand-golden-light border border-brand-brown/30 px-4 py-3 typography-helvetica text-brand-text-light placeholder:text-brand-text-light/40 focus:outline-none focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Bairro */}
              <div>
                <label className="block text-sm text-brand-text-light/70 mb-2 typography-helvetica">
                  Bairro *
                </label>
                <TextInput
                  type="text"
                  value={formData.bairro || ""}
                  onChange={(value) => handleChange("bairro", value)}
                  placeholder="Bairro"
                  disabled={bairroFromAPI}
                />
              </div>

              {/* Cidade e Estado na mesma linha */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-brand-text-light/70 mb-2 typography-helvetica">
                    Cidade *
                  </label>
                  <TextInput
                    type="text"
                    value={formData.cidade || ""}
                    onChange={(value) => handleChange("cidade", value)}
                    placeholder="Cidade"
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="block text-sm text-brand-text-light/70 mb-2 typography-helvetica">
                    Estado *
                  </label>
                  <TextInput
                    type="text"
                    value={formData.estado || ""}
                    onChange={(value) => handleChange("estado", value)}
                    placeholder="Estado"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
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
                      ? "border-brand-brown bg-brand-brown/20 text-brand-text-light"
                      : "border-brand-brown/30 bg-brand-dark-bg-primary text-brand-text-light hover:border-brand-brown/50"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Checkbox de aceite LGPD - aparece apenas na última tela e se o campo PIX estiver preenchido */}
      {step === steps.length - 1 && (
        (currentStep.name === "chavePixCliente" && formData.chavePixCliente?.trim()) ||
        (currentStep.name === "chavePixTerceiro" && formData.chavePixTerceiro?.trim())
      ) && (
        <div className="mb-2 px-2 py-3 border border-brand-brown/30 rounded-lg bg-brand-dark-bg-primary">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.aceiteLGPD === "Sim"}
              onChange={(e) => handleChange("aceiteLGPD", e.target.checked ? "Sim" : "Não")}
              className="mt-1 w-5 h-5 rounded border-brand-text-light/30 bg-brand-dark-bg-chumbo focus:ring-2 focus:ring-brand-text-light/20 cursor-pointer accent-brand-golden"
            />
            <span className="typography-helvetica text-sm text-brand-text-light/80 group-hover:text-brand-text-light transition-colors">
              Li e concordo com os termos de uso e autorizo a Veritus Capital Holding a utilizar meus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD).
            </span>
          </label>
        </div>
      )}

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
            disabled={isSubmitting || formData.aceiteLGPD !== "Sim"}
            tabIndex={0}
            className="bg-brand-brown text-brand-light h-[45px] px-8 rounded-[28px] typography-helvetica-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        )}
      </div>

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
