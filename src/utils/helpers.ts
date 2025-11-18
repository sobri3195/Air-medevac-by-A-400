import { format, parseISO } from 'date-fns';
import { Mission, Patient, MissionStatus, PatientSeverity, AircraftStatus } from '../types';

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy HH:mm');
  } catch {
    return dateString;
  }
};

export const formatTime = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'HH:mm');
  } catch {
    return dateString;
  }
};

export const getStatusColor = (status: MissionStatus | AircraftStatus | string): string => {
  const statusColors: { [key: string]: string } = {
    PLANNING: 'bg-gray-100 text-gray-800',
    APPROVED: 'bg-blue-100 text-blue-800',
    BOARDING: 'bg-yellow-100 text-yellow-800',
    AIRBORNE: 'bg-green-100 text-green-800',
    LANDED: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
    READY: 'bg-green-100 text-green-800',
    ON_MISSION: 'bg-blue-100 text-blue-800',
    MAINTENANCE: 'bg-orange-100 text-orange-800',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

export const getSeverityColor = (severity: PatientSeverity): string => {
  const severityColors: { [key in PatientSeverity]: string } = {
    CRITICAL: 'bg-red-100 text-red-800',
    MODERATE: 'bg-yellow-100 text-yellow-800',
    MILD: 'bg-green-100 text-green-800',
  };
  return severityColors[severity];
};

export const calculateDashboardStats = (missions: Mission[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeMissions = missions.filter(m => 
    ['APPROVED', 'BOARDING', 'AIRBORNE', 'LANDED'].includes(m.status)
  ).length;

  const completedToday = missions.filter(m => {
    if (m.status !== 'COMPLETED') return false;
    const missionDate = new Date(m.eta);
    missionDate.setHours(0, 0, 0, 0);
    return missionDate.getTime() === today.getTime();
  }).length;

  const upcomingMissions = missions.filter(m => 
    m.status === 'PLANNING'
  ).length;

  const patientsInTransit = missions
    .filter(m => ['BOARDING', 'AIRBORNE'].includes(m.status))
    .reduce((sum, m) => sum + m.patients.length, 0);

  return {
    activeMissions,
    completedToday,
    upcomingMissions,
    patientsInTransit
  };
};

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getPatientsBySeverity = (patients: Patient[]) => {
  return {
    critical: patients.filter(p => p.severity === 'CRITICAL').length,
    moderate: patients.filter(p => p.severity === 'MODERATE').length,
    mild: patients.filter(p => p.severity === 'MILD').length,
  };
};

export const getMissionTypeLabel = (type: string): string => {
  const labels: { [key: string]: string } = {
    TACTICAL: 'Tactical',
    STRATEGIC: 'Strategic',
    MASS_CASUALTY: 'Mass Casualty',
    ICU: 'ICU Transport',
  };
  return labels[type] || type;
};
