import { memo, useCallback, useEffect } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Modal } from "../../../shared/components";
import { toggleModalAdd } from "../../../redux/slices/user/location/locationSlice";
import { useAddLocationsMutation } from "../../../redux/apis/user/location/user-locations.api";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import {
  ButtonFields,
  CheckboxFields,
  InputFields,
  RegionDropdown,
} from "../../../shared/FormElement";

const ModalFormAddLocation = () => {
  const methods = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.location);
  const [addLocation, addLocationResults] = useAddLocationsMutation();

  const onSubmit = useCallback(
    (data) => {
      addLocation(data)
        .unwrap()
        .then(() => {
          toast.success("Added new address successfully!", {
            autoClose: 2000,
          });
        })
        .catch((error) => toast.error(error.data.message))
        .finally(() => dispatch(toggleModalAdd()));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addLocation]
  );

  useEffect(() => {
    methods.reset();
  }, [methods, locationState]);

  return (
    <FormProvider {...methods}>
      <Modal
        onSubmit={methods.handleSubmit(onSubmit)}
        onCancel={() => dispatch(toggleModalAdd())}
        show={locationState.isModalAddOpen}
        className="user-location__form-modal"
        header={<h3 className="m-0">New Address</h3>}
        footer={
          <div className="d-flex justify-content-end">
            <ButtonFields
              type="button"
              onClick={() => dispatch(toggleModalAdd())}
              borderOnly
            >
              Cancel
            </ButtonFields>
            <ButtonFields
              type="button"
              onClick={methods.handleSubmit(onSubmit)}
              isLoading={addLocationResults.isLoading}
              disabled={!methods.formState.isValid}
              className="ml-5"
              subPrimary
            >
              Add
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
          defaultChecked={false}
        />
      </Modal>
    </FormProvider>
  );
};

export default memo(ModalFormAddLocation);
