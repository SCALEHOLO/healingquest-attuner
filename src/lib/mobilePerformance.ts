// Extend Window interface to include opera property
declare global {
  interface Window {
    opera?: string;
  }
}

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';
  
  // Check for mobile devices
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = mobileRegex.test(userAgent);
  
  // Check for small screen sizes
  const isSmallScreen = window.innerWidth <= 768;
  
  // Check for touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobile || (isSmallScreen && isTouchDevice);
};

// Extend Navigator interface for device capabilities
declare global {
  interface Navigator {
    deviceMemory?: number;
    connection?: {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
    };
  }
}

export const isLowEndDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for low memory devices
  const memory = navigator.deviceMemory;
  if (memory && memory <= 4) return true;
  
  // Check for slow connection
  const connection = navigator.connection;
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true;
  }
  
  // Check for low-end processors (rough heuristic)
  const hardwareConcurrency = navigator.hardwareConcurrency;
  if (hardwareConcurrency && hardwareConcurrency <= 2) return true;
  
  return false;
};

export const shouldUsePerformanceMode = (): boolean => {
  return isMobileDevice() || isLowEndDevice();
};

export const applyPerformanceOptimizations = (): void => {
  if (typeof document === 'undefined') return;
  
  if (shouldUsePerformanceMode()) {
    // Add performance mode class to body
    document.body.classList.add('mobile-performance-mode');
    
    // Reduce animations for better performance
    const style = document.createElement('style');
    style.textContent = `
      .mobile-performance-mode * {
        animation-duration: 0.1s !important;
        animation-delay: 0s !important;
        transition-duration: 0.1s !important;
      }
      
      .mobile-performance-mode .backdrop-blur-xl {
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
      }
      
      .mobile-performance-mode .backdrop-blur-sm {
        backdrop-filter: blur(4px) !important;
        -webkit-backdrop-filter: blur(4px) !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// Extend CSSStyleDeclaration for webkit properties
declare global {
  interface CSSStyleDeclaration {
    webkitOverflowScrolling?: string;
  }
}

export const enableSmoothScrolling = (): void => {
  if (typeof document === 'undefined') return;
  
  // Add smooth scrolling class to html
  document.documentElement.classList.add('smooth-scroll');
  
  // Prevent scroll bounce on iOS
  document.body.style.overscrollBehavior = 'none';
  
  // Enable momentum scrolling on iOS
  document.body.style.webkitOverflowScrolling = 'touch';
}; 