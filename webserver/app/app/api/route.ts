//@ts-ignore
import { NextResponse, NextRequest } from 'next/server'
//@ts-ignore
const target: string = process.env.API_ENDPOINT;

export async function POST(request: NextRequest) {
    const res = await fetch(`target`, {
        cache: "no-store",
    });
    const ans = await res.json();
    return new Response(ans.answer)
}
