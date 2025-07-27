'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // DEV ONLY: Bypass auth on localhost for debugging
  /*
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      const mockUser = {
        uid: "dev-user",
        email: "dev@localhost",
        displayName: "Dev User"
      } as User;
      setUser(mockUser);
      setLoading(false);
    }
  }, []);
  */

  useEffect(() => {
    // Only run Firebase auth logic if not on localhost (dev bypass)
    /*
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      return;
    }
      */

    // Handle redirect result for mobile browsers
    const handleRedirectResult = async () => {
      try {
        const { getRedirectResult } = await import('firebase/auth');
        const result = await getRedirectResult(auth);
        if (result) {
          // User signed in via redirect
          setUser(result.user);
        }
      } catch (error) {
        console.error('Redirect sign-in error:', error);
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // Add mobile-friendly settings
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    try {
      await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      // Handle mobile-specific errors
      const firebaseError = error as { code?: string };
      if (firebaseError.code === 'auth/popup-blocked' || firebaseError.code === 'auth/popup-closed-by-user') {
        // Fallback for mobile browsers that block popups
        const { signInWithRedirect } = await import('firebase/auth');
        await signInWithRedirect(auth, provider);
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user: user ?? null,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
