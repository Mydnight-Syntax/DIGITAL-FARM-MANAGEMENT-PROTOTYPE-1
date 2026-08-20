"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  Stethoscope, 
  Building2, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const UserAuthModal: React.FC = () => {
  const { closeModal, setUserRole } = useApp();
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [selectedRole, setSelectedRole] = useState<UserRole>('FARMER');
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState(''); // Farm ID, Vet License #, or Govt ID
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(authMode === 'LOGIN' ? `Successfully signed in as ${selectedRole}` : `Registered new account for ${fullName} (${identifier})`);
    setTimeout(() => {
      setUserRole(selectedRole);
      closeModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface rounded-3xl max-w-xl w-full border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header Banner */}
        <div className="bg-primary p-6 text-on-primary flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-primary-fixed uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>KRISHINODE IDENTITY PORTAL</span>
            </div>
            <h2 className="text-2xl font-extrabold font-display">
              {authMode === 'LOGIN' ? 'Sign In to Krishinode Platform' : 'New User Registration'}
            </h2>
            <p className="text-xs text-on-primary-container mt-1">
              Role-Based Access Control for Farmers, Veterinarians & Government Regulators
            </p>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-primary-container text-on-primary transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary-container/20 rounded-full blur-xl" />
        </div>

        {/* Auth Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Success Banner */}
          {successMsg && (
            <div className="bg-primary-container text-on-primary-container p-4 rounded-2xl flex items-center gap-3 text-sm font-mono font-bold animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Role Selector Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase text-on-surface-variant">Select Account Role:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('FARMER')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  selectedRole === 'FARMER'
                    ? 'bg-primary text-on-primary border-primary shadow-sm'
                    : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <UserCheck className="w-4 h-4 mb-1" />
                Farmer
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('VETERINARIAN')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  selectedRole === 'VETERINARIAN'
                    ? 'bg-secondary text-on-secondary border-secondary shadow-sm'
                    : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <Stethoscope className="w-4 h-4 mb-1" />
                Veterinarian
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('REGULATOR')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  selectedRole === 'REGULATOR'
                    ? 'bg-tertiary-container text-on-tertiary-container border-tertiary shadow-sm'
                    : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <Building2 className="w-4 h-4 mb-1" />
                Regulator / MRL
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {authMode === 'REGISTER' && (
              <div>
                <label className="text-xs font-mono text-on-surface-variant block mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Patel"
                  className="w-full bg-surface-container-highest border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">Email Address:</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-surface-container-highest border border-outline-variant/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">Password:</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-surface-container-highest border border-outline-variant/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-on-surface-variant block mb-1">
                {selectedRole === 'FARMER' && 'Farm Registration ID (e.g. FARM-GV-992):'}
                {selectedRole === 'VETERINARIAN' && 'Veterinary Medical License # (e.g. VET-IN-8841):'}
                {selectedRole === 'REGULATOR' && 'Government Official License / FSSAI Badge ID:'}
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={selectedRole === 'FARMER' ? 'FARM-GV-992' : selectedRole === 'VETERINARIAN' ? 'VET-IN-2026-8841' : 'GOVT-FSSAI-4019'}
                className="w-full bg-surface-container-highest border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-container text-on-primary font-semibold py-3 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <span>{authMode === 'LOGIN' ? `Sign In to ${selectedRole} Workspace` : 'Complete Account Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Auth Toggle */}
          <div className="text-center pt-2 border-t border-outline-variant/30 text-xs text-on-surface-variant">
            {authMode === 'LOGIN' ? (
              <p>
                Don't have a Krishinode account?{' '}
                <button
                  onClick={() => setAuthMode('REGISTER')}
                  className="text-primary font-bold hover:underline"
                >
                  Register New Account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('LOGIN')}
                  className="text-primary font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
