import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Leads from "./Leads";
import Customers from "./Customers";
import Deals from "./Deals";
import Pipeline from "./Pipeline";
import Reports from "./Reports";
import Settings from "./Settings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/leads" element={<Leads />} />

        <Route path="/customers" element={<Customers />} />

        <Route path="/deals" element={<Deals />} />

        <Route path="/pipeline" element={<Pipeline />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;