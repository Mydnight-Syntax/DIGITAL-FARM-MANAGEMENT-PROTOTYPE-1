"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  QrCode, 
  Camera, 
  CheckCircle2, 
  Search, 
  Zap,
  Sparkles
} from 'lucide-react';

export const QRScannerModal: React.FC = () => {
  const { closeModal, scanTag, animals } = useApp();
  const [selectedTag, setSelectedTag] = useState(animals[0]?.tagId || 'RFID-840-9921');
  const [isScanning, setIsScanning] = useState(true);

  const handleSimulateScan = () => {
    setIsScanning(false);
    setTimeout(() => {
      closeModal();
      scanTag(selectedTag);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-surface rounded-3xl max-w-md w-full border border-outline-variant/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-primary p-5 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary-fixed" />
            <h3 className="font-bold text-lg font-display">Livestock Tag QR Scanner</h3>
          </div>
          <button 
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-primary-container/40 text-on-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Scanner Simulation viewport */}
        <div className="p-6 space-y-6 flex flex-col items-center">
          
          <div className="relative w-64 h-64 bg-on-surface rounded-3xl overflow-hidden flex items-center justify-center border-4 border-primary shadow-inner group">
            
            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-fixed to-transparent shadow-[0_0_15px_#95d3ba] animate-bounce my-auto top-0 bottom-0 z-20" />
            )}

            {/* Camera Viewfinder Crosshairs */}
            <div className="absolute inset-6 border-2 border-dashed border-primary-fixed/60 rounded-2xl pointer-events-none z-10" />

            <div className="text-center p-4 z-0 space-y-2">
              <Camera className="w-12 h-12 text-primary-fixed mx-auto animate-pulse" />
              <p className="text-xs text-surface-variant font-mono">
                {isScanning ? 'Align ear tag QR code within viewfinder...' : 'Tag Detected! Verifying Blockchain Record...'}
              </p>
            </div>
          </div>

          {/* Quick Select Dropdown for Hackathon Demo */}
          <div className="w-full space-y-2">
            <label className="block text-xs font-mono font-bold text-on-surface uppercase text-center">
              Simulate Ear Tag Scan (Hackathon Demo)
            </label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3 text-on-surface font-mono font-bold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {animals.map(a => (
                <option key={a.id} value={a.tagId}>
                  {a.tagId} — {a.name} ({a.species})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSimulateScan}
            className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-bold py-3.5 rounded-2xl shadow-md hover:bg-primary-container transition-colors text-sm"
          >
            <Zap className="w-4 h-4 text-primary-fixed" />
            <span>Scan & Verify Animal Passport</span>
          </button>

        </div>

      </div>
    </div>
  );
};
