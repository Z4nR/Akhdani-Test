import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import React, { useEffect, useState } from "react";
import { getUserLogged, putAccessToken, removeAccessToken } from "./utils/api";
import Forget from "./pages/utils/ForgotPassword";
import CityData from "./pages/MasterCity";
import Navigation from "./components/Navigation";
import AddUserForm from "./pages/AddUserForm";
import CreatePerdin from "./pages/CreatePerdin";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import DashboardEmployeer from "./components/employe/DashboardEmployee";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserLogged().then(({ logged }) => {
      setAuthUser(logged);
      setInitializing(false);
    });
  }, []);

  const onLogin = async (token) => {
    putAccessToken(token);
    const { logged } = await getUserLogged();
    setAuthUser(logged);
    navigate("/");
  };

  const onLogout = () => {
    setAuthUser(null);
    navigate("/");
    removeAccessToken();
  };

  if (initializing) {
    return null;
  }

  if (!authUser) {
    return (
      <div className="perdin-app">
        <main>
          <Routes>
            <Route path="/*" element={<Login loginSuccess={onLogin} />} />
            <Route path="/forget" element={<Forget />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="perdin-app">
      <header className="perdin-app_header">
        <div className="header-item">
          <h2>Perdin Website</h2>
          <Navigation logout={onLogout} role={authUser.role} />
        </div>
      </header>
      {authUser.role === "Pegawai" ? (
        <main>
          <Routes>
            <Route path="/" element={<DashboardEmployeer />} />
            <Route path="/form-perdin" element={<CreatePerdin />} />
          </Routes>
        </main>
      ) : (
        <main>
          <Routes>
            <Route path="/" element={<DashboardAdmin />} />
            <Route path="/city" element={<CityData />} />
            <Route
              path="/add-user"
              element={<AddUserForm role={authUser.role} />}
            />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
