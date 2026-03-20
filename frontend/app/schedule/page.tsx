"use client";
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Clock, MapPin, Video, Phone, Plus, ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const appointments = [
  {
    id: 1,
    patient: 'John Doe',
    type: 'Follow-up',
    doctor: 'Dr. Ramesh',
    time: '09:00 AM - 09:30 AM',
    date: 'Today',
    location: 'Room 204',
    mode: 'in-person',
    color: 'bg-teal-500',
  },
  {
    id: 2,
    patient: 'Jane Smith',
    type: 'Blood Sugar Check',
    doctor: 'Dr. Priya',
    time: '10:00 AM - 10:30 AM',
    date: 'Today',
    location: 'Video Call',
    mode: 'video',
    color: 'bg-indigo-500',
  },
  {
    id: 3,
    patient: 'Robert Wilson',
    type: 'Post-Surgery Review',
    doctor: 'Dr. Suresh',
    time: '11:30 AM - 12:00 PM',
    date: 'Today',
    location: 'Room 108',
    mode: 'in-person',
    color: 'bg-orange-400',
  },
  {
    id: 4,
    patient: 'Samantha W.',
    type: 'Physiotherapy',
    doctor: 'Dr. Emilia Winson',
    time: '02:00 PM - 03:00 PM',
    date: 'Today',
    location: 'Rehab Center',
    mode: 'in-person',
    color: 'bg-emerald-500',
  },
  {
    id: 5,
    patient: 'Arjun Patel',
    type: 'Consultation',
    doctor: 'Dr. Ramesh',
    time: '09:00 AM - 09:45 AM',
    date: 'Tomorrow',
    location: 'Video Call',
    mode: 'video',
    color: 'bg-teal-500',
  },
  {
    id: 6,
    patient: 'Meera Krishnan',
    type: 'Routine Checkup',
    doctor: 'Dr. Priya',
    time: '11:00 AM - 11:30 AM',
    date: 'Tomorrow',
    location: 'Room 204',
    mode: 'in-person',
    color: 'bg-rose-400',
  },
];

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00', '05:00'];

const SchedulePage = () => {
  const now = new Date();
  const [selectedDay, setSelectedDay] = useState<string>('Today');

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - now.getDay() + i);
    return {
      name: DAYS[d.getDay()],
      date: d.getDate(),
      isToday: d.toDateString() === now.toDateString(),
    };
  });

  const filteredAppointments = appointments.filter(a => a.date === selectedDay);

  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 mt-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              <span className="text-teal-700">Schedule</span>
            </h1>
            <p className="text-gray-500 mt-2">Manage appointments and daily schedule.</p>
          </div>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200">
            <Plus className="w-5 h-5" /> New Appointment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Week Strip */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">{MONTHS[now.getMonth()]} {now.getFullYear()}</h2>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, i) => (
                  <button
                    key={i}
                    className={cn(
                      "flex flex-col items-center py-3 rounded-2xl transition-all",
                      day.isToday
                        ? "bg-teal-600 text-white shadow-lg shadow-teal-200"
                        : "hover:bg-gray-50 text-gray-600"
                    )}
                  >
                    <span className={cn("text-[10px] font-bold uppercase", day.isToday ? "text-teal-100" : "text-gray-400")}>{day.name}</span>
                    <span className="text-lg font-bold mt-1">{day.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Today&apos;s Timeline</h2>
                <div className="flex gap-2">
                  {['Today', 'Tomorrow'].map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                        selectedDay === day ? "bg-teal-600 text-white shadow-md" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                {timeSlots.map((time, idx) => (
                  <div key={idx} className="flex items-start gap-4 min-h-[60px]">
                    <span className="text-xs text-gray-400 font-medium w-12 pt-0.5 flex-shrink-0">{time}</span>
                    <div className="flex-1 border-t border-gray-100 pt-2 relative">
                      {filteredAppointments
                        .filter(a => a.time.startsWith(time.replace(/^0/, '')))
                        .map(appt => (
                          <div key={appt.id} className={cn("rounded-2xl p-4 mb-2 text-white", appt.color)}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-sm">{appt.type}</p>
                                <p className="text-xs opacity-80 mt-0.5">{appt.patient} &bull; {appt.doctor}</p>
                              </div>
                              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-lg">
                                {appt.mode === 'video' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                                <span className="text-[10px] font-semibold">{appt.location}</span>
                              </div>
                            </div>
                            <p className="text-[11px] opacity-70 mt-2 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {appt.time}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-teal-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Today</p>
                      <p className="text-[11px] text-gray-500">Appointments</p>
                    </div>
                  </div>
                  <span className="text-2xl font-extrabold text-teal-600">
                    {appointments.filter(a => a.date === 'Today').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Tomorrow</p>
                      <p className="text-[11px] text-gray-500">Appointments</p>
                    </div>
                  </div>
                  <span className="text-2xl font-extrabold text-indigo-600">
                    {appointments.filter(a => a.date === 'Tomorrow').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Video className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Video Calls</p>
                      <p className="text-[11px] text-gray-500">Scheduled</p>
                    </div>
                  </div>
                  <span className="text-2xl font-extrabold text-orange-600">
                    {appointments.filter(a => a.mode === 'video').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming</h2>
              <div className="space-y-3">
                {appointments.slice(0, 4).map(appt => (
                  <div key={appt.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={cn("w-1.5 h-10 rounded-full", appt.color)} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{appt.patient}</p>
                      <p className="text-[11px] text-gray-400">{appt.type} &bull; {appt.time}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      {appt.mode === 'video' ? <Video className="w-4 h-4 text-gray-400" /> : <User className="w-4 h-4 text-gray-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePage;
