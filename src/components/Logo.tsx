/**
 * Node modules
 */
import { Link } from 'react-router';
import { motion } from 'motion/react';

/**
 * Components
 */
const MotionLink = motion.create(Link);

/**
 * Assets
 */
// LogoIconLight and Darkmode

export const Logo = () => {
  return (
    <MotionLink
      to={'/'}
      className='text-primary text-lg font-semibold'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      viewTransition
    >
      <img
        src={'logoDark'}
        alt='logo'
        width={115}
        height={32}
        className='dark:hidden '
      />
      <img
        src={'logoLight'}
        alt='logo'
        width={115}
        height={32}
        className='hidden dark:block'
      />
    </MotionLink>
  );
};
