import { useCartStore } from "../store/useCartStore";

const Modal = () => {

    const { isOpen, closeModal, clearCart } = useCartStore();

    if (!isOpen) return null;

    return (
        <aside className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-white w-80 p-8 rounded shadow-lg text-center">
                <h4 className="font-bold text-xl mb-4">
                    삭제하시겠습니까?
                </h4>
                <div className="flex justify-around mt-8">
                    <button
                        type="button"
                        className="border border-red-500 text-red-500 rounded px-4 py-2 hover:bg-red-50 font-bold"
                        onClick={() => {
                            clearCart();
                            closeModal();
                        }}
                    >
                        네
                    </button>
                    <button
                        type="button"
                        className="border border-gray-400 text-gray-600 rounded px-4 py-2 hover:bg-gray-100 font-bold"
                        onClick={closeModal}
                    >
                        아니요
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Modal;