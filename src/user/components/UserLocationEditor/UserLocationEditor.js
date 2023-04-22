import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { useDispatch } from "react-redux";

import "./UserLocationEditor.scss";

import ModalFormAddLocation from "./ModalFormAddLocation";
import { toggleModalAdd } from "../../../redux/slices/user/location/locationSlice";

const UserLocations = () => {
  const dispatch = useDispatch();

  const toggleShowModalAdd = () => {
    dispatch(toggleModalAdd());
  };

  return (
    <>
      <div className="user-location" onClick={toggleShowModalAdd}>
        <div className="user-location__group">
          <FontAwesomeIcon className="user-location__icon" icon={faPlus} />

          <p className="user-location__text">Add new address</p>
        </div>
      </div>

      <ModalFormAddLocation />
    </>
  );
};

export default memo(UserLocations);
