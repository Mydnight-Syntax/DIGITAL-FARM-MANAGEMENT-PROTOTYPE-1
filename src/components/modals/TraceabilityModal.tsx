"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  GitMerge, 
  ShieldCheck, 
  CheckCircle2, 
  Tractor, 
  Stethoscope, 
  FlaskConical, 
  Truck, 
  QrCode,
  ArrowRight
} from 'lucide-react';

export const TraceabilityModal: React.FC = () => {
  const { closeModal } = useApp();

  const steps = [
    {
      title: '1. Farm Origin & Livestock Registration',
      sub: 'Green Valley Dairy Farm • Owner: Rajesh Kumar',
      detail: 'RFID-840-9921 registered on FSSAI National Database',
      icon: Tractor,
      status: 'VERIFIED',
      date: '2025-02-14'
    },
    {
      title: '2. Veterinary Diagnosis & Prescription',
      sub: 'Dr. Ananya Sharma (Lic: VET-IN-2022-8841)',
      detail: 'Prescription RX-2026-0891 issued for Oxytet-LA (20ml)',
      icon: Stethoscope,
      status: 'LOGGED',
      date: '2026-08-15'
    },
    {
      title: '3. Automated MRL Withdrawal Enforcement',
      sub: 'Withdrawal Countdown: 7 Days Mandatory Hold',
      detail: 'Milk withholding strictly enforced. Supply chain locked.',
      icon: ShieldCheck,
      status: 'ACTIVE_HOLD',
      date: '2026-08-15 to 2026-08-22'
    },
    {
      title: '4. FSSAI Laboratory Residue Clearance',
      sub: 'Central Food & AMR Testing Center',
      detail: 'Sample SMP-2026-9901 tested: 0.08 ppm (MRL Limit 0.10 ppm)',
      icon: FlaskConical,
      status: 'PASS_COMPLIANT',
      date: '2026-08-18'
    },
    {
      title: '5. Dairy Processing & Consumer Safety Badge',
      sub: 'Green Valley Premium Pasteurized Milk',
      detail: 'Consumer QR Code generated for zero-residue certification',
      icon: Truck,
      status: 'CERTIFIED',
      date: 'Pending Withdrawal End'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface rounded-3xl max-w-2xl w-full border border-outline-variant/40 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-primary p-6 text-on-primary flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary-fixed uppercase tracking-wider mb-1">
              <GitMerge className="w-4 h-4" />
              <span>FARM-TO-FORK BLOCKCHAIN TRACEABILITY CHAIN</span>
            </div>
            <h2 className="text-2xl font-extrabold font-display">
              Supply Chain Audit Log
            </h2>
            <p className="text-xs text-primary-fixed-dim font-mono mt-1">
              Target Ear Tag: RFID-840-9921 (Gauri - Holstein Friesian)
            </p>
          </div>
          <button 
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-primary-container/40 text-on-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Traceability Timeline */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          <div className="relative border-l-2 border-primary/30 ml-4 pl-6 space-y-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md font-bold text-xs ring-4 ring-surface">
                    <Icon className="w-4 h-4 text-primary-fixed" />
                  </div>

                  {/* Step Card */}
                  <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant/30 shadow-sm space-y-2 hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-on-surface font-display text-sm">
                        {step.title}
                      </h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        step.status === 'PASS_COMPLIANT' || step.status === 'VERIFIED'
                          ? 'bg-primary-container text-on-primary-container'
                          : step.status === 'ACTIVE_HOLD'
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}>
                        {step.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-secondary font-mono">
                      {step.sub}
                    </p>

                    <p className="text-xs text-on-surface-variant">
                      {step.detail}
                    </p>

                    <span className="text-[10px] font-mono text-outline block pt-1 border-t border-outline-variant/20">
                      Timestamp: {step.date}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant/30 flex items-center justify-between">
          <span className="text-xs font-mono text-outline">
            Verified by FSSAI & Dept of Animal Husbandry
          </span>
          <button 
            onClick={closeModal}
            className="bg-primary text-on-primary font-semibold text-xs px-5 py-2 rounded-xl shadow-sm hover:bg-primary-container transition-colors"
          >
            Close Traceability Hub
          </button>
        </div>

      </div>
    </div>
  );
};
