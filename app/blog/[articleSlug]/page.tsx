import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

const ArticlePage = async ({ params }: { params: { articleSlug: string } }) => {

    const article = await db.article.findUnique({ 
        where: { slug: params.articleSlug }, // This is the slug from the URL
        include: {
            tags: {
                include: {
                    tag: true,
                }
            },
        },
     })

    if (!article) {
        return <p>Article not found</p>;
    }
    
    
    return (
        <div className='max-w-4xl w-full flex flex-col gap-8'>
            <Link href={"/blog"} className='text-sm text-zinc-400  bg-zinc-950 w-max px-2 py-1 rounded-full hover:opacity-60 duration-200 transition'>
                Back
                
            </Link>
            <div>
                <h1 className='text-3xl font-bold flex items-center gap-4'>
                    {article.title}
                    <div className='flex items-center gap-2'>
                        {article.tags.map((tagArticle) => (
                            <span key={tagArticle.tag.id} className='text-sm text-zinc-400  bg-zinc-950 w-max px-2 py-1 rounded-full'>
                                {tagArticle.tag.name}
                            </span>
                        ))}
                    </div>
                </h1>
                <p className='text-sm text-zinc-500'>
                    {formatDate(article.createdAt)}
                </p>
            </div>
            <p>
                {article.text}
            </p>

        </div>
    )
}

export default ArticlePage;