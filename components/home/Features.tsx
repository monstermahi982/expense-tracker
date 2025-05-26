"use client";

import { useEffect, useRef } from 'react';
import { LineChart, PieChart, Calendar, Tag, Building, DollarSign, TrendingUp, Clock, Filter, CheckCircle } from 'lucide-react';

export default function Features() {
  const featureRef = useRef<HTMLDivElement>(null);
  
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

    const elements = document.querySelectorAll('.feature-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={featureRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[30%] -right-[20%] w-[50%] h-[50%] rounded-full bg-primary-5 blur-3xl"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary-5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 translate-y-10 feature-animate transition-all duration-700">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-10 text-primary font-medium text-sm mb-4">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything You Need to Master Your Finances
          </h2>
          <p className="text-muted-foreground text-lg">
            NeoTrack combines powerful expense tracking with intuitive analysis tools to give you complete control over your financial life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="neopop-card rounded-xl p-6 bg-card opacity-0 translate-y-10 feature-animate transition-all duration-700 delay-100">
            <div className="w-12 h-12 rounded-lg bg-primary-10 flex items-center justify-center text-primary mb-5">
              <Building size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Bank Account Integration</h3>
            <p className="text-muted-foreground mb-4">
              Connect multiple bank accounts to track all your finances in one place. Automatically import and categorize transactions.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Support for 1000+ banks worldwide</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Secure, read-only connections</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Real-time balance updates</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 2 */}
          <div className="neopop-card rounded-xl p-6 bg-card opacity-0 translate-y-10 feature-animate transition-all duration-700 delay-200">
            <div className="w-12 h-12 rounded-lg bg-primary-10 flex items-center justify-center text-primary mb-5">
              <Tag size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Expense Tagging</h3>
            <p className="text-muted-foreground mb-4">
              Categorize expenses with custom tags like "essential," "wasteful," or "business" to understand your spending habits better.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Custom tag creation</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Auto-tagging rules</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Tag-based insights and reports</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 3 */}
          <div className="neopop-card rounded-xl p-6 bg-card opacity-0 translate-y-10 feature-animate transition-all duration-700 delay-300">
            <div className="w-12 h-12 rounded-lg bg-primary-10 flex items-center justify-center text-primary mb-5">
              <LineChart size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Comprehensive Analytics</h3>
            <p className="text-muted-foreground mb-4">
              Gain insights with powerful analytics. View spending patterns, track changes over time, and identify areas for improvement.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Visual spending breakdowns</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Month-to-month comparisons</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Trend identification</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 4 */}
          <div className="neopop-card rounded-xl p-6 bg-card opacity-0 translate-y-10 feature-animate transition-all duration-700 delay-400">
            <div className="w-12 h-12 rounded-lg bg-primary-10 flex items-center justify-center text-primary mb-5">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Flexible Time Periods</h3>
            <p className="text-muted-foreground mb-4">
              Analyze your finances by month, quarter, or year. Set custom date ranges to track spending for specific periods or events.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Monthly, quarterly, yearly views</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Custom date range selection</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Period-over-period comparisons</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 5 */}
          <div className="neopop-card rounded-xl p-6 bg-card opacity-0 translate-y-10 feature-animate transition-all duration-700 delay-500">
            <div className="w-12 h-12 rounded-lg bg-primary-10 flex items-center justify-center text-primary mb-5">
              <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Income Tracking</h3>
            <p className="text-muted-foreground mb-4">
              Track your salary and other income sources to understand your complete financial picture and monitor your savings rate.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Multiple income source tracking</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Income vs. expense comparison</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Savings rate calculation</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 6 */}
          <div className="neopop-card rounded-xl p-6 bg-card opacity-0 translate-y-10 feature-animate transition-all duration-700 delay-600">
            <div className="w-12 h-12 rounded-lg bg-primary-10 flex items-center justify-center text-primary mb-5">
              <Filter size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Advanced Filtering</h3>
            <p className="text-muted-foreground mb-4">
              Drill down into your spending with powerful filters. Find specific transactions, analyze categories, or focus on particular time periods.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Multi-criteria filtering</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Save favorite filters</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                <span>Export filtered results</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}