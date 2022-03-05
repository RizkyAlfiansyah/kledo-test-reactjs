import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from "./App";
import Navbar from "./view/admin/navbar";
import { Provider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
        <Route path="dashboard" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);