'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to landing page if user is not authenticated
      router.push('/');
    }
  }, [user, loading, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-sm sm:text-base">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render children if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Image
            src="/assets/1.svg"
            alt="ATTUNER.ai Logo"
            width={48}
            height={48}
            className="rounded-xl mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-300 mb-4">Please log in to access this page.</p>
          <div className="animate-pulse">
            <p className="text-sm text-gray-400">Redirecting to home...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 