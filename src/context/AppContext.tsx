"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  AuthScreenState,
  UserProfile,
  ViewMode, 
  Animal, 
  Prescription, 
  WithdrawalTimer, 
  MRLTest, 
  AMRMetric, 
  ModalType 
} from '@/types';

// Pre-populated initial realistic mock data
const INITIAL_ANIMALS: Animal[] = [
  {
    id: 'anim-1',
    tagId: 'RFID-840-9921',
    name: 'Gauri (Holstein Friesian)',
    species: 'Cow',
    breed: 'Holstein Friesian',
    ageMonths: 36,
    weightKg: 520,
    status: 'Withdrawal Active',
    farmName: 'Green Valley Dairy Farm',
    ownerName: 'Rajesh Kumar',
    healthScore: 88,
    lastVaccine: '2026-07-15 (FMD Booster)',
    vaccines: [
      { name: 'FMD Vaccine', date: '2026-07-15', vet: 'Dr. Ananya Sharma' },
      { name: 'Brucellosis Strain 19', date: '2025-11-10', vet: 'Dr. Ananya Sharma' },
      { name: 'HS + BQ Combined', date: '2025-05-20', vet: 'Dr. Rajesh Patel' }
    ],
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KRISHINODE-PASSPORT-RFID-840-9921'
  },
  {
    id: 'anim-2',
    tagId: 'RFID-840-9922',
    name: 'Laxmi (Gir Cattle)',
    species: 'Cow',
    breed: 'Gir',
    ageMonths: 42,
    weightKg: 460,
    status: 'Healthy',
    farmName: 'Green Valley Dairy Farm',
    ownerName: 'Rajesh Kumar',
    healthScore: 95,
    lastVaccine: '2026-06-01 (Anthrax Spot)',
    vaccines: [
      { name: 'FMD Vaccine', date: '2026-06-01', vet: 'Dr. Ananya Sharma' }
    ],
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KRISHINODE-PASSPORT-RFID-840-9922'
  },
  {
    id: 'anim-3',
    tagId: 'RFID-840-9923',
    name: 'Kaali (Murrah Buffalo)',
    species: 'Buffalo',
    breed: 'Murrah',
    ageMonths: 48,
    weightKg: 610,
    status: 'Under Treatment',
    farmName: 'Green Valley Dairy Farm',
    ownerName: 'Rajesh Kumar',
    healthScore: 74,
    lastVaccine: '2026-07-20 (Mastitis Guard)',
    vaccines: [
      { name: 'Mastitis Guard', date: '2026-07-20', vet: 'Dr. Ananya Sharma' }
    ],
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KRISHINODE-PASSPORT-RFID-840-9923'
  },
  {
    id: 'anim-4',
    tagId: 'RFID-840-9924',
    name: 'Bheem (Sahiwal Bull)',
    species: 'Cow',
    breed: 'Sahiwal',
    ageMonths: 30,
    weightKg: 580,
    status: 'MRL Risk',
    farmName: 'Green Valley Dairy Farm',
    ownerName: 'Rajesh Kumar',
    healthScore: 68,
    lastVaccine: '2026-04-10 (Rabies Vax)',
    vaccines: [
      { name: 'Rabies Vax', date: '2026-04-10', vet: 'Dr. Ananya Sharma' }
    ],
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KRISHINODE-PASSPORT-RFID-840-9924'
  }
];

