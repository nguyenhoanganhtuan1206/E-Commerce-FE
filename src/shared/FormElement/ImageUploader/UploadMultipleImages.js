import "./UploadImages.scss";

import { memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

import { LoadingSpinner } from "../../components";
import { validateForm } from "../../util/validators";
import { useFetchFilesFirebase } from "../../../firebase/image-product/firebase-service";

const UploadMultipleImages = ({
  fieldName,
  validators = [],
  currentProductId = null,
  className,
  fieldId,
}) => {
  const { control } = useFormContext();

  const [storedImagesMap, setStoredImagesMap] = useState(new Map());
  const [handleFetchFiles] = useFetchFilesFirebase();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!!currentProductId) {
      handleFetchFiles(currentProductId)
        .then((res) => {
          const map = new Map();
          res.imagesProduct.forEach((item) => {
            map.set(item.fileName, item.url);
          });
          setStoredImagesMap(map);
        })
        .catch(() => {})
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        });
    } else {
      setTimeout(() => {
        setStoredImagesMap(new Map());
        setIsLoading(false);
      }, 600);
    }
  }, [currentProductId, handleFetchFiles]);

  return (
    <>
      <Controller
        name={fieldName}
        control={control}
        rules={{
          validate: {
            validate: (value) => {
              if (validators > 0) {
                return validateForm(value.length, validators);
              }
            },
          },
        }}
        render={({
          field: {
            onChange,
            value = Array.from(storedImagesMap.entries()) || [],
          },
          fieldState: { error },
        }) => {
          const onChangePicker = (e) => {
            const input = Array.from(e.target.files);

            const inputSliced = input.slice(0, 5);
            const updatedMap = new Map(storedImagesMap);

            inputSliced.forEach((file) => {
              if (!updatedMap.has(file.name)) {
                updatedMap.set(file.name, file);
              }
            });

            setStoredImagesMap(updatedMap);
            const values = Array.from(updatedMap.values());
            onChange(values);

            console.log("values", values);
          };

          const handleRemoveImage = (file) => {
            const updatedImages = value.filter((f) => f !== file);

            const updatedStoredImagesMap = new Map(storedImagesMap);
            updatedStoredImagesMap.delete(file.name);
            setStoredImagesMap(updatedStoredImagesMap);

            onChange(updatedImages);
          };

          return (
            <div className={`form-upload ${className}`}>
              <div className="row no-gutters">
                <div className="col-5">
                  <div className="upload-images">
                    <p>Drop files anywhere to Upload</p>
                    <label htmlFor={fieldId}>
                      <input
                        type={value.length === 5 ? "hidden" : "file"}
                        id={fieldId}
                        style={{ display: "none" }}
                        onChange={onChangePicker}
                        multiple
                        accept=".jpg,.png,.jpeg,.avif"
                      />
                      <div className="upload-images__icon-box">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          className="upload-images__icon"
                        />
                      </div>
                    </label>

                    {value.length !== 5 && (
                      <>
                        <p>Select File Here</p>
                        <p>At least 5 images for product</p>
                      </>
                    )}

                    <p>
                      {value.length === 5
                        ? "You selected enough"
                        : `You selected ${value.length} images`}
                    </p>

                    {error && <p>{value.length > 5 && error.message}</p>}
                  </div>
                </div>

                <div className="col-7">
                  <div className="display-images">
                    <ul className="display-images__list">
                      {isLoading && <LoadingSpinner noOverlay />}

                      {!isLoading &&
                        value.length > 0 &&
                        value.map((url, index) => {
                          let objectUrl;
                          if (url instanceof File) {
                            objectUrl = URL.createObjectURL(url);
                          } else {
                            objectUrl = url[1];
                          }

                          return (
                            <li key={index} className="display-images__item">
                              <div className="display-images__img-box">
                                <img
                                  src={objectUrl}
                                  className="display-images__img"
                                  alt={url.name ? url.name : url[0]}
                                />
                              </div>

                              <span className="display-images__name">
                                {url.name ? url.name : url[0]}
                              </span>

                              <div className="display-images__close-box">
                                <FontAwesomeIcon
                                  icon={faClose}
                                  className="display-images__close-icon"
                                  onClick={() => handleRemoveImage(url)}
                                />
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default memo(UploadMultipleImages);
