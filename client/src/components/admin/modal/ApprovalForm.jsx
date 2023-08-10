import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getPerdinById,
  processPerdin,
  rangeCityCount,
} from "../../../utils/api";
import { GrClose } from "react-icons/gr";

export default function ApprovalForm({ closeModal, id }) {
  const [costData, setCostData] = useState(null);
  const ID = id;

  const { register, setValue } = useForm();

  const rangeCount = async (fCity, dCity, duration) => {
    const { error, range, total, note, money } = await rangeCityCount(
      fCity,
      dCity,
      duration
    );

    const data = { range, total, note, money, duration };

    if (!error) setCostData(data);
  };

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

      rangeCount(
        perdinData.fromCity,
        perdinData.destinationCity,
        perdinData.durationDay
      );
    });
  }, [ID, setValue]);

  const onApprovePerdin = async (data) => {
    let status;
    data === true ? (status = "Diterima") : (status = "Ditolak");

    const { error } = await processPerdin(ID, status);

    if (!error) window.location.reload();
  };

  return (
    <div className="approval-form">
      <div className="header-input-data">
        <h3>Detil Perjalanan Dinas</h3>
        <div className="icon-close">
          <GrClose onClick={closeModal} />
        </div>
      </div>
      <form>
        <div className="input-data-box">
          <div className="perdin-data-form">
            <label htmlFor="name">Nama Pemohon</label>
            <input
              id="name"
              type="text"
              disabled
              {...register("name", { required: true })}
            />
          </div>
        </div>
        <div className="input-data-box">
          <div className="perdin-data-form">
            <label htmlFor="startDate">Kota</label>
            <div className="perdin-box">
              <input
                id="fromCity"
                type="text"
                disabled
                {...register("fromCity", {
                  required: true,
                })}
              />
              <span style={{ fontSize: "1.5rem" }}>&rarr;</span>
              <input
                id="destinationCity"
                type="text"
                disabled
                {...register("destinationCity", {
                  required: true,
                })}
              />
            </div>
          </div>
        </div>
        <div className="input-data-box">
          <div className="perdin-data-form">
            <label htmlFor="startDate">Tanggal</label>
            <div className="perdin-box">
              <input
                id="startDate"
                type="text"
                disabled
                {...register("startDate", { required: true })}
              />
              <span style={{ fontSize: "1.5rem" }}>&rarr;</span>
              <input
                id="endDate"
                type="text"
                disabled
                {...register("endDate", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="input-data-box">
          <div className="perdin-data-form">
            <label htmlFor="note">Keterangan</label>
            <textarea
              id="note"
              type="text"
              autoComplete="off"
              rows="5"
              cols="30"
              disabled
              {...register("note", { required: true })}
            />
          </div>
        </div>
        <div className="info-data-box">
          <div className="info-data cost-table">
            <table>
              <thead>
                <tr>
                  <th>Total Hari</th>
                  <th>Jarak Tempuh</th>
                  <th>Total Uang Perdin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h3>{costData?.duration} Hari</h3>
                  </td>
                  <td>
                    <div className="perdin-data">
                      <h2>{costData?.range}</h2>
                      <p>{costData?.money}</p>
                      <h5>{costData?.note}</h5>
                    </div>
                  </td>
                  <td>
                    <h3>{costData?.total}</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-approval">
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={(event) => {
                event.preventDefault();
                onApprovePerdin(false);
              }}
            >
              Tolak
            </button>
          </div>
          <div className="input-approval">
            <button
              style={{ backgroundColor: "dodgerblue", color: "white" }}
              onClick={(event) => {
                event.preventDefault();
                onApprovePerdin(true);
              }}
            >
              Terima
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
