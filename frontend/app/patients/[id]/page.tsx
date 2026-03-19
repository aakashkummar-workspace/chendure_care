"use client";
import React from 'react';
import Layout from '../../components/Layout';
import { useParams } from 'next/navigation';
import { Phone, Mail, MapPin, Calendar, MessageSquare, AlertCircle, CheckCircle, FileText, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const PatientDetail = () => {
  const { id } = useParams();

  // Mock patient data
  const patient = {
    id,
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john@example.com',
    disease: 'Diabetes',
    status: 'ACTIVE',
    currentDay: 5,
    doctor: 'Dr. Ramesh',
    timeline: [
      { day: 5, type: 'QUESTION', content: 'How are you feeling today?', response: 'Worse', status: 'ALERT', time: 'Today, 9:00 AM' },
      { day: 3, type: 'MESSAGE', content: 'Reminder: Take your medication before breakfast.', response: 'Read', status: 'COMPLETED', time: 'Yesterday, 8:45 AM' },
      { day: 1, type: 'MESSAGE', content: 'Welcome message and baseline assessment.', response: 'Good', status: 'COMPLETED', time: 'Mar 15, 10:00 AM' },
    ],
    conversations: [
      { role: 'SYSTEM', text: 'How are you feeling today?', time: '9:00 AM' },
      { role: 'PATIENT', text: 'I am feeling worse, my sugar levels are high.', time: '9:15 AM' },
      { role: 'SYSTEM', text: 'An alert has been created for Dr. Ramesh.', time: '9:16 AM' },
    ]
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-wrap gap-6 items-start justify-between mb-8 mt-4">
        <div className="flex gap-6 items-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
            {patient.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{patient.name}</h1>
              <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider items-center flex gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> {patient.status}
              </span>
            </div>
            <div className="flex gap-4 mt-2 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {patient.phone}</span>
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {patient.email}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined Mar 2024</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-700 dark:text-gray-300">Edit Profile</button>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Contact via WhatsApp</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" /> Care Timeline
            </h2>
            <div className="relative pl-8 border-l-2 border-indigo-100 dark:border-indigo-900 ml-4 space-y-10">
              {patient.timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className={cn(
                    "absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 shadow-sm",
                    item.status === 'ALERT' ? "bg-rose-500" : "bg-emerald-500"
                  )}></div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl flex justify-between items-start hover:shadow-md transition-all group">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-md">DAY {item.day}</span>
                        <span className="text-xs text-gray-400 font-medium">{item.time}</span>
                      </div>
                      <h4 className="font-bold text-gray-800 dark:text-white italic">"{item.content}"</h4>
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Response: <span className={cn("font-bold", item.response === 'Worse' ? "text-rose-600" : "text-emerald-600")}>{item.response}</span></p>
                    </div>
                    {item.status === 'ALERT' && (
                      <AlertCircle className="w-6 h-6 text-rose-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chat & Info */}
        <div className="space-y-8">
          {/* Chat Mockup */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Active Chat</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {patient.conversations.map((msg, i) => (
                <div key={i} className={cn(
                  "max-w-[80%] p-3 rounded-2xl text-sm",
                  msg.role === 'PATIENT' 
                    ? "bg-gray-100 dark:bg-gray-800 ml-auto rounded-tr-none text-gray-900 dark:text-white" 
                    : "bg-indigo-600 text-white rounded-tl-none mr-auto"
                )}>
                  <p>{msg.text}</p>
                  <p className="text-[10px] mt-1 opacity-70 text-right">{msg.time}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
              <button className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> Medical Info
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Primary Physician</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">{patient.doctor}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Diagnosis</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">{patient.disease}</p>
              </div>
              <button className="w-full mt-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Internal Activity Icon helper
const Activity = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

export default PatientDetail;
