'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Button from '@/components/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to quiz
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/quiz');
    }
  }, [user, authLoading, router]);

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render login form if user is authenticated
  if (user) {
    return null;
  }

  const getFirebaseErrorMessage = (error: { code?: string; message?: string }) => {
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use a stronger password with at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return error.message || 'An error occurred. Please try again.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔥 Attempting authentication:', { 
      email, 
      passwordLength: password.length 
    });

    try {
      // Always try to sign in first
      console.log('🔑 Trying to sign in...');
      await signIn(email, password);
      console.log('✅ Sign in successful!');
    } catch (signInError: unknown) {
      console.log('❌ Sign in failed, trying to create account...');
      
      // If sign in fails with invalid credential, try to create account
      if ((signInError as { code?: string }).code === 'auth/invalid-credential') {
        try {
          console.log('📝 Creating new account...');
          await signUp(email, password);
          console.log('✅ Account created and signed in!');
        } catch (signUpError: unknown) {
          console.error('❌ Account creation failed:', signUpError);
          
          // If account already exists, try to sign in again with better error message
          if ((signUpError as { code?: string }).code === 'auth/email-already-in-use') {
            setError('Account exists but password is incorrect. Please check your password and try again.');
          } else {
            setError(getFirebaseErrorMessage(signUpError as { code?: string; message?: string }));
          }
        }
      } else {
        // Other sign in errors
        console.error('❌ Sign in error:', signInError);
        setError(getFirebaseErrorMessage(signInError as { code?: string; message?: string }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      // Redirect will happen via useEffect when user state updates
    } catch (err: unknown) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/assets/6.svg"
              alt="ATTUNER.ai Logo"
              width={64}
              height={64}
              className="rounded-xl w-[200px] h-[200px]"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to ATTUNER.ai
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Enter your email and password to continue
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-base sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-base sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[-11px] top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
               </div>
            </div>

            <div>
              SIGN IN OR REGISTER
            </div>

            <div>
              <Button
                onClick={() => {
                  const mockEvent = { preventDefault: () => {} } as React.FormEvent;
                  handleSubmit(mockEvent);
                }}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Loading...' : 'Continue'}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div>
              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">Continue with Google</span>
                </div>
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We&apos;ll automatically sign you in or create your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 