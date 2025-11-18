import { Mission, Aircraft, Patient, User, Equipment } from '../types';

export const mockAircraft: Aircraft[] = [
  {
    id: 'a1',
    tailNumber: 'A-400-001',
    status: 'ON_MISSION',
    flightHours: 2340,
    nextMaintenanceDate: '2024-12-15'
  },
  {
    id: 'a2',
    tailNumber: 'A-400-002',
    status: 'READY',
    flightHours: 1890,
    nextMaintenanceDate: '2024-11-30'
  },
  {
    id: 'a3',
    tailNumber: 'A-400-003',
    status: 'MAINTENANCE',
    flightHours: 3120,
    nextMaintenanceDate: '2024-11-20'
  }
];

export const mockEquipment: Equipment[] = [
  { id: 'eq1', name: 'Ventilator #1', type: 'VENTILATOR', status: 'OK', lastCheckDate: '2024-11-15' },
  { id: 'eq2', name: 'Ventilator #2', type: 'VENTILATOR', status: 'OK', lastCheckDate: '2024-11-15' },
  { id: 'eq3', name: 'Cardiac Monitor #1', type: 'MONITOR', status: 'OK', lastCheckDate: '2024-11-16' },
  { id: 'eq4', name: 'Cardiac Monitor #2', type: 'MONITOR', status: 'NEEDS_CHECK', lastCheckDate: '2024-11-10' },
  { id: 'eq5', name: 'Defibrillator #1', type: 'DEFIBRILLATOR', status: 'OK', lastCheckDate: '2024-11-17' },
  { id: 'eq6', name: 'Defibrillator #2', type: 'DEFIBRILLATOR', status: 'OK', lastCheckDate: '2024-11-17' },
  { id: 'eq7', name: 'Infusion Pump #1', type: 'PUMP', status: 'OK', lastCheckDate: '2024-11-16' },
  { id: 'eq8', name: 'Oxygen Supply #1', type: 'OXYGEN', status: 'OK', lastCheckDate: '2024-11-18' },
  { id: 'eq9', name: 'Oxygen Supply #2', type: 'OXYGEN', status: 'FAULTY', lastCheckDate: '2024-11-12' }
];

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Anderson',
    age: 45,
    gender: 'M',
    diagnosis: 'Severe trauma, multiple fractures',
    severity: 'CRITICAL',
    cabinPosition: 'ICU-1',
    status: 'STABLE',
    notes: 'Intubated, on ventilator support',
    vitalSigns: [
      {
        timestamp: '2024-11-18T08:00:00Z',
        heartRate: 95,
        bloodPressureSystolic: 120,
        bloodPressureDiastolic: 80,
        oxygenSaturation: 95,
        temperature: 37.2,
        respiratoryRate: 16
      },
      {
        timestamp: '2024-11-18T09:00:00Z',
        heartRate: 92,
        bloodPressureSystolic: 118,
        bloodPressureDiastolic: 78,
        oxygenSaturation: 96,
        temperature: 37.1,
        respiratoryRate: 16
      }
    ],
    interventions: [
      {
        id: 'i1',
        timestamp: '2024-11-18T07:30:00Z',
        type: 'Intubation',
        description: 'Emergency intubation performed',
        performedBy: 'Dr. Sarah Mitchell'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Maria Santos',
    age: 32,
    gender: 'F',
    diagnosis: 'Gunshot wound, abdomen',
    severity: 'CRITICAL',
    cabinPosition: 'ICU-2',
    status: 'STABLE',
    notes: 'Post-operative, requires close monitoring',
    vitalSigns: [
      {
        timestamp: '2024-11-18T08:00:00Z',
        heartRate: 88,
        bloodPressureSystolic: 110,
        bloodPressureDiastolic: 70,
        oxygenSaturation: 97,
        temperature: 36.8,
        respiratoryRate: 14
      }
    ],
    interventions: [
      {
        id: 'i2',
        timestamp: '2024-11-18T08:15:00Z',
        type: 'Fluid Resuscitation',
        description: 'IV fluids administered',
        performedBy: 'Nurse James Wilson'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Robert Chen',
    age: 28,
    gender: 'M',
    diagnosis: 'Blast injury, lower extremities',
    severity: 'MODERATE',
    cabinPosition: 'STRETCHER-1',
    status: 'STABLE',
    notes: 'Pain management in progress',
    vitalSigns: [
      {
        timestamp: '2024-11-18T08:00:00Z',
        heartRate: 75,
        bloodPressureSystolic: 125,
        bloodPressureDiastolic: 82,
        oxygenSaturation: 98,
        temperature: 36.9,
        respiratoryRate: 14
      }
    ],
    interventions: []
  },
  {
    id: 'p4',
    name: 'Emma Davis',
    age: 40,
    gender: 'F',
    diagnosis: 'Concussion, minor lacerations',
    severity: 'MILD',
    cabinPosition: 'SEAT-A1',
    status: 'STABLE',
    notes: 'Ambulatory patient, monitoring for concussion symptoms',
    vitalSigns: [
      {
        timestamp: '2024-11-18T08:00:00Z',
        heartRate: 72,
        bloodPressureSystolic: 118,
        bloodPressureDiastolic: 76,
        oxygenSaturation: 99,
        temperature: 36.7,
        respiratoryRate: 12
      }
    ],
    interventions: []
  }
];

export const mockMissions: Mission[] = [
  {
    id: 'M-2024-001',
    name: 'Operation Nightingale',
    type: 'MASS_CASUALTY',
    origin: 'Forward Operating Base Alpha',
    destination: 'Ramstein Air Base Hospital',
    alternateAirport: 'Landstuhl Regional Medical Center',
    etd: '2024-11-18T06:00:00Z',
    eta: '2024-11-18T10:30:00Z',
    status: 'AIRBORNE',
    aircraft: mockAircraft[0],
    commander: 'Col. Michael Stevens',
    crew: [
      { id: 'c1', name: 'Capt. James Rodriguez', role: 'Pilot' },
      { id: 'c2', name: 'Lt. Sarah Johnson', role: 'Co-Pilot' },
      { id: 'c3', name: 'SSgt. Mark Thompson', role: 'Loadmaster' }
    ],
    medicalTeam: [
      { id: 'm1', name: 'Dr. Sarah Mitchell', role: 'Medical Team Leader' },
      { id: 'm2', name: 'Nurse James Wilson', role: 'Critical Care Nurse' },
      { id: 'm3', name: 'Paramedic Lisa Brown', role: 'Paramedic' },
      { id: 'm4', name: 'Paramedic David Lee', role: 'Paramedic' }
    ],
    patients: mockPatients,
    logs: [
      {
        id: 'l1',
        time: '2024-11-18T05:30:00Z',
        message: 'Mission request received from FOB Alpha',
        type: 'INFO',
        createdBy: 'Operations Center'
      },
      {
        id: 'l2',
        time: '2024-11-18T05:45:00Z',
        message: 'Mission approved by Mission Commander',
        type: 'INFO',
        createdBy: 'Col. Michael Stevens'
      },
      {
        id: 'l3',
        time: '2024-11-18T06:00:00Z',
        message: 'Aircraft departed FOB Alpha',
        type: 'INFO',
        createdBy: 'Capt. James Rodriguez'
      },
      {
        id: 'l4',
        time: '2024-11-18T07:30:00Z',
        message: 'Patient P1 intubated due to respiratory distress',
        type: 'WARNING',
        createdBy: 'Dr. Sarah Mitchell'
      },
      {
        id: 'l5',
        time: '2024-11-18T08:15:00Z',
        message: 'All patients stable, vitals within normal limits',
        type: 'INFO',
        createdBy: 'Nurse James Wilson'
      }
    ],
    cabinConfiguration: {
      icuStations: 4,
      stretchers: 8,
      seats: 20
    }
  },
  {
    id: 'M-2024-002',
    name: 'Operation Guardian Angel',
    type: 'ICU',
    origin: 'Baghdad International Airport',
    destination: 'Landstuhl Regional Medical Center',
    etd: '2024-11-18T14:00:00Z',
    eta: '2024-11-18T18:30:00Z',
    status: 'APPROVED',
    aircraft: mockAircraft[1],
    commander: 'Col. Michael Stevens',
    crew: [
      { id: 'c4', name: 'Maj. Robert Anderson', role: 'Pilot' },
      { id: 'c5', name: 'Capt. Emily White', role: 'Co-Pilot' },
      { id: 'c6', name: 'TSgt. John Martinez', role: 'Loadmaster' }
    ],
    medicalTeam: [
      { id: 'm5', name: 'Dr. Michael Chen', role: 'Medical Team Leader' },
      { id: 'm6', name: 'Nurse Patricia Garcia', role: 'Critical Care Nurse' }
    ],
    patients: [],
    logs: [
      {
        id: 'l6',
        time: '2024-11-18T12:00:00Z',
        message: 'Mission request received',
        type: 'INFO',
        createdBy: 'Operations Center'
      },
      {
        id: 'l7',
        time: '2024-11-18T12:30:00Z',
        message: 'Mission approved, aircraft and crew assigned',
        type: 'INFO',
        createdBy: 'Col. Michael Stevens'
      }
    ],
    cabinConfiguration: {
      icuStations: 6,
      stretchers: 4,
      seats: 10
    }
  },
  {
    id: 'M-2024-003',
    name: 'Operation Mercy Flight',
    type: 'STRATEGIC',
    origin: 'Kandahar Airfield',
    destination: 'Walter Reed Medical Center',
    etd: '2024-11-17T08:00:00Z',
    eta: '2024-11-17T16:00:00Z',
    status: 'COMPLETED',
    aircraft: mockAircraft[0],
    commander: 'Col. Michael Stevens',
    crew: [
      { id: 'c1', name: 'Capt. James Rodriguez', role: 'Pilot' },
      { id: 'c2', name: 'Lt. Sarah Johnson', role: 'Co-Pilot' },
      { id: 'c3', name: 'SSgt. Mark Thompson', role: 'Loadmaster' }
    ],
    medicalTeam: [
      { id: 'm1', name: 'Dr. Sarah Mitchell', role: 'Medical Team Leader' },
      { id: 'm2', name: 'Nurse James Wilson', role: 'Critical Care Nurse' }
    ],
    patients: [
      {
        id: 'p5',
        name: 'Thomas Wright',
        age: 35,
        gender: 'M',
        diagnosis: 'Spinal injury',
        severity: 'CRITICAL',
        cabinPosition: 'ICU-1',
        status: 'DISEMBARKED',
        notes: 'Successfully transferred to Walter Reed',
        outcome: 'Transferred to ICU, stable condition',
        vitalSigns: [],
        interventions: []
      }
    ],
    logs: [
      {
        id: 'l8',
        time: '2024-11-17T08:00:00Z',
        message: 'Mission departed Kandahar',
        type: 'INFO',
        createdBy: 'Capt. James Rodriguez'
      },
      {
        id: 'l9',
        time: '2024-11-17T16:00:00Z',
        message: 'Mission completed successfully',
        type: 'INFO',
        createdBy: 'Operations Center'
      }
    ],
    cabinConfiguration: {
      icuStations: 2,
      stretchers: 6,
      seats: 15
    }
  }
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Col. Michael Stevens',
    email: 'stevens@airmedevac.mil',
    role: 'MISSION_COMMANDER'
  },
  {
    id: 'u2',
    name: 'Capt. James Rodriguez',
    email: 'rodriguez@airmedevac.mil',
    role: 'FLIGHT_CREW'
  },
  {
    id: 'u3',
    name: 'Dr. Sarah Mitchell',
    email: 'mitchell@airmedevac.mil',
    role: 'MEDICAL_TEAM_LEADER'
  },
  {
    id: 'u4',
    name: 'Nurse James Wilson',
    email: 'wilson@airmedevac.mil',
    role: 'MEDICAL_STAFF'
  },
  {
    id: 'u5',
    name: 'Admin User',
    email: 'admin@airmedevac.mil',
    role: 'ADMIN'
  }
];
