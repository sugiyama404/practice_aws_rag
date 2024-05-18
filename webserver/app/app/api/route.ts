//@ts-ignore
import { NextResponse, NextRequest } from 'next/server'
//@ts-ignore
const target: string = process.env.API_ENDPOINT;

export async function POST(request: NextRequest) {
    console.log("call me");
    const query = await request.json();
    console.log(query.user_query);
    const res = await fetch(target, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user_query": query.user_query }),
    });

    const ans = await res.json();
    return NextResponse.json(ans);
}
