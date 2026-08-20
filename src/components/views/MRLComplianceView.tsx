"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  FlaskConical, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  FileCheck, 
  Download, 
  Lock, 
  Unlock, 
  Search,
  Filter
} from 'lucide-react';

export const MRLComplianceView: React.FC = () => {
  const { mrlTests, searchQuery } = useApp();
  const [filterResult, setFilterResult] = useState<'ALL' | 'COMPLIANT' | 'EXCEEDED'>('ALL');
  const [quarantinedFarms, setQuarantinedFarms] = useState<string[]>(['Sunset Dairy Co.']);

  const filteredTests = mrlTests.filter(m => {
    const matchesSearch = 
      m.sampleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.compoundTested.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.animalTagId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesResult = 
      filterResult === 'ALL' || m.result === filterResult;

    return matchesSearch && matchesResult;
  });

  const toggleQuarantine = (farmName: string) => {
    if (quarantinedFarms.includes(farmName)) {
      setQuarantinedFarms(prev => prev.filter(f => f !== farmName));
    } else {
      setQuarantinedFarms(prev => [...prev, farmName]);
    }
  };

  const compliantCount = mrlTests.filter(m => m.result === 'COMPLIANT').length;
  const exceededCount = mrlTests.filter(m => m.result === 'EXCEEDED').length;

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-tertiary uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4 text-tertiary" />
            <span>NATIONAL MRL COMPLIANCE CENTER | KRISHINODE FOOD SAFETY</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-on-background tracking-tight font-display">
            Maximum Residue Limit (MRL) Audit & Lab Testing
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Laboratory residue tracking for milk, meat, and tissue samples. FSSAI Regulation 2026.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-surface p-3 rounded-2xl border border-outline-variant/40 text-center font-mono">
            <span className="text-xs text-on-surface-variant block">Compliance Rate</span>
            <span className="text-xl font-extrabold text-primary">
              {Math.round((compliantCount / mrlTests.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
            <FlaskConical className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-surface font-display">{mrlTests.length}</span>
            <span className="text-xs text-on-surface-variant block font-mono">Lab Samples Processed</span>
          </div>
        </div>

        <div className="bg-primary-container rounded-2xl p-5 border border-primary/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6 text-primary-fixed" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-primary-container font-display">{compliantCount}</span>
            <span className="text-xs text-primary-fixed block font-mono">Passed MRL Safety</span>
          </div>
        </div>

        <div className="bg-tertiary-container rounded-2xl p-5 border border-tertiary/30 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6 text-on-tertiary-container" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-on-tertiary-container font-display">{exceededCount}</span>
            <span className="text-xs text-on-tertiary-container block font-mono">Violative Residues</span>
          </div>
        </div>

        <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold">
            <Lock className="w-6 h-6 text-error" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-error font-display">{quarantinedFarms.length}</span>
            <span className="text-xs text-on-surface-variant block font-mono">Farms Under Quarantine</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30 font-mono text-xs">
        <Filter className="w-4 h-4 text-on-surface-variant" />
        <span className="font-bold text-on-surface-variant uppercase">Filter Results:</span>
        <button
          onClick={() => setFilterResult('ALL')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterResult === 'ALL' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          All Tests
        </button>
        <button
          onClick={() => setFilterResult('COMPLIANT')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterResult === 'COMPLIANT' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Compliant ({compliantCount})
        </button>
        <button
          onClick={() => setFilterResult('EXCEEDED')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            filterResult === 'EXCEEDED' ? 'bg-tertiary-container text-on-tertiary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          Violative ({exceededCount})
        </button>
      </div>

      {/* Laboratory Test Table */}
      <div className="bg-surface-container rounded-3xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-bold text-on-surface font-display">
              Laboratory Residue Testing Log
            </h3>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">ISO/IEC 17025 Accredited Testing</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant/30 text-[11px] font-mono uppercase text-on-surface-variant tracking-wider">
                <th className="p-4">Sample ID & Date</th>
                <th className="p-4">Farm & Location</th>
                <th className="p-4">Tag ID / Sample</th>
                <th className="p-4">Substance Tested</th>
                <th className="p-4">Detected vs MRL Limit</th>
                <th className="p-4">Status & Action</th>
                <th className="p-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {filteredTests.map((test) => {
                const isViolative = test.result === 'EXCEEDED';
                const isQuarantined = quarantinedFarms.includes(test.farmName);

                return (
                  <tr key={test.id} className="hover:bg-surface-container-high/50 transition-colors">
                    <td className="p-4 font-mono">
                      <div className="font-bold text-on-surface">{test.sampleId}</div>
                      <div className="text-xs text-on-surface-variant">{test.testDate}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-on-surface">{test.farmName}</div>
                      <div className="text-xs text-on-surface-variant flex items-center gap-1 font-mono">
                        <Building2 className="w-3 h-3 text-secondary" />
                        Insp: {test.inspector}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs">
                      <div className="font-bold text-primary">{test.animalTagId}</div>
                      <div className="text-on-surface-variant">{test.sampleType}</div>
                    </td>
                    <td className="p-4 font-semibold text-on-surface">
                      {test.compoundTested}
                    </td>
                    <td className="p-4 font-mono text-xs">
                      <div className="flex items-center gap-1">
                        <span className={isViolative ? 'font-bold text-error' : 'font-bold text-primary'}>
                          {test.detectedLevelPpm} ppm
                        </span>
                        <span className="text-on-surface-variant">/ {test.mrlLimitPpm} ppm</span>
                      </div>
                      <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden mt-1">
                        <div 
                          className={`h-full ${isViolative ? 'bg-error' : 'bg-primary'}`}
                          style={{ width: `${Math.min(100, (test.detectedLevelPpm / test.mrlLimitPpm) * 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="p-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          isViolative ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'
                        }`}>
                          {test.result}
                        </span>

                        {isViolative && (
                          <button
                            onClick={() => toggleQuarantine(test.farmName)}
                            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-semibold ${
                              isQuarantined 
                                ? 'bg-error text-on-error border-error' 
                                : 'bg-surface-container-high text-error border-error/40 hover:bg-error-container'
                            }`}
                            title="Toggle Farm Supply Chain Quarantine Hold"
                          >
                            {isQuarantined ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                            <span>{isQuarantined ? 'Quarantined' : 'Quarantine'}</span>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => alert(`Downloading Lab Certificate ${test.sampleId}.pdf for ${test.farmName}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface hover:bg-surface-container text-secondary rounded-xl border border-outline-variant/40 text-xs font-medium font-mono"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Certificate</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
