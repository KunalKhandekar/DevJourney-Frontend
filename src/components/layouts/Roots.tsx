/**
 * Node modules
 */
import { Outlet } from 'react-router';
import { Loading } from '@/components/Loading';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

/**
 * Components
 */

export const RootLayout = () => {
  return (
    <div className='flex flex-col min-h-dvh'>
      <Loading className='z-40' />

      <Header />

      <main className='grow flex flex-col'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
