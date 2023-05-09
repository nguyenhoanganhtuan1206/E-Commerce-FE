import { memo, useCallback, useEffect, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "../../../shared/components";
import { useLocationApis } from "../../../apis/user/location/user-location.api";
import { useUpdateLocationMutation } from "../../../redux/apis/user/location/user-locations.api";
import { toggleModalUpdate } from "../../../redux/slices/user/location/locationSlice";
import {
  ButtonFields,
  CheckboxFields,
  InputFields,
  RegionDropdown,
} from "../../../shared/FormElement";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const ModalFormUpdateLocation = () => {
  const methods = useForm({ mode: "all" });
  const dispatch = useDispatch();

  const { fetchLocationById } = useLocationApis();
  const locationState = useSelector((state) => state.location);

  const [defaultLocation, setDefaultLocation] = useState(false);

  const [updateLocation, updateLocationResults] = useUpdateLocationMutation();

  const onSubmit = useCallback(
    (data) => {
      updateLocation({ locationId: locationState.locationId, data })
        .unwrap()
        .then(() =>
          toast.success("Updated Location Successfully!", { autoClose: 2000 })
        )
        .catch((error) => toast.error(error.data.message));
      dispatch(toggleModalUpdate());
      methods.reset();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateLocation, locationState.locationId]
  );

  useEffect(() => {
    if (locationState.locationId) {
      const fetchLocation = async () => {
        try {
          const response = await fetchLocationById(locationState.locationId);

          setDefaultLocation(response.defaultLocation);
          methods.reset(response);
        } catch (error) {
          toast.error(error, { autoClose: 2000 });
        }
      };
      fetchLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationState.locationId, defaultLocation]);

  return (
    <>
      <FormProvider {...methods}>
        <Modal
          onSubmit={methods.handleSubmit(onSubmit)}
          onCancel={() => dispatch(toggleModalUpdate())}
          show={locationState.isModalUpdateOpen}
          className="user-location__form-modal"
          header={<h3 className="m-0">Update Address</h3>}
          footer={
            <div className="d-flex justify-content-end">
              <ButtonFields
                type="button"
                onClick={() => dispatch(toggleModalUpdate())}
                borderOnly
              >
                Cancel
              </ButtonFields>
              <ButtonFields
                type="submit"
                isLoading={updateLocationResults.isLoading}
                disabled={!methods.formState.isValid}
                className="ml-5"
                subPrimary
              >
                Update
              </ButtonFields>
            </div>
          }
        >
          <InputFields
            fieldName="address"
            validators={[
              VALIDATOR_REQUIRED("Address cannot be empty"),
              VALIDATOR_MINLENGTH(3, "Address is invalid"),
            ]}
            placeholder="Enter Address"
            type="text"
            label="Address (*)"
            htmlFor="address"
          />

          <RegionDropdown control={methods.control} />

          <CheckboxFields
            fieldName="defaultLocation"
            label="Set as default location"
            defaultChecked={defaultLocation}
          />
        </Modal>
      </FormProvider>
    </>
  );
};

export default memo(ModalFormUpdateLocation);
