"use client";
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Bell, Shield, Palette, Globe, Save, Camera, Mail, Phone, MapPin, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={cn(
      "w-11 h-6 rounded-full transition-colors relative",
      enabled ? "bg-teal-600" : "bg-gray-200"
    )}
  >
    <div className={cn(
      "w-5 h-5 bg-white rounded-full shadow-sm transition-transform absolute top-0.5",
      enabled ? "translate-x-[22px]" : "translate-x-0.5"
    )} />
  </button>
);

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true,
    appointments: true,
    reports: false,
  });

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            <span className="text-teal-700">Settings</span>
          </h1>
          <p className="text-gray-500 mt-2">Manage your account preferences and configurations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-4 shadow-sm space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-2xl">
                        SW
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center shadow-md">
                        <Camera className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Samantha Wilson</p>
                      <p className="text-sm text-gray-500">Patient Dashboard Admin</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" defaultValue="Samantha Wilson" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" defaultValue="samantha.w@chendure.care" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="tel" defaultValue="+91 9876543210" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" defaultValue="Chennai, India" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Organization</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" defaultValue="Chendure CARE+ Health Systems" className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-700 transition-all shadow-lg shadow-teal-200 text-sm">
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h2>
                <div className="space-y-1">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'push', label: 'Push Notifications', desc: 'Browser and mobile push alerts' },
                    { key: 'sms', label: 'SMS Notifications', desc: 'Receive text message alerts' },
                    { key: 'alerts', label: 'Patient Alerts', desc: 'Critical patient condition alerts' },
                    { key: 'appointments', label: 'Appointment Reminders', desc: 'Upcoming appointment notifications' },
                    { key: 'reports', label: 'Weekly Reports', desc: 'Receive weekly summary reports' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <ToggleSwitch
                        enabled={notifications[item.key as keyof typeof notifications]}
                        onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Change Password</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Current Password</label>
                      <input type="password" placeholder="Enter current password" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">New Password</label>
                      <input type="password" placeholder="Enter new password" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                    </div>
                    <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-200 text-sm mt-2">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account.</p>
                  <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all text-sm">
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Appearance</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Theme</p>
                    <div className="flex gap-4">
                      {[
                        { label: 'Light', active: true, color: 'bg-white border-2 border-teal-600' },
                        { label: 'Dark', active: false, color: 'bg-gray-900 border-2 border-gray-200' },
                        { label: 'System', active: false, color: 'bg-gradient-to-r from-white to-gray-900 border-2 border-gray-200' },
                      ].map(theme => (
                        <button key={theme.label} className="flex flex-col items-center gap-2">
                          <div className={cn("w-20 h-14 rounded-xl", theme.color)} />
                          <span className={cn("text-xs font-medium", theme.active ? "text-teal-600" : "text-gray-500")}>{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Language</p>
                    <select className="px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all w-full max-w-xs">
                      <option>English</option>
                      <option>Tamil</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
