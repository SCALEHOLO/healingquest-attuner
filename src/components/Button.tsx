'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, href, onClick, className = '', disabled = false }: ButtonProps) => {
  const baseClasses = `inline-block rounded-full px-10 py-4 font-bold text-lg text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#b57e03] via-yellow-400 to-[#b57e03] shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:brightness-110 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  if (href) {
    return (
      <Link 
        href={href} 
        className={`${baseClasses} ${className}`}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 