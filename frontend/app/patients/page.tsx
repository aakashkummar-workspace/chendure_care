"use client";
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Search, Plus, Filter, MoreVertical, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    { id: '1', name: 'John Doe', phone: '+91 9876543210', disease: 'Diabetes', lastVisit: '2024-03-10', status: 'ACTIVE', doctor: 'Dr. Ramesh' },
    { id: '2', name: 'Jane Smith', phone: '+91 9123456789', disease: 'Hypertension', lastVisit: '2024-03-12', status: 'ACTIVE', doctor: 'Dr. Priya' },
    { id: '3', name: 'Robert Wilson', phone: '+91 8877665544', disease: 'Post-Surgery', lastVisit: '2024-03-15', status: 'INACTIVE', doctor: 'Dr. Suresh' },
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-10 mt-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Patient <span className="text-indigo-600">Database</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Manage and monitor patient engagement.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 dark:hover:shadow-none">
          <Plus className="w-5 h-5" /> Add Patient
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search patients by name, phone or disease..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-500 hover:text-indigo-600 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Disease Type</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Assigned Doctor</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-5">
                    <Link href={`/patients/${patient.id}`} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 font-bold">
                        {patient.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.phone}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{patient.disease}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{patient.doctor}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      patient.status === 'ACTIVE' 
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" 
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                    )}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><MessageSquare className="w-5 h-5" /></button>
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><Phone className="w-5 h-5" /></button>
                      <button className="p-2 text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default PatientsPage;
