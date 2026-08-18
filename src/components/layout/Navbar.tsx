"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole, ViewMode } from '@/types';
import { 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  QrCode, 
  Plus, 
  Search, 
  Bell, 
  UserCheck, 
  Stethoscope, 
  Building2, 
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    viewMode, 
    setViewMode, 
    openModal, 
    searchQuery, 
    setSearchQuery 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Section */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setUserRole('ROLE_SELECT')}>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md">
            <ShieldCheck className="w-6 h-6 text-primary-fixed" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary tracking-tight font-display">EMERALD SENTINEL</span>
              <span className="bg-primary-container text-on-primary-container text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                Hackathon Pro
              </span>
            </div>
            <span className="text-[11px] text-on-surface-variant font-mono uppercase tracking-widest">
              Livestock AMR & MRL Safety Chain
            </span>
          </div>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tag IDs (RFID-840-9921), prescriptions, or farms..."
              className="w-full bg-surface-container-highest border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Role Switcher & Controls */}
        <div className="flex items-center gap-3">
          
          {/* Role Navigation Pills */}
          <div className="hidden lg:flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/30">
            <button
              onClick={() => setUserRole('FARMER')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                userRole === 'FARMER'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Farmer Portal
            </button>
            <button
              onClick={() => setUserRole('VETERINARIAN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                userRole === 'VETERINARIAN'
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Veterinarian
            </button>
            <button
              onClick={() => setUserRole('REGULATOR')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                userRole === 'REGULATOR'
                  ? 'bg-tertiary-container text-on-tertiary-container shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Regulator / MRL
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal('QR_SCANNER')}
              className="flex items-center gap-1.5 bg-surface-container-high hover:bg-surface-variant text-primary font-medium text-xs px-3 py-2 rounded-xl border border-outline-variant/40 transition-colors shadow-sm"
              title="Scan livestock ear tag QR code"
            >
              <QrCode className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">Scan QR</span>
            </button>

            <button
              onClick={() => openModal('REGISTER_ANIMAL')}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary font-medium text-xs px-3.5 py-2 rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Register Animal</span>
            </button>
          </div>

          {/* Device Frame Viewport Toggle (Hackathon Judge Mode) */}
          <div className="flex items-center bg-surface-container p-1 rounded-xl border border-outline-variant/40">
            <button
              onClick={() => setViewMode('DESKTOP')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'DESKTOP'
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Desktop Web Layout View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('MOBILE_FRAME')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'MOBILE_FRAME'
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Mobile App Frame Preview Mode (Hackathon Showcase)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications */}
          <button 
            onClick={() => openModal('TRACEABILITY')}
            className="relative p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
            title="Supply Chain Traceability"
          >
            <Layers className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface"></span>
          </button>

        </div>
      </div>
    </header>
  );
};
