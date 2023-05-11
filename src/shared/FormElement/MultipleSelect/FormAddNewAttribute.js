import "./MultipleSelectFields.scss";

import { memo, useCallback, useState } from "react";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import ButtonFields from "../ButtonFields/ButtonFields";
import InputFields from "../InputFields/InputFields";

const FormAddNewAttribute = ({ onCreateNewAttribute, fieldName }) => {
  const schema = yup.object({
    [fieldName]: yup.string().required("Cannot be empty"),
  });

  const methods = useForm({ resolver: yupResolver(schema) });

  const [showInput, setShowInput] = useState(false);

  const onSubmit = useCallback(
    (data) => {
      onCreateNewAttribute(data, methods);
    },
    [methods, onCreateNewAttribute]
  );

  return (
    <>
      {!showInput && (
        <div
          onClick={() => setShowInput(!showInput)}
          className="multiple__select--add-more"
        >
          <FontAwesomeIcon style={{ fontSize: "1.8rem" }} icon={faPlus} />
          <span className="multiple__select--add-more__text">
            Add new attribute
          </span>
        </div>
      )}

      {showInput && (
        <FormProvider {...methods}>
          <div className="p-4 d-flex align-items-center">
            <InputFields
              fieldName={fieldName}
              placeholder="Enter your data..."
              classNameForm="multiple__select__form-group"
              className="multiple__select__form-input form-input__input"
            />

            <ButtonFields
              type="submit"
              onClick={methods.handleSubmit(onSubmit)}
              className="multiple__select--add-more__icon"
            >
              <FontAwesomeIcon icon={faCheck} />
            </ButtonFields>

            <FontAwesomeIcon
              onClick={() => setShowInput(!showInput)}
              className="multiple__select--add-more__icon"
              icon={faTrash}
            />
          </div>
        </FormProvider>
      )}
    </>
  );
};

export default memo(FormAddNewAttribute);
