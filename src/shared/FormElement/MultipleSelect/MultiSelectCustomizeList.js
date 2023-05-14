import { memo } from "react";

import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomSkeleton from "../../components/Skeleton/Skeleton";

const MultiSelectCustomizeList = ({
  onChange,
  value = [],
  data = [],
  isFetching = false,
  propName,
  onDeleteItem,
}) => {
  const handleDeleteItem = (e, value) => {
    e.stopPropagation();
    onDeleteItem(value);
  };

  let displayContent;

  if (isFetching) {
    displayContent = (
      <CustomSkeleton
        times={3}
        className="mt-2"
        variant="rounded"
        width={"100%"}
        height={20}
      />
    );
  } else {
    displayContent = data.length > 0 && (
      <div className="multiple__select-option">
        <h3 className="multiple__select-option__title">Your Customize</h3>
        {data.map((item, index) => (
          <div
            onClick={() => onChange(item[propName])}
            key={index}
            className={`multiple__select-dropdown__item ${value.indexOf(item[propName]) === -1
              ? ""
              : "active"
              }`}
          >
            <FontAwesomeIcon
              className="multiple__select-dropdown__icon"
              icon={faCheck}
            />

            <div className="w-100 h-100 d-flex align-items-center justify-content-between">
              <span className="multiple__select-dropdown__text">
                {item[propName]}
              </span>

              <FontAwesomeIcon
                onClick={(e) => handleDeleteItem(e, item[propName])}
                className="multiple__select-option__icon"
                icon={faTrash}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <>{displayContent}</>;
};

export default memo(MultiSelectCustomizeList);
