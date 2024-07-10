import React, { createContext, useReducer, useState } from "react";
import CartReducer from "./cart-reducer";

type CartItemType = {
  productID: string;
  requestedQty: number;
};
export type CartDataType = {
  items: CartItemType[];
  length: number;
};

export const CartContext = createContext({
  cartData: {} as CartDataType,
  addToCart: (id: string, currentQty: number) => {},
  removeFromCart: (productID: string) => {},
  getItemRequestedQty: (productID: string): number => 0,
});

const CartContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
//   const [cartState, setCartState] = useState<CartDataType>({
//     items: [],
//     length: 0,
//   });

const [cartState, cartDispatch] = useReducer(CartReducer,{
    items: [],
    length: 0,
  } as CartDataType)

  const addToCartItems = (id: string, currentQty: number) => {

    cartDispatch({
        type:"ADD",
        id: id,
        payload: {
            currentQty: currentQty
        }
    })

    // if (currentQty <= 0) return;

    // let exist = cartState.items.find((x) => x.productID == id);
    // if (exist) {
    //   if (exist.requestedQty >= currentQty) return;

    //   let index = cartState.items.indexOf(exist);
    //   cartState.items[index].requestedQty += 1;
    // } else {
    //   cartState.items.push({
    //     productID: id,
    //     requestedQty: 1,
    //   });
    // }

    // setCartState({
    //   ...cartState,
    //   length: cartState.items.length,
    // });

  };

  const removeFromCartItems = (productID: string) => {

    cartDispatch({
        type:"REMOVE",
        id: productID
    })

    // let exist = cartState.items.find((x) => x.productID == productID);

    // if (exist) {
    //   let index = cartState.items.indexOf(exist);
    //   if (exist.requestedQty > 1) {
    //     cartState.items[index].requestedQty -= 1;
    //   } else {
    //     cartState.items.splice(index, 1);
    //   }
    // }

    // setCartState({
    //     ...cartState,
    //     length: cartState.items.length,
    //   });
  
  };

  const getItemRequestedQty = (productID: string): number => {
    let exist = cartState.items.find((x) => x.productID == productID);
    if (exist) return exist.requestedQty;
    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartData: cartState,
        addToCart: addToCartItems,
        removeFromCart: removeFromCartItems,
        getItemRequestedQty: getItemRequestedQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
