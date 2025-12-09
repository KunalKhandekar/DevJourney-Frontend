/**
 * Node modules
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import TipTap from '@/components/TipTap';

/**
 * Assets
 */
import { GalleryThumbnailsIcon, XIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

/**
 * Types
 */
type BlogFormData = {
  banner_image?: Blob;
  title: string;
  content: string;
};

type BlogStatus = 'draft' | 'published';
type FormDefaultValue = {
  bannerUrl: string;
  title: string;
  content: string;
  status: BlogStatus;
};
type BlogFormProps = {
  defaultValue?: FormDefaultValue;
  onSubmit: (formData: BlogFormData, status: BlogStatus) => void;
};

export const BlogForm: React.FC<BlogFormProps> = ({
  defaultValue,
  onSubmit,
}: BlogFormProps) => {
  const [data, setData] = useState<BlogFormData>({
    title: defaultValue?.title || '',
    content: defaultValue?.content || '',
  });

  const [bannerPreviewURL, setBannerPreviewURL] = useState<string | undefined>(
    defaultValue?.bannerUrl,
  );

  const status = defaultValue?.status;
  const hasBanner = useMemo(
    () => Boolean(bannerPreviewURL),
    [bannerPreviewURL],
  );

  return (
    <div className='relative space-y-5'>
      <div className='relative min-h-9 isolate'>
        {!hasBanner && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                className='absolute top-0.5 left-0.5 overflow-hidden'
                asChild
              >
                <Label>
                  <GalleryThumbnailsIcon />
                  Add a cover...
                  <Input
                    type='file'
                    accept='.jpg, .jpeg, .png, .webp'
                    name='banner_image'
                    className='sr-only'
                    onChange={(event) => {
                      if (!event.target.files) return;
                      setData((prev) => ({
                        ...prev,
                        banner_image: event.target.files?.[0],
                      }));
                      setBannerPreviewURL(
                        URL.createObjectURL(event.target.files?.[0]),
                      );
                    }}
                  />
                </Label>
              </Button>
            </TooltipTrigger>

            <TooltipContent side='right'>
              Maximum banner size 2MB <br /> Format should be JPG, PNG or WEBP
            </TooltipContent>
          </Tooltip>
        )}

        {hasBanner && (
          <Button
            variant='outline'
            size='icon'
            className='absolute top-2 left-2 z-30'
            aria-label='Remove banner image'
            onClick={() => {
              setData((prev) => ({
                ...prev,
                banner_image: undefined,
              }));
              setBannerPreviewURL(undefined);
            }}
          >
            <XIcon />
          </Button>
        )}

        <AnimatePresence>
          {hasBanner && (
            <motion.figure
              className='rounded-xl overflow-hidden border'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 240 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                visualDuration: 0.25,
                bounce: 0.2,
              }}
            >
              <img
                src={bannerPreviewURL}
                alt={data.title}
                className='w-full h-full object-cover'
              />
            </motion.figure>
          )}
        </AnimatePresence>
      </div>

      <Textarea
        name='title'
        maxLength={180}
        className='text-4xl! font-semibold tracking-tight border-none ring-0! bg-transparent! px-0 resize-none shadow-none '
        placeholder='New post title here...'
        onChange={(event) =>
          setData((prev) => ({ ...prev, title: event.target.value }))
        }
        value={data.title}
      />

      <div className='relative border inset-ring-border rounded-xl'>
        <TipTap
          onUpate={({ editor }) =>
            setData((prev) => ({ ...prev, content: editor.getHTMl() }))
          }
          content={data.content}
        />
      </div>
    </div>
  );
};
