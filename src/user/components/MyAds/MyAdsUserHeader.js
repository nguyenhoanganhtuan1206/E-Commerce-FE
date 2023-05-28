import classes from "./MyAdsUser.module.scss";

const MyAdsUserHeader = () => {
  return (
    <div className={classes.MyAdsHeader}>
      <ul className={classes.MyAdsHeaderList}>
        <li
          className={`${classes.MyAdsHeaderItem} ${classes.MyAdsHeaderItem__active}`}
        >
          All Product
        </li>

        <li className={classes.MyAdsHeaderItem}>
          In stock
          <span className={classes.MyAdsHeaderItem__badge}>1</span>
        </li>

        <li className={classes.MyAdsHeaderItem}>
          Out of stock
          <span className={classes.MyAdsHeaderItem__badge}>1</span>
        </li>

        <li className={classes.MyAdsHeaderItem}>
          Approval
          <span className={classes.MyAdsHeaderItem__badge}>1</span>
        </li>
      </ul>
    </div>
  );
};

export default MyAdsUserHeader;
