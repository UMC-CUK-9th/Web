import React from 'react';
import { useCartStore } from '../hooks/useCartStore';
import type { CartItem } from '../constants/cartItems';

// 유니코드 아이콘
const FaChevronUp = () => <span style={{fontSize: '12px'}}>▲</span>;
const FaChevronDown = () => <span style={{fontSize: '12px'}}>▼</span>;
const LuTrash2 = () => <span style={{fontSize: '20px'}}>🗑️</span>;

const getImageUrl = (url: string) =>
  url.startsWith('http')
    ? url
    : `https://placehold.co/100x100/A9A9A9/white?text=No+Image`;

const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }) => {

  // ❗ 기존 문제 코드 제거
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore((state) => state.removeItem);

  const formattedPrice = item.price.toLocaleString('ko-KR');
  const formattedSubtotal = (item.price * item.amount).toLocaleString('ko-KR');

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <img
          src={getImageUrl(item.img)}
          alt={item.title}
          className="w-16 h-16 rounded-lg object-cover shadow-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = getImageUrl('');
          }}
        />
        <div className="min-w-0">
          <p className="font-semibold text-lg text-gray-900 truncate">{item.title}</p>
          <p className="text-sm text-gray-500 truncate">{item.singer}</p>
          <p className="text-sm font-medium text-purple-600 mt-1">{formattedPrice}원</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <button
            className="text-purple-500 hover:text-purple-700 transition-colors p-1 rounded-full hover:bg-purple-100"
            onClick={() => increase(item.id)}
          >
            <FaChevronUp />
          </button>

          <span className="text-xl font-bold text-gray-800 w-8 text-center">{item.amount}</span>

          <button
            className="text-purple-500 hover:text-purple-700 transition-colors p-1 rounded-full hover:bg-purple-100"
            onClick={() => decrease(item.id)}
          >
            <FaChevronDown />
          </button>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <p className="text-lg font-bold text-gray-900 w-24 text-right">{formattedSubtotal}원</p>
          <button
            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-md"
            onClick={() => removeItem(item.id)}
          >
            <LuTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
