import React from 'react';
import { useCartStore } from '../hooks/useCartStore';

const PriceBox: React.FC = () => {
  // Zustand 상태를 개별 구독 → 무한리렌더 방지
  const total = useCartStore((state) => state.total);
  const openModal = useCartStore((state) => state.openModal);

  // total이 숫자가 아닐 경우를 대비
  const safeTotal = typeof total === 'number' ? total : 0;
  const formattedTotal = safeTotal.toLocaleString('ko-KR');

  return (
    <footer className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-2xl font-bold text-gray-800">총 금액</h4>
        <span className="text-3xl font-extrabold text-purple-600">
          {formattedTotal}원
        </span>
      </div>

      {/* 전체 삭제 버튼 */}
      <button
        className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-[1.01]"
        onClick={openModal}
      >
        전체 삭제 (장바구니 비우기)
      </button>
    </footer>
  );
};

export default PriceBox;
