import React from "react";
import { useForm } from "react-hook-form";
import { regist } from "../../utils/api";

export default function AdminForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      role: "Pegawai",
    },
  });

  const onAddUser = async (data) => {
    const { error } = await regist(data);
    if (!error) window.location.reload();
  };

  return (
    <div className="perdin-form">
      <div className="header-input-data">
        <h3>Tambah Pengguna</h3>
      </div>
      <form onSubmit={handleSubmit(onAddUser)}>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="name">Nama Pegawai</label>
            <input
              id="name"
              type="text"
              placeholder="Masukan Nama Pegawai"
              autoComplete="off"
              {...register("name", { required: true })}
            />
            {errors.name && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
          <div className="input-data">
            <label htmlFor="email">Email Pengguna</label>
            <input
              id="email"
              type="email"
              placeholder="Masukan Email Pengguna"
              autoComplete="off"
              {...register("email", { required: true })}
            />
            {errors.email && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="username">Nama Pengguna</label>
            <input
              id="username"
              type="text"
              placeholder="Masukan Nama Pengguna"
              autoComplete="off"
              {...register("username", { required: true })}
            />
            {errors.username && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
          <div className="input-data">
            <label htmlFor="password">Kata Sandi</label>
            <input
              id="password"
              type="password"
              placeholder="Masukan Kata Sandi"
              autoComplete="off"
              {...register("password", { required: true })}
            />
            {errors.password && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <button type="submit">Tambahkan Pengguna</button>
          </div>
        </div>
      </form>
    </div>
  );
}
