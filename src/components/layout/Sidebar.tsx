"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { 
  LayoutDashboard, 
  PawPrint, 
  FileSpreadsheet, 
  Timer, 
  FlaskConical, 
  TrendingUp, 
  GitMerge, 
  ShieldCheck, 
  Users, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { userRole, setUserRole, openModal } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, role: 'ALL' },
    { id: 'animals', label: 'Livestock & Passports', icon: PawPrint, role: 'ALL' },
    { id: 'prescriptions', label: 'Digital Prescriptions', icon: FileSpreadsheet, role: 'ALL' },
    { id: 'withdrawals', label: 'Withdrawal Monitor', icon: Timer, role: 'FARMER' },
    { id: 'mrl-testing', label: 'MRL Compliance', icon: FlaskConical, role: 'REGULATOR' },
    { id: 'analytics', label: 'AMR Surveillance', icon: TrendingUp, role: 'REGULATOR' },
    { id: 'traceability', label: 'Traceability Hub', icon: GitMerge, role: 'ALL' }
  ];

  return (
    <aside className="w-64 bg-surface-container-low border-r border-outline-variant/30 flex flex-col justify-between h-[calc(100vh-5rem)] sticky top-20 select-none">
      <div className="p-4 space-y-6">
        
        {/* Current Role Card */}
        <div className="bg-surface rounded-2xl p-3.5 border border-outline-variant/40 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
            {userRole === 'FARMER' && '👨‍🌾'}
            {userRole === 'VETERINARIAN' && '🩺'}
            {userRole === 'REGULATOR' && '🏛️'}
            {userRole === 'ROLE_SELECT' && '⚙️'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] font-mono uppercase text-on-surface-variant font-bold">ACTIVE CONTEXT</span>
            <span className="text-sm font-bold text-primary truncate">
              {userRole === 'FARMER' && 'Green Valley Farm'}
              {userRole === 'VETERINARIAN' && 'Veterinary Clinic'}
              {userRole === 'REGULATOR' && 'Govt Food Safety'}
              {userRole === 'ROLE_SELECT' && 'Role Selection'}
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono text-outline uppercase tracking-wider font-bold">
            Main Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'traceability') {
                    openModal('TRACEABILITY');
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary-fixed' : 'text-on-surface-variant'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-primary-fixed" />}
              </button>
            );
          })}
        </div>

        {/* Role Quick Switcher */}
        <div className="space-y-1 pt-4 border-t border-outline-variant/30">
          <div className="px-3 pb-2 text-[10px] font-mono text-outline uppercase tracking-wider font-bold">
            Switch Portal Context
          </div>
          <button
            onClick={() => setUserRole('FARMER')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
              userRole === 'FARMER' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Farmer Workspace
          </button>
          <button
            onClick={() => setUserRole('VETERINARIAN')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
              userRole === 'VETERINARIAN' ? 'bg-secondary-container text-on-secondary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Veterinary Workspace
          </button>
          <button
            onClick={() => setUserRole('REGULATOR')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
              userRole === 'REGULATOR' ? 'bg-tertiary-container text-on-tertiary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Regulator Workspace
          </button>
        </div>

      </div>

      {/* System Footer Badge */}
      <div className="p-4 border-t border-outline-variant/30 text-center">
        <div className="bg-surface-container rounded-xl p-2.5 text-[11px] text-on-surface-variant font-mono">
          <span className="font-bold text-primary">Emerald Sentinel v2.4</span>
          <br />
          AMR & MRL Chain Active
        </div>
      </div>
    </aside>
  );
};
