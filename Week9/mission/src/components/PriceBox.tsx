import { useCartStore } from "../store/useCartStore";

const PriceBox = () => {
  const { total, openModal } = useCartStore();

  return (
    <div className="p-12 flex flex-col items-end">
      <div className="text-xl font-bold mb-4">
          총 가격 : {total.toLocaleString()}원
      </div>
      <button 
        onClick={openModal}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-bold"
      >
        삭제
      </button>
    </div>
  )
};
export default PriceBox;