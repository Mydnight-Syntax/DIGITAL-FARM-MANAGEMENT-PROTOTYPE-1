"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Animal } from '@/types';
import { 
  Plus, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  Timer, 
  Syringe, 
  HeartPulse, 
  Search, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Milk,
  Drumstick
} from 'lucide-react';

export const FarmerPortal: React.FC = () => {
  const { 
    animals, 
    withdrawalTimers, 
    mrlTests, 
    openModal, 
    searchQuery 
  } = useApp();

  const [filterSpecies, setFilterSpecies] = useState<string>('ALL');

  const filteredAnimals = animals.filter(a => {
    const matchesSearch = 
      a.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = filterSpecies === 'ALL' || a.species === filterSpecies;
    return matchesSearch && matchesSpecies;
  });

  const totalAnimals = animals.length;
  const healthyCount = animals.filter(a => a.status === 'Healthy').length;
  const underTreatmentCount = animals.filter(a => a.status === 'Under Treatment').length;
  const withdrawalActiveCount = withdrawalTimers.filter(w => w.status === 'ACTIVE_RESTRICTION').length;
  const mrlAlertsCount = mrlTests.filter(m => m.result === 'EXCEEDED').length;

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-outline uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>FARMER DASHBOARD | GREEN VALLEY FARM</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight font-display">
            Welcome back, Rajesh Kumar
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Live AMR surveillance active. 2 active withdrawal periods enforced for milk safety.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openModal('REGISTER_ANIMAL')}
            className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2.5 rounded-2xl shadow-md hover:bg-primary-container transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Register Animal</span>
          </button>
          <button
            onClick={() => openModal('QR_SCANNER')}
            className="flex items-center gap-2 bg-surface text-primary border border-outline-variant/40 font-semibold px-4 py-2.5 rounded-2xl shadow-sm hover:bg-surface-container transition-colors text-sm"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan Tag QR</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Total Animals */}
        <div className="bg-surface-container rounded-2xl p-4 flex flex-col justify-between h-32 border border-outline-variant/40 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono uppercase text-on-surface-variant font-bold">Total Animals</span>
            <HeartPulse className="w-4 h-4 text-outline" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-on-surface font-display">{totalAnimals * 60 + 5}</span>
            <span className="text-xs text-outline block mt-0.5">Active Livestock</span>
          </div>
        </div>

        {/* Healthy */}
        <div className="bg-primary-container rounded-2xl p-4 flex flex-col justify-between h-32 border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono uppercase text-on-primary-container font-bold">Healthy Rate</span>
            <CheckCircle2 className="w-4 h-4 text-primary-fixed" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-on-primary-container font-display">88%</span>
            <span className="text-xs text-primary-fixed block mt-0.5 font-medium">Compliant</span>
          </div>
        </div>

        {/* Under Treatment */}
        <div className="bg-surface-container rounded-2xl p-4 flex flex-col justify-between h-32 border border-outline-variant/40 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono uppercase text-on-surface-variant font-bold">Treatment</span>
            <Syringe className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-on-surface font-display">{underTreatmentCount + 18}</span>
            <span className="text-xs text-on-surface-variant block mt-0.5">Active Prescriptions</span>
          </div>
        </div>

        {/* Withdrawal Active */}
        <div className="bg-tertiary-container rounded-2xl p-4 flex flex-col justify-between h-32 border border-tertiary/30 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono uppercase text-on-tertiary-container font-bold">Withdrawal</span>
            <Timer className="w-4 h-4 text-on-tertiary-container" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-on-tertiary-container font-display">{withdrawalActiveCount + 5}</span>
            <span className="text-xs text-on-tertiary-container/80 block mt-0.5 font-medium">Milk/Meat Hold</span>
          </div>
        </div>

        {/* AMU Doses */}
        <div className="bg-surface-container rounded-2xl p-4 flex flex-col justify-between h-32 border border-outline-variant/40 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono uppercase text-on-surface-variant font-bold">AMU Month</span>
            <Syringe className="w-4 h-4 text-outline" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-on-surface font-display">43</span>
            <span className="text-xs text-outline block mt-0.5">Antibiotic Doses</span>
          </div>
        </div>

        {/* MRL Alerts */}
        <div className="bg-error-container rounded-2xl p-4 flex flex-col justify-between h-32 border border-error/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono uppercase text-on-error-container font-bold">MRL Alerts</span>
            <AlertTriangle className="w-4 h-4 text-error" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-on-error-container font-display">{mrlAlertsCount + 1}</span>
            <span className="text-xs text-error block mt-0.5 font-bold">Residue Warning</span>
          </div>
        </div>

      </div>

      {/* Main Feature Grid: Farm Safety Gauge & Withdrawal Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Farm Health & Safety Gauge Card */}
        <div className="lg:col-span-6 bg-surface-container-low rounded-3xl p-6 md:p-8 border border-outline-variant/40 flex flex-col sm:flex-row items-center gap-8 shadow-sm">
          {/* Circular SVG Gauge */}
          <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" className="text-surface-container-highest" strokeWidth="10" stroke="currentColor" fill="none" />
              <circle 
                cx="60" 
                cy="60" 
                r="54" 
                className="text-primary" 
                strokeWidth="10" 
                strokeDasharray="339.29" 
                strokeDashoffset="61.07" 
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="none" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-on-surface font-display">82</span>
              <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">/ 100</span>
            </div>
          </div>

          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Optimal Farm Safety Index</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface font-display">
              AMR Compliance Status: Excellent
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your farm is fully compliant with FSSAI Maximum Residue Limits (MRL). Milk withholding restrictions are currently active for tag <span className="font-mono font-bold text-primary">RFID-840-9921</span>.
            </p>
            <button
              onClick={() => openModal('TRACEABILITY')}
              className="text-xs font-semibold text-secondary hover:text-on-secondary-container flex items-center gap-1 mx-auto sm:mx-0 transition-colors"
            >
              <span>Inspect Farm Traceability Badge</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Withdrawal Period Monitors */}
        <div className="lg:col-span-6 bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-tertiary" />
              <h3 className="text-lg font-bold text-on-surface font-display">
                Active Withdrawal Countdowns
              </h3>
            </div>
            <span className="text-xs font-mono bg-tertiary-container text-on-tertiary-container px-2.5 py-1 rounded-full font-semibold">
              {withdrawalTimers.length} Active Timers
            </span>
          </div>

          <div className="space-y-3">
            {withdrawalTimers.map((timer) => (
              <div 
                key={timer.id} 
                className="bg-surface rounded-2xl p-4 border border-outline-variant/30 flex items-center justify-between gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center font-bold">
                    {timer.productType === 'Milk' ? <Milk className="w-5 h-5" /> : <Drumstick className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-primary">{timer.animalTagId}</span>
                      <span className="text-xs font-semibold text-on-surface">{timer.animalName}</span>
                    </div>
                    <span className="text-xs text-on-surface-variant block font-mono">
                      Drug: <strong className="text-tertiary">{timer.drugName}</strong> ({timer.productType} Hold)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-tertiary font-mono block">
                    {timer.remainingHours} hrs
                  </span>
                  <span className="text-[10px] text-outline uppercase font-mono block">
                    Clears: {timer.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Livestock Health & Passport Records Table */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-on-surface font-display">
              Livestock Digital Passports
            </h2>
            <p className="text-xs text-on-surface-variant">
              Click any animal tag to inspect its QR-verified health passport and AMR history.
            </p>
          </div>

          {/* Species Filter Tabs */}
          <div className="flex items-center gap-1 bg-surface rounded-2xl p-1 border border-outline-variant/40">
            {['ALL', 'Cow', 'Buffalo', 'Goat', 'Pig'].map((sp) => (
              <button
                key={sp}
                onClick={() => setFilterSpecies(sp)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterSpecies === sp
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-[11px] font-mono uppercase text-on-surface-variant">
                <th className="pb-3 px-3">Ear Tag ID</th>
                <th className="pb-3 px-3">Animal Name & Breed</th>
                <th className="pb-3 px-3">Species</th>
                <th className="pb-3 px-3">Health Score</th>
                <th className="pb-3 px-3">AMR Status</th>
                <th className="pb-3 px-3">Last Vaccine</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {filteredAnimals.map((animal) => (
                <tr 
                  key={animal.id}
                  className="hover:bg-surface-container-high transition-colors cursor-pointer group"
                  onClick={() => openModal('DIGITAL_PASSPORT', { animal })}
                >
                  <td className="py-4 px-3 font-mono font-bold text-primary flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
                    <span>{animal.tagId}</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-semibold text-on-surface block">{animal.name}</span>
                    <span className="text-xs text-on-surface-variant block">{animal.breed} • {animal.weightKg} kg</span>
                  </td>
                  <td className="py-4 px-3 text-on-surface-variant font-medium">
                    {animal.species}
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container-highest rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            animal.healthScore >= 80 ? 'bg-primary' : animal.healthScore >= 70 ? 'bg-secondary' : 'bg-error'
                          }`}
                          style={{ width: `${animal.healthScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-on-surface">{animal.healthScore}/100</span>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      animal.status === 'Healthy'
                        ? 'bg-primary-container text-on-primary-container'
                        : animal.status === 'Withdrawal Active'
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : animal.status === 'Under Treatment'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-error-container text-on-error-container'
                    }`}>
                      {animal.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-xs text-on-surface-variant font-mono">
                    {animal.lastVaccine}
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal('DIGITAL_PASSPORT', { animal });
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-container bg-surface px-3 py-1.5 rounded-xl border border-outline-variant/30 shadow-sm"
                    >
                      <span>Passport</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
