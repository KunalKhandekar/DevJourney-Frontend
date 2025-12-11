/**
 * Node modules
 */
import { motion } from 'motion/react';
import { Link } from 'react-router';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { Button } from '@/components/ui/button';


export const AllBlogs = ({
  className,
  ...props
}: React.ComponentProps<'section'>) => {
  return (
    <section
      className={cn('section', className)}
      {...props}
    >
      <motion.div
        className='mt-8 flex justify-center md:mt-10'
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: 'backInOut',
          },
        }}
      >
        <Button
          size='lg'
          asChild
        >
          <Link
            to='/blogs'
            viewTransition
          >
            See all blogs
          </Link>
        </Button>
      </motion.div>
    </section>
  );
};
