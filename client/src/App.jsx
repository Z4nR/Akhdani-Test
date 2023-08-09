import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import React, { useEffect, useState } from "react";
import {
  getCityData,
  getUserLogged,
  putAccessToken,
  removeAccessToken,
} from "./utils/api";
import Forget from "./pages/utils/ForgotPassword";
import CityData from "./pages/admin/MasterCity";
import Navigation from "./components/Navigation";
import AddUserForm from "./pages/admin/AddUserForm";
import CreatePerdin from "./pages/employe/CreatePerdin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardEmployeer from "./pages/employe/DashboardEmployee";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [cityData, setCityData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserLogged().then(({ logged }) => {
      setAuthUser(logged);
      getCity();
      setInitializing(false);
    });
  }, []);

  const getCity = async () => {
    getCityData().then((data) => {
      const city = data.city;
      setCityData(city);
    });
  };

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
    return <p>Loading</p>;
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
            <Navigation logout={onLogout} role={authUser.role} />
          </div>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<DashboardEmployeer name={authUser.name} />}
            />
            <Route
              path="/form-perdin"
              element={<CreatePerdin name={authUser.name} city={cityData} />}
            />
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
      <main>
        <Routes>
          <Route path="/" element={<DashboardAdmin />} />
          <Route path="/city" element={<CityData cityData={cityData} />} />
          <Route
            path="/add-user"
            element={<AddUserForm role={authUser.role} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
