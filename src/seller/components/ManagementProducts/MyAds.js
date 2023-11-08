import classes from "./MyAds.module.scss";
import MyAdsUserProductList from "./MyAdsProductList";
import MyAdsHeader from "./MyAdsHeader";

const MyAds = () => {
  return (
    <div className={classes.MyAdsProductList}>
      <MyAdsHeader />

      <MyAdsUserProductList />
    </div>
  );
};

export default MyAds;
