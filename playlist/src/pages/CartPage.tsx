import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { increase, decrease, clearCart, calculateTotals } from "../store/cartSlice";
import { useEffect } from "react";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="w-full px-20 py-10">

      <div className="space-y-6">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* 이미지 */}
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.singer}</p>
                <p className="font-bold mt-1">₩{Number(item.price).toLocaleString()}</p>
              </div>
            </div>

            {/* 수량 버튼 */}
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => dispatch(decrease(item.id))}
              >
                -
              </button>
              <span className="font-semibold">{item.amount}</span>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => dispatch(increase(item.id))}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 총합 + 전체삭제 */}
      <div className="mt-10 text-center">
        <p className="text-xl font-semibold mb-2">총 수량: {amount}개</p>
        <p className="text-2xl font-bold mb-6">
          총 금액: ₩{total.toLocaleString()}
        </p>

        <button
          onClick={() => dispatch(clearCart())}
          className="px-6 py-3 rounded-lg border border-black border-radius-10 font-semibold hover:bg-red-600 hover:text-white hover:border-none transition"
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
};

export default CartPage;
