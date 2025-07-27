'use client';

import Image from 'next/image';
import { useEffect } from 'react';

const SuccessStory = () => {
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
        <>
            <section className="screen-dynamic bg-black text-white  overflow-hidden relative p-[2rem]  md:px-[6rem] md:py-[4rem] ">
                {/* Background Image - Optimized for mobile and desktop */}
                <div className="absolute inset-0 ">
                    <video
                        src="/healingQuest/signal-2025-07-26-115246.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                </div>
                <div className='max-w-[1280px] mx-auto '>

                    {/* Content Container - Positioned on top */}
                    <div className="relative  z-10 flex max-md:gap-[1rem] flex-col md:flex-row  bg-[url('/healingQuest/successBg.png')] bg-cover pl-[2rem] max-md:pr-[2rem] pr-[1px]  py-[2rem] max-md:min-h-[78rem]  ">
                        {/* <Image
                        src=""
                        alt="Center Logo"
                        width={1920}
                        height={1020}
                        className="w-full h-full object-cover absolute inset-0 "
                        loading="eager"
                        sizes=""
                    />
                     */}
                        <div className=" flex gap-[1rem] flex-col items-center md:max-w-[50%]   ">
                            {/* Main Heading - At the very bottom */}
                            <h1
                                className="text-4xl sm:text-6xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-center md:px-4 tracking-tighter pb-[1rem] "
                                style={{
                                    textShadow: '4px 4px 8px rgba(0,0,0,0.7)'
                                }}
                            >
                                Success Story
                            </h1>
                            <Image
                                src="/healingQuest/whatIsHealingQuestSectionLogo.png"
                                alt="Center Logo"
                                width={503}
                                height={447}
                                className="w-[80%] lg:w-[70%]"
                                loading="eager"
                                sizes=""
                            />
                            <p>
                                <strong className='text-[#ffde59]'> Healing Quest</strong> Television, Radio and Podcasts deliver ancient wisdom & cutting edge technology for Mind, Body and Soul. Including Plant Medicine,Energy Medicine, Herbal Insights,Quantum Healing and Emotional Fitness. Contact Judy Brooks 707 338-8501 for more info.
                            </p>
                        </div>
                        <div className='md:w-1/2'>
                            <div className=''>
                                <div className=' '>
                                    <p>
                                        <strong className='text-[#ffde59]'> Healing Quest</strong> Healing Quest Healing Quest creators and hosts Judy Brooks and Roy Walkenhorst  have been trusted guides for decades in the world of holistic wellness.

                                    </p>
                                </div>
                                <div className='flex flex-col md:flex-row max-md:gap-6 justify-between p-[1rem]'>
                                    <div>
                                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center tracking-tight leading-tight" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            30
                                        </h1>
                                        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center tracking-tight mt-[-0.5rem]" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            Million
                                        </h1>
                                        <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-center tracking-tight mt-[-0.3rem]" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            VIEWERS
                                        </h1>
                                    </div>

                                    <div className=' gap-1 items-center'>
                                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center tracking-tight leading-tight" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            13
                                        </h1>
                                        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center tracking-tight mt-[-0.5rem]" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            Seasons
                                        </h1>
                                        <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-center tracking-tight mt-[-0.3rem]" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            SO FAR...
                                        </h1>
                                    </div>

                                    <div>
                                        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center tracking-tight leading-tight" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            146
                                        </h1>
                                        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center tracking-tight mt-[-0.5rem]" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            Stations
                                        </h1>
                                        <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-center tracking-tight mt-[-0.3rem]" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.7)' }}>
                                            CLEARED
                                        </h1>
                                    </div>
                                </div>

                            </div>
                            <div className="  w-full h-full bg-contain bg-no-repeat bg-center md:absolute  md:right-0 md:h-[91%] lg:h-full " >
                                <div className="relative overflow-visible">
                                    <Image
                                        src="/healingQuest/JUDY__MICHELLE.webp"
                                        alt="Center Logo"
                                        width={580}
                                        height={384.25}
                                        className="w-full md:translate-y-[-5px] md:h-[404.25px] md:w-[900px]"
                                        loading="eager"
                                        sizes="(min-width: 768px) 900px, 100vw"
                                    />
                                    <Image
                                        src="/healingQuest/signal-2025-07-26-112011.jpeg"
                                        alt="Center Logo"
                                        width={444}
                                        height={224}
                                        className="absolute z-[10] right-[-10px] md:right-[0px] bottom-[0px] md:bottom-[5px] h-[3.5rem]  w-[7rem] md:h-[4.5rem]   lg:h-[7rem]  lg:w-[14rem] md:mr-[-0rem] "
                                        loading="eager"
                                        sizes=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SuccessStory; 