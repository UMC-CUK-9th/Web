import { usePlaylistStore } from "../stores/playlistStore";

const Modal = () => {
  const closeModal = usePlaylistStore((state) => state.closeModal);
  const clearCart = usePlaylistStore((state) => state.clearCart);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg text-center space-y-4">
        <h2 className="text-lg font-semibold">정말 삭제하시겠습니까?</h2>

        <div className="flex justify-center gap-4 pt-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={closeModal}
          >
            아니요
          </button>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              clearCart();
              closeModal();
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
