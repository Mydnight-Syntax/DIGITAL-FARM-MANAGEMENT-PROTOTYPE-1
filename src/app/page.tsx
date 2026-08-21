"use client";

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { RoleSelectionScreen } from '@/components/portals/RoleSelectionScreen';
import { AuthPage } from '@/components/auth/AuthPage';
import { FarmerPortal } from '@/components/portals/FarmerPortal';
import { VeterinarianPortal } from '@/components/portals/VeterinarianPortal';
import { RegulatorPortal } from '@/components/portals/RegulatorPortal';
import { DigitalPassportModal } from '@/components/modals/DigitalPassportModal';
import { CreatePrescriptionModal } from '@/components/modals/CreatePrescriptionModal';
import { QRScannerModal } from '@/components/modals/QRScannerModal';
import { TraceabilityModal } from '@/components/modals/TraceabilityModal';
import { RegisterAnimalModal } from '@/components/modals/RegisterAnimalModal';
import { UserAuthModal } from '@/components/modals/UserAuthModal';
import { WithdrawalMonitorView } from '@/components/views/WithdrawalMonitorView';
import { MRLComplianceView } from '@/components/views/MRLComplianceView';
import { AMRAnalyticsView } from '@/components/views/AMRAnalyticsView';
import { PrescriptionsView } from '@/components/views/PrescriptionsView';
import { LivestockPassportsView } from '@/components/views/LivestockPassportsView';
import { Smartphone, Monitor } from 'lucide-react';

export default function Home() {
  const { userRole, authScreenState, viewMode, setViewMode, activeModal } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'animals':
        return <LivestockPassportsView />;
      case 'prescriptions':
        return <PrescriptionsView />;
      case 'withdrawals':
        return <WithdrawalMonitorView />;
      case 'mrl-testing':
        return <MRLComplianceView />;
      case 'analytics':
        return <AMRAnalyticsView />;
      case 'dashboard':
      default:
        return (
          <>
            {userRole === 'FARMER' && <FarmerPortal />}
            {userRole === 'VETERINARIAN' && <VeterinarianPortal />}
            {userRole === 'REGULATOR' && <RegulatorPortal />}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Body Flow */}
      {authScreenState === 'ROLE_SELECTION' && <RoleSelectionScreen />}
      {authScreenState === 'AUTH_PAGE' && <AuthPage />}
      {authScreenState === 'DASHBOARD' && (
        <div className="flex flex-1 w-full max-w-[1440px] mx-auto">
          
          {/* Sidebar Navigation */}
          {viewMode === 'DESKTOP' && (
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          )}

          {/* Core Content Area */}
          <main className="flex-1 p-4 md:p-8 min-w-0">
            
            {/* Mobile Device Mockup Frame Container if Judge View Mode is Enabled */}
            {viewMode === 'MOBILE_FRAME' ? (
              <div className="py-6 flex flex-col items-center">
                
                <div className="mb-4 flex items-center justify-between w-full max-w-[430px] px-2 text-xs font-mono">
                  <span className="text-primary font-bold">Mobile Native App Frame</span>
                  <button 
                    onClick={() => setViewMode('DESKTOP')}
                    className="text-secondary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Back to Full Desktop View</span>
                  </button>
                </div>

                {/* iPhone/Mobile Frame */}
                <div className="mobile-frame-container bg-surface border-4 border-outline-variant/30 overflow-y-auto">
                  <div className="mobile-notch" />
                  <div className="pt-10 p-4 space-y-6">
                    {renderActiveContent()}
                  </div>
                </div>

              </div>
            ) : (
              // Desktop Viewport Layout
              renderActiveContent()
            )}

          </main>

        </div>
      )}

      {/* Active Modal Engine */}
      {activeModal === 'DIGITAL_PASSPORT' && <DigitalPassportModal />}
      {activeModal === 'CREATE_PRESCRIPTION' && <CreatePrescriptionModal />}
      {activeModal === 'QR_SCANNER' && <QRScannerModal />}
      {activeModal === 'TRACEABILITY' && <TraceabilityModal />}
      {activeModal === 'REGISTER_ANIMAL' && <RegisterAnimalModal />}
      {activeModal === 'USER_AUTH' && <UserAuthModal />}

    </div>
  );
}
