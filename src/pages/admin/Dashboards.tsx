/**
 * Node modules
 */
import { Fragment } from 'react';
import { Link, useLoaderData } from 'react-router';

/**
 * Components
 */
import { BlogTable, columns } from '@/components/BlogTable';
import { CommentCard } from '@/components/CommentCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserCard } from '@/components/UserCard';

/**
 * Custom hooks
 */
import useUser from '@/hooks/useUser';

/**
 * Assets
 */
import { MessageSquareIcon, TextIcon, UserRoundIcon } from 'lucide-react';

/**
 * Types
 */
import type { DashboardData } from '@/routes/loaders/admin/dashboard';

export const Dashboard = () => {
  const loaderData = useLoaderData() as DashboardData;
  const loggedInUser = useUser();

  return (
    <div className='container p-4 space-y-4'>
      <h2 className='text-2xl font-semibold'>Dashboard</h2>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <TextIcon size={18} />
            </div>

            <CardTitle className='font-normal'>Total Articles</CardTitle>
          </CardHeader>

          <CardContent className='text-4xl tracking-wider px-4'>
            {loaderData.blogsCount}
          </CardContent>
        </Card>
        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <MessageSquareIcon size={18} />
            </div>

            <CardTitle className='font-normal'>Total Comments</CardTitle>
          </CardHeader>

          <CardContent className='text-4xl tracking-wider px-4'>
            {loaderData.commentsCount}
          </CardContent>
        </Card>
        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <UserRoundIcon size={18} />
            </div>

            <CardTitle className='font-normal'>Total Users</CardTitle>
          </CardHeader>

          <CardContent className='text-4xl tracking-wider px-4'>
            {loaderData.usersCount}
          </CardContent>
        </Card>
      </div>

      <Card className='gap-4 py-4'>
        <CardHeader className='flex items-center gap-2.5 px-4'>
          <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
            <TextIcon size={18} />
          </div>

          <CardTitle className='font-normal'>Recent Articles</CardTitle>

          <CardAction className='ms-auto'>
            <Button
              variant='link'
              size='sm'
              asChild
            >
              <Link to='/admin/blogs'>See all</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className='px-4'>
          <BlogTable
            columns={columns}
            data={loaderData.blogs}
          />
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 '>
        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <MessageSquareIcon size={18} />
            </div>

            <CardTitle className='font-normal'>Recent Comments</CardTitle>

            <CardAction className='ms-auto'>
              <Button
                variant='link'
                size='sm'
                asChild
              >
                <Link to='/admin/comments'>See all</Link>
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className='px-4'>
            {loaderData.comments.map(
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
          </CardContent>
        </Card>

        <Card className='gap-4 py-4'>
          <CardHeader className='flex items-center gap-2.5 px-4'>
            <div className='bg-muted text-muted-foreground max-w-max p-2 rounded-lg'>
              <UserRoundIcon size={18} />
            </div>

            <CardTitle className='font-normal'>Latest Users</CardTitle>

            <CardAction className='ms-auto'>
              <Button
                variant='link'
                size='sm'
                asChild
              >
                <Link to='/admin/users'>See all</Link>
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className='px-4 space-y-2'>
            {loaderData.users.map(
              ({
                _id,
                username,
                email,
                role,
                firstName,
                lastName,
                createdAt,
              }) => (
                <UserCard
                  createdAt={createdAt}
                  email={email}
                  role={role}
                  userId={_id}
                  username={username}
                  firstName={firstName}
                  key={_id}
                  lastName={lastName}
                  loggedInUser={loggedInUser}
                />
              ),
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
