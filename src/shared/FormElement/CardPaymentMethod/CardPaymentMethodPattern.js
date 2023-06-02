import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardPaymentMethodPattern = ({
  fieldName,
  title,
  subTitle,
  imgSrc,
  active = true,
  className,
}) => {
  return (
    <>
      <label
        className={`card__payment-method ${
          active && "card__payment-method--active"
        } ${className}`}
        htmlFor={fieldName}
      >
        <input
          type="checkbox"
          id={fieldName}
          name={fieldName}
          defaultChecked={active}
          style={{ display: "none" }}
        />

        {imgSrc && (
          <img className="card__payment-method__img" src={imgSrc} alt="Icon" />
        )}

        {icon && (
          <FontAwesomeIcon icon={icon} className="card__payment-method__icon" />
        )}

        <div className="card__payment-method__info">
          <h4>{title}</h4>
          <span>{subTitle}</span>
        </div>
      </label>
    </>
  );
};

export default CardPaymentMethodPattern;
