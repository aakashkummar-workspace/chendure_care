"use client";
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Search, Send, Paperclip, Phone, Video, MoreVertical, Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const contacts = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Thank you doctor, I feel much better now.',
    time: '2 min ago',
    unread: 2,
    online: true,
    avatar: 'JD',
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'My sugar levels are stable today.',
    time: '15 min ago',
    unread: 0,
    online: true,
    avatar: 'JS',
  },
  {
    id: '3',
    name: 'Robert Wilson',
    lastMessage: 'When is my next appointment?',
    time: '1 hour ago',
    unread: 1,
    online: false,
    avatar: 'RW',
  },
  {
    id: '4',
    name: 'Dr. Ramesh',
    lastMessage: 'Patient report has been updated.',
    time: '3 hours ago',
    unread: 0,
    online: true,
    avatar: 'DR',
  },
  {
    id: '5',
    name: 'Dr. Priya',
    lastMessage: 'Please schedule the follow-up for next week.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    avatar: 'DP',
  },
];

const chatMessages = [
  { id: 1, sender: 'patient', text: 'Good morning doctor! I wanted to update you on my condition.', time: '9:00 AM', status: 'read' },
  { id: 2, sender: 'me', text: 'Good morning John! Yes, please go ahead. How are you feeling today?', time: '9:02 AM', status: 'read' },
  { id: 3, sender: 'patient', text: 'The pain has reduced significantly after the new medication. I can walk more comfortably now.', time: '9:05 AM', status: 'read' },
  { id: 4, sender: 'me', text: 'That\'s great to hear! Continue with the current dosage for this week. Any side effects?', time: '9:07 AM', status: 'read' },
  { id: 5, sender: 'patient', text: 'No side effects so far. Just mild drowsiness in the morning but it goes away quickly.', time: '9:10 AM', status: 'read' },
  { id: 6, sender: 'me', text: 'That\'s normal and should subside in a few days. Make sure to take it after meals.', time: '9:12 AM', status: 'read' },
  { id: 7, sender: 'patient', text: 'Thank you doctor, I feel much better now.', time: '9:15 AM', status: 'delivered' },
];

const MessagesPage = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100" style={{ height: 'calc(100vh - 120px)' }}>
          <div className="flex h-full">
            {/* Contact List */}
            <div className="w-[340px] border-r border-gray-100 flex flex-col">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredContacts.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={cn(
                      "w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left",
                      selectedContact.id === contact.id && "bg-teal-50 border-r-2 border-teal-600"
                    )}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm",
                        selectedContact.id === contact.id ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600"
                      )}>
                        {contact.avatar}
                      </div>
                      {contact.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm text-gray-900 truncate">{contact.name}</p>
                        <span className="text-[10px] text-gray-400 flex-shrink-0">{contact.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <span className="w-5 h-5 bg-teal-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {contact.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                      {selectedContact.avatar}
                    </div>
                    {selectedContact.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{selectedContact.name}</p>
                    <p className="text-xs text-emerald-500 font-medium">{selectedContact.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Video className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex justify-center">
                  <span className="text-[10px] text-gray-400 bg-gray-50 px-3 py-1 rounded-full font-medium">Today</span>
                </div>
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={cn("flex", msg.sender === 'me' ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3",
                      msg.sender === 'me'
                        ? "bg-teal-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className={cn(
                        "flex items-center justify-end gap-1 mt-1",
                        msg.sender === 'me' ? "text-teal-200" : "text-gray-400"
                      )}>
                        <span className="text-[10px]">{msg.time}</span>
                        {msg.sender === 'me' && (
                          msg.status === 'read' ? <CheckCheck className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0">
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center hover:bg-teal-700 transition-colors flex-shrink-0 shadow-lg shadow-teal-200">
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
