<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
=======
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApis } from "./apis/auth/authApis";
import { userPasswordApis } from "./apis/user/password/user-password.api";
>>>>>>> 417ae18 (Refresh to use RTK Query for "Password User")

import adReducer from "./actions/adSlice";

export default configureStore({
  reducer: {
<<<<<<< HEAD
    ad: adReducer,
=======
    [authApis.reducerPath]: authApis.reducer,
    [userPasswordApis.reducerPath]: userPasswordApis.reducer,
  },
  middleware: (getDefaultNormalizer) => {
    return getDefaultNormalizer()
      .concat(authApis.middleware)
      .concat(userPasswordApis.middleware);
>>>>>>> 417ae18 (Refresh to use RTK Query for "Password User")
  },
});
