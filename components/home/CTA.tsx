"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function CTA() {
  const ctaRef = useRef<HTMLDivElement>(null);
  
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

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={ctaRef}
      className="py-20 md:py-32 relative opacity-0 translate-y-10 transition-all duration-700"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="neopop-card bg-card rounded-xl p-8 md:p-12 gradient-border overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary-10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary-10 blur-3xl"></div>
            
            <div className="relative text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users who are saving more and spending smarter with NeoTrack's powerful expense tracking tools.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  <span className="mr-2">🚀</span> Start for Free
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>Connect up to 3 bank accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>Unlimited expense tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>Basic analytics and reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>30-day premium trial</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">
                  <span className="mr-2">⭐</span> Premium Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>Unlimited bank connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>Advanced analytics and insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>Custom budget planning tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span>Priority customer support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link 
                href="/signup" 
                className="neopop-btn px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 text-lg"
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              
              <Link 
                href="/login" 
                className="px-8 py-3 rounded-md border border-primary text-primary hover:bg-primary-10 transition-colors flex items-center justify-center gap-2"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}