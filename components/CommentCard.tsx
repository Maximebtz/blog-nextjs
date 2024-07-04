import { formatDate } from '@/lib/utils';

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
    <div className='flex flex-col gap-2 shadow-md hover:shadow-lg border border-zinc-950  rounded-md p-6 hover:opacity-80 transition duration-200 flex-1 break-inside-avoid  bg-clip-padding backdrop-blur-lg backdrop-filter w-full h-fit'>
      <span className='font-semibold'>
        User : {comment.userId}
      </span>
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