/**
 * Node modules
 */
import { motion } from 'motion/react';
import { useLoaderData } from 'react-router';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { BlogCard } from '@/components/BlogCard';
import { Page } from '@/components/Page';

/**
 * Types
 */
import type { Blog as BlogType, PaginatedResponse } from '@/types';
import type { Variants } from 'motion/react';

/**
 * Motion Variants
 */
const listVariants: Variants = {
  to: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  from: { opacity: 0 },
  to: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'backInOut',
    },
  },
};

export const Blogs = ({
  className,
  ...props
}: React.ComponentProps<'section'>) => {
  const loaderData = useLoaderData() as PaginatedResponse<BlogType, 'blogs'>;
  const { blogs } = loaderData;

  return (
    <Page>
      <section
        className={cn('section', className)}
        {...props}
      >
        <div className='container'>
          <motion.h2
            className='section-title'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: 'easeOut' },
            }}
          >
            All blog posts
          </motion.h2>

          <motion.ul
            className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'
            initial='from'
            whileInView='to'
            viewport={{ once: true }}
            variants={listVariants}
          >
            {blogs.map(
              ({ slug, banner, title, content, author, publishedAt }) => (
                <motion.li
                  key={slug}
                  variants={itemVariants}
                >
                  <BlogCard
                    bannerUrl={banner.url}
                    bannerHeight={banner.height}
                    bannerWidth={banner.width}
                    authorName={`${author.firstName} ${author.lastName}`}
                    content={content}
                    publishedAt={publishedAt}
                    slug={slug}
                    title={title}
                  />
                </motion.li>
              ),
            )}
          </motion.ul>
        </div>
      </section>
    </Page>
  );
};
