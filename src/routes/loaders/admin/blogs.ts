/**
 * Node modules
 */
import { data } from 'react-router';

/**
 * Custom modules
 */
import { devJourneyAPI } from '@/api';

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';
import type { Blog, PaginatedResponse } from '@/types';
import { AxiosError } from 'axios';

const allBlogLoader: LoaderFunction = async ( { request  }) => {

    const url = new URL(request.url);
    const offset = url.searchParams.get('offset') || 0;
    const limit = url.searchParams.get('limit') || 10;

  try {
    const response = await devJourneyAPI.get('/blogs', {
      params: { offset, limit }
    });

    const data = response.data as PaginatedResponse<Blog, 'blogs'>;
   
    return data;
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

export default allBlogLoader;
