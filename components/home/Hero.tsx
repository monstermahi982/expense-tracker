"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, DollarSign, PieChart, LineChart, Clock } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute -top-[40%] -left-[30%] w-[80%] h-[80%] rounded-full bg-primary-5 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[30%] w-[70%] h-[70%] rounded-full bg-primary-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="opacity-0 translate-y-10 animate-on-scroll transition-all duration-700">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-10 text-primary font-medium text-sm mb-6 border border-primary/20">
              🚀 Smart Expense Tracking Made Simple
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Take Control of Your
              <span className="relative ml-3">
                <span className="relative z-10 text-primary">Finances</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary-20 rounded-full z-0"></span>
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Track expenses, manage multiple accounts, analyze spending patterns, and make smarter financial decisions with NeoTrack's powerful tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup" 
                className="neopop-btn px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 text-lg"
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              
              <Link 
                href="#how-it-works" 
                className="px-6 py-3 rounded-md border border-border text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2"
              >
                See How It Works
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">5M+</div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">Banks</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="opacity-0 translate-y-10 animate-on-scroll transition-all duration-1000 delay-300">
              <div className="relative w-full h-[500px] neopop-card rounded-xl bg-card p-4 z-20 animate-float">
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="text-lg font-bold">Expense Dashboard</div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="mt-10 grid grid-cols-2 gap-4">
                  <div className="neopop-card bg-card rounded-lg p-4 h-36">
                    <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
                    <div className="text-2xl font-bold">₹29,747.14</div>
                    <div className="text-xs text-green-500 flex items-center mt-1">
                      <span className="inline-block mr-1">↑</span>₹240.94 this month
                    </div>
                    <div className="mt-4">
                      <div className="w-full h-2 bg-primary-10 rounded-full">
                        <div className="h-full w-3/4 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="neopop-card bg-card rounded-lg p-4 h-36">
                    <div className="text-sm text-muted-foreground mb-1">Monthly Spending</div>
                    <div className="text-2xl font-bold">₹17,361.00</div>
                    <div className="text-xs text-red-500 flex items-center mt-1">
                      <span className="inline-block mr-1">↑</span>442.5% from last month
                    </div>
                    <div className="mt-4 flex-1 flex items-end">
                      <div className="flex h-12 w-full items-end justify-between gap-1">
                        <div className="w-1/6 h-4/6 bg-primary-20 rounded-t-sm"></div>
                        <div className="w-1/6 h-3/6 bg-primary-30 rounded-t-sm"></div>
                        <div className="w-1/6 h-5/6 bg-primary-40 rounded-t-sm"></div>
                        <div className="w-1/6 h-2/6 bg-primary-50 rounded-t-sm"></div>
                        <div className="w-1/6 h-6/6 bg-primary-70 rounded-t-sm"></div>
                        <div className="w-1/6 h-5/6 bg-primary rounded-t-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="neopop-card bg-card rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium">Spending by Category</div>
                      <div className="text-xs text-muted-foreground">Total: ₹2,823.90</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 relative">
                        <div 
                          className="absolute inset-0 rounded-full" 
                          style={{ 
                            background: 'conic-gradient(hsl(var(--chart-1)) 0% 69%, hsl(var(--chart-2)) 69% 78%, hsl(var(--chart-3)) 78% 87%, hsl(var(--chart-4)) 87% 94%, hsl(var(--chart-5)) 94% 100%)',
                          }}
                        ></div>
                        <div className="absolute inset-[6px] bg-card rounded-full"></div>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div>
                          <div className="text-xs">Housing (69%)</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]"></div>
                          <div className="text-xs">Food (9%)</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))]"></div>
                          <div className="text-xs">Transport (9%)</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-4))]"></div>
                          <div className="text-xs">Health (7%)</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-5))]"></div>
                          <div className="text-xs">Shopping (6%)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="neopop-card bg-card rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium">Recent Expenses</div>
                      <div className="text-xs text-primary">View All</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-20 flex items-center justify-center">
                            <DollarSign size={12} />
                          </div>
                          <div>Grocery Shopping</div>
                        </div>
                        <div className="font-medium">₹156.23</div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-20 flex items-center justify-center">
                            <Clock size={12} />
                          </div>
                          <div>Monthly Rent</div>
                        </div>
                        <div className="font-medium">₹1,800.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 -right-6 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary-40 blur-2xl z-10"></div>
              <div className="absolute bottom-1/4 -left-4 transform -translate-x-1/2 translate-y-1/2 w-20 h-20 rounded-full bg-[hsl(var(--chart-1))] blur-2xl opacity-30 z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}