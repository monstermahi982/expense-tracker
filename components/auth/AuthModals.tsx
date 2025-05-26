"use client";

import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Lock, Loader2 } from 'lucide-react';

export function AuthModals({
  isOpen,
  onClose,
  defaultView = 'login'
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register';
}) {
  const [view, setView] = useState<'login' | 'register'>(defaultView);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your authentication logic here
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: view === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: view === 'login' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">
                  {view === 'login' ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {view === 'login' 
                    ? 'Enter your credentials to access your account' 
                    : 'Fill in your details to get started'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {view === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="name" 
                        placeholder="Enter your name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {view === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="Enter your phone number"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="neopop-btn w-full py-2 rounded-md font-medium flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {view === 'login' ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    view === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setView(view === 'login' ? 'register' : 'login')}
                    className="text-primary hover:underline text-sm"
                  >
                    {view === 'login' 
                      ? "Don't have an account? Sign up" 
                      : 'Already have an account? Sign in'}
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}