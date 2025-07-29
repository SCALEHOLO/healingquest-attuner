'use client';

import Button from './Button';

const FeatureCard = ({ emoji, title, description }: { emoji: string; title: string; description: string }) => (
  <div className="bg-[#2c2b72] backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex flex-col h-full min-h-[200px] sm:min-h-[220px] gpu-accelerated rounded-[20px]">
    <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-2 flex items-center  text-2xl sm:text-3xl lg:text-4xl">
      {emoji}
    </div>
    <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{description}</p>
  </div>
);

const FourDimensions = () => {
  return (
    <section className="text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-[100px]">
      <div className="max-w-7xl mx-auto">
        
        {/* Four Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <FeatureCard 
            emoji="🌐" 
            title="HOLISTIC" 
            description="See the whole system, not just parts" 
          />
          <FeatureCard 
            emoji="🔗" 
            title="INTEGRATED" 
            description="Connect different domains of knowledge" 
          />
          <FeatureCard 
            emoji="🧠" 
            title="CONSCIOUS" 
            description="Present-moment awareness and depth" 
          />
          <FeatureCard 
            emoji="🌐" 
            title="RESONANT" 
            description="Alignment with deeper patterns" 
          />
        </div>

        {/* Ready to Explore Section */}
        <div className="text-center max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 mt-6 sm:mb-8 sm:mt-8 lg:mb-16 lg:mt-16 leading-tight">
            Ready to Explore Your Wholeness?
          </h2>
          
          <Button href="/login">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FourDimensions; 