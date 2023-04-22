import { memo, useCallback, useState } from "react";

import "./UserLocationItem.scss";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";

import ButtonFields from "../../../shared/FormElement/ButtonFields/ButtonFields";
import ModalFormUpdateLocation from "./ModalFormUpdateLocation";
import { toggleModalUpdate } from "../../../redux/slices/user/location/locationSlice";
import { ModalWarning } from "../../../shared/components";
import {
  useRemoveLocationMutation,
  useUpdateDefaultLocationMutation,
} from "../../../redux/apis/user/location/user-locations.api";

const UserLocationItem = ({
  locationId,
  address,
  province,
  district,
  commune,
  defaultLocation,
}) => {
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSetDefaultLocation, setShowSetDefaultLocation] = useState(false);

  const [updateDefaultLocation, updateDefaultLocationResults] =
    useUpdateDefaultLocationMutation();
  const [removeLocation, removeLocationResults] = useRemoveLocationMutation();

  const handleToggleUpdateLocation = useCallback(() => {
    dispatch(toggleModalUpdate(locationId));
  }, [locationId, dispatch]);

  const handleDeleteLocation = useCallback(async () => {
    removeLocation(locationId)
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        toast.success("Deleted Location Successfully!", { autoClose: 2000 });
      })
      .catch((error) => toast.error(error.data.message));
  }, [removeLocation, locationId]);

  const handleSetDefaultLocation = useCallback(async () => {
    updateDefaultLocation(locationId)
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        toast.success("Updated Location Successfully!", { autoClose: 2000 });
      })
      .catch((error) => toast.error(error.data.message))
      .finally(() => setShowSetDefaultLocation(false));
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
              {province}, {district}, {commune}
            </span>
          </div>
        </div>

        <div className="user-location__action">
          <div className="user-location__action-group">
            <div className="d-flex align-items-center justify-content-end">
              <FontAwesomeIcon
                className="user-location__action-icon"
                icon={faPenToSquare}
                onClick={handleToggleUpdateLocation}
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
              isLoading={updateDefaultLocationResults.isLoading}
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
              isLoading={removeLocationResults.isLoading}
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
      <ModalFormUpdateLocation />
    </>
  );
};

export default memo(UserLocationItem);
