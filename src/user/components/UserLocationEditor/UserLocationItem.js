import { memo, useCallback, useState } from "react";

import "./UserLocationItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";
import ModalFormUserLocation from "./ModalFormUserLocation";
import { ModalWarning } from "../../../shared/components";
import { useLocationApis } from "../../../apis/user/location/user-location.api";
import { toast } from "react-toastify";

const UserLocationItem = ({
  locationId,
  address,
  city,
  district,
  commune,
  defaultLocation,
}) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { deleteLocationById } = useLocationApis();

  const handleToggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleHiddenModal = () => {
    setShowFormModal(false);
  };

  const handleShowModal = () => {
    setShowFormModal(true);
  };

  const handleDeleteLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteLocationById(locationId);

      toast.success("Deleted your location successful");
      setShowDeleteModal(false);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [deleteLocationById, locationId]);

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
                onClick={handleShowModal}
              />

              <FontAwesomeIcon
                className="user-location__action-icon"
                icon={faTrashAlt}
                onClick={handleToggleDeleteModal}
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

      <ModalFormUserLocation
        locationId={locationId}
        showFormModal={showFormModal}
        handleHiddenModal={handleHiddenModal}
        handleShowModal={handleShowModal}
      />

      <ModalWarning
        show={showDeleteModal}
        onCancel={handleToggleDeleteModal}
        headerWarning="Delete Your Location"
        footer={
          <div className="d-flex align-items-center justify-content-between">
            <ButtonFields
              type="button"
              onClick={() => setShowDeleteModal(false)}
              borderOnly
              className="seller-form__btn"
            >
              Close
            </ButtonFields>
            <ButtonFields
              onClick={handleDeleteLocation}
              type="button"
              isLoading={isLoading}
              subPrimary
              className="seller-form__btn"
            >
              Confirm Delete
            </ButtonFields>
          </div>
        }
      >
        Are you sure you want to delete this location?
      </ModalWarning>
    </>
  );
};

export default memo(UserLocationItem);
