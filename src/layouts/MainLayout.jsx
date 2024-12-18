import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useSelector } from "react-redux";

function MainLayout() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? (
    <div>
      <Header />
      <div className="px-4 pt-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default MainLayout;
