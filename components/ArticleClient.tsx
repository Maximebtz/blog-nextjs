'use client';

import React from 'react';
import { useClientRouter } from '@/hooks/useClientRouter';
import BackButton from '@/components/BackButton';
import CommentCard from '@/components/CommentCard';
import { formatDate } from '@/lib/utils';

const ArticleClient = ({ article }: { article: any }) => {
    const { push, refresh } = useClientRouter();

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this article?')) {
            const res = await fetch(`/api/article/${article.id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                refresh();
                push('/blog');
            } else {
                alert('Failed to delete the article');
            }
        }
    };

    return (
        <div className='max-w-7xl w-full flex flex-col gap-8 mt-16'>
            <div className='flex w-full justify-between'>
                <BackButton href="/blog" label="Back" />
                <button onClick={handleDelete} className="bg-red-500 inline-flex justify-center items-center w-max px-4 py-2 rounded-full gap-2 border text-white font-bold transition duration-200 ease-in-out cursor-pointer hover:opacity-80">
                    Delete Article
                </button>
            </div>
            <div>
                <h1 className='text-3xl font-bold flex justify-between items-center gap-4'>
                    {article.title}
                    <div className='flex flex-wrap items-center gap-2 max-w-xs justify-end'>
                        {article.tags.map((tagArticle: any) => (
                            <span key={tagArticle.tag.id} className='text-sm text-white bg-zinc-950 w-max px-3 py-1 rounded-full'>
                                {tagArticle.tag.name}
                            </span>
                        ))}
                    </div>
                </h1>
                <p className='text-sm text-zinc-500'>
                    {formatDate(article.createdAt)}
                </p>
            </div>
            <p>{article.text}</p>
            <div className=''>
                <h3 className='font-semibold text-xl'>
                    Commentaires <span>({article.comments.length})</span>
                </h3>
                <div className='space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
                    {article.comments.map((comment: any) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default ArticleClient;