import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Sites from "./pages/Sites/Sites";
import Environment from "./pages/Environment/Environment";
import GIS from "./pages/GIS/GIS";
import Prediction from "./pages/Prediction/Prediction";
import Analytics from "./pages/Analytics/Analytics";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ResourceAssessment from "./pages/ResourceAssessment/ResourceAssessment";
import RenewableDashboard from "./pages/RenewableDashboard/RenewableDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard/ExecutiveDashboard";
import LocationAssessment from "./pages/LocationAssessment/LocationAssessment";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            PROTECTED ROUTES
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sites"
          element={
            <ProtectedRoute>
              <Sites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/environment"
          element={
            <ProtectedRoute>
              <Environment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gis"
          element={
            <ProtectedRoute>
              <GIS />
            </ProtectedRoute>
          }
        />

        <Route
  path="/prediction"
  element={
    <ProtectedRoute>
      <Prediction />
    </ProtectedRoute>
  }
/>

<Route
  path="/renewable-dashboard"
  element={
    <ProtectedRoute>
      <RenewableDashboard />
    </ProtectedRoute>
  }
/>

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
  path="/resource-assessment"
  element={
    <ProtectedRoute>
      <ResourceAssessment />
    </ProtectedRoute>
  }
/>

<Route
  path="/executive-dashboard"
  element={
    <ProtectedRoute>
      <ExecutiveDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/location-assessment"
  element={
    <ProtectedRoute>
      <LocationAssessment />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
