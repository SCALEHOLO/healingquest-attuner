'use client';

import Image from 'next/image';

const WhatIsHolo = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 bg-[#2a3485] pt-[6rem] lg:pt-[4rem] ">
      <div className="max-w-7xl mx-auto">

        {/* Get Started Button - At very top of section */}
        <div className="text-center mb-5 pt-6 sm:mb-1  lg:mb-[60px] lg:pt-[60px]">
          {/* <a href="/login" className="inline-block transition-all transform hover:scale-105 gpu-accelerated"> 
            <Image
              src="/assets2/1.svg"
              alt="Get Started"
              width={300}
              height={100}
              className="w-[250px] h-auto sm:w-[300px] cursor-pointer gpu-accelerated"
              loading="lazy"
              sizes="(max-width: 640px) 250px, 300px"
            />
          </a> */}
          {/* <a className="inline-block rounded-full px-10 py-4 text-lg text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#b57e03] via-yellow-400 to-[#b57e03] shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:brightness-110  text-[25px] font-bold w-max" href="/login">Get Started</a> */}
        </div>

        <div className='bg-[#2c2b72] px-[20px] py-[57px]  md:px-[50px] md:py-[20px] md:pt-[6rem] lg:pt-[4rem]  rounded-[25px]'>
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-5 lg:mt-5">
            <div className="inline-flex items-center justify-center px-2">
              {/* Combined Title Line */}
              <div className="flex items-center justify-center flex-nowrap    text-white ">
                <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold whitespace-nowrap mr-[-2rem]">
                  What is
                </h2>
                <Image
                  src="/healingQuest/whatISholoLogo.png"
                  alt="HOLO ATTUNER"
                  width={300}
                  height={300}
                  className="mt-[-8rem] max-md:ml-[1rem] md:mt-[-11rem] "
                  loading="lazy"
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 240px, 300px"
                />
                <Image
                  src="/healingQuest/ATTUNER.png"
                  alt="ATTUNER"
                  width={300}
                  height={300}
                  className=" ml-[-1rem] "
                  loading="lazy"
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 240px, 300px"
                />
              </div>
            </div>
          </div>

          {/* Main Content - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-8 sm:mb-12 lg:mb-16">

            {/* Left Side - Text Content */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Traditional healing operates in fragmented silos - separate models for separate tasks, blind to human wholeness.
                HOLO HEALINGQUEST represents a consciousness revolution toward integrated wholeness - with a personal AI Wholness Mentor that perceives and responds to your complete existence as a unified, aware entity.
              </p>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                <span className="font-bold text-white">HOLO HEALINGQUEST ATTUNER™</span>
                maps your unique wholeness signature across eight sacred dimensions:
              </p>
              {/* Dimensions List */}
              <div className="text-white">
                <div className="inline-block items-center space-x-1  mr-5">
                  <span className="text-pink-400 text-lg">🧠</span>
                  <span className="font-medium">MENTAL</span>
                </div>
                <div className="inline-block items-center space-x-1  mr-5">
                  <span className="text-red-400 text-lg">❤️</span>
                  <span className="font-medium">EMOTIONAL</span>
                </div>
                <div className="inline-block items-center space-x-1  mr-5">
                  <span className="text-blue-400 text-lg">💪</span>
                  <span className="font-medium">PHYSICAL</span>
                </div>
                <div className="inline-block items-center space-x-1  mr-5">
                  <span className="text-green-400 text-lg">🤝</span>
                  <span className="font-medium">RELATIONAL</span>
                </div>
                <div className="inline-block items-center space-x-1  mr-5">
                  <span className="text-emerald-400 text-lg">🌍</span>
                  <span className="font-medium">ENVIRONMENTAL</span>
                </div>
                <div className="inline-block items-center space-x-1  mr-5">
                  <span className="text-yellow-400 text-lg">💰</span>
                  <span className="font-medium">FINANCIAL</span>
                </div>
                <div className="inline-block items-center space-x-1  mr-5">
                  <span className="text-purple-400 text-lg">✨</span>
                  <span className="font-medium">SPIRITUAL</span>
                </div>
                <div className="inline-block items-center space-x-1  mr-5">
                  <span className="text-indigo-400 text-lg">🎯</span>
                  <span className="font-medium">PROFESSIONAL</span>
                </div>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                This is your <span className="font-bold text-white">LLM of Self</span> - the Language of Light within you that HOLO learns to speak by interacting with you, creating AI that doesn&apos;t just assist, but truly knows your soul.
              </p>
            </div>

            {/* Right Side - Diagram */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <Image
                src="/assets/7.svg"
                alt="HOLO Consciousness Diagram"
                width={500}
                height={500}
                className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] gpu-accelerated"
                loading="lazy"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, 500px"
              />
            </div>
          </div>
          {/* <a className="inline-block rounded-full px-10 py-4 text-lg text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#b57e03] via-yellow-400 to-[#b57e03] shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:brightness-110  absolute bottom-0 left-[50%] translate-y-[50%] translate-x-[-50%] text-[25px] font-bold w-max" href="/login">Start Your Journey</a> */}
        </div>
      </div>
    </section>
  );
};

export default WhatIsHolo; 