import React from "react";
import AddCity from "./AddCityForm";
import EditCityData from "./EditCityDataForm";
import ApprovalForm from "./ApprovalForm";

export default function ModalBox({ closeModal, id, ID }) {
  return (
    <div className="modal-box">
      <div className="modal-center">
        {id === 1 && <AddCity closeModal={closeModal} />}
        {id === 2 && <EditCityData closeModal={closeModal} id={ID} />}
        {id === 3 && <ApprovalForm closeModal={closeModal} id={ID} />}
      </div>
    </div>
  );
}
