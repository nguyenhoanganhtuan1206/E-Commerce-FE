import { memo, useCallback, useState } from "react";

import "./UserLocationItem.scss";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";
import ModalFormUserLocation from "./ModalFormUserLocation";
import { ModalWarning } from "../../../shared/components";
import { useLocationApis } from "../../../apis/user/location/user-location.api";

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
  const [showSetDefaultLocation, setShowSetDefaultLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { deleteLocationById, updateDefaultLocation } = useLocationApis();

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

  const handleSetDefaultLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      await updateDefaultLocation(locationId);

      toast.success("Updated you default location successfully");
      setShowSetDefaultLocation(false);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [updateDefaultLocation, locationId]);

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
                onClick={() => setShowDeleteModal(true)}
              />
            </div>

            {!defaultLocation && (
              <ButtonFields
                type="button"
                subPrimary
                className="mt-4 user-location__action-btn"
                onClick={() => setShowSetDefaultLocation(true)}
              >
                Set as default location
              </ButtonFields>
            )}
          </div>
        </div>
      </div>

      {/* MODAL UPDATE ADDRESS */}
      <ModalFormUserLocation
        locationId={locationId}
        showFormModal={showFormModal}
        handleHiddenModal={handleHiddenModal}
        handleShowModal={handleShowModal}
      />
      {/* MODAL UPDATE ADDRESS */}

      {/* MODAL SET DEFAULT LOCATION */}
      <ModalWarning
        show={showSetDefaultLocation}
        onCancel={() => setShowSetDefaultLocation(false)}
        headerWarning="Update Default Location"
        footer={
          <div className="d-flex align-items-center justify-content-between">
            <ButtonFields
              type="button"
              onClick={() => setShowSetDefaultLocation(false)}
              borderOnly
              className="seller-form__btn"
            >
              Close
            </ButtonFields>
            <ButtonFields
              onClick={handleSetDefaultLocation}
              type="button"
              isLoading={isLoading}
              subPrimary
              className="seller-form__btn"
            >
              Confirm Set Default Location
            </ButtonFields>
          </div>
        }
      >
        Are you sure you want to set location as default?
      </ModalWarning>
      {/* MODAL SET DEFAULT LOCATION */}

      {/* MODAL DELETE */}
      <ModalWarning
        show={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
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
      {/* MODAL DELETE */}
    </>
  );
};

export default memo(UserLocationItem);
