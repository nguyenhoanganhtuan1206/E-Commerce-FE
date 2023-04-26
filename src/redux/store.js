import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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

const store = configureStore({
  reducer: {
    fetchAll: fetchAllReducer,
    address: addressReducer,
    location: locationReducer,
    seller: sellerReducer,
    [authApis.reducerPath]: authApis.reducer,
    [userPasswordApis.reducerPath]: userPasswordApis.reducer,
    [userProfileApis.reducerPath]: userProfileApis.reducer,
    [userLocationsApi.reducerPath]: userLocationsApi.reducer,
    [useSellerRegisterApi.reducerPath]: useSellerRegisterApi.reducer,
  },
  middleware: (getDefaultNormalizer) => {
    return getDefaultNormalizer()
      .concat(authApis.middleware)
      .concat(userPasswordApis.middleware)
      .concat(userProfileApis.middleware)
      .concat(userLocationsApi.middleware)
      .concat(useSellerRegisterApi.middleware);
  },
});

setupListeners(store.dispatch);

export default store;
