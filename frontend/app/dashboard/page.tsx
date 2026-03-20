"use client";
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Search, Bell, Video, MapPin, Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '../components/ThemeProvider';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days: { day: number; current: boolean; today?: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, current: false });
  }
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      current: true,
      today: today.getFullYear() === year && today.getMonth() === month && today.getDate() === i,
    });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, current: false });
  }
  return days;
}

const DonutChart = ({ percentage }: { percentage: number }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" className="stroke-[#e8f5f0] dark:stroke-gray-800" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#2a7d6e"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-teal-700 dark:text-teal-400">{percentage}%</span>
      </div>
    </div>
  );
};

const BarChart = () => {
  const data = [
    { month: 'Jul', values: [45, 30, 20] },
    { month: 'Aug', values: [55, 40, 25] },
    { month: 'Sep', values: [40, 50, 30] },
    { month: 'Oct', values: [65, 45, 35] },
    { month: 'Nov', values: [50, 35, 40] },
    { month: 'Oct', values: [70, 55, 45] },
  ];

  return (
    <div className="flex items-end gap-4 h-32 mt-4">
      {data.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1 flex-1">
          <div className="flex gap-0.5 items-end h-24">
            {item.values.map((val, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 rounded-full animate-grow",
                  i === 0 ? "bg-teal-600" : i === 1 ? "bg-teal-300" : "bg-teal-100"
                )}
                style={{
                  height: `${val}%`,
                  animationDelay: `${idx * 100 + i * 50}ms`,
                }}
              />
            ))}
          </div>
          <span className={cn(
            "text-[10px] font-medium",
            idx === data.length - 1 ? "text-teal-700 font-bold" : "text-gray-400"
          )}>
            {item.month}
          </span>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const now = new Date();
  const { theme, toggleTheme } = useTheme();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calView, setCalView] = useState<'Monthly' | 'Daily'>('Monthly');

  const calendarDays = getCalendarDays(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  const scheduleItems = [
    { title: 'Manage stress', time: '10:00pm - 12:00pm', color: 'bg-orange-400' },
    { title: 'Physiotherapy', time: '09:00am - 10:00am', color: 'bg-teal-500' },
  ];

  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hi, <span className="text-teal-700 dark:text-teal-400">Samantha W.</span>
            </h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Let&apos;s track your health daily!</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">2</span>
            </button>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400 hover:text-amber-300 transition-colors" />
              )}
            </button>
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
              <span className="text-teal-700 dark:text-teal-300 font-bold text-sm">SW</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointment */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming appointment</h2>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Hospital illustration placeholder */}
                <div className="w-full md:w-48 h-32 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-teal-100 dark:bg-teal-900/40 rounded-2xl flex items-center justify-center mb-2">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2a7d6e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21h18" />
                        <path d="M5 21V7l8-4v18" />
                        <path d="M19 21V11l-6-4" />
                        <path d="M9 9h1" />
                        <path d="M9 13h1" />
                        <path d="M9 17h1" />
                      </svg>
                    </div>
                    <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">Hospital</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                        <span className="text-teal-700 dark:text-teal-300 font-bold text-xs">EW</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">Dr. Emilia Winson</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Physiotherapy</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-lg">
                      <Video className="w-3.5 h-3.5" /> Video call
                    </span>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mt-3">
                    <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-teal-600" /> Manggis ST Hospital
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 ml-5.5 mt-0.5">New York, USA</p>
                  </div>

                  <div className="flex gap-6 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span className="font-medium">14 Mar 2022</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 text-teal-600" />
                      <span className="font-medium">09:00 pm</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Activities Chart */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Patient activities</h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Today, {now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <select className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-300 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500">
                    <option>Month</option>
                    <option>Week</option>
                    <option>Day</option>
                  </select>
                </div>

                <BarChart />

                <div className="mt-4 flex items-center gap-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3">
                  <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/40 rounded-lg flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2a7d6e" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-teal-800 dark:text-teal-300">Good conditions</p>
                    <p className="text-[11px] text-teal-600 dark:text-teal-400">Anxiety & wellness</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400 ml-auto" />
                </div>
              </div>

              {/* Daily Progress */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white self-start mb-1">Daily progress</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 self-start mb-6">Keep improving the quality of your health</p>
                <DonutChart percentage={80} />
                <div className="flex gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-100 dark:bg-teal-900" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Appointments List */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">List of appointments</h2>
              </div>

              {/* Monthly/Daily Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-5">
                {(['Monthly', 'Daily'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setCalView(view)}
                    className={cn(
                      "flex-1 text-xs font-semibold py-2 rounded-lg transition-all",
                      calView === view
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    )}
                  >
                    {view}
                  </button>
                ))}
              </div>

              {/* Calendar */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{MONTHS[calMonth]} {calYear}</h3>
                  <div className="flex gap-1">
                    <button onClick={prevMonth} className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </button>
                    <button onClick={nextMonth} className="w-7 h-7 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {DAYS.map((day, i) => (
                    <div key={i} className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((d, i) => (
                    <button
                      key={i}
                      className={cn(
                        "w-8 h-8 mx-auto rounded-lg text-xs font-medium flex items-center justify-center transition-all",
                        !d.current && "text-gray-300 dark:text-gray-600",
                        d.current && !d.today && "text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20",
                        d.today && "bg-teal-600 text-white font-bold shadow-md shadow-teal-200 dark:shadow-teal-900"
                      )}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-3">
                {scheduleItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
                    <div className={cn("w-1 h-10 rounded-full", item.color)} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500">{item.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-600 transition-colors" />
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold mt-4 hover:text-teal-700 dark:hover:text-teal-300 transition-colors w-full justify-center">
                See More Schedule <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
