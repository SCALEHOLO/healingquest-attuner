'use client';

import Image from 'next/image';
import { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <section className="screen-dynamic bg-black text-white relative overflow-hidden">
      {/* Background Image - Optimized for mobile and desktop */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/1.jpg"
          alt="ATTUNER.ai Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover gpu-accelerated"
          priority
          loading="eager"
          sizes="100vw"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Content Container - Positioned on top */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8  ">
        {/* Festival Badge */}
        <div className="w-full flex justify-center pt-1 sm:pt-2 px-2">
          <p
            className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center tracking-tighter"
            style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.7)'
            }}
          >
            ✨ NBJ Summit • Palos Verdes 2025
          </p>
        </div>

        {/* Center SVG */}
        <div className=" w-fit absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Image
              src="/healingQuest/hero section Logo.png"
              alt="Center Logo"
              width={600}
              height={600}
              className="min-w-[400px] h-auto "
              loading="eager"
              sizes=""
            />
        </div>

        {/* Spacer to push heading to bottom */}
        <div className="flex-1"></div>

        {/* Bottom Content - Absolutely at the bottom */}
        <div className="w-full flex flex-col items-center pb-1 sm:pb-2 mb-16 sm:mb-0">
          {/* Main Heading - At the very bottom */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center px-4 tracking-tighter"
            style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.7)'
            }}
          >
            How Whole are You?
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero; 