import { MainPageSeller } from "..";
import { MainComponentSeller } from "../../components";
import OrderMenuTabs from "../../components/ManagementOrders/OrderMenuTabs";
import OrdersList from "../../components/ManagementOrders/OrdersList";

const ManagementOrdersPage = () => {
  return (
    <MainPageSeller>
      <MainComponentSeller>
        <div style={{ padding: "8px" }}>
          <OrderMenuTabs />

          <OrdersList />
        </div>
      </MainComponentSeller>
    </MainPageSeller>
  );
};

export default ManagementOrdersPage;
