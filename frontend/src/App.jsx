import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Contacts from "./pages/Contacts";
import LiveLocation from "./pages/LiveLocation";
import NearbyPolice from "./pages/NearbyPolice";
import NearbyHospitals from "./pages/NearbyHospitals";
import AIAssistant from "./pages/AIAssistant";
import SOSHistory from "./pages/SOSHistory";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* PROTECTED PAGES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live-location"
          element={
            <ProtectedRoute>
              <LiveLocation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nearby-police"
          element={
            <ProtectedRoute>
              <NearbyPolice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nearby-hospitals"
          element={
            <ProtectedRoute>
              <NearbyHospitals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sos-history"
          element={
            <ProtectedRoute>
              <SOSHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;