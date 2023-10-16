import ReactDOM from "react-dom/client";
import App from "./App";

import MainStyles from "./shared/components/MainStyles/MainStyles";

import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/auth-context";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <MainStyles>
          <App />
        </MainStyles>
      </Provider>
    </AuthProvider>
  </StrictMode>
);
