import classes from "./MyAdsUserProductList.module.scss";
import { useFetchProductsBySellerIdQuery } from "../../../redux/apis/seller/product/seller-product.api";
import { Skeleton } from "../../../shared/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const MyAdsUserProductList = () => {
  const fetchProducts = useFetchProductsBySellerIdQuery();

  console.log(fetchProducts.data);

  if (fetchProducts.isFetching) {
    return <Skeleton times={5} style={{ height: "5rem", width: "100%" }} />;
  } else if (fetchProducts.error) {
    return <div>Something went wrong</div>;
  } else {
    return (
      <div className={`${classes.ProductListTable} table-responsive`}>
        <table className={`table`}>
          <thead className={classes.ProductListHeader}>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Categorization</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {fetchProducts.data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>
                    {data.categories.map((category, index) => (
                      <p key={index}>{category}</p>
                    ))}
                  </td>
                  <td>
                    {data.inventories.map((inventory, index) => (
                      <p key={index}>
                        {inventory.colorName}, {inventory.colorValue}
                      </p>
                    ))}
                  </td>
                  <td>
                    {data.inventories.length > 0
                      ? data.inventories.map((inventory, index) => (
                          <p key={index}>${inventory.price.toFixed(2)}</p>
                        ))
                      : `$${data.price.toFixed(2)}`}
                  </td>

                  <td>
                    {data.inventories.length > 0
                      ? data.inventories.map((inventory, index) => (
                          <p key={index}>${inventory.quantity}</p>
                        ))
                      : data.quantity}
                  </td>

                  <td className="d-flex align-items-center">
                    <FontAwesomeIcon
                      className={classes.ProductListIcon}
                      icon={faPenAlt}
                    />

                    <FontAwesomeIcon
                      className={classes.ProductListIcon}
                      icon={faTrashAlt}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default MyAdsUserProductList;
