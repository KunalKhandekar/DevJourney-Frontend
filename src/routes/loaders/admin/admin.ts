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
import { AxiosError } from 'axios';

const adminLoader: LoaderFunction = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');
  try {
    const { data } = await devJourneyAPI.get('/users/current', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data.user.role !== 'admin') return redirect('/');
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

export default adminLoader;
