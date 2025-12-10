/**
 * Custom modules
 */
import { devJourneyAPI } from '@/api';

/**
 * Types
 */
import { redirect, type ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse } from '@/types';

const blogsAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as { blogId: string };

  const accessToken = localStorage.getItem('accessToken');

  if(!accessToken) return redirect('/');

  try {
    await devJourneyAPI.delete(`/blogs/${data.blogId}`);
    return  { ok: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        err: error.response?.data,
      } as ActionResponse;
    }
    throw error;
  }
};

export default blogsAction;
