import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/UI/Card';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/UI/Table';
import { mockMissions } from '../data/mockData';
import { calculateDashboardStats, formatTime, getStatusColor, getMissionTypeLabel } from '../utils/helpers';
import { Plane, Users, CheckCircle, Clock, MapPin } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = calculateDashboardStats(mockMissions);
  
  const activeMissions = mockMissions.filter(m => 
    ['APPROVED', 'BOARDING', 'AIRBORNE', 'LANDED'].includes(m.status)
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Missions"
          value={stats.activeMissions}
          icon={<Plane size={24} />}
          color="blue"
        />
        <StatCard
          title="Completed Today"
          value={stats.completedToday}
          icon={<CheckCircle size={24} />}
          color="green"
        />
        <StatCard
          title="Upcoming Missions"
          value={stats.upcomingMissions}
          icon={<Clock size={24} />}
          color="yellow"
        />
        <StatCard
          title="Patients in Transit"
          value={stats.patientsInTransit}
          icon={<Users size={24} />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-base lg:text-lg font-semibold mb-4">Aircraft Status</h3>
          <div className="space-y-3">
            {mockMissions.slice(0, 3).map((mission) => (
              <div key={mission.aircraft.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Plane size={20} className="text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{mission.aircraft.tailNumber}</p>
                    <p className="text-xs sm:text-sm text-gray-600">Flight Hours: {mission.aircraft.flightHours}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(mission.aircraft.status)} self-start sm:self-auto flex-shrink-0`}>
                  {mission.aircraft.status.replace(/_/g, ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-base lg:text-lg font-semibold mb-4">Mission Map</h3>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-48 sm:h-64 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
            </div>
            <div className="text-center z-10 px-4">
              <MapPin size={40} className="text-blue-600 mx-auto mb-2 sm:w-12 sm:h-12" />
              <p className="text-xs sm:text-sm text-gray-600">Interactive Map View</p>
              <p className="text-xs text-gray-500 mt-1">{activeMissions.length} active mission(s)</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base lg:text-lg font-semibold">Active Missions</h3>
          <button
            onClick={() => navigate('/missions')}
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
          >
            View All →
          </button>
        </div>
        
        {activeMissions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Plane size={48} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm sm:text-base">No active missions at this time</p>
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Mission ID</TableHeader>
                <TableHeader className="hidden sm:table-cell">Status</TableHeader>
                <TableHeader className="hidden md:table-cell">Type</TableHeader>
                <TableHeader>Route</TableHeader>
                <TableHeader className="hidden lg:table-cell">ETD / ETA</TableHeader>
                <TableHeader className="hidden sm:table-cell">Patients</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeMissions.map((mission) => (
                <TableRow key={mission.id} className="hover:bg-gray-50 cursor-pointer">
                  <TableCell className="font-medium text-xs sm:text-sm">{mission.id}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className={getStatusColor(mission.status)}>
                      {mission.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs">{getMissionTypeLabel(mission.type)}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div className="font-medium truncate max-w-[120px] sm:max-w-none">{mission.origin}</div>
                      <div className="text-gray-500 truncate max-w-[120px] sm:max-w-none">→ {mission.destination}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="text-xs">
                      <div>ETD: {formatTime(mission.etd)}</div>
                      <div className="text-gray-500">ETA: {formatTime(mission.eta)}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="font-medium">{mission.patients.length}</span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => navigate(`/missions/${mission.id}`)}
                      className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium"
                    >
                      Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
