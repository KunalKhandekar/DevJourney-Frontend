/**
 * Custom modules
 */
import { devJourneyAPI } from '@/api';

const useLogout = () => {
  return async () => {
    const response = await devJourneyAPI.post('/auth/logout');
    if (response.status >= 400) return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.reload();
  };
};

export default useLogout;
