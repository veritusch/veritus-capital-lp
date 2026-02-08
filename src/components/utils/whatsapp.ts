// src/utils/whatsapp.ts

type WhatsAppPhone = string;

export function normalizeWhatsAppPhone(phone: WhatsAppPhone) {
    // Mantém só números (remove +, espaços, hífen, parênteses)
    return phone.replace(/\D/g, "");
}

export function buildWhatsAppLink(phone: WhatsAppPhone, message: string) {
    const normalizedPhone = normalizeWhatsAppPhone(phone);
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
}
