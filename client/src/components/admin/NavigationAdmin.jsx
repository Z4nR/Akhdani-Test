import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NavigationAdmin({ logout }) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Daftar Perdin</Link>
        </li>
        <li>
          <Link to="/add-user">Tambahkan Pengguna</Link>
        </li>
        <li>
          <Link to="/city">Data Kota</Link>
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
