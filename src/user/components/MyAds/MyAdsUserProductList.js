import classes from "./MyAdsUserProductList.module.scss";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import { Skeleton } from "../../../shared/components";
import { useFetchProductsBySellerIdQuery } from "../../../redux/apis/seller/product/seller-product.api";
import Pagination from "../../../shared/components/Pagination/Pagination";
import { useCallback, useState } from "react";
import usePaginate from "../../../shared/hooks/usePaginate";

const MyAdsUserProductList = () => {
  const fetchProducts = useFetchProductsBySellerIdQuery();

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [capacityPage, setCapacityPage] = useState(6);
  const { paginate } = usePaginate();
  const storage = paginate(fetchProducts.data, currentPage, capacityPage);

  const handleRedirectEditorForm = (productId) => {
    navigate(`/product/${productId}/edit`);
  };

  const handleRedirectPage = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  if (fetchProducts.isFetching) {
    return <Skeleton times={5} style={{ height: "7rem", width: "100%" }} />;
  } else if (fetchProducts.error) {
    return <div>Something went wrong</div>;
  } else {
    return (
      <>
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
              {storage.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>
                      {data.categories.map((category, index) => (
                        <p key={index}>{category}</p>
                      ))}
                    </td>
                    <td>
                      {Object.entries(data.inventories)
                        .sort((a, b) => a[1].colorValue - b[1].colorValue)
                        .map((inventory, index) => (
                          <p key={index}>
                            {inventory[1].colorValue}, {inventory[1].sizeValue}
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
                        onClick={() => handleRedirectEditorForm(data.id)}
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
          <Pagination
            capacityPage={capacityPage}
            totalData={fetchProducts.data.length}
            currentPage={currentPage}
            onRedirect={handleRedirectPage}
          />
        </div>
      </>
    );
  }
};

export default MyAdsUserProductList;
