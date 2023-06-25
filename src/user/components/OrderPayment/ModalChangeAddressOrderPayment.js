import classes from "./ModalChangeAddressOrderPayment.module.scss";

import { Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../../shared/components/Modal/Modal";
import ModalFormAddLocation from "../UserLocationEditor/ModalFormAddLocation";
import { ButtonFields } from "../../../shared/FormElement";
import {
  useFetchLocationsQuery,
  useUpdateDefaultLocationMutation,
} from "../../../redux/apis/user/location/user-locations.api";
import { toggleShowModalChangeAddress } from "../../../redux/slices/cart/cartSlice";
import { toggleModalAdd } from "../../../redux/slices/user/location/locationSlice";
import { toast } from "react-toastify";

const ModalChangeAddressOrderPayment = () => {
  const orderPaymentSliceState = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  const [locationSelected, setLocationSelected] = useState(null);
  const [updateDefaultLocation, updateDefaultLocationResults] =
    useUpdateDefaultLocationMutation();

  const fetchLocationsByUserId = useFetchLocationsQuery(
    orderPaymentSliceState.userIdModalChangeAddress
  );

  const handleSelectLocation = (id) => {
    setLocationSelected(id);
  };

  const toggleShowModalAddLocation = () => {
    dispatch(toggleModalAdd());
    dispatch(toggleShowModalChangeAddress());
  };

  const handleUpdateDefaultLocation = () => {
    if (locationSelected) {
      updateDefaultLocation(locationSelected)
        .unwrap()
        .then(() => {
          toast.success("Update default location successfully!");
          dispatch(toggleShowModalChangeAddress());
          setLocationSelected(null);
        })
        .catch((error) => toast.error(error.data.message));
      return;
    }

    dispatch(toggleShowModalChangeAddress());
  };

  return (
    <>
      <Modal
        onCancel={() => dispatch(toggleShowModalChangeAddress())}
        show={orderPaymentSliceState.isShowModalChangeAddress}
        className={classes.ModalChangeLocations}
        header={<h3 className={classes.HeaderLocation}>My Locations</h3>}
        footer={
          <div className="d-flex justify-content-end">
            <ButtonFields
              type="button"
              onClick={() => dispatch(toggleShowModalChangeAddress())}
              borderOnly
            >
              Cancel
            </ButtonFields>
            <ButtonFields
              type="button"
              isLoading={updateDefaultLocationResults.isLoading}
              className="ml-5"
              subPrimary
              onClick={handleUpdateDefaultLocation}
            >
              Confirm
            </ButtonFields>
          </div>
        }
      >
        {!fetchLocationsByUserId.isFetching && (
          <div className={classes.LocationGroup}>
            <ul className={classes.LocationsList}>
              {fetchLocationsByUserId.data &&
                fetchLocationsByUserId.data.map((locationItem, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleSelectLocation(locationItem.id)}
                      className={classes.LocationItem}
                    >
                      <Radio
                        onChange={() => handleSelectLocation(locationItem.id)}
                        checked={
                          locationSelected
                            ? locationSelected === locationItem.id
                            : locationItem.defaultLocation
                        }
                        id={locationItem.id}
                        value={locationItem.id}
                        name="radio-buttons"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 22,
                          },
                        }}
                      />

                      <div className={classes.LocationItemInfo}>
                        <div className={classes.LocationItemInfo__Header}>
                          <span>Anh Tuan</span>
                          <span>090380212</span>
                        </div>

                        <div className={classes.LocationItemInfo__Body}>
                          <p className={classes.LocationItemInfo__BodyText}>
                            {locationItem.address}
                          </p>
                          <p className={classes.LocationItemInfo__BodyText}>
                            {locationItem.province},{locationItem.commune},{" "}
                            {locationItem.district}
                          </p>

                          <div className={classes.DefaultLocation}>
                            Default Location
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}

              <div
                style={{ padding: "0.4rem" }}
                className="user-location"
                onClick={toggleShowModalAddLocation}
              >
                <div className="user-location__group">
                  <FontAwesomeIcon
                    className="user-location__icon"
                    icon={faPlus}
                  />

                  <p className="user-location__text">Add new address</p>
                </div>
              </div>
            </ul>
          </div>
        )}
      </Modal>

      <ModalFormAddLocation />
    </>
  );
};

export default memo(ModalChangeAddressOrderPayment);
