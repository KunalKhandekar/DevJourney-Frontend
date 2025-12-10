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

const blogEditAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const blogId = params.blogId;

  const accessToken = localStorage.getItem('accessToken');
  if(!accessToken) return redirect('/');

  try {
    const response = await devJourneyAPI.put(`/blogs/${blogId}`, formData, {
        headers :{ 
            'Content-Encoding': 'multipart/form-data', 
        }
    });

    const responseData = response.data;

    return  {
        ok: true,
        data: responseData
    } as ActionResponse;
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

export default blogEditAction;
