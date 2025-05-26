"use client";

import { useEffect, useRef } from 'react';

export default function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            
            // Start counter animation when section is visible
            const counters = entry.target.querySelectorAll('.counter-value');
            counters.forEach(counter => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              const duration = 2000; // Animation duration in milliseconds
              const start = 0;
              const startTime = Date.now();
              
              const updateCounter = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                
                if (elapsed < duration) {
                  const value = Math.floor((elapsed / duration) * (target - start) + start);
                  counter.textContent = value.toString();
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target.toString();
                }
              };
              
              updateCounter();
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={statsRef}
      className="py-20 relative opacity-0 translate-y-10 transition-all duration-700"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-primary-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              <span className="counter-value" data-target="10">0</span>K+
            </div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              <span className="counter-value" data-target="50">0</span>M+
            </div>
            <div className="text-muted-foreground">Transactions Tracked</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              <span className="counter-value" data-target="1000">0</span>+
            </div>
            <div className="text-muted-foreground">Banks Supported</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              ₹<span className="counter-value" data-target="250">0</span>M
            </div>
            <div className="text-muted-foreground">Monthly Savings</div>
          </div>
        </div>
      </div>
    </section>
  );
}