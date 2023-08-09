import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getPerdinById } from "../../../utils/api";
import { GrClose } from "react-icons/gr";

export default function ApprovalForm({ closeModal, id }) {
  const ID = id;

  const {
    handleSubmit,
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
      status: "Sedang Ditinjau",
    },
  });

  useEffect(() => {
    getPerdinById(ID).then((data) => {
      const perdinData = data.perdin;

      setValue("name", perdinData.name);
      setValue("note", perdinData.note);
      setValue("startDate", perdinData.startDate);
      setValue("endDate", perdinData.endDate);
      setValue("fromCity", perdinData.fromCity);
      setValue("destinationCity", perdinData.destinationCity);
      setValue("status", perdinData.status);
    });
  }, [ID, setValue]);

  const onApprovePerdin = async (data) => {
    console.log(data);
    //if (!error) window.location.reload();
  };

  return (
    <div className="perdin-form">
      <div className="header-input-data">
        <h3>Form Perjalanan Dinas</h3>
        <div className="icon-close">
          <GrClose onClick={closeModal} />
        </div>
      </div>
      <form onSubmit={handleSubmit(onApprovePerdin)}>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="name">Nama Pemohon</label>
            <input
              id="name"
              type="text"
              readOnly
              {...register("name", { required: true })}
            />
            {errors.name && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="startDate">Kota</label>
            <div className="perdin-box">
              <input
                id="fromCity"
                type="text"
                readOnly
                {...register("fromCity", {
                  required: true,
                })}
              />
              <span style={{ fontSize: "1.5rem" }}>&rarr;</span>
              <input
                id="destinationCity"
                type="text"
                readOnly
                {...register("destinationCity", {
                  required: true,
                })}
              />
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
                type="text"
                readOnly
                {...register("startDate", { required: true })}
              />
              <span style={{ fontSize: "1.5rem" }}>&rarr;</span>
              <input
                id="endDate"
                type="text"
                readOnly
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
              readOnly
              {...register("note", { required: true })}
            />
            {errors.note && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <button type="submit">Tambahkan Kota</button>
          </div>
        </div>
      </form>
    </div>
  );
}
