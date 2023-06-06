import { useEffect } from "react";
import classes from "./HomeProduct.module.scss";
import { useSelector } from "react-redux";

import HomeProductItem from "./HomeProductItem";
import useThunk from "../../../shared/hooks/useThunk";
import { fetchProducts } from "../../../redux/thunks/products/productThunks";
import { LoadingSpinner } from "../../../shared/components";

const HomeProductList = () => {
  const [doFetchProducts, isLoadingFetchProducts] = useThunk(fetchProducts);
  const productsState = useSelector((state) => state.fetchAll);

  useEffect(() => {
    doFetchProducts();
  }, [doFetchProducts]);

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
