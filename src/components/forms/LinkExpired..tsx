import Image from "next/image"
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { InstagramIcon24 } from "@/src/components/ui/InstagramButton";

const WHATSAPP_PHONE = "5581973197996";
const EXPIRED_LINK_MESSAGE =
    "Olá! Meu link de acesso ao formulário de cadastro expirou. Solicito um novo link.";

export default function LinkExpired() {
    return (
        <div className="relative min-h-screen bg-brand-dark-bg-secondary p-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Montanha de fundo */}
            <div className="absolute bottom-0 left-0 right-0 z-0 w-full h-[350px] sm:h-[450px] md:h-auto">
                <Image
                    src="/montanha.svg"
                    alt=""
                    width={1920}
                    height={400}
                    className="w-full h-full object-contain object-bottom md:h-auto"
                    priority
                />
            </div>

            <div className="relative z-10 mx-auto max-w-xl w-full px-4 text-center">
                {/* Logo */}
                <div className="flex justify-center mb-24">
                    <Image
                        src="/logo_veritus_branca.svg"
                        alt="Veritus"
                        width={240}
                        height={60}
                        style={{ width: "auto", height: "auto" }}
                        priority
                    />
                </div>

                {/* Título */}
                <h1 className="typography-title text-4xl text-brand-text-light mb-6">
                    Link Expirado!
                </h1>

                {/* Descrição */}
                <p className="typography-helvetica text-brand-golden mb-14">
                    Entre em contato conosco e solicite outro.
                </p>

                {/* Botão de ação */}
                <div className="flex justify-center">
                    <WhatsAppButton
                        phone={WHATSAPP_PHONE}
                        message={EXPIRED_LINK_MESSAGE}
                        label="Solicitar outro link"
                        className="border border-brand-brown/30 text-brand-text-light h-[45px] px-8 rounded-[28px] typography-helvetica-bold transition-all flex items-center justify-center hover:bg-brand-golden hover:text-brand-dark-bg-secondary hover:border-brand-golden"
                    />
                </div>
            </div>

            {/* Ícone do Instagram */}
            <div className="relative z-10 mt-16">
                <InstagramIcon24 />
            </div>
        </div>
    )
}
