"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  TrendingUp, 
  ShieldAlert, 
  MapPin, 
  PieChart, 
  BarChart3, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet,
  Activity
} from 'lucide-react';

export const AMRAnalyticsView: React.FC = () => {
  const { amrMetrics } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');

  const filteredMetrics = amrMetrics.filter(m => 
    selectedDistrict === 'ALL' || m.district === selectedDistrict
  );

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-secondary uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span>REGIONAL AMR SURVEILLANCE | KRISHINODE INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight font-display">
            Antimicrobial Resistance & Usage Analytics
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            District-wide WHO AWaRe antibiotic consumption tracking & resistance outbreak surveillance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Generating National AMR Surveillance PDF Report...')}
            className="flex items-center gap-2 bg-secondary text-on-secondary font-semibold px-4 py-2.5 rounded-2xl shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Regulatory Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
            <Activity className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">4,280</span>
            <span className="text-xs text-on-surface-variant block font-mono">Samples Screened This Quarter</span>
          </div>
        </div>

        <div className="bg-primary-container rounded-2xl p-5 border border-primary/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6 text-primary-fixed" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-primary-container font-display">94.2%</span>
            <span className="text-xs text-primary-fixed block font-mono">National Stewardship Rate</span>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold">
            <PieChart className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">72% Access</span>
            <span className="text-xs text-on-surface-variant block font-mono">WHO Access Group Antibiotics</span>
          </div>
        </div>

        <div className="bg-tertiary-container rounded-2xl p-5 border border-tertiary/30 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6 text-on-tertiary-container" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-tertiary-container font-display">2 Outbreaks</span>
            <span className="text-xs text-on-tertiary-container block font-mono">HPCIA Surveillance Watch</span>
          </div>
        </div>

      </div>

      {/* WHO AWaRe Categorization & Resistance Trend Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Chart 1: WHO Category Breakdown */}
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/40 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-on-surface font-display flex items-center gap-2">
              <PieChart className="w-5 h-5 text-secondary" />
              WHO AWaRe Antibicrobial Usage Share
            </h3>
            <span className="text-xs font-mono text-on-surface-variant">Q3 2026</span>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="font-bold text-primary">ACCESS Category (Penicillins, Oxytetracycline):</span>
                <span>72%</span>
              </div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '72%' }} />
              </div>
              <span className="text-[11px] text-on-surface-variant">Recommended for first-line treatment of common livestock infections.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="font-bold text-secondary">WATCH Category (Enrofloxacin, Ceftiofur):</span>
                <span>22%</span>
              </div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '22%' }} />
              </div>
              <span className="text-[11px] text-on-surface-variant">High resistance potential. Requires veterinarian prescription & justification.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="font-bold text-tertiary">RESERVE Category (Colistin, Carbapenems):</span>
                <span>6%</span>
              </div>
              <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '6%' }} />
              </div>
              <span className="text-[11px] text-on-surface-variant">Last-resort human medicine. Strictly restricted in food animals under FSSAI.</span>
            </div>
          </div>
        </div>

        {/* Chart 2: District Risk Matrix */}
        <div className="bg-surface-container rounded-3xl p-6 border border-outline-variant/40 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-on-surface font-display flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-tertiary" />
              District AMR Risk Level Assessment
            </h3>
            <span className="text-xs font-mono text-on-surface-variant">Real-time Feed</span>
          </div>

          <div className="space-y-3 pt-2">
            {amrMetrics.map((metric, idx) => (
              <div key={idx} className="bg-surface p-3.5 rounded-2xl border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <div className="font-bold text-on-surface flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-tertiary" />
                    {metric.district}
                  </div>
                  <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                    Top Prescribed: <span className="font-bold text-secondary">{metric.topAntibioticUsed}</span> • Samples: {metric.totalSamples}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                    metric.resistanceRiskLevel === 'LOW' ? 'bg-primary-container text-on-primary-container' :
                    metric.resistanceRiskLevel === 'MODERATE' ? 'bg-secondary-container text-on-secondary-container' :
                    'bg-error-container text-on-error-container'
                  }`}>
                    {metric.resistanceRiskLevel} RISK
                  </span>
                  <div className="text-xs font-mono text-primary font-bold mt-1">
                    {metric.complianceRate}% Compliance
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
