import { memo, useState } from "react";

import "./UserLocationItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";
import ModalFormUserLocation from "./ModalFormUserLocation";

const UserLocationItem = ({
  locationId,
  address,
  city,
  district,
  commune,
  defaultLocation,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleHiddenModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="user-location__item">
        <div className="user-location__details">
          <div className="d-flex align-items-center">
            <h4>Home Address: </h4>
            <span>{address}</span>
          </div>

          <div className="d-flex align-items-center">
            <h4>Location Details: </h4>
            <span>
              {city}, {district}, {commune}
            </span>
          </div>
        </div>

        <div className="user-location__action">
          <div className="user-location__action-group">
            <div className="d-flex align-items-center justify-content-end">
              <FontAwesomeIcon
                className="user-location__action-icon"
                icon={faPenToSquare}
                onClick={setShowModal}
              />
              <FontAwesomeIcon
                className="user-location__action-icon"
                icon={faTrashAlt}
              />
            </div>

            {!defaultLocation && (
              <ButtonFields
                borderOnly
                className="mt-3 user-location__action-btn"
              >
                Set as default location
              </ButtonFields>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <ModalFormUserLocation
          locationId={locationId}
          showFormModal={showModal}
          handleHiddenModal={handleHiddenModal}
          handleShowModal={handleShowModal}
        />
      )}
    </>
  );
};

export default memo(UserLocationItem);
