"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthModals } from '@/components/auth/AuthModals';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; view: 'login' | 'register' }>({
    isOpen: false,
    view: 'login'
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if dark mode is preferred
    if (typeof window !== 'undefined') {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md py-3 shadow-md' 
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              Neo<span className="text-foreground">Track</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#features" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link 
              href="#testimonials" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button 
                onClick={() => setAuthModal({ isOpen: true, view: 'login' })}
                className="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary-10 transition-colors"
              >
                Log In
              </button>
              
              <button 
                onClick={() => setAuthModal({ isOpen: true, view: 'register' })}
                className="neopop-btn px-4 py-2 rounded-md font-medium"
              >
                Sign Up
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 top-[60px] bg-background/95 backdrop-blur-sm z-40 md:hidden">
              <nav className="container mx-auto px-4 py-8 flex flex-col gap-6 animate-slide-up">
                <Link 
                  href="#features" 
                  className="text-xl text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="text-xl text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  href="#testimonials" 
                  className="text-xl text-foreground/80 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
                
                <div className="flex flex-col gap-4 mt-4">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setAuthModal({ isOpen: true, view: 'login' });
                    }}
                    className="w-full px-4 py-3 rounded-md border border-primary text-primary hover:bg-primary-10 transition-colors text-center"
                  >
                    Log In
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setAuthModal({ isOpen: true, view: 'register' });
                    }}
                    className="neopop-btn w-full px-4 py-3 rounded-md font-medium text-center"
                  >
                    Sign Up
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModals 
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        defaultView={authModal.view}
      />
    </>
  );
}