import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

// Inicializa Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID || ""
);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ error: "Payload vazio" }, { status: 400 });
        }

        // Cria registro no Airtable
        const createdRecords = await base(process.env.AIRTABLE_TABLE_ID || "")
            .create([
                {
                    fields: body, // seu JSON do form já formatado
                },
            ]);

        return NextResponse.json({
            success: true,
            records: createdRecords,
        });
    } catch (error: any) {
        console.error("Erro Airtable:", error);
        return NextResponse.json(
            { success: false, error: error.message || error },
            { status: 500 }
        );
    }
}
