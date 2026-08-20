"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  FileSpreadsheet, 
  Plus, 
  Stethoscope, 
  Syringe, 
  Timer, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

export const PrescriptionsView: React.FC = () => {
  const { prescriptions, animals, openModal, searchQuery } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  const filteredRx = prescriptions.filter(rx => {
    const matchesSearch = 
      rx.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.animalTagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.animalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.vetName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      filterStatus === 'ALL' || rx.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const activeRxCount = prescriptions.filter(r => r.status === 'ACTIVE').length;
  const completedRxCount = prescriptions.filter(r => r.status === 'COMPLETED').length;

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-secondary uppercase tracking-wider mb-1">
            <FileSpreadsheet className="w-4 h-4 text-secondary" />
            <span>ELECTRONIC PRESCRIPTIONS (e-Rx) | KRISHINODE VET NETWORK</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight font-display">
            Digital Prescription Registry
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Official veterinarian issued e-prescriptions with verified antimicrobial withdrawal dates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal('CREATE_PRESCRIPTION')}
            className="flex items-center gap-2 bg-secondary text-on-secondary font-semibold px-4 py-2.5 rounded-2xl shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Issue New e-Rx</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">{prescriptions.length}</span>
            <span className="text-xs text-on-surface-variant block">Total Issued e-Rx</span>
          </div>
        </div>

        <div className="bg-tertiary-container rounded-2xl p-5 border border-tertiary/30 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center font-bold">
            <Syringe className="w-6 h-6 text-on-tertiary-container" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-tertiary-container font-display">{activeRxCount}</span>
            <span className="text-xs text-on-tertiary-container block">Active Antimicrobial Courses</span>
          </div>
        </div>

        <div className="bg-primary-container rounded-2xl p-5 border border-primary/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6 text-primary-fixed" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-primary-container font-display">{completedRxCount}</span>
            <span className="text-xs text-primary-fixed block">Completed Treatments</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30 font-mono text-xs">
        <Filter className="w-4 h-4 text-on-surface-variant" />
        <span className="font-bold text-on-surface-variant uppercase">Status:</span>
        <button
          onClick={() => setFilterStatus('ALL')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterStatus === 'ALL' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus('ACTIVE')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterStatus === 'ACTIVE' ? 'bg-tertiary-container text-on-tertiary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Active ({activeRxCount})
        </button>
        <button
          onClick={() => setFilterStatus('COMPLETED')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterStatus === 'COMPLETED' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Completed ({completedRxCount})
        </button>
      </div>

      {/* Prescriptions List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRx.map((rx) => {
          const animal = animals.find(a => a.id === rx.animalId);
          const isHPCIA = rx.medicationName.includes('Cefquinome') || rx.medicationName.includes('Colistin') || rx.medicationName.includes('Enrofloxacin');

          return (
            <div 
              key={rx.id}
              className="bg-surface-container rounded-3xl p-6 border border-outline-variant/40 shadow-sm space-y-5 hover:border-secondary/40 transition-colors"
            >
              {/* Top Banner */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-secondary">{rx.prescriptionNumber}</span>
                    {isHPCIA && (
                      <span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                        WHO Watch Antibiotic
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mt-1 font-display">
                    {rx.medicationName} ({rx.activeIngredient})
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  rx.status === 'ACTIVE' 
                    ? 'bg-tertiary-container text-on-tertiary-container' 
                    : 'bg-primary-container text-on-primary-container'
                }`}>
                  {rx.status}
                </span>
              </div>

              {/* Details Block */}
              <div className="bg-surface rounded-2xl p-4 border border-outline-variant/30 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Target Livestock:</span>
                  <span className="font-bold text-primary">{rx.animalName} ({rx.animalTagId})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Prescribing Vet:</span>
                  <span className="font-bold text-on-surface">{rx.vetName} ({rx.vetLicense})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Dosage & Frequency:</span>
                  <span className="text-on-surface">{rx.dosage} • {rx.frequency}</span>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant/20 pt-2">
                  <span className="text-on-surface-variant">Withdrawal Period:</span>
                  <span className="font-bold text-tertiary">{rx.withdrawalDays} Days (Until {rx.withdrawalEndDate})</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => animal && openModal('DIGITAL_PASSPORT', { animal })}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline font-mono"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Animal Passport</span>
                </button>
                <button
                  onClick={() => animal && openModal('DIGITAL_PASSPORT', { animal })}
                  className="flex items-center gap-1.5 bg-surface hover:bg-surface-container text-on-surface px-3.5 py-2 rounded-xl border border-outline-variant/40 text-xs font-medium font-mono"
                >
                  <QrCode className="w-4 h-4 text-secondary" />
                  <span>e-Rx QR Passport</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
