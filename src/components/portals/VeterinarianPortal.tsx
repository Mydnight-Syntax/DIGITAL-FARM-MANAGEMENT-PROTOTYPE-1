"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Stethoscope, 
  Plus, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Syringe, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Pill,
  Sparkles
} from 'lucide-react';

export const VeterinarianPortal: React.FC = () => {
  const { 
    animals, 
    prescriptions, 
    openModal, 
    searchQuery 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<'ALL' | 'ACTIVE' | 'HIGH_SURVEILLANCE'>('ALL');

  const filteredRx = prescriptions.filter(rx => {
    const matchesSearch = 
      rx.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.animalTagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.animalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.medicationName.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'HIGH_SURVEILLANCE') {
      return matchesSearch && (rx.medicationName.includes('Cefquinome') || rx.medicationName.includes('Colistin'));
    }
    return matchesSearch;
  });

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Vet Header Banner */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-secondary uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4" />
            <span>VETERINARY CLINICAL COMMAND CENTER | REGION 4</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight font-display">
            Dr. Ananya Sharma, DVM
          </h1>
          <p className="text-sm text-on-surface-variant mt-1 font-mono">
            License: VET-IN-2022-8841 • FSSAI Authorized Prescriber
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openModal('CREATE_PRESCRIPTION')}
            className="flex items-center gap-2 bg-secondary text-on-secondary font-semibold px-5 py-3 rounded-2xl shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Digital Prescription</span>
          </button>
        </div>
      </div>

      {/* Vet Workload & AMU Stewardship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
            <FileText className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">{prescriptions.length * 4 + 2}</span>
            <span className="text-xs text-on-surface-variant block font-mono">Prescriptions Issued</span>
          </div>
        </div>

        <div className="bg-primary-container rounded-2xl p-5 border border-primary/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-primary-fixed" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-primary-container font-display">100%</span>
            <span className="text-xs text-primary-fixed block font-mono">MRL Withdrawal Logged</span>
          </div>
        </div>

        <div className="bg-tertiary-container rounded-2xl p-5 border border-tertiary/30 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center font-bold">
            <Syringe className="w-6 h-6 text-on-tertiary-container" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-tertiary-container font-display">1 Active</span>
            <span className="text-xs text-on-tertiary-container/80 block font-mono">Critical Antimicrobial</span>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-surface-variant text-on-surface flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">14 Farms</span>
            <span className="text-xs text-on-surface-variant block font-mono">Surveillance Radius</span>
          </div>
        </div>

      </div>

      {/* Main Clinical Prescriptions Management */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital AMR Stewardship Workflow</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface font-display">
              Prescription & Treatment Workload
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === 'ALL'
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'bg-surface text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Rx
            </button>
            <button
              onClick={() => setActiveCategory('HIGH_SURVEILLANCE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === 'HIGH_SURVEILLANCE'
                  ? 'bg-tertiary-container text-on-tertiary-container shadow-sm'
                  : 'bg-surface text-on-surface-variant hover:text-on-surface'
              }`}
            >
              High Surveillance (AMR)
            </button>
          </div>
        </div>

        {/* Prescription List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRx.map((rx) => (
            <div 
              key={rx.id}
              className="bg-surface rounded-2xl p-6 border border-outline-variant/40 shadow-sm space-y-4 hover:border-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-secondary uppercase block">
                    {rx.prescriptionNumber}
                  </span>
                  <h3 className="text-lg font-bold text-on-surface mt-0.5 font-display">
                    {rx.medicationName}
                  </h3>
                  <span className="text-xs text-on-surface-variant block font-mono">
                    Active Ingredient: <strong className="text-primary">{rx.activeIngredient}</strong>
                  </span>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                  rx.status === 'ACTIVE' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {rx.status}
                </span>
              </div>

              {/* Details breakdown */}
              <div className="grid grid-cols-2 gap-3 bg-surface-container-low p-3 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-outline block uppercase text-[10px]">Patient Tag</span>
                  <span className="font-bold text-primary">{rx.animalTagId}</span> ({rx.animalName})
                </div>
                <div>
                  <span className="text-outline block uppercase text-[10px]">Dosage & Frequency</span>
                  <span className="font-bold text-on-surface">{rx.dosage}</span> • {rx.frequency}
                </div>
                <div>
                  <span className="text-outline block uppercase text-[10px]">Duration</span>
                  <span className="font-bold text-on-surface">{rx.durationDays} Days</span> (Issued {rx.issuedDate})
                </div>
                <div>
                  <span className="text-outline block uppercase text-[10px]">Withdrawal Required</span>
                  <span className="font-bold text-tertiary">{rx.withdrawalDays} Days</span> (Until {rx.withdrawalEndDate})
                </div>
              </div>

              {rx.notes && (
                <p className="text-xs text-on-surface-variant italic bg-surface-container p-3 rounded-xl border border-outline-variant/20">
                  &ldquo;{rx.notes}&rdquo;
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                <span className="text-[11px] font-mono text-outline">
                  Prescribed by: {rx.vetName} ({rx.vetLicense})
                </span>
                <button
                  onClick={() => {
                    const anim = animals.find(a => a.tagId === rx.animalTagId);
                    if (anim) openModal('DIGITAL_PASSPORT', { animal: anim });
                  }}
                  className="text-xs font-semibold text-secondary hover:text-on-secondary-container flex items-center gap-1"
                >
                  <span>View Animal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
