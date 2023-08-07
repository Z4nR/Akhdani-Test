import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NavigationAdmin({ logout, role }) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          {role === "Admin SDM" ? (
            <Link to="/admin/add">Tambahkan Data</Link>
          ) : (
            <Link to="/super/add">Tambahkan Data</Link>
          )}
        </li>
        <li>
          <Link to="/city-data">Data Kota</Link>
        </li>
        <li>
          <button onClick={logout}>
            Keluar
            <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  );
}
