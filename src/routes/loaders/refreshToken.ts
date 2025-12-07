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

const refreshTokenLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectUri = url.searchParams.get('redirect') ?? '/';
  try {
    const { data } = await devJourneyAPI.post(
      '/auth/refresh-token',
      {},
      { withCredentials: true },
    );

    localStorage.setItem('accessToken', data.accessToken);

    return redirect(redirectUri);
  } catch (error) {
    if (error instanceof AxiosError) {
      const tokenExpired =
        error.response?.data.message.includes('token expired');
      if (tokenExpired) {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        return redirect('/login');
      }

      throw data(error.response?.data?.message || error.message, {
        status: error.response?.status || error.status,
        statusText: error.response?.data?.code || error.code,
      });
    }

    throw error;
  }
};

export default refreshTokenLoader;
