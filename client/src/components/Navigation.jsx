import React from "react";
import NavigationEmployee from "./employe/NavigationEmployee";
import NavigationAdmin from "./admin/NavigationAdmin";

export default function Navigation({ logout, role }) {
  return role === "Pegawai" ? (
    <NavigationEmployee logout={logout} />
  ) : (
    <NavigationAdmin logout={logout} />
  );
}
