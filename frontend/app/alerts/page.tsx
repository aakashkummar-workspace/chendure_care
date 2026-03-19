"use client";
import React from 'react';
import Layout from '../components/Layout';
import { Bell, AlertCircle, Phone, MessageSquare, CheckCircle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const AlertsPage = () => {
  const alerts = [
    { id: 1, name: 'John Doe', patientId: '1', reason: 'Patient reported "Worse" pain', severity: 'HIGH', time: '10 mins ago', status: 'OPEN' },
    { id: 2, name: 'Jane Smith', patientId: '2', reason: 'High sugar levels (320 mg/dL)', severity: 'HIGH', time: '1 hour ago', status: 'OPEN' },
    { id: 3, name: 'Robert Wilson', patientId: '3', reason: 'Missed medication for 2 days', severity: 'MEDIUM', time: '4 hours ago', status: 'OPEN' },
  ];

  return (
    <Layout>
      <div className="mb-10 mt-4">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Active <span className="text-rose-600">Alerts</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Critical patient issues requiring immediate attention.</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-wrap items-center justify-between gap-6 hover:shadow-xl hover:border-rose-100 dark:hover:border-rose-900 transition-all group">
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-16 h-16 rounded-3xl flex items-center justify-center font-bold text-2xl relative",
                alert.severity === 'HIGH' ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20" : "bg-amber-50 text-amber-600"
              )}>
                {alert.name[0]}
                {alert.severity === 'HIGH' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-extrabold text-xl text-gray-900 dark:text-white">{alert.name}</h3>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    alert.severity === 'HIGH' ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40" : "bg-amber-100 text-amber-700"
                  )}>
                    {alert.severity} PRIORITY
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">{alert.reason}</p>
                <div className="flex gap-4 mt-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-bold italic tracking-tight">
                    <AlertCircle className="w-3 h-3" /> Triggered {alert.time}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-indigo-600 transition-all">
                <Phone className="w-6 h-6" />
              </button>
              <button className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-indigo-600 transition-all">
                <MessageSquare className="w-6 h-6" />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-[20px] font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none ml-2">
                <CheckCircle className="w-5 h-5" /> Mark Resolved
              </button>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-20">
            <CheckCircle className="w-20 h-20 text-emerald-100 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-300">All clear. No active alerts.</h2>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AlertsPage;
