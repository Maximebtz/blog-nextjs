import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {
        const tags = await db.tag.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        return NextResponse.json(tags);

    } catch (error) {
        console.log(error);
    }
}