import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faShoppingCart,
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../contexts/cart-context/cart-context";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  return (
    <div className="">
      <div className="navbar bg-base-300 border-b border-b-gray-400 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">فـروشگاه مـن</a>

          <Link to="/" className="btn btn-ghost text-sm">
            صفحه اصلی
          </Link>
          <Link to="/products" className="btn btn-ghost text-sm">
            محصـولات
          </Link>
          {authCtx.authData.isAuth && (
            <Link
              to="/products/create"
              className="btn btn-ghost text-sm text-green-600"
            >
              ایجاد محصول
            </Link>
          )}

          {/* <a className="btn btn-ghost text-sm">صفحه اصلی</a>
          <a className="btn btn-ghost text-sm">محصولات</a> */}
        </div>
        <div className="flex-none">
          <div role="button" className="btn btn-ghost ps-6 pe-3">
            <div className="indicator">
              <FontAwesomeIcon icon={faShoppingCart} className="h-5 w-5" />
              <span className="badge badge-sm indicator-item p-2 text-sm">
                {cartCtx.cartData.length}
              </span>
            </div>
          </div>

          {!authCtx.authData.isAuth ? (
            <div
              role="button"
              onClick={() => authCtx.login("12315646", 1, "امین رضا")}
              className="btn btn-ghost cursor-pointer"
            >
              <FontAwesomeIcon icon={faSignIn} className="w-4 h-4" />
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <span className="justify-between text-blue-600">
                    {authCtx.authData.user.name} خوش آمدید
                  </span>
                </li>
                <li>
                  <a>حساب کاربری</a>
                </li>
                <li onClick={authCtx.logout}>
                  <span>خروج از سیستم</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">{children}</div>
    </div>
  );
};

export default MainLayout;
