import React, { useState } from "react";
import { deleteCity } from "../../utils/api";
import { FiEdit, FiTrash } from "react-icons/fi";
import ModalBox from "../../components/admin/modal/ModalBox";

export default function CityData({ cityData }) {
  const [isModalShowed, setModalShowed] = useState(false);
  const [isID, setID] = useState(0);
  const [cityID, setCityID] = useState(null);

  const openModal = (id) => {
    setModalShowed(true);
    setID(id);
  };

  const closeModal = () => {
    setModalShowed(false);
  };

  const onDeleteCity = async (id) => {
    await deleteCity(id);

    window.location.reload();
  };

  return (
    <div className="city-page">
      {isModalShowed && (
        <ModalBox closeModal={closeModal} id={isID} ID={cityID} />
      )}
      <h1>Daftar Kota</h1>
      <div className="add-city">
        <button
          onClick={(event) => {
            event.preventDefault();
            openModal(1);
          }}
        >
          Tambah Data Kota
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nama Kota</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Provinsi</th>
            <th>Pulau</th>
            <th>Luar Negeri</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {cityData?.map((city) => (
            <tr key={city._id}>
              <td>{city.name}</td>
              <td>{city.lat}</td>
              <td>{city.long}</td>
              <td>{city.province}</td>
              <td>{city.island}</td>
              <td>{city.aboard === true ? "Ya" : "Tidak"}</td>
              <td>
                <div className="action-box">
                  <FiEdit
                    className="edit-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      setCityID(city._id);
                      openModal(2);
                    }}
                  />
                  <FiTrash
                    className="trash-btn"
                    onClick={() => onDeleteCity(city._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
