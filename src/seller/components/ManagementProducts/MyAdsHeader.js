import classes from "./MyAds.module.scss";

import { useDispatch, useSelector } from "react-redux";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  MY_ADS_ALL_PRODUCT,
  MY_ADS_APPROVAL,
  MY_ADS_IN_STOCK,
  MY_ADS_OUT_OF_STOCK,
  switchAdSection,
} from "../../../redux/slices/seller/myAds/myAdsSlice";
import { ButtonFields } from "../../../shared/FormElement";
import { TabsHeader } from "../../../shared/components";

const MyAdsHeader = () => {
  const dispatch = useDispatch();
  const myAdsState = useSelector((state) => state.myAds);

  const tabsHeaderList = [
    { tab: MY_ADS_ALL_PRODUCT, label: "All Product" },
    {
      tab: MY_ADS_IN_STOCK,
      label: "In stock",
      badge: myAdsState.badgeInStock,
    },
    {
      tab: MY_ADS_OUT_OF_STOCK,
      label: "Out of stock",
      badge: myAdsState.badgeOutOfStock,
    },
    {
      tab: MY_ADS_APPROVAL,
      label: "Approval",
      badge: myAdsState.badgeApproval,
    },
  ];

  const onSwitchTab = (tab) => {
    dispatch(switchAdSection(tab));
  };

  return (
    <TabsHeader
      tabsHeaderList={tabsHeaderList}
      onSwitchTab={onSwitchTab}
      currentTab={myAdsState.myAdCurrentSection}
    >
      <ButtonFields to="/seller/new-ads" primary>
        Post Ad
        <AddCircleOutlineIcon className={classes.MyAdsHeaderIcon} />
      </ButtonFields>
    </TabsHeader>
  );
};

export default MyAdsHeader;
