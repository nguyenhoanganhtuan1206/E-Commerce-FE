import { memo, useCallback, useEffect, useState } from "react";
import { Modal } from "../../../shared/components";
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
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocationApis } from "../../../apis/user/location/user-location.api";

const ModalFormUserLocation = ({
  locationId,
  showFormModal,
  handleHiddenModal,
}) => {
  const methods = useForm({
    mode: "all",
  });

  const { getLocationById, addLocationForUser, updateLocationForUser } =
    useLocationApis();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        if (!locationId) {
          const response = await addLocationForUser(data);

          toast.success("Added new address successfully!", {
            autoClose: 2000,
          });
        } else {
        }

        handleHiddenModal();
      } catch (err) {
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addLocationForUser]
  );

  useEffect(() => {
    if (locationId) {
      const fetchLocation = async () => {
        try {
          const response = await getLocationById(locationId);

          console.log(response);
        } catch (err) {
          toast.error(err, { autoClose: 2000 });
        }
      };

      fetchLocation();
    }
  }, [getLocationById, locationId]);

  return (
    <FormProvider {...methods}>
      <Modal
        onSubmit={methods.handleSubmit(onSubmit)}
        onCancel={handleHiddenModal}
        className="user-location__form-modal"
        show={showFormModal}
        header={
          <h3 className="m-0">
            {!locationId ? "New Address" : "Update Address"}
          </h3>
        }
        footer={
          <div className="d-flex justify-content-end">
            <ButtonFields type="button" onClick={handleHiddenModal} borderOnly>
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
              {!locationId ? "Add" : "Update"}
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

export default memo(ModalFormUserLocation);
