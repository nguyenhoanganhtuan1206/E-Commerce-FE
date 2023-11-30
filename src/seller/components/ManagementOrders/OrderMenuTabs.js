import { useDispatch, useSelector } from "react-redux";
import { TabsHeader } from "../../../shared/components";
import {
  MANAGEMENT_ORDER,
  switchTab,
} from "../../../redux/slices/seller/management-orders/managementOrdersSlides";

const OrderMenuTabs = () => {
  const dispatch = useDispatch();
  const orderTabsState = useSelector((state) => state.managementOrders);

  const tabsHeaderList = [
    {
      tab: MANAGEMENT_ORDER.ALL_ORDER,
      label: "All Orders",
      badge: 0,
    },
    {
      tab: MANAGEMENT_ORDER.PAID,
      label: "Paid",
      badge: 0,
    },
    {
      tab: MANAGEMENT_ORDER.NOT_YET_PAID,
      label: "Not Yet Paid",
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

export default OrderMenuTabs;
