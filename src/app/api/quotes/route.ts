import { getQuotes } from "@/src/services/quotes";

export async function GET() {
    try {
        const quotes = await getQuotes();
        return Response.json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return Response.json(
            { error: 'Failed to fetch quotes', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
