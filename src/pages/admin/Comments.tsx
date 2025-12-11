/**
 * Node modules
 */
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

/**
 * Components
 */
import { CommentCard } from '@/components/CommentCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

/**
 * Assets
 */
import { Loader2Icon } from 'lucide-react';

/**
 * Types
 */
import type { Comment, PaginatedResponse } from '@/types';

export const Comments = () => {
  const fetcher = useFetcher();
  const loaderData = useLoaderData() as PaginatedResponse<Comment, 'comments'>;
  const fetcherData = fetcher.data as PaginatedResponse<Comment, 'comments'>;

  const data = fetcherData ?? loaderData;
  const { offset, limit, comments, total } = data;

  const [allComments, setAllComments] = useState<Comment[]>([]);

  const handleLoadMore = useCallback((offset: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset.toString());

    fetcher.submit(searchParams.toString());
  }, []);

  useEffect(() => {
    setAllComments((prev) => {
      return offset === 0 ? [...comments] : [...prev, ...comments];
    });
  }, [comments, offset]);

  const hasMoreComments = offset + limit < total;
  const isLoading =
    fetcher.state === 'loading' && fetcher.formAction === '/admin/comments';

  return (
    <div className='container p-4 space-y-4 '>
      <h2 className='text-2xl font-semibold'>Comments</h2>
      <div>
        {allComments.map(
          ({ _id, content, userId, blogId, createdAt }, index, array) => (
            <Fragment key={_id}>
              <CommentCard
                blog={blogId}
                content={content}
                createdAt={createdAt}
                user={userId}
              />

              {index < array.length - 1 && <Separator className='my-1' />}
            </Fragment>
          ),
        )}
      </div>

      <div className='flex justify-center my-4'>
        {hasMoreComments ? (
          <Button
            variant='outline'
            onClick={handleLoadMore.bind(null, offset + limit)}
            disabled={isLoading}
          >
            Load more {isLoading && <Loader2Icon className='animate-spin' />}
          </Button>
        ) : (
          <p className='text-muted-foreground text-sm'>No more comments</p>
        )}
      </div>
    </div>
  );
};
