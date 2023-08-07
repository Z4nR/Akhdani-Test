import React from "react";
import { FiLogOut } from "react-icons/fi";

export default function NavigationUser({ logout }) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/perdin-add">Buat Perdin</Link>
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
