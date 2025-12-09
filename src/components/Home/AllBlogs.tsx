/**
 * Node modules
 */
import { useLoaderData, Link } from 'react-router';
import { motion } from 'motion/react';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { BlogCard } from '@/components/BlogCard';
import { Button } from '@/components/ui/button';

/**
 * Types
 */
import type { Variants } from 'motion/react';
import type { HomeLoaderResponse } from '@/routes/loaders/user/home';

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

export const AllBlogs = ({
  className,
  ...props
}: React.ComponentProps<'section'>) => {
  const { allBlog } = useLoaderData<HomeLoaderResponse>();
  return (
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
          {allBlog.blogs.map(
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

        <motion.div className='mt-8 flex justify-center md:mt-10' initial={{opacity: 0}}
        animate={{
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'backInOut'
            }
        }}
        > 
            <Button size='lg' asChild>
                <Link to='/blogs' viewTransition>
                See all blogs
                </Link>
            </Button>
        </motion.div>
      </div>
    </section>
  );
};
