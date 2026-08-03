import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NearbyPolice from "./pages/NearbyPolice";
import LiveLocation from "./pages/LiveLocation";
import NearbyHospitals from "./pages/NearbyHospitals";
import AIAssistant from "./pages/AIAssistant";
import SOSHistory from "./pages/SOSHistory";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
 path="/nearby-hospitals"
 element={<NearbyHospitals />}
/>

        <Route path="/login" element={<Login />} />

        <Route
 path="/ai-assistant"
 element={<AIAssistant />}
/>

        <Route path="/register" element={<Register />} />

        <Route
 path="/sos-history"
 element={<SOSHistory />}
/>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
 path="/profile"
 element={<Profile />}
/>

        <Route path="/contacts" element={<Contacts />} />

        <Route path="/nearby-police" element={<NearbyPolice />} 
/>
      <Route
  path="/live-location"
  element={<LiveLocation />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;