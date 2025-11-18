import React from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { mockMissions } from '../data/mockData';
import { exportToCSV, getMissionTypeLabel } from '../utils/helpers';
import { Download, TrendingUp, Users, Plane, Clock } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports: React.FC = () => {
  const missionsByType = mockMissions.reduce((acc, mission) => {
    const type = getMissionTypeLabel(mission.type);
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const missionTypeData = Object.entries(missionsByType).map(([name, value]) => ({
    name,
    value
  }));

  const missionsByStatus = mockMissions.reduce((acc, mission) => {
    acc[mission.status] = (acc[mission.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(missionsByStatus).map(([name, value]) => ({
    name,
    value
  }));

  const allPatients = mockMissions.flatMap(m => m.patients);
  const patientsBySeverity = {
    Critical: allPatients.filter(p => p.severity === 'CRITICAL').length,
    Moderate: allPatients.filter(p => p.severity === 'MODERATE').length,
    Mild: allPatients.filter(p => p.severity === 'MILD').length,
  };

  const severityData = Object.entries(patientsBySeverity).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const stats = {
    totalMissions: mockMissions.length,
    completedMissions: mockMissions.filter(m => m.status === 'COMPLETED').length,
    totalPatients: allPatients.length,
    avgPatientsPerMission: (allPatients.length / mockMissions.length).toFixed(1),
  };

  const handleExportMissions = () => {
    const data = mockMissions.map(m => ({
      'Mission ID': m.id,
      'Name': m.name,
      'Type': getMissionTypeLabel(m.type),
      'Status': m.status,
      'Origin': m.origin,
      'Destination': m.destination,
      'ETD': m.etd,
      'ETA': m.eta,
      'Patients': m.patients.length,
      'Aircraft': m.aircraft.tailNumber,
      'Commander': m.commander,
    }));
    exportToCSV(data, 'missions-report.csv');
  };

  const handleExportPatients = () => {
    const data = allPatients.map(p => ({
      'Patient ID': p.id,
      'Name': p.name,
      'Age': p.age,
      'Gender': p.gender,
      'Severity': p.severity,
      'Diagnosis': p.diagnosis,
      'Status': p.status,
      'Cabin Position': p.cabinPosition,
    }));
    exportToCSV(data, 'patients-report.csv');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Missions</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.totalMissions}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
              <Plane size={20} className="sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.completedMissions}</p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
              <TrendingUp size={20} className="sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Patients</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.totalPatients}</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
              <Users size={20} className="sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Avg per Mission</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{stats.avgPatientsPerMission}</p>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg flex-shrink-0">
              <Clock size={20} className="sm:w-6 sm:h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="text-base lg:text-lg font-semibold">Missions by Type</h3>
            <Button size="sm" onClick={handleExportMissions} className="self-start sm:self-auto">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <BarChart data={missionTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{ fontSize: '10px' }} className="sm:text-xs" />
              <YAxis style={{ fontSize: '10px' }} className="sm:text-xs" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="value" fill="#3b82f6" name="Missions" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base lg:text-lg font-semibold">Mission Status Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: '11px' }}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="text-base lg:text-lg font-semibold">Patients by Severity</h3>
            <Button size="sm" onClick={handleExportPatients} className="self-start sm:self-auto">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: '11px' }}
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={
                    entry.name === 'Critical' ? '#ef4444' :
                    entry.name === 'Moderate' ? '#f59e0b' :
                    '#10b981'
                  } />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Key Metrics Summary</h3>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Mission Success Rate</span>
                <span className="text-lg font-semibold text-green-600">
                  {((stats.completedMissions / stats.totalMissions) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(stats.completedMissions / stats.totalMissions) * 100}%` }}
                />
              </div>
            </div>

            <div className="border-b pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Critical Patients</span>
                <span className="text-lg font-semibold text-red-600">
                  {((patientsBySeverity.Critical / stats.totalPatients) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(patientsBySeverity.Critical / stats.totalPatients) * 100}%` }}
                />
              </div>
            </div>

            <div className="border-b pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Moderate Patients</span>
                <span className="text-lg font-semibold text-yellow-600">
                  {((patientsBySeverity.Moderate / stats.totalPatients) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(patientsBySeverity.Moderate / stats.totalPatients) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Mild Patients</span>
                <span className="text-lg font-semibold text-green-600">
                  {((patientsBySeverity.Mild / stats.totalPatients) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(patientsBySeverity.Mild / stats.totalPatients) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-base lg:text-lg font-semibold mb-4">Export Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Button onClick={handleExportMissions} className="w-full text-sm">
            <Download size={16} className="mr-2" />
            <span>Export All Missions</span>
          </Button>
          <Button onClick={handleExportPatients} variant="secondary" className="w-full text-sm">
            <Download size={16} className="mr-2" />
            <span>Export All Patients</span>
          </Button>
          <Button variant="secondary" className="w-full text-sm sm:col-span-2 lg:col-span-1">
            <Download size={16} className="mr-2" />
            <span>Generate PDF Report</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
