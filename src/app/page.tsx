'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import WhatIsHolo from '@/components/WhatIsHolo';
import FourDimensions from '@/components/FourDimensions';
import DiscoverProfile from '@/components/DiscoverProfile';

export default function Home() {
  // const { user, loading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!loading && user) {
  //     router.push('/quiz');
  //   }
  // }, [user, loading, router]);

  // if (loading || user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-black">
  //       <div className="relative">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="">
      <Hero />
      <main className='bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
        <WhatIsHolo />
        <FourDimensions />
        <DiscoverProfile />
      </main>
    </div>
  );
}
