import { Fragment } from "react";

const OrderDetailsContent = ({ orderInfo = [] }) => {
  return (
    <>
      {orderInfo && (
        <div className="table-responsive">
          <table className="table" style={{ fontSize: "1.4rem" }}>
            <thead className="thead-light">
              <tr>
                <th>Product Name</th>
                <th>Categories</th>
                <th>Inventories</th>
                <th>Quantity / Price</th>
              </tr>
            </thead>

            <tbody>
              {orderInfo.map((orderDetail, index) => {
                return (
                  <tr key={index}>
                    <td style={{ fontWeight: 700 }}>
                      {orderDetail.product.name}
                    </td>
                    <td>
                      {orderDetail.product.categories.map((category, index) => (
                        <p key={index}>{category.categoryName}</p>
                      ))}
                    </td>

                    <td>
                      {orderDetail.product.inventories.length > 0
                        ? orderDetail.product.inventories.map(
                            (inventory, index) => {
                              return (
                                <Fragment key={index}>
                                  <p>
                                    {inventory.colorName},{" "}
                                    {inventory.colorValue}
                                  </p>

                                  <p>
                                    {inventory.sizeName}, {inventory.sizeValue}
                                  </p>
                                </Fragment>
                              );
                            }
                          )
                        : "None"}
                    </td>
                    <td>
                      {orderDetail.cartProductInventory.quantity} / ${" "}
                      {orderDetail.cartProductInventory.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderDetailsContent;
