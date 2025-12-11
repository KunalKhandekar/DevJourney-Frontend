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

const subscribeAction: ActionFunction = async ({ request }) => {
  const data = await request.json();

  try {
    const response = await devJourneyAPI.post('/subscribers/create', data);
    const responseData = response.data;
    toast.success('Subscribed successfully!', {
      description: 'You will be notified for every latest blog post.',
      duration: 5000,
    });
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
      toast.error(
        error.response?.data?.message ||
          'Failed to subscribe. Please try again.',
      );
      return {
        ok: false,
        err: error.response?.data,
      };
    }
    throw error;
  }
};

export default subscribeAction;
