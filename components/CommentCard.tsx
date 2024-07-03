import { formatDate } from '@/lib/utils';
import React from 'react'

interface CommentCardProps {
  comment: {
    id: string;
    text: string;
    createdAt: Date;
    userId: string;
  }
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className='flex flex-col gap-2 border border-zinc-950  rounded-md p-6 hover:opacity-80 transition duration-200 flex-1 break-inside-avoid  bg-clip-padding backdrop-blur-lg backdrop-filter max-w-xs w-full h-fit'>
      <p>
        {comment.text}
      </p>
      <div>
        <p className='text-sm text-zinc-500'>
          {formatDate(comment.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default CommentCard;