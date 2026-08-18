"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Plus, 
  PawPrint, 
  CheckCircle2 
} from 'lucide-react';

export const RegisterAnimalModal: React.FC = () => {
  const { closeModal, addAnimal } = useApp();

  const [tagId, setTagId] = useState(`RFID-840-${Math.floor(1000 + Math.random() * 9000)}`);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'Cow' | 'Buffalo' | 'Goat' | 'Pig'>('Cow');
  const [breed, setBreed] = useState('Gir Cattle');
  const [ageMonths, setAgeMonths] = useState(24);
  const [weightKg, setWeightKg] = useState(450);
  const [farmName, setFarmName] = useState('Green Valley Dairy Farm');
  const [ownerName, setOwnerName] = useState('Rajesh Kumar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addAnimal({
      tagId,
      name: `${name} (${breed})`,
      species,
      breed,
      ageMonths: Number(ageMonths),
      weightKg: Number(weightKg),
      status: 'Healthy',
      farmName,
      ownerName,
      healthScore: 92,
      lastVaccine: '2026-08-01 (Routine Immunization)',
      vaccines: [
        { name: 'Routine FMD Booster', date: '2026-08-01', vet: 'Dr. Ananya Sharma' }
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface rounded-3xl max-w-lg w-full border border-outline-variant/40 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-primary p-6 text-on-primary flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary-fixed uppercase tracking-wider mb-1">
              <PawPrint className="w-4 h-4" />
              <span>NEW LIVESTOCK REGISTRATION WORKFLOW</span>
            </div>
            <h2 className="text-2xl font-extrabold font-display">
              Register Animal Tag
            </h2>
          </div>
          <button 
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-primary-container/40 text-on-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm font-sans">
          
          <div>
            <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
              RFID Ear Tag ID Number
            </label>
            <input
              type="text"
              value={tagId}
              onChange={(e) => setTagId(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-mono font-bold focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Animal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nandini"
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Species Category
              </label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as any)}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-semibold focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="Cow">Cow</option>
                <option value="Buffalo">Buffalo</option>
                <option value="Goat">Goat</option>
                <option value="Pig">Pig</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Breed
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Age (Months)
              </label>
              <input
                type="number"
                value={ageMonths}
                onChange={(e) => setAgeMonths(Number(e.target.value))}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-mono focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-mono focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Farm Owner Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-on-surface uppercase mb-1">
                Farm Facility Name
              </label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
          </div>

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
              className="flex items-center gap-2 bg-primary text-on-primary font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md hover:bg-primary-container transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Register & Mint Passport</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
