import { useDispatch, useSelector } from "react-redux";

import { TabsHeader } from "../../../shared/components";
import {
  MY_ORDER_TABS,
  switchTab,
} from "../../../redux/slices/user/myOrders/myOrdersSlices";

const MyOrdersMenuTabs = () => {
  const dispatch = useDispatch();
  const orderTabsState = useSelector((state) => state.myOrders);

  const tabsHeaderList = [
    {
      tab: MY_ORDER_TABS.ALL_ORDER,
      label: "All Orders",
      badge: 0,
    },
    {
      tab: MY_ORDER_TABS.AWAITING_FOR_PAYMENT,
      label: "Waiting For Payment",
      badge: 0,
    },
    {
      tab: MY_ORDER_TABS.AWAITING_FOR_DELIVERY,
      label: "Awaiting For Delivery",
      badge: 0,
    },
  ];

  const onSwitchTab = (tab) => {
    dispatch(switchTab(tab));
  };

  return (
    <TabsHeader
      tabsHeaderList={tabsHeaderList}
      onSwitchTab={onSwitchTab}
      currentTab={orderTabsState.myCurrentTab}
    />
  );
};

export default MyOrdersMenuTabs;
