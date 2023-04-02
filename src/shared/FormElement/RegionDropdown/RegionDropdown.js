import { memo, useCallback, useEffect, useState } from "react";

import { useWatch } from "react-hook-form";
import { toast } from "react-toastify";

import { useAddressApis } from "../../../apis/address/address.api";
import { LoadingSpinner } from "../../components";
import { VALIDATOR_REQUIRED } from "../../util/validators";
import SelectFields from "../SelectFields/SelectFields";

const RegionDropdown = ({ control }) => {
  const { getProvinces, getCommunesByDistrictId, getDistrictsByProvinceId } =
    useAddressApis();

  const [isLoading, setIsLoading] = useState(false);

  const cityValue = useWatch({
    control,
    name: "city",
  });

  const districtValue = useWatch({
    control,
    name: "district",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const fetchProvinces = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getProvinces();
      setProvinces(response);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [getProvinces]);

  const fetchDistrict = useCallback(async () => {
    if (!cityValue) {
      return;
    }

    try {
      const response = await getDistrictsByProvinceId(cityValue);
      setDistricts(response);
    } catch (err) {
      toast.error(err);
    }
  }, [cityValue, getDistrictsByProvinceId]);

  const fetchCommunes = useCallback(async () => {
    if (!districtValue) {
      return;
    }

    try {
      const response = await getCommunesByDistrictId(districtValue);
      setCommunes(response);
    } catch (err) {
      toast.error(err);
    }
  }, [districtValue, getCommunesByDistrictId]);

  useEffect(() => {
    fetchCommunes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtValue]);

  useEffect(() => {
    fetchDistrict();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityValue]);

  useEffect(() => {
    fetchProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner option2 />}

      <div className="region-dropdown">
        <div className="row">
          <div className="col-4">
            <SelectFields
              fieldName="city"
              label="City *"
              validators={[VALIDATOR_REQUIRED("City cannot be empty")]}
            >
              {provinces.length > 0 &&
                provinces.map((province, index) => (
                  <option value={province.idProvince} key={index}>
                    {province.name}
                  </option>
                ))}
              {districts.length === 0 && (
                <option>Please choose your city</option>
              )}
            </SelectFields>
          </div>
          <div className="col-4">
            <SelectFields
              fieldName="district"
              label="District *"
              validators={[VALIDATOR_REQUIRED("District cannot be empty")]}
            >
              {districts.length > 0 &&
                districts.map((district, index) => (
                  <option value={district.idDistrict} key={index}>
                    {district.name}
                  </option>
                ))}
              {districts.length === 0 && (
                <option>Please choose your city</option>
              )}
            </SelectFields>
          </div>
          <div className="col-4">
            <SelectFields
              fieldName="commune"
              label="Commune *"
              validators={[VALIDATOR_REQUIRED("Commune cannot be empty")]}
            >
              {communes.length > 0 &&
                communes.map((commune, index) => (
                  <option value={commune.idWard} key={index}>
                    {commune.name}
                  </option>
                ))}
              {communes.length === 0 && (
                <option>Please choose your district</option>
              )}
            </SelectFields>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(RegionDropdown);
