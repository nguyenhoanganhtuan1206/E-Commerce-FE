import classes from "./MyAds.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  MY_ADS_ALL_PRODUCT,
  MY_ADS_APPROVAL,
  MY_ADS_IN_STOCK,
  MY_ADS_OUT_OF_STOCK,
  switchAdSection,
} from "../../../redux/slices/seller/myAds/myAdsSlice";

const MyAdsHeader = () => {
  const dispatch = useDispatch();
  const myAdsState = useSelector((state) => state.myAds);

  return (
    <div className={classes.MyAdsHeader}>
      <ul className={classes.MyAdsHeaderList}>
        {[
          { section: MY_ADS_ALL_PRODUCT, label: "All Product" },
          {
            section: MY_ADS_IN_STOCK,
            label: "In stock",
            badge: myAdsState.badgeInStock,
          },
          {
            section: MY_ADS_OUT_OF_STOCK,
            label: "Out of stock",
            badge: myAdsState.badgeOutOfStock,
          },
          {
            section: MY_ADS_APPROVAL,
            label: "Approval",
            badge: myAdsState.badgeApproval,
          },
        ].map(({ section, label, badge }) => (
          <li
            key={section}
            onClick={() => dispatch(switchAdSection(section))}
            className={`${classes.MyAdsHeaderItem} ${
              myAdsState.myAdCurrentSection === section &&
              classes.MyAdsHeaderItem__active
            }`}
          >
            {label}
            <span className={classes.MyAdsHeaderItem__badge}>{badge}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAdsHeader;
