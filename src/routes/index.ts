/**
 * Node modules
 */
import { createBrowserRouter } from 'react-router';

/**
 * Pages
 */
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { RootLayout } from '@/components/layouts/Roots';

/**
 * Actions
*/
import signupAction from '@/routes/actions/auth/signup';
import loginAction from '@/routes/actions/auth/login';
import settingsAction from '@/routes/actions/settings';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
    action: loginAction
  },
  {
    path: '/signup',
    Component: Signup,
    action: signupAction,
  },
  {
    path: 'refresh-token',
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
      },
      {
        path: 'blogs',
      },
      {
        path: 'blogs/:slug',
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'dashboard',
      },
      {
        path: 'blogs',
      },
      {
        path: 'blogs/create',
      },
      {
        path: 'blogs/:slug/edit',
      },
      {
        path: 'comments',
      },
      {
        path: 'users',
      },
    ],
  },
  {
    path: '/settings',
    action: settingsAction,
  },
]);

export default router;
