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
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm sm:text-base font-medium">Filters</span>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as MissionStatus | 'ALL')}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Types</option>
              <option value="TACTICAL">Tactical</option>
              <option value="STRATEGIC">Strategic</option>
              <option value="MASS_CASUALTY">Mass Casualty</option>
              <option value="ICU">ICU Transport</option>
            </select>

            <button
              onClick={exportData}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Mission ID</TableHeader>
              <TableHeader className="hidden md:table-cell">Name</TableHeader>
              <TableHeader className="hidden lg:table-cell">Type</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader className="hidden sm:table-cell">Origin</TableHeader>
              <TableHeader className="hidden sm:table-cell">Destination</TableHeader>
              <TableHeader className="hidden xl:table-cell">ETD</TableHeader>
              <TableHeader className="hidden xl:table-cell">ETA</TableHeader>
              <TableHeader className="hidden md:table-cell">Patients</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMissions.map((mission) => (
              <TableRow key={mission.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-xs sm:text-sm">{mission.id}</TableCell>
                <TableCell className="hidden md:table-cell text-xs sm:text-sm">{mission.name}</TableCell>
                <TableCell className="hidden lg:table-cell text-xs">{getMissionTypeLabel(mission.type)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(mission.status)}>
                    {mission.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-xs truncate max-w-[150px]">{mission.origin}</TableCell>
                <TableCell className="hidden sm:table-cell text-xs truncate max-w-[150px]">{mission.destination}</TableCell>
                <TableCell className="hidden xl:table-cell text-xs">{formatDate(mission.etd)}</TableCell>
                <TableCell className="hidden xl:table-cell text-xs">{formatDate(mission.eta)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="font-medium">{mission.patients.length}</span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => navigate(`/missions/${mission.id}`)}
                    className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium whitespace-nowrap"
                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm sm:text-base">No missions found matching your filters</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Missions;
