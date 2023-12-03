import { MainComponentSeller, OrderDetails } from "../../components";
import MainPageSeller from "../MainPageSeller/MainPageSeller";

const OrderDetailsPage = () => {
  return (
    <MainPageSeller>
      <MainComponentSeller>
        <OrderDetails />
      </MainComponentSeller>
    </MainPageSeller>
  );
};

export default OrderDetailsPage;
