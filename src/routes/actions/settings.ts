/**
 * Node modules
 */
import { redirect } from 'react-router';

/**
 * Custom modules
 */
import { devJourneyAPI } from '@/api';

/**
 * Types
 */
import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const settingsAction: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return redirect('/');

  try {
    const response = await devJourneyAPI.put('/users/current', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    const responseData = response.data;
    localStorage.setItem('user', JSON.stringify(responseData.user));

    return {
      ok: true,
      data: responseData,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      // Check if expired access token
      if (error.response?.status === 401) {
        try {
          const refreshResponse = await devJourneyAPI.post(
            '/auth/refresh-token',
            null,
            {
              withCredentials: true,
            },
          );

          const newAccessToken = refreshResponse.data?.accessToken;
          if (!newAccessToken) return redirect('/');

          localStorage.setItem('accessToken', newAccessToken);

          // Retry original request with new token
          const retryResponse = await devJourneyAPI.put(
            '/users/current',
            data,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
              withCredentials: true,
            },
          );

          const updatedData = retryResponse.data;
          localStorage.setItem('user', JSON.stringify(updatedData.user));

          return {
            ok: true,
            data: updatedData,
          };
        } catch {
          return redirect('/');
        }
      }

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

export default settingsAction;
