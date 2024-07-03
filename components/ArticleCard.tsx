import React from 'react'
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Article } from '@prisma/client';

interface ArticleCardProps {
  article: Article & {
    tags: {
      tag: {
        id: string;
        name: string;
      }
    }[]
  }
}

// interface ArticleCardProps {
//   article: any
// }

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link href={`/blog/${article.slug}`} key={article.id} className='flex flex-col gap-2 border border-zinc-950  rounded-md p-6 hover:-translate-y-1 transition duration-200 flex-1 break-inside-avoid  bg-clip-padding backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit'>
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
      <div className='flex gap-2 flex-wrap'>
        {article.tags.map((tagArticle) => (
          <span key={tagArticle.tag.id} className='text-sm text-white  bg-zinc-950 w-max px-2 py-1 rounded-full'>
            {tagArticle.tag.name}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default ArticleCard;
