import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userPasswordApis } from "./apis/user/password/user-password.api";
import { authApis } from "./apis/auth/authApis";
import { addressReducer } from "./slices/user/address/addressSlice";
import { userProfileApis } from "./apis/user/profile/user-profile.api";
import { userLocationsApi } from "./apis/user/location/user-locations.api";
import { locationReducer } from "./slices/user/location/locationSlice";

const store = configureStore({
  reducer: {
    address: addressReducer,
    location: locationReducer,
    [authApis.reducerPath]: authApis.reducer,
    [userPasswordApis.reducerPath]: userPasswordApis.reducer,
    [userProfileApis.reducerPath]: userProfileApis.reducer,
    [userLocationsApi.reducerPath]: userLocationsApi.reducer,
  },
  middleware: (getDefaultNormalizer) => {
    return getDefaultNormalizer()
      .concat(authApis.middleware)
      .concat(userPasswordApis.middleware)
      .concat(userProfileApis.middleware)
      .concat(userLocationsApi.middleware);
  },
});

setupListeners(store.dispatch);

export default store;
