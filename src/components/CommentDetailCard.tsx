/**
 * Node modules
 */
import { formatDistanceToNowStrict } from 'date-fns';

/**
 * Components
 */
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Avatar from 'react-avatar';

/**
 * Types
 */
type Props = {
  content: string;
  user: {
    username: string;
  };
  createdAt: string;
};

export const CommentDetailCard = ({ content, user, createdAt }: Props) => {
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

          <div className='max-w-[60ch]'>{content}</div>
        </div>
      </div>
    </div>
  );
};
