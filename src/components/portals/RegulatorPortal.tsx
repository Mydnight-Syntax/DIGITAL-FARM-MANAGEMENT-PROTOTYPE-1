"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  ShieldAlert, 
  FlaskConical, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  GitMerge, 
  MapPin, 
  FileCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const RegulatorPortal: React.FC = () => {
  const { 
    mrlTests, 
    amrMetrics, 
    openModal, 
    searchQuery 
  } = useApp();

  const filteredMrl = mrlTests.filter(m => 
    m.sampleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.compoundTested.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Regulator Header Banner */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-tertiary uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>GOVERNMENT REGULATOR & FOOD SAFETY COMMAND CENTER</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight font-display">
            MRL & AMR Regional Oversight
          </h1>
          <p className="text-sm text-on-surface-variant mt-1 font-mono">
            FSSAI / Department of Animal Husbandry & Dairying Food Chain Audit
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal('TRACEABILITY')}
            className="flex items-center gap-2 bg-tertiary-container text-on-tertiary-container font-semibold px-4 py-2.5 rounded-2xl shadow-md hover:bg-tertiary hover:text-on-tertiary transition-colors text-sm"
          >
            <GitMerge className="w-4 h-4" />
            <span>Open Traceability Hub</span>
          </button>
        </div>
      </div>

      {/* Regional District Surveillance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {amrMetrics.map((dist, idx) => (
          <div 
            key={idx}
            className="bg-surface-container rounded-3xl p-6 border border-outline-variant/40 shadow-sm space-y-4 hover:border-tertiary/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-tertiary" />
                <h3 className="text-lg font-bold text-on-surface font-display">
                  {dist.district}
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                dist.resistanceRiskLevel === 'LOW'
                  ? 'bg-primary-container text-on-primary-container'
                  : dist.resistanceRiskLevel === 'MODERATE'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-error-container text-on-error-container'
              }`}>
                {dist.resistanceRiskLevel} RISK
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant">Lab Samples Tested:</span>
                <span className="font-bold text-on-surface">{dist.totalSamples}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant">MRL Compliance Rate:</span>
                <span className={`font-bold ${dist.complianceRate >= 90 ? 'text-primary' : 'text-error'}`}>
                  {dist.complianceRate}%
                </span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant">Primary Antimicrobial:</span>
                <span className="font-bold text-secondary">{dist.topAntibioticUsed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Active Resistance Flags:</span>
                <span className="font-bold text-error">{dist.activeOutbreaks} Flags</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* MRL Test Results & Lab Clearance Log */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FSSAI Laboratory Verification Protocol</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface font-display">
              Maximum Residue Limit (MRL) Test Records
            </h2>
          </div>

          <span className="text-xs font-mono text-on-surface-variant">
            Official Reference Lab: Central Food & AMR Testing Center
          </span>
        </div>

        {/* MRL Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-[11px] font-mono uppercase text-on-surface-variant">
                <th className="pb-3 px-3">Sample ID</th>
                <th className="pb-3 px-3">Farm & Tag</th>
                <th className="pb-3 px-3">Product Type</th>
                <th className="pb-3 px-3">Compound Tested</th>
                <th className="pb-3 px-3">Detected Level vs MRL</th>
                <th className="pb-3 px-3">Verdict</th>
                <th className="pb-3 px-3">Inspector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {filteredMrl.map((mrl) => (
                <tr key={mrl.id} className="hover:bg-surface-container-high transition-colors">
                  <td className="py-4 px-3 font-mono font-bold text-primary">
                    {mrl.sampleId}
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-semibold text-on-surface block">{mrl.farmName}</span>
                    <span className="text-xs font-mono text-outline block">{mrl.animalTagId}</span>
                  </td>
                  <td className="py-4 px-3 text-on-surface-variant font-medium">
                    {mrl.sampleType}
                  </td>
                  <td className="py-4 px-3 font-mono font-semibold text-secondary">
                    {mrl.compoundTested}
                  </td>
                  <td className="py-4 px-3 font-mono text-xs">
                    <span className={`font-bold ${mrl.detectedLevelPpm > mrl.mrlLimitPpm ? 'text-error' : 'text-primary'}`}>
                      {mrl.detectedLevelPpm} ppm
                    </span>
                    <span className="text-outline"> / Limit: {mrl.mrlLimitPpm} ppm</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                      mrl.result === 'COMPLIANT'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-error-container text-on-error-container'
                    }`}>
                      {mrl.result === 'COMPLIANT' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      {mrl.result}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-xs text-on-surface-variant font-mono">
                    {mrl.inspector}
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
