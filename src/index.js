import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import App from "./App";

import MainStyles from "./shared/components/MainStyles/MainStyles";

import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { AuthProvider } from "./context/auth-context";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <MainStyles>
          <App />
        </MainStyles>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
