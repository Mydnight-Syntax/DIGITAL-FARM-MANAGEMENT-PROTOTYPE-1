export type UserRole = 'ROLE_SELECT' | 'FARMER' | 'VETERINARIAN' | 'REGULATOR';

export type ViewMode = 'DESKTOP' | 'MOBILE_FRAME';

export type AnimalStatus = 'Healthy' | 'Under Treatment' | 'Withdrawal Active' | 'MRL Risk';

export interface Animal {
  id: string;
  tagId: string;
  name: string;
  species: 'Cow' | 'Buffalo' | 'Goat' | 'Pig';
  breed: string;
  ageMonths: number;
  weightKg: number;
  status: AnimalStatus;
  farmName: string;
  ownerName: string;
  healthScore: number;
  lastVaccine: string;
  vaccines: { name: string; date: string; vet: string }[];
  qrCode: string;
  imageUrl?: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  animalId: string;
  animalTagId: string;
  animalName: string;
  vetName: string;
  vetLicense: string;
  medicationName: string;
  activeIngredient: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  issuedDate: string;
  withdrawalDays: number;
  withdrawalEndDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
  notes?: string;
}

export interface WithdrawalTimer {
  id: string;
  animalId: string;
  animalTagId: string;
  animalName: string;
  productType: 'Milk' | 'Meat';
  drugName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  remainingHours: number;
  status: 'ACTIVE_RESTRICTION' | 'CLEARED_SAFE' | 'CRITICAL_WARNING';
}

export interface MRLTest {
  id: string;
  sampleId: string;
  farmName: string;
  animalTagId: string;
  sampleType: 'Raw Milk' | 'Tissue/Meat' | 'Urine';
  compoundTested: string;
  detectedLevelPpm: number;
  mrlLimitPpm: number;
  testDate: string;
  result: 'COMPLIANT' | 'EXCEEDED' | 'PENDING';
  labName: string;
  inspector: string;
}

export interface AMRMetric {
  district: string;
  totalSamples: number;
  complianceRate: number;
  resistanceRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  topAntibioticUsed: string;
  activeOutbreaks: number;
}

export type ModalType = 
  | 'NONE' 
  | 'DIGITAL_PASSPORT' 
  | 'CREATE_PRESCRIPTION' 
  | 'QR_SCANNER' 
  | 'TRACEABILITY' 
  | 'MRL_DETAILS' 
  | 'REGISTER_ANIMAL'
  | 'USER_AUTH';

