import React from "react";
import { useForm } from "react-hook-form";
import { durationDay, showFormattedDateID } from "../../utils/perdin-helper";
import { createPerdin } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreatePerdin({ name, city }) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      note: "",
      startDate: "",
      endDate: "",
      fromCity: "",
      destinationCity: "",
      status: "Ditinjau",
    },
  });

  const onCreatePerdin = async (data) => {
    const duration = durationDay(data.startDate, data.endDate);
    const start = showFormattedDateID(data.startDate);
    const end = showFormattedDateID(data.endDate);

    const perdin = {
      name: name,
      note: data.note,
      startDate: start,
      endDate: end,
      fromCity: data.fromCity,
      destinationCity: data.destinationCity,
      durationDay: duration,
      status: data.status,
    };

    const { error } = await createPerdin(perdin);

    if (!error) navigate("/");
  };

  return (
    <div className="perdin-form">
      <div className="header-input-data">
        <h3>Form Perjalanan Dinas</h3>
      </div>
      <form onSubmit={handleSubmit(onCreatePerdin)}>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="startDate">Kota</label>
            <div className="perdin-box">
              <select
                id="fromCity"
                name="fromCity"
                {...register("fromCity", {
                  required: true,
                })}
              >
                <option value="" disabled>
                  Kota Asal
                </option>
                {city.map((option) => (
                  <option key={option._id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              <span style={{ fontSize: "1.5rem" }}>&rarr;</span>
              <select
                id="destinationCity"
                name="destinationCity"
                {...register("destinationCity", {
                  required: true,
                })}
              >
                <option value="" disabled>
                  Kota Tujuan
                </option>
                {city.map((option) => (
                  <option key={option._id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="perdin-error-box">
              {errors.startDate && (
                <p style={{ color: "red" }}>Pilih Kota Asal</p>
              )}
              {errors.endDate && (
                <p style={{ color: "red" }}>Pilih Kota Tujuan</p>
              )}
            </div>
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="startDate">Tanggal</label>
            <div className="perdin-box">
              <input
                id="startDate"
                type="date"
                placeholder="Masukan Tanggal Berangkat"
                {...register("startDate", { required: true })}
              />
              <span style={{ fontSize: "1.5rem" }}>&rarr;</span>
              <input
                id="endDate"
                type="date"
                placeholder="Masukan Tanggal Pulang"
                {...register("endDate", { required: true })}
              />
            </div>
            <div className="perdin-error-box">
              {errors.startDate && (
                <p style={{ color: "red" }}>Harap Diisi Tanggal Berangkat</p>
              )}
              {errors.endDate && (
                <p style={{ color: "red" }}>Harap Diisi Tanggal Pulang</p>
              )}
            </div>
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="note">Keterangan</label>
            <input
              id="note"
              type="text"
              autoComplete="off"
              style={{ height: "100px" }}
              {...register("note", { required: true })}
            />
            {errors.note && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <button type="submit">Buat Permohonan</button>
          </div>
        </div>
      </form>
    </div>
  );
}
