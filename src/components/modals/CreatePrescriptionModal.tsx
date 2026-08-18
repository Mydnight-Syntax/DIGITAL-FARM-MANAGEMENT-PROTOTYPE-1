"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Stethoscope, 
  Syringe, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const MEDICATIONS = [
  { name: 'Oxytet-LA 200mg/ml', active: 'Oxytetracycline Hydrochloride', defaultWithdrawal: 7 },
  { name: 'Cefquinome 25mg/ml', active: 'Cefquinome Sulfate (4th Gen)', defaultWithdrawal: 5 },
  { name: 'Enrofloxacin 100mg/ml', active: 'Enrofloxacin (Fluoroquinolone)', defaultWithdrawal: 10 },
  { name: 'Amoxicillin-Trihydrate', active: 'Amoxicillin Trihydrate', defaultWithdrawal: 4 },
  { name: 'Streptopenicillin-LA', active: 'Procaine Penicillin + Dihydrostreptomycin', defaultWithdrawal: 14 }
];

export const CreatePrescriptionModal: React.FC = () => {
  const { animals, closeModal, createPrescription } = useApp();

  const [selectedAnimalId, setSelectedAnimalId] = useState(animals[0]?.id || '');
  const [medicationName, setMedicationName] = useState(MEDICATIONS[0].name);
  const [activeIngredient, setActiveIngredient] = useState(MEDICATIONS[0].active);
  const [dosage, setDosage] = useState('15 ml (IM)');
  const [frequency, setFrequency] = useState('Once daily');
  const [durationDays, setDurationDays] = useState(3);
  const [withdrawalDays, setWithdrawalDays] = useState(MEDICATIONS[0].defaultWithdrawal);
  const [notes, setNotes] = useState('');

  const handleMedicationChange = (medName: string) => {
    setMedicationName(medName);
    const found = MEDICATIONS.find(m => m.name === medName);
    if (found) {
      setActiveIngredient(found.active);
      setWithdrawalDays(found.defaultWithdrawal);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const anim = animals.find(a => a.id === selectedAnimalId) || animals[0];
    
    const today = new Date();
    const issuedDate = today.toISOString().split('T')[0];
    
    const endDateObj = new Date();
    endDateObj.setDate(today.getDate() + withdrawalDays);
    const withdrawalEndDate = endDateObj.toISOString().split('T')[0];

    createPrescription({
      animalId: anim.id,
      animalTagId: anim.tagId,
      animalName: anim.name,
      vetName: 'Dr. Ananya Sharma',
      vetLicense: 'VET-IN-2022-8841',
      medicationName,
      activeIngredient,
      dosage,
      frequency,
      durationDays: Number(durationDays),
      issuedDate,
      withdrawalDays: Number(withdrawalDays),
      withdrawalEndDate,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface rounded-3xl max-w-xl w-full border border-outline-variant/40 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-secondary p-6 text-on-secondary flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-secondary-fixed uppercase tracking-wider mb-1">
              <Stethoscope className="w-4 h-4" />
              <span>DIGITAL PRESCRIPTION ISSUANCE WORKFLOW</span>
            </div>
            <h2 className="text-2xl font-extrabold font-display">
              Issue Antimicrobial Rx
            </h2>
            <p className="text-xs text-secondary-fixed-dim font-mono mt-1">
              Prescriber: Dr. Ananya Sharma (Lic: VET-IN-2022-8841)
            </p>
          </div>
          <button 
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-secondary-container/30 text-on-secondary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm font-sans">
          
          {/* Select Animal */}
          <div>
            <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
              Select Livestock Patient Tag
            </label>
            <select
              value={selectedAnimalId}
              onChange={(e) => setSelectedAnimalId(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-mono font-bold focus:ring-2 focus:ring-secondary focus:outline-none"
            >
              {animals.map(a => (
                <option key={a.id} value={a.id}>
                  {a.tagId} — {a.name} ({a.breed})
                </option>
              ))}
            </select>
          </div>

          {/* Select Medication */}
          <div>
            <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
              Antimicrobial Drug Selection
            </label>
            <select
              value={medicationName}
              onChange={(e) => handleMedicationChange(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-semibold focus:ring-2 focus:ring-secondary focus:outline-none"
            >
              {MEDICATIONS.map(m => (
                <option key={m.name} value={m.name}>
                  {m.name} ({m.active})
                </option>
              ))}
            </select>
          </div>

          {/* Active Ingredient display */}
          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 text-xs font-mono">
            <span className="text-outline uppercase text-[10px] block">Active Chemical Compound</span>
            <span className="font-bold text-secondary">{activeIngredient}</span>
          </div>

          {/* Dosage & Frequency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Dosage Volume
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-mono focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="e.g. 15 ml (IM)"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Frequency
              </label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="e.g. Once daily"
                required
              />
            </div>
          </div>

          {/* Treatment Duration & Mandatory Withdrawal Days */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Treatment Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-mono font-bold focus:ring-2 focus:ring-secondary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-tertiary uppercase mb-1">
                MRL Milk/Meat Withdrawal (Days)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={withdrawalDays}
                onChange={(e) => setWithdrawalDays(Number(e.target.value))}
                className="w-full bg-tertiary-container/20 border border-tertiary/40 rounded-xl p-3 text-tertiary font-mono font-bold focus:ring-2 focus:ring-tertiary focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Diagnosis Notes */}
          <div>
            <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
              Clinical Indications & Diagnosis Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface text-xs focus:ring-2 focus:ring-secondary focus:outline-none"
              placeholder="Clinical symptoms, fever, respiratory distress, etc."
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2.5 rounded-xl border border-outline-variant/30 text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-secondary text-on-secondary font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Issue & Sign Prescription</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
