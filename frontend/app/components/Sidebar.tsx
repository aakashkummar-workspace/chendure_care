"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Bell, Settings, CalendarDays, MessageCircle, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Patients', icon: Users, href: '/patients' },
    { name: 'Schedule', icon: CalendarDays, href: '/schedule' },
    { name: 'Messages', icon: MessageCircle, href: '/messages' },
    { name: 'Alerts', icon: Bell, href: '/alerts' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="w-[280px] h-screen bg-gradient-to-b from-teal-600 to-teal-700 dark:from-gray-900 dark:to-gray-950 flex flex-col text-white relative overflow-hidden transition-colors duration-300">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-20 left-0 w-32 h-32 bg-teal-500/10 rounded-full -translate-x-1/2" />

      {/* Logo */}
      <div className="p-6 pb-4 flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <HeartPulse className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">Chendure</h1>
          <p className="text-[10px] text-teal-200 font-medium tracking-widest uppercase">CARE+</p>
        </div>
      </div>

      {/* Condition Card */}
      <div className="mx-4 mt-2 mb-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-teal-400/30 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Check your condition</p>
              <p className="text-[11px] text-teal-200 mt-0.5">Check every situation and your activities</p>
            </div>
          </div>
          <button className="w-full mt-2 bg-teal-400 hover:bg-teal-300 text-teal-900 font-bold text-sm py-2.5 rounded-xl transition-colors">
            Check It Now
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 relative z-10">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-white/20 text-white shadow-lg shadow-teal-900/20"
                  : "text-teal-100 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-teal-200 group-hover:text-white")} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom illustration area */}
      <div className="px-4 pb-4 relative z-10">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-400/30 flex items-center justify-center text-white font-bold text-sm">
              SW
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">Samantha W.</p>
              <p className="text-[11px] text-teal-200 truncate">Patient Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
