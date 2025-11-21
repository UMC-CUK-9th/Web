import { useDeleteUser } from "../hooks/mutations/useDeleteUser";

interface Props{
    isOpen: boolean;
    onClose: () => void;
}

const ConfirmModal = ({isOpen, onClose}: Props) => {
  const { mutate, isPending } = useDeleteUser();

  const handleConfirm = () => {
    mutate();
  };

  if(!isOpen) { return null; }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">회원 탈퇴하기</h3>

        <div className="flex justify-end gap-4">
          <button
            disabled={isPending}
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded text-sm hover:bg-gray-500 transition-colors disabled:opacity-50 cursor-pointer"
          >
            아니오
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 rounded text-sm hover:bg-red-500 transition-colors disabled:opacity-50 cursor-pointer"
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;