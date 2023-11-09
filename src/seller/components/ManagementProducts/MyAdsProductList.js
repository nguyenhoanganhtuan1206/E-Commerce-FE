import classes from "./MyAdsProductList.module.scss";

import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import { ModalWarning, Skeleton, Pagination } from "../../../shared/components";
import {
  useDeleteProductMutation,
  useFetchProductWithApprovalQuery,
  useFetchProductWithInStockQuery,
  useFetchProductsBySellerIdQuery,
  useFetchProductsWithOutOfStockQuery,
} from "../../../redux/apis/seller/product/seller-product.api";
import usePaginate from "../../../shared/hooks/usePaginate";
import { toggleShowDeleteProduct } from "../../../redux/slices/seller/sellerSlice";
import { ButtonFields } from "../../../shared/FormElement";
import {
  MY_ADS_ALL_PRODUCT,
  MY_ADS_APPROVAL,
  MY_ADS_IN_STOCK,
  MY_ADS_OUT_OF_STOCK,
  fetchBadgeForApproval,
  fetchBadgeForInStock,
  fetchBadgeForOutOfStock,
} from "../../../redux/slices/seller/myAds/myAdsSlice";

const MyAdsUserProductList = () => {
  const fetchProducts = useFetchProductsBySellerIdQuery();
  const fetchProductOutOfStock = useFetchProductsWithOutOfStockQuery();
  const fetchProductWithApproval = useFetchProductWithApprovalQuery();
  const fetchProductWithInStock = useFetchProductWithInStockQuery();
  const [deleteProduct, deleteProductResults] = useDeleteProductMutation();

  const dispatch = useDispatch();
  const sellerState = useSelector((state) => state.seller);
  const myAdsState = useSelector((state) => state.myAds);
  const [productId, setProductId] = useState(null);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [capacityPage, setCapacityPage] = useState(6);
  const { paginate } = usePaginate();

  let isFetchingData = false;

  const handleFetchDataBySection = () => {
    dispatch(
      fetchBadgeForInStock(
        fetchProductWithInStock.data ? fetchProductWithInStock.data.length : 0
      )
    );
    dispatch(
      fetchBadgeForOutOfStock(
        fetchProductOutOfStock.data ? fetchProductOutOfStock.data.length : 0
      )
    );
    dispatch(
      fetchBadgeForApproval(
        fetchProductWithApproval.data ? fetchProductWithApproval.data.length : 0
      )
    );

    switch (myAdsState.myAdCurrentSection) {
      case MY_ADS_ALL_PRODUCT:
        isFetchingData = fetchProducts.isFetching;
        return fetchProducts.data;

      case MY_ADS_OUT_OF_STOCK:
        isFetchingData = fetchProductOutOfStock.isFetching;
        return fetchProductOutOfStock.data;

      case MY_ADS_APPROVAL:
        isFetchingData = fetchProductWithApproval.isFetching;
        return fetchProductWithApproval.data;

      case MY_ADS_IN_STOCK:
        isFetchingData = fetchProductWithInStock.isFetching;
        return fetchProductWithInStock.data;

      default:
        isFetchingData = fetchProducts.isFetching;
        return fetchProducts.data;
    }
  };

  useEffect(() => {
    handleFetchDataBySection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAdsState.myAdCurrentSection]);

  const storage = paginate(
    handleFetchDataBySection() || [],
    currentPage,
    capacityPage
  );

  const handleRedirectEditorForm = (productId) => {
    navigate(`/product/${productId}/edit`);
  };

  const handleRedirectPage = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleDeleteProduct = () => {
    deleteProduct(productId)
      .unwrap()
      .then(() => {
        toast.success("Deleted your product successfully!", {
          autoClose: 2000,
        });
        dispatch(toggleShowDeleteProduct());
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  if (isFetchingData) {
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
              {storage.length > 0 &&
                storage.map((data, index) => {
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
                              {inventory[1].colorValue},{inventory[1].sizeValue}
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
                              <p key={index}>{inventory.quantity}</p>
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
                          onClick={() => {
                            setProductId(data.id);
                            dispatch(toggleShowDeleteProduct());
                          }}
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

          {/* MODAL DELETE */}
          <ModalWarning
            show={sellerState.isShowDeleteProduct}
            onCancel={() => dispatch(toggleShowDeleteProduct())}
            headerWarning="Delete Your Product"
            footer={
              <div className="d-flex align-items-center justify-content-between">
                <ButtonFields
                  type="button"
                  onClick={() => dispatch(toggleShowDeleteProduct())}
                  borderOnly
                  className="seller-form__btn"
                >
                  Close
                </ButtonFields>
                <ButtonFields
                  onClick={handleDeleteProduct}
                  type="button"
                  isLoading={deleteProductResults.isLoading}
                  subPrimary
                  className="seller-form__btn"
                >
                  Confirm Delete
                </ButtonFields>
              </div>
            }
          >
            Are you sure you want to delete this location?
          </ModalWarning>
          {/* MODAL DELETE */}
        </div>
      </>
    );
  }
};

export default memo(MyAdsUserProductList);
