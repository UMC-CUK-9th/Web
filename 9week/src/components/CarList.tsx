import React, { useEffect } from 'react';
import { useCartStore } from '../hooks/useCartStore';
import CartItemComponent from './CartItem';
import PriceBox from './PriceBox';

const CartList: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const amount = useCartStore((state) => state.amount);
  const calculateTotals = useCartStore((state) => state.calculateTotals);

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">장바구니</h1>
          <p className="text-xl text-gray-500">장바구니가 비어있습니다.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
          음원 장바구니 ({amount}개)
        </h1>

        <div className="divide-y divide-gray-100">
          {cartItems.map((item) => (
            <CartItemComponent key={item.id} item={item} />
          ))}
        </div>

        <PriceBox />
      </div>
    </main>
  );
};

export default CartList;
