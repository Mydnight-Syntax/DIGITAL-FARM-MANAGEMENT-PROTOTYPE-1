"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Timer, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Milk, 
  Drumstick, 
  Clock, 
  Syringe, 
  Filter, 
  ExternalLink,
  QrCode
} from 'lucide-react';

export const WithdrawalMonitorView: React.FC = () => {
  const { withdrawalTimers, animals, openModal, searchQuery } = useApp();
  const [filterType, setFilterType] = useState<'ALL' | 'ACTIVE' | 'CLEARED'>('ALL');
  const [filterProduct, setFilterProduct] = useState<'ALL' | 'Milk' | 'Meat'>('ALL');

  const filteredTimers = withdrawalTimers.filter(timer => {
    const animal = animals.find(a => a.id === timer.animalId);
    const matchesSearch = 
      timer.animalTagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      timer.animalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      timer.drugName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = 
      filterType === 'ALL' || 
      (filterType === 'ACTIVE' && timer.status === 'ACTIVE_RESTRICTION') ||
      (filterType === 'CLEARED' && timer.status === 'CLEARED_SAFE');

    const matchesProduct = 
      filterProduct === 'ALL' || timer.productType === filterProduct;

    return matchesSearch && matchesType && matchesProduct;
  });

  const activeRestrictionsCount = withdrawalTimers.filter(t => t.status === 'ACTIVE_RESTRICTION').length;
  const clearedSafeCount = withdrawalTimers.filter(t => t.status === 'CLEARED_SAFE').length;

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-1">
            <Timer className="w-4 h-4 text-primary" />
            <span>FARMER WITHDRAWAL MONITOR | KRISHINODE MRL SAFETY</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight font-display">
            Antimicrobial Withdrawal Period Tracker
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Real-time countdown gauges enforcing zero-residue milk and meat harvest compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2.5 rounded-2xl font-mono text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>{activeRestrictionsCount} RESTRICTIONS ENFORCED</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6 text-tertiary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">{activeRestrictionsCount}</span>
            <span className="text-xs text-on-surface-variant block font-mono">Active Withholding Periods</span>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">{clearedSafeCount}</span>
            <span className="text-xs text-on-surface-variant block font-mono">Harvest Cleared Animals</span>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
            <Milk className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">100%</span>
            <span className="text-xs text-on-surface-variant block font-mono">MRL Safety Standard Compliance</span>
          </div>
        </div>

      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-on-surface-variant" />
          <span className="text-xs font-mono font-bold uppercase text-on-surface-variant">Filter Status:</span>
          
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === 'ALL' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('ACTIVE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === 'ACTIVE' ? 'bg-tertiary-container text-on-tertiary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Under Restriction ({activeRestrictionsCount})
          </button>
          <button
            onClick={() => setFilterType('CLEARED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === 'CLEARED' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Harvest Cleared ({clearedSafeCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase text-on-surface-variant">Product:</span>
          <button
            onClick={() => setFilterProduct('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterProduct === 'ALL' ? 'bg-surface-container-highest text-on-surface' : 'text-on-surface-variant'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilterProduct('Milk')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
              filterProduct === 'Milk' ? 'bg-secondary text-on-secondary shadow-sm' : 'text-on-surface-variant'
            }`}
          >
            <Milk className="w-3.5 h-3.5" /> Milk
          </button>
          <button
            onClick={() => setFilterProduct('Meat')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
              filterProduct === 'Meat' ? 'bg-tertiary text-on-tertiary shadow-sm' : 'text-on-surface-variant'
            }`}
          >
            <Drumstick className="w-3.5 h-3.5" /> Meat
          </button>
        </div>
      </div>

      {/* Timers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTimers.map((timer) => {
          const animal = animals.find(a => a.id === timer.animalId);
          const isRestriction = timer.status === 'ACTIVE_RESTRICTION';
          const progressPercent = Math.max(0, Math.min(100, Math.round(((timer.totalDays * 24 - timer.remainingHours) / (timer.totalDays * 24)) * 100)));

          return (
            <div 
              key={timer.id}
              className={`bg-surface-container rounded-3xl p-6 border shadow-sm space-y-5 transition-all ${
                isRestriction ? 'border-tertiary/40 bg-gradient-to-br from-surface-container to-tertiary-container/10' : 'border-primary/30'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">{timer.animalTagId}</span>
                    <span className="text-xs bg-surface-container-high px-2.5 py-0.5 rounded-full font-medium text-on-surface-variant">
                      {timer.productType === 'Milk' ? '🥛 Milk Harvest' : '🥩 Meat Clearance'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mt-1 font-display">
                    {timer.animalName}
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                  isRestriction 
                    ? 'bg-tertiary-container text-on-tertiary-container' 
                    : 'bg-primary-container text-on-primary-container'
                }`}>
                  {isRestriction ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-tertiary" />
                      WITHHOLDING ACTIVE
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      HARVEST CLEARED
                    </>
                  )}
                </span>
              </div>

              {/* Drug & Prescription Info */}
              <div className="bg-surface rounded-2xl p-4 border border-outline-variant/30 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <Syringe className="w-3.5 h-3.5 text-secondary" />
                    Administered Medication:
                  </span>
                  <span className="font-bold text-on-surface">{timer.drugName}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface-variant">Treatment Start:</span>
                  <span className="text-on-surface">{timer.startDate}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface-variant">Est. Clearance Date:</span>
                  <span className="font-bold text-primary">{timer.endDate}</span>
                </div>
              </div>

              {/* Countdown / Decay Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface-variant">Residue Elimination Progress:</span>
                  <span className="font-bold text-primary">{progressPercent}% Clean</span>
                </div>
                <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden p-0.5 border border-outline-variant/30">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isRestriction ? 'bg-gradient-to-r from-tertiary via-secondary to-primary' : 'bg-primary'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant font-mono">
                  <span>{timer.totalDays} Total Days</span>
                  <span className="font-bold text-tertiary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {isRestriction ? `${timer.remainingHours} hours remaining` : '0 hours restriction'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                <button
                  onClick={() => animal && openModal('DIGITAL_PASSPORT', { animal })}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Animal Passport</span>
                </button>
                <button
                  onClick={() => animal && openModal('DIGITAL_PASSPORT', { animal })}
                  className="flex items-center gap-1.5 bg-surface hover:bg-surface-container text-on-surface px-3 py-1.5 rounded-xl border border-outline-variant/40 text-xs font-medium"
                >
                  <QrCode className="w-3.5 h-3.5 text-secondary" />
                  <span>Show Tag QR</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
