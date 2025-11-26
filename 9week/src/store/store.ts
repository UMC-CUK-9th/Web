import React from 'react';
import { useReducer } from 'react';
import { cartReducer, initialState as cartInitialState } from '../slices/cartSlice';
import { modalReducer, initialModalState as modalInitialState } from '../slices/modalSlice';
import type { CartState, CartAction } from '../slices/cartSlice';
import type { ModalState, ModalAction } from '../slices/modalSlice';

// -----------------------------------------------------------------------------
// 통합 State 및 Action 정의
// -----------------------------------------------------------------------------

// 통합된 Root State 타입
export interface RootState {
  cart: CartState;
  modal: ModalState;
}

// 통합된 Root Action 타입
export type RootAction = CartAction | ModalAction;

// 통합 Reducer: Redux의 combineReducers 역할
const rootReducer = (state: RootState, action: RootAction): RootState => {
    return {
        cart: cartReducer(state.cart, action as CartAction),
        modal: modalReducer(state.modal, action as ModalAction),
    };
};

// 통합 초기 상태
const initialRootState: RootState = {
    cart: cartInitialState,
    modal: modalInitialState,
};

// -----------------------------------------------------------------------------
// Context 및 Provider
// -----------------------------------------------------------------------------

// Global State Context: RootState와 dispatch 함수를 제공합니다.
export const CartContext = React.createContext<{
  state: RootState;
  dispatch: React.Dispatch<RootAction>;
} | undefined>(undefined);

// Provider Props 타입
interface CartProviderProps {
    children: React.ReactNode;
}

// Provider Component: RootState를 관리하고 Context를 통해 제공합니다.
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // 통합 Reducer와 통합 초기 상태를 사용하여 useReducer를 호출합니다.
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  // JSX 대신 React.createElement를 사용하여 .ts 파일의 컴파일 오류를 방지합니다.
  return React.createElement(
    CartContext.Provider,
    { value: { state, dispatch } },
    children
  );
};