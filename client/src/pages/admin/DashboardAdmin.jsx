import React, { useEffect, useState } from "react";
import { getAllPerdin } from "../../utils/api";
import { FiCheckCircle, FiEye } from "react-icons/fi";
import { statusMap } from "../../utils/perdin-helper";
import ModalBox from "../../components/admin/modal/ModalBox";

export default function DashboardAdmin() {
  const [dataPerdin, setDataPerdin] = useState(null);
  const [isModalShowed, setModalShowed] = useState(false);
  const [isID, setID] = useState(0);
  const [perdinID, setPerdinID] = useState(null);

  const openModal = (id) => {
    setModalShowed(true);
    setID(id);
  };

  const closeModal = () => {
    setModalShowed(false);
  };

  useEffect(() => {
    getAllPerdin().then((perdin) => {
      setDataPerdin(perdin.perdin);
    });
  }, []);

  let selectedStatus = statusMap["Ditinjau"];
  if (statusMap[dataPerdin?.status]) {
    selectedStatus = statusMap[dataPerdin?.status];
  }
  console.log(selectedStatus);

  return (
    <div className="perdin-list">
      {isModalShowed && (
        <ModalBox closeModal={closeModal} id={isID} ID={perdinID} />
      )}
      <h3>Daftar Permohonan Perjalanan Dinas</h3>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kota</th>
            <th>Tanggal</th>
            <th>Keterangan</th>
            <th>Status</th>

            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataPerdin?.map((data) => (
            <tr key={data._id}>
              <td>
                <div className="perdin-data">{data.name}</div>
              </td>
              <td>
                <div className="perdin-data">
                  {data.fromCity}{" "}
                  <span style={{ fontSize: "1rem" }}>&rarr;</span>{" "}
                  {data.destinationCity}
                </div>
              </td>
              <td>
                <div className="perdin-data">
                  {data.startDate} <span style={{ fontSize: "1rem" }}>-</span>{" "}
                  {data.endDate}{" "}
                  <span style={{ color: "#6f6f6f" }}>
                    ({data.durationDay} Hari)
                  </span>
                </div>
              </td>
              <td>
                <div
                  className="perdin-data"
                  style={{
                    width: "300px",
                    textAlign: "justify",
                    height: "auto",
                  }}
                >
                  {data.note}
                </div>
              </td>
              <td>
                <div
                  className="perdin-data perdin-status"
                  style={{
                    backgroundColor: selectedStatus.backgroundColor,
                    color: selectedStatus.color,
                  }}
                >
                  {data.status}
                </div>
              </td>
              {data.status === "Ditinjau" ? (
                <td>
                  <div className="action-box">
                    <FiEye
                      className="edit-btn"
                      onClick={(event) => {
                        event.preventDefault();
                        setPerdinID(data._id);
                        openModal(3);
                      }}
                    />
                  </div>
                </td>
              ) : (
                <td>
                  <div className="action-box">
                    <FiCheckCircle />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
