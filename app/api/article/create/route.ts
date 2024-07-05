import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, text, tagIds, slug } = await request.json();

        console.log('Creating article:', { title, text, tagIds, slug });

        if (!Array.isArray(tagIds)) {
            throw new Error('tagIds is not defined or not an array');
        }

        const tags = await db.tag.findMany({
            where: {
                id: {
                    in: tagIds,
                },
            },
        });

        const article = await db.article.create({
            data: {
                title,
                slug,
                text,
                tags: {
                    create: tagIds.map((tagId: string) => ({
                        tag: { connect: { id: tagId } }
                    }))
                },
            },
        });

        console.log('Article created:', article);

        return NextResponse.json(article);

    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
