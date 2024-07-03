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
        <div className='max-w-4xl w-full flex flex-col gap-8 '>
            <h1 className='font-bold text-3xl'>
                Blog
            </h1>

            <div className='space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-2'>
                {articles.map((article) => (
                    <Link href={`/blog/${article.slug}`} key={article.id} className='flex flex-col gap-2 border border-zinc-950  rounded-md p-6 hover:-translate-y-1 transition duration-200'>
                        <div>
                            <h2 className='text-2xl font-semibold'>
                                {article.title}
                            </h2>
                            <p className='text-sm text-zinc-500'>
                                {formatDate(article.createdAt)}
                            </p>
                        </div>
                        <p>
                            {article.text}
                        </p>
                        <div className='flex gap-2'>
                            {article.tags.map((tagArticle) => (
                                <span key={tagArticle.tag.id} className='text-sm text-zinc-400  bg-zinc-950 w-max px-2 py-1 rounded-full'>
                                    {tagArticle.tag.name}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BlogPage;