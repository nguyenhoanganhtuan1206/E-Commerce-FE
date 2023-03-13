import { configureStore } from "@reduxjs/toolkit";

import adReducer from "./actions/adSlice";

export default configureStore({
  reducer: {
    ad: adReducer,
  },
});
