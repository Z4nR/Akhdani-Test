import { FiCheckCircle, FiEye } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

export default function ApprovalBtn({ status, setPerdin, id, openModal }) {
  if (status === "Diterima") {
    return (
      <div className="approval-box">
        <FiCheckCircle />
      </div>
    );
  }
  if (status === "Ditolak") {
    return (
      <div className="approval-box">
        <GrClose />
      </div>
    );
  }
  return (
    <div className="action-box">
      <FiEye
        className="edit-btn"
        onClick={(event) => {
          event.preventDefault();
          setPerdin(id);
          openModal(3);
        }}
      />
    </div>
  );
}
