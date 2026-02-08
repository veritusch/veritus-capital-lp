// src/components/ui/WhatsAppButton.tsx

import React from "react";
import { buildWhatsAppLink } from "@/src/components/utils/whatsapp";

type WhatsAppButtonProps = {
    phone: string;
    message: string;
    label: string;
    className?: string;
    target?: "_blank" | "_self";
};

export function WhatsAppButton({
    phone,
    message,
    label,
    className = "",
    target = "_blank",
}: WhatsAppButtonProps) {
    return (
        <a
            href={buildWhatsAppLink(phone, message)}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={className}
        >
            {label}
        </a>
    );
}
