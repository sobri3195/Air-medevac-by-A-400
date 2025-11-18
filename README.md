# A-400 Air Medevac Mission Management Dashboard

A comprehensive React-based mission control dashboard for managing Air Medevac operations using A-400 aircraft.

## Features

### Mission Management
- Real-time mission tracking and monitoring
- Mission planning and approval workflows
- Mission status tracking (Planning → Boarding → Airborne → Landed → Completed)
- Detailed mission information including routes, ETD/ETA, and crew assignments
- Mission timeline and event logging

### Patient Management
- Patient registry with severity categorization (Critical, Moderate, Mild)
- Real-time vital signs monitoring with trend charts
- Medical intervention tracking
- Patient status monitoring during flight
- Cabin position assignment

### Aircraft & Equipment Status
- Fleet management for A-400 aircraft
- Aircraft readiness and maintenance tracking
- Medical equipment inventory management
- Equipment status monitoring (OK, Needs Check, Faulty)

### In-Flight Monitoring
- Live mission view with simulated aircraft position
- Real-time patient status board
- Mission event notifications
- Patient vital signs dashboard

### Reports & Analytics
- Mission statistics and trends
- Patient severity distribution
- Mission type analysis
- Exportable data (CSV format)
- Performance metrics

### User Management
- Role-based access control
- User CRUD operations
- Support for multiple roles:
  - Mission Commander
  - Flight Crew
  - Medical Team Leader
  - Medical Staff
  - Admin

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **UI Components**: Custom components with Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Demo Accounts

You can login with any of these demo accounts (password can be anything):

- **Mission Commander**: stevens@airmedevac.mil
- **Flight Crew**: rodriguez@airmedevac.mil
- **Medical Team Leader**: mitchell@airmedevac.mil
- **Medical Staff**: wilson@airmedevac.mil
- **Admin**: admin@airmedevac.mil

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout wrapper with sidebar
│   └── UI/             # Common UI components (Card, Badge, Table, Button)
├── context/            # React context providers (Auth)
├── data/               # Mock data for demonstration
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Missions.tsx
│   ├── MissionDetail.tsx
│   ├── Patients.tsx
│   ├── PatientDetail.tsx
│   ├── Equipment.tsx
│   ├── Monitor.tsx
│   ├── Reports.tsx
│   └── UserManagement.tsx
├── types/              # TypeScript type definitions
└── utils/              # Helper functions and utilities
```

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Features by User Role

### Mission Commander
- Full access to all features
- Mission approval and planning
- Priority and route management
- Complete mission oversight

### Flight Crew
- Mission details and manifests
- Flight status updates
- Aircraft information
- Patient manifest viewing

### Medical Team Leader
- Medical cabin configuration
- Patient status management
- Medical interventions logging
- Team coordination

### Medical Staff
- Patient data entry
- Vital signs monitoring
- Medical interventions recording
- Clinical notes

### Admin
- User management
- Role assignments
- System configuration
- Master data management

## Data Models

The application uses TypeScript interfaces for type safety:

- **Mission**: Complete mission information
- **Patient**: Patient demographics and medical data
- **Aircraft**: Aircraft status and maintenance
- **Equipment**: Medical equipment tracking
- **User**: User authentication and roles
- **MissionLog**: Event logging
- **VitalSign**: Patient vital signs tracking
- **MedicalIntervention**: Medical procedures and interventions

## License

This project is for demonstration purposes.

## Contributing

This is a demo project showcasing a mission management dashboard for air medical evacuation operations.
