import { useDispatch } from "react-redux";
import { closeModal } from "../store/slices/modalSlice";
import { clearCart } from "../store/slices/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
        <p className="text-lg font-semibold">정말 삭제하시겠습니까?</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            아니요
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
