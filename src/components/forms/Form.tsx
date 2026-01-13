"use client";

import { useState } from "react";

interface FormProps {
  token: string;
}

export default function Form({ token }: FormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    valorInvestimento: "",
    perfilInvestidor: "",
    observacoes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Aqui você implementaria a lógica de envio
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Dados enviados:", { ...formData, token });
      setSubmitStatus("success");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        valorInvestimento: "",
        perfilInvestidor: "",
        observacoes: "",
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-brand-text-primary mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text-primary mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-brand-text-primary mb-2">
            Telefone *
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="valorInvestimento" className="block text-sm font-medium text-brand-text-primary mb-2">
            Valor de Investimento Pretendido *
          </label>
          <input
            type="text"
            id="valorInvestimento"
            name="valorInvestimento"
            value={formData.valorInvestimento}
            onChange={handleChange}
            required
            placeholder="Ex: R$ 100.000,00"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="perfilInvestidor" className="block text-sm font-medium text-brand-text-primary mb-2">
            Perfil de Investidor *
          </label>
          <select
            id="perfilInvestidor"
            name="perfilInvestidor"
            value={formData.perfilInvestidor}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
          >
            <option value="">Selecione...</option>
            <option value="conservador">Conservador</option>
            <option value="moderado">Moderado</option>
            <option value="arrojado">Arrojado</option>
          </select>
        </div>

        <div>
          <label htmlFor="observacoes" className="block text-sm font-medium text-brand-text-primary mb-2">
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-brown focus:border-transparent"
          />
        </div>

        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
            Formulário enviado com sucesso!
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
            Erro ao enviar formulário. Tente novamente.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-brown text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar Formulário"}
        </button>
      </div>
    </form>
  );
}