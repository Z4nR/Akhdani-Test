import React, { useEffect, useState } from "react";
import { getAllPerdin } from "../../utils/api";
import { FiCheckCircle, FiEye } from "react-icons/fi";
import { statusMap } from "../../utils/perdin-helper";
import ModalBox from "../../components/admin/modal/ModalBox";
import { GrClose } from "react-icons/gr";

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

  return (
    <div className="perdin-list">
      {isModalShowed && (
        <ModalBox closeModal={closeModal} id={isID} ID={perdinID} />
      )}
      <h3>Daftar Permohonan Perjalanan Dinas</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Kota</th>
            <th>Tanggal</th>
            <th>Keterangan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataPerdin?.map((data, index) => (
            <tr key={data._id}>
              <td className="perdin-data">
                <div>{index + 1}</div>
              </td>
              <td className="perdin-data">
                <div>{data.name}</div>
              </td>
              <td className="perdin-data">
                <div>
                  {data.fromCity}{" "}
                  <span style={{ fontSize: "1rem" }}>&rarr;</span>{" "}
                  {data.destinationCity}
                </div>
              </td>
              <td className="perdin-data">
                <div>
                  {data.startDate} <span style={{ fontSize: "1rem" }}>-</span>{" "}
                  {data.endDate}{" "}
                  <span style={{ color: "#6f6f6f" }}>
                    ({data.durationDay} Hari)
                  </span>
                </div>
              </td>
              <td className="perdin-data">
                <div className="perdin-data-note">
                  <p>{data.note}</p>
                </div>
              </td>
              <td>
                <div
                  className="perdin-status"
                  style={{
                    backgroundColor: statusMap[data.status].backgroundColor,
                    color: statusMap[data.status].color,
                    textAlign: "center",
                  }}
                >
                  {data.status}
                </div>
              </td>
              {data.status === "Ditinjau" && (
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
              )}
              {data.status === "Diterima" && (
                <td>
                  <div className="approval-box">
                    <FiCheckCircle />
                  </div>
                </td>
              )}
              {data.status === "Ditolak" && (
                <td>
                  <div className="approval-box">
                    <GrClose />
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
