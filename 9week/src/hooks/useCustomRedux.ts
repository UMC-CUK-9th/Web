import React from 'react';
// store.ts에서 CartContext만 가져옵니다.
import { CartContext } from '../store/store';

// -----------------------------------------------------------------------------
// CartContext를 기반으로 통합된 RootState와 RootAction 타입을 안전하게 추론합니다.
// -----------------------------------------------------------------------------

type CartContextValue = React.ContextType<typeof CartContext>;

// RootState는 context value의 state 속성 타입으로 정의합니다.
type RootState = CartContextValue extends { state: infer S } ? S : any;

// RootAction은 context value의 dispatch 함수 인자 타입으로 정의합니다.
type RootAction = CartContextValue extends { dispatch: React.Dispatch<infer A> } ? A : any;


// Custom Hooks (useSelector, useDispatch 대체)
// RootState를 사용하여 상태의 구조(cart, modal)를 정확히 인식합니다.
export const useSelector = <T,>(selector: (state: RootState) => T): T => {
  const context = React.useContext(CartContext);
  if (!context) {
    // Provider 밖에서 사용 시 오류 처리 (런타임 에러 방지)
    throw new Error('useSelector must be used within a CartProvider');
  }
  // context.state를 selector 함수에 전달합니다.
  return selector(context.state);
};

// RootAction을 사용하여 모든 슬라이스의 액션을 디스패치할 수 있게 합니다.
export const useDispatch = (): React.Dispatch<RootAction> => {
  const context = React.useContext(CartContext);
  if (!context) {
    // Provider 밖에서 사용 시 오류 처리 (런타임 에러 방지)
    throw new Error('useDispatch must be used within a CartProvider');
  }
  // context.dispatch를 반환합니다.
  return context.dispatch;
};