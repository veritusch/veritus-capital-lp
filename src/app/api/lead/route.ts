// app/api/lead/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const requestId = crypto.randomUUID();
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
        return NextResponse.json(
            { ok: false, error: "MAKE_WEBHOOK_URL_NOT_CONFIGURED", requestId },
            { status: 500 }
        );
    }

    let body: any;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json(
            { ok: false, error: "INVALID_JSON_BODY", requestId },
            { status: 400 }
        );
    }

    const payloadStr = JSON.stringify(body);
    if (payloadStr.length > 50_000) {
        return NextResponse.json(
            { ok: false, error: "PAYLOAD_TOO_LARGE", requestId },
            { status: 413 }
        );
    }

    // Logs mínimos (LGPD-safe)
    console.log("LEAD_REQUEST_RECEIVED", {
        requestId,
        payloadSize: payloadStr.length,
        origin: req.headers.get("origin"),
        userAgent: req.headers.get("user-agent"),
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Request-Id": requestId,
            },
            body: payloadStr,
            signal: controller.signal,
        });

        const respText = await response.text().catch(() => "");

        if (!response.ok) {
            const snippet = respText.slice(0, 400);
            console.error("MAKE_WEBHOOK_FAILED", {
                requestId,
                status: response.status,
                statusText: response.statusText,
                bodySnippet: snippet,
            });

            return NextResponse.json(
                {
                    ok: false,
                    error: "MAKE_WEBHOOK_FAILED",
                    requestId,
                    makeStatus: response.status,
                    makeBodySnippet: snippet,
                },
                { status: 502 }
            );
        }

        console.log("MAKE_WEBHOOK_SUCCESS", { requestId, status: response.status });

        return NextResponse.json({ ok: true, requestId }, { status: 200 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("MAKE_WEBHOOK_ERROR", { requestId, message });

        return NextResponse.json(
            { ok: false, error: "MAKE_WEBHOOK_NETWORK_ERROR", requestId, message },
            { status: 502 }
        );
    } finally {
        clearTimeout(timeout);
    }
}
