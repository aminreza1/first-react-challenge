import { CartDataType } from "./cart-context";

type CartReducerActionType = {
  type: string;
  id: string,
  payload?: any;
};

const CartReducer = (state: CartDataType, action: CartReducerActionType) => {
  let exist = state.items.find((x) => x.productID == action.id);

  switch (action.type) {
    case "ADD":
      if (action.payload.currentQty <= 0) return state;

      if (exist) {
        if (exist.requestedQty >= action.payload.currentQty) return state;

        let index = state.items.indexOf(exist);
        state.items[index].requestedQty += 1;
      } else {
        state.items.push({
          productID: action.id,
          requestedQty: 1,
        });
      }

      return {
        ...state,
        length: state.items.length,
      };

    case "REMOVE":

      if (exist) {
        let index = state.items.indexOf(exist);
        if (exist.requestedQty > 1) {
          state.items[index].requestedQty -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }

      return {
        ...state,
        length: state.items.length,
      };

    default:
      throw new Error();
  }
};

export default CartReducer;
