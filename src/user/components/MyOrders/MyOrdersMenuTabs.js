import { useDispatch, useSelector } from "react-redux";

import { TabsHeader } from "../../../shared/components";
import {
  MY_ORDER_TABS,
  switchTab,
} from "../../../redux/slices/user/myOrders/myOrdersSlices";

const MyOrdersMenuTabs = () => {
  const dispatch = useDispatch();
  const myOrderTabsState = useSelector((state) => state.myOrderSlices);

  const tabsHeaderList = [
    {
      tab: MY_ORDER_TABS.ALL_ORDERS,
      label: "All Orders",
      badge: myOrderTabsState.numbersAllOrders,
    },
    {
      tab: MY_ORDER_TABS.COMPLETED,
      label: "Completed",
      badge: myOrderTabsState.numbersCompleted,
    },
    {
      tab: MY_ORDER_TABS.WAITING_FOR_PAYMENT,
      label: "Waiting For Payment",
      badge: myOrderTabsState.numbersWaitingPayment,
    },
  ];

  const onSwitchTab = (tab) => {
    dispatch(switchTab(tab));
  };

  return (
    <TabsHeader
      tabsHeaderList={tabsHeaderList}
      onSwitchTab={onSwitchTab}
      currentTab={myOrderTabsState.myCurrentTab}
    />
  );
};

export default MyOrdersMenuTabs;
