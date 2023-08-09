import React from "react";
import NavigationEmployee from "./employe/NavigationEmployee";
import NavigationAdmin from "./admin/NavigationAdmin";

export default function Navigation({ logout, role }) {
  if (role === "Pegawai") return <NavigationEmployee logout={logout} />;
  return <NavigationAdmin logout={logout} />;
}
