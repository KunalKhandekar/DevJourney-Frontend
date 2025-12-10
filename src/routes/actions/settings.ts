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
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors as Record<
          string,
          { msg: string }
        >;
        Object.values(errors).forEach((err) => {
          toast.error(err.msg);
        });
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
