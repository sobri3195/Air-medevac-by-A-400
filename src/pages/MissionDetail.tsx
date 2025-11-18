import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/UI/Table';
import { mockMissions } from '../data/mockData';
import { formatDate, getStatusColor, getSeverityColor, getMissionTypeLabel } from '../utils/helpers';
import { ArrowLeft, Plane, Users, MapPin, Clock, AlertCircle } from 'lucide-react';

const MissionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mission = mockMissions.find(m => m.id === id);

  if (!mission) {
    return (
      <Card>
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600">Mission not found</p>
          <button
            onClick={() => navigate('/missions')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Back to Missions
          </button>
        </div>
      </Card>
    );
  }

  const statusSteps = ['PLANNING', 'APPROVED', 'BOARDING', 'AIRBORNE', 'LANDED', 'COMPLETED'];
  const currentStepIndex = statusSteps.indexOf(mission.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/missions')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{mission.name}</h1>
          <p className="text-gray-600">{mission.id}</p>
        </div>
      </div>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Mission Status</h3>
        <div className="flex items-center justify-between mb-2">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    index <= currentStepIndex
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-xs mt-2 text-center">{step}</span>
              </div>
              {index < statusSteps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  style={{ marginTop: '-20px' }}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Mission Information
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{getMissionTypeLabel(mission.type)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Status:</span>
              <Badge className={getStatusColor(mission.status)}>{mission.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Origin:</span>
              <span className="font-medium">{mission.origin}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Destination:</span>
              <span className="font-medium">{mission.destination}</span>
            </div>
            {mission.alternateAirport && (
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Alternate:</span>
                <span className="font-medium">{mission.alternateAirport}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">ETD:</span>
              <span className="font-medium">{formatDate(mission.etd)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">ETA:</span>
              <span className="font-medium">{formatDate(mission.eta)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Commander:</span>
              <span className="font-medium">{mission.commander}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plane size={20} />
            Aircraft & Configuration
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Tail Number:</span>
              <span className="font-medium">{mission.aircraft.tailNumber}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Aircraft Status:</span>
              <Badge className={getStatusColor(mission.aircraft.status)}>
                {mission.aircraft.status.replace(/_/g, ' ')}
              </Badge>
            </div>
            <div className="border-t pt-3 mt-3">
              <p className="text-sm font-medium text-gray-600 mb-2">Cabin Configuration:</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{mission.cabinConfiguration.icuStations}</p>
                  <p className="text-xs text-gray-600">ICU Stations</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{mission.cabinConfiguration.stretchers}</p>
                  <p className="text-xs text-gray-600">Stretchers</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{mission.cabinConfiguration.seats}</p>
                  <p className="text-xs text-gray-600">Seats</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Flight Crew</h3>
          <div className="space-y-2">
            {mission.crew.map(member => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{member.name}</span>
                <span className="text-sm text-gray-600">{member.role}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users size={20} />
            Medical Team
          </h3>
          <div className="space-y-2">
            {mission.medicalTeam.map(member => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{member.name}</span>
                <span className="text-sm text-gray-600">{member.role}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Patient Manifest</h3>
        {mission.patients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users size={48} className="mx-auto mb-2 opacity-50" />
            <p>No patients assigned to this mission yet</p>
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Patient ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Age/Gender</TableHeader>
                <TableHeader>Severity</TableHeader>
                <TableHeader>Diagnosis</TableHeader>
                <TableHeader>Cabin Position</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {mission.patients.map(patient => (
                <TableRow key={patient.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}Y / {patient.gender}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(patient.severity)}>
                      {patient.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs max-w-xs truncate">{patient.diagnosis}</TableCell>
                  <TableCell className="font-mono text-xs">{patient.cabinPosition}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'STABLE' ? 'success' : 'warning'}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock size={20} />
          Mission Timeline & Logs
        </h3>
        <div className="space-y-3">
          {mission.logs.map(log => (
            <div key={log.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-16 text-xs text-gray-600">
                {formatDate(log.time).split(' ')[1]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={
                    log.type === 'CRITICAL' ? 'danger' : 
                    log.type === 'WARNING' ? 'warning' : 'info'
                  }>
                    {log.type}
                  </Badge>
                  <span className="text-xs text-gray-500">by {log.createdBy}</span>
                </div>
                <p className="text-sm">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MissionDetail;
