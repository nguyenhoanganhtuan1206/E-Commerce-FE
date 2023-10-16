import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import HomeProductItem from "./HomeProductItem";
import useThunk from "../../../shared/hooks/useThunk";
import {
  fetchProducts,
  fetchProductsWithDifferentSeller,
} from "../../../redux/thunks/products/productThunks";
import { LoadingSpinner } from "../../../shared/components";
import { AuthContext } from "../../../context/auth-context";

const HomeProductList = () => {
  const authContext = useContext(AuthContext);
  const [doFetchProducts] = useThunk(fetchProducts);
  const [doFetchProductsWithDifferentSeller] = useThunk(
    fetchProductsWithDifferentSeller
  );
  const productsState = useSelector((state) => state.fetchAll);

  useEffect(() => {
    if (
      authContext.isLoggedIn &&
      authContext.roles.length > 0 &&
      !authContext.roles.includes("ROLE_ADMIN")
    ) {
      doFetchProductsWithDifferentSeller();
      return;
    }

    doFetchProducts();
  }, [authContext, doFetchProducts, doFetchProductsWithDifferentSeller]);

  return (
    <>
      {productsState.products.isLoading && <LoadingSpinner option1 />}

      {!productsState.products.isLoading &&
        productsState.products.data.map((product) => (
          <div key={product.id} className="col-4">
            <HomeProductItem
              productId={product.id}
              productName={product.name}
              price={
                product.inventories.length > 0
                  ? product.inventories[0].price
                  : product.price
              }
              amountSoldOut={
                product.amountSoldOut === null ? 0 : product.amountSoldOut
              }
              sellerName={product.seller.sellerName}
              categories={product.categories}
              brandName={product.brandName}
              sellerRating={product.seller.sellerRating}
              productStyles={product.productStyles}
              location={`${product.seller.commune}, ${product.seller.district}, ${product.seller.province}`}
            />
          </div>
        ))}
    </>
  );
};

export default HomeProductList;
