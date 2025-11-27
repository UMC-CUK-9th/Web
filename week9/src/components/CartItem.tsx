//src/components/CartItem.tsx
import { useCartActions } from "../hooks/useCartStore";
import type { Lp } from "../types/cart";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncrease = () => increase(lp.id);
  const handleDecrease = () => {
    if (lp.amount === 1) removeItem(lp.id);
    decrease(lp.id);
  };

  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-200 max-w-4xl mx-auto">
      {/* 이미지 */}
      <div className="flex items-center gap-4">
        <img
          src={lp.img}
          alt={lp.title}
          className="w-16 h-16 rounded-md object-cover shadow-sm border border-gray-200"
        />

        <div>
          <p className="text-lg font-semibold">{lp.title}</p>
          <p className="text-sm text-gray-500">{lp.singer}</p>
          <p className="text-sm text-gray-700 mt-1">{lp.price.toLocaleString()}원</p>
        </div>
      </div>

      {/* 수량 버튼 */}
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg shadow-inner">
        <button
          onClick={handleDecrease}
          className="px-2 py-1 text-lg font-bold hover:bg-gray-300 rounded-md"
        >
          -
        </button>
        <span className="w-6 text-center">{lp.amount}</span>
        <button
          onClick={handleIncrease}
          className="px-2 py-1 text-lg font-bold hover:bg-gray-300 rounded-md"
        >
          +
        </button>
      </div>
    </li>
  );
};


export default CartItem;