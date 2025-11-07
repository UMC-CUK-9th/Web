

interface AlertModalProps {
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
}

const AlertModal = ({
  onConfirm,
  title = "로그인 필요",
  message = "로그인 필요",
  confirmText = "확인",
}: AlertModalProps) => {
  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;