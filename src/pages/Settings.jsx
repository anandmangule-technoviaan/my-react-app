import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const settingsSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  gstNo: z.string().min(15, { message: 'GST number must be 15 characters' }),
  sessionExpiry: z.number().min(5).max(1440, { message: 'Minutes must be between 5 and 1440' }),
  notifyOnDispatch: z.boolean(),
  notifyOnAlert: z.boolean()
});

export default function Settings() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: 'SafaiBazaar Enterprise',
      gstNo: '23AAAAA0000A1Z5',
      sessionExpiry: 60,
      notifyOnDispatch: true,
      notifyOnAlert: true
    }
  });

  const onSubmit = (data) => {
    toast.success('Configuration settings saved successfully!');
  };

  return (
    <div className="space-y-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div>
          <h2 className="text-2xl text-primary font-bold">System Configuration</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Configure corporate billing details, API webhooks, and security protocols.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 space-y-gutter">
          <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-4">
            <h3 className="text-lg text-primary font-bold mb-4">Corporate Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Registered Company Name</label>
                <input
                  type="text"
                  {...register('companyName')}
                  className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-medium"
                />
                {errors.companyName && <p className="text-xs text-error mt-1">{errors.companyName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Enterprise GSTIN</label>
                <input
                  type="text"
                  {...register('gstNo')}
                  className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-medium font-mono"
                />
                {errors.gstNo && <p className="text-xs text-error mt-1">{errors.gstNo.message}</p>}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-4">
            <h3 className="text-lg text-primary font-bold mb-4">Security Parameters</h3>
            <div>
              <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Session Expiry Timeout (Minutes)</label>
              <input
                type="number"
                {...register('sessionExpiry', { valueAsNumber: true })}
                className="w-full rounded-lg border border-outline-variant p-2.5 outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              {errors.sessionExpiry && <p className="text-xs text-error mt-1">{errors.sessionExpiry.message}</p>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-gutter">
          <div className="bg-white p-6 rounded-xl border border-outline-variant/20 shadow-sm space-y-6">
            <h3 className="text-lg text-primary font-bold">Email Notifications</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('notifyOnDispatch')}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <span className="text-sm font-semibold group-hover:text-primary transition-colors">Alert on Dispatch cargo</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('notifyOnAlert')}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <span className="text-sm font-semibold group-hover:text-primary transition-colors">Alert on critical low stocks</span>
              </label>
            </div>

            <button
              type="submit"
              className="shimmer-btn w-full py-3 bg-primary text-on-primary rounded-xl font-bold shadow-xl active:scale-[0.98] transition-transform text-xs"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
