/**
 * Node modules
 */
import { data, redirect } from 'react-router';

/**
 * Custom modules
 */
import { devJourneyAPI } from '@/api';

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';
import type { PaginatedResponse, Blog, Comment, User } from '@/types';
import { AxiosError } from 'axios';
export type DashboardData = {
  blogsCount: number;
  commentsCount: number;
  usersCount: number;
  blogs: Blog[];
  comments: Comment[];
  users: User[];
};

const dashboardLoader: LoaderFunction = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');
  try {
    const blogsResponse = await devJourneyAPI.get('/blogs', {
      params: { limit: 5 },
    });

    const usersResponse = await devJourneyAPI.get('/users', {
      params: { limit: 5 },
    });

    const commentsResponse = await devJourneyAPI.get('/comments', {
      params: { limit: 5 },
    });

    const paginatedBlogs = blogsResponse.data as PaginatedResponse<
      Blog,
      'blogs'
    >;
    const paginatedCommnets = commentsResponse.data;
    const paginatedUsers = usersResponse.data as PaginatedResponse<
      User,
      'users'
    >;

    return {
      blogsCount: paginatedBlogs.total,
      commentsCount: paginatedCommnets.total,
      usersCount: paginatedUsers.total,
      blogs: paginatedBlogs.blogs,
      comments: paginatedCommnets.comments,
      users: paginatedUsers.users,
    } as DashboardData;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw data(error.response?.data?.message || error.message, {
        status: error.response?.status || error.status,
        statusText: error.response?.data?.code || error.code,
      });
    }
    throw error;
  }
};

export default dashboardLoader;
