/**
 * Node modules
 */
import { useFetcher, useLoaderData, useNavigate } from 'react-router';
import { toast } from 'sonner';

/**
 * Components
 */
import { BlogForm } from '@/components/BlogForm';

/**
 * Types
 */
import type { Blog } from '@/types';

export const BlogEdit = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as { blog: Blog };
  const fetcher = useFetcher();

  const blog = loaderData.blog;
  return (
    <div className={'max-w-3xl w-full mx-auto p-4'}>
      <BlogForm
        defaultValue={{
          bannerUrl: blog.banner.url,
          content: blog.content,
          title: blog.title,
          status: blog.status,
        }}
        onSubmit={({ banner_image, content, title }, status) => {
          const formData = new FormData();
          if (!banner_image) {
            toast.error('Banner is required');
            return;
          }

          if (banner_image instanceof File) {
            const MAX_SIZE = 2 * 1024 * 1024; // 2MB

            if (banner_image.size > MAX_SIZE) {
              toast.error('Banner size must be less than 2MB');
              return;
            }

            formData.append('banner_image', banner_image);
          }

          if (!title) {
            toast.error('title is required');
            return;
          }
          if (!content || content === '<p></p>') {
            toast.error('content is required');
            return;
          }
          if (!status) {
            toast.error('status is required');
            return;
          }
          if (title !== blog.title) formData.append('title', title);
          if (content !== blog.content) formData.append('content', content);
          if (status !== blog.status) formData.append('status', status);

          const submitPromise = fetcher.submit(formData, {
            method: 'PUT',
            encType: 'multipart/form-data',
          });

          toast.promise(submitPromise, {
            loading: 'Saving Changes..',
            success: {
              message: 'Changes Saved Successfully!',
              description: 'Your updates have been saved and applied.',
            },
          });

          navigate('/admin/dashboard');
        }}
      />
    </div>
  );
};
