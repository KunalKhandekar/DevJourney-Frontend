/**
 * Node modules
 */
import { useFetcher, useNavigate } from 'react-router';
import { toast } from 'sonner';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { BlogForm } from '@/components/BlogForm';

export const BlogCreate = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  return (
    <div
      className={cn(
        'max-w-3xl w-full mx-auto p-4',
        isSubmitting && 'opacity-50 pointer-events-none',
      )}
    >
      <BlogForm
        onSubmit={async ({ banner_image, content, title }, status) => {
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
          }
          if (!title) {
            toast.error('title is required');
            return;
          }
          if (!content) {
            toast.error('content is required');
            return;
          }
          if (!status) {
            toast.error('status is required');
            return;
          }
          const formData = new FormData();
          formData.append('banner_image', banner_image);
          formData.append('title', title);
          formData.append('content', content);
          formData.append('status', status);

          const submitPromise = fetcher.submit(formData, {
            method: 'POST',
            encType: 'multipart/form-data',
          });

          toast.promise(submitPromise, {
            loading: 'Publishing blog...',
            success: {
              message: 'Blog Published Successfully!',
              description: 'Your blog is now live and visible to everyone.',
            },
          });

          navigate(`/admin/dashboard`);
        }}
      />
    </div>
  );
};
