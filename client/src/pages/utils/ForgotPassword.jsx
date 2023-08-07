import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../utils/api";

export default function Forget() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onForget = async (data) => {
    const { error } = await forgotPassword(data);

    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-acc">
          <div className="auth-acc_header">
            <h2>Masuk</h2>
          </div>
          <form className="input-form" onSubmit={handleSubmit(onForget)}>
            <div className="input-data">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Masukkan Email Anda"
                autoComplete="off"
                {...register("email", { required: true })}
              />
              {errors.email && <p style={{ color: "red" }}>Harap Diisi</p>}
            </div>
            <div className="input-data">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Masukkan Kata Sandi Baru"
                autoComplete="off"
                {...register("password", { required: true })}
              />
              {errors.password && <p style={{ color: "red" }}>Harap Diisi</p>}
            </div>
            <div className="input-data">
              <button type="submit">Ganti Kata Sandi</button>
            </div>
            <div className="input-data">
              <Link className="forget-btn" to="/">
                Sudah punya akun?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
