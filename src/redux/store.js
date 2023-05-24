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
import { fetchAllReducer } from "./slices/admin/fetchAll/fetchAllSlice";
import { useSellerProductApis } from "./apis/seller/product/seller-product.api";
import { useProductApis } from "./apis/admin/product/product.api";
import { addProductReducer } from "./slices/seller/add-product/addProductSlice";
import { useProductStyleApis } from "./apis/seller/product-style/product-style.api";
import { multipleSelectReducer } from "./slices/FormElement/MultipleSelect/multipleSelectSlice";
import { productCategorizationReducer } from "./slices/seller/product-categorization/productCategorizationSlice";
import { inventoryReducer } from "./slices/seller/inventory/inventorySlice";
import { myAdsReducers } from "./slices/seller/myAds/myAdsSlice";
import { multipleReducer } from "./slices/FormElement/multipleImages/multipleImagesSlice";

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
    multipleImages: multipleReducer,
    myAds: myAdsReducers,
    [authApis.reducerPath]: authApis.reducer,
    [userPasswordApis.reducerPath]: userPasswordApis.reducer,
    [userProfileApis.reducerPath]: userProfileApis.reducer,
    [userLocationsApi.reducerPath]: userLocationsApi.reducer,
    [useSellerRegisterApi.reducerPath]: useSellerRegisterApi.reducer,
    [useSellerProductApis.reducerPath]: useSellerProductApis.reducer,
    [useProductApis.reducerPath]: useProductApis.reducer,
    [useProductStyleApis.reducerPath]: useProductStyleApis.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
      .concat(authApis.middleware)
      .concat(userPasswordApis.middleware)
      .concat(userProfileApis.middleware)
      .concat(userLocationsApi.middleware)
      .concat(useSellerRegisterApi.middleware)
      .concat(useSellerProductApis.middleware)
      .concat(useProductStyleApis.middleware);
  },
});

setupListeners(store.dispatch);

export default store;
