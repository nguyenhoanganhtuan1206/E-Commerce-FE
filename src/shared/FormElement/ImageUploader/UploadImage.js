import { memo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import AvatarUser from "../../components/AvatarUser/AvatarUser";

import "./UploadImage.scss";

const UploadImage = ({ fieldName, srcDefault = "" }) => {
  const { control } = useFormContext();

  const inputRef = useRef();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, value = srcDefault } }) => {
        const handlePickedFile = (event) => {
          let pickedFile;

          if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];

            const fileReader = new FileReader();

            fileReader.onload = () => {
              onChange(fileReader.result);
            };

            fileReader.readAsDataURL(pickedFile);
          }
        };

        const handlePickImage = () => {
          inputRef.current.click();
        };

        return (
          <div className="upload-image">
            <div onClick={handlePickImage} className="upload-image__box">
              <AvatarUser
                src={value}
                circle
                className="upload-image__box-image"
              />

              <FontAwesomeIcon
                icon={faCamera}
                className="upload-image__box-icon"
              />
            </div>

            {/* INPUT UPLOAD IMAGE */}
            <input
              type="file"
              style={{ display: "none" }}
              accept=".jpg,.png,.jpeg"
              ref={inputRef}
              onChange={handlePickedFile}
            />
            {/* INPUT UPLOAD IMAGE */}
          </div>
        );
      }}
    />
  );
};

export default memo(UploadImage);
