'use client';

import Image from 'next/image';
import Button from './Button';

const DiscoverProfile = () => {
  return (
    <section className=" text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 !pt-0">
      <div className="max-w-4xl mx-auto">

        {/* Main Content Card */}
        <div className="bg-[#2c2b72] backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center mb-12 sm:mb-16 lg:mb-20 gpu-accelerated">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
            Discover Your<br />
            Wholeness Profile
          </h2>

          <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto">
            Take our 2-minute assessment to understand how you naturally attune to the four dimensions of holistic awareness.
          </p>

          <Button href="/login">
            Get Started
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center">
          {/* Footer Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <Image
              src="/healingQuest/hero section Logo.png"
              alt="HOLO Footer Logo"
              width={489}
              height={503}
              className="w-[15rem] md:w-[20rem]"
              loading="lazy"
              sizes=""
            />
          </div>

          {/* Copyright */}
          <p className="text-white text-[18px] sm:text-sm">
            © 2025 HOLO l.l.c • All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiscoverProfile; 