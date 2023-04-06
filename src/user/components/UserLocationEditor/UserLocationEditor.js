import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";

import "./UserLocationEditor.scss";

import { FormProvider, useForm } from "react-hook-form";

import { Modal } from "../../../shared/components";
import { useLocationApis } from "../../../apis/user/location/user-location.api";
import {
  ButtonFields,
  InputFields,
  RegionDropdown,
  CheckboxFields,
} from "../../../shared/FormElement";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";

const UserLocations = () => {
  const methods = useForm({
    mode: "all",
  });

  const { addLocationForUser } = useLocationApis();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      console.log(data);
      setIsLoading(true);
      try {
        const response = await addLocationForUser(data);

        toast.success("Added new address successfully!", {
          autoClose: 2000,
        });
        setShowAddressForm(false);
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [addLocationForUser]
  );

  const handleTriggerAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  return (
    <>
      <div className="user-location" onClick={handleTriggerAddressForm}>
        <div className="user-location__group">
          <FontAwesomeIcon className="user-location__icon" icon={faPlus} />

          <p className="user-location__text">Add new address</p>
        </div>
      </div>

      <FormProvider {...methods}>
        <Modal
          onSubmit={methods.handleSubmit(onSubmit)}
          onCancel={handleTriggerAddressForm}
          className="user-location__form-modal"
          show={showAddressForm}
          header={<h3 className="m-0">New Address</h3>}
          footer={
            <div className="d-flex justify-content-end">
              <ButtonFields
                type="button"
                onClick={handleTriggerAddressForm}
                borderOnly
              >
                Cancel
              </ButtonFields>
              <ButtonFields
                type="button"
                onClick={methods.handleSubmit(onSubmit)}
                isLoading={isLoading}
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
    </>
  );
};

export default memo(UserLocations);
