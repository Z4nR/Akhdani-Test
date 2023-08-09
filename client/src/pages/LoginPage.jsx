import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../utils/api";

export default function Login({ loginSuccess }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLogin = async (data) => {
    const { error, token } = await login(data);

    if (!error) loginSuccess(token);
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <div className="auth-acc">
          <div className="auth-acc_header">
            <h2>Masuk</h2>
          </div>
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="input-data">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Masukkan Username Anda"
                autoComplete="off"
                {...register("username", { required: true })}
              />
              {errors.username && <p style={{ color: "red" }}>Harap Diisi</p>}
            </div>
            <div className="input-data">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Masukkan Kata Sandi Anda"
                autoComplete="off"
                {...register("password", { required: true })}
              />
              {errors.password && <p style={{ color: "red" }}>Harap Diisi</p>}
            </div>
            <div className="input-data">
              <button type="submit">Masuk</button>
            </div>
            <div className="input-data">
              <Link className="forget-btn" to="/forget">
                Lupa Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
