import React from 'react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Enter a valid 10 digit phone number' }),
  email: z.string().email({ message: 'Enter a valid corporate email' })
});

export default function Profile() {
  const { userProfile, updateProfile } = useUser();
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile.name,
      phone: userProfile.phone,
      email: userProfile.email
    }
  });

  const onSubmit = (data) => {
    updateProfile(data);
    toast.success('User Profile details updated successfully!');
  };

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">My Personal Profile</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Update your corporate details, display avatar, and verify permissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col items-center justify-center space-y-4 text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-container bg-surface-container-highest shadow-md">
            <img 
              className="w-full h-full object-cover" 
              alt="Avatar" 
              src={user?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY_AItsUB35DZKTZr184pdjjzqVgMOMPIXkVfwlS4nksUHx1qqgf8sr28Hoz0YN4rRCz_IDfjffDuwhYKQfuHRlecXqHA0yQh3JcdCQKDtfGMJh60NE4yC-sSni79mJU1AtnQebdE10zN1ItQiXFWIFmTgh1jjbvy8ObDqkvKEbP362PDXnXwEocBhiocnAwxIOpkZsrJb0QPtK2wrtB7eaiU8_LBjGB5hapACzL5tbm-ZqbT_oY5F8njqQGsuAQa-RnddKKtzXzU'} 
            />
          </div>
          <div>
            <h3 className="text-lg text-primary font-bold">{userProfile.name}</h3>
            <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-semibold text-on-surface-variant">
              {user?.role}
            </span>
          </div>
          <p className="text-xs text-outline font-medium">Department: Operations Division</p>
        </div>

        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm">
          <h3 className="text-lg text-primary font-bold mb-6">Profile Details</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Display Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-medium"
                />
                {errors.name && <p className="text-xs text-error mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Contact Telephone</label>
                <input
                  type="text"
                  {...register('phone')}
                  className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-medium font-mono"
                />
                {errors.phone && <p className="text-xs text-error mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Corporate Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-medium"
              />
              {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
            </div>

            <div className="pt-4 border-t border-outline-variant flex justify-end">
              <button
                type="submit"
                className="shimmer-btn bg-primary text-on-primary font-bold px-6 py-3 rounded-xl shadow-md active:scale-95 transition-transform text-xs"
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
