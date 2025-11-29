import Modal from "../components/Modal";
import { usePlaylistStore } from "../stores/playlistStore";

const CartPage = () => {
  const cartItems = usePlaylistStore((state) => state.cartItems);
  const total = usePlaylistStore((state) => state.total);
  const amount = usePlaylistStore((state) => state.amount);
  const isModalOpen = usePlaylistStore((state) => state.isModalOpen);
  
  const increase = usePlaylistStore((state) => state.increase);
  const decrease = usePlaylistStore((state) => state.decrease);
  const openModal = usePlaylistStore((state) => state.openModal);

  return (
    <div className="w-full px-20 py-10">

      {/* 모달 */}
      {isModalOpen && <Modal />}

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
                <p className="font-bold mt-1">
                  ₩{Number(item.price).toLocaleString()}
                </p>
              </div>
            </div>

            {/* 수량 버튼 */}
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded hover:bg-gray-100"
                onClick={() => decrease(item.id)}
              >
                -
              </button>
              <span className="font-semibold w-6 text-center">{item.amount}</span>
              <button
                className="px-3 py-1 border rounded hover:bg-gray-100"
                onClick={() => increase(item.id)}
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
          onClick={openModal}
          className="px-6 py-3 border border-black rounded-lg font-semibold hover:bg-red-600 hover:border-none hover:text-white transition"
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
};

export default CartPage;