const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-101',
    prescriptionNumber: 'RX-2026-0891',
    animalId: 'anim-1',
    animalTagId: 'RFID-840-9921',
    animalName: 'Gauri (Holstein)',
    vetName: 'Dr. Ananya Sharma',
    vetLicense: 'VET-IN-2022-8841',
    medicationName: 'Oxytet-LA 200mg/ml',
    activeIngredient: 'Oxytetracycline Hydrochloride',
    dosage: '20 ml (Intramuscular)',
    frequency: 'Once daily',
    durationDays: 3,
    issuedDate: '2026-08-15',
    withdrawalDays: 7,
    withdrawalEndDate: '2026-08-22',
    status: 'ACTIVE',
    notes: 'Acute Respiratory Tract Infection. Strict milk withdrawal enforced until Aug 22.'
  },
  {
    id: 'rx-102',
    prescriptionNumber: 'RX-2026-0895',
    animalId: 'anim-3',
    animalTagId: 'RFID-840-9923',
    animalName: 'Kaali (Murrah)',
    vetName: 'Dr. Ananya Sharma',
    vetLicense: 'VET-IN-2022-8841',
    medicationName: 'Cefquinome 25mg/ml',
    activeIngredient: 'Cefquinome Sulfate (4th Gen Cephalosporin)',
    dosage: '10 ml',
    frequency: 'Every 24 hrs',
    durationDays: 5,
    issuedDate: '2026-08-17',
    withdrawalDays: 5,
    withdrawalEndDate: '2026-08-22',
    status: 'ACTIVE',
    notes: 'Clinical Mastitis treatment. High surveillance drug.'
  }
];

const INITIAL_WITHDRAWAL_TIMERS: WithdrawalTimer[] = [
  {
    id: 'w-1',
    animalId: 'anim-1',
    animalTagId: 'RFID-840-9921',
    animalName: 'Gauri (Holstein)',
    productType: 'Milk',
    drugName: 'Oxytet-LA',
    startDate: '2026-08-15',
    endDate: '2026-08-22',
    totalDays: 7,
    remainingHours: 92,
    status: 'ACTIVE_RESTRICTION'
  },
  {
    id: 'w-2',
    animalId: 'anim-3',
    animalTagId: 'RFID-840-9923',
    animalName: 'Kaali (Murrah)',
    productType: 'Milk',
    drugName: 'Cefquinome',
    startDate: '2026-08-17',
    endDate: '2026-08-22',
    totalDays: 5,
    remainingHours: 114,
    status: 'ACTIVE_RESTRICTION'
  },
  {
    id: 'w-3',
    animalId: 'anim-4',
    animalTagId: 'RFID-840-9924',
    animalName: 'Bheem (Sahiwal)',
    productType: 'Meat',
    drugName: 'Streptopenicillin',
    startDate: '2026-08-01',
    endDate: '2026-08-14',
    totalDays: 14,
    remainingHours: 0,
    status: 'CRITICAL_WARNING'
  }
];

const INITIAL_MRL_TESTS: MRLTest[] = [
  {
    id: 'mrl-501',
    sampleId: 'SMP-2026-9901',
    farmName: 'Green Valley Dairy Farm',
    animalTagId: 'RFID-840-9921',
    sampleType: 'Raw Milk',
    compoundTested: 'Oxytetracycline',
    detectedLevelPpm: 0.08,
    mrlLimitPpm: 0.10,
    testDate: '2026-08-18',
    result: 'COMPLIANT',
    labName: 'Central Food & AMR Reference Lab',
    inspector: 'Dr. Suresh Mehta (FSSAI/Govt Inspector)'
  },
  {
    id: 'mrl-502',
    sampleId: 'SMP-2026-9904',
    farmName: 'Green Valley Dairy Farm',
    animalTagId: 'RFID-840-9924',
    sampleType: 'Tissue/Meat',
    compoundTested: 'Penicillin G',
    detectedLevelPpm: 0.14,
    mrlLimitPpm: 0.05,
    testDate: '2026-08-17',
    result: 'EXCEEDED',
    labName: 'Central Food & AMR Reference Lab',
    inspector: 'Dr. Suresh Mehta (FSSAI/Govt Inspector)'
  }
];

