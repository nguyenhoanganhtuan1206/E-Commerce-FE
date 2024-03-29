import { useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import usePaginate from "../../../shared/hooks/usePaginate";
import ModalProductDetail from "./ModalProductDetail";
import { useFetchProductsQuery } from "../../../redux/apis/admin/product/product.api";
import { Pagination, Skeleton } from "../../../shared/components";
import { toggleShowModalUpdate } from "../../../redux/slices/shared/CommonSlices/commonSlice";
import { ButtonFields } from "../../../shared/FormElement";
import { ErrorPage } from "../../../shared/pages";

const ManagementProduct = () => {
  const listProducts = useFetchProductsQuery();

  const dispatch = useDispatch();
  const modalProductState = useSelector((state) => state.commonSlice);

  const [currentPage, setCurrentPage] = useState(1);
  const [capacityPage, setCapacityPage] = useState(6);
  const { paginate } = usePaginate();
  const storage = paginate(listProducts.data || [], currentPage, capacityPage);

  const handleRedirectPage = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  if (listProducts.isFetching) {
    return (
      <div className="container">
        <Skeleton times={6} style={{ height: "7rem", width: "100%" }} />
      </div>
    );
  } else if (listProducts.isError) {
    return <ErrorPage />;
  } else {
    return (
      <>
        <div className="management-product">
          <div className="data-table">
            <div className={`table-responsive table__customize`}>
              <table className={`table`}>
                <thead>
                  <tr>
                    <th>Owner Name</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Variant Name</th>
                    <th>Category</th>
                    <th>Categorization</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {storage.length > 0 &&
                    storage.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.seller.sellerName}</td>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.variantName}</td>
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
                                  {inventory[1].colorValue},
                                  {inventory[1].sizeValue}
                                </p>
                              ))}
                          </td>
                          <td>
                            {data.inventories.length > 0
                              ? data.inventories.map((inventory, index) => (
                                  <p key={index}>
                                    ${inventory.price.toFixed(2)}
                                  </p>
                                ))
                              : `$${data.price.toFixed(2)}`}
                          </td>

                          <td>
                            {data.inventories.length > 0
                              ? data.inventories.map((inventory, index) => (
                                  <p key={index}>{inventory.quantity}</p>
                                ))
                              : data.quantity}
                          </td>

                          <td style={{ lineHeight: "50px" }}>
                            <span
                              className={`cell__status ${data.productApproval.toLowerCase()}`}
                            >
                              {data.productApproval}
                            </span>
                          </td>

                          <td className="d-flex align-items-center">
                            <ButtonFields
                              primary
                              onClick={() =>
                                dispatch(toggleShowModalUpdate(data.id))
                              }
                            >
                              View Details
                            </ButtonFields>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Pagination
                capacityPage={capacityPage}
                totalData={listProducts.data.length}
                currentPage={currentPage}
                onRedirect={handleRedirectPage}
              />
            </div>
          </div>
        </div>

        {modalProductState.idParams && <ModalProductDetail />}
      </>
    );
  }
};

export default ManagementProduct;
