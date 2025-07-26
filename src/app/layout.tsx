import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://attuner-ai.vercel.app'),
  title: "ATTUNER.ai - Consciousness Profile Assessment",
  description: "Discover your consciousness profile through HOLO (Holistic Optimization and Learning Orchestration). Take our 2-minute assessment to understand how you naturally attune to the four dimensions of holistic awareness.",
  keywords: ["consciousness", "AI", "HOLO", "assessment", "Barcelona", "Festival of Consciousness"],
  authors: [{ name: "ATTUNER.ai" }],
  creator: "ATTUNER.ai",
  publisher: "ATTUNER.ai",
  
  // Open Graph meta tags for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://attuner-ai.vercel.app",
    siteName: "ATTUNER.ai",
    title: "ATTUNER.ai - Consciousness Profile Assessment",
    description: "Discover your consciousness profile through HOLO (Holistic Optimization and Learning Orchestration). Take our 2-minute assessment to understand how you naturally attune to the four dimensions of holistic awareness.",
    images: [
      {
        url: "/assets/1.svg",
        width: 1200,
        height: 630,
        alt: "ATTUNER.ai Logo - Consciousness Profile Assessment",
        type: "image/svg+xml",
      },
      {
        url: "/assets/1.svg",
        width: 800,
        height: 600,
        alt: "ATTUNER.ai Logo",
        type: "image/svg+xml",
      },
    ],
  },
  
  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    site: "@attuner_ai",
    creator: "@attuner_ai",
    title: "ATTUNER.ai - Consciousness Profile Assessment",
    description: "Discover your consciousness profile through HOLO (Holistic Optimization and Learning Orchestration). Take our 2-minute assessment.",
    images: ["/assets/1.svg"],
  },
  
  // Additional meta tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Favicon and app icons
  icons: {
    icon: "/assets/fav.svg",
    shortcut: "/assets/fav.svg",
    apple: "/assets/fav.svg",
  },
  
  // Verification and additional tags
  verification: {
    google: "your-google-verification-code", // You can add this later if needed
  },
  
  // App-specific metadata
  applicationName: "ATTUNER.ai",
  category: "AI Assessment Tool",
  
  // Additional meta tags
  other: {
    "theme-color": "#8B5CF6",
    "msapplication-TileColor": "#8B5CF6",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "ATTUNER.ai",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        <ErrorBoundary>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ErrorBoundary>
        
        {/* Mobile Performance Optimization & Font Loading Check */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Font loading verification
                const checkFontLoading = () => {
                  console.log('🔤 Font Check: Verifying Montserrat font loading...');
                  
                  // Check if CSS variable is available
                  const montserratVar = getComputedStyle(document.documentElement).getPropertyValue('--font-montserrat');
                  console.log('🔤 CSS Variable --font-montserrat:', montserratVar || 'Not found');
                  
                  // Check body classes
                  const bodyClasses = document.body.className;
                  console.log('🔤 Body classes:', bodyClasses);
                  
                  // Check computed font family on body
                  const bodyFontFamily = getComputedStyle(document.body).fontFamily;
                  console.log('🔤 Body font-family:', bodyFontFamily);
                  
                  // Check if font-sans is working
                  const testDiv = document.createElement('div');
                  testDiv.className = 'font-sans';
                  testDiv.style.position = 'fixed';
                  testDiv.style.top = '-9999px';
                  document.body.appendChild(testDiv);
                  const testDivFont = getComputedStyle(testDiv).fontFamily;
                  console.log('🔤 font-sans class font-family:', testDivFont);
                  document.body.removeChild(testDiv);
                  
                  // Test if Montserrat is actually loaded
                  if (document.fonts && document.fonts.check) {
                    const montserratLoaded = document.fonts.check('16px Montserrat');
                    console.log('🔤 Montserrat 16px loaded:', montserratLoaded);
                    
                    // Check different weights
                    const weights = ['300', '400', '500', '600', '700', '800'];
                    weights.forEach(weight => {
                      const loaded = document.fonts.check(\`\${weight} 16px Montserrat\`);
                      console.log(\`🔤 Montserrat \${weight} loaded:\`, loaded);
                    });
                  }
                  
                  // Create test elements with different weights to verify
                  const testContainer = document.createElement('div');
                  testContainer.style.position = 'fixed';
                  testContainer.style.top = '-9999px';
                  testContainer.style.left = '-9999px';
                  testContainer.style.fontFamily = 'Montserrat, sans-serif';
                  
                  const weights = [
                    { weight: '300', name: 'Light' },
                    { weight: '400', name: 'Regular' },
                    { weight: '500', name: 'Medium' },
                    { weight: '600', name: 'SemiBold' },
                    { weight: '700', name: 'Bold' },
                    { weight: '800', name: 'ExtraBold' }
                  ];
                  
                  weights.forEach(({ weight, name }) => {
                    const testEl = document.createElement('span');
                    testEl.textContent = 'Test';
                    testEl.style.fontWeight = weight;
                    testEl.style.fontSize = '16px';
                    testContainer.appendChild(testEl);
                  });
                  
                  document.body.appendChild(testContainer);
                  
                  setTimeout(() => {
                    weights.forEach(({ weight, name }, index) => {
                      const testEl = testContainer.children[index];
                      const computedStyle = getComputedStyle(testEl);
                      console.log(\`🔤 Montserrat \${name} (\${weight}) - Font Family:\`, computedStyle.fontFamily);
                      console.log(\`🔤 Montserrat \${name} (\${weight}) - Font Weight:\`, computedStyle.fontWeight);
                    });
                    document.body.removeChild(testContainer);
                  }, 100);
                };
                
                // Mobile device detection
                const isMobileDevice = () => {
                  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
                  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
                  const isMobile = mobileRegex.test(userAgent);
                  const isSmallScreen = window.innerWidth <= 768;
                  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                  return isMobile || (isSmallScreen && isTouchDevice);
                };
                
                // Apply performance optimizations immediately
                if (isMobileDevice()) {
                  document.body.classList.add('mobile-performance-mode');
                  document.documentElement.classList.add('smooth-scroll');
                  document.body.style.overscrollBehavior = 'none';
                  document.body.style.webkitOverflowScrolling = 'touch';
                }
                
                // Check fonts after DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', checkFontLoading);
                } else {
                  checkFontLoading();
                }
                
                // Also check after fonts are loaded
                if (document.fonts && document.fonts.ready) {
                  document.fonts.ready.then(() => {
                    console.log('🔤 All fonts loaded, re-checking Montserrat...');
                    checkFontLoading();
                  });
                }
              })();
            `
          }}
        />
        
        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ATTUNER.ai",
              "description": "Discover your consciousness profile through HOLO (Holistic Optimization and Learning Orchestration)",
              "url": "https://attuner-ai.vercel.app",
              "applicationCategory": "AI Assessment Tool",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "ATTUNER.ai"
              },
              "image": "/assets/1.svg",
              "screenshot": "/assets/1.svg"
            })
          }}
        />
      </body>
    </html>
  );
}
