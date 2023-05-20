import classes from "./MyAdsUser.module.scss";
import MyAdsUserHeader from "./MyAdsUserHeader";
import MyAdsUserProductList from "./MyAdsUserProductList";

const MyAdsUser = (props) => {
  return (
    <div className={classes.MyAdsProductList}>
      <MyAdsUserHeader />

      <MyAdsUserProductList />
    </div>
  );
};

export default MyAdsUser;
