import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faShoppingCart, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../contexts/cart-context/cart-context";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  return (
    <div className="p-3">
      <div className="flex flex-col">
        <h1 className="text-2xl">فروشگاه من</h1>

        <ul className="flex flex-row gap-4 p-4 m-2 border-2 rounded-xl items-center">
          <li className="bg-gray-200 p-2 rounded-xl hover:bg-gray-300">
            <Link to="/">صفحه اصلی</Link>
          </li>
          <li className="bg-gray-200 p-2 rounded-xl hover:bg-gray-300">
            <Link to="/products">محصولات</Link>
          </li>
          <li className="btn btn-success">
            <Link to="/products/create">ایجاد محصول جدید</Link>
          </li>
          <li className="flex-auto"></li>
          {!authCtx.authData.isAuth && (
            <li onClick={authCtx.login} className="text-green-600 cursor-pointer">
             <FontAwesomeIcon icon={faSignIn} />
            </li>
          )}
          {authCtx.authData.isAuth && (
            <>
              <li>{authCtx.authData.user.name}</li>
              <li onClick={authCtx.logout} className="text-red-600 cursor-pointer">
              <FontAwesomeIcon icon={faSignOut} />
              </li>
            </>
          )}
          <li>|</li>
          <li className="flex items-center gap-2">
            <span>({cartCtx.cartData.length})</span>
            <FontAwesomeIcon icon={faShoppingCart} />
          </li>
        </ul>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default MainLayout;
