"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { DollarSign, PieChart, BarChart, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

    const elements = document.querySelectorAll('.step-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-accent/50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 opacity-0 translate-y-10 step-animate transition-all duration-700">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-10 text-primary font-medium text-sm mb-4">
            How NeoTrack Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take Control of Your Finances in 3 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg">
            Getting started with NeoTrack is easy. Connect your accounts, categorize your expenses, and gain valuable insights in minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center opacity-0 translate-y-10 step-animate transition-all duration-700 delay-100">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary-20 flex items-center justify-center mb-6 animate-pulse-slow">
                <div className="w-16 h-16 rounded-full bg-primary-30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <DollarSign size={24} />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Connect Your Accounts</h3>
            <p className="text-muted-foreground mb-6">
              Link your bank accounts, credit cards, and other financial accounts to automatically import all your transactions in one secure place.
            </p>
            
            <div className="w-full max-w-xs h-48 neopop-card bg-card rounded-lg p-4 relative">
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="text-sm font-bold">Connected Banks</div>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-500">CB</span>
                    </div>
                    <div className="text-sm">Chase Bank</div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-red-500">WF</span>
                    </div>
                    <div className="text-sm">Wells Fargo</div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-purple-500">HD</span>
                    </div>
                    <div className="text-sm">HDFC Bank</div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                
                <button className="w-full mt-2 text-sm text-primary flex items-center justify-center gap-1">
                  Add New <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center opacity-0 translate-y-10 step-animate transition-all duration-700 delay-200">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary-20 flex items-center justify-center mb-6 animate-pulse-slow">
                <div className="w-16 h-16 rounded-full bg-primary-30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <PieChart size={24} />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Track & Categorize Expenses</h3>
            <p className="text-muted-foreground mb-6">
              Automatically categorize transactions and add custom tags to understand where your money is going. Track spending patterns over time.
            </p>
            
            <div className="w-full max-w-xs h-48 neopop-card bg-card rounded-lg p-4 relative">
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="text-sm font-bold">Recent Expenses</div>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-xs">🛒</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium">Grocery Shopping</div>
                      <div className="text-[10px] text-muted-foreground">Food</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium">₹156.23</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xs">🏠</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium">Monthly Rent</div>
                      <div className="text-[10px] text-muted-foreground">Housing</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium">₹1,800.00</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-xs">📱</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium">Phone Bill</div>
                      <div className="text-[10px] text-muted-foreground">Utilities</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium">₹89.99</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center opacity-0 translate-y-10 step-animate transition-all duration-700 delay-300">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary-20 flex items-center justify-center mb-6 animate-pulse-slow">
                <div className="w-16 h-16 rounded-full bg-primary-30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <BarChart size={24} />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Analyze & Optimize</h3>
            <p className="text-muted-foreground mb-6">
              Get powerful insights with detailed analytics. View reports by month, quarter, or year to understand your spending habits and save more.
            </p>
            
            <div className="w-full max-w-xs h-48 neopop-card bg-card rounded-lg p-4 relative">
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="text-sm font-bold">Monthly Analysis</div>
              </div>
              
              <div className="mt-10 flex-1 flex flex-col justify-center">
                <div className="flex h-20 w-full items-end justify-between gap-1">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-12 bg-primary-20 rounded-t-sm"></div>
                    <div className="text-[9px] mt-1">Jan</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-primary-30 rounded-t-sm"></div>
                    <div className="text-[9px] mt-1">Feb</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-14 bg-primary-40 rounded-t-sm"></div>
                    <div className="text-[9px] mt-1">Mar</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-6 bg-primary-50 rounded-t-sm"></div>
                    <div className="text-[9px] mt-1">Apr</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-16 bg-primary-70 rounded-t-sm"></div>
                    <div className="text-[9px] mt-1">May</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-10 bg-primary rounded-t-sm"></div>
                    <div className="text-[9px] mt-1">Jun</div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Expenses</span>
                  </div>
                  <div className="text-xs text-primary">View Details</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}