// app/api/lead/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const webhookUrl = process.env.MAKE_WEBHOOK_URL;
        if (!webhookUrl) {
            return NextResponse.json({ error: "MAKE_WEBHOOK_URL not configured" }, { status: 500 });
        }

        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return NextResponse.json({ error: "Invalid content-type" }, { status: 400 });
        }

        const body = await req.json();

        const payloadStr = JSON.stringify(body);
        if (payloadStr.length > 50_000) {
            return NextResponse.json({ error: "Payload too large" }, { status: 413 });
        }

        const requestId = crypto.randomUUID();

        // dispara para o Make sem bloquear a resposta do usuário
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Request-Id": requestId, // ajuda a rastrear no Make (se você mapear)
            },
            body: payloadStr,
        }).catch((err) => {
            // opcional: log estruturado (Vercel captura console)
            console.error("MAKE_WEBHOOK_ERROR", { requestId, message: err?.message });
        });

        // responde rápido: "recebido"
        return NextResponse.json({ ok: true, requestId }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
}
