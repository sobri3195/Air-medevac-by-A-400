import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/UI/Table';
import { mockMissions } from '../data/mockData';
import { formatDate, getStatusColor, getMissionTypeLabel } from '../utils/helpers';
import { Filter, Download } from 'lucide-react';
import { MissionStatus } from '../types';

const Missions: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<MissionStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filteredMissions = mockMissions.filter(mission => {
    if (statusFilter !== 'ALL' && mission.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && mission.type !== typeFilter) return false;
    return true;
  });

  const exportData = () => {
    const csvData = filteredMissions.map(m => ({
      'Mission ID': m.id,
      'Name': m.name,
      'Type': getMissionTypeLabel(m.type),
      'Status': m.status,
      'Origin': m.origin,
      'Destination': m.destination,
      'ETD': m.etd,
      'ETA': m.eta,
      'Patients': m.patients.length,
      'Aircraft': m.aircraft.tailNumber
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'missions-export.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-medium">Filters</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as MissionStatus | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="PLANNING">Planning</option>
              <option value="APPROVED">Approved</option>
              <option value="BOARDING">Boarding</option>
              <option value="AIRBORNE">Airborne</option>
              <option value="LANDED">Landed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Types</option>
              <option value="TACTICAL">Tactical</option>
              <option value="STRATEGIC">Strategic</option>
              <option value="MASS_CASUALTY">Mass Casualty</option>
              <option value="ICU">ICU Transport</option>
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
              <TableHeader>Mission ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Origin</TableHeader>
              <TableHeader>Destination</TableHeader>
              <TableHeader>ETD</TableHeader>
              <TableHeader>ETA</TableHeader>
              <TableHeader>Patients</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMissions.map((mission) => (
              <TableRow key={mission.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{mission.id}</TableCell>
                <TableCell>{mission.name}</TableCell>
                <TableCell>{getMissionTypeLabel(mission.type)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(mission.status)}>
                    {mission.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">{mission.origin}</TableCell>
                <TableCell className="text-xs">{mission.destination}</TableCell>
                <TableCell className="text-xs">{formatDate(mission.etd)}</TableCell>
                <TableCell className="text-xs">{formatDate(mission.eta)}</TableCell>
                <TableCell>
                  <span className="font-medium">{mission.patients.length}</span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => navigate(`/missions/${mission.id}`)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No missions found matching your filters</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Missions;
