import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import React, { useEffect, useState } from "react";
import { getUserLogged, putAccessToken, removeAccessToken } from "./utils/api";
import Forget from "./pages/utils/ForgotPassword";
import NavigationUser from "./components/employe/NavigationUser";
import NavigationAdmin from "./components/admin/Navigation";
import DashboardAdmin from "./components/admin/Dashboard";
import DashboardEmployeer from "./components/employe/DashboardUser";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [initialize, setInitialize] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserLogged().then(({ logged }) => {
      setAuthUser(logged);
      setInitialize(false);
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

  if (initialize) {
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

  if (authUser.role === "Pegawai") {
    return (
      <div className="perdin-app">
        <header className="perdin-app_header">
          <div className="header-item">
            <h2>Perdin Website</h2>
            <NavigationUser logout={onLogout} />
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<DashboardEmployeer />} />
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
          <NavigationAdmin logout={onLogout} role={authUser.role} />
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<DashboardAdmin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
