/**
 * Node modules
 */
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useMemo, useState } from 'react';
import { useFetcher, useLoaderData, useNavigate } from 'react-router';
import { toast } from 'sonner';
import Avatar from 'react-avatar';

/**
 * Custom modules
 */
import { getReadingTime, getUsername } from '@/lib/utils';

/**
 * Components
 */
import { Page } from '@/components/Page';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { CommentDetailCard } from '@/components/CommentDetailCard';

/**
 * Assets
 */
import {
  ArrowLeftIcon,
  FacebookIcon,
  LinkedinIcon,
  LinkIcon,
  Loader2Icon,
  MessageSquareIcon,
  ShareIcon,
  ThumbsUpIcon,
  TwitterIcon,
} from 'lucide-react';

/**
 * Types
 */
import type { Blog } from '@/types';
import type { DropdownMenuArrowProps } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { devJourneyAPI } from '@/api';

type IComment = {
  content: string;
  userId: {
    username: string;
  };
  createdAt: string;
};

interface ShareDropdownProps extends DropdownMenuArrowProps {
  blogTitle: string;
}

const ShareDropdown = ({
  blogTitle,
  children,
  ...props
}: ShareDropdownProps) => {
  const blogUrl = window.location.href;
  const shareText = 'Just read this insightful article and wanted to share!';

  const SHARE_LINKS = useMemo(() => {
    return {
      x: `https://x.com/intent/post?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(`${shareText} "${blogTitle}"`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(blogUrl)}&title=${encodeURIComponent(blogTitle)}&summary=${encodeURIComponent(shareText)}`,
    };
  }, [blogTitle, blogUrl]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success('Link copied!');
    } catch (error) {
      toast.error('Failed to copy!');
      console.error('Failed to copy: ', error);
    }
  }, [blogUrl]);

  const shareOnSocial = useCallback((platformUrl: string) => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className='min-w-60'>
        <DropdownMenuItem onSelect={handleCopy}>
          <LinkIcon /> Copy link
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.x)}>
          <TwitterIcon /> Share on X
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.facebook)}>
          <FacebookIcon /> Share on facebook
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => shareOnSocial(SHARE_LINKS.linkedin)}>
          <LinkedinIcon /> Share on linkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const BlogDetail = () => {
  const fetcher = useFetcher();
  const [content, setContent] = useState<string>('');
  const isCommenting =
    fetcher.state === 'submitting' && fetcher.formMethod === 'POST';

  const navigate = useNavigate();
  const { blog, comments, isLiked } = useLoaderData() as {
    blog: Blog;
    comments: IComment[];
    isLiked: boolean;
  };
  const [likesCount, setLikesCount] = useState(blog.likesCount);
  const [userLiked, setUserLiked] = useState(isLiked || false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: blog.content,
    editable: false,
    autofocus: false,
  });

  const handleLike = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        toast.error('Login to like the blog');
        return;
      }
      const res = await devJourneyAPI.post(`/likes/blog/${blog._id}`);
      const data = await res.data;
      setLikesCount(data.likesCount);
      setUserLiked(data.userLiked);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update like');
    }
  };

  const handleUnlike = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        toast.error('Login to unlike the blog');
        return;
      }
      const res = await devJourneyAPI.delete(`/likes/blog/${blog._id}`);
      const data = await res.data;
      setLikesCount(data.likesCount);
      setUserLiked(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update unlike');
    }
  };

  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      await fetcher.submit(
        { content: content },
        {
          action: `/comments?blogId=${blog._id}`,
          method: 'POST',
          encType: 'application/json',
        },
      );
      setContent('');
    },
    [content],
  );
  return (
    <Page>
      <article className='relative container max-w-[720px] pt-6 pb-12'>
        <Button
          variant='outline'
          size='icon'
          className='sticky top-22 -ms-16'
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
        </Button>

        <h1 className='text-2xl md:text-4xl leading-tight font-semibold -mt-10'>
          {blog.title}
        </h1>
        <div className='flex sm:items-center gap-3 my-8 flex-col sm:flex-row items-start justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar
              name={blog.author.username}
              size='32'
              round
            />
            <span>{getUsername(blog.author)}</span>
          </div>

          <div className='flex items-center gap-3'>
            <div className='text-muted-foreground flex items-start gap-1'>
              {getReadingTime(editor.getText() || '')} min read
            </div>
            <div className='text-muted-foreground'>
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                dateStyle: 'medium',
              })}
            </div>
          </div>
        </div>

        <Separator />

        <div className='flex items-center gap-2 my-2'>
          <Button
            variant='ghost'
            onClick={userLiked ? handleUnlike : handleLike}
            className='flex items-center gap-1'
          >
            <ThumbsUpIcon
              className={userLiked ? 'text-white' : ''}
              strokeWidth={userLiked ? 0 : 2}
              fill={userLiked ? 'currentColor' : 'none'}
            />
            {likesCount}
          </Button>

          <Button
            variant='ghost'
            onClick={() => {
              const el = document.getElementById('comments-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <MessageSquareIcon />
            {comments.length}
          </Button>

          <ShareDropdown blogTitle={blog.title}>
            <Button
              variant='ghost'
              className='ms-auto'
            >
              <ShareIcon />
              Share
            </Button>
          </ShareDropdown>
        </div>

        <Separator />

        <div className='my-8'>
          <AspectRatio
            ratio={1 / 1}
            className='overflow-hidden rounded-xl bg-border'
          >
            <img
              src={blog.banner.url}
              width={blog.banner.width}
              height={blog.banner.height}
              alt={`Banner of blog: ${blog.title}`}
              className='w-full h-full object-cover'
            />
          </AspectRatio>
        </div>

        <EditorContent editor={editor} />

        <Separator
          className='mt-8'
          id='comments-section'
        />

        <section className='mt-18'>
          <h3 className='text-xl font-semibold pb-4'>
            Comments ({comments.length})
          </h3>

          <form
            onSubmit={onSubmit}
            className='max-w-full mx-auto flex items-center gap-2'
          >
            <Input
              type='text'
              name='comment'
              placeholder='Enter your comment'
              aria-label='Enter your comment'
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <Button
              type='submit'
              disabled={isCommenting}
            >
              {isCommenting && <Loader2Icon className='animate-spin' />}
              {isCommenting ? 'Commenting' : 'Comment'}
            </Button>
          </form>
          <div className='my-4'>
            {comments.map((comment) => (
              <CommentDetailCard
                content={comment.content}
                createdAt={comment.createdAt}
                user={comment.userId}
              />
            ))}
          </div>
        </section>
      </article>
    </Page>
  );
};
