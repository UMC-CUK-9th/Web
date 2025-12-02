import React from 'react';
import { useCartStore } from '../hooks/useCartStore';

const Modal: React.FC = () => {
    // 액션 함수 직접 선택 (객체로 묶지 않음)
    const closeModal = useCartStore((store) => store.closeModal);
    const clearCart = useCartStore((store) => store.clearCart);

    // '아니오' 버튼 클릭: 모달만 닫기
    const handleCancel = () => {
        closeModal();
    };

    // '네' 버튼 클릭: 장바구니 비우기 + 모달 닫기
    const handleConfirm = () => {
        clearCart();
        closeModal();
    };

    return (
        // 오버레이 레이어: 어두운 반투명 배경 (Tailwind Classes)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300">
            {/* 모달 박스 */}
            <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-sm transform scale-100 transition-transform duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    정말 삭제하시겠습니까?
                </h3>
                <div className="flex justify-center space-x-4 mt-6">
                    {/* 아니요 버튼: 모달 닫기 */}
                    <button
                        className="py-2 px-6 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition-colors"
                        onClick={handleCancel}
                    >
                        아니요
                    </button>
                    {/* 네 버튼: 장바구니 비우기 + 모달 닫기 */}
                    <button
                        className="py-2 px-6 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                        onClick={handleConfirm}
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
