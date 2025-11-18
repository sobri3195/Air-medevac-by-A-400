export type MissionStatus = 
  | "PLANNING"
  | "APPROVED"
  | "BOARDING"
  | "AIRBORNE"
  | "LANDED"
  | "COMPLETED"
  | "CANCELLED";

export type PatientSeverity = "CRITICAL" | "MODERATE" | "MILD";

export type MissionType = "TACTICAL" | "STRATEGIC" | "MASS_CASUALTY" | "ICU";

export type AircraftStatus = "READY" | "ON_MISSION" | "MAINTENANCE";

export type PatientStatus = "ONBOARD" | "STABLE" | "DETERIORATING" | "DECEASED" | "DISEMBARKED";

export type LogType = "INFO" | "WARNING" | "CRITICAL";

export type UserRole = "MISSION_COMMANDER" | "FLIGHT_CREW" | "MEDICAL_TEAM_LEADER" | "MEDICAL_STAFF" | "ADMIN";

export interface Aircraft {
  id: string;
  tailNumber: string;
  status: AircraftStatus;
  flightHours: number;
  nextMaintenanceDate: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: "VENTILATOR" | "MONITOR" | "DEFIBRILLATOR" | "PUMP" | "OXYGEN";
  status: "OK" | "NEEDS_CHECK" | "FAULTY";
  lastCheckDate: string;
}

export interface VitalSign {
  timestamp: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  oxygenSaturation: number;
  temperature: number;
  respiratoryRate: number;
}

export interface MedicalIntervention {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  performedBy: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  diagnosis: string;
  severity: PatientSeverity;
  cabinPosition: string;
  status: PatientStatus;
  vitalSigns: VitalSign[];
  interventions: MedicalIntervention[];
  notes: string;
  outcome?: string;
}

export interface MissionLog {
  id: string;
  time: string;
  message: string;
  type: LogType;
  createdBy: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
}

export interface Mission {
  id: string;
  name: string;
  type: MissionType;
  origin: string;
  destination: string;
  alternateAirport?: string;
  etd: string;
  eta: string;
  status: MissionStatus;
  aircraft: Aircraft;
  commander: string;
  crew: CrewMember[];
  medicalTeam: CrewMember[];
  patients: Patient[];
  logs: MissionLog[];
  cabinConfiguration: {
    icuStations: number;
    stretchers: number;
    seats: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface DashboardStats {
  activeMissions: number;
  completedToday: number;
  upcomingMissions: number;
  patientsInTransit: number;
}
