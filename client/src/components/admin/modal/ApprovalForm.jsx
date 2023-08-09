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
    <div className="perdin-form">
      <div className="header-input-data">
        <h3>Detil Perjalanan Dinas</h3>
        <div className="icon-close">
          <GrClose onClick={closeModal} />
        </div>
      </div>
      <form>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="name">Nama Pemohon</label>
            <input
              id="name"
              type="text"
              readOnly
              {...register("name", { required: true })}
            />
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
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="note">Keterangan</label>
            <input
              id="note"
              type="text"
              style={{ height: "100px" }}
              readOnly
              {...register("note", { required: true })}
            />
          </div>
        </div>
        <div className="info-data-box">
          <div className="info-data">
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
