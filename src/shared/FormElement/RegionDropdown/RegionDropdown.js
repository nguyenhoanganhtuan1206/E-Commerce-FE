import { memo, useCallback, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components";
import useApiClient from "../../hooks/useAxios";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRED } from "../../util/validators";
import SelectFields from "../SelectFields/SelectFields";

const RegionDropdown = ({ control }) => {
  const { apiClient, error, isLoading } = useApiClient();

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
    try {
      const response = await apiClient.get(
        "https://vapi.vnappmob.com/api/province/"
      );

      setProvinces(response.data.results);
    } catch (err) {
      toast.error(err?.response?.data?.message || error);
    }
  }, [apiClient, error]);

  const fetchDistrict = useCallback(async () => {
    try {
      const response = await apiClient.get(
        `https://vapi.vnappmob.com/api/province/district/${
          cityValue || provinces[0].id
        }`
      );

      setDistricts(response.data.results);
    } catch (err) {
      toast.error(err?.response?.data?.message || error);
    }
  }, [apiClient, cityValue, error, provinces]);

  const fetchCommunes = useCallback(async () => {
    try {
      const response = await apiClient.get(
        `https://vapi.vnappmob.com/api/province/ward/${districtValue}`
      );

      setCommunes(response.data.results);
    } catch (err) {
      toast.error(err?.response?.data?.message || error);
    }
  }, [apiClient, districtValue, error]);

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
                  <option value={province.province_id} key={index}>
                    {province.province_name}
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
                  <option value={district.district_id} key={index}>
                    {district.district_name}
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
                  <option value={commune.ward_id} key={index}>
                    {commune.ward_name}
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
