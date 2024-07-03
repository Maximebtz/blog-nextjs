import ArticleCard from '@/components/ArticleCard';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

const BlogPage = async () => {

    const articles = await db.article.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        include: {
            tags: {
                include: {
                    tag: true,
                }
            },
        },
    });

    if (!articles || articles.length === 0) {
        return <p>Articles not found</p>;
    }

    return (
        <div className='max-w-7xl w-full flex flex-col gap-8 '>
            <h1 className='font-bold text-3xl'>
                Blog
            </h1>

            <div className='space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    )
}

export default BlogPage;