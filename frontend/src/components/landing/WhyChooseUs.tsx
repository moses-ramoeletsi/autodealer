
import React, { useState, useEffect } from 'react';

const WhyChooseUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('why-choose-us-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="why-choose-us-section" className="bg-secondary py-24">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <img
                src="https://images.unsplash.com/photo-1566473965997-3de9c817e938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Car dealership"
                className="rounded-lg shadow-lg object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl max-w-xs hidden md:block">
                <div className="flex gap-4 items-center">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                      >
                        <img
                          src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`}
                          alt={`Customer ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium">Trusted by</div>
                    <div className="text-2xl font-bold text-primary">1,000+</div>
                    <div className="text-xs text-muted-foreground">Happy customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={isVisible ? 'animate-fade-in' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
            <span className="text-sm font-medium text-primary">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              The Ultimate Car Buying Experience
            </h2>
            <p className="text-muted-foreground mb-8">
              We strive to provide the most exceptional car purchasing journey, prioritizing your 
              satisfaction and peace of mind at every step. Our commitment to excellence ensures 
              you drive away with the perfect vehicle for your needs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureCard
                icon="check"
                title="Quality Assurance"
                description="Every vehicle undergoes a rigorous 150-point inspection process"
                isVisible={isVisible}
                delay={0.3}
              />
              <FeatureCard
                icon="shield"
                title="Warranty Coverage"
                description="Comprehensive warranty packages for worry-free ownership"
                isVisible={isVisible}
                delay={0.4}
              />
              <FeatureCard
                icon="trending-up"
                title="Competitive Pricing"
                description="Market-leading prices with transparent financing options"
                isVisible={isVisible}
                delay={0.5}
              />
              <FeatureCard
                icon="headphones"
                title="Dedicated Support"
                description="Expert assistance throughout your car buying journey"
                isVisible={isVisible}
                delay={0.6}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: 'check' | 'shield' | 'trending-up' | 'headphones';
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, isVisible, delay }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'trending-up':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        );
      case 'headphones':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`group p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="p-3 bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default WhyChooseUs;
