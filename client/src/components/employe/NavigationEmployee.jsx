import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NavigationEmployee({ logout }) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Daftar Perdin</Link>
        </li>
        <li>
          <Link to="/form-perdin">Buat Perdin</Link>
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
