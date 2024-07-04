import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

export async function POST(request: NextRequest) {
    try {
        const { title, text, tags } = await request.json();

        console.log('Request data:', { title, text, tags });

        if (!title || !tags) {
            console.log('Missing required fields:', { title, text, tags });
            return NextResponse.json({ error: 'Title and tags are required' }, { status: 400 });
        }

        const slug = generateSlug(title);

        const newArticle = await db.article.create({
            data: {
                title,
                slug,
                text,
                tags: {
                    create: tags.map((tag: string) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tag },
                                create: { name: tag }
                            }
                        }
                    }))
                }
            }
        });

        return NextResponse.json(newArticle);

    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}