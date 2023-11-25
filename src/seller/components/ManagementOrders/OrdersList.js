import { Table } from "../../../shared/components";

const OrdersList = () => {
  const headers = [
    "Order ID",
    "Product Name",
    "Category",
    "Categorization",
    "Quantity",
    "Total Price",
    "Payment Method",
    "Payment Status",
    "Actions",
  ];

  return <Table headers={headers} bordered></Table>;
};

export default OrdersList;
