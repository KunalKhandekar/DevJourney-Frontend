/**
 * Node modules
 */
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router';

/**
 * Components
 */
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Avatar from 'react-avatar';

/**
 * Assets
 */
import { SquareArrowOutUpRightIcon } from 'lucide-react';

/**
 * Types
 */
import type { Blog } from '@/types';
type Props = {
  content: string;
  user: { _id: string; username: string } | null;
  blog: { _id: string; title: string; slug: string; banner: Blog['banner'] };
  createdAt: string;
};

export const CommentCard = ({ content, user, blog, createdAt }: Props) => {
  return (
    <div className='@container'>
      <div className='group flex flex-col items-start gap-4 p-4 rounded-xl hover:bg-accent/25 @md:flex-row'>
        <Avatar
          name={user?.username}
          size='40'
          round
        />

        <div className='flex flex-col gap-2 me-auto'>
          <div className='flex items-center gap-2'>
            {user ? (
              <div className='text-sm text-muted-foreground'>
                @{user.username}
              </div>
            ) : (
              <div className='text-sm text-destructive/80 italic'>
                <Tooltip delayDuration={250}>
                  <TooltipTrigger>Account Deleted</TooltipTrigger>

                  <TooltipContent>This account has been removed</TooltipContent>
                </Tooltip>
              </div>
            )}

            <div className='size-1 rounded-full bg-muted-foreground/50 '></div>
            <div className='text-sm text-muted-foreground'>
              <Tooltip delayDuration={250}>
                <TooltipTrigger>
                  {formatDistanceToNowStrict(createdAt, {
                    addSuffix: true,
                  })}
                </TooltipTrigger>

                <TooltipContent>
                  {new Date(createdAt).toLocaleString('en-US', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='max-w-[60ch]'>{content}</div>

            {blog && (
              <div className='flex items-start gap-3'>
                <div className='max-w-80 grid grid-cols-[120px_minmax(200px,1fr)] gap-3'>
                  <AspectRatio
                    ratio={21 / 9}
                    className='rounded-lg overflow-hidden'
                  >
                    <img
                      src={blog.banner.url}
                      width={blog.banner.width}
                      height={blog.banner.height}
                      alt={blog.title}
                    />
                  </AspectRatio>

                  <div className='line-clamp-3 max-w-[30ch] text-sm text-muted-foreground my-1'>
                    {blog.title}
                  </div>
                </div>

                <Button
                  variant='ghost'
                  asChild
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <SquareArrowOutUpRightIcon />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
