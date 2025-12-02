import type { CartItem } from '../constants/cartitems';
import { mockCartItems } from '../constants/cartitems';

// State 타입 정의
export interface CartState {
  cartItems: CartItem[];
  amount: number; // 전체 수량
  total: number; // 전체 금액
}

// 초기 상태
export const initialState: CartState = {
  cartItems: mockCartItems,
  amount: 0,
  total: 0,
};

// Action 타입 정의
export const INCREMENT = 'cart/increase';
export const DECREMENT = 'cart/decrease';
export const REMOVE = 'cart/removeItem';
export const CLEAR = 'cart/clearCart';
export const CALCULATE_TOTALS = 'cart/calculateTotals';

// Action Creators 정의
export const increase = (id: string) => ({ type: INCREMENT, payload: id });
export const decrease = (id: string) => ({ type: DECREMENT, payload: id });
export const removeItem = (id: string) => ({ type: REMOVE, payload: id });
export const clearCart = () => ({ type: CLEAR });
export const calculateTotals = () => ({ type: CALCULATE_TOTALS });

export type CartAction = 
    | ReturnType<typeof increase>
    | ReturnType<typeof decrease>
    | ReturnType<typeof removeItem>
    | ReturnType<typeof clearCart>
    | ReturnType<typeof calculateTotals>;

// Reducer 함수 정의
export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CLEAR:
      return { ...state, cartItems: [], amount: 0, total: 0 };
      
    case REMOVE:
      // action.payload는 string (id) 타입임을 보장
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
      
    case INCREMENT: {
      const newCartItems = state.cartItems.map((item) => 
        // action.payload는 string (id) 타입임을 보장
        item.id === action.payload ? { ...item, amount: item.amount + 1 } : item
      );
      return { ...state, cartItems: newCartItems };
    }
      
    case DECREMENT: {
      const newCartItems = state.cartItems.map((item) => 
        // action.payload는 string (id) 타입임을 보장
        item.id === action.payload ? { ...item, amount: item.amount - 1 } : item
      );
      // 감소 결과가 1보다 작아지면 해당 아이템을 제거합니다.
      const filteredItems = newCartItems.filter((item) => item.amount >= 1);
      return { ...state, cartItems: filteredItems };
    }
      
    case CALCULATE_TOTALS: {
      let totalAmount = 0;
      let totalPrice = 0;

      state.cartItems.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.amount * item.price;
      });

      return { ...state, amount: totalAmount, total: totalPrice };
    }
      
    default:
      return state;
  }
};