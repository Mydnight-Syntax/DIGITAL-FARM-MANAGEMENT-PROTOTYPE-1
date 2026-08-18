"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  HeartPulse, 
  Syringe, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Award
} from 'lucide-react';

export const DigitalPassportModal: React.FC = () => {
  const { selectedAnimal, closeModal, openModal, prescriptions, withdrawalTimers } = useApp();

  if (!selectedAnimal) return null;

  const animalRx = prescriptions.filter(rx => rx.animalTagId === selectedAnimal.tagId || rx.animalId === selectedAnimal.id);
  const activeTimer = withdrawalTimers.find(w => w.animalTagId === selectedAnimal.tagId && w.status === 'ACTIVE_RESTRICTION');

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface rounded-3xl max-w-2xl w-full border border-outline-variant/40 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-primary p-6 text-on-primary flex items-start justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary-container/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-primary-fixed uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL DIGITAL ANIMAL PASSPORT</span>
            </div>
            <h2 className="text-2xl font-extrabold font-display">
              {selectedAnimal.name}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-xs font-mono text-primary-fixed-dim">
              <span>TAG ID: <strong>{selectedAnimal.tagId}</strong></span>
              <span>•</span>
              <span>{selectedAnimal.breed} ({selectedAnimal.species})</span>
            </div>
          </div>

          <button 
            onClick={closeModal}
            className="z-10 p-2 rounded-full hover:bg-primary-container/50 text-on-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Key Bio & QR Code Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-surface-container rounded-2xl p-5 border border-outline-variant/30">
            
            <div className="sm:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-on-surface font-display">Livestock Bio Record</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-outline uppercase text-[10px] block">Farm Owner</span>
                  <span className="font-bold text-on-surface">{selectedAnimal.ownerName}</span>
                </div>
                <div>
                  <span className="text-outline uppercase text-[10px] block">Farm Location</span>
                  <span className="font-bold text-on-surface">{selectedAnimal.farmName}</span>
                </div>
                <div>
                  <span className="text-outline uppercase text-[10px] block">Age & Weight</span>
                  <span className="font-bold text-on-surface">{selectedAnimal.ageMonths} Months ({selectedAnimal.weightKg} kg)</span>
                </div>
                <div>
                  <span className="text-outline uppercase text-[10px] block">Health Score</span>
                  <span className="font-bold text-primary">{selectedAnimal.healthScore} / 100</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-outline uppercase block mb-1">Current AMR Safety Status</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  selectedAnimal.status === 'Healthy'
                    ? 'bg-primary-container text-on-primary-container'
                    : selectedAnimal.status === 'Withdrawal Active'
                    ? 'bg-tertiary-container text-on-tertiary-container'
                    : 'bg-secondary-container text-on-secondary-container'
                }`}>
                  {selectedAnimal.status === 'Healthy' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  {selectedAnimal.status}
                </span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-3 bg-surface rounded-xl border border-outline-variant/30 text-center space-y-2">
              <img 
                src={selectedAnimal.qrCode} 
                alt={`QR code for ${selectedAnimal.tagId}`} 
                className="w-28 h-28 object-contain rounded-lg border border-outline-variant/20" 
              />
              <span className="text-[10px] font-mono text-outline uppercase font-bold">
                Scan for Verification
              </span>
            </div>

          </div>

          {/* Active Withdrawal Warning if any */}
          {activeTimer && (
            <div className="bg-tertiary-container/30 border border-tertiary/40 rounded-2xl p-4 flex items-center justify-between text-tertiary">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-tertiary flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Active Milk/Meat Withdrawal Restriction</h4>
                  <p className="text-xs font-mono">
                    Drug: <strong>{activeTimer.drugName}</strong>. Do not send product to market for {activeTimer.remainingHours} hours.
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold bg-tertiary text-on-tertiary px-3 py-1 rounded-full">
                Until {activeTimer.endDate}
              </span>
            </div>
          )}

          {/* Medical Prescriptions History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-on-surface text-base font-display flex items-center gap-2">
                <FileText className="w-4 h-4 text-secondary" />
                Prescription & Treatment Log
              </h3>
              <button 
                onClick={() => {
                  closeModal();
                  openModal('CREATE_PRESCRIPTION');
                }}
                className="text-xs font-semibold text-secondary hover:text-on-secondary-container"
              >
                + Add Treatment
              </button>
            </div>

            {animalRx.length > 0 ? (
              <div className="space-y-2">
                {animalRx.map(rx => (
                  <div key={rx.id} className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="font-bold text-secondary">{rx.medicationName}</span> ({rx.dosage})
                      <span className="text-outline block text-[10px]">Issued by {rx.vetName} on {rx.issuedDate}</span>
                    </div>
                    <span className="font-bold text-tertiary">Withdrawal: {rx.withdrawalDays} Days</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant italic font-mono bg-surface-container-low p-3 rounded-xl">
                No active medical treatment prescriptions recorded. Animal is clear.
              </p>
            )}
          </div>

          {/* Vaccination History */}
          <div className="space-y-3">
            <h3 className="font-bold text-on-surface text-base font-display flex items-center gap-2">
              <Syringe className="w-4 h-4 text-primary" />
              Vaccination Records
            </h3>
            <div className="space-y-2">
              {selectedAnimal.vaccines.map((vac, i) => (
                <div key={i} className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="font-bold text-primary">{vac.name}</span>
                    <span className="text-outline block text-[10px]">Administered by {vac.vet}</span>
                  </div>
                  <span className="text-on-surface-variant font-semibold">{vac.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-surface-container border-t border-outline-variant/30 flex items-center justify-between">
          <span className="text-xs font-mono text-outline">
            Blockchain Hash: 0x8f...2a91 (FSSAI Verified)
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert(`Digital Passport exported for tag ${selectedAnimal.tagId}`)}
              className="flex items-center gap-1.5 bg-primary text-on-primary font-semibold text-xs px-4 py-2 rounded-xl shadow-sm hover:bg-primary-container transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Passport PDF</span>
            </button>
            <button 
              onClick={closeModal}
              className="bg-surface text-on-surface font-semibold text-xs px-4 py-2 rounded-xl border border-outline-variant/30 hover:bg-surface-container-high transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
