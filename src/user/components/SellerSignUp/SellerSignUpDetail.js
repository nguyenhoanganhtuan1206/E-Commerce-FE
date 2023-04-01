import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useApiClient from "../../../shared/hooks/useAxios";
import { ButtonFields, InputFields } from "../../../shared/FormElement";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRED,
} from "../../../shared/util/validators";
import RegionDropdown from "../../../shared/FormElement/RegionDropdown/RegionDropdown";

const SellerSignUpDetail = (props) => {
  const methods = useForm({ mode: "all" });

  const { apiClient, error, isLoading } = useApiClient();

  const onSubmit = (data) => {
    console.log(data);
  };

  // const onSubmit = useCallback(
  //   async (data) => {
  //     try {
  //       const response = await apiClient.post("/seller", data);
  //     } catch (err) {
  //       toast.error(err?.response?.data?.message || error);
  //     }
  //   },
  //   [apiClient, error]
  // );

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputFields
            fieldName="sellerName"
            validators={[
              VALIDATOR_REQUIRED("Seller Name cannot be empty"),
              VALIDATOR_MINLENGTH(
                6,
                "Seller name must be at between 6 to 50 characters"
              ),
              VALIDATOR_MAXLENGTH(
                50,
                "Seller name must be at between 6 to 50 characters"
              ),
            ]}
            placeholder="Enter Seller Name"
            type="text"
            label="Seller Name (*)"
            htmlFor="sellerName"
          />

          <div className="row mt-5">
            <div className="col-4">
              <InputFields
                fieldName="phoneNumber"
                validators={[
                  VALIDATOR_REQUIRED("Phone Number cannot be empty"),
                  VALIDATOR_MINLENGTH(9, "Phone Number is invalid"),
                  VALIDATOR_MAXLENGTH(11, "Phone Number is invalid"),
                ]}
                placeholder="Enter Phone Number"
                type="text"
                label="Phone Number (*)"
                htmlFor="phoneNumber"
              />
            </div>

            <div className="col-8">
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
            </div>
          </div>

          <div className="mt-5">
            <RegionDropdown control={methods.control} />
          </div>

          <ButtonFields
            disabled={!methods.formState.isValid}
            primary
            className="mt-4"
            isLoading={isLoading}
          >
            Registration
          </ButtonFields>
        </form>
      </FormProvider>
    </>
  );
};

export default memo(SellerSignUpDetail);
