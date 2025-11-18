import React from 'react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/UI/Table';
import { mockAircraft, mockEquipment } from '../data/mockData';
import { getStatusColor, formatDate } from '../utils/helpers';
import { Plane, Package, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const Equipment: React.FC = () => {
  const equipmentStatusCounts = {
    ok: mockEquipment.filter(e => e.status === 'OK').length,
    needsCheck: mockEquipment.filter(e => e.status === 'NEEDS_CHECK').length,
    faulty: mockEquipment.filter(e => e.status === 'FAULTY').length,
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case 'OK':
        return 'bg-green-100 text-green-800';
      case 'NEEDS_CHECK':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAULTY':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEquipmentIcon = (status: string) => {
    switch (status) {
      case 'OK':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'NEEDS_CHECK':
        return <AlertTriangle size={16} className="text-yellow-600" />;
      case 'FAULTY':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Operational</p>
              <p className="text-3xl font-bold text-green-600">{equipmentStatusCounts.ok}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Needs Check</p>
              <p className="text-3xl font-bold text-yellow-600">{equipmentStatusCounts.needsCheck}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle size={24} className="text-yellow-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Faulty</p>
              <p className="text-3xl font-bold text-red-600">{equipmentStatusCounts.faulty}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plane size={20} />
          Aircraft Fleet Status
        </h3>
        <div className="space-y-4">
          {mockAircraft.map(aircraft => (
            <div key={aircraft.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Plane size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{aircraft.tailNumber}</h4>
                    <p className="text-sm text-gray-600">Aircraft ID: {aircraft.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(aircraft.status)}>
                  {aircraft.status.replace(/_/g, ' ')}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 mb-1">Flight Hours</p>
                  <p className="font-semibold">{aircraft.flightHours.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 mb-1">Next Maintenance</p>
                  <p className="font-semibold">{formatDate(aircraft.nextMaintenanceDate)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 mb-1">Status</p>
                  <p className="font-semibold">{aircraft.status.replace(/_/g, ' ')}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 mb-1">Readiness</p>
                  <p className="font-semibold">
                    {aircraft.status === 'READY' ? '100%' : aircraft.status === 'ON_MISSION' ? 'In Use' : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package size={20} />
          Medical Equipment Inventory
        </h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Equipment Name</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Last Check</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockEquipment.map(equipment => (
              <TableRow key={equipment.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{equipment.name}</TableCell>
                <TableCell>
                  <span className="text-sm">{equipment.type.replace(/_/g, ' ')}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getEquipmentIcon(equipment.status)}
                    <Badge className={getEquipmentStatusColor(equipment.status)}>
                      {equipment.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-xs">{formatDate(equipment.lastCheckDate)}</TableCell>
                <TableCell>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Equipment by Type</h3>
          <div className="space-y-2">
            {['VENTILATOR', 'MONITOR', 'DEFIBRILLATOR', 'PUMP', 'OXYGEN'].map(type => {
              const count = mockEquipment.filter(e => e.type === type).length;
              const okCount = mockEquipment.filter(e => e.type === type && e.status === 'OK').length;
              return (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{type.replace(/_/g, ' ')}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{okCount}/{count} Operational</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(okCount / count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Maintenance Alerts</h3>
          <div className="space-y-3">
            {mockEquipment
              .filter(e => e.status !== 'OK')
              .map(equipment => (
                <div key={equipment.id} className="flex items-start gap-3 p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                  <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-yellow-900">{equipment.name}</p>
                    <p className="text-sm text-yellow-700">
                      Status: {equipment.status.replace(/_/g, ' ')} - Last checked: {formatDate(equipment.lastCheckDate)}
                    </p>
                  </div>
                </div>
              ))}
            {mockEquipment.filter(e => e.status !== 'OK').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle size={48} className="mx-auto mb-2 text-green-500 opacity-50" />
                <p>All equipment operational</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Equipment;
