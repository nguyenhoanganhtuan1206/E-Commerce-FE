import "./UploadImages.scss";

import { Controller, useFormContext } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

import { validateForm } from "../../util/validators";

const UploadMultipleImages = ({
  fieldName,
  validators = [],
  className,
  initialValue = [],
  fieldId,
}) => {
  const { control } = useFormContext();

  const storedImagesMap = new Map();

  return (
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
        field: { onChange, value = initialValue },
        fieldState: { error },
      }) => {
        const onChangePicker = (e) => {
          const input = Array.from(e.target.files);

          const inputSliced = input.slice(0, 5);
          value = [];

          inputSliced.forEach((url) => {
            if (!storedImagesMap.has(url.name)) {
              storedImagesMap.set(url.name, url);
            }
          });
          const values = Array.from(storedImagesMap.values());
          onChange(values);
        };

        const handleRemoveImage = (file) => {
          const updatedImages = value.filter((f) => f !== file);
          storedImagesMap.delete(file.name);
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
                    {value.length > 0 &&
                      value.map((url, index) => {
                        const objectUrl = URL.createObjectURL(url);

                        return (
                          <li key={index} className="display-images__item">
                            <div className="display-images__img-box">
                              <img
                                src={objectUrl}
                                className="display-images__img"
                                alt={url.name}
                              />
                            </div>

                            <span className="display-images__name">
                              {url.name}
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
  );
};

export default UploadMultipleImages;
