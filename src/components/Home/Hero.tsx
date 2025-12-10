/**
 * Node modules
 */
import { motion } from 'motion/react';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Types
 */
import type { Variants } from 'motion/react';

/**
 * Constants
 */
const HERO = {
  headline: 'Notes from a Developer',
  text: 'Short lessons, practical examples, and personal experiences from my tech path.',
} as const;

/**
 * Motion variants
 */
const containerVariant: Variants = {
  to: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const childVariant: Variants = {
  from: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  to: {
    opacity: 1,
    filter: 'blur(0)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const Hero = ({
  className,
  ...props
}: React.ComponentProps<'section'>) => {
  return (
    <section
      className={cn('section', className)}
      {...props}
    >
      <motion.div
        className='container'
        initial='from'
        whileInView='to'
        viewport={{ once: true }}
        variants={containerVariant}
      >
        <motion.h1
          className='text-2xl font-semibold text-balance text-center md:text-4xl lx:text-5xl'
          variants={childVariant}
        >
          {HERO.headline}
        </motion.h1>
        <motion.p
          className='text-center text-balancem text-muted-foreground mt-5 mb-8 md:text-xl'
          variants={childVariant}
        >
          {HERO.text}
        </motion.p>

        <motion.div
          className='max-w-md mx-auto flex items-center gap-2'
          variants={childVariant}
        >
          <Input
            type='email'
            name='email'
            placeholder='Enter your email'
            autoComplete='email'
            aria-label='Enter your email'
          />

          <Button>Subscribe</Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
