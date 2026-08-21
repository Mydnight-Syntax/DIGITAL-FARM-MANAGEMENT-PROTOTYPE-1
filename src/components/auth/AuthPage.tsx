"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { 
  ShieldCheck, 
  UserCheck, 
  Stethoscope, 
  Building2, 
  Lock, 
  Mail, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  UserPlus,
  LogIn,
  KeyRound,
  FileCheck
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { 
    pendingRole, 
    setPendingRole, 
    authenticateUser, 
    goToRoleSelection 
  } = useApp();

  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleRoleChange = (role: UserRole) => {
    setPendingRole(role);
    setSuccessMsg('');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const defaultName = fullName || (pendingRole === 'FARMER' ? 'Rajesh Kumar' : pendingRole === 'VETERINARIAN' ? 'Dr. Ananya Sharma' : 'Officer Suresh Mehta');
    const defaultEmail = email || (pendingRole === 'FARMER' ? 'rajesh@greenvalley.in' : pendingRole === 'VETERINARIAN' ? 'ananya@vetcare.in' : 'suresh.mehta@fssai.gov.in');
    const defaultId = identifier || (pendingRole === 'FARMER' ? 'FARM-GV-992' : pendingRole === 'VETERINARIAN' ? 'VET-IN-2022-8841' : 'GOVT-FSSAI-4019');

    setSuccessMsg(
      authMode === 'LOGIN' 
        ? `Verified credentials! Redirecting to ${getRoleTitle(pendingRole)} Dashboard...` 
        : `Registered account for ${defaultName}! Entering Dashboard...`
    );

    setTimeout(() => {
      setIsLoading(false);
      authenticateUser(pendingRole, {
        name: defaultName,
        email: defaultEmail,
        identifier: defaultId
      });
    }, 1000);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setPendingRole(role);
    setIsLoading(true);
    setSuccessMsg(`1-Click Demo Login as ${getRoleTitle(role)} successful! Entering Dashboard...`);
    
    setTimeout(() => {
      setIsLoading(false);
      authenticateUser(role);
    }, 800);
  };

  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case 'FARMER': return 'Farmer Portal';
      case 'VETERINARIAN': return 'Veterinarian Portal';
      case 'REGULATOR': return 'Regulator / MRL Inspector';
      default: return 'User';
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'FARMER': return 'Access livestock health passports, withdrawal timers, and MRL safety alerts.';
      case 'VETERINARIAN': return 'Issue e-prescriptions, track AMU stewardship, and audit clinical logs.';
      case 'REGULATOR': return 'Monitor regional AMR heatmaps, lab MRL compliance, and food safety chains.';
      default: return '';
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-4 md:p-8 bg-background relative overflow-hidden">
      
      {/* Background Subtle Gradient Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Top Breadcrumb Navigation */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 z-10">
        <button
          onClick={goToRoleSelection}
          className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full text-xs font-semibold text-on-surface-variant hover:text-on-surface border border-outline-variant/40 hover:bg-surface-container transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Role Selection</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs font-mono border border-outline-variant/30">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Step 2 of 3: User Authentication</span>
        </div>
      </div>

      {/* Main Auth Card Container */}
      <div className="w-full max-w-4xl bg-surface rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10">
        
        {/* Left Side Info Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-primary-container/80 via-primary-container/40 to-surface p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-outline-variant/30 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-on-primary shadow-md mb-6">
              <ShieldCheck className="w-7 h-7 text-primary-fixed" />
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
              Krishinode Identity Shield
            </span>
            <h2 className="text-2xl font-extrabold text-on-surface tracking-tight mt-1 mb-3 font-display">
              {getRoleTitle(pendingRole)}
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {getRoleDescription(pendingRole)}
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                <FileCheck className="w-4 h-4 text-primary" />
                <span>Encrypted Blockchain-Verified Identity</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                <KeyRound className="w-4 h-4 text-secondary" />
                <span>Role-Based Access Control (RBAC)</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Login Preset Buttons */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30 relative z-10">
            <p className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-bold mb-3">
              ⚡ 1-Click Quick Demo Sign In:
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('FARMER')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                  pendingRole === 'FARMER'
                    ? 'bg-primary text-on-primary border-primary shadow-md'
                    : 'bg-surface hover:bg-surface-container text-on-surface border-outline-variant/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Demo Farmer Sign In</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-70" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('VETERINARIAN')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                  pendingRole === 'VETERINARIAN'
                    ? 'bg-secondary text-on-secondary border-secondary shadow-md'
                    : 'bg-surface hover:bg-surface-container text-on-surface border-outline-variant/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>Demo Vet Sign In</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-70" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('REGULATOR')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                  pendingRole === 'REGULATOR'
                    ? 'bg-tertiary-container text-on-tertiary-container border-tertiary shadow-md'
                    : 'bg-surface hover:bg-surface-container text-on-surface border-outline-variant/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Demo Regulator Sign In</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="md:col-span-7 p-8 flex flex-col justify-between">
          <div>
            
            {/* Target Role Switcher Tabs */}
            <div className="mb-6">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-on-surface-variant block mb-2">
                1. Selected Account Role:
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-surface-container rounded-2xl border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => handleRoleChange('FARMER')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    pendingRole === 'FARMER'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Farmer</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('VETERINARIAN')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    pendingRole === 'VETERINARIAN'
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Vet</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('REGULATOR')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    pendingRole === 'REGULATOR'
                      ? 'bg-tertiary-container text-on-tertiary-container shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Regulator</span>
                </button>
              </div>
            </div>

            {/* Auth Mode Toggle (Sign In / Register) */}
            <div className="flex items-center border-b border-outline-variant/30 mb-6">
              <button
                type="button"
                onClick={() => setAuthMode('LOGIN')}
                className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-semibold text-xs transition-colors ${
                  authMode === 'LOGIN'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Account</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('REGISTER')}
                className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-semibold text-xs transition-colors ${
                  authMode === 'REGISTER'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Register New User</span>
              </button>
            </div>

            {/* Alert / Success Feedback Banner */}
            {successMsg && (
              <div className="mb-6 bg-primary-container text-on-primary-container p-4 rounded-2xl flex items-center gap-3 text-xs font-mono font-bold animate-fadeIn border border-primary/20">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {authMode === 'REGISTER' && (
                <div>
                  <label className="text-xs font-mono text-on-surface-variant block mb-1">Full Name:</label>
                  <input
                    type="text"
                    required={authMode === 'REGISTER'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={
                      pendingRole === 'FARMER' ? 'e.g. Rajesh Kumar' :
                      pendingRole === 'VETERINARIAN' ? 'e.g. Dr. Ananya Sharma' : 'e.g. Inspector Suresh Mehta'
                    }
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      pendingRole === 'FARMER' ? 'rajesh@greenvalley.in' :
                      pendingRole === 'VETERINARIAN' ? 'ananya@vetcare.in' : 'suresh.mehta@fssai.gov.in'
                    }
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-surface-container-highest border border-outline-variant/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-on-surface-variant block mb-1">
                  {pendingRole === 'FARMER' && 'Farm Registration ID (e.g. FARM-GV-992):'}
                  {pendingRole === 'VETERINARIAN' && 'Veterinary License # (e.g. VET-IN-8841):'}
                  {pendingRole === 'REGULATOR' && 'Government Badge ID (e.g. GOVT-FSSAI-4019):'}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    pendingRole === 'FARMER' ? 'FARM-GV-992' : 
                    pendingRole === 'VETERINARIAN' ? 'VET-IN-2022-8841' : 'GOVT-FSSAI-4019'
                  }
                  className="w-full bg-surface-container-highest border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-semibold py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-4 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{authMode === 'LOGIN' ? `Sign In & Open ${getRoleTitle(pendingRole)}` : 'Complete Registration & Enter Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

          </div>

          <div className="mt-6 pt-4 border-t border-outline-variant/30 text-center text-xs text-on-surface-variant">
            <p>
              By signing in, you agree to Krishinode Sentinel's AMR Safety Protocol and Data Governance guidelines.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
