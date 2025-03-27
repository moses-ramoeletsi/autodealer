
import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Business Owner',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    quote: 'AutoElite provided an exceptional car buying experience. Their selection of premium vehicles is unmatched, and the staff was knowledgeable and attentive to my needs. I found my dream car with minimal hassle.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    quote: 'I was impressed by the transparent pricing and no-pressure sales approach. The purchasing process was streamlined and efficient, allowing me to drive off with my new car the same day. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Marketing Director',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    quote: 'The attention to detail at AutoElite sets them apart from other dealerships. From the immaculate showroom to the thorough vehicle inspections, everything speaks of quality and professionalism.',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Financial Analyst',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    quote: 'After researching several dealerships, I chose AutoElite for their reputation and selection. The financing options were flexible and competitive, and the entire team made me feel valued as a customer.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    
    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials-section" className="section-container bg-gradient-to-b from-background to-secondary/30">
      <div className={`flex flex-col items-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <span className="text-sm font-medium text-primary mb-2">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What Our Customers Say</h2>
        <p className="text-muted-foreground text-center max-w-2xl">
          Don't just take our word for it. Hear from our satisfied customers about their 
          experiences with AutoElite.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 p-4">
                  <div className={`bg-white rounded-xl p-8 shadow-sm ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
                    <div className="flex items-center mb-6">
                      <div className="flex mr-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={star <= testimonial.rating ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`w-5 h-5 ${star <= testimonial.rating ? 'text-yellow-500' : 'text-muted-foreground'}`}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-lg italic mb-6 text-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-secondary transition-colors md:flex hidden"
            onClick={() => setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-secondary transition-colors md:flex hidden"
            onClick={() => setActiveIndex((current) => (current + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? 'bg-primary' : 'bg-secondary hover:bg-primary/30'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
