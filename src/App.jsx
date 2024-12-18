// AS Router

import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Register from "./screens/Register";
import Account from "./screens/Account";
import Topup from "./screens/Topup";
import Transaction from "./screens/Transaction";
import Payment from "./screens/Payment";

function App() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={userInfo ? "/dashboard" : "/login"} replace />}
      />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="topup" element={<Topup />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="payment" element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default App;
