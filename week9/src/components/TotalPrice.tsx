//src/components/TotalPrice.tsx
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";
import Modal from "./Modal";

const TotalPrice = () => {
  const { total } = useCartInfo();
  const { isOpen } = useModalInfo();
  const { clearCart } = useCartActions();
  const { openModal, closeModal } = useModalActions();

  const handleCart = () => {
    clearCart();
  };

  const handleOpen = () => {
    openModal();
  };

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };
  return (
    <div>
      <div className="p-10 flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <button
            className="cursor-pointer border p-4 rounded-md transition-all duration-300 hover:bg-amber-200"
            onClick={handleCart}
          >
            장바구니 초기화
          </button>
          <button
            className="cursor-pointer border p-4 rounded-md transition-all duration-300 mt-10 hover:bg-red-400"
            onClick={handleOpen}
          >
            전체 삭제
          </button>
        </div>
        <div className="border p-4 rounded-md bg-[#F3F3F3] mt-20" text-lg-bold>
          총 가격: {total}원
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose} onConfirm={handleConfirm} />
    </div>
  );
};

export default TotalPrice;