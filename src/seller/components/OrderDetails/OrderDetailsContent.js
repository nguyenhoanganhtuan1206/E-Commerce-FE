import { Fragment } from "react";

const OrderDetailsContent = ({ orderInfo = [] }) => {
  const filterInventory = (inventories = [], inventoryId = null) => {
    return inventories.filter((item) => item.id === inventoryId);
  };

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
                      <p>
                        {filterInventory(
                          orderDetail.product.inventories,
                          orderDetail.cartProductInventory.inventoryId
                        ).map((item) => (
                          <Fragment key={item.id}>
                            {item.colorName}, {item.colorValue}
                          </Fragment>
                        ))}
                      </p>

                      <p>
                        {filterInventory(
                          orderDetail.product.inventories,
                          orderDetail.cartProductInventory.inventoryId
                        ).map((item) => (
                          <Fragment key={item.id}>
                            {item.sizeName}, {item.sizeValue}
                          </Fragment>
                        ))}
                      </p>
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