const INITIAL_AMR_METRICS: AMRMetric[] = [
  { district: 'Northern Sector (District A)', totalSamples: 420, complianceRate: 94.2, resistanceRiskLevel: 'LOW', topAntibioticUsed: 'Enrofloxacin', activeOutbreaks: 0 },
  { district: 'Central Dairy Hub (District B)', totalSamples: 850, complianceRate: 88.5, resistanceRiskLevel: 'MODERATE', topAntibioticUsed: 'Oxytetracycline', activeOutbreaks: 1 },
  { district: 'Southern Region (District C)', totalSamples: 310, complianceRate: 74.0, resistanceRiskLevel: 'CRITICAL', topAntibioticUsed: 'Cefquinome', activeOutbreaks: 3 }
];

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  pendingRole: UserRole;
  setPendingRole: (role: UserRole) => void;
  authScreenState: AuthScreenState;
  setAuthScreenState: (state: AuthScreenState) => void;
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  selectRoleForAuth: (role: UserRole) => void;
  authenticateUser: (role?: UserRole, profile?: Partial<UserProfile>) => void;
  logoutUser: () => void;
  goToRoleSelection: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  animals: Animal[];
  prescriptions: Prescription[];
  withdrawalTimers: WithdrawalTimer[];
  mrlTests: MRLTest[];
  amrMetrics: AMRMetric[];
  activeModal: ModalType;
  selectedAnimal: Animal | null;
  selectedPrescription: Prescription | null;
  selectedMRLTest: MRLTest | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openModal: (type: ModalType, payload?: { animal?: Animal; prescription?: Prescription; mrlTest?: MRLTest }) => void;
  closeModal: () => void;
  addAnimal: (animal: Omit<Animal, 'id' | 'qrCode'>) => void;
  createPrescription: (prescriptionData: Omit<Prescription, 'id' | 'prescriptionNumber' | 'status'>) => void;
  scanTag: (tagId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRoleState] = useState<UserRole>('ROLE_SELECT');
  const [pendingRole, setPendingRole] = useState<UserRole>('FARMER');
  const [authScreenState, setAuthScreenState] = useState<AuthScreenState>('ROLE_SELECTION');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>('DESKTOP');
  const [animals, setAnimals] = useState<Animal[]>(INITIAL_ANIMALS);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [withdrawalTimers, setWithdrawalTimers] = useState<WithdrawalTimer[]>(INITIAL_WITHDRAWAL_TIMERS);
  const [mrlTests, setMrlTests] = useState<MRLTest[]>(INITIAL_MRL_TESTS);
  const [amrMetrics] = useState<AMRMetric[]>(INITIAL_AMR_METRICS);
  
  const [activeModal, setActiveModal] = useState<ModalType>('NONE');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [selectedMRLTest, setSelectedMRLTest] = useState<MRLTest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDbConnected, setIsDbConnected] = useState(false);

  // Initialize local PostgreSQL schema from schema.sql on app launch
  useEffect(() => {
    async function initDb() {
      try {
        const initRes = await fetch('/api/db/init', { method: 'POST' });
        const initData = await initRes.json();
        if (initData.success) {
          setIsDbConnected(true);
          // Sync database state
          const syncRes = await fetch('/api/db/sync');
          const syncData = await syncRes.json();
          if (syncData.success && syncData.data) {
            console.log('Synchronized with local PostgreSQL database schema.');
          }
        }
      } catch (err) {
        console.warn('PostgreSQL local server connection fallback active:', err);
      }
    }
    initDb();
  }, []);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (role === 'ROLE_SELECT') {
      setAuthScreenState('ROLE_SELECTION');
      setIsAuthenticated(false);
    } else {
      setAuthScreenState('DASHBOARD');
      setIsAuthenticated(true);
    }
  };

  const selectRoleForAuth = (role: UserRole) => {
    const targetRole = role === 'ROLE_SELECT' ? 'FARMER' : role;
    setPendingRole(targetRole);
    setAuthScreenState('AUTH_PAGE');
  };

  const authenticateUser = (targetRole?: UserRole, profile?: Partial<UserProfile>) => {
    const roleToSet = targetRole || pendingRole;
    setUserRoleState(roleToSet);
    setIsAuthenticated(true);
    setCurrentUser({
      name: profile?.name || (roleToSet === 'FARMER' ? 'Rajesh Kumar' : roleToSet === 'VETERINARIAN' ? 'Dr. Ananya Sharma' : 'Officer Suresh Mehta'),
      email: profile?.email || (roleToSet === 'FARMER' ? 'rajesh@greenvalley.in' : roleToSet === 'VETERINARIAN' ? 'ananya@vetcare.in' : 'suresh.mehta@fssai.gov.in'),
      role: roleToSet,
      identifier: profile?.identifier || (roleToSet === 'FARMER' ? 'FARM-GV-992' : roleToSet === 'VETERINARIAN' ? 'VET-IN-2022-8841' : 'GOVT-FSSAI-4019')
    });
    setAuthScreenState('DASHBOARD');
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRoleState('ROLE_SELECT');
    setAuthScreenState('ROLE_SELECTION');
  };

  const goToRoleSelection = () => {
    setAuthScreenState('ROLE_SELECTION');
  };

  const openModal = (type: ModalType, payload?: { animal?: Animal; prescription?: Prescription; mrlTest?: MRLTest }) => {
    setActiveModal(type);
    if (payload?.animal) setSelectedAnimal(payload.animal);
    if (payload?.prescription) setSelectedPrescription(payload.prescription);
    if (payload?.mrlTest) setSelectedMRLTest(payload.mrlTest);
  };

  const closeModal = () => {
    setActiveModal('NONE');
  };

  const addAnimal = (newAnim: Omit<Animal, 'id' | 'qrCode'>) => {
    const newId = `anim-${Date.now()}`;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=KRISHINODE-PASSPORT-${newAnim.tagId}`;
    const created: Animal = {
      ...newAnim,
      id: newId,
      qrCode
    };
    setAnimals(prev => [created, ...prev]);
    closeModal();
  };

  const createPrescription = (rxData: Omit<Prescription, 'id' | 'prescriptionNumber' | 'status'>) => {
    const rxId = `rx-${Date.now()}`;
    const rxNum = `RX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRx: Prescription = {
      ...rxData,
      id: rxId,
      prescriptionNumber: rxNum,
      status: 'ACTIVE'
    };

    setPrescriptions(prev => [newRx, ...prev]);

    // Update Animal status
    setAnimals(prev => prev.map(a => {
      if (a.id === rxData.animalId || a.tagId === rxData.animalTagId) {
        return {
          ...a,
          status: 'Withdrawal Active',
          healthScore: Math.max(60, a.healthScore - 5)
        };
      }
      return a;
    }));

    // Add withdrawal timer
    const newTimer: WithdrawalTimer = {
      id: `w-${Date.now()}`,
      animalId: rxData.animalId,
      animalTagId: rxData.animalTagId,
      animalName: rxData.animalName,
      productType: 'Milk',
      drugName: rxData.medicationName,
      startDate: rxData.issuedDate,
      endDate: rxData.withdrawalEndDate,
      totalDays: rxData.withdrawalDays,
      remainingHours: rxData.withdrawalDays * 24,
      status: 'ACTIVE_RESTRICTION'
    };

    setWithdrawalTimers(prev => [newTimer, ...prev]);
    closeModal();
  };

  const scanTag = (tagId: string) => {
    const found = animals.find(a => a.tagId.toLowerCase().includes(tagId.toLowerCase()) || a.name.toLowerCase().includes(tagId.toLowerCase()));
    if (found) {
      setSelectedAnimal(found);
      setActiveModal('DIGITAL_PASSPORT');
    } else {
      // Default to first animal if not found
      setSelectedAnimal(animals[0]);
      setActiveModal('DIGITAL_PASSPORT');
    }
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        pendingRole,
        setPendingRole,
        authScreenState,
        setAuthScreenState,
        isAuthenticated,
        currentUser,
        selectRoleForAuth,
        authenticateUser,
        logoutUser,
        goToRoleSelection,
        viewMode,
        setViewMode,
        animals,
        prescriptions,
        withdrawalTimers,
        mrlTests,
        amrMetrics,
        activeModal,
        selectedAnimal,
        selectedPrescription,
        selectedMRLTest,
        searchQuery,
        setSearchQuery,
        openModal,
        closeModal,
        addAnimal,
        createPrescription,
        scanTag
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
