/**
 * Node modules
 */
import { redirect } from 'react-router';
import { toast } from 'sonner';

/**
 * Custom modules
 */
import { devJourneyAPI } from '@/api';

/**
 * Types
 */
import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';

const commentsAction: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const blogId = url.searchParams.get('blogId');
  const data = await request.json();
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    toast.error('Login to make a comment');
    return;
  }

  try {
    const response = await devJourneyAPI.post(
      `/comments/blog/${blogId}`,
      data
    );

    const responseData = response.data;
    toast.success('Comment added successfully!');
    return {
      ok: true,
      data: responseData,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors as Record<
          string,
          { msg: string }
        >;
        Object.values(errors).forEach((err) => toast.error(err.msg));
      }

      return {
        ok: false,
        err: error.response?.data,
      };
    }
    throw error;
  }
};

export default commentsAction;
