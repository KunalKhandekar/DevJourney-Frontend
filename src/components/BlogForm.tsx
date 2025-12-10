'use client';

import type React from 'react';

/**
 * Node modules
 */
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Components
 */
import TipTap from '@/components/TipTap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

/**
 * Assets
 */
import { GalleryThumbnailsIcon, XIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

/**
 * Types
 */
type BlogFormData = {
  banner_image?: Blob | string | File;
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
    banner_image: defaultValue?.bannerUrl || '',
  });

  const [bannerPreviewURL, setBannerPreviewURL] = useState<string | undefined>(
    defaultValue?.bannerUrl,
  );

  const status = defaultValue?.status || 'draft';
  const hasBanner = useMemo(
    () => Boolean(bannerPreviewURL),
    [bannerPreviewURL],
  );

  useEffect(() => {
    return () => {
      if (bannerPreviewURL && !bannerPreviewURL.startsWith('http')) {
        URL.revokeObjectURL(bannerPreviewURL);
      }
    };
  }, [bannerPreviewURL]);

  const handleBannerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const file = event.target.files[0];

      setData((prev) => ({
        ...prev,
        banner_image: file,
      }));

      if (bannerPreviewURL && !bannerPreviewURL.startsWith('http')) {
        URL.revokeObjectURL(bannerPreviewURL);
      }

      setBannerPreviewURL(URL.createObjectURL(file));
    },
    [bannerPreviewURL],
  );

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prev) => ({ ...prev, title: event.target.value }));
    },
    [],
  );

  const handleContentUpdate = useCallback(({ editor }: any) => {
    setData((prev) => ({ ...prev, content: editor.getHTML() }));
  }, []);

  const handleRemoveBanner = useCallback(() => {
    if (bannerPreviewURL && !bannerPreviewURL.startsWith('http')) {
      URL.revokeObjectURL(bannerPreviewURL);
    }
    setData((prev) => ({
      ...prev,
      banner_image: undefined,
    }));
    setBannerPreviewURL(undefined);
  }, [bannerPreviewURL]);

  const handleSaveDraft = useCallback(() => {
    onSubmit(
      {
        content: data.content,
        title: data.title,
        banner_image: data.banner_image,
      },
      'draft',
    );
  }, [data, onSubmit]);

  const handlePublish = useCallback(() => {
    onSubmit(
      {
        content: data.content,
        title: data.title,
        banner_image: data.banner_image,
      },
      'published',
    );
  }, [data, onSubmit]);

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
                    onChange={handleBannerChange}
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
            onClick={handleRemoveBanner}
          >
            <XIcon />
          </Button>
        )}

        {hasBanner && (
          <figure className='rounded-xl overflow-hidden border h-60'>
            <img
              src={bannerPreviewURL || '/placeholder.svg'}
              alt={data.title}
              className='w-full h-full object-cover'
            />
          </figure>
        )}
      </div>

      <Textarea
        name='title'
        maxLength={180}
        className='text-4xl!  font-semibold tracking-tight border-none ring-0! bg-transparent! px-0 resize-none shadow-none '
        placeholder='New post title here...'
        onChange={handleTitleChange}
        value={data.title}
      />

      <div className='relative border inset-ring-border rounded-xl'>
        <TipTap
          onUpdate={handleContentUpdate}
          content={data.content}
        />
      </div>

      <div className='flex justify-end items-center gap-2 sticky bottom-0 py-4 bg-background isolate after:absolute after:bottom-full after:w-full after:h-10 after:bg-gradient-to-t after:from-background after:to-transparent after:pointer-events-none'>
        <Button
          variant='outline'
          onClick={handleSaveDraft}
        >
          Save as draft
        </Button>

        <Button onClick={handlePublish}>
          {status === 'draft' ? 'Publish' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
};
