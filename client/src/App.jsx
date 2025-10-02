import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './utils/store';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Characters from './pages/Characters';
import Gacha from './pages/Gacha';
import Battle from './pages/Battle';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import Navbar from './components/Navbar';

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen">
        {token && <Navbar />}
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/characters" element={token ? <Characters /> : <Navigate to="/login" />} />
          <Route path="/gacha" element={token ? <Gacha /> : <Navigate to="/login" />} />
          <Route path="/battle" element={token ? <Battle /> : <Navigate to="/login" />} />
          <Route path="/admin" element={token ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin/users" element={token ? <AdminUsers /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
