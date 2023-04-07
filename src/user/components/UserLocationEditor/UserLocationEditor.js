import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";

import "./UserLocationEditor.scss";

import ModalFormUserLocation from "./ModalFormUserLocation";

const UserLocations = () => {
  const [showFormModal, setShowFormModal] = useState(false);

  const handleHiddenModal = () => {
    setShowFormModal(false);
  };

  const handleShowModal = () => {
    setShowFormModal(true);
  };

  return (
    <>
      <div className="user-location" onClick={handleShowModal}>
        <div className="user-location__group">
          <FontAwesomeIcon className="user-location__icon" icon={faPlus} />

          <p className="user-location__text">Add new address</p>
        </div>
      </div>

      <ModalFormUserLocation
        showFormModal={showFormModal}
        handleHiddenModal={handleHiddenModal}
        handleShowModal={handleShowModal}
      />
    </>
  );
};

export default memo(UserLocations);
