interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed flex inset-0 items-center z-50 bg-black/40 backdrop-blur-[2px] justify-center">
      <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-3">
        <p>정말 삭제하시겠습니까?</p>

        <div className="flex gap-10 mt-5">
          <button
            onClick={onClose}
            className="cursor-pointer p-3 border-1 border-red-300 rounded-xl hover:bg-red-300 transition-all duration-400"
          >
            아니요
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer p-3 border-1 border-green-300 rounded-xl hover:bg-green-300 transition-all duration-400"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;