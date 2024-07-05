import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const articleId = params.id;

        // Vérifier si l'article existe
        const article = await db.article.findUnique({
            where: { id: articleId },
        });

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        // Supprimer les relations avec les tags
        await db.tagArticle.deleteMany({
            where: { articleId },
        });

        // Supprimer les commentaires associés
        await db.comment.deleteMany({
            where: { articleId },
        });

        // Supprimer l'article
        await db.article.delete({
            where: { id: articleId },
        });

        return NextResponse.json({ message: 'Article deleted successfully' });

    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}