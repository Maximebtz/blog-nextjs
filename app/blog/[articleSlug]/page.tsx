import { db } from '@/lib/db';
import ArticleClient from '@/components/ArticleClient';

const ArticlePage = async ({ params }: { params: { articleSlug: string } }) => {
    const article = await db.article.findUnique({
        where: { slug: params.articleSlug }, // This is the slug from the URL
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
            comments: true,
        },
    });

    if (!article) {
        return <p>Article not found</p>;
    }

    return <ArticleClient article={article} />;
};

export default ArticlePage;