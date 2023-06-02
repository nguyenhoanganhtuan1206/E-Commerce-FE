import classes from "./TagProduct.module.scss";

const TagProduct = ({ name, onClick, className, style, extraInformation }) => {
  return (
    <div
      style={style}
      className={`${classes.TagProduct} ${className}`}
      onClick={onClick}
    >
      <span className={classes.TagProduct__Name}>{name}</span>

      {extraInformation && (
        <div className={classes.TagProduct__ExtraInformation}>
          {extraInformation}
        </div>
      )}
    </div>
  );
};

export default TagProduct;
