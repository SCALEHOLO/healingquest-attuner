'use client';

import React from 'react';
import Image from 'next/image';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-md">
            <Image
              src="/assets/1.svg"
              alt="ATTUNER.ai Logo"
              width={64}
              height={64}
              className="rounded-xl mx-auto mb-6"
            />
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm mb-2">
                There was an issue loading the application.
              </p>
              <p className="text-red-300 text-xs">
                This might be due to browser settings or network issues.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold rounded-full hover:from-cyan-300 hover:to-purple-300 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 