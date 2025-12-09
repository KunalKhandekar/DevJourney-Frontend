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
import { AdminLayout } from '@/components/layouts/Admin';
import { Home } from '@/pages/user/Home';
import { Blogs } from '@/pages/Blogs';
import { BlogDetail } from '@/pages/BlogDetail';
import { Dashboard } from '@/pages/admin/Dashboards';
import { Blogs as AdminBlogs } from '@/pages/admin/Blogs';
import { Comments } from '@/pages/admin/Comments';
import { Users } from '@/pages/admin/Users';
import { BlogCreate } from '@/pages/admin/BlogCreate';

/**
 * Actions
*/
import signupAction from '@/routes/actions/auth/signup';
import loginAction from '@/routes/actions/auth/login';
import settingsAction from '@/routes/actions/settings';
import blogEditAction from '@/routes/actions/admin/blogEdit';
import blogsAction from '@/routes/actions/admin/blogsAction';
import allUserAction from '@/routes/actions/admin/user';

/**
 * Loaders
 */
import homeLoader from '@/routes/loaders/user/home';
import refreshTokenLoader from '@/routes/loaders/refreshToken';
import userBlogLoader from '@/routes/loaders/user/blogs';
import blogDetailLoader from '@/routes/loaders/user/blogDetail';
import adminLoader from '@/routes/loaders/admin/admin';
import dashboardLoader from '@/routes/loaders/admin/dashboard';
import allBlogLoader from '@/routes/loaders/admin/blogs';
import allCommentLoader from '@/routes/loaders/admin/comments';
import allUserLoader from '@/routes/loaders/admin/user';

/**
 * Error Boundaries
 */
import { RootErrorBoundary } from '@/pages/error/Root';

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
    path: '/refresh-token',
    loader: refreshTokenLoader,
  },
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: RootErrorBoundary,
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
    Component: AdminLayout,
    loader: adminLoader,
    ErrorBoundary: RootErrorBoundary,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard,
        loader: dashboardLoader,
        handle: { breadcumb: 'Dashboard' },
      },
      {
        path: 'blogs',
        Component: AdminBlogs,
        loader: allBlogLoader,
        action: blogsAction,
        handle: { breadcumb: 'Blogs' },
      },
      {
        path: 'blogs/create',
        Component: BlogCreate,
        handle: { breadcumb: 'Create a new blog' },
      },
      {
        path: 'blogs/:blogId/edit',
        action: blogEditAction,
        handle: { breadcumb: 'Edit blog' },
      },
      {
        path: 'comments',
        loader: allCommentLoader,
        Component: Comments,
        handle: { breadcumb: 'Comments' },
      },
      {
        path: 'users',
        Component: Users,
        loader: allUserLoader,
        action: allUserAction,
        handle: { breadcumb: 'Users' },
      },
    ],
  },
  {
    path: '/settings',
    action: settingsAction,
  },
]);

export default router;
