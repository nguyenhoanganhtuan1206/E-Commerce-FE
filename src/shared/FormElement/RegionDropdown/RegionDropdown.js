import { memo, useEffect, useState } from "react";

import { useWatch } from "react-hook-form";

import SelectFields from "../SelectFields/SelectFields";
import { VALIDATOR_REQUIRED } from "../../util/validators";
import useThunk from "../../hooks/useThunk";
import {
  fetchCommunesByDistrictName,
  fetchDistrictsByProvinceName,
  fetchProvinces,
} from "../../../redux/thunks/addressThunks";
import { useSelector } from "react-redux";

const RegionDropdown = ({ control }) => {
  const addressState = useSelector((state) => state.address);

  const [doFetchProvinces] = useThunk(fetchProvinces);
  const [doFetchDistricts] = useThunk(fetchDistrictsByProvinceName);
  const [doFetchCommunes] = useThunk(fetchCommunesByDistrictName);

  const provinceValue = useWatch({
    control,
    name: "province",
  });

  const districtValue = useWatch({
    control,
    name: "district",
  });

  useEffect(() => {
    if (districtValue) {
      doFetchCommunes(districtValue);
    }
  }, [districtValue, doFetchCommunes]);

  useEffect(() => {
    if (provinceValue) {
      doFetchDistricts(provinceValue);
    }
  }, [provinceValue, doFetchDistricts]);

  useEffect(() => {
    doFetchProvinces();
  }, [doFetchProvinces]);

  return (
    <>
      <div className="region-dropdown">
        <div className="row">
          {addressState.provinces.length > 0 && (
            <div className="col-4">
              <SelectFields
                fieldName="province"
                label="Province *"
                validators={[VALIDATOR_REQUIRED("Province cannot be empty")]}
              >
                <option value="" disabled selected>
                  Please choose your province
                </option>

                {addressState.provinces.map((province, index) => {
                  return (
                    <option value={province.name} key={index}>
                      {province.name}
                    </option>
                  );
                })}
              </SelectFields>
            </div>
          )}
          <div className="col-4">
            <SelectFields
              fieldName="district"
              label="District *"
              validators={[VALIDATOR_REQUIRED("District cannot be empty")]}
            >
              <option value="" disabled selected>
                Please choose your district
              </option>

              {addressState.districts.map((district, index) => {
                return (
                  <option value={district.name} key={index}>
                    {district.name}
                  </option>
                );
              })}
            </SelectFields>
          </div>
          <div className="col-4">
            <SelectFields
              fieldName="commune"
              label="Commune *"
              validators={[VALIDATOR_REQUIRED("Commune cannot be empty")]}
            >
              <option value="" disabled selected>
                Please choose your commune
              </option>

              {addressState.communes.map((commune, index) => {
                return (
                  <option value={commune.name} key={index}>
                    {commune.name}
                  </option>
                );
              })}
            </SelectFields>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(RegionDropdown);
