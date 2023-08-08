import React from "react";
import AdminForm from "../components/admin/AdminForm";
import SuperAdminForm from "../components/admin/SuperAdminForm";

export default function AddUserForm({ role }) {
  return role === "Admin SDM" ? <AdminForm /> : <SuperAdminForm />;
}
