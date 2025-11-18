import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { mockMissions } from '../data/mockData';
import { formatDate, getSeverityColor } from '../utils/helpers';
import { ArrowLeft, User, Activity, FileText, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Patient, Mission } from '../types';

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  let patient: Patient | null = null;
  let missionInfo: Mission | null = null;

  for (const mission of mockMissions) {
    const foundPatient = mission.patients.find(p => p.id === id);
    if (foundPatient) {
      patient = foundPatient;
      missionInfo = mission;
      break;
    }
  }

  if (!patient || !missionInfo) {
    return (
      <Card>
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600">Patient not found</p>
          <button
            onClick={() => navigate('/patients')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Back to Patients
          </button>
        </div>
      </Card>
    );
  }

  const currentPatient = patient;
  const currentMission = missionInfo;

  const vitalSignsData = currentPatient.vitalSigns.map(vs => ({
    time: new Date(vs.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    heartRate: vs.heartRate,
    systolic: vs.bloodPressureSystolic,
    diastolic: vs.bloodPressureDiastolic,
    spo2: vs.oxygenSaturation,
    temp: vs.temperature,
    respRate: vs.respiratoryRate
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/patients')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{currentPatient.name}</h1>
          <p className="text-gray-600">{currentPatient.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User size={20} />
            Patient Information
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{currentPatient.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Patient ID:</span>
              <span className="font-medium font-mono">{currentPatient.id}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Age:</span>
              <span className="font-medium">{currentPatient.age} years</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Gender:</span>
              <span className="font-medium">{currentPatient.gender === 'M' ? 'Male' : 'Female'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Severity:</span>
              <Badge className={getSeverityColor(currentPatient.severity)}>{currentPatient.severity}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Status:</span>
              <Badge variant={currentPatient.status === 'STABLE' ? 'success' : 'warning'}>
                {currentPatient.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Cabin Position:</span>
              <span className="font-medium font-mono">{currentPatient.cabinPosition}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Mission:</span>
              <button
                onClick={() => navigate(`/missions/${currentMission.id}`)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium text-left"
              >
                {currentMission.name}
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} />
            Clinical Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Diagnosis:</p>
              <p className="font-medium">{currentPatient.diagnosis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Clinical Notes:</p>
              <p className="text-sm bg-gray-50 p-3 rounded-lg">{currentPatient.notes}</p>
            </div>
            {currentPatient.outcome && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Outcome:</p>
                <p className="text-sm bg-green-50 p-3 rounded-lg text-green-800">{currentPatient.outcome}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {currentPatient.vitalSigns.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} />
            Vital Signs Monitoring
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {currentPatient.vitalSigns.length > 0 && (() => {
              const latest = currentPatient.vitalSigns[currentPatient.vitalSigns.length - 1];
              return (
                <>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Heart Rate</p>
                    <p className="text-2xl font-bold text-red-600">{latest.heartRate}</p>
                    <p className="text-xs text-gray-500">bpm</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">BP (Sys/Dia)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {latest.bloodPressureSystolic}/{latest.bloodPressureDiastolic}
                    </p>
                    <p className="text-xs text-gray-500">mmHg</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">SpO2</p>
                    <p className="text-2xl font-bold text-green-600">{latest.oxygenSaturation}</p>
                    <p className="text-xs text-gray-500">%</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Temperature</p>
                    <p className="text-2xl font-bold text-yellow-600">{latest.temperature}</p>
                    <p className="text-xs text-gray-500">°C</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Resp Rate</p>
                    <p className="text-2xl font-bold text-purple-600">{latest.respiratoryRate}</p>
                    <p className="text-xs text-gray-500">/min</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-xs text-gray-600 mb-1">Last Update</p>
                    <p className="text-sm font-bold text-gray-600">
                      {new Date(latest.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>

          {vitalSignsData.length > 1 && (
            <>
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Heart Rate Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitalSignsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" style={{ fontSize: '12px' }} />
                    <YAxis style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="Heart Rate (bpm)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Blood Pressure Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitalSignsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" style={{ fontSize: '12px' }} />
                    <YAxis style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="systolic" stroke="#3b82f6" strokeWidth={2} name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#60a5fa" strokeWidth={2} name="Diastolic" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Oxygen Saturation Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitalSignsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" style={{ fontSize: '12px' }} />
                    <YAxis domain={[90, 100]} style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="spo2" stroke="#10b981" strokeWidth={2} name="SpO2 (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </Card>
      )}

      {currentPatient.interventions.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Medical Interventions</h3>
          <div className="space-y-3">
            {currentPatient.interventions.map(intervention => (
              <div key={intervention.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-blue-900">{intervention.type}</p>
                    <p className="text-sm text-blue-700">{intervention.description}</p>
                  </div>
                  <Badge variant="info">{formatDate(intervention.timestamp)}</Badge>
                </div>
                <p className="text-xs text-blue-600">Performed by: {intervention.performedBy}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PatientDetail;
