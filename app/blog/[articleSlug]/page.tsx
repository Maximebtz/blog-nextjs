import BackButton from '@/components/BackButton';
import CommentCard from '@/components/CommentCard';
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
            comments: true
        },

     })

    if (!article) {
        return <p>Article not found</p>;
    } 
    
    
    return (
        <div className='max-w-4xl w-full flex flex-col gap-8'>
            <BackButton href="/blog" label="Back"  />
            <div>
                <h1 className='text-3xl font-bold flex items-center gap-4'>
                    {article.title}
                    <div className='flex items-center gap-2'>
                        {article.tags.map((tagArticle) => (
                            <span key={tagArticle.tag.id} className='text-sm text-white  bg-zinc-950 w-max px-3 py-1 rounded-full'>
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
            <div className=''>
                <h3 className='font-semibold text-xl'>
                    Commentaires <span>({article.comments.length})</span>
                </h3>
                <div className='space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>   
                    {article.comments.map((comment) => (    
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ArticlePage;