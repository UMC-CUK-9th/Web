import { useEffect, useRef } from "react";

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

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onConfirm();
    };
    document.addEventListener("keydown", handleEscape);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onConfirm]);

  return (

        <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onConfirm}
      role="presentation"
    >

            <div 
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-message"
        tabIndex={-1}
      >
        <h3 id="modal-title" className="text-lg font-bold text-gray-900">{title}</h3>
        <p id="modal-message" className="mt-2 text-sm text-gray-600">{message}</p>
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