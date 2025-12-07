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
import { Home } from '@/pages/user/Home';
import { Blogs } from '@/pages/Blogs';
import { BlogDetail } from '@/pages/BlogDetail';

/**
 * Actions
 */
import signupAction from '@/routes/actions/auth/signup';
import loginAction from '@/routes/actions/auth/login';
import settingsAction from '@/routes/actions/settings';

/**
 * Loaders
 */
import homeLoader from '@/routes/loaders/user/home';
import refreshTokenLoader from '@/routes/loaders/refreshToken';
import userBlogLoader from '@/routes/loaders/user/blogs';
import blogDetailLoader from '@/routes/loaders/user/blogDetail';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
    action: loginAction,
  },
  {
    path: '/signup',
    Component: Signup,
    action: signupAction,
  },
  {
    path: 'refresh-token',
    loader: refreshTokenLoader,
  },
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
      },
      {
        path: 'blogs',
        Component: Blogs,
        loader: userBlogLoader,
      },
      {
        path: 'blogs/:slug',
        Component: BlogDetail,
        loader: blogDetailLoader,
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
