import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export default function Login() {
  const { login } = useAuth();
  const [activeRole, setActiveRole] = useState('Store Manager');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'rahul.sharma@safaibazaar.com',
      password: 'password123'
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      login(activeRole, data.email, 'mock-jwt-token-xyz-123');
      toast.success(`${activeRole} login successful!`);
      setIsLoading(false);
    }, 800);
  };

  const rolesList = [
    'Super Admin',
    'Admin',
    'Warehouse Manager',
    'Store Manager',
    'Cashier',
    'Employee'
  ];

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center lg:text-left">
        <img 
          src="https://lh3.googleusercontent.com/aida/AP1WRLvUzjJIzV9zb2B3Y8WIyF0nsWrYM9iiz8QY5MCP1MJJffsRXQ2lzGGdqITRF9NftSZDOpVEj3Ssl0kIo55FkmTbrUQDNwMdOFbWOhefuXGKg5MSygN47g_G9ArsMPGIfUU-WV-zTuYNcmH6eHG3WzJV5U8GEFyeNVwEfNCmrBjtoxeFwB4odKMQHj6T8Kb0kz1Uh-OxfCyQ63FXh-jgOXVtM7e4ydnqyJTYwmA8qUDmGKmaD3Dzzr2KSf8" 
          alt="SafaiBazaar" 
          className="mx-auto mb-4 h-16 w-auto lg:hidden rounded-lg" 
        />
        <h2 className="text-3xl font-bold text-primary">ERP Sign-In</h2>
        <p className="mt-2 text-on-surface-variant text-sm font-medium">Select your role to access your dashboard workspace.</p>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Workspace Role</label>
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-surface-container-low rounded-2xl border border-outline-variant/30">
          {rolesList.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setActiveRole(role)}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                activeRole === role
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Corporate Email</label>
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">mail</span>
            <input
              type="email"
              placeholder="name@safaibazaar.com"
              {...register('email')}
              className="w-full rounded-xl border border-outline-variant bg-white pl-12 pr-4 py-3 text-on-surface placeholder:text-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Secure Password</label>
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className="w-full rounded-xl border border-outline-variant bg-white pl-12 pr-12 py-3 text-on-surface placeholder:text-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-error mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="shimmer-btn w-full bg-primary text-on-primary rounded-xl py-3 px-4 font-bold shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span>Logging in...</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">vpn_key</span>
              <span>Secure Login</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
