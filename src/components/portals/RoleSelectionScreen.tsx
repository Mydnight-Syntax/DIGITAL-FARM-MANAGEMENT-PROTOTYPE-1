"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { 
  Tractor, 
  Stethoscope, 
  Building2, 
  ArrowRight, 
  ShieldAlert, 
  Layers, 
  Sparkles,
  QrCode,
  UserCheck
} from 'lucide-react';

export const RoleSelectionScreen: React.FC = () => {
  const { setUserRole, openModal } = useApp();

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      
      {/* Background Subtle Gradient Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Header Info */}
      <div className="flex flex-col items-center text-center max-w-2xl w-full mb-12 z-10">
        <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center shadow-md mb-6 border border-outline-variant/40 text-primary">
          <ShieldAlert className="w-8 h-8 text-primary" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hackathon Showcase Prototype</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tight mb-4 font-display">
          Krishinode Sentinel
        </h1>
        <p className="text-lg text-on-surface-variant max-w-lg">
          Livestock Intelligence & Antimicrobial Resistance (AMR) Safety Chain Platform. Select your role portal to get started.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10">
        
        {/* Farmer Card */}
        <div className="group flex flex-col bg-surface-container rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-outline-variant/40">
          <div className="absolute top-0 left-0 right-0 h-2 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="flex items-start justify-between mb-8">
            <div className="w-16 h-16 bg-surface flex items-center justify-center rounded-2xl shadow-sm text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <Tractor className="w-8 h-8" />
            </div>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider bg-surface-variant px-3 py-1 rounded-full font-semibold">
              Farmer View
            </span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-2 font-display">Farmer Portal</h2>
          <p className="text-sm text-on-surface-variant mb-6 flex-1">
            Manage livestock passports, monitor drug withdrawal countdown timers, track MRL safety status, and log animal health.
          </p>
          <button
            onClick={() => handleSelectRole('FARMER')}
            className="w-full bg-primary text-on-primary font-semibold py-3.5 rounded-2xl shadow-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
          >
            <span>Enter Farmer Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Veterinarian Card */}
        <div className="group flex flex-col bg-surface-container rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-outline-variant/40">
          <div className="absolute top-0 left-0 right-0 h-2 bg-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="flex items-start justify-between mb-8">
            <div className="w-16 h-16 bg-surface flex items-center justify-center rounded-2xl shadow-sm text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
              <Stethoscope className="w-8 h-8" />
            </div>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider bg-surface-variant px-3 py-1 rounded-full font-semibold">
              Clinical View
            </span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-2 font-display">Veterinarian Portal</h2>
          <p className="text-sm text-on-surface-variant mb-6 flex-1">
            Issue digital e-prescriptions, auto-calculate antimicrobial withdrawal periods, and audit AMU stewardship records.
          </p>
          <button
            onClick={() => handleSelectRole('VETERINARIAN')}
            className="w-full bg-secondary text-on-secondary font-semibold py-3.5 rounded-2xl shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
          >
            <span>Enter Vet Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Regulator Card */}
        <div className="group flex flex-col bg-surface-container rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-outline-variant/40">
          <div className="absolute top-0 left-0 right-0 h-2 bg-tertiary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="flex items-start justify-between mb-8">
            <div className="w-16 h-16 bg-surface flex items-center justify-center rounded-2xl shadow-sm text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
              <Building2 className="w-8 h-8" />
            </div>
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider bg-surface-variant px-3 py-1 rounded-full font-semibold">
              Oversight View
            </span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-2 font-display">Regulator & MRL</h2>
          <p className="text-sm text-on-surface-variant mb-6 flex-1">
            Monitor regional AMR surveillance heatmaps, lab MRL test compliance, food safety audits, and farm-to-fork supply chain traceability.
          </p>
          <button
            onClick={() => handleSelectRole('REGULATOR')}
            className="w-full bg-tertiary-container text-on-tertiary-container font-semibold py-3.5 rounded-2xl shadow-md hover:bg-tertiary hover:text-on-tertiary transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
          >
            <span>Enter Regulator Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Secondary Demo Buttons */}
      <div className="mt-12 text-center z-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => openModal('USER_AUTH')}
          className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full text-xs font-semibold text-on-surface border border-outline-variant/40 hover:bg-surface-container transition-colors shadow-sm"
        >
          <UserCheck className="w-4 h-4 text-secondary" />
          <span>New Registration / Sign In</span>
        </button>
        <button
          onClick={() => openModal('QR_SCANNER')}
          className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full text-xs font-semibold text-primary border border-outline-variant/40 hover:bg-surface-container transition-colors shadow-sm"
        >
          <QrCode className="w-4 h-4" />
          <span>Launch QR Scanner Simulator</span>
        </button>
        <button
          onClick={() => openModal('TRACEABILITY')}
          className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full text-xs font-semibold text-secondary border border-outline-variant/40 hover:bg-surface-container transition-colors shadow-sm"
        >
          <Layers className="w-4 h-4" />
          <span>View Farm-to-Fork Traceability Hub</span>
        </button>
      </div>

    </div>
  );
};
