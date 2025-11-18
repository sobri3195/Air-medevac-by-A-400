import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/UI/Table';
import { mockMissions } from '../data/mockData';
import { getSeverityColor } from '../utils/helpers';
import { Filter, Download } from 'lucide-react';
import { PatientSeverity } from '../types';

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const [severityFilter, setSeverityFilter] = useState<PatientSeverity | 'ALL'>('ALL');

  const allPatients = mockMissions.flatMap(mission => 
    mission.patients.map(patient => ({
      ...patient,
      missionId: mission.id,
      missionName: mission.name
    }))
  );

  const filteredPatients = allPatients.filter(patient => {
    if (severityFilter !== 'ALL' && patient.severity !== severityFilter) return false;
    return true;
  });

  const exportData = () => {
    const csvData = filteredPatients.map(p => ({
      'Patient ID': p.id,
      'Name': p.name,
      'Age': p.age,
      'Gender': p.gender,
      'Diagnosis': p.diagnosis,
      'Severity': p.severity,
      'Status': p.status,
      'Cabin Position': p.cabinPosition,
      'Mission': p.missionName
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients-export.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Critical Patients</p>
            <p className="text-3xl font-bold text-red-600">
              {allPatients.filter(p => p.severity === 'CRITICAL').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Moderate Patients</p>
            <p className="text-3xl font-bold text-yellow-600">
              {allPatients.filter(p => p.severity === 'MODERATE').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Mild Patients</p>
            <p className="text-3xl font-bold text-green-600">
              {allPatients.filter(p => p.severity === 'MILD').length}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-medium">Filters</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as PatientSeverity | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Severity Levels</option>
              <option value="CRITICAL">Critical</option>
              <option value="MODERATE">Moderate</option>
              <option value="MILD">Mild</option>
            </select>

            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Patient ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Age / Gender</TableHeader>
              <TableHeader>Severity</TableHeader>
              <TableHeader>Diagnosis</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Cabin Position</TableHeader>
              <TableHeader>Mission</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={`${patient.missionId}-${patient.id}`} className="hover:bg-gray-50">
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}Y / {patient.gender}</TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(patient.severity)}>
                    {patient.severity}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate text-xs">{patient.diagnosis}</TableCell>
                <TableCell>
                  <Badge variant={patient.status === 'STABLE' ? 'success' : 'warning'}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{patient.cabinPosition}</TableCell>
                <TableCell className="text-xs">{patient.missionName}</TableCell>
                <TableCell>
                  <button
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No patients found matching your filters</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Patients;
