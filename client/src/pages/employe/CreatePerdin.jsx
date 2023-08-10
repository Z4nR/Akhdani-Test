import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { durationDay, showFormattedDateID } from "../../utils/perdin-helper";
import { createPerdin } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreatePerdin({ name, city }) {
  const navigate = useNavigate();
  const [day, setDay] = useState(0);

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      note: "",
      startDate: "",
      endDate: "",
      fromCity: "",
      destinationCity: "",
      durationDay: "",
      status: "Ditinjau",
    },
  });

  const watchStart = watch("startDate");
  const watchEnd = watch("endDate");

  useEffect(() => {
    const time = durationDay(watchStart, watchEnd);
    Number.isNaN(time) ? setDay(0) : setDay(time);

    setValue("durationDay", time);
  }, [setValue, watchStart, watchEnd]);

  const onCreatePerdin = async (data) => {
    const start = showFormattedDateID(data.startDate);
    const end = showFormattedDateID(data.endDate);

    const perdin = {
      startDate: start,
      endDate: end,
      fromCity: data.fromCity,
      destinationCity: data.destinationCity,
      durationDay: data.durationDay,
      status: data.status,
      note: data.note,
      name: name,
    };

    console.log(perdin);

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
            <textarea
              id="note"
              type="text"
              autoComplete="off"
              placeholder="Masukan Keterangan Perjalanan Dinas"
              maxLength="500"
              rows="5"
              cols="30"
              {...register("note", { required: true })}
            />
            {errors.note && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="info-data-box">
          <div className="info-data cost-table">
            <table>
              <thead style={{ backgroundColor: "#7db3e7" }}>
                <tr>
                  <th>Total Hari</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "#d5f5ff" }}>
                <tr>
                  <td>
                    <h1>{day} Hari</h1>
                  </td>
                </tr>
              </tbody>
            </table>
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
