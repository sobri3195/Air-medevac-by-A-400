import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { mockMissions } from '../data/mockData';
import { formatTime, getStatusColor, getSeverityColor } from '../utils/helpers';
import { Plane, MapPin, Gauge, AlertCircle } from 'lucide-react';

const Monitor: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);

  const activeMissions = mockMissions.filter(m => 
    ['BOARDING', 'AIRBORNE', 'LANDED'].includes(m.status)
  );

  const selectedMission = selectedMissionId 
    ? activeMissions.find(m => m.id === selectedMissionId) 
    : activeMissions[0];

  if (activeMissions.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <Plane size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 text-lg mb-2">No Active Flights</p>
          <p className="text-sm text-gray-500">There are no missions currently in progress</p>
        </div>
      </Card>
    );
  }

  const patientsBySeverity = selectedMission ? {
    critical: selectedMission.patients.filter(p => p.severity === 'CRITICAL').length,
    moderate: selectedMission.patients.filter(p => p.severity === 'MODERATE').length,
    mild: selectedMission.patients.filter(p => p.severity === 'MILD').length,
  } : { critical: 0, moderate: 0, mild: 0 };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-base lg:text-lg font-semibold">Select Mission to Monitor</h3>
          <Badge variant="info">{activeMissions.length} Active Flight(s)</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {activeMissions.map(mission => (
            <button
              key={mission.id}
              onClick={() => setSelectedMissionId(mission.id)}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                selectedMission?.id === mission.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Plane size={16} className={selectedMission?.id === mission.id ? 'text-blue-600' : 'text-gray-600'} />
                <span className="text-sm sm:text-base font-semibold">{mission.id}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{mission.name}</p>
              <Badge className={`mt-2 ${getStatusColor(mission.status)}`}>
                {mission.status}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      {selectedMission && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <Card className="lg:col-span-2">
              <h3 className="text-base lg:text-lg font-semibold mb-4">Live Mission View</h3>
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg h-64 sm:h-80 lg:h-96 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute" style={{
                    left: '20%',
                    top: '60%',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)'
                  }}></div>
                  <div className="absolute" style={{
                    left: '70%',
                    top: '40%',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)'
                  }}></div>
                  <svg
                    className="absolute"
                    style={{ left: '20%', top: '60%', width: '50%', height: '20%' }}
                  >
                    <path
                      d="M 0 0 Q 150 -50 300 0"
                      stroke="#10b981"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
                
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                  <div className="mb-4 sm:mb-6 animate-pulse">
                    <Plane size={48} className="sm:w-16 sm:h-16 transform rotate-45" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-2">{selectedMission.aircraft.tailNumber}</h4>
                  <p className="text-blue-200 mb-4 sm:mb-6 text-sm sm:text-base text-center truncate max-w-full">{selectedMission.name}</p>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 text-center w-full max-w-lg">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4">
                      <p className="text-xs text-blue-200 mb-1">Altitude</p>
                      <p className="text-lg sm:text-2xl font-bold">35,000</p>
                      <p className="text-xs text-blue-200">ft</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4">
                      <p className="text-xs text-blue-200 mb-1">Speed</p>
                      <p className="text-lg sm:text-2xl font-bold">450</p>
                      <p className="text-xs text-blue-200">knots</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4">
                      <p className="text-xs text-blue-200 mb-1">ETA</p>
                      <p className="text-lg sm:text-2xl font-bold">{formatTime(selectedMission.eta)}</p>
                      <p className="text-xs text-blue-200">local</p>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-8 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 truncate max-w-full">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span className="truncate">{selectedMission.origin.substring(0, 20)}...</span>
                    </div>
                    <div className="text-blue-300">→</div>
                    <div className="flex items-center gap-2 truncate max-w-full">
                      <MapPin size={14} className="flex-shrink-0" />
                      <span className="truncate">{selectedMission.destination.substring(0, 20)}...</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4 lg:space-y-6">
              <Card>
                <h3 className="text-base lg:text-lg font-semibold mb-4">Mission Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge className={getStatusColor(selectedMission.status)}>
                      {selectedMission.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ETD:</span>
                    <span className="text-sm font-medium">{formatTime(selectedMission.etd)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ETA:</span>
                    <span className="text-sm font-medium">{formatTime(selectedMission.eta)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Commander:</span>
                    <span className="text-sm font-medium">{selectedMission.commander}</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4">Patient Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-red-900">Critical</span>
                    <span className="text-2xl font-bold text-red-600">{patientsBySeverity.critical}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-yellow-900">Moderate</span>
                    <span className="text-2xl font-bold text-yellow-600">{patientsBySeverity.moderate}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-900">Mild</span>
                    <span className="text-2xl font-bold text-green-600">{patientsBySeverity.mild}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Patients</span>
                      <span className="text-xl font-bold text-gray-900">{selectedMission.patients.length}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Card>
            <h3 className="text-base lg:text-lg font-semibold mb-4">Patient Status Board</h3>
            {selectedMission.patients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm sm:text-base">No patients on this flight</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {selectedMission.patients.map(patient => (
                  <div
                    key={patient.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-semibold">{patient.name}</p>
                        <p className="text-xs text-gray-600">{patient.id} • {patient.cabinPosition}</p>
                      </div>
                      <Badge className={getSeverityColor(patient.severity)}>
                        {patient.severity}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge variant={patient.status === 'STABLE' ? 'success' : 'warning'}>
                          {patient.status}
                        </Badge>
                      </div>
                      {patient.vitalSigns.length > 0 && (() => {
                        const latest = patient.vitalSigns[patient.vitalSigns.length - 1];
                        return (
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
                            <div>
                              <span className="text-gray-600">HR:</span>
                              <span className="font-medium ml-1">{latest.heartRate} bpm</span>
                            </div>
                            <div>
                              <span className="text-gray-600">SpO2:</span>
                              <span className="font-medium ml-1">{latest.oxygenSaturation}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">BP:</span>
                              <span className="font-medium ml-1">
                                {latest.bloodPressureSystolic}/{latest.bloodPressureDiastolic}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Temp:</span>
                              <span className="font-medium ml-1">{latest.temperature}°C</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
            <div className="space-y-2">
              {selectedMission.logs.slice(-5).reverse().map(log => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {log.type === 'CRITICAL' && <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />}
                  {log.type === 'WARNING' && <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />}
                  {log.type === 'INFO' && <Gauge size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500">{formatTime(log.time)}</span>
                      <Badge variant={
                        log.type === 'CRITICAL' ? 'danger' : 
                        log.type === 'WARNING' ? 'warning' : 'info'
                      }>
                        {log.type}
                      </Badge>
                    </div>
                    <p className="text-sm">{log.message}</p>
                    <p className="text-xs text-gray-500 mt-1">by {log.createdBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Monitor;
