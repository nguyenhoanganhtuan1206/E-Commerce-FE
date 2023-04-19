import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userPasswordApis } from "./apis/user/password/user-password.api";
import { authApis } from "./apis/auth/authApis";
import { addressReducer } from "./slices/address/addressSlice";

const store = configureStore({
  reducer: {
    address: addressReducer,
    [authApis.reducerPath]: authApis.reducer,
    [userPasswordApis.reducerPath]: userPasswordApis.reducer,
  },
  middleware: (getDefaultNormalizer) => {
    return getDefaultNormalizer()
      .concat(authApis.middleware)
      .concat(userPasswordApis.middleware);
  },
});

setupListeners(store.dispatch);

export default store;
