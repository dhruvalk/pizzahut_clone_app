import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderScreen from "./pages/OrderScreen";
import Layout from "./pages/Layout";
import HomeScreen from "./pages/HomeScreen";
import Login from "./pages/LoginScreen";
import Register from "./pages/RegisterScreen";
import ForgetPasswordScreen from "./pages/ForgetPasswordScreen";
import AccountScreen from "./pages/AccountScreen";
import EditAddressScreen from "./pages/EditAddressScreen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CreateAddressScreen from "./pages/CreateAddressScreen";
import TrackScreen from "./pages/TrackScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/getmypassword"
            element={<ForgetPasswordScreen />}
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AccountScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/editAddress/:userId/:addressId"
            element={
              <ProtectedRoute>
                <EditAddressScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path={"/createAddress/:userId"}
            element={
              <ProtectedRoute>
                <CreateAddressScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/track"
            element={
              <ProtectedRoute>
                <TrackScreen />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
