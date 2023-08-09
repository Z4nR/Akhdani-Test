import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { editCity, getCityById } from "../../../utils/api";

export default function EditCityData({ closeModal, id }) {
  const ID = id;
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      lat: "",
      long: "",
      province: "",
      island: "",
    },
  });

  useEffect(() => {
    getCityById(ID).then((data) => {
      const cityData = data.city;

      setValue("name", cityData.name);
      setValue("lat", cityData.lat);
      setValue("long", cityData.long);
      setValue("province", cityData.province);
      setValue("island", cityData.island);
      setValue("aboard", cityData.aboard);
    });
  }, [ID, setValue]);

  const onEditCity = async (data) => {
    const { error } = await editCity(id, data);

    if (!error) {
      window.location.reload();
    }
  };

  return (
    <div className="modal-input">
      <div className="header-input-data">
        <h3>Perbarui Data Kota</h3>
        <div className="icon-close">
          <GrClose onClick={closeModal} />
        </div>
      </div>
      <form onSubmit={handleSubmit(onEditCity)}>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="name">Nama Kota</label>
            <input
              id="name"
              type="text"
              placeholder="Masukan Nama Kota"
              autoComplete="off"
              {...register("name", { required: true })}
            />
            {errors.name && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="lat">Koordinat Latitude</label>
            <input
              id="lat"
              type="number"
              step="any"
              placeholder="Masukan Koordinat Latitude"
              autoComplete="off"
              {...register("lat", { required: true })}
            />
            {errors.lat && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
          <div className="input-data">
            <label htmlFor="long">Koordinat Longitude</label>
            <input
              id="long"
              type="number"
              step="any"
              placeholder="Masukan Koordinat Longitude"
              autoComplete="off"
              {...register("long", { required: true })}
            />
            {errors.long && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <label htmlFor="province">Nama Provinsi</label>
            <input
              id="province"
              type="text"
              placeholder="Masukan Nama Provinsi"
              autoComplete="off"
              {...register("province", { required: true })}
            />
            {errors.province && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
          <div className="input-data">
            <label htmlFor="island">Nama Pulau</label>
            <input
              id="island"
              type="text"
              placeholder="Masukan Nama Pulau"
              autoComplete="off"
              {...register("island", { required: true })}
            />
            {errors.island && <p style={{ color: "red" }}>Harap Diisi</p>}
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data-checkbox">
            <input id="aboard" type="checkbox" {...register("aboard")} />
            <label htmlFor="aboard">
              Centang Apabila Lokasi Berada Di Luar Negeri
            </label>
          </div>
        </div>
        <div className="input-data-box">
          <div className="input-data">
            <button type="submit">Perbarui Data</button>
          </div>
        </div>
      </form>
    </div>
  );
}
