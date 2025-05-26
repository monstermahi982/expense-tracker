"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Small Business Owner",
    quote: "NeoTrack has completely transformed how I manage my business finances. The ability to categorize expenses with custom tags helps me separate personal and business spending effortlessly.",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Financial Analyst",
    quote: "As someone who works with financial data all day, I'm impressed by NeoTrack's analytical capabilities. The monthly, quarterly, and yearly views give me a comprehensive understanding of my spending patterns.",
    avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    role: "Software Engineer",
    quote: "The user interface is incredibly intuitive. I love how I can connect all my bank accounts in one place and get a holistic view of my finances. The custom tagging feature is a game-changer.",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4
  },
  {
    id: 4,
    name: "Ananya Singh",
    role: "Marketing Manager",
    quote: "NeoTrack has helped me identify where I'm overspending and make adjustments to my budget. The expense categorization is spot on, and the insights have helped me save significantly each month.",
    avatar: "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={testimonialsRef}
      className="py-20 md:py-32 relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-[30%] w-[60%] h-[60%] rounded-full bg-primary-5 blur-3xl"></div>
        <div className="absolute bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full bg-primary-5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-10 text-primary font-medium text-sm mb-4">
            What Our Users Say
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by Thousands of Finance-Savvy Users
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from our users about how NeoTrack has helped them take control of their finances and achieve their financial goals.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="neopop-card bg-card rounded-xl p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30">
                          <Image 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              size={16}
                              className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}
                            />
                          ))}
                        </div>
                        
                        <p className="text-lg md:text-xl italic mb-4">
                          "{testimonial.quote}"
                        </p>
                        
                        <div>
                          <div className="font-bold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentIndex ? "bg-primary" : "bg-primary-30"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}