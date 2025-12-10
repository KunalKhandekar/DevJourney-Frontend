/**
 * Node modules
 */
import { useNavigate, useLocation } from 'react-router';

/**
 * Custom modules
 */
import { devJourneyAPI } from '@/api';

const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const clearAuthAndRedirect = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/', { replace: true, viewTransition: true });
    }
  };

  return async () => {
    const tryLogout = async () => {
      const accessToken = localStorage.getItem('accessToken');
      return devJourneyAPI.post(
        '/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );
    };

    try {
      await tryLogout();
      clearAuthAndRedirect();
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const refreshResponse = await devJourneyAPI.post(
            '/auth/refresh-token',
            null,
            {
              withCredentials: true,
            },
          );
          const newToken = refreshResponse.data?.accessToken;
          if (newToken) localStorage.setItem('accessToken', newToken);

          // retry logout
          await tryLogout();
          clearAuthAndRedirect();
        } catch {
          clearAuthAndRedirect();
        }
      } else {
        clearAuthAndRedirect();
      }
    }
  };
};

export default useLogout;
