/**
 * Node modules
 */
import { useCallback, useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { UserCard } from '@/components/UserCard';

/**
 * Custom hooks
 */
import useUser from '@/hooks/useUser';

/**
 * Assets
 */
import { Loader2Icon } from 'lucide-react';

/**
 * Types
 */
import type { PaginatedResponse, User } from '@/types';

export const Users = () => {
  const fetcher = useFetcher();
  const loggedInUser = useUser();
  const loaderData = useLoaderData() as PaginatedResponse<User, 'users'>;
  const fetcherData = fetcher.data as PaginatedResponse<User, 'users'>;

  const data = fetcherData ?? loaderData;
  const { offset, limit, users, total } = data;

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const handleLoadMore = useCallback((offset: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('offset', offset.toString());

    fetcher.submit(searchParams.toString());
  }, []);

  useEffect(() => {
    setAllUsers((prev) => {
      return offset === 0 ? [...users] : [...prev, ...users];
    });
  }, [users, offset]);

  const hasMoreUsers = offset + limit < total;
  const isLoading =
    fetcher.state === 'loading' && fetcher.formAction === '/admin/users';

  return (
    <div className='container p-4 space-y-4 '>
      <h2 className='text-2xl font-semibold'>Users</h2>
      <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-3'>
        {allUsers.map(
          ({ _id, createdAt, email, username, firstName, lastName, role }) => (
            <UserCard
              createdAt={createdAt}
              email={email}
              role={role}
              userId={_id}
              username={username}
              firstName={firstName}
              lastName={lastName}
              loggedInUser={loggedInUser}
              onUserDeleteSuccess={() => {
                setAllUsers((prev) => prev.filter((user) => user._id !== _id));
              }}
            />
          ),
        )}
      </div>

      <div className='flex justify-center my-4'>
        {hasMoreUsers ? (
          <Button
            variant='outline'
            onClick={handleLoadMore.bind(null, offset + limit)}
            disabled={isLoading}
          >
            Load more {isLoading && <Loader2Icon className='animate-spin' />}
          </Button>
        ) : (
          <p className='text-muted-foreground text-sm'>No more users</p>
        )}
      </div>
    </div>
  );
};
