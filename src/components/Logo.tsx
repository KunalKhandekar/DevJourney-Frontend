/**
 * Node modules
 */
import { motion } from 'motion/react';
import { Link } from 'react-router';

/**
 * Components
 */
const MotionLink = motion.create(Link);

export const Logo = () => {
  return (
    <MotionLink
      to={'/'}
      className='text-primary text-lg font-semibold'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      viewTransition
    >
      <h1 className='text-xl md:text-2xl italic'>DevJourney</h1>
    </MotionLink>
  );
};
