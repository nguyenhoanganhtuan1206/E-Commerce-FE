import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userPasswordApis } from "./apis/user/password/user-password.api";
import { authApis } from "./apis/auth/authApis";
import { addressReducer } from "./slices/user/address/addressSlice";
import { userProfileApis } from "./apis/user/profile/user-profile.api";
import { userLocationsApi } from "./apis/user/location/user-locations.api";
import { locationReducer } from "./slices/user/location/locationSlice";
import { useSellerRegisterApi } from "./apis/user/seller/seller-register.api";
import { sellerReducer } from "./slices/seller/sellerSlice";
import { fetchAllReducer } from "./slices/fetchAll/fetchAllSlice";
import { useSellerProductApis } from "./apis/seller/product/seller-product.api";
import { useProductApis } from "./apis/admin/product/product.api";
import { addProductReducer } from "./slices/seller/add-product/addProductSlice";
import { useProductStyleApis } from "./apis/seller/product-style/product-style.api";
import { multipleSelectReducer } from "./slices/FormElement/MultipleSelect/multipleSelectSlice";
import { productCategorizationReducer } from "./slices/seller/product-categorization/productCategorizationSlice";
import { inventoryReducer } from "./slices/seller/inventory/inventorySlice";
import { myAdsReducers } from "./slices/seller/myAds/myAdsSlice";
import { commonSliceReducer } from "./slices/shared/CommonSlices/commonSlice";
import { inventoryDetailReducer } from "./slices/inventory/inventoryDetailSlice";
import { useCartApis } from "./apis/cart/cart.api";
import { cartReducers } from "./slices/cart/cartSlice";
import { commonProductReducer } from "./slices/product/commonProductSlice";
import { usePaymentOrder } from "./apis/user/paymentOrder/paymentOrder.api";
import { managementOrdersReducers } from "./slices/seller/management-orders/managementOrdersSlides";
import { useCartProductInventoryApis } from "./apis/cart_product_inventory/cart_product_inventory.api";
import { myOrderReducers } from "./slices/user/myOrders/myOrdersSlices";
import { useMyOrdersApi } from "./apis/user/orders/my-orders.api";
import { useOrderApis } from "./apis/seller/orders/orders.api";

enableMapSet();

const store = configureStore({
  reducer: {
    fetchAll: fetchAllReducer,
    address: addressReducer,
    location: locationReducer,
    seller: sellerReducer,
    addProduct: addProductReducer,
    multipleSelect: multipleSelectReducer,
    productCategorization: productCategorizationReducer,
    inventory: inventoryReducer,
    myAds: myAdsReducers,
    commonSlice: commonSliceReducer,
    inventoryDetail: inventoryDetailReducer,
    cartSlice: cartReducers,
    commonProduct: commonProductReducer,
    managementOrders: managementOrdersReducers,
    myOrderSlices: myOrderReducers,
    [authApis.reducerPath]: authApis.reducer,
    [userPasswordApis.reducerPath]: userPasswordApis.reducer,
    [userProfileApis.reducerPath]: userProfileApis.reducer,
    [userLocationsApi.reducerPath]: userLocationsApi.reducer,
    [useSellerRegisterApi.reducerPath]: useSellerRegisterApi.reducer,
    [useSellerProductApis.reducerPath]: useSellerProductApis.reducer,
    [useProductApis.reducerPath]: useProductApis.reducer,
    [useProductStyleApis.reducerPath]: useProductStyleApis.reducer,
    [useProductApis.reducerPath]: useProductApis.reducer,
    [usePaymentOrder.reducerPath]: usePaymentOrder.reducer,
    [useCartApis.reducerPath]: useCartApis.reducer,
    [useMyOrdersApi.reducerPath]: useMyOrdersApi.reducer,
    [useOrderApis.reducerPath]: useOrderApis.reducer,
    [useCartProductInventoryApis.reducerPath]:
      useCartProductInventoryApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(authApis.middleware)
      .concat(userPasswordApis.middleware)
      .concat(userProfileApis.middleware)
      .concat(userLocationsApi.middleware)
      .concat(useSellerRegisterApi.middleware)
      .concat(useSellerProductApis.middleware)
      .concat(useProductStyleApis.middleware)
      .concat(useProductApis.middleware)
      .concat(usePaymentOrder.middleware)
      .concat(useCartProductInventoryApis.middleware)
      .concat(useMyOrdersApi.middleware)
      .concat(useOrderApis.middleware)
      .concat(useCartApis.middleware);
  },
});

setupListeners(store.dispatch);

export default store;
