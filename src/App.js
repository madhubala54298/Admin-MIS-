import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import CivilWork from "./pages/CivilWork.js";
import RoadConstruction from "./pages/RoadConstruction.js";
import BuildingMaintenance from "./pages/BuildingMaintenance.js";
import WaterSupply from "./pages/WaterSupply.js";
import DrainageSystem from "./pages/DrainageSystem.js";
import BridgeConstruction from "./pages/BridgeConstruction.js";
import LandDevelopment from "./pages/LandDevelopment.js";
import Security from "./pages/Security";
import AdminManagement from "./pages/AdminManagement";
import EmployeeManagement from "./pages/EmployeeManagement"; 
import DepartmentManagement from "./pages/DepartmentManagement";
import LeavePayrollManagement from "./pages/LeavePayrollManagement";
import TaskManagement from "./pages/TaskManagement";
import DocumentManagement from "./pages/DocumentManagement";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/civilwork" element={<CivilWork />} />
        <Route path="/road-construction" element={<RoadConstruction />} />
        <Route path="/building-maintenance" element={<BuildingMaintenance />} />
        <Route path="/water-supply" element={<WaterSupply />} />
        <Route path="/drainage-system" element={<DrainageSystem />} />
        <Route path="/bridge-construction" element={<BridgeConstruction />} />
        <Route path="/land-development" element={<LandDevelopment />} />
        <Route path="/security" element={<Security />} /> {/* Security Page Route */}
        <Route path="/administration" element={<AdminManagement />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/department-management" element={<DepartmentManagement />} />
        <Route path="/leave-payroll-management" element={<LeavePayrollManagement />} />
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route path="/task-management" element={<TaskManagement />} />

      </Routes>
    </Router>
  );
};

export default App;
