"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  PawPrint, 
  Plus, 
  Search, 
  Filter, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  Syringe, 
  HeartPulse,
  ExternalLink
} from 'lucide-react';

export const LivestockPassportsView: React.FC = () => {
  const { animals, openModal, searchQuery } = useApp();
  const [filterSpecies, setFilterSpecies] = useState<string>('ALL');

  const filteredAnimals = animals.filter(a => {
    const matchesSearch = 
      a.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.farmName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecies = filterSpecies === 'ALL' || a.species === filterSpecies;
    return matchesSearch && matchesSpecies;
  });

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-1">
            <PawPrint className="w-4 h-4 text-primary" />
            <span>LIVESTOCK REGISTRY | KRISHINODE DIGITAL ANIMAL PASSPORT</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight font-display">
            Livestock Ear Tags & Digital Passports
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Tamper-proof RFID tag records, vaccination history, medication logs, and MRL clearance status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal('REGISTER_ANIMAL')}
            className="flex items-center gap-2 bg-primary text-on-primary font-semibold px-4 py-2.5 rounded-2xl shadow-md hover:bg-primary-container transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Animal</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30 font-mono text-xs">
        <Filter className="w-4 h-4 text-on-surface-variant" />
        <span className="font-bold text-on-surface-variant uppercase">Species Filter:</span>
        <button
          onClick={() => setFilterSpecies('ALL')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterSpecies === 'ALL' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          All Species ({animals.length})
        </button>
        <button
          onClick={() => setFilterSpecies('Cow')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterSpecies === 'Cow' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Cattle ({animals.filter(a => a.species === 'Cow').length})
        </button>
        <button
          onClick={() => setFilterSpecies('Buffalo')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterSpecies === 'Buffalo' ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Buffalo ({animals.filter(a => a.species === 'Buffalo').length})
        </button>
      </div>

      {/* Livestock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => {
          const isHealthy = animal.status === 'Healthy';
          const isWithdrawal = animal.status === 'Withdrawal Active';

          return (
            <div 
              key={animal.id}
              className="bg-surface-container rounded-3xl p-6 border border-outline-variant/40 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-all group"
            >
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary">{animal.tagId}</span>
                    <h3 className="text-xl font-bold text-on-surface font-display group-hover:text-primary transition-colors">
                      {animal.name}
                    </h3>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    isHealthy 
                      ? 'bg-primary-container text-on-primary-container' 
                      : isWithdrawal
                      ? 'bg-tertiary-container text-on-tertiary-container'
                      : 'bg-secondary-container text-on-secondary-container'
                  }`}>
                    {animal.status}
                  </span>
                </div>

                {/* Details */}
                <div className="bg-surface rounded-2xl p-4 border border-outline-variant/30 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Breed & Species:</span>
                    <span className="font-bold text-on-surface">{animal.breed} ({animal.species})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Age & Weight:</span>
                    <span className="text-on-surface">{animal.ageMonths} Months • {animal.weightKg} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Farm Owner:</span>
                    <span className="text-on-surface">{animal.ownerName}</span>
                  </div>
                  <div className="flex justify-between border-t border-outline-variant/20 pt-2">
                    <span className="text-on-surface-variant">Latest Vaccine:</span>
                    <span className="font-bold text-primary">{animal.lastVaccine}</span>
                  </div>
                </div>

                {/* Health Score Gauge */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">Vigor Health Score:</span>
                    <span className="font-bold text-primary">{animal.healthScore}/100</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        animal.healthScore >= 80 ? 'bg-primary' : animal.healthScore >= 60 ? 'bg-secondary' : 'bg-tertiary'
                      }`}
                      style={{ width: `${animal.healthScore}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-outline-variant/30 flex items-center justify-between">
                <button
                  onClick={() => openModal('DIGITAL_PASSPORT', { animal })}
                  className="w-full bg-primary hover:bg-primary-container text-on-primary font-semibold py-2.5 rounded-2xl shadow-sm transition-colors flex items-center justify-center gap-2 text-xs"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Open Digital Passport</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
