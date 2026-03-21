import Image from "next/image";
import { InstagramButton, InstagramIcon24 } from "@/src/components/ui/InstagramButton";

export default function Maintenance() {
    return (
        <div className="relative min-h-screen bg-brand-dark-bg-secondary p-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Background mountain */}
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

                {/* Title */}
                <h1 className="typography-title text-4xl text-brand-text-light mb-6">
                    Algo maior se aproxima.
                </h1>

                {/* Description */}
                <p className="typography-helvetica text-brand-golden mb-14">
                    O próximo capítulo está sendo escrito. Em breve, aqui.
                </p>

                <InstagramButton />
            </div>
        </div>
    );
}
