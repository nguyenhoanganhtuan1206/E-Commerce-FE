import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import MainStyles from "./shared/components/MainStyles/MainStyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <MainStyles>
          <App />
        </MainStyles>
    </Provider>
  </React.StrictMode>
);
